<template>
    <div class="container flex flex-col p-8">
      <div v-if="showConfirmationDialogue" class="show-confirmation-dialogue rounded-xl absolute p-4">
        <div class="w-full h-full flex flex-col gap-4">
          <h3 class="text-xl bold">
            Would you like for ChatSetter to respond to all existing conversations that are already in primary, general and message requests?
          </h3>
          <p>
            Please list out all IG handles that you would like ChatSetter to NOT have a conversation with (for example, significant other, friend, etc.)
          </p>
          <input autocomplete="off" class="exclude-list p-4 rounded-xl" type="text" v-model="excludeList" placeholder="Excluded Instagram usernames" name="">
          <div class="flex gap-2">
            <button class="send-button-2 rounded-sm p-2 sm:rounded-xl small-button-5 flex gap-2 justify-center items-center send-button-2b">
              <p class="send-button-text text-base" @click="activateMassMessaging()">Go</p>
            </button>
            <button class="send-button-2 rounded-sm p-2 sm:rounded-xl small-button-5 flex gap-2 justify-center items-center send-button-2b2">
              <p class="send-button-text text-base" @click="closeConfrimationDialogue()">Close</p>
            </button>
          </div>
        </div>
      </div>
      <h2 class="text-2xl leading-7 font-semibold mb-4">Sequences</h2>
      <p class="mb-3">Design your engagement flow.</p>
      <div v-show="!(showingSequence || (showingSequence === 0))" class="w-full flex flex-col mt-6">
          <div class="flex w-full gap-4">
            <button class="rounded-sm p-1 pl-2 pr-2 sm:rounded-lg small-button flex gap-2 items-center" @click="catchUp()">
              Catch Up On All Messages
            </button>
            <p class="flex-1"></p>
            <!-- <input class="w-full rounded-sm p-3 sm:rounded-lg" type="text" placeholder="Search sequences..." name=""> -->
            <button class="send-button-2 rounded-sm p-2 sm:rounded-xl small-button-5 flex gap-2 justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="small-icon-5"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
              <p class="send-button-text text-base" @click="addSequence()">Add Sequence</p>
            </button>
          </div>
          <div class="flex flex-col">
              <div class="flex justify-between items-center _list-heading w-full p-2 mt-4">
                  <p class="flex-1 text-base font-semibold">Name</p>
                  <!-- <p class="flex-1 text-base font-semibold">Tags</p> -->
                  <!-- <p class="flex-1 text-base font-semibold">Platform</p> -->
                  <p class="flex-1 text-base font-semibold">Enabled</p>
                  <p class="flex-1 text-base font-semibold"></p>
              </div>
              <div class="flex justify-between items-center _list-item w-full p-2" v-for="(sequence, s) in $store.state.identity.sequences">
                  <p class="flex-1 text-base font-semibold mr-4">{{sequence.name}}</p>
                  <!-- <p class="flex-1 text-base">Test</p> -->
                  <!-- <p class="flex-1 text-base">Test</p> -->
                  <p class="flex-1 text-base">
                    <label class="switch">
                        <input autocomplete="off" type="checkbox" :checked="sequence.active" @change="toggleSequenceActive(s, $event)">
                        <span class="slider round"></span>
                    </label>
                  </p>
                  <div class="flex-1 actions flex items-center gap-4 justify-end">
                    <svg @click="deleteSequence(s)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="edit-pencil delete-icon"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                    <svg @click="editSequence(s)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="edit-pencil delete-icon"><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>
                  </div>
              </div>
          </div>
      </div>
      <div v-show="showingSequence || (showingSequence === 0)" class="w-full flex flex-col gap-4 mt-6">
        <div class="flex items-center gap-2 cursor-pointer" @click="editSequence(false)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="back-chevron color-x"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
          <p class="color-x text-sm">Back to sequences</p>
        </div>
        <div class="w-full flex justify-center items-center gap-2">
          <input autocomplete="off" v-show="editingSequenceName" type="" name="" :value="$store.state.identity.sequences[showingSequence] && $store.state.identity.sequences[showingSequence].name" @change="changeSequenceName(showingSequence, $event)">
          <p v-show="!editingSequenceName" class="edit-sequence-name">{{$store.state.identity.sequences[showingSequence] && $store.state.identity.sequences[showingSequence].name}}</p>
          <svg @click="toggerEditSequenceName()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="edit-pencil"><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>
          <span class="width-full flex items-center gap-2">
              <span class="text-sm pl-2 pr-2 rounded-sm sm:rounded-2xl message-tag platform-tag">Instagram</span>
          </span>
          <div class="flex-1 flex justify-end items-center p-2 gap-2">
            <p>Active</p>
            <label class="switch">
                <input autocomplete="off" type="checkbox" :checked="$store.state.identity.sequences[showingSequence] ? $store.state.identity.sequences[showingSequence].active : false" @change="toggleSequenceActive(showingSequence, $event)">
                <!-- {{$store.state.identity.sequences[showingSequence].active}} -->
                <span class="slider round"></span>
            </label>
          </div>
        </div>
        <div class="w-full sequence-category flex flex-col add-type rounded-xl">
          <div class="w-full flex items-center p-6 gap-4 bgcg rounded-tl-xl rounded-tr-xl">
            <p class="sequence-step-word p-2 rounded font-semibold">When</p>
            <div class="flex-1 flex flex-col">
              <p class="font-semibold">When this happens:</p>
              <p>When this event happens, the sequence starts</p>
            </div>
            <button class="send-button-2 rounded-sm p-2 sm:rounded-xl small-button-5 flex gap-2 justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="small-icon-5"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
                <p @click="addNewTrigger()" class="send-button-text text-base">Add Trigger</p>
            </button>
          </div>
          <div class="trigger-list w-full flex flex-col items-center gap-4 p-6">
            <div v-if="$store.state.identity.sequences[showingSequence]" v-for="(trigger, t) in ($store.state.identity.sequences[showingSequence] || {}).triggers" class="one-trigger w-full flex items-center gap-4 p-6">
              <p class="text-2xl font-medium">{{t + 1}}</p>
              <p>Type:</p>
              <select class="rounded-sm p-3 sm:rounded-lg">
                <option value="dm_general">Direct Message</option>
                <option value="story_reply">Story Reply</option>
                <option value="comment">Comment</option>
              </select>
              <div class="flex flex-col">
                <p class="text-base">Keywords:</p>
                <!-- <p class="text-sm">Words that must appear in the message</p> -->
              </div>
              <input autocomplete="off" type="text" name="" :value="trigger.keywords" @change="editTriggerKeywords(showingSequence, t, $event)" placeholder="Must contain" class="flex-1 rounded-sm p-3 sm:rounded-lg">
              <!-- <p class="flex-1">
              </p> -->
              <div class="actions flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="edit-pencil delete-icon"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="edit-pencil"><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg> -->
              </div>
            </div>
          </div>
        </div>
        <div class="w-full sequence-category flex flex-col add-type rounded-xl">
          <div class="w-full flex items-center p-6 gap-4 bgcg rounded-tl-xl rounded-tr-xl">
            <p class="sequence-step-word p-2 rounded font-semibold">Then</p>
            <div class="flex-1 flex flex-col">
              <p class="font-semibold">Perform these tasks:</p>
              <!-- <p>When this event happens, the sequence starts</p> -->
            </div>
            <button class="send-button-2 rounded-sm p-2 sm:rounded-xl small-button-5 flex gap-2 justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="small-icon-5"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
                <p @click="addNewTask()" class="send-button-text text-base">Add Task</p>
            </button>
          </div>
          <div class="trigger-list w-full flex items-center gap-4 p-6">
            <div v-if="$store.state.identity.sequences[showingSequence]" v-for="(task, t) in ($store.state.identity.sequences[showingSequence] || {}).tasks" class="one-trigger w-full flex items-center gap-4 p-6">
            <!-- <div v-if="$store.state.identity.sequences[showingSequence]" v-for="(trigger, t) in ($store.state.identity.sequences[showingSequence] || {}).triggers" class="one-trigger w-full flex items-center gap-4 p-6"> -->
              <p class="text-2xl font-medium">{{t + 1}}</p>
                <!-- <p>Type:</p> -->
                <!-- <select class="rounded-sm p-3 sm:rounded-lg">
                  <option value="dm_general">Direct Message</option>
                  <option value="story_reply">Story Reply</option>
                  <option value="comment">Comment</option>
                </select> -->
                <div class="flex flex-col">
                  <p class="text-base">Task:</p>
                  <!-- <p class="text-sm">Words that must appear in the message</p> -->
                </div>
                <input autocomplete="off" type="text" name="" @change="editTaskTask(showingSequence, t, $event)" :value="task.task" placeholder="What would you like to happen?" class="flex-1 rounded-sm p-3 sm:rounded-lg">
                <div class="flex flex-col">
                  <p class="text-base">Goal:</p>
                  <!-- <p class="text-sm">Words that must appear in the message</p> -->
                </div>
                <input autocomplete="off" type="text" name="" @change="editTaskGoal(showingSequence, t, $event)" :value="task.goal" placeholder="What is the outcome of the task?" class="flex-1 rounded-sm p-3 sm:rounded-lg">
              <div class="actions flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="edit-pencil delete-icon"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="edit-pencil delete-icon"><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'SequencesPage',
  layout: 'app',
  data () {
    return {
        showingSequence: false,
        editingSequenceName: false,
        showConfirmationDialogue: false,
        excludeList: ''
    }
  },
  methods: {
    catchUp () {
      this.$store.dispatch('messages/catchUp', {}).then((res) => {
        // this.getMySequences()
      })
    },
    toggerEditSequenceName () {
      this.editingSequenceName = !this.editingSequenceName
    },
    activateMassMessaging () {
      this.$store.dispatch('identity/activateMassMessaging', {
        showConfirmationDialogue: this.showConfirmationDialogue,
        excludeList: this.excludeList
      }).then((res) => {
        // this.getMySequences()
      })
      this.showConfirmationDialogue = false
    },
    closeConfrimationDialogue () {
      this.showConfirmationDialogue = false
    },
    changeSequenceName(showingSequence, event) {
      console.log('changeSequenceName', showingSequence, event.target.value)
      this.$store.dispatch('identity/changeSequenceName', {sequenceIndex: showingSequence, value: event.target.value}).then((res) => {
        this.getMySequences()
      })
      this.editingSequenceName = false
    },
    editTaskTask(showingSequence, t, event) {
      console.log('editTaskTask', showingSequence, t, event.target.value)
      this.$store.dispatch('identity/editTaskTask', {sequenceIndex: showingSequence, taskIndex: t, value: event.target.value}).then((res) => {
        this.getMySequences()
      })
    },
    editTaskGoal(showingSequence, t, event) {
      console.log('editTaskGoal', showingSequence, t, event.target.value)
      this.$store.dispatch('identity/editTaskGoal', {sequenceIndex: showingSequence, taskIndex: t, value: event.target.value}).then((res) => {
        this.getMySequences()
      })
    },
    editTriggerKeywords(showingSequence, t, event) {
      console.log('editTriggerKeywords', showingSequence, t, event.target.value)
      this.$store.dispatch('identity/editTriggerKeywords', {sequenceIndex: showingSequence, triggerIndex: t, value: event.target.value}).then((res) => {
        this.getMySequences()
      })
    },
    addSequence () {
      this.$store.dispatch('identity/addSequence', {}).then((res) => {
        this.getMySequences()
      })
    },
    editSequence (s) {
      this.showingSequence = s
    },
    deleteSequence (s) {
      this.$store.dispatch('identity/deleteSequence', {sequenceIndex: s}).then((res) => {
        this.getMySequences()
      })
    },
    addNewTask (s) {
    },
    addNewTrigger (s) {
    },
    deleteTask (s, t) {
    },
    deleteTrigger (s, t) {
    },
    toggleSequenceActive (s, event) {
      let value = event.target.checked
      console.log('value', value)
      if (value) {
        this.showConfirmationDialogue = true
      } else {
        this.showConfirmationDialogue = false
      }

      console.log('toggleSequenceActive', s, event.target.value)
      this.$store.dispatch('identity/toggleSequenceActive', {
          sequence: s
      }).then((res) => {})
    },
    createNewSequence () {
        // create new sequence entry with default settings
        // get sequenceId
        // this.showSequence(sequenceId)
    },
    getMySequences () {
      this.$store.dispatch('identity/getSequences', {
          // conversationId: this.$store.state.messages.conversations[this.showConversation].id,
          // message: this.newMessage,
          // receiver_instagram_id: this.otherUid()
      }).then((res) => {
          // this.tempMessage = false
          // this.$forceUpdate()
      })
    },
    showSequence (sequenceId) {
        this.showingSequence = sequenceId
    }
  },
  created () {
    this.getMySequences()
  }
}
</script>

<style lang="scss">
._list-heading {
    background-color: #e7eff7;
}
._list-heading > p {
    color: #555;
}
.back-chevron {
  width: 9px;
}
.edit-pencil {
  width: 12px;
  cursor: pointer;
}
.add-type {
  border: 1px solid #ddd;
}
.trigger-list {
  border-top: 1px solid #ddd;
}
.sequence-step-word {
  border: 2px solid #2196F3;
  background-color: #fff;
  color: #2196F3;
}
.delete-icon {
  color: #888;
  fill: #888;
}
.color-x {
  color: #2196F3;
  fill: #2196F3;
}
.bgcg {
  background-color: #fafafa;
}
.show-confirmation-dialogue {
  border: 2px solid grey;
  background-color: #fff;
  z-index: 10;
}
.exclude-list {
  border: 1px solid grey;
}
.send-button-2b {
  align-self: flex-start !important;
}
.send-button-2b2 {
  align-self: flex-start !important;
  background-color: transparent !important;
  border: 1px solid #000 !important;
}
.send-button-2b2 {
  & > p {
    color: #000 !important;
  }
}
</style>