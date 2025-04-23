<template>
  <div class="container h-screen mx-auto flex _1024">
    <div class="flex-1 flex flex-col justify-center items-center relative">
      <!-- Navigation Logo -->
      <NuxtLink to="/">
        <img
          class="chatsetter-logo cursor-pointer"
          src="~/assets/images/chatsetter-logo-2.png"
        />
      </NuxtLink>
      <h2 class="landing-tagline">Never miss a lead again.</h2>
      <!-- Desktop Footer -->
      <Footer class="over1024" />
    </div>

    <div class="flex flex-1 justify-center items-center color-dark-background relative">
      <AuthBox :startingTab="startingTab" />
      <div class="absolute top-6 right-8 my-dashboard-button">
        <LandingHeader/>
      </div>
    </div>

    <!-- Mobile Footer -->
    <Footer class="under1024" />
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data () {
    return {
      startingTab: 'login'
    }
  },
  watch: {
    $route (to, from){
      console.log('to route', to)
      let register = to.query.register == 'true'
      if (register) {
        console.log('register')
        this.startingTab = 'register'
      }
    }
  },
  mounted () {
    let register = this.$route.query.register == 'true'
    if (register) {
      console.log('register')
      this.startingTab = 'register'
    }
  }
}
</script>

<style lang="scss">
/* ------------------ */
/* BRAND COLOR SETUP  */
/* ------------------ */
$chatsetterGreen: #503de0;   // Adjust to match the specific green in your logo
$chatsetterWhite: #ffffff;

/* ------------------ */
/* GLOBAL STYLES      */
/* ------------------ */
.container {
  /* You may define a background or other container styles here if needed */
}

/* Dark background section using the ChatSetter brand green */
.color-dark-background {
  background-color: $chatsetterGreen !important;
  color: $chatsetterWhite; // For text readability
}

/* Logo styles */
.chatsetter-logo {
  width: 320px;
}
.chatsetter-logo-smaller {
  width: 160px !important;
}

/* Responsive classes */
._1024 {
  @media (max-width: 1024px) {
    flex-direction: column !important;
    max-width: unset !important;
  }
}
.over1024 {
  @media (max-width: 1024px) {
    display: none !important;
  }
}
.under1024 {
  position: relative !important;
  @media (min-width: 1024px) {
    display: none !important;
  }
}

/* ------------------ */
/* "My Dashboard" BUTTON STYLING */
/* ------------------ */
.dashboard-button {
  background-color: $chatsetterGreen;
  color: $chatsetterWhite;
  border: none;
  border-radius: 0.375rem;        /* Gives a smooth rounded corner look */
  padding: 0.75rem 1.5rem;        /* Extra horizontal padding for a substantial feel */
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;      /* Uppercase for clear, strong call-to-action text */
  letter-spacing: 0.05em;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease-in-out;
}

.dashboard-button:hover {
  background-color: darken($chatsetterGreen, 10%);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

@media (max-width: 1024px) {
  .dashboard-button {
    position: fixed;
    top: 1.5rem;
    right: 2rem;
  }
}

.landing-link {
  color: #fff;
  font-weight: 600;
}
.landing-tagline {
  font-size: 24px;
}
</style>
