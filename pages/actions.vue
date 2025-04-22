<template>
  <div class="settings-page actions-page container flex flex-col p-8">
    <!-- Page Header -->
    <h2 class="page-title">Actions</h2>
    <p class="page-subtitle">Tune ChatSetter to convert more.</p>

    <section class="section">
      <h3 class="section-title">Objective</h3>
      <Convert/>
    </section>
    <hr class="mb-8">
    <section class="section">
      <div class="w-full flex items-center gap-2">
        <div class="flex items-center gap-2">
          <input type="checkbox" :checked="$store.state.messages.followUpMode" class="bigger-checkbox" @click="toggleFollowUpMode()">
        </div>
        <h3 class="section-title mb0i flex items-center gap-2">
          Followup Messages
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="chevron-actions" :class="{'active-category': openFields['followup']}" @click="toggleField('followup')"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>
        </h3>
      </div>
      <!-- <p class="follow-up mt-1" @click="toggleFollowUpMode()">Follow up automatically when users don't reply</p> -->
      <CustomFollowupMessages v-if="openFields['followup']"/>
    </section>
    <hr class="mb-8">
    <section class="section">
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-2">
          <input type="checkbox" :checked="$store.state.messages.commentReplyMode" class="bigger-checkbox" @click="toggleCommentReplyMode()">
        </div>
        <h3 class="section-title mb0i flex items-center gap-2">
          Comment Replies
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="chevron-actions" :class="{'active-category': openFields['comment-replies']}" @click="toggleField('comment-replies')"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>
        </h3>
      </div>
      <p v-if="openFields['comment-replies']" class="follow-up mt-1">When a user leaves a comment on your posts ChatSetter will comment back.</p>
      <input v-if="openFields['comment-replies']" type="text" class="nav-dropdown mt-4 w240" placeholder="Comment Trigger Keywords" 
                 :value="$store.state.ai.commentTriggerKeywords" @change="setCommentKeywordTriggers($event)" />
      <p v-if="openFields['comment-replies']" class="follow-up mt-2 ___x">Add keywords separated by a comma (for example: COURSE, HOW, START). When you add keywords, ChatSetter will only respond to a comment when the comment is one of these keywords. Keywords are not case-sensitive.</p>
      <CustomCommentReplies v-if="openFields['comment-replies']"/>
    </section>

    <hr class="mb-8">
    <!-- No-respond List Section -->
    <section class="section">
      <h3 class="section-title mb0i flex items-center gap-2">
        No-respond List
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="chevron-actions" :class="{'active-category': openFields['no-respond-list']}" @click="toggleField('no-respond-list')"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>
      </h3>
      <div class="toggle-input flex items-center gap-2 mb-3" v-if="openFields['no-respond-list']">
        <p class="toggle-text">
          Enter users to whom ChatSetter should not respond (separated by commas).
        </p>
        <!-- <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          class="dropdown-chevron"
          @click="toggleNoRespondListInput"
          :class="{'flip-chevron': showNoRespondListInput}"
        >
          <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
        </svg> -->
      </div>
      <input
        autocomplete="off"
        @change="updateNoRespondList($event)"
        class="styled-input mb-4"
        type="text"
        :value="$store.state.messages.noRespondList"
        placeholder="Usernames, separated by commas"
        v-if="openFields['no-respond-list']"
      />
    </section>

    <hr class="mb-8">
    <!-- Filters Section -->
    <section class="section">
      <h3 class="section-title mb0i flex items-center gap-2">
        Filters
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="chevron-actions" :class="{'active-category': openFields['filters']}" @click="toggleField('filters')"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>
      </h3>
      <div class="toggle-input flex items-center gap-2 mb-3" v-if="openFields['filters']">
        <p class="toggle-text">Filter your interaction with incoming messages. If you add words to this list, messages containing these words will not be answered.</p>
        <!-- <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          class="dropdown-chevron"
          @click="toggleFilterInput"
          :class="{'flip-chevron': showFilterInput}"
        >
          <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
        </svg> -->
      </div>
      <input
        v-show="true"
        autocomplete="off"
        @change="updateFilterList($event)"
        class="styled-input"
        type="text"
        :value="$store.state.messages.filterList"
        placeholder="Words to filter"
        v-if="openFields['filters']"
      />
    </section>
  </div>
</template>

<script>
export default {
  name: 'ActionsPage',
  data() {
    return {
      showFilterInput: false,
      showNoRespondListInput: false,
      nextCommentKeywordTriggers: '',
      openFields: {}
    }
  },
  layout: 'app',
  methods: {
    toggleField (field) {
      this.openFields[field] = !this.openFields[field]
      this.$forceUpdate()
    },
    setConverstionType () {
      this.$store.dispatch('ai/setConversionType2', {
        commentKeywordTriggers: this.nextCommentKeywordTriggers
      })
      this.changeConversionType = false
    },
    setCommentKeywordTriggers (event) {
      this.nextCommentKeywordTriggers = event.target.value
      this.setConverstionType()
    },
    toggleFollowUpMode () {
      this.$store.dispatch('messages/toggleFollowUpMode', {})
    },
    toggleCommentReplyMode () {
      this.$store.dispatch('messages/toggleCommentReplyMode', {})
    },
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
    },
  },
  mounted () {
    let turnOnFollowups = this.$route.query.followup == 'true'
    let turnOnCommentReplies = this.$route.query.commentreplies == 'true'
    let turnOn = this.$route.query.turnon == true
    if (turnOnFollowups && !this.$store.state.messages.followUpMode) {
      this.toggleFollowUpMode()
    }
    console.log('turnOnCommentReplies1', turnOnCommentReplies)
    if (turnOnCommentReplies && !this.$store.state.messages.commentReplyMode) {
      console.log('turnOnCommentReplies2')
      this.toggleCommentReplyMode()
    }
    if (turnOn && !(this.$store.state.identity.sequences[0] && this.$store.state.identity.sequences[0].active)) {
      this.$store.dispatch('identity/toggleSequenceActive', { sequence: 0 })
    }
  }
};
</script>

<style lang="scss">
/* Brand Variables */
$chatsetterGreen: #046c38;
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
.actions-page {
  max-width: 1000px !important;
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
  flex: 1;
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
  box-shadow: 0 0 0 2px $chatsetterGreen;
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

.mb0i {
  margin-bottom: 0 !important;
}

.bigger-checkbox {
  height: 20px;
  width: 20px;
}

.w240 {
  width: 100%;
  max-width: 440px;
}
.___x {
  max-width: 440px;
}
.chevron-actions {
  width: 20px;
  fill: $chatsetterGreen;
  cursor: pointer;
}

.chevron-actions.active-category {
  transform: rotate(180deg);
}
</style>
