<template>
  <div class="settings-page container flex flex-col p-8">
    <!-- Page Header -->
    <h2 class="page-title">Settings</h2>
    <p class="page-subtitle">{{$store.state.auth.email ? `Signed in as ${$store.state.auth.email}` : 'Your settings.'}}</p>

    <!-- Integrations Section -->
    <section class="section">
      <h3 class="section-title">Integrations</h3>
      <p class="section-desc">
        Integrate ChatSetter AI with Instagram.
      </p>
      <div class="flex gap-4">
        <div class="integrations flex mb-4 gap-4">
          <a
            href="https://www.instagram.com/oauth/authorize?enable_fb_login=0&amp;force_authentication=1&amp;client_id=705267332010427&amp;redirect_uri=https://chatsetter.ai/igredirect&amp;response_type=code&amp;scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights"
            class="flex"
          >
            <div class="integration-box flex flex-col justify-center items-center posrel">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="integration-image"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
              <h4>Instagram</h4>
              <div class="connection-status">
                <div v-show="$store.state.instagram.has_access_token" class="status-connected flex flex-col">
                  <p class="status">@{{$store.state.instagram.username}}</p>
                  <p class="status-2">Click to reconnect.</p>
                  <!-- <p class="status">(Connected)</p> -->
                </div>
                <div v-show="!$store.state.instagram.has_access_token">
                  <p>Click to connect</p>
                </div>
              </div>
            </div>
          </a>
        </div>

        <!-- <a
          href="https://www.instagram.com/oauth/authorize?enable_fb_login=0&amp;force_authentication=1&amp;client_id=705267332010427&amp;redirect_uri=https://chatsetter.ai/igredirect&amp;response_type=code&amp;scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights"
          class="flex"
        > -->

        <!-- <div class="integrations flex mb-4 gap-4">
          <a
            href="https://auth.calendly.com/oauth/authorize?client_id=wnj2gafrEkJtzT6pD0eVSA3j3mhczXAMm1QuImz9uzc&response_type=code&redirect_uri=https%3A%2F%2Fchatsetter.ai%2Fcalendlyredirect"
            class="flex"
          >
            <div class="integration-box flex flex-col justify-center items-center posrel">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="integration-image"><path d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"/></svg>
              <h4>Calendly</h4>
              <div class="connection-status">
                <div v-show="$store.state.calendly.has_access_token" class="status-connected">
                  <p class="status">Connected</p>
                </div>
                <div v-show="!$store.state.calendly.has_access_token">
                  <div>
                    <p class="status">Click to connect</p>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div> -->
      </div>
    </section>

    <!-- Subscription Info -->
    <section class="section" v-show="$store.state.auth.hasPlan">
      <div class="plan-info">
        <h2>
          You're subscribed to ChatSetter.
          <span class="underline">Click here</span> to manage subscription details.
        </h2>
      </div>
    </section>

    <hr class="mb-4">
    <!-- Logout -->
    <a @click="logout()" class="logout-link text-sm">Logout</a>
  </div>
</template>

<script>
export default {
  name: 'IntegrationsPage',
  data() {
    return {
      showFilterInput: false,
      showNoRespondListInput: false,
    }
  },
  layout: 'app',
  methods: {
    toggleFilterInput() {
      this.showFilterInput = !this.showFilterInput;
    },
    updateFilterList(event) {
      this.$store.dispatch('messages/updateFilterList', event.target.value);
    },
    toggleNoRespondListInput() {
      this.showNoRespondListInput = !this.showNoRespondListInput;
    },
    updateNoRespondList(event) {
      this.$store.dispatch('messages/updateNoRespondList', event.target.value);
    },
    logout() {
      console.log('logout');
      this.$store.dispatch('auth/logout', true);
    }
  },
};
</script>

<style lang="scss">
/* Brand Variables */
$chatsetterGreen: #503de0;
$chatsetterWhite: #ffffff;
$chatsetterLightBg: #f7f7f7;
$chatsetterBorder: lighten($chatsetterGreen, 40%);
$chatsetterText: #333;

/* Main Container */
.settings-page {
  background-color: $chatsetterLightBg;
  padding: 2rem;
  font-family: sans-serif;
  color: $chatsetterText;
}

/* Page Titles & Subtitles */
.page-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: $chatsetterGreen;
}

.page-subtitle {
  font-size: 1rem;
  margin-bottom: 1rem;
  color: darken($chatsetterGreen, 20%);
}

/* Sections */
.section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: $chatsetterGreen;
}

.section-desc {
  font-size: 1rem;
  margin-bottom: 1rem;
  color: $chatsetterText;
}

/* Integrations */
.integrations {
  display: flex;
  gap: 1rem;
}

.integration-box {
  width: 200px;
  height: 200px;
  background-color: $chatsetterWhite;
  border: 2px solid $chatsetterGreen;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: box-shadow 0.2s ease;
  cursor: pointer;
}

.integration-box:hover {
  box-shadow: 0 4px 8px rgba($chatsetterGreen, 0.2);
}

.integration-box h4 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: $chatsetterGreen;
}

.integration-box p {
  margin: 0;
  font-size: 0.9rem;
  color: $chatsetterText;
}

.integration-box .status {
  font-size: 0.8rem;
  color: darken($chatsetterGreen, 10%);
}

.integration-box .status-2 {
  font-size: 0.7rem;
  color: darken($chatsetterGreen, 10%);
}

/* Plan Info */
.plan-info {
  background-color: lighten($chatsetterGreen, 50%);
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  color: $chatsetterGreen;
}

/* Toggle Input Section */
.toggle-input {
  align-items: center;
}

.toggle-text {
  font-size: 0.9rem;
  color: $chatsetterText;
}

/* Dropdown Chevron */
.dropdown-chevron {
  width: 20px;
  cursor: pointer;
  fill: $chatsetterGreen;
  transition: transform 0.2s;
}

.flip-chevron {
  transform: rotate(180deg);
}

/* Styled Inputs */
.styled-input {
  width: 100%;
  padding: 0.75rem;
  /*border: 1px solid $chatsetterBorder;*/
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.styled-input:focus {
  outline: none;
  border-color: $chatsetterGreen;
  box-shadow: 0 0 0 2px rgba($chatsetterGreen, 0.2);
}

/* Logout Link */
.logout-link {
  color: $chatsetterGreen;
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.2s;
}

.logout-link:hover {
  color: darken($chatsetterGreen, 10%);
}

.integration-image {
  height: 50px;
  color: $chatsetterGreen;
  fill: $chatsetterGreen;
  transform: translateY(-5px);
}

h4 {
  transform: translateY(-5px)
}

.connection-status {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 20px;
}

.connection-status > div {
  background-color: #00000022;
  width: 100%;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.status-connected {
  background-color: rgb(117.1071428571, 249.8928571429, 183.5) !important;
}

.posrel {
  position: relative;
}
</style>
