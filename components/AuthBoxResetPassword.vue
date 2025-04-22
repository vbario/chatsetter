<template>
    <!-- <div class="bg-white shadow sm:rounded-lg p-6"> -->
    <div class="w-full flex flex-col">
      <!-- <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css" rel="stylesheet"> -->
      <h2 class="text-2xl leading-7 font-semibold mb-4">Reset My Password</h2>
      <input autocomplete="off" class="w-full rounded-sm p-3 sm:rounded-lg mb-3" type="text" name="" :model="email">
      <button class="rounded-sm p-3 sm:rounded-lg button-primary mb-4">Reset</button>
      <p class="text-sm">Or <a class="underline color-primary" @click="setMode('login')">sign in</a>.</p>
      <!-- <p>bbb</p> -->
    </div>
</template>

<script>
export default {
  name: 'AuthBoxResetPassword',
  data () {
    return {
        email: ''
    }
  },
  methods: {
    setMode (mode) {
      console.log('setting mode:', mode)
      this.$emit('setMode', mode)
    }
  }
}
</script>

<style lang="scss">
</style>
