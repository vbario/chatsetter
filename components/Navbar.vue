<template>
  <div class="navbar">
    <!-- Top section with logo -->
    <div class="navbar-header">
      <NuxtLink to="/">
        <img src="~/assets/images/chatsetter-logo-2.png" class="navbar-logo" />
      </NuxtLink>
    </div>

    <!-- <hr class="hr-1" /> -->

    <!-- Navigation links and controls -->
    <div class="navbar-content">
      <!-- Convert toggle area -->

      <!-- <hr class="section-divider" :class="{'mt-extended': !changeConversionType && !$store.state.messages.followUpMode}" /> -->

      <!-- Messages link -->
      <h5 class="nav-section-title">
        <div class="flex justify-between items-center gap-2">
          <span>Convert</span>
          <div class="nav-convert-toggle">
            <p class="onOff" :class="{'disabled-choice': !($store.state.identity.sequences[0] && $store.state.identity.sequences[0].active)}">OFF</p>
            <label class="switch _trl">
              <input type="checkbox" :checked="$store.state.identity.sequences[0] && $store.state.identity.sequences[0].active" @click="toggleSequenceActive($event)">
              <span class="slider round"></span>
            </label>
            <p class="onOff" :class="{'disabled-choice': $store.state.identity.sequences[0] && $store.state.identity.sequences[0].active}">ON</p>
          </div>
        </div>
      </h5>
      <!-- <NuxtLink to="/messages" class="nav-link" :class="{'current-tab': $route.name === 'messages'}">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="link-icon">
          <path d="M88.2 309.1c9.8-18.3 6.8-40.8-7.5-55.8C59.4 230.9 48 204 48 176c0-63.5 63.8-128 160-128s160 64.5 160 128s-63.8 128-160 128c-13.1 0-25.8-1.3-37.8-3.6c-10.4-2-21.2-.6-30.7 4.2c-4.1 2.1-8.3 4.1-12.6 6c-16 7.2-32.9 13.5-49.9 18c2.8-4.6 5.4-9.1 7.9-13.6c1.1-1.9 2.2-3.9 3.2-5.9zM208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 41.8 17.2 80.1 45.9 110.3c-.9 1.7-1.9 3.5-2.8 5.1c-10.3 18.4-22.3 36.5-36.6 52.1c-6.6 7-8.3 17.2-4.6 25.9C5.8 378.3 14.4 384 24 384c43 0 86.5-13.3 122.7-29.7c4.8-2.2 9.6-4.5 14.2-6.8c15.1 3 30.9 4.5 47.1 4.5zM432 480c16.2 0 31.9-1.6 47.1-4.5c4.6 2.3 9.4 4.6 14.2 6.8C529.5 498.7 573 512 616 512c9.6 0 18.2-5.7 22-14.5c3.8-8.8 2-19-4.6-25.9c-14.2-15.6-26.2-33.7-36.6-52.1c-.9-1.7-1.9-3.4-2.8-5.1C622.8 384.1 640 345.8 640 304c0-94.4-87.9-171.5-198.2-175.8c4.1 15.2 6.2 31.2 6.2 47.8l0 .6c87.2 6.7 144 67.5 144 127.4c0 28-11.4 54.9-32.7 77.2c-14.3 15-17.3 37.6-7.5 55.8c1.1 2 2.2 4 3.2 5.9c2.5 4.5 5.2 9 7.9 13.6c-17-4.5-33.9-10.7-49.9-18c-4.3-1.9-8.5-3.9-12.6-6c-9.5-4.8-20.3-6.2-30.7-4.2c-12.1 2.4-24.8 3.6-37.8 3.6c-61.7 0-110-26.5-136.8-62.3c-16 5.4-32.8 9.4-50 11.8C279 439.8 350 480 432 480z"/>
        </svg>
        <p class="link-text">Messages</p>
      </NuxtLink> -->
      <!-- <NuxtLink to="/calendar" class="nav-link" :class="{'current-tab': $route.name === 'calendar'}">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="link-icon"><path d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"/></svg>
        <p class="link-text">Calendar</p>
      </NuxtLink> -->

      <!-- Training Section -->
      <h5 class="nav-section-title">Training</h5>
      <!-- Identity/Memory link -->
      <NuxtLink to="/identity" class="nav-link" :class="{'current-tab': $route.name === 'identity'}">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="link-icon">
          <path d="M184 0c30.9 0 56 25.1 56 56l0 400c0 30.9-25.1 56-56 56c-28.9 0-52.7-21.9-55.7-50.1c-5.2 1.4-10.7 2.1-16.3 2.1c-35.3 0-64-28.7-64-64c0-7.4 1.3-14.6 3.6-21.2C21.4 367.4 0 338.2 0 304c0-31.9 18.7-59.5 45.8-72.3C37.1 220.8 32 207 32 192c0-30.7 21.6-56.3 50.4-62.6C80.8 123.9 80 118 80 112c0-29.9 20.6-55.1 48.3-62.1C131.3 21.9 155.1 0 184 0zM328 0c28.9 0 52.6 21.9 55.7 49.9c27.8 7 48.3 32.1 48.3 62.1c0 6-.8 11.9-2.4 17.4c28.8 6.2 50.4 31.9 50.4 62.6c0 15-5.1 28.8-13.8 39.7C493.3 244.5 512 272.1 512 304c0 34.2-21.4 63.4-51.6 74.8c2.3 6.6 3.6 13.8 3.6 21.2c0 35.3-28.7 64-64 64c-5.6 0-11.1-.7-16.3-2.1c-3 28.2-26.8 50.1-55.7 50.1c-30.9 0-56-25.1-56-56l0-400c0-30.9 25.1-56 56-56z"/>
        </svg>
        <p class="link-text">Memory</p>
      </NuxtLink>

      <!-- Revisions link -->
      <NuxtLink to="/actions" class="nav-link" :class="{'current-tab': $route.name === 'actions'}">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="link-icon"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
        <p class="link-text">Actions</p>
      </NuxtLink>

      <!-- Try it link -->
      <NuxtLink to="/tryit" class="nav-link" :class="{'current-tab': $route.name === 'tryit'}">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="link-icon"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
        <p class="link-text">Try it!</p>
      </NuxtLink>

      <!-- Spacer to push settings link to the bottom -->
      <div class="spacer"></div>

      <!-- Settings link -->
      <NuxtLink to="/settings" class="nav-link" :class="{'current-tab': $route.name === 'settings'}">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="link-icon">
          <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/>
        </svg>
        <p class="link-text">Settings</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VisualDemo',
  data () {
    return {
      changeConversionType: false,
      nextConversionType: '',
      nextCommentKeywordTriggers: ''
    }
  },
  methods: {
    toggleFollowUpMode () {
      this.$store.dispatch('messages/toggleFollowUpMode', {})
    },
    toggleSequenceActive (event) {
      this.$store.dispatch('identity/toggleSequenceActive', { sequence: 0 })
    },
    toggleChangeConversionType () {
      this.changeConversionType = !this.changeConversionType
      if (this.changeConversionType) {
        this.nextConversionType = this.$store.state.ai.conversionType
        this.nextCommentKeywordTriggers = this.$store.state.ai.commentKeywordTriggers
      }
    },
    setNextConversionType (event) {
      this.nextConversionType = event.target.value
    },
    setCommentKeywordTriggers (event) {
      this.nextCommentKeywordTriggers = event.target.value
    },
    setConverstionType () {
      this.$store.dispatch('ai/setConversionType', {
        conversionType: this.nextConversionType,
        commentKeywordTriggers: this.nextCommentKeywordTriggers
      })
      this.changeConversionType = false
    },
    conversionType () {
      const options = {
        'book-sales-calls': 'Book sales calls in DMs',
        'sell-direct': 'Sell direct in DMs'
      }
      return options[this.$store.state.ai.conversionType]
    }
  }
}
</script>

<style lang="scss">
/* Define brand colors and related variables */
$chatsetter-green: #503de0;
$chatsetter-white: #ffffff;

/* Overall navbar container */
.navbar {
  width: 240px;
  min-width: 240px;
  max-width: 240px;
  background-color: $chatsetter-green;
  color: $chatsetter-white;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Header section */
.navbar-header {
  padding: 1.5rem 1rem 0.5rem;
}
.navbar-logo {
  width: 100%;
  width: auto;
  object-fit: contain;
  /*margin-bottom: 1rem;*/
}

/* Horizontal rule */
.hr-1 {
  height: 1px;
  width: 100%;
  background-color: rgba($chatsetter-white, 0.1);
  border: none;
}

/* Content area */
.navbar-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  padding-top: 0;
}

/* Section titles */
.nav-section-title {
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0.75rem 1.5rem;
  color: lighten($chatsetter-white, 30%);
}

/* Navigation link style */
.nav-link {
  display: flex;
  align-items: center;
  padding: 0.5rem 1.5rem;
  text-decoration: none;
  color: $chatsetter-white;
  border-radius: 4px;
  margin: 0.25rem 0;
  transition: background-color 0.2s ease-in-out;
}
.nav-link:hover {
  background-color: darken($chatsetter-green, 5%);
}
.current-tab {
  background-color: darken($chatsetter-green, 10%);
}
.current-tab svg,
.current-tab .link-text {
  color: $chatsetter-white;
  fill: $chatsetter-white;
}

/* Link text and icons */
.link-text {
  font-size: 0.875rem;
  font-weight: bold;
  margin-left: 0.75rem;
  color: #fff;
}
.link-icon {
  width: 20px;
  height: 20px;
  fill: #fff;
}

/* Section divider between nav groups */
.section-divider {
  margin: 1rem 1rem 0 1rem;
  border: 0;
  border-top: 1px solid rgba($chatsetter-white, 0.2);
}
.mt-extended {
  margin-top: 1.5rem;
}

/* Spacer to push the settings link to the bottom */
.spacer {
  flex: 1;
}

/* Button styles for small actions */
.button-x-1 {
  margin-top: 0.5rem;
  padding: 0.25rem 0.5rem;
  font-weight: 600;
  border-radius: 8px;
  background-color: #2196F3;
  color: $chatsetter-white;
  cursor: pointer;
}
.button-x-2 {
  margin-top: 0.5rem;
  padding: 0.25rem 0.5rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
}

/* Utility classes */
.mt8 {
  margin-top: 8px;
}
.font-sm_ {
  font-size: 12px;
}
.tooltip {
  height: 10px;
  width: 10px;
  color: lighten($chatsetter-white, 50%);
  fill: lighten($chatsetter-white, 50%);
}
.onOff {
  color: #ffffff66;
}
</style>
