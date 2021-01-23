class Todo {
  constructor(taskDesc, done = false) {
    (this.taskDesc = taskDesc), (this.done = done);
  }

  getDesc() {
    return this.taskDesc;
  }

  toString() {
    return this.taskDesc + " " + (this.done ? "\u2714" : "\u2718");
  }

  toggleStatus() {
    this.done = !this.done;
  }
}

module.exports = { Todo: Todo };
