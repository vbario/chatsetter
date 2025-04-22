<template>
  <div class="w-full flex flex-col auth-box-login">
    <h2 class="title">Login</h2>
    <p class="subtitle">Welcome back! Please enter your details.</p>
    <input
      autocomplete="off"
      class="text-input"
      placeholder="Your email"
      type="text"
      v-model="email"
    >
    <input
      autocomplete="off"
      class="text-input"
      placeholder="Password"
      type="password"
      v-model="password"
    >
    <button @click="login" class="button-primary">
      <p>Sign in</p>
    </button>
    <p class="text-sm">
      New to ChatSetter?
      <a class="link-primary" @click="setMode('register')">Sign up</a>.
    </p>
  </div>
</template>

<script>
export default {
  name: 'AuthBoxLogin',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    setMode(mode) {
      this.$emit('setMode', mode)
    },
    login() {
      this.$store.dispatch('auth/login', { email: this.email, password: this.password })
    }
  }
}
</script>

<style lang="scss">
@import url("~/assets/styles/_colors.scss");

p {
  color: #000;
}

/* Brand variables */
$chatsetter-green: #046c38;          // Primary ChatSetter green (adjust as needed)
$chatsetter-green-dark: darken($chatsetter-green, 10%);
$chatsetter-light-bg: #f7f7f7;         // Light background color for the form
$chatsetter-white: #ffffff;
$chatsetter-border: lighten($chatsetter-green, 40%);

/* Container for the login form */
.auth-box-login {
  border-radius: 8px;
  text-align: center;
}

/* Title styling */
.title {
  font-size: 1.5rem;        // Matches text-2xl
  line-height: 1.75rem;      // Matches leading-7
  font-weight: 600;         // Semibold
  margin-bottom: 1rem;      // Corresponds to mb-4
  color: $chatsetter-green;
  text-align: left;
}

/* Subtitle styling */
.subtitle {
  margin-bottom: 0.75rem;   // Corresponds to mb-3
  color: darken($chatsetter-green, 20%);
  text-align: left;
}

/* Input field styling */
.text-input {
  width: 100%;
  padding: 0.75rem;         // Corresponds to p-3
  /*border: 1px solid $chatsetter-border;*/
  border-radius: 0.375rem;    // Equivalent to rounded-sm (or sm:rounded-lg on larger devices)
  margin-bottom: 0.75rem;     // Corresponds to mb-3
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  color: #000;

  &:focus {
    outline: none;
    border: 2px solid $chatsetter-green;
    /*box-shadow: 0 0 0 2px rgba($chatsetter-green, 0.2);*/
  }
}

/* Button styling */
.button-primary {
  width: 100%;
  padding: 0.75rem;         // Corresponds to p-3
  border: none;
  border-radius: 0.375rem;
  background-color: $chatsetter-green;
  color: $chatsetter-white;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;      // Corresponds to mb-4
  transition: background-color 0.2s;

  &:hover {
    background-color: $chatsetter-green-dark;
  }
}

/* Link styling */
a.link-primary {
  text-decoration: underline;
  color: $chatsetter-green;

  &:hover {
    color: $chatsetter-green-dark;
  }
}
</style>
