<template>
  <section class="flex items-center h-screen flex-col pt-10 sm:pt-16">
    <button
      class="absolute px-8 py-3 rounded-bl-lg top-0 right-0 bg-red-700 font-medium text-lg hover:bg-red-800 transition-all duration-150"
      v-if="this.$store.state.userAuth"
      @click="this.$store.dispatch('signOut')"
    >
      Logout
    </button>
    <h1 class="text-3xl medium">TODOS</h1>
    <div class="w-full mt-8">
      <button
        class="font-accent-main medium underline text-base cursor-pointer mb-3 bg-none"
        @click="deleteTodos"
        v-if="this.$store.state.todos.length > 0"
      >
        Delete finished Tasks
      </button>
      <div class="overflow-y-scroll max-h-80">
        <Todo
          v-for="todo in this.$store.state.todos"
          :key="todo.index"
          :todoIndex="todo.index"
          :todoName="todo.todo"
          :todoImportant="todo.important"
          :todoChecked="todo.checked"
        ></Todo>
        <p
          class="text-xl text-center mt-10"
          v-if="this.$store.state.todos.length === 0"
        >
          Add some todos
        </p>
      </div>
    </div>
    <Input class="absolute bottom-8"></Input>
  </section>
</template>

<script>
import Todo from "../components/Todo.vue";
import Input from "../components/Input.vue";

export default {
  components: {
    Todo,
    Input,
  },
  methods: {
    deleteTodos() {
      this.$store.dispatch("deleteTodos");
    },
  },
};
</script>

<style></style>
