<template>
  <div class="custom-followup-messages space-y-6">
    <p class="page-subtitle">Follow up automatically when users don't reply. Add up to 3 followup messages for each step.</p>

    <div class="steps-container grid gap-6 md:grid-cols-3">
      <div v-for="(step, index) in steps" :key="index" class="step-card p-4 bg-white rounded-lg shadow">
        <h3 class="step-title mb-4">Message {{ index + 1 }}</h3>

        <div class="messages-list space-y-3">
          <div v-for="(msg, msgIndex) in step.messages" :key="msgIndex" class="flex items-center gap-2">
            <input
              type="text"
              v-model="steps[index].messages[msgIndex]"
              class="input-field flex-1"
              placeholder="Enter message..."
            />
            <button
              class="remove-button text-red-500"
              @click="removeMessage(index, msgIndex)"
              title="Remove Message"
            >&times;</button>
          </div>
        </div>

        <button
          class="add-button w-full mt-4"
          @click="addMessage(index)">
          + Add Message
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomFollowupMessages",
  data() {
    return {
      steps: [
        { messages: [] },
        { messages: [] },
        { messages: [] }
      ]
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
      this.$store.dispatch('messages/saveFollowupMessages', { steps: this.steps });
    },
    getFollowupMessages() {
      this.$store.dispatch('messages/getFollowupMessages')
        .then(res => {
          if (res && res.length) {
            this.steps = res.map(step => ({ messages: step.messages || [] }));
          }
        });
    }
  },
  created() {
    this.getFollowupMessages();
  }
};
</script>

<style scoped lang="scss">
$chatsetterGreen: #503de0;
$chatsetterWhite: #ffffff;
$chatsetterLightBg: #fcfbf7;
$chatsetterText: #333;

.custom-followup-messages {
  max-width: 100%;
  color: $chatsetterText;
}

.page-subtitle {
  font-size: 1rem;
  color: darken($chatsetterText, 20%);
}

.steps-container {
  width: 100%;
}

.step-card {
  background-color: $chatsetterWhite;
}

.step-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: $chatsetterGreen;
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
