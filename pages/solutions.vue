<template>
  <div class="solutions-page">
    <!-- Hero Section -->
    <section class="hero_ text-white py-20 text-center">
      <h1 class="text-5xl font-bold mb-4 mt-3">Powerful Chat Automation for Every Influencer</h1>
      <p class="text-xl mb-8 text-white">From micro-creators to global stars — engage, convert, and grow with ChatSetter.</p>
      <NuxtLink to="/?register=true" class="px-8 py-4 bg-white text-green-600 font-semibold rounded-full hover:bg-gray-100 transition">
        Get Started
      </NuxtLink>
    </section>

    <!-- Features Section -->
    <section class="features py-16 px-4 md:px-20">
      <div class="grid md:grid-cols-2 gap-12">
        <!-- Small Influencers Card -->
        <div class="feature-card bg-white shadow-xl rounded-lg p-8">
          <h2 class="text-3xl font-bold mb-4">For Small Influencers</h2>
          <ul class="space-y-3 text-gray-700">
            <li>🔥 Automate DMs & respond instantly</li>
            <li>📈 Boost engagement without extra hours</li>
            <li>💰 Monetize chats with digital products</li>
            <li>🔗 Simple Instagram integration</li>
          </ul>
          <NuxtLink to="/?register=true" class="mt-6 inline-block px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition">
            Start Growing
          </NuxtLink>
        </div>

        <!-- Big Influencers Card -->
        <div class="feature-card bg-white shadow-xl rounded-lg p-8">
          <h2 class="text-3xl font-bold mb-4">For Big Influencers</h2>
          <ul class="space-y-3 text-gray-700">
            <li>🚀 Scale to 10k+ messages/day</li>
            <li>🤖 Advanced multi-channel workflows</li>
            <li>📊 In-depth analytics & reporting</li>
            <li>📞 Dedicated support & onboarding</li>
          </ul>
          <NuxtLink to="/?register=true" class="mt-6 inline-block px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
            Explore Enterprise
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="cta bg-gray-100 py-16 text-center">
      <h2 class="text-4xl font-bold mb-4">Ready to Level Up Your Influence?</h2>
      <p class="text-lg mb-8">Join thousands of creators who trust ChatSetter to power their conversations.</p>
      <NuxtLink to="/?register=true" class="px-8 py-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition">
        Sign Up Now
      </NuxtLink>
    </section>

    <div class="absolute top-6 right-8 my-dashboard-button">
      <LandingHeader/>
    </div>
  </div>
</template>

<script setup>
// No dynamic logic needed; pure UI-driven page
</script>

<style scoped>
.hero_ {
    background-color: #046c38;
}

.solutions-page {
    font-family: 'Inter', sans-serif;
    width: 100%;
}

.feature-card li::before {
  content: '•';
  color: #10B981;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}

.text-white {
    color: #fff;
}
</style>
