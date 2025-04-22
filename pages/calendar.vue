<template>
  <div class="wrapper">
      <!-- <Tutorial/> -->
  </div>
</template>

<script>
export default {
  name: 'CalendarPage',
  layout: 'app',
  methods: {
    getMyCalendlyEvents () {
        this.$store.dispatch('calendly/getMyCalendlyEvents', {}).then((res) => {
            console.log('getMyCalendlyEvents result', res)
        })
    }
  },
  created () {
    this.getMyCalendlyEvents()
  }
}
</script>

<style lang="scss">
</style>