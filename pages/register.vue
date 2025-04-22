<template>
    <div class="container h-screen mx-auto flex">
        <div class="flex-1 flex flex-col justify-center items-center relative">
            <!-- <NuxtLink class="" to="/">
                <img class="chatsetter-logo chatsetter-logo-smaller" src="~/assets/images/chatsetter-logo-2.png">
            </NuxtLink> -->
            <!-- <AuthBox :startingTab="'register'"/> -->
            <NuxtLink class="" to="/">
                <img class="chatsetter-logo cursor-pointer" src="~/assets/images/chatsetter-logo-2.png">
            </NuxtLink>
            <Footer/>
        </div>
        <div class="flex flex-1 justify-center items-center color-dark-background relative">
            <!-- <NuxtLink class="" to="/">
                <img class="chatsetter-logo cursor-pointer" src="~/assets/images/chatsetter-logo.png">
            </NuxtLink> -->
            <AuthBox :startingTab="'register'"/>
            <div class="absolute top-6 right-8" v-if="$store.state.auth.uid">
                <NuxtLink to="/analytics">
                    <button class="rounded-sm p-3 sm:rounded-lg button-primary button-coloring-2">
                        <p>
                            My Dashboard
                        </p>
                    </button>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'LoginPage'
}
</script>

<style lang="scss">
.chatsetter-logo {
    width: 320px;
}
.chatsetter-logo-smaller {
    width: 160px !important;
}
</style>