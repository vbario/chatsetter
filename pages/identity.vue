<template>
  <div class="container identity-page flex flex-col">
    <section class="page-header">
      <h2 class="page-title">Memory</h2>
      <p class="page-subtitle">Create your AI personality.</p>
      <span class="tabs flex items-center gap-4">
        <p class="page-tab" :class="{'page-tab-selected': openTab == 'general'}" @click="setTab('general')">
          Identity
        </p>
        <p class="page-tab" :class="{'page-tab-selected': openTab == 'script'}" @click="setTab('script')">
          Script
        </p>
        <p class="page-tab" :class="{'page-tab-selected': openTab == 'feedback'}" @click="setTab('feedback')">
          Instant Feedback
        </p>
      </span>
    </section>
    <hr>
    <!-- General Tab -->
    <section v-if="openTab == 'general'" class="page-content">
      <h3 class="section-title">Identity</h3>
      <p class="section-description">What your AI needs to do its job.</p>
      <div class="flex items-center gap-2 mb-4">
        <p class="left-right-button-text" :class="{'selected-identity-tab': identityTab == 'basic'}" @click="setIdentityTab('basic')">Basic</p>
        <!-- <p class="left-right-button" @click="setIdentityTab('basic')"><</p> -->
        <!-- <p class="left-right-button" @click="setIdentityTab('advanced')">></p> -->
        <p class="left-right-button-text" :class="{'selected-identity-tab': identityTab == 'advanced'}" @click="setIdentityTab('advanced')">Advanced</p>
      </div>
      <!-- <h4 class="section-heading identity-heading">Persona Information</h4> -->
      <div class="flex flex-col mw___" v-if="identityTab == 'basic'">
        <div class="flex flex-wrap gap-4">
          <div class="one-input flex-1">
            <h5 class="input-heading">Name</h5>
            <input autocomplete="off" placeholder="The name of your identity"
                   type="text"
                   :value="$store.state.identity.personaData['persona_name']"
                   @change="setPersonaField('persona_name', $event)">
          </div>
          <div class="one-input small-input">
            <h5 class="input-heading">Pronouns</h5>
            <select :value="$store.state.identity.personaData['pronouns']"
                    @change="setPersonaField('pronouns', $event)">
              <option>he/him</option>
              <option>she/her</option>
            </select>
          </div>
        </div>
        <div class="one-input">
          <h5 class="input-heading">Occupation</h5>
          <input autocomplete="off" placeholder="Enter the occupation of your AI handler"
                 type="text"
                 :value="$store.state.identity.personaData['persona_occupation']"
                 @change="setPersonaField('persona_occupation', $event)">
        </div>
        <h4 class="section-heading identity-heading">Company Information</h4>
        <div class="flex flex-wrap gap-4">
          <div class="one-input flex-1">
            <h5 class="input-heading">Company Name</h5>
            <input autocomplete="off" placeholder="What is the name of your company?"
                   type="text"
                   :value="$store.state.identity.personaData['persona_company_name']"
                   @change="setPersonaField('persona_company_name', $event)">
          </div>
          <div class="one-input flex-1">
            <h5 class="input-heading">Company Website</h5>
            <input autocomplete="off" placeholder="Your company's website"
                   type="text"
                   :value="$store.state.identity.personaData['persona_company_website']"
                   @change="setPersonaField('persona_company_website', $event)">
          </div>
        </div>
        <div class="flex flex-wrap gap-4">
          <div class="one-input flex-1">
            <h5 class="input-heading">Company Email</h5>
            <input autocomplete="off" placeholder="The email of your company"
                   type="text"
                   :value="$store.state.identity.personaData['persona_company_email']"
                   @change="setPersonaField('persona_company_email', $event)">
          </div>
          <div class="one-input flex-1">
            <h5 class="input-heading">Phone Number</h5>
            <input autocomplete="off" placeholder="The company's phone number"
                   type="tel"
                   :value="$store.state.identity.personaData['persona_company_phone']"
                   @change="setPersonaField('persona_company_phone', $event)">
          </div>
        </div>
        <div class="one-input">
          <h5 class="input-heading">Description</h5>
          <input autocomplete="off" placeholder="Tell us about your company"
                 type="text"
                 :value="$store.state.identity.personaData['persona_company_description']"
                 @change="setPersonaField('persona_company_description', $event)">
        </div>
      </div>
      <div class="flex flex-col mw___" v-if="identityTab == 'advanced'">
        <div class="flex flex-wrap gap-4">
          <div class="one-input flex-1">
            <h5 class="input-heading">Age</h5>
            <input autocomplete="off" placeholder="The age of your identity"
                   type="number"
                   :value="$store.state.identity.personaData['persona_age']"
                   @change="setPersonaField('persona_age', $event)">
          </div>
          <div class="one-input flex-1">
            <h5 class="input-heading">Nationality</h5>
            <select class="w-full" @change="setPersonaField('nationality', $event)">
              <option>American</option>
              <option>Canadian</option>
            </select>
          </div>
          <div class="one-input flex-1">
            <h5 class="input-heading">Race</h5>
            <input autocomplete="off" placeholder="The race of your identity"
                   type="text"
                   :value="$store.state.identity.personaData['persona_race']"
                   @change="setPersonaField('persona_race', $event)">
          </div>
        </div>
        <div class="one-input">
          <h5 class="input-heading">Languages</h5>
          <input autocomplete="off" placeholder="What languages does your AI speak?"
                 type="text"
                 :value="$store.state.identity.personaData['persona_languages']"
                 @change="setPersonaField('persona_languages', $event)">
        </div>
        <div class="one-input">
          <h5 class="input-heading">Topics of Expertise</h5>
          <input autocomplete="off" placeholder="What topics does your AI know a lot about?"
                 type="text"
                 :value="$store.state.identity.personaData['persona_expertise']"
                 @change="setPersonaField('persona_expertise', $event)">
          <p class="small-text">This tells the AI to be aware of specific expert knowledge.</p>
        </div>
        <div class="one-input">
          <h5 class="input-heading">Interests</h5>
          <input autocomplete="off" placeholder="Tell us about your identity's interests"
                 type="text"
                 :value="$store.state.identity.personaData['persona_interests']"
                 @change="setPersonaField('persona_interests', $event)">
          <p class="small-text">Indicates what your persona is passionate about.</p>
        </div>
        <div class="one-input">
          <h5 class="input-heading">Background</h5>
          <textarea :value="$store.state.identity.personaData['persona_background']"
                    @change="setPersonaField('persona_background', $event)"
                    class="styled-textarea identity-textarea"
                    placeholder=""></textarea>
          <p class="small-text">Provide information about your persona's background.</p>
        </div>
        <div class="one-input">
          <h5 class="input-heading">Personal Knowledge</h5>
          <textarea :value="$store.state.identity.personaData['persona_knowledge']"
                    @change="setPersonaField('persona_knowledge', $event)"
                    class="styled-textarea identity-textarea"
                    placeholder=""></textarea>
          <p class="small-text">Provide information that your AI should always keep in mind.</p>
        </div>
      </div>
    </section>

    <!-- Script Tab -->
    <section v-if="openTab == 'script'" class="page-content">
      <div class="script-container">
        <h3 class="section-title">Script</h3>
        <p class="section-description">This is the script that ChatSetter should follow.</p>
        <h4 class="section-heading identity-heading">
          ChatSetter will follow this script, but will be creative when handling conversations
        </h4>
        <textarea placeholder="Paste your script here"
                  class="styled-textarea"
                  :value="$store.state.identity.memory.script"
                  @change="updateScript($event)"></textarea>
        <h3 class="section-title mt-10">Objections</h3>
        <p class="section-description">Common objections that occur during the sale process</p>
        <h4 class="section-heading identity-heading">
          Add known objections and suggested responses
        </h4>
        <textarea placeholder="Write the list of objections and responses here"
                  class="styled-textarea"
                  :value="$store.state.identity.memory.objections"
                  @change="updateObjections($event)"></textarea>
      </div>
    </section>

    <!-- Advanced Tab -->
    <section v-else-if="openTab == 'feedback'" class="page-content">
      <!-- <h3 class="section-title">Feedback</h3> -->
      <!-- <p class="section-description">Give your Chatsetter feedback to improve performance immediately.</p> -->
      <Revisions/>
    </section>
  </div>
</template>

<script>
export default {
  name: 'IdentityPage',
  layout: 'app',
  data() {
    return {
      openTab: 'general',
      identityTab: 'basic'
    }
  },
  watch: {
    $route (to, from){
        this.getMyMemory()
    }
  },
  methods: {
    updateScript(event) {
      const newValue = event.target.value;
      console.log('new value', newValue);
      this.$store.dispatch('identity/updateScript', { newValue });
    },
    updateObjections(event) {
      const newValue = event.target.value;
      console.log('new value', newValue);
      this.$store.dispatch('identity/updateObjections', { newValue });
    },
    setTab(tab) {
      this.openTab = tab;
    },
    setIdentityTab(identityTab) {
      this.identityTab = identityTab;
    },
    setPersonaField(field, event) {
      this.$store.dispatch('identity/setPersonaField', {
        field,
        value: event.target.value
      });
    },
    getMyMemory () {
      this.$store.dispatch('identity/getMemory', {
          // conversationId: this.$store.state.messages.conversations[this.showConversation].id,
          // message: this.newMessage,
          // receiver_instagram_id: this.otherUid()
      }).then((res) => {
          // this.tempMessage = false
          // this.$forceUpdate()
      })
      let tab = this.$route.query.tab
      let identityTab = this.$route.query.idtab

      if (tab) {
        this.openTab = tab
      }

      if (identityTab == 'basic') {
        this.identityTab = 'basic'
      } else if (identityTab == 'advanced') {
        this.identityTab = 'advanced'
      }
    }
  },
  created() {
    this.$store.dispatch('identity/getIdentity');
    // this.getMyMemory()
  },
  mounted() {
    this.getMyMemory()
  }
}
</script>

<style lang="scss">
/* Brand Colors */
$chatsetterGreen: #046c38;
$chatsetterWhite: #ffffff;
$chatsetterLightBg: #fcfbf7;
$chatsetterBorder: lighten($chatsetterGreen, 40%);
$chatsetterText: #333;

/* Container & Page Layout */
.container.identity-page {
  background-color: $chatsetterLightBg;
  padding: 2rem;
  font-family: sans-serif;
}

/* Page Header */
.page-header {
  padding-bottom: 1rem;
}
.page-title {
  font-size: 1.5rem;      // Matches text-2xl
  line-height: 1.75rem;    // Matches leading-7
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: $chatsetterGreen;
}
.page-subtitle {
  font-size: 1rem;
  color: darken($chatsetterGreen, 20%);
  margin-bottom: 1rem;
}

/* Tabs */
.tabs {
  margin-top: 0.5rem;
}
.page-tab {
  border-bottom: 4px solid transparent;
  color: darken($chatsetterGreen, 20%);
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
}
.page-tab-selected {
  color: $chatsetterGreen;
  border-bottom: 4px solid $chatsetterGreen;
}

/* Section Layout */
.page-content {
  padding: 2rem 0;
}
.section-title {
  font-size: 1.25rem;     // Slightly smaller than page title for section headings
  line-height: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: $chatsetterGreen;
}
.section-description {
  font-size: 1rem;
  color: $chatsetterText;
  margin-bottom: 1rem;
}
.section-heading {
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: #8d96a7;
}

/* One-Input Block Styling */
.one-input {
  margin-bottom: 1rem;
}
.one-input input,
.one-input select,
.one-input textarea {
  width: 100%;
  padding: 0.75rem;
  /*border: 1px solid $chatsetterBorder;*/
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.one-input input:focus,
.one-input select:focus,
.one-input textarea:focus {
  outline: none;
  border: 2px solid $chatsetterGreen;
  /*box-shadow: 0 0 0 2px rgba($chatsetterGreen, 0.2);*/
}

select, input, textarea {
  background-color: transparent;
}

/* Input & Select Headings */
.input-heading {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: $chatsetterText;
}

/* Styled Textarea for Script/Objections & Advanced Fields */
.styled-textarea {
  width: 100%;
  max-width: 1000px;
  height: 400px; /* You can adjust this height as needed */
  padding: 0.75rem;
  /*border: 1px solid $chatsetterBorder;*/
  border-radius: 0.375rem;
  resize: vertical;
  transition: border-color 0.2s, box-shadow 0.2s;
  margin-top: 0.5rem;
}
.styled-textarea:focus {
  outline: none;
  border-color: $chatsetterGreen;
  box-shadow: 0 0 0 2px rgba($chatsetterGreen, 0.2);
}

/* Additional small text style */
.small-text {
  font-size: 0.75rem;
  color: $chatsetterText;
  margin-top: 0.25rem;
}

/* Specific adjustments for textareas within identity sections */
.identity-textarea {
  height: 150px;
}

/* Small Input Adjustments */
.small-input {
  max-width: 200px;
}
.left-right-button {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  border: 1px solid #333;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  cursor: pointer;
}
.left-right-button-text {
  font-size: 14px;
  cursor: pointer;
  padding: 8px;
  /*border: 1px solid transparent;*/
}
.selected-identity-tab {
  font-weight: 500;
  color: $chatsetterGreen;
  background-color: rgba($chatsetterGreen, 0.2);
  /*border: 1px solid $chatsetterGreen;*/
  padding: 8px;
  border-radius: 8px;
}
.mw___ {
  max-width: 1000px;
}
</style>
