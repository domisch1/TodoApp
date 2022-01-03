<template>
  <section class="centered-screen flex-col">
    <h1 class="text-3xl mb-8">LOGIN</h1>
    <form class="flex flex-col w-full sm:w-80">
      <div class="input-container">
        <label for="email" class="label-primary">E-Mail</label>
        <input
          type="text"
          name="email"
          id="email"
          class="input-primary"
          autocomplete="off"
          v-model="user.email"
          @blur="checkEmail"
        />
        <span class="warning-text mt-1" v-show="confirmation.email"
          >Please enter a correct e-mail</span
        >
      </div>
      <div class="input-container">
        <label for="password" class="label-primary">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          class="input-primary"
          v-model="user.password"
          @blur="checkPassword"
        />
        <span class="warning-text mt-1" v-show="confirmation.password"
          >Password needs at least 6 characters</span
        >
      </div>
      <button class="btn-primary w-full" @click.prevent="login">Login</button>
      <p class="text-center text-sm mt-2">
        Don't have an account?
        <router-link to="/signup" class="font-accent-main font-medium"
          >Sign up</router-link
        >
      </p>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      confirmation: {
        email: false,
        password: false,
      },
    };
  },
  methods: {
    login() {
      if (
        !this.confirmation.email &&
        !this.confirmation.password &&
        this.user.email !== "" &&
        this.user.password !== ""
      ) {
        this.$store.dispatch("login", {
          email: this.user.email,
          password: this.user.password,
        });
        this.user = {
          email: "",
          password: "",
        };
      }
    },
    checkEmail() {
      const regex = /@/gi;
      if (this.user.email.match(regex) !== null) {
        this.confirmation.email = false;
      } else {
        this.confirmation.email = true;
      }
    },
    checkPassword() {
      if (this.user.password.length >= 6) {
        this.confirmation.password = false;
      } else {
        this.confirmation.password = true;
      }
    },
  },
};
</script>

<style></style>
