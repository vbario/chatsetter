<template>
    <div class="flex items-center gap-8">
      <a href="#features">
        <p class="landing-link" :class="{'color-text': dark}">
          Solutions
        </p>
      </a>
      <a href="#pricing">
        <p class="landing-link" :class="{'color-text': dark}">
          Pricing
        </p>
      </a>
      <NuxtLink v-show="!$store.state.auth.uid" to="/?register=true">
        <button class="dashboard-button">
          Get Started
        </button>
      </NuxtLink>
      <NuxtLink v-show="$store.state.auth.uid" to="/identity">
        <button class="dashboard-button">
          My Dashboard
        </button>
      </NuxtLink>
    </div>
</template>

<script>
export default {
  name: 'Starter',
  props: ['dark']
}
</script>

<style lang="scss">
.color-text {
  color: #503de0 !important;
}
</style>
