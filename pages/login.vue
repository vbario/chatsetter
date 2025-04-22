<template>
    <div class="container h-screen mx-auto flex">
        <div class="flex-1 flex flex-col justify-center items-center relative">
            <NuxtLink class="" to="/">
                <img class="chatsetter-logo cursor-pointer" src="~/assets/images/chatsetter-logo-2.png">
            </NuxtLink>
            <Footer/>
        </div>
        <div class="flex flex-1 justify-center items-center color-dark-background relative p-8">
            <!-- <p class="color-white">{{!$store.state.auth.uid}}</p> -->
            <div class="absolute top-6 right-8" v-show="$store.state.auth.uid">
                <NuxtLink to="/identity">
                    <button class="rounded-sm p-3 sm:rounded-lg button-primary button-coloring-2">
                        <p>
                            Get Started
                        </p>
                    </button>
                </NuxtLink>
            </div>
            <div class="flex gap-4 items-center absolute top-6 right-8" v-show="!$store.state.auth.uid">
                <NuxtLink to="/register">
                    <button class="rounded-sm p-3 sm:rounded-lg button-primary button-coloring-2">
                        <p>
                            Sign Up
                        </p>
                    </button>
                </NuxtLink>
                <NuxtLink to="/login">
                    <span>
                        <p class="color-white">
                            Login
                        </p>
                    </span>
                </NuxtLink>
            </div>
            <VisualDemo/>
        </div>
    </div>
</template>

<script>
export default {
  name: 'IndexPage',
  computed: {
      myUid () {
        return this.$store.state.auth.uid
      },
    }
}
</script>

<style lang="scss">
</style>