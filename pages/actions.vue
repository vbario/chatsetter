<template>
  <div class="actions-page container mx-auto p-6 bg-chatsetterLightBg rounded-lg">
    <!-- Header -->
    <section class="page-header text-center mb-8">
      <h2 class="text-3xl font-semibold text-chatsetterGreen">Actions</h2>
      <p class="text-lg text-gray-700 mt-2">Tune ChatSetter to convert more.</p>
    </section>

    <div class="space-y-6">
      <!-- Objective -->
      <div class="card">
        <h3 class="section-title">Objective</h3>
        <div class="mt-4">
          <Convert/>
        </div>
      </div>

      <!-- Followup Messages -->
      <div class="card">
        <div class="flex items-center justify-between">
          <label class="flex items-center gap-2">
            <input
              type="checkbox"
              class="bigger-checkbox"
              :checked="$store.state.messages.followUpMode"
              @click="toggleFollowUpMode()"
            />
            <span class="section-title mb-0">Followup Messages</span>
          </label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            class="chevron-actions"
            :class="{'active-category': openFields['followup']}"
            @click="toggleField('followup')"
          >
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
          </svg>
        </div>
        <div v-if="openFields['followup']" class="mt-4">
          <CustomFollowupMessages/>
        </div>
      </div>

      <!-- Comment Replies -->
      <div class="card">
        <div class="flex items-center justify-between">
          <label class="flex items-center gap-2">
            <input
              type="checkbox"
              class="bigger-checkbox"
              :checked="$store.state.messages.commentReplyMode"
              @click="toggleCommentReplyMode()"
            />
            <span class="section-title mb-0">Comment Replies</span>
          </label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            class="chevron-actions"
            :class="{'active-category': openFields['comment-replies']}"
            @click="toggleField('comment-replies')"
          >
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
          </svg>
        </div>
        <div v-if="openFields['comment-replies']" class="mt-4">
          <p class="section-desc">When a user leaves a comment on your posts ChatSetter will comment back.</p>
          <input
            type="text"
            class="styled-input w-full max-w-lg"
            placeholder="Comment Trigger Keywords"
            :value="$store.state.ai.commentTriggerKeywords"
            @change="setCommentKeywordTriggers($event)"
          />
          <p class="small-text">Add keywords separated by commas (e.g. COURSE, HOW, START). Keywords are not case-sensitive.</p>
          <CustomCommentReplies/>
        </div>
      </div>

      <!-- No-respond List -->
      <div class="card">
        <div class="flex items-center justify-between">
          <h3 class="section-title mb-0">No-respond List</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            class="chevron-actions"
            :class="{'active-category': openFields['no-respond-list']}"
            @click="toggleField('no-respond-list')"
          >
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
          </svg>
        </div>
        <div v-if="openFields['no-respond-list']" class="mt-4">
          <p class="section-desc">Enter users to whom ChatSetter should not respond (separated by commas).</p>
          <input
            type="text"
            class="styled-input w-full"
            :value="$store.state.messages.noRespondList"
            placeholder="Usernames, separated by commas"
            @change="updateNoRespondList($event)"
          />
        </div>
      </div>

      <!-- Filters -->
      <div class="card">
        <div class="flex items-center justify-between">
          <h3 class="section-title mb-0">Filters</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            class="chevron-actions"
            :class="{'active-category': openFields['filters']}"
            @click="toggleField('filters')"
          >
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
          </svg>
        </div>
        <div v-if="openFields['filters']" class="mt-4">
          <p class="section-desc">Filter incoming messages. Messages containing these words will not be answered.</p>
          <input
            type="text"
            class="styled-input w-full"
            :value="$store.state.messages.filterList"
            placeholder="Words to filter"
            @change="updateFilterList($event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Convert from '@/components/Convert.vue';
import CustomFollowupMessages from '@/components/CustomFollowupMessages.vue';
import CustomCommentReplies from '@/components/CustomCommentReplies.vue';

export default {
  name: 'ActionsPage',
  layout: 'app',
  components: { Convert, CustomFollowupMessages, CustomCommentReplies },
  data() {
    return { openFields: {} };
  },
  methods: {
    toggleField(field) {
      this.$set(this.openFields, field, !this.openFields[field]);
    },
    toggleFollowUpMode() {
      this.$store.dispatch('messages/toggleFollowUpMode');
    },
    toggleCommentReplyMode() {
      this.$store.dispatch('messages/toggleCommentReplyMode');
    },
    setCommentKeywordTriggers(event) {
      this.$store.dispatch('messages/setCommentKeywordTriggers', event.target.value);
    },
    updateNoRespondList(event) {
      this.$store.dispatch('messages/updateNoRespondList', event.target.value);
    },
    updateFilterList(event) {
      this.$store.dispatch('messages/updateFilterList', event.target.value);
    }
  },
  mounted() {
    const { followup, commentreplies, turnon } = this.$route.query;
    if (followup === 'true' && !this.$store.state.messages.followUpMode) {
      this.toggleFollowUpMode();
    }
    if (commentreplies === 'true' && !this.$store.state.messages.commentReplyMode) {
      this.toggleCommentReplyMode();
    }
    if (turnon && !(this.$store.state.identity.sequences[0]?.active)) {
      this.$store.dispatch('identity/toggleSequenceActive', { sequence: 0 });
    }
  }
};
</script>

<style lang="scss">
$chatsetterGreen: #503de0;
$chatsetterLightBg: #fcfbf7;
$chatsetterText: #333;

.actions-page {
  background-color: $chatsetterLightBg;
  font-family: sans-serif;
}

.card {
  background: #fff;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: $chatsetterGreen;
  margin: 0;
}

.section-desc {
  font-size: 1rem;
  color: $chatsetterText;
  margin: 0;
  margin-bottom: 0.5rem;
}

.bigger-checkbox {
  width: 20px;
  height: 20px;
}

.styled-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid lighten($chatsetterGreen, 40%);
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.styled-input:focus {
  outline: none;
  border-color: $chatsetterGreen;
  box-shadow: 0 0 0 2px rgba($chatsetterGreen,0.2);
}

.chevron-actions {
  width: 24px;
  fill: $chatsetterGreen;
  cursor: pointer;
  transition: transform 0.2s;
}
.chevron-actions.active-category {
  transform: rotate(180deg);
}

.small-text {
  font-size: 0.875rem;
  color: darken($chatsetterText, 30%);
}
</style>
