<template>
    <div class="top-bar flex justify-between items-center pl-2 pr-2">
        <h4 class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="small-icon-3"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M80 104a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm80-24c0 32.8-19.7 61-48 73.3l0 87.8c18.8-10.9 40.7-17.1 64-17.1l96 0c35.3 0 64-28.7 64-64l0-6.7C307.7 141 288 112.8 288 80c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3l0 6.7c0 70.7-57.3 128-128 128l-96 0c-35.3 0-64 28.7-64 64l0 6.7c28.3 12.3 48 40.5 48 73.3c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3l0-6.7 0-198.7C19.7 141 0 112.8 0 80C0 35.8 35.8 0 80 0s80 35.8 80 80zm232 0a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zM80 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/></svg>
            <p>
                Business Account
            </p>
            <!-- <svg v-if="$store.state.identity.identities[0].name" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="slash"><path d="M5.1 9.2C13.3-1.2 28.4-3.1 38.8 5.1l592 464c10.4 8.2 12.3 23.3 4.1 33.7s-23.3 12.3-33.7 4.1L9.2 42.9C-1.2 34.7-3.1 19.6 5.1 9.2z"/></svg> -->
            
        </h4>

        <div class="flex items-center">
            <!-- <button class="rounded-sm p-2 sm:rounded-xl small-button-2 flex gap-2 items-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="small-icon-2"><path d="M80 160c0-35.3 28.7-64 64-64l32 0c35.3 0 64 28.7 64 64l0 3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74l0 1.4c0 17.7 14.3 32 32 32s32-14.3 32-32l0-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7l0-3.6c0-70.7-57.3-128-128-128l-32 0C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"/></svg>
                    <p class="text-xs">
                        Help
                    </p>
            </button> -->
            <p v-if="$store.state.identity.identities[0].name" class="mr-2 email-text">
                {{$store.state.auth.email}}
            </p>
            <span class="profile-icon-2 cursor-pointer flex justify-center items-center" @click="toggleAIPlayground">
                <p class="color-white text-base font-bold">AI</p>
            </span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'VisualDemo',
  methods: {
    toggleAIPlayground () {
        if (this.$store.state.ui.showAIPlayground) {
            this.$store.dispatch('ui/closeAIPlayground', {})
        } else {
            this.$store.dispatch('ui/openAIPlayground', {})
        }
    }
  }
}
</script>

<style lang="scss">
    .top-bar {
        background-color: #0f1928;
        height: 50px;
        & > h4, & > a, & > p {
            color: #fff;
        }
    }
    .small-button-2 {
        background-color: #fff;
        outline: #fff;
    }
    .small-icon-2 {
        width: 16px;
        height: 16px;
        border: 1px solid #000;
        border-radius: 9px;
        padding: 2px;
    }
    .small-icon-3 {
        width: 20px;
        height: 20px;
        color: #fff;
        fill: #fff;
        /*padding: 2px;*/
    }
    .profile-icon-2 {
        height: 35px;
        width: 35px;
        border-radius: 50%;
        background-color: #8d95a7;
    }
    .slash {
        width: 22px;
        height: 22px;
        color: #8d95a7;
        fill: #8d95a7;
        transform: scaleX(-1) rotate(10deg);
    }
    .email-text {
        color: #fff;
    }
</style>
