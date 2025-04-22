<template>
    <div class="container flex flex-col relative style-app-container">
        <div v-if="showingStyleChat || (showingStyleChat === 0)" class="style-chat-wrapper">
            <div class="w-full h-full flex justify-center items-center">
                <StyleChat :chatLabel="showingStyleChat" @closeStyleChat="openStyleChat(false)"/>
            </div>
        </div>
        <section class="flex flex-col p-8 pb-0">
            <h2 class="text-2xl leading-7 font-semibold mb-1">Style</h2>
            <p class="mb-4">Give your AI its own style.</p>
            <span class="tabs flex items-center gap-4">
              <p class="page-tab p-1 pl-0 pr-0 cursor-pointer" :class="{'page-tab-selected': openTab == 'personality'}" @click="setTab('personality')">Personality</p>
              <p class="page-tab p-1 pl-0 pr-0 cursor-pointer" :class="{'page-tab-selected': openTab == 'instructions'}" @click="setTab('instructions')">Instructions</p>
            </span>
        </section>
        <hr>
        <section v-if="openTab == 'personality'" class="flex flex-col p-8">
            <!-- <h3 class="text-lg leading-7 font-semibold mb-1">Personality</h3> -->
            <!-- <p class="text-bas mb-3">Teach your AI to speak for your brand.</p> -->
            <!-- <h4 class="text-sm mt-3 font-medium identity-heading">All Information</h4> -->

            <button class="send-button-2 rounded-sm p-2 sm:rounded-xl small-button-5 flex gap-2 justify-center items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="small-icon-5"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
                <p class="send-button-text text-base">Add Scenario</p>
            </button>
            <!-- <h5 class="text-sm mt-3 mb-2 font-semibold input-heading">Basic</h5> -->
            <div class="scenarios w-full flex flex-col gap-4">
                <div class="scenario flex items-center rounded-xl p-8 gap-4" v-for="(style, s) in ($store.state.identity.style || [])">
                    <div class="flex w-full gap-4">
                        <div class="flex justify-center items-center">
                            <p class="text-2xl">
                                {{s + 1}}
                            </p>
                        </div>                            
                        <div class="flex flex-1 gap-4">
                            <div class="scenario-info flex-1 flex flex-col">
                                <!-- <h5 class="text-sm mb-2 font-semibold input-heading">Introduction</h5> -->
                                <input autocomplete="off" type="text" class="w-full rounded-sm p-3 sm:rounded-lg" name="" :value="style.situation">
                            </div>
                            <div class="scenario-actions flex justify-center items-center">
                                <button @click="openStyleChat(s)" class="rounded-sm p-3 sm:rounded-lg small-button flex gap-2 items-center">
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="scenario flex items-center rounded-xl p-8">
                    <div class="scenario-info flex-1 flex flex-col">
                        <h5 class="text-sm mb-2 font-semibold input-heading">Casual</h5>
                        <p>Show how the AI should act in a casual conversation</p>
                    </div>
                    <div class="scenario-actions">
                        <button @click="openStyleChat('Casual')" class="rounded-sm p-3 sm:rounded-lg small-button flex gap-2 items-center">
                            Edit
                        </button>
                    </div>
                </div>
                <div class="scenario flex items-center rounded-xl p-8">
                    <div class="scenario-info flex-1 flex flex-col">
                        <h5 class="text-sm mb-2 font-semibold input-heading">Question</h5>
                        <p>Show how the AI should respond to a valid question</p>
                    </div>
                    <div class="scenario-actions">
                        <button @click="openStyleChat('Question')" class="rounded-sm p-3 sm:rounded-lg small-button flex gap-2 items-center">
                            Edit
                        </button>
                    </div>
                </div> -->
            </div>
        </section>
        <section v-else-if="openTab == 'instructions'" class="flex flex-col p-8">
            <h3 class="text-lg leading-7 font-semibold mb-1">Instructions</h3>
            <p class="text-bas mb-3">Additional instructions for the AI to know.</p>
            <div class="flex flex-col one-input flex-1">
                <h5 class="text-sm mt-3 mb-2 font-semibold input-heading">Topics to Avoid</h5>
                <input autocomplete="off" class="w-full rounded-sm p-3 sm:rounded-lg mb-2" placeholder="Tell us about your identity's interests" type="text" name="" :value="$store.state.identity.personaData['topics_to_avoid']" @change="setPersonaField('topics_to_avoid', $event)">
                <p class="text-sm">Indicates what your AI will avoid talking about.</p>
            </div>
            <div class="flex flex-col one-input flex-1">
                <h5 class="text-sm mt-3 mb-2 font-semibold input-heading">Other Instruction</h5>
                <textarea class="w-full rounded-sm p-3 sm:rounded-lg mb-2 identity-textarea" placeholder="" type="text" name="" :value="$store.state.identity.personaData['other_instructions']" @change="setPersonaField('other_instructions', $event)"></textarea>
                <p class="text-sm">Anything else that the AI should keep in mind when working.</p>
            </div>
        </section>
    </div>
</template>

<script>
export default {
  name: 'StylePage',
  layout: 'app',
  data () {
    return {
        openTab: 'personality',
        showingStyleChat: false
    }
  },
  methods: {
    openStyleChat (showingStyleChat) {
        this.showingStyleChat = showingStyleChat
    },
    setTab (tab) {
        this.openTab = tab
    },
    setPersonaField (field, event) {
        this.$store.dispatch('identity/setPersonaField', {
            field,
            value: event.target.value
        }).then((res) => {
            // this.tempMessage = false
            // this.$forceUpdate()
        })    
    }
  },
  created () {
    this.$store.dispatch('identity/getStyle', {
    }).then((res) => {
    })
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
.style-chat-wrapper {
    position: absolute;
    height: 100%;
    background-color: #00000022;
    /*width: calc(100% - 240px);*/
    width: calc(100vw - 240px);
    backdrop-filter: blur(10px);
}
.style-app-container {
    /*width: 100%;*/
    /*height: 100%;*/
    /*max-height: calc(100% - 50px);*/
    /*position: absolute;*/
    /*max-width: calc(100% - 240px);*/
}
</style>