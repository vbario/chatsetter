<template>
  <div class="custom-followup-messages">
    <!-- <h2 class="page-title">Custom Followup Messages</h2> -->
    <p class="page-subtitle mt-2">
      Follow up automatically when users don't reply. Add up to 3 followup messages for each step.
    </p>
    <div class="steps-container">
      <div class="step" v-for="(step, index) in steps" :key="index">
        <h3 class="step-title">Message {{ index + 1 }}</h3>
        <div class="messages-list">
          <div
            class="message-input"
            v-for="(msg, msgIndex) in step.messages"
            :key="msgIndex"
          >
            <input
              type="text"
              v-model="steps[index].messages[msgIndex]"
              placeholder="Enter message..."
            />
            <button
              class="remove-button"
              @click="removeMessage(index, msgIndex)"
              title="Remove Message"
            >
              &times;
            </button>
          </div>
        </div>
        <button class="add-button" @click="addMessage(index)">
          + Add Message
        </button>
      </div>
    </div>
    <!-- <button class="save-button" @click="saveMessages">
      Save Followup Messages
    </button> -->
  </div>
</template>

<script>
export default {
  name: "CustomFollowupMessages",
  data() {
    return {
      // Three steps, each with an array of custom messages (initially empty)
      steps: [
        { messages: [] },
        { messages: [] },
        { messages: [] }
      ]
    };
  },
  methods: {
    addMessage(stepIndex) {
      this.steps[stepIndex].messages.push("")
      this.saveMessages()
      this.$forceUpdate()
    },
    removeMessage(stepIndex, msgIndex) {
      this.steps[stepIndex].messages.splice(msgIndex, 1);
      this.saveMessages()
      this.$forceUpdate()
    },
    saveMessages() {
      // Here you can dispatch an action or emit an event with the custom messages.
      this.$store.dispatch('messages/saveFollowupMessages', {steps: this.steps})
    },
    getFollowupMessages() {
      this.$store.dispatch('messages/getFollowupMessages', {}).then((res) => {
        console.log('customFollowupMessages res')
        console.log(res)
        if (res && (res.length || Object.keys(res || {}).length)) {
          let steps = this.steps
          steps[0] = res[0] || { messages: [] }
          steps[1] = res[1] || { messages: [] }
          steps[2] = res[2] || { messages: [] }
          console.log('steps')
          console.log(steps)
          this.steps = steps
          this.$forceUpdate()
        }
      })
    }
  },
  created () {
    this.getFollowupMessages()
  }
}
</script>

<style scoped>
/* Brand Variables */
:root {
  --chatsetter-green: #046c38;
  --chatsetter-white: #ffffff;
  --chatsetter-light-bg: #f7f7f7;
  --chatsetter-text: #333;
  --chatsetter-border: #c8e6d1;
}

/* Container styling */
.custom-followup-messages {
  max-width: 800px;
  /*margin: 2rem auto;*/
  /*background-color: var(--chatsetter-white);*/
  /*padding: 2rem;*/
  border-radius: 8px;
  /*box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);*/
  /*font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;*/
  color: var(--chatsetter-text);
  text-align: center;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--chatsetter-green);
  margin-bottom: 0.5rem;
}

.page-subtitle {
  font-size: 1rem;
  color: #555;
  margin-bottom: 2rem;
  text-align: left;
}

/* Steps Container */
.steps-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (min-width: 768px) {
  .steps-container {
    flex-direction: row;
  }
}

/* Each Step Styling */
.step {
  flex: 1;
  background-color: var(--chatsetter-light-bg);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.step-title {
  font-size: 1.5rem;
  color: var(--chatsetter-green);
  margin-bottom: 1rem;
}

/* Message Input List */
.messages-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

/* Single Message Input */
.message-input {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.message-input input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--chatsetter-border);
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.message-input input:focus {
  border-color: var(--chatsetter-green);
  box-shadow: 0 0 0 2px rgba(4, 108, 56, 0.2);
  outline: none;
}

/* Remove Button */
.remove-button {
  background: transparent;
  border: none;
  color: #e57373;
  font-size: 1.25rem;
  cursor: pointer;
  line-height: 1;
}

/* Add Button */
.add-button {
  background-color: var(--chatsetter-green);
  color: var(--chatsetter-white);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-button:hover {
  background-color: #03562d;
}

/* Save Button */
.save-button {
  width: 100%;
  background-color: var(--chatsetter-green);
  color: var(--chatsetter-white);
  border: none;
  padding: 1rem;
  font-size: 1.125rem;
  font-weight: 600;
  border-radius: 0.375rem;
  cursor: pointer;
  margin-top: 2rem;
  transition: background-color 0.3s, transform 0.2s;
}

.save-button:hover {
  background-color: #03562d;
  transform: translateY(-2px);
}
</style>
