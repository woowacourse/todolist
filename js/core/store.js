const EventEmitter = () => {
  const events = new Map()

  const on = (eventName, listener) => {
    if (events.has(eventName)) {
      events.get(events).push(listener)
      return
    }
    events.set(eventName, [listener])
  }

  const off = (eventName, listener) => {
    if (!events.has(eventName)) {
      return
    }
    const listeners = events.get(eventName)
    events.set(
      eventName,
      listeners.filter((it) => it !== listener)
    )
  }

  const emit = (eventName, ...args) => {
    const event = events.get(eventName)
    if (event) {
      event.forEach((listener) => listener(...args))
    }
  }

  return {
    on,
    off,
    emit,
  }
}

const Store = ({ state = {}, mutations = {}, actions = {} }) => {
  const emitter = EventEmitter()

  const self = {}

  self.state = new Proxy(
    { ...state },
    {
      set: function (state, key, value) {
        state[key] = value

        emitter.emit("stateChange", self.state)

        if (self.status !== "mutation") {
          console.warn(`You should use a mutation to set ${key}`)
        }

        self.status = "resting"

        return true
      },
    }
  )

  self.mutations = {
    ...mutations,
  }

  self.actions = {
    ...actions,
  }

  self.status = "resting"

  const commit = (type, payload) => {
    const mutation = self.mutations[type]
    if (mutation) {
      self.status = "mutation"
      mutation(self.state, payload)
    }
  }

  const dispatch = (type, payload) => {
    const action = self.actions[type]
    if (action) {
      self.status = "action"
      action({ commit, state: self.state }, payload)
    }
  }

  return {
    ...emitter,
    state,
    commit,
    dispatch,
  }
}

export default Store
