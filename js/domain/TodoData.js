function TodoData(id, title){
    this.id = id
    this.title = title
    this.completed = false
    this.editing = false

    this.setEditing = bool => {
        this.editing = bool
        return this;
    }

    this.setTitle = title => {
        this.title = title
        return this;
    }

    this.setCompleted = bool => {
        this.completed = bool
        return this;
    }
}

export default TodoData;

