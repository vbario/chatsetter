<template>
  <div class="auth-box">
    <AuthBoxLogin @setMode="setMode" v-if="mode == 'login'" />
    <AuthBoxRegister @setMode="setMode" v-else-if="mode == 'register'" />
    <AuthBoxResetPassword @setMode="setMode" v-else-if="mode == 'reset-password'" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'AuthBox',
  data () {
    return {
      mode: 'login'
    }
  },
  props: ['startingTab'],
  computed: {
    todos () {
      return this.$store.state.todos.list
    }
  },
  watch: {
    startingTab (to, from){
      console.log('watching startingTab', to, from)
      this.mode = to
    }
  },
  methods: {
    setMode (mode) {
      console.log('setMode', mode)
      this.mode = mode
    },
    addTodo (e) {
      this.$store.commit('todos/add', e.target.value)
      e.target.value = ''
    },
    setUid () {
      console.log('mutation')
      this.$store.commit('auth/setUid', 'abcd')
    },
    addToUid () {
      console.log('action')
      this.$store.dispatch('auth/fetchSomething', 'abcd')
    },
    ...mapMutations({
      toggle: 'todos/toggle'
    })
  },
  created () {
    if (this.startingTab) {
      this.mode = this.startingTab
    }
  }
}
</script>

<style lang="scss">
@import url("~/assets/styles/_colors.scss");
@import url("~/assets/styles/elements/_buttons.scss");

/* Define custom variables based on the ChatSetter logo style */
$chatsetter-green: #046c38;      // Primary brand green (adjust as needed)
$chatsetter-light-bg: #fcfbf7;     // Light background color, matching ChatSetter style
$chatsetter-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);

/* Style the AuthBox container to match the branding */
.auth-box {
  background-color: $chatsetter-light-bg;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: $chatsetter-shadow;
  max-width: 500px;
  margin: 0 auto; // centers the box if the container is full-width
  
  // Optional: You can add a colored border accent (uncomment below to try)
  // border: 2px solid $chatsetter-green;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .auth-box {
    padding: 1.5rem;
    max-width: 90%;
  }
}

/* The rest of your component-specific styles, e.g. for headings or done items */
h3 {
  // Add any heading-specific styling here if needed.
}
.done {
  text-decoration: line-through;
}
</style>
