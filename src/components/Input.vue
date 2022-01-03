<template>
  <section class="flex flex-col w-full sm:w-96 px-8 sm:px-0">
    <span class="text-red-700 font-medium text-sm mb-1" v-if="formValidation"
      >Field cannot be empty!</span
    >
    <div class="flex items-center-flex-row mb-2">
      <input
        type="text"
        name="todo"
        id="todo"
        class="input-primary mr-2"
        placeholder="Add a todo"
        v-model="todo"
        autocomplete="off"
        @keyup.enter="addTodo"
      />
      <button
        class="
          bg-accent-main
          py-2.5
          px-5
          font-medium
          rounded-lg
          hover:bg-accent-main-hover
          transition-all
          duration-150
        "
        @click="addTodo"
      >
        Add
      </button>
    </div>

    <div class="flex w-full items-center flex-row">
      <input
        type="checkbox"
        name="important"
        id="important"
        class="w-3 h-3 rounded mr-1 cursor-pointer"
        v-model="important"
      />
      <label for="important" class="text-sm font-medium cursor-pointer"
        >Important</label
      >
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      todo: "",
      important: false,
      formValidation: false,
    };
  },
  methods: {
    addTodo() {
      if (todo.value !== "") {
        this.formValidation = false;
        if (this.$route.fullPath === "/demo") {
          this.$store.commit("addDemo", {
            todo: this.todo,
            important: this.important,
            checked: false,
            index: this.$store.state.todosDemo.length,
          });
          (this.todo = ""), (this.important = false);
        } else if (this.$route.fullPath === "/start") {
          this.$store.dispatch("addTodo", {
            todo: this.todo,
            important: this.important,
            checked: false,
            index: this.$store.state.todos.length,
          });
          (this.todo = ""), (this.important = false);
        }
      } else {
        this.formValidation = true;
      }
    },
  },
};
</script>

<style></style>
