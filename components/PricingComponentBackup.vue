<template>
  <div class="pricing-component">
    <!-- Hero Section -->
    <section class="hero">
      <h1 class="hero-title">Get Started with ChatSetter</h1>
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
            <td class="p_">
              <script async
                src="https://js.stripe.com/v3/buy-button.js">
              </script>

              <stripe-buy-button
                buy-button-id="buy_btn_1RFJxsGDqV2T9vC1p1tTaVco"
                publishable-key="pk_live_51RFJUWGDqV2T9vC1Zlctpk6xgZ4iTKw73DWXkK9lgNEHpXo5V8jFCcrwDmVGshuhUkBaGjDWiDtIMt1FIRKM05n4007TKayk0v"
              >
              </stripe-buy-button>
            </td>
            <td>
              <a href="https://calendly.com/chatsetter-lowerprofile/chatsetter-onboarding-clone" target="_blank">
                <button class="button-primary w_135 _mb0">Request Demo</button>
              </a>
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
            <td class="p_">
              <script async
                src="https://js.stripe.com/v3/buy-button.js">
              </script>

              <stripe-buy-button
                buy-button-id="buy_btn_1RFJxsGDqV2T9vC1p1tTaVco"
                publishable-key="pk_live_51RFJUWGDqV2T9vC1Zlctpk6xgZ4iTKw73DWXkK9lgNEHpXo5V8jFCcrwDmVGshuhUkBaGjDWiDtIMt1FIRKM05n4007TKayk0v"
              >
              </stripe-buy-button>
            </td>
            <td>
              <a href="https://calendly.com/chatsetter-lowerprofile/chatsetter-onboarding-clone" target="_blank">
                <button class="button-primary w_135 _mb0">Request Demo</button>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
    <br/>
    <a @click="logout()" class="text-sm logout-grey">Logout</a>
  </div>
</template>

<script>
export default {
  name: 'PricingComponent',
  layout: 'app',
  methods: {
    logout() {
      console.log('logout');
      this.$store.dispatch('auth/logout', true);
    }
  }
};
</script>

<style scoped>
/* Brand Variables */
:root {
  --chatsetter-green: #503de0;
  --chatsetter-light-bg: #f7f7f7;
  --chatsetter-white: #ffffff;
  --chatsetter-text: #333;
  --chatsetter-border: #c8e6d1; /* a light green variant */
}

/* Overall Page Styling */
.pricing-component {
  background-color: #fff !important;
  /*font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;*/
  color: var(--chatsetter-text);
  padding: 2rem;
  max-width: 1000px;
  max-height: 100vh;
  overflow: auto;
}

/* Hero Section */
.hero {
  text-align: center;
  background-color: var(--chatsetter-white);
  padding: 3rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
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

._mb0 {
  margin-bottom: 0 !important;
  height: 44px !important;
  font-weight: 500;
}

.p_ {
  /*padding-top: 24px !important;*/
  padding-bottom: 9px !important;
}

.BuyButton-Button.is-buttonLayout {
  background-color: var(--chatsetter-green) !important;
}

.logout-grey {
  color: #999;
}
</style>
