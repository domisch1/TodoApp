<template>
  <router-view
    class="bg-stone-800 text-stone-50 font-main px-8 md:px-40"
  ></router-view>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("checkAuth");
  },
};
</script>
<style></style>
