<template>
    <!-- <div v-if="($store.state.auth.uid == 'rSyPXXN4JnULbwGBWmeF3dL7PCg1') || ($store.state.auth.uid == 'ia3iUX9laNhxjS8yp9Al73JRYxl2')" class="container flex flex-col"> -->
    <div v-if="true" class="container flex flex-col">
        <section class="flex flex-col p-8 pb-0">
            <h2 class="text-2xl leading-7 font-semibold mb-1">Add a Script</h2>
            <p>Give your AI a script to follow</p>
            <textarea placeholder="A script to follow" class="w-full h-x_ rounded-sm p-3 sm:rounded-xl mt-2" :value="$store.state.identity.memory.script" @change="updateScript($event)"></textarea>
            <h2 class="text-2xl leading-7 font-semibold mb-1 mt-8">Add Objection Handling</h2>
            <p>Handle Objections</p>
            <textarea placeholder="List of objections and responses" class="w-full h-x_ rounded-sm p-3 sm:rounded-xl mt-2" :value="$store.state.identity.memory.objections" @change="updateObjections($event)"></textarea>
            <br/>
            <!-- <p>{{$store.state.identity.memory}}</p> -->
        </section>
    </div>
    <div v-else class="container flex flex-col">
        <section class="flex flex-col p-8 pb-0">
            <h2 class="text-2xl leading-7 font-semibold mb-1">Memory</h2>
            <p>Add files to your AI's memory</p>
        </section>
        <section class="flex flex-col p-8 pb-4 gap-4">
            <!-- <div class="w-full flex items-center gap-2">
                <input class="w-full rounded-sm p-3 sm:rounded-xl" placeholder="Filter documents" type="number" name="">
                <div class="flex items-center gap-2">
                    <button class="send-button rounded-sm p-2 sm:rounded-xl small-button-4 flex gap-2 justify-center items-center w-32">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="small-icon-4"><path d="M288 109.3L288 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-242.7-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352l128 0c0 35.3 28.7 64 64 64s64-28.7 64-64l128 0c35.3 0 64 28.7 64 64l0 32c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64l0-32c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/></svg>
                        <p class="send-button-text text-base whitespace-nowrap">Upload</p>
                    </button>
                </div>
            </div> -->
            <div class="w-full">
                <DropzoneUploader @file_uploaded="fileUploaded"/>
            </div>
        </section>
        <section class="flex flex-col p-8 pb-0">
            <h2 class="text-2xl leading-7 font-semibold mb-1">Identity Files</h2>
            <p>These files are in your Identity's memory</p>
        </section>
        <div class="flex flex-col p-8 pt-0">
          <div class="flex justify-between items-center _list-heading w-full p-2 mt-4">
              <p class="flex-1 text-base font-semibold">Name</p>
              <!-- <p class="flex-1 text-base font-semibold">Tags</p> -->
              <!-- <p class="flex-1 text-base font-semibold">Platform</p> -->
              <p class="text-base font-semibold">Enabled</p>
              <p class="flex-1 text-base font-semibold"></p>
              <p class="text-base font-semibold"></p>
          </div>
            <div class="flex flex-col w-full" v-for="(file, f) in ($store.state.identity.memory || {}).files">
              <div class="flex justify-between items-center _list-item w-full p-2">
                <!-- <div class="flex justify-between items-center _list-item w-full p-2"> -->
                  <p class="flex-1 file-name">{{file.name}}</p>
                  <label class="switch _trl">
                      <input type="checkbox" :checked="file.active" disabled>
                      <span class="slider round"></span>
                  </label>
                  <p class="flex-1"></p>
                  <svg @click="deleteFile(f)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="edit-pencil delete-icon"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
              </div>
              <div class="flex flex-col _list-item w-full p-2">
                <p>What should the AI do with this file?</p>
                <input type="" :value="file.instruction" class="instruction-input w-full rounded-sm p-3 sm:rounded-xl" name="" @change="updateFileInstruction(f, $event)">
              </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'MemoryPage',
  layout: 'app',
  data () {
    return {
    }
  },
  methods: {
    updateScript (event) {
      let newValue = event.target.value
      console.log('new value', newValue)
      this.$store.dispatch('identity/updateScript', {newValue})
    },
    updateObjections (event) {
      let newValue = event.target.value
      console.log('new value', newValue)
      console.log('new value', JSON.stringify(newValue))
      this.$store.dispatch('identity/updateObjections', {newValue})
    },
    updateFileInstruction(f, event) {
      let newValue = event.target.value
      this.$store.dispatch('identity/updateFileInstruction', {
        fileIndex: f,
        newValue
      }).then((res) => {
        // this.getMyMemory()
      })
    },
    fileUploaded () {
      console.log('fileUploaded')
      setTimeout(() => {
        this.getMyMemory()
      }, 500)
    },
    addLink () {
        //
    },
    setTab (tab) {
        this.openTab = tab
    },
    deleteFile (index) {
      this.$store.dispatch('identity/deleteFile', {
        fileIndex: index
          // conversationId: this.$store.state.messages.conversations[this.showConversation].id,
          // message: this.newMessage,
          // receiver_instagram_id: this.otherUid()
      }).then((res) => {
        this.getMyMemory()
          // this.tempMessage = false
          // this.$forceUpdate()
      })
    },
    getMyMemory () {
      this.$store.dispatch('identity/getMemory', {
          // conversationId: this.$store.state.messages.conversations[this.showConversation].id,
          // message: this.newMessage,
          // receiver_instagram_id: this.otherUid()
      }).then((res) => {
          // this.tempMessage = false
          // this.$forceUpdate()
      })
    }
  },
  created () {
    this.getMyMemory()
  }
}
</script>

<style lang="scss">
.page-tab {
    border-bottom: 4px solid transparent;
}
.page-tab-selected {
    color: #2196F3;
    border-bottom: 4px solid #2196F3;
}
.identity-heading {
    color: #8d96a7;
}
.input-heading {
    color: #000;
}
.small-input {
    max-width: 200px;
}
.identity-textarea {
    height: 150px;
}
.scenario {
    border: 2px solid #ddd;
}
._trl {
    transform: translateX(-5px);
}
.file-name {
  padding-right: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis ellipsis;
}
.instruction-input {
  outline: #ddd;
  border: 1px solid #ddd;
}
.h-x_ {
  height: 400px;
}
</style>