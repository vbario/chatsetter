<template>
    <div class="internal-chat h-full flex flex-col bg-white shadow">        
        <section class="ai-chat-top flex justify-between items-center p-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="ai-chat-top-icon cursor-pointer"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M463.5 224l8.5 0c13.3 0 24-10.7 24-24l0-128c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8l119.5 0z"/></svg>
            <p class="ai-chat-top-heading text-base font-semibold">Style Chat: {{chatLabel}}</p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="ai-chat-top-icon cursor-pointer"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" @click="closeAIPlayground"/></svg>
        </section>
        <section class="ai-chat-content flex-1 flex p-2 justify-center items-center">
            <div v-if="Object.keys($store.state.ai.reverseConversation).length == 0" class="flex flex-col justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="persona-icon color-primary mb-2"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M256 48C141.1 48 48 141.1 48 256l0 40c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-40C0 114.6 114.6 0 256 0S512 114.6 512 256l0 144.1c0 48.6-39.4 88-88.1 88L313.6 488c-8.3 14.3-23.8 24-41.6 24l-32 0c-26.5 0-48-21.5-48-48s21.5-48 48-48l32 0c17.8 0 33.3 9.7 41.6 24l110.4 .1c22.1 0 40-17.9 40-40L464 256c0-114.9-93.1-208-208-208zM144 208l16 0c17.7 0 32 14.3 32 32l0 112c0 17.7-14.3 32-32 32l-16 0c-35.3 0-64-28.7-64-64l0-48c0-35.3 28.7-64 64-64zm224 0c35.3 0 64 28.7 64 64l0 48c0 35.3-28.7 64-64 64l-16 0c-17.7 0-32-14.3-32-32l0-112c0-17.7 14.3-32 32-32l16 0z"/></svg>
                <h2 class="text-lg font-bold">Style Adjustment</h2>
                <p class="text-center text-sm">The AI will act as the customer.<br/>The way you respond will tell the AI<br/>how to respond.</p>
            </div>
            <div id="reverse-chat-box" class="chat-box-max w-full h-full flex flex-col gap-2" v-else>
                <p class="flex-1"></p>
                <div class="one-message flex flex-col" v-for="(chatMessage, cm) in $store.state.ai.reverseConversation" :class="{'my-message': chatMessage.role == 'user', 'customer-message': chatMessage.role == 'assistant'}">
                    <!-- <span class="message-from-username mb-1 text-base">{{chatMessage.role}}:</span> -->
                    <span class="message-bubble text-base p-3 rounded-sm sm:rounded-3xl max-w-screen-md">{{chatMessage.content[0].text}}</span>                    
                </div>
            </div>
        </section>
        <section class="ai-chat-new-message p-2">
            <form autocomplete="off" class="message-input message-input_ w-full flex items-center gap-2" @submit.prevent="sendPlaygroundChatMessage($event)">
                <input autocomplete="off" class="w-full rounded-sm p-3 sm:rounded-lg" type="text" placeholder="Type like your AI should" name="" v-model="nextChatMessage">
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
  props: ['chatLabel'],
  methods: {
    style () {
        if (this.chatLabel == 'Introduction') {
            return `You're introducing yourself for the first time.`
        } else if (this.chatLabel == 'Casual') {
            return `You're speaking casually to a friend.`
        } else if (this.chatLabel == 'Question') {
            return `You're asking a reasonable question.`
        }
    },
    sendPlaygroundChatMessage (event) {
        event.preventDefault()
        this.$store.dispatch('ai/sendReverseChatMessage', {
            demoConversationId: this.demoConversationId,
            message: this.nextChatMessage,
            style: this.style()
        })
        this.nextChatMessage = ''
    },
    sendStarterStyleMessage () {
        this.$store.dispatch('ai/sendReverseChatMessage', {
            demoConversationId: this.demoConversationId,
            message: 'You just found ChatSetter. Welcome. Start here.'
        })
        this.nextChatMessage = ''
    },
    closeAIPlayground () {
      this.$emit('closeStyleChat', {})
    },
    openAIPlayground () {
      // this.$store.dispatch('ui/openAIPlayground', {})
    }
  },
  mounted () {
    this.$store.dispatch('ai/clearStyleChat', {})
    this.sendStarterStyleMessage()
  }
}
</script>

<style lang="scss">
.internal-chat {
}
.internal-chat {
    height: 100vh;
    min-height: 300px;
}
.chat-box-max {
    overflow: auto;
    max-height: calc(100vh - 170px);   
}

.message-input_ {
    border-top: none !important;
}
.ai-chat-top {
}
.ai-chat-top-icon {
    width: 22px;
    height: 22px;
    fill: #fff;
    pointer-events: bounding-box;
}
.ai-chat-top-heading {
    color: #fff;
}
.persona-icon {
    width: 30px;
    height: 30px;
}
</style>
