<template>
  <div class="custom-comment-replies max-w-2xl">
    <p class="page-subtitle">When someone comments on your posts, ChatSetter will reply automatically.</p>

    <div class="bg-white">
      <h3 class="section-title mb-4">Custom Comment Replies</h3>

      <div class="messages-list">
        <div
          v-for="(msg, msgIndex) in steps[0].messages"
          :key="msgIndex"
          class="flex items-center gap-3"
        >
          <input
            type="text"
            v-model="steps[0].messages[msgIndex]"
            class="input-field flex-1"
            placeholder="Enter comment reply..."
          />
          <button
            class="remove-button text-red-500 hover:text-red-700"
            @click="removeMessage(0, msgIndex)"
            title="Remove Reply"
          >&times;</button>
        </div>
      </div>

      <button
        class="add-button mt-4 w-full"
        @click="addMessage(0)"
      >
        + Add Comment Reply
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomCommentReplies",
  data() {
    return {
      steps: [ { messages: [] } ]
    };
  },
  methods: {
    addMessage(stepIndex) {
      if (this.steps[stepIndex].messages.length < 5) {
        this.steps[stepIndex].messages.push("");
        this.saveMessages();
      }
    },
    removeMessage(stepIndex, msgIndex) {
      this.steps[stepIndex].messages.splice(msgIndex, 1);
      this.saveMessages();
    },
    saveMessages() {
      this.$store.dispatch('messages/saveCommentReplies', { steps: this.steps });
    },
    getCommentReplies() {
      this.$store.dispatch('messages/getCommentReplies')
        .then(res => {
          if (res && res.length) {
            this.steps[0].messages = res[0].messages || [];
          }
        });
    }
  },
  created() {
    this.getCommentReplies();
  }
};
</script>

<style scoped lang="scss">
$chatsetterGreen: #503de0;
$chatsetterWhite: #ffffff;
$chatsetterLightBg: #fcfbf7;
$chatsetterText: #333;

.custom-comment-replies {
  color: $chatsetterText;
}

.page-subtitle {
  font-size: 1rem;
  color: darken($chatsetterText, 20%);
}

.card {
  background-color: $chatsetterWhite;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: $chatsetterGreen;
}

.messages-list {
  margin-top: 1rem;
}

.input-field {
  padding: 0.5rem 0.75rem;
  border: 1px solid lighten($chatsetterGreen, 40%);
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input-field:focus {
  outline: none;
  border-color: $chatsetterGreen;
  box-shadow: 0 0 0 2px rgba($chatsetterGreen, 0.2);
}

.remove-button {
  background: transparent;
  border: none;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
}

.add-button {
  background-color: $chatsetterGreen;
  color: $chatsetterWhite;
  padding: 0.5rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-button:hover {
  background-color: darken($chatsetterGreen, 10%);
}
</style>
