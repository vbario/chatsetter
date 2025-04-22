<template>
    <div class="container h-screen mx-auto flex p-8 relative">
        <p v-show="error">{{error}}</p>
        <div v-show="!error" class="flex flex-col">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="spinner-1 absolute"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"/></svg>
          <p>Getting your Calendly data. This may take some time.</p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CalendlyRedirectPage',
  layout: 'app',
  data () {
    return {
      error: ''
    }
  },
  methods: {
  },
  created () {
    let code = this.$route.query ? this.$route.query.code : false
    if (code) {
        this.$store.dispatch('calendly/getToken', { code }).then((res) => {
          console.log('RES!', res)
          this.$router.push('/settings')
        }).catch((error) => {
          console.log('Error', error)
          this.error = 'Error Authenticating Calendly'
        })
    }
  }
}
</script>

<style lang="scss">
.spinner-1 {
  left: calc(50% - 40px);
  top: calc(50% - 40px);
  width: 80px;
  height: 80px;
  color: #000;
  fill: #000;
  animation: spin 2s linear infinite;
  /*transform: translate(-50%, -50%);*/
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>