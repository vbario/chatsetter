<template>
  <div class="pricing-page">
    <!-- Hero Section -->
    <section class="hero">
      <h1 class="hero-title">Pricing</h1>
      <p class="hero-subtitle">
        Choose the plan that fits your chat setting needs.
      </p>
    </section>

    <!-- Comparison Table -->
    <section class="plans container">
      <table class="pricing-table">
        <thead>
          <tr>
            <th>Features</th>
            <th>Influencer Plan</th>
            <th>Growth Plan</th>
          </tr>
          <!-- Top Signup Row -->
          <tr class="signup-top-row">
            <td></td>
            <td>
              <NuxtLink to="/?register=true">
                <button class="button-primary w_135">Get Started</button>
              </NuxtLink>
              <!-- <script async
                src="https://js.stripe.com/v3/buy-button.js">
              </script>

              <stripe-buy-button
                buy-button-id="buy_btn_1RFJxsGDqV2T9vC1p1tTaVco"
                publishable-key="pk_live_51RFJUWGDqV2T9vC1Zlctpk6xgZ4iTKw73DWXkK9lgNEHpXo5V8jFCcrwDmVGshuhUkBaGjDWiDtIMt1FIRKM05n4007TKayk0v"
              >
              </stripe-buy-button> -->
            </td>
            <td>
              <a href="https://calendly.com/chatsetter-lowerprofile/chatsetter-onboarding-clone" target="_blank">
                <button class="button-primary w_135">Request Demo</button>
              </a>
              <!-- <script async
                src="https://js.stripe.com/v3/buy-button.js">
              </script>

              <stripe-buy-button
                buy-button-id="buy_btn_1RFK2kGDqV2T9vC1gFtf5S7b"
                publishable-key="pk_live_51RFJUWGDqV2T9vC1Zlctpk6xgZ4iTKw73DWXkK9lgNEHpXo5V8jFCcrwDmVGshuhUkBaGjDWiDtIMt1FIRKM05n4007TKayk0v"
              >
              </stripe-buy-button> -->
            </td>
          </tr>
        </thead>
        <tbody>
          <!-- Price Row -->
          <tr class="price-row">
            <td class="feature-label">Price</td>
            <td>$300/month</td>
            <td>$3,000/month</td>
          </tr>
          <!-- Feature Rows -->
          <tr>
            <td class="feature-label">Premium Quality Chat Setting</td>
            <td class="check">✓</td>
            <td class="check">✓</td>
          </tr>
          <tr>
            <td class="feature-label">Messages (per month)</td>
            <td>
              3,000<br>
              <small>10¢ per extra</small>
            </td>
            <td>
              35,000<br>
              <small>8¢ per extra</small>
            </td>
          </tr>
          <tr>
            <td class="feature-label">Unlimited Followup Messages</td>
            <td class="check">✓</td>
            <td class="check">✓</td>
          </tr>
          <tr>
            <td class="feature-label">Unlimited Comment Responses</td>
            <td class="check">✓</td>
            <td class="check">✓</td>
          </tr>
          <tr>
            <td class="feature-label">Call Booking in Instagram DMs</td>
            <td class="check">✓</td>
            <td class="check">✓</td>
          </tr>
          <tr>
            <td class="feature-label">Selling Digital Products in Instagram DMs</td>
            <td class="check">✓</td>
            <td class="check">✓</td>
          </tr>
          <tr>
            <td class="feature-label">Fine-tuned Prompts</td>
            <td class="no">—</td>
            <td class="check">✓</td>
          </tr>
          <tr>
            <td class="feature-label">Post-booking Followups<br><small>(Pre-call messages)</small></td>
            <td class="no">—</td>
            <td class="check">✓</td>
          </tr>
          <tr>
            <td class="feature-label">GoHighLevel Integration</td>
            <td class="no">—</td>
            <td class="check">✓</td>
          </tr>
          <tr>
            <td class="feature-label">Calendly Integration</td>
            <td class="no">—</td>
            <td class="check">✓</td>
          </tr>
          <tr>
            <td class="feature-label">Dedicated Support</td>
            <td class="support">Account Manager</td>
            <td class="support">Account Manager</td>
          </tr>
          <tr>
            <td class="feature-label">Onboarding Call</td>
            <td class="check">✓</td>
            <td class="check">✓</td>
          </tr>
          <!-- Bottom Signup Row -->
          <tr class="signup-row">
            <td class="feature-label"></td>
            <td>
              <!-- <script async
                src="https://js.stripe.com/v3/buy-button.js">
              </script>

              <stripe-buy-button
                buy-button-id="buy_btn_1RFJxsGDqV2T9vC1p1tTaVco"
                publishable-key="pk_live_51RFJUWGDqV2T9vC1Zlctpk6xgZ4iTKw73DWXkK9lgNEHpXo5V8jFCcrwDmVGshuhUkBaGjDWiDtIMt1FIRKM05n4007TKayk0v"
              >
              </stripe-buy-button> -->
              <NuxtLink to="/?register=true">
                <button class="button-primary w_135">Get Started</button>
              </NuxtLink>
            </td>
            <td>
              <!-- <script async
                src="https://js.stripe.com/v3/buy-button.js">
              </script>

              <stripe-buy-button
                buy-button-id="buy_btn_1RFK2kGDqV2T9vC1gFtf5S7b"
                publishable-key="pk_live_51RFJUWGDqV2T9vC1Zlctpk6xgZ4iTKw73DWXkK9lgNEHpXo5V8jFCcrwDmVGshuhUkBaGjDWiDtIMt1FIRKM05n4007TKayk0v"
              >
              </stripe-buy-button> -->
              <a href="https://calendly.com/chatsetter-lowerprofile/chatsetter-onboarding-clone" target="_blank">
                <button class="button-primary w_135">Request Demo</button>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <div class="absolute top-6 right-8 my-dashboard-button">
      <LandingHeader :dark="true"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PricingPage'
};
</script>

<style lang="scss" scoped>
/* Brand Variables */
:root {
  --chatsetter-green: #046c38;
  --chatsetter-light-bg: #f7f7f7;
  --chatsetter-white: #ffffff;
  --chatsetter-text: #333;
  --chatsetter-border: #c8e6d1; /* a light green variant */
}

/* Overall Page Styling */
.pricing-page {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  background-color: var(--chatsetter-light-bg);
  color: var(--chatsetter-text);
  padding: 2rem;
}

/* Hero Section */
.hero {
  text-align: center;
  background-color: var(--chatsetter-white);
  padding: 2rem 1rem;
  border-radius: 0.5rem;
  /*margin-bottom: 2rem;*/
  /*box-shadow: 0 2px 4px rgba(0,0,0,0.05);*/
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--chatsetter-green);
}

.hero-subtitle {
  font-size: 1.125rem;
  color: #555;
}

/* Pricing Table */
.pricing-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
}

.pricing-table th,
.pricing-table td {
  padding: 1rem;
  border: 1px solid var(--chatsetter-border);
  text-align: center;
  font-size: 1rem;
}

.pricing-table th {
  background-color: #e0f0e7; /* lightened green */
  color: var(--chatsetter-green);
  font-weight: 600;
}

.feature-label {
  text-align: left;
  font-weight: 600;
  color: var(--chatsetter-text);
}

.pricing-table td.check {
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--chatsetter-green);
}

.pricing-table td.no {
  font-size: 1.25rem;
  color: #999;
}

.pricing-table td.support {
  font-size: 0.95rem;
  color: var(--chatsetter-text);
}

.price-row td {
  font-weight: 600;
  font-size: 1.125rem;
  color: var(--chatsetter-green);
}

.pricing-table tr:nth-child(even) {
  background-color: var(--chatsetter-white);
}

.pricing-table tr:hover {
  background-color: #e6f4ee;
}

/* Signup Rows */
.signup-top-row,
.signup-row {
  background-color: #e0f0e7;
  font-weight: 600;
}

.signup-top-row td:first-child,
.signup-row td:first-child {
  text-align: left;
}

/* Get Started Button Styling */
.plan-cta {
  background-color: var(--chatsetter-green);
  color: var(--chatsetter-white);
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

/* Prominent button overrides for extra padding and larger font */
.plan-cta.prominent {
  font-size: 1.125rem;
  padding: 1rem 2rem;
  box-shadow: 0 4px 8px rgba(4,108,56,0.2);
}

.plan-cta:hover {
  background-color: #03562d;
  transform: translateY(-3px);
}

/* Container Utility */
.container {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}
.w_135 {
  width: 135px;
  font-weight: 500;
}
/* Button styling */
/*$chatsetter-green: #046c38;
$chatsetter-green-dark: darken($chatsetter-green, 10%);
.button-primary {
  width: 100%;
  padding: 0.75rem;         // Corresponds to p-3
  border: none;
  border-radius: 0.375rem;
  background-color: $chatsetter-green;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;      // Corresponds to mb-4
  transition: background-color 0.2s;

  &:hover {
    background-color: $chatsetter-green-dark;
  }
}*/
</style>
