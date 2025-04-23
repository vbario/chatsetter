<template>
    <div class="internal-chat h-full flex flex-col bg-white shadow">        
        <section class="ai-chat-top flex justify-between items-center p-2">
            <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="ai-chat-top-icon cursor-pointer"><path d="M463.5 224l8.5 0c13.3 0 24-10.7 24-24l0-128c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8l119.5 0z"/></svg> -->
            <p class="ai-chat-top-heading text-base font-semibold">ChatSetter</p>
            <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="ai-chat-top-icon cursor-pointer"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" @click="closeAIPlayground"/></svg> -->
        </section>
        <section class="ai-chat-content flex-1 flex p-2 justify-center items-center">
            <div v-if="Object.keys($store.state.ai.playgroundConversation).length == 0" class="flex flex-col justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="persona-icon color-primary mb-2"><path d="M416 176c0 97.2-93.1 176-208 176c-38.2 0-73.9-8.7-104.7-23.9c-7.5 4-16 7.9-25.2 11.4C59.8 346.4 37.8 352 16 352c-6.9 0-13.1-4.5-15.2-11.1s.2-13.8 5.8-17.9c0 0 0 0 0 0s0 0 0 0l.2-.2c.2-.2 .6-.4 1.1-.8c1-.8 2.5-2 4.3-3.7c3.6-3.3 8.5-8.1 13.3-14.3c5.5-7 10.7-15.4 14.2-24.7C14.7 250.3 0 214.6 0 176C0 78.8 93.1 0 208 0S416 78.8 416 176zM231.5 383C348.9 372.9 448 288.3 448 176c0-5.2-.2-10.4-.6-15.5C555.1 167.1 640 243.2 640 336c0 38.6-14.7 74.3-39.6 103.4c3.5 9.4 8.7 17.7 14.2 24.7c4.8 6.2 9.7 11 13.3 14.3c1.8 1.6 3.3 2.9 4.3 3.7c.5 .4 .9 .7 1.1 .8l.2 .2s0 0 0 0s0 0 0 0c5.6 4.1 7.9 11.3 5.8 17.9c-2.1 6.6-8.3 11.1-15.2 11.1c-21.8 0-43.8-5.6-62.1-12.5c-9.2-3.5-17.8-7.4-25.2-11.4C505.9 503.3 470.2 512 432 512c-95.6 0-176.2-54.6-200.5-129zM228 72c0-11-9-20-20-20s-20 9-20 20l0 14c-7.6 1.7-15.2 4.4-22.2 8.5c-13.9 8.3-25.9 22.8-25.8 43.9c.1 20.3 12 33.1 24.7 40.7c11 6.6 24.7 10.8 35.6 14l1.7 .5c12.6 3.8 21.8 6.8 28 10.7c5.1 3.2 5.8 5.4 5.9 8.2c.1 5-1.8 8-5.9 10.5c-5 3.1-12.9 5-21.4 4.7c-11.1-.4-21.5-3.9-35.1-8.5c-2.3-.8-4.7-1.6-7.2-2.4c-10.5-3.5-21.8 2.2-25.3 12.6s2.2 21.8 12.6 25.3c1.9 .6 4 1.3 6.1 2.1c0 0 0 0 0 0s0 0 0 0c8.3 2.9 17.9 6.2 28.2 8.4l0 14.6c0 11 9 20 20 20s20-9 20-20l0-13.8c8-1.7 16-4.5 23.2-9c14.3-8.9 25.1-24.1 24.8-45c-.3-20.3-11.7-33.4-24.6-41.6c-11.5-7.2-25.9-11.6-37.1-15l-.7-.2c-12.8-3.9-21.9-6.7-28.3-10.5c-5.2-3.1-5.3-4.9-5.3-6.7c0-3.7 1.4-6.5 6.2-9.3c5.4-3.2 13.6-5.1 21.5-5c9.6 .1 20.2 2.2 31.2 5.2c10.7 2.8 21.6-3.5 24.5-14.2s-3.5-21.6-14.2-24.5c-6.5-1.7-13.7-3.4-21.1-4.7L228 72z"/></svg>
                <h2 class="text-lg font-bold">Try your ChatSetter</h2>
                <p class="text-center text-sm">Type like your leads to see how<br/>ChatSetter handles the conversation.</p>
            </div>
            <div id="playground-chat-box" class="chat-box-max w-full h-full flex flex-col gap-2" v-else>
                <p class="flex-1"></p>
                <div class="one-message flex flex-col" v-for="(chatMessage, cm) in $store.state.ai.playgroundConversation" :class="{'my-message': chatMessage.role == 'user', 'customer-message': chatMessage.role == 'assistant'}">
                    <!-- <span class="message-from-username mb-1 text-base">{{chatMessage.role}}:</span> -->
                    <span class="message-bubble text-base p-3 rounded-sm sm:rounded-3xl max-w-screen-md">{{chatMessage.content[0].text}}</span>                    
                </div>
            </div>
        </section>
        <section class="ai-chat-new-message p-2">
            <form autocomplete="off" class="message-input message-input_ w-full flex items-center gap-2" @submit.prevent="sendPlaygroundChatMessage($event)">
                <input autocomplete="off" class="w-full rounded-sm p-3 sm:rounded-lg" type="text" placeholder="Type like a customer" name="" v-model="nextChatMessage">
                <button class="send-button rounded-sm p-2 sm:rounded-xl small-button-4 flex gap-2 items-center" type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="small-icon-4"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376l0 103.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z"/></svg>
                    <p class="send-button-text text-base">Send</p>
                </button>
            </form>
        </section>
        <!-- <h2 class="text-2xl leading-7 font-semibold">Internal AI Chat</h2> -->
        <!-- <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css" rel="stylesheet"> -->
        <!-- <div class="test">
            <p @click="setUid()">{{$store.state.auth.uid}}</p>
            <p @click="addToUid()">+ '1'</p>
            <ul>
                <li v-for="todo in todos" :key="todo.text">
                    <input :checked="todo.done" @change="toggle(todo)" type="checkbox">
                    <span :class="{ done: todo.done }">{{ todo.text }}</span>
                </li>
                <li><input @keyup.enter="addTodo" placeholder="What needs to be done?"></li>
            </ul>
        </div> -->

      <!-- <p>bbb</p> -->
    </div>
</template>

<script>
export default {
  name: 'InternalAIChat',
  data () {
    return {
        nextChatMessage: '',
        demoConversationId: ''
    }
  },
  methods: {
    sendPlaygroundChatMessage (event) {
        event.preventDefault()
        this.$store.dispatch('ai/sendPlaygroundChatMessage', {
            demoConversationId: this.demoConversationId,
            message: this.nextChatMessage
        })
        this.nextChatMessage = ''
    },
    closeAIPlayground () {
      this.$store.dispatch('ui/closeAIPlayground', {})
    },
    openAIPlayground () {
      this.$store.dispatch('ui/openAIPlayground', {})
    }
  }
}
</script>

<style lang="scss">
.internal-chat {
    width: 100%;
    max-width: 1000px;
    /*min-height: 100%;*/
}
.internal-chat {
    height: 100vh;
    min-height: 300px;
    /*max-height: calc(100vh - 50px);*/
}
.chat-box-max {
    overflow: auto;
    max-height: calc(100vh - 170px);   
}

.message-input_ {
    border-top: none !important;
}
.ai-chat-top {
    /*background-color: #4ad38e;*/
    background-color: #9187e5;
}
.ai-chat-top-icon {
    width: 22px;
    height: 22px;
    fill: #fff;
    pointer-events: bounding-box;
}
.ai-chat-top-heading {
    color: #fff;
    width: 100%;
    text-align: center;
}
.persona-icon {
    width: 30px;
    height: 30px;
}
</style>
