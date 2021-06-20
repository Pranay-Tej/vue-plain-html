const { createApp } = Vue;

// Vue.use(VueFormulate);

const AppComponent = {
  data() {
    return {
      msg: "Hello World",
      todo: {
        id: "",
        title: "",
      },
      todos: [],
    };
  },
  created() {
    this.fetchTodoList();
  },
  methods: {
    // reset
    resetTodoForm() {
      this.todo = {
        id: "",
        title: "",
      };
    },
    // fetch
    fetchTodoList() {
      axios
        .get(`https://buttery-purple-calcium.glitch.me/todos`)
        .then((response) => {
          console.log(response.data);
          this.todos = response.data;
        })
        .catch((e) => console.error(e));
    },
    // fetchById
    fetchById(id) {
      console.log("edit", id);
      axios
        .get(`https://buttery-purple-calcium.glitch.me/todos/${id}`)
        .then((response) => {
          console.log(response.data);
          this.todo = response.data;
        })
        .catch((e) => console.error(e));
    },
    // delete
    deleteTodo(id) {
      console.log("deleting", id);
      axios
        .delete(
          `https://buttery-purple-calcium.glitch.me/todos/${this.todo.id}`
        )
        .then((response) => {
          console.log(response.data);
          // this.todo = response.data;
          this.fetchTodoList();
        })
        .catch((e) => console.error(e));
    },
    // saveForm
    saveTodo() {
      if (this.todo?.id) {
        this.updateTodo();
      } else {
        this.createTodo();
      }
    },
    // create
    createTodo() {
      console.log("saving");
      const { title } = this.todo;
      axios
        .post(`https://buttery-purple-calcium.glitch.me/todos`, {
          title,
        })
        .then((response) => {
          console.log(response.data);
          // this.todo = response.data;
          this.resetTodoForm();
          this.fetchTodoList();
        })
        .catch((e) => console.error(e));
    },
    // update
    updateTodo() {
      console.log("updating", this.todo.id);
      const { title } = this.todo;
      axios
        .put(`https://buttery-purple-calcium.glitch.me/todos/${this.todo.id}`, {
          title,
        })
        .then((response) => {
          console.log(response.data);
          // this.todo = response.data;
          this.resetTodoForm();
          this.fetchTodoList();
        })
        .catch((e) => console.error(e));
    },
  },
};

const app = createApp(AppComponent);

app.component("todo", {
  props: ["todo"],
  emits: ["edit", "delete"],
  template: "#todo",
});

app.mount("#app");
