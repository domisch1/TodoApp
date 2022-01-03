<template>
  <section class="flex items-center h-screen flex-col pt-10 sm:pt-16">
    <h1 class="text-3xl medium">TODOS</h1>
    <div class="w-full mt-8">
      <button
        class="
          font-accent-main
          medium
          underline
          text-base
          cursor-pointer
          mb-3
          bg-none
        "
        @click="deleteTodos"
        v-if="this.$store.state.todosDemo.length > 0"
      >
        Delete finished Tasks
      </button>
      <div class="overflow-y-scroll max-h-80">
        <Todo
          v-for="todo in this.$store.state.todosDemo"
          :key="todo.index"
          :todoIndex="todo.index"
          :todoName="todo.todo"
          :todoImportant="todo.important"
          :todoChecked="todo.checked"
        ></Todo>
        <p
          class="text-xl text-center mt-10"
          v-if="this.$store.state.todosDemo.length === 0"
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
  data() {
    return {};
  },
  methods: {
    deleteTodos() {
      this.$store.dispatch("changeArr");
    },
  },
};
</script>

<style></style>
