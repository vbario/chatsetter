<template>
  <div class="app-wrapper flex">
    <div v-show="!$store.state.auth.loaded" class="loading w-full h-full flex flex-col justify-center items-center bgc">
      <img src="~/assets/images/chatsetter-logo-2.png" class="loading-logo" />
      <span class="loader"></span>
    </div>
    <div v-show="$store.state.auth.loaded && !$store.state.auth.hasCid" class="no-plan">
      <div class="flex justify-center items-center w-full h-page">
        <PricingComponent/>
      </div>
    </div>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css" rel="stylesheet">
    <Navbar/>
    <div class="app-page flex-1 flex flex-col">
      <!-- <TopBar/> -->
        <div class="flex-1 w-full flex">
            <Nuxt />
            <!-- <InternalAIChat v-if="$store.state.ui.showAIPlayground"/> -->
        </div>
    </div>
    <SetupGuide @closeGuide="closeSetupGuide()" v-show="setupGuideOpen && !$store.state.identity.hideSetupGuide"/>
    <SetupGuideButton @openGuide="openSetupGuide()" v-show="!setupGuideOpen && !$store.state.identity.hideSetupGuide"/>
  </div>
</template>

<script>
export default {
  name: 'AppLayout',
  data() {
    return {
      setupGuideOpen: true
    }
  },
  methods: {
    openSetupGuide () {
      this.setupGuideOpen = true
    },
    closeSetupGuide () {
      this.setupGuideOpen = false
    }
  }
}
</script>

<style type="scss">
  .app-page {
    background-color: #fcfbf7;
  }
  .no-plan {
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #00000088;
    z-index: 100;
  }
  .loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    z-index: 200;
  }
  .loading p {
    font-size: 24px;
  }
  .loading-logo {
    width: 250px;
  }
  .loader {
    width: 48px;
    height: 48px;
    border: 5px solid #000000;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
  }
</style>