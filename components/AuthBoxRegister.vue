<template>
  <div class="w-full flex flex-col auth-box-register">
    <h2 class="title">Get Started</h2>
    <p class="subtitle">Sign up for ChatSetter.</p>

<!--     <div id="mc_embed_shell">
      <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
      <link href="//cdn-images.mailchimp.com/embedcode/classic-061523.css" rel="stylesheet" type="text/css">
      <style type="text/css">
      </style>
      <div id="mc_embed_signup">
        <form action="https://chatsetter.us5.list-manage.com/subscribe/post?u=a8e5bd8e6da003df0d52aba17&amp;id=1d331250ca&amp;f_id=00e127eaf0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank">
          <div id="mc_embed_signup_scroll">
            <div class="mc-field-group">
              <label for="mce-EMAIL" required="" class="register-label">Email Address</label>
              <input type="email" name="EMAIL" class="required text-input-i" id="mce-EMAIL" required="" value="">
            </div>
            <div class="mc-field-group">
              <label for="mce-MMERGE7" class="register-label">Instagram Account</label>
              <input type="text" name="MMERGE7" required="" class="required text-input-i" id="mce-MMERGE7" value="">
            </div>
            <div class="mc-field-group">
              <label for="mce-MMERGE8" class="register-label">How did you hear about ChatSetter?</label>
              <select name="MMERGE8" class="required text-input-i" id="mce-MMERGE8">
                <option value=""></option>
                <option value="Instagram post">Instagram post</option>
                <option value="Other social media">Other social media</option>
                <option value="From a friend">From a friend</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div id="mce-responses" class="clear">
                <div class="response" id="mce-error-response" style="display: none;"></div>
                <div class="response" id="mce-success-response" style="display: none;"></div>
            </div><div aria-hidden="true" style="position: absolute; left: -5000px;"><input type="text" name="b_a8e5bd8e6da003df0d52aba17_1d331250ca" tabindex="-1" value=""></div><div class="clear"><input type="submit" name="Register" id="mc-embedded-subscribe" class="button" value="Register"></div>
          </div>
        </form>
      </div>
      <script type="text/javascript" src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"></script><script type="text/javascript">(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[7]='MMERGE7';ftypes[7]='text';fnames[8]='MMERGE8';ftypes[8]='dropdown';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';fnames[5]='BIRTHDAY';ftypes[5]='birthday';fnames[6]='COMPANY';ftypes[6]='text';}(jQuery));var $mcj = jQuery.noConflict(true);</script>
    </div> -->
    <input
      autocomplete="off"
      class="text-input"
      placeholder="Your email"
      type="text"
      v-model="email"
    >
    <input
      autocomplete="off"
      class="text-input"
      placeholder="Instagram account"
      type="text"
      v-model="instagramAccount"
    >
    <input
      autocomplete="off"
      class="text-input"
      placeholder="Password"
      type="password"
      v-model="password"
    >
    <button class="button-primary" @click="register()">
      <p>Register</p>
    </button> 
    <p class="text-sm">
      Already have an account?
      <a class="link-primary" @click="setMode('login')">Sign in</a>.
    </p>
  </div>
</template>

<script>
import $ from 'jquery';
import jQuery from 'jquery';

export default {
  name: 'AuthBoxRegister',
  data () {
    return {
      jQuery: jQuery,
      email: '',
      password: '',
      passwordRepeated: '',
      instagramAccount: ''
    }
  },
  methods: {
    setMode (mode) {
      console.log('setting mode:', mode)
      this.$emit('setMode', mode)
    },
    register () {
      this.$store.dispatch('auth/register', {email: this.email, password: this.password, instagramAccount: this.instagramAccount})
    }
  },
  created () {
    window.jQuery = $;
    window.$ = $;
  }
}
</script>

<style lang="scss">
@import url("~/assets/styles/_colors.scss");

/* Brand variables */
$chatsetter-green: #046c38;          // Primary ChatSetter green
$chatsetter-green-dark: darken($chatsetter-green, 10%);
$chatsetter-light-bg: #f7f7f7;         // Light background for the form container
$chatsetter-white: #ffffff;
$chatsetter-border: lighten($chatsetter-green, 40%);

/* Container for the register form */
.auth-box-register {
  border-radius: 8px;
  text-align: center; // Center text for a clean, balanced layout
}

/* Title styling */
.title {
  font-size: 1.5rem;        // Corresponds to text-2xl
  line-height: 1.75rem;      // Corresponds to leading-7
  font-weight: 600;         // Semibold
  margin-bottom: 1rem;      // Corresponds to mb-4
  color: $chatsetter-green;
}

/* Subtitle styling */
.subtitle {
  margin-bottom: 0.75rem;   // Corresponds to mb-3
  color: darken($chatsetter-green, 20%);
}

/* Input styling */
.text-input {
  width: 100%;
  padding: 0.75rem;         // Corresponds to p-3
  /*border: 1px solid $chatsetter-border;*/
  border-radius: 0.375rem;    // Roughly equals rounded-sm or sm:rounded-lg on larger devices
  margin-bottom: 0.75rem;     // Corresponds to mb-3
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border: 2px solid $chatsetter-green;
    /*box-shadow: 0 0 0 2px rgba($chatsetter-green, 0.2);*/
  }
}

/* Input styling */
.text-input-i {
  width: 100% !important;
  padding: 0.71rem !important;
  border-radius: 0.375rem !important;
  margin-bottom: 0 !important;
  font-size: 1rem !important;
  transition: border-color 0.2s, box-shadow 0.2s !important;
  line-height: 1em !important;
  border: 2px solid transparent !important;
  outline: 1px solid grey;
  box-sizing: border-box !important;
  color: #000 !important;
  /*padding-top: 8px !important;*/
  /*font-weight: 500 !important;*/

  &:focus {
    outline: none !important;
    border: 2px solid $chatsetter-green !important;
    /*box-shadow: 0 0 0 2px rgba($chatsetter-green, 0.2);*/
  }
}

#mce-error-response {
  color: #000 !important;
}

/* Button styling */
.button-primary {
  width: 100%;
  padding: 0.75rem;         // Corresponds to p-3
  border: none;
  border-radius: 0.375rem;
  background-color: $chatsetter-green;
  color: $chatsetter-white;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;      // Corresponds to mb-4
  transition: background-color 0.2s;

  &:hover {
    background-color: $chatsetter-green-dark;
  }
}

#mc-embedded-subscribe {
  width: 100% !important;
  padding: 0.75rem !important;
  border: none !important;
  border-radius: 0.375rem !important;
  background-color: $chatsetter-green !important;
  color: $chatsetter-white !important;
  font-size: 1rem !important;
  cursor: pointer !important;
  margin-bottom: 1rem !important;
  transition: background-color 0.2s !important;
  height: 48px !important;
  padding-top: 8px !important;
  font-weight: 500 !important;

  &:hover {
    background-color: $chatsetter-green-dark !important;
  }
}

.mc-field-group {
  width: 100% !important;
}

.email {
  width: 100%;
}

/* Link styling */
a.link-primary {
  text-decoration: underline;
  color: $chatsetter-green;

  &:hover {
    color: $chatsetter-green-dark;
  }
}

#mc_embed_signup > form {
  background-color: transparent !important;
  margin: 0 !important;
}
div.mce_inline_error {
  display: none !important;
}
label.register-label {
  color: #000 !important;
}
</style>
