<template>
  <section class="centered-screen flex-col">
    <h1 class="text-3xl mb-8">SIGNUP</h1>
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
      <div class="input-container">
        <label for="confirm-password" class="label-primary">E-Mail</label>
        <input
          type="password"
          name="confirm-password"
          id="confirm-password"
          class="input-primary"
          v-model="user.confirmPassword"
          @blur="checkConfirmPassword"
        />
        <span class="warning-text mt-1" v-show="confirmation.confirmPassword"
          >Wrong password</span
        >
      </div>
      <button class="btn-primary w-full" @click.prevent="signUp">
        Sign up
      </button>
      <p class="text-center text-sm mt-2">
        Already have an account?
        <router-link to="/login" class="font-accent-main font-medium"
          >Login</router-link
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
        confirmPassword: "",
      },
      confirmation: {
        email: false,
        password: false,
        confirmPassword: false,
      },
    };
  },
  methods: {
    signUp() {
      if (
        !this.confirmation.email &&
        !this.confirmation.password &&
        !this.confirmation.confirmPassword &&
        this.user.email !== "" &&
        this.user.password !== "" &&
        this.user.confirmPassword !== ""
      ) {
        this.$store.dispatch("signUp", {
          email: this.user.email,
          password: this.user.password,
        });
        this.user = {
          email: "",
          password: "",
          confirmPassword: "",
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
    checkConfirmPassword() {
      if (
        this.user.confirmPassword.length >= 6 &&
        this.user.password === this.user.confirmPassword
      ) {
        this.confirmation.confirmPassword = false;
      } else {
        this.confirmation.confirmPassword = true;
      }
    },
  },
};
</script>

<style></style>
