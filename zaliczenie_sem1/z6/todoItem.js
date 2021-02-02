class Todo {
  constructor(taskDesc, done = false) {
    (this.taskDesc = taskDesc), (this.done = done);
  }

  getDesc() {
    return this.taskDesc;
  }

  toString() {
    // wymaga obslugi utf-8 przez terminal
    // return this.taskDesc + " " + (this.done ? "\u2714" : "\u2718");
    return this.taskDesc + " " + (this.done ? "V" : "X");
  }

  toggleStatus() {
    this.done = !this.done;
  }
}

module.exports = { Todo: Todo };
