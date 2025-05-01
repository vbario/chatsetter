<template>
  <div class="pricing-component">
    <!-- Title -->
    <h2 class="pricing-title">Simple Pricing</h2>

    <!-- Plans Grid -->
    <div class="plans-grid">
      <div
        v-for="(plan, index) in plans"
        :key="plan.name"
        class="plan-card"
        :class="{ selected: index === featuredIndex }"
      >
        <h3 class="plan-name">{{ plan.name }}</h3>
        <p class="plan-price">{{ plan.price }}</p>
        <ul class="plan-features">
          <li v-for="feature in plan.features" :key="feature">
            {{ feature }}
          </li>
        </ul>
        <button class="plan-button">{{ plan.buttonText }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StyledPricingComponent',
  data() {
    return {
      // Set the index of the featured (highlighted) plan
      featuredIndex: 1,
      plans: [
        {
          name: 'Starter',
          price: '$99/mo',
          features: [
            '750 DMs/month',
            'Unlimited followups',
            'Unlimited comments',
            'Auto-book calls & sell digital products'
          ],
          buttonText: 'Start Free Trial'
        },
        {
          name: 'Influencer',
          price: '$299/mo',
          features: [
            '3,000 DMs/month',
            'Fine-tuned prompts & script generation',
            'Priority booking',
            'Onboarding call'
          ],
          buttonText: 'Start Free Trial'
        },
        {
          name: 'Growth',
          price: '$999/mo',
          features: [
            '12,000 DMs/month',
            'Account manager',
            'Affiliate program access',
            'GoHighLevel & Calendly integration'
          ],
          buttonText: 'Start Free Trial'
        }
      ]
    };
  }
};
</script>

<style scoped>
:root {
  --chatsetter-green: #503de0;
  --chatsetter-white: #ffffff;
  --chatsetter-text: #333333;
}

.pricing-component {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: var(--chatsetter-white);
  width: 100%;
  background-color: #fff;
  border-radius: 20px;
}

.pricing-title {
  text-align: center;
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: var(--chatsetter-text);
}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.plan-card {
  background: var(--chatsetter-white);
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  text-align: center;
  border: 2px solid transparent;
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.plan-card.selected {
  border-color: var(--chatsetter-green);
}

.plan-card:hover {
  transform: translateY(-4px);
}

.plan-name {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--chatsetter-text);
}

.plan-price {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--chatsetter-text);
}

.plan-features {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
}

.plan-features li {
  margin-bottom: 0.5rem;
  font-size: 0.9375rem;
  color: #555555;
}

.plan-button {
  background-color: var(--chatsetter-green);
  color: var(--chatsetter-white);
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.plan-button:hover {
  background-color: #3c34b0;
  transform: translateY(-2px);
}
</style>
