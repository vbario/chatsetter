<template>
    <div class="ai-chat ai-chat-h flex flex-col bg-white shadow">        

        <section class="ai-chat-content flex-1 flex flex-col p-6 pb-4 pr-2 justify-end items-center overflow-auto">
            <div v-if="Object.keys($store.state.ai.aiConversation).length == 0" class="flex-1 flex flex-col justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="persona-icon color-primary mb-2"><path d="M256 48C141.1 48 48 141.1 48 256l0 40c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-40C0 114.6 114.6 0 256 0S512 114.6 512 256l0 144.1c0 48.6-39.4 88-88.1 88L313.6 488c-8.3 14.3-23.8 24-41.6 24l-32 0c-26.5 0-48-21.5-48-48s21.5-48 48-48l32 0c17.8 0 33.3 9.7 41.6 24l110.4 .1c22.1 0 40-17.9 40-40L464 256c0-114.9-93.1-208-208-208zM144 208l16 0c17.7 0 32 14.3 32 32l0 112c0 17.7-14.3 32-32 32l-16 0c-35.3 0-64-28.7-64-64l0-48c0-35.3 28.7-64 64-64zm224 0c35.3 0 64 28.7 64 64l0 48c0 35.3-28.7 64-64 64l-16 0c-17.7 0-32-14.3-32-32l0-112c0-17.7 14.3-32 32-32l16 0z"/></svg>
                <h2 class="text-lg font-bold">Your Awesome Chat Setter</h2>
                <p class="text-center text-sm">Type like your customers to see<br/>how ChatSetter responds in real time.</p>
            </div>
            <div id="demo-chat-box" class="flex flex-col overflow-auto w-full gap-4 pr-2" v-else>
                <!-- <div v-for="(chatMessage, cm) in $store.state.ai.aiConversation" class="chat-message"> -->
                <div class="one-message flex flex-col" v-for="(chatMessage, cm) in $store.state.ai.aiConversation" :class="{'my-message': chatMessage.role == 'user', 'customer-message': chatMessage.role == 'assistant'}">
                    <!-- <span class="message-from-username mb-1 text-base">{{chatMessage.role}}:</span> -->
                    <span class="message-bubble text-base p-3 rounded-sm sm:rounded-3xl max-w-screen-md">{{chatMessage.content[0].text}}</span>                    
                </div>
            </div>
        </section>
        <section class="ai-chat-new-message p-2">
            <form autocomplete="off" class="message-input message-input_ w-full flex items-center gap-2" @submit.prevent="sendDemoChatMessage($event)">
                <input autocomplete="off" class="w-full rounded-sm p-3 sm:rounded-lg" type="text" placeholder="Type like a customer" name="" v-model="nextChatMessage">
                <button class="send-button rounded-sm p-2 sm:rounded-xl small-button-4 flex gap-2 items-center" type="submit"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="small-icon-4"><path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376l0 103.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z"></path></svg> <p class="send-button-text text-base">Send</p></button>
            </form>
        </section>
    </div>
</template>

<script>
export default {
  name: 'DemoAIChat',
  data () {
    return {
        nextChatMessage: '',
        demoConversationId: ''
    }
  },
  methods: {
    sendDemoChatMessage (event) {
        event.preventDefault()
        this.$store.dispatch('ai/sendDemoChatMessage', {
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
.ai-chat {
    width: 500px;
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
.ai-chat {
    height: 100vh;
    min-height: 300px;
    max-height: 60vh;
}

.send-button {
    height: 48px;
}
.send-button-2 {
    height: 48px;
}
.send-button-text {
    color: #fff;
}
.small-button-4 {
    background-color: #5a95f1;
    outline: #5a95f1;
    border: 1px solid #5a95f1;
}
.small-icon-4 {
    height: 16px;
    width: 16px;
    color: #fff;
    fill: #fff;
}
.my-message > .message-from-username, .my-message > .message-time-sent {
    text-align: right;
}
.customer-message > .message-from-username, .customer-message > .message-time-sent {
    /*text-align: right;*/
}
.my-message > .message-bubble {
    background-color: #f6f6f6;
    margin-left: 40px;
    align-self: flex-end;
}
.customer-message > .message-bubble {
    background-color: #ebebeb;
    margin-right: 40px;
}

#demo-chat-box {   
  scrollbar-color: #d5d5d5 transparent;
}
</style>
