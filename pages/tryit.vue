<template>
  <div class="wrapper">
      <InternalAIChat/>
  </div>
</template>

<script>
export default {
  name: 'TryItPage',
  layout: 'app',
  mounted() {
    // Mark the "Try a test chat as a customer" checkbox as completed
    // This item is in the "Try it!" section (index 4) and is the first item (index 0)
    const sectionIndex = 4;
    const itemIndex = 0;
    
    // Emit event to notify SetupGuide component to update UI
    this.$root.$emit('setupGuideItemCompleted', { sectionIndex, itemIndex });
  }
}
</script>

<style lang="scss">
.wrapper {
    width: 100%;
    background-color: #fcfbf7;
}
</style>