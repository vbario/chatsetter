<template>
  <div class="onboarding-container min-h-screen flex items-center justify-center p-4">
    <div class="onboarding-card flex flex-col justify-center items-center">
        <NuxtLink to="/">
            <img src="~/assets/images/chatsetter-logo-icon-only.jpg" class="onboarding-logo" />
        </NuxtLink>
        <h1>Welcome to ChatSetter!</h1>
        <p>We're excited to get you converting! We are setting up your account.</p>
        <p>Look for a message in your email inbox as soon as it's ready.</p>
        <NuxtLink to="/settings" class="mt-4">
            <p>Back to account</p>
        </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OnboardingPage',
  methods: {
    storeCid () {
        if (this.$store.state.auth.uid) {
            let cid = this.$route.query.cid
            this.$store.dispatch('auth/storeCid', {cid}).then(() => {
            })
        } else {
            setTimeout(() => {
                this.storeCid()
            }, 500)
        }
    }
  },
  created () {
    this.storeCid()
  }
}
</script>

<style scoped>
.onboarding-container {
  /* ChatSetter theme variables */
  --cs-primary: #046240;
  --cs-background: #FFFFFF;
  --cs-text: #333333;

  background-color: var(--cs-primary);
  width: 100%;
  max-width: 1200px;
}

.onboarding-card {
  background-color: #fcfbf7;
  border-radius: 1rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.onboarding-card h1 {
  color: var(--cs-primary);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.onboarding-card p {
  color: var(--cs-text);
  font-size: 1rem;
  margin-bottom: 0.75rem;
}

.onboarding-card p:last-of-type {
  margin-bottom: 0;
}
.onboarding-logo {
    width: 200px;
}
</style>
