<template>
  <div class="flex flex-col w-full" id="top">
    
    <div class="container h-screen-almost mx-auto flex _1024">
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
        <!-- <Footer class="over1024" /> -->
      </div>

      <div class="flex flex-1 justify-center items-center color-dark-background relative">
        <AuthBox :startingTab="startingTab" />
        <div class="absolute top-6 right-8 my-dashboard-button">
          <LandingHeader/>
        </div>
      </div>

      <!-- Mobile Footer -->
      <!-- <Footer class="under1024" /> -->
    </div>
    <div class="container h-screen-min mx-auto flex flex-col _1024">
      <!-- Above the Fold -->
      <section class="bg-purple py-24">
        <div class="container mx-auto px-6 text-center flex flex-col items-center">
          <h1 class="text-4xl md:text-5xl font-extrabold text-white mb-4 mw__">
            Your DMs Are Gold Mines—Stop Leaving Money on the Table
          </h1>
          <p class="text-2xl md:text-xl mb-8 text-white">
            ChatSetter auto-handles your Instagram DMs, books calls, and never lets a hot lead slip away.
          </p>
          <div class="_s">
            <div class="space-x-4">
              <h2 class="text-lg text-purple-600 font-bold mb-4">Get started with ChatSetter!</h2>
              <NuxtLink class="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg" to="/?register=true#top">
                <a @click="goToTop()">
                  Start 5-Day Free Trial
                </a>
              </NuxtLink>
              <a href="#features" class="inline-block text-purple-600 font-semibold py-3 px-6">
                See How It Works →
              </a>
            </div>
            <p class="mt-6 text-sm text-gray-500">
              <!-- Join 3,219 creators who’ve booked 5,482 calls last month. -->
              Join the creators who are staying ahead by turning their DMs into booked calls—effortlessly.
            </p>
          </div>
        </div>
      </section>

      <!-- The Problem Section -->
      <section id="problem" class="py-24">
        <div class="container flex mx-auto px-6 md:grid-cols-2 gap-12 justify-center items-center">
          <img src="~/assets/images/mailbox-full-b5.jpg" alt="Overflowing inbox" class="full-inbox rounded-lg shadow-lg" />
          <div>
            <h2 class="text-4xl font-bold mb-4">Sound familiar?</h2>
            <ul class="space-y-3 text-xl">
              <li>📥 You open IG and see 120 unread DMs… again.</li>
              <li>⏱️ You lose hours juggling chats instead of coaching, creating, or selling.</li>
              <li>💸 Every missed message is a missed sale.</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Mechanisms of the False Solution -->
      <section class="bg-gray-100 py-24">
        <div class="container mx-auto px-6 text-center flex flex-col items-center">
          <h3 class="text-4xl font-semibold mb-6">Why hiring a VA or winging it doesn’t work:</h3>
          <div class="grid md:grid-cols-3 gap-8 max-w-4xl">
            <div class="p-6 bg-white rounded-lg shadow">
              <h3 class="big-emoji">💼</h3>
              <h4 class="text-lg font-bold mb-2">VA Training Overhead</h4>
              <p class="text-md text-gray-600">Days to train, days to forget—your leads go cold.</p>
            </div>
            <div class="p-6 bg-white rounded-lg shadow">
              <h3 class="big-emoji">⌚</h3>
              <h4 class="text-lg font-bold mb-2">Manual Check-In</h4>
              <p class="text-md text-gray-600">Your nights & weekends? Ruined by DM duty.</p>
            </div>
            <div class="p-6 bg-white rounded-lg shadow">
              <h3 class="big-emoji">🔄</h3>
              <h4 class="text-lg font-bold mb-2">One-Size-Fits-All Bots</h4>
              <p class="text-md text-gray-600">Canned replies = zero rapport. Leads bounce.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Benefits -->
      <section id="features" class="py-24">
        <div class="container mx-auto px-6 text-center">
          <h2 class="text-4xl font-bold mb-8">Meet the only tool that actually works</h2>
          <div class="grid md:grid-cols-3 gap-8">
            <div class="space-y-3">
              <div class="text-4xl">🤖</div>
              <h4 class="font-semibold text-xl">AI-Powered Replies</h4>
              <p class="text-lg text-gray-600">Personalized, human-like DMs 24/7.</p>
            </div>
            <div class="space-y-3">
              <div class="text-4xl">📅</div>
              <h4 class="font-semibold text-xl">Instant Call Booking</h4>
              <p class="text-lg text-gray-600">Your calendar fills itself—no back-and-forth.</p>
            </div>
            <div class="space-y-3">
              <div class="text-4xl">🔗</div>
              <h4 class="font-semibold text-xl">Seamless IG Integration</h4>
              <p class="text-lg text-gray-600">Works right inside your DMs—no extra apps.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Qualification -->
      <section class="bg-purple-600 text-white py-24">
        <div class="container mx-auto px-6 text-center max-w-2xl">
          <h2 class="text-4xl font-bold mb-4">Is ChatSetter for you?</h2>
          <p class="mb-6 text-white text-lg">Perfect for coaches, consultants, creators, and small teams who:</p>
          <ul class="space-y-2 text-lg">
            <li>✅ Have 500+ followers</li>
            <li>✅ Receive 20+ DMs per day</li>
            <li>✅ Want to book more calls, not juggle inboxes</li>
          </ul>
        </div>
      </section>

      <!-- Offer -->
      <section class="py-24">
        <div class="container mx-auto px-6 text-center">
          <h2 class="text-4xl font-bold mb-4">Ready to rocket your bookings?</h2>
          <p class="mb-8 text-lg">Start your 5-day free trial today. Cancel anytime.</p>
          <NuxtLink to="/?register=true#top" class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg">
            <a @click="goToTop()">
              Start Free Trial
            </a>
          </NuxtLink>
        </div>
      </section>

      <!-- Story -->
      <section class="bg-white py-24">
        <div class="container mx-auto px-6 md:flex md:items-center md:space-x-12">
          <img src="~/assets/images/vb.jpeg" alt="Vladimir Baranov" class="rounded-full w-48 h-48 mb-6 md:mb-0 mx-auto" />
          <div>
            <h3 class="text-4xl font-bold mb-4">Built by creators, for creators</h3>
            <p class="text-gray-700 mb-4">
              I’m Vladimir Baranov, host of “Future Smash” on X and longtime robotics educator.
              I built ChatSetter to solve my own DM overload—and it’s already booked hundreds of calls
              for folks just like you.
            </p>
            <a class="text-purple-600 font-semibold" href="#pricing">See Plans & Pricing →</a>
          </div>
        </div>
      </section>

      <!-- Pricing -->
      <section id="pricing" class="bg-gray-100 py-24">
        <div class="container mx-auto px-6 text-center">
          <h2 class="text-4xl font-bold mb-8">Simple Pricing</h2>
          <div class="grid md:grid-cols-3 gap-8">
            <!-- Starter -->
            <div class="bg-white p-6 rounded-lg shadow-lg">
              <h3 class="text-xl font-semibold mb-4">Starter</h3>
              <p class="text-4xl font-bold mb-4">$99<span class="text-lg">/mo</span></p>
              <ul class="space-y-2 text-gray-600 mb-6">
                <li>750 DMs/month</li>
                <li>Unlimited followups</li>
                <li>Unlimited comments</li>
                <li>Auto-book calls & sell digital products</li>
              </ul>
              <a href="#" @click="goToTop()" class="block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded">
                Start Free Trial
              </a>
            </div>
            <!-- Growth -->
            <div class="bg-white p-6 rounded-lg shadow-lg border-4 border-purple-600">
              <h3 class="text-xl font-semibold mb-4">Influencer</h3>
              <p class="text-4xl font-bold mb-4">$299<span class="text-lg">/mo</span></p>
              <ul class="space-y-2 text-gray-600 mb-6">
                <li>3,000 DMs/month</li>
                <li>Fine-tuned prompts & script generation</li>
                <li>Priority booking</li>
                <li>Onboarding call</li>
              </ul>
              <a href="#" @click="goToTop()" class="block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded">
                Start Free Trial
              </a>
            </div>
            <!-- Pro -->
            <div class="bg-white p-6 rounded-lg shadow-lg">
              <h3 class="text-xl font-semibold mb-4">Growth</h3>
              <p class="text-4xl font-bold mb-4">$999<span class="text-lg">/mo</span></p>
              <ul class="space-y-2 text-gray-600 mb-6">
                <li>12,000 DMs/month</li>
                <li>Account manager</li>
                <li>Affiliate program access</li>
                <li>GoHighLevel & Calendly integration</li>
              </ul>
              <a href="#" @click="goToTop()" class="block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded">
                Start Free Trial
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Money-Back Guarantee -->
      <section class="py-24">
        <div class="container mx-auto px-6 text-center">
          <h3 class="text-4xl font-bold mb-4">30-Day Money-Back Guarantee</h3>
          <p class="text-gray-600 text-lg">
            Love it—or get a full refund. No hoops, no hassle.
          </p>
        </div>
      </section>

      <!-- FAQ -->
      <section class="bg-white py-24">
        <div class="container mx-auto px-6 max-w-3xl">
          <h3 class="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h3>
          <div class="space-y-6">
            <div>
              <h4 class="text-lg font-semibold">How does ChatSetter integrate with Instagram?</h4>
              <p class="text-lg text-gray-600">We connect via your IG Business API—setup takes less than 2 minutes.</p>
            </div>
            <div>
              <h4 class="text-lg font-semibold">Do I need to give you my password?</h4>
              <p class="text-lg text-gray-600">Never. We use OAuth so you stay in full control.</p>
            </div>
            <div>
              <h4 class="text-lg font-semibold">Can I pause or cancel anytime?</h4>
              <p class="text-lg text-gray-600">Yes—no long-term contracts, cancel in a click.</p>
            </div>
            <div>
              <h4 class="text-lg font-semibold">What if I outgrow my plan?</h4>
              <p class="text-lg text-gray-600">Upgrade instantly to higher tiers with zero downtime.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Call to Action Section -->
      <section class="cta bg-gray-100 py-16 text-center">
        <h2 class="text-4xl font-bold mb-4">Ready to Level Up Your Influence?</h2>
        <p class="text-lg mb-8">Join the creators who trust ChatSetter to power their conversations.</p>
        <NuxtLink to="/?register=true#top" class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg">
            <a @click="goToTop()">
              Start Free Trial
            </a>
        </NuxtLink>
      </section>

      <!-- Footer -->
      <footer class="bg-gray-800 text-gray-400 py-8">
        <div class="container mx-auto px-6 text-center text-sm">
          © 2025 ChatSetter • <NuxtLink to="/terms">Terms</NuxtLink> • <NuxtLink to="/privacy">Privacy Policy</NuxtLink>
        </div>
      </footer>
    </div>

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
  methods: {
    goToTop () {
      console.log('goToTop')
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 200)
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
  background-image: url('../assets/images/landing-background.jpg');
  background-size: cover;
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
.h-screen-almost {
  height: calc(100vh - 90px);
}
.h-screen-min {
  min-height: 100vh;
}
.full-inbox {
  width: 100%;
  max-width: 500px;
}
.mw__ {
  max-width: 1100px !important;
}
.bg-purple {
  background-color: #7c3aed;
}
.text-white {
  color: #fff;
}
._s {
  background-color: #fff;
  padding: 20px 30px;
  border-radius: 10px;
}
.big-emoji {
  font-size: 42px;
}
</style>
