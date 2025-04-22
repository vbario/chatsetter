<template>
    <div class="w-full flex justify-between items-center p-6 absolute bottom-0 left-0">        
      <!-- <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css" rel="stylesheet"> -->
    <h2 class="text-base">© 2025 ChatSetter</h2>
    <h2 class="text-base flex gap-4 _t">
        <NuxtLink to="/privacy">Privacy Policy</NuxtLink>
        <NuxtLink to="/terms">Terms</NuxtLink>
    </h2>
    </div>
</template>

<script>
export default {
  name: 'VisualDemo'
}
</script>

<style lang="scss">
._t {
    font-size: 0.9em !important;
}
</style>
