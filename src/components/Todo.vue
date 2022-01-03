<template>
  <section
    class="
      relative
      flex
      items-center
      flex-row
      w-full
      py-2
      px-2
      border-b border-stone-50
    "
  >
    <input
      type="checkbox"
      :name="todo"
      :id="todo"
      class="
        h-4
        w-4
        border-2 border-stone-50
        mr-2
        bg-stone-800
        p-2
        cursor-pointer
        rounded-sm
      "
      v-model="checked"
      @click="changeStatus"
    />
    <label
      class="text-base cursor-pointer transition-all duration-150"
      :for="todo"
      :class="{ 'task-done': checked }"
    >
      {{ todo }}
    </label>
    <span class="absolute right-2 font-accent-secondary" v-if="important"
      >important</span
    >
  </section>
</template>

<script>
export default {
  props: ["todoName", "todoImportant", "todoChecked", "todoIndex"],
  data() {
    return {
      todo: this.todoName,
      important: this.todoImportant,
      checked: this.todoChecked,
      index: this.todoIndex,
    };
  },
  methods: {
    changeStatus() {
      if (this.$route.fullPath === "/demo") {
        this.$store.commit("changeStatus", {
          checked: !this.checked,
          index: this.index,
        });
      } else if (this.$route.fullPath === "/start") {
        this.$store.dispatch("changeStatusTodo", {
          checked: !this.checked,
          index: this.index,
        });
      }
    },
  },
};
</script>

<style></style>
