import { nanoid } from "../../lib/nanoid.js"

export const todos = [
  {
    _id: nanoid(),
    content: "first todo",
    isCompleted: true,
  },
  {
    _id: nanoid(),
    content: "second todo",
    isCompleted: false,
  },
  {
    _id: nanoid(),
    content: "third todo",
    isCompleted: false,
  },
]
