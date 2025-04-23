<template>
  <div class="identity-page container mx-auto p-6 bg-chatsetterLightBg rounded-lg">
    <!-- Header -->
    <section class="page-header text-center mb-8">
      <h2 class="text-3xl font-semibold text-chatsetterGreen">Memory</h2>
      <p class="text-lg text-gray-700 mt-2">Create your AI personality.</p>
    </section>

    <!-- Tabs -->
    <nav class="tabs flex justify-center gap-8 mb-8">
      <button
        class="tab-btn"
        :class="{ 'active': openTab === 'general' }"
        @click="setTab('general')"
      >Identity</button>
      <button
        class="tab-btn"
        :class="{ 'active': openTab === 'script' }"
        @click="setTab('script')"
      >Script</button>
      <button
        class="tab-btn"
        :class="{ 'active': openTab === 'feedback' }"
        @click="setTab('feedback')"
      >Instant Feedback</button>
    </nav>

    <!-- Content -->
    <transition name="fade" mode="out-in">
      <!-- Identity Tab -->
      <div v-if="openTab === 'general'" key="general" class="space-y-6">
        <div class="card">
          <h3 class="section-title">Identity</h3>
          <p class="section-description">What your AI needs to do its job.</p>

          <!-- Basic / Advanced Toggle -->
          <div class="toggle-buttons inline-flex border border-gray-300 rounded-full overflow-hidden mb-6">
            <button
              class="px-4 py-1 font-medium"
              :class="{ 'bg-chatsetterGreen text-white': identityTab === 'basic' }"
              @click="setIdentityTab('basic')">
              Basic
            </button>
            <button
              class="px-4 py-1 font-medium"
              :class="{ 'bg-chatsetterGreen text-white': identityTab === 'advanced' }"
              @click="setIdentityTab('advanced')">
              Advanced
            </button>
          </div>

          <!-- Basic Fields -->
          <div v-if="identityTab === 'basic'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="input-heading">Name</label>
              <input class="input-field" placeholder="The name of your identity"
                     :value="$store.state.identity.personaData['persona_name']"
                     @input="setPersonaField('persona_name', $event)" />
            </div>
            <div>
              <label class="input-heading">Pronouns</label>
              <select class="input-field" :value="$store.state.identity.personaData['pronouns']"
                      @change="setPersonaField('pronouns', $event)">
                <option>he/him</option>
                <option>she/her</option>
              </select>
            </div>
            <div class="md:col-span-2">
              <label class="input-heading">Occupation</label>
              <input class="input-field" placeholder="Enter the occupation of your AI handler"
                     :value="$store.state.identity.personaData['persona_occupation']"
                     @input="setPersonaField('persona_occupation', $event)" />
            </div>
            <div class="md:col-span-2">
              <h4 class="section-subheading mt-4">Company Information</h4>
            </div>
            <div>
              <label class="input-heading">Company Name</label>
              <input class="input-field" placeholder="What is the name of your company?"
                     :value="$store.state.identity.personaData['persona_company_name']"
                     @input="setPersonaField('persona_company_name', $event)" />
            </div>
            <div>
              <label class="input-heading">Company Website</label>
              <input class="input-field" placeholder="Your company's website"
                     :value="$store.state.identity.personaData['persona_company_website']"
                     @input="setPersonaField('persona_company_website', $event)" />
            </div>
            <div>
              <label class="input-heading">Company Email</label>
              <input class="input-field" placeholder="The email of your company"
                     :value="$store.state.identity.personaData['persona_company_email']"
                     @input="setPersonaField('persona_company_email', $event)" />
            </div>
            <div>
              <label class="input-heading">Phone Number</label>
              <input class="input-field" type="tel" placeholder="The company's phone number"
                     :value="$store.state.identity.personaData['persona_company_phone']"
                     @input="setPersonaField('persona_company_phone', $event)" />
            </div>
            <div class="md:col-span-2">
              <label class="input-heading">Description</label>
              <textarea class="input-field h-32 resize-y" placeholder="Tell us about your company"
                        :value="$store.state.identity.personaData['persona_company_description']"
                        @input="setPersonaField('persona_company_description', $event)"></textarea>
            </div>
          </div>

          <!-- Advanced Fields -->
          <div v-if="identityTab === 'advanced'" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label class="input-heading">Age</label>
                <input class="input-field" type="number" placeholder="The age of your identity"
                       :value="$store.state.identity.personaData['persona_age']"
                       @input="setPersonaField('persona_age', $event)" />
              </div>
              <div>
                <label class="input-heading">Nationality</label>
                <select class="input-field"
                        @change="setPersonaField('nationality', $event)">
                  <option>American</option>
                  <option>Canadian</option>
                </select>
              </div>
              <div>
                <label class="input-heading">Race</label>
                <input class="input-field" placeholder="The race of your identity"
                       :value="$store.state.identity.personaData['persona_race']"
                       @input="setPersonaField('persona_race', $event)" />
              </div>
            </div>
            <div>
              <label class="input-heading">Languages</label>
              <input class="input-field" placeholder="What languages does your AI speak?"
                     :value="$store.state.identity.personaData['persona_languages']"
                     @input="setPersonaField('persona_languages', $event)" />
            </div>
            <div>
              <label class="input-heading">Topics of Expertise</label>
              <input class="input-field" placeholder="What topics does your AI know a lot about?"
                     :value="$store.state.identity.personaData['persona_expertise']"
                     @input="setPersonaField('persona_expertise', $event)" />
              <p class="small-text mt-1">This tells the AI to be aware of specific expert knowledge.</p>
            </div>
            <div>
              <label class="input-heading">Interests</label>
              <input class="input-field" placeholder="Tell us about your identity's interests"
                     :value="$store.state.identity.personaData['persona_interests']"
                     @input="setPersonaField('persona_interests', $event)" />
              <p class="small-text mt-1">Indicates what your persona is passionate about.</p>
            </div>
            <div>
              <label class="input-heading">Background</label>
              <textarea class="input-field h-32 resize-y" placeholder=""
                        :value="$store.state.identity.personaData['persona_background']"
                        @input="setPersonaField('persona_background', $event)"></textarea>
              <p class="small-text mt-1">Provide information about your persona's background.</p>
            </div>
            <div>
              <label class="input-heading">Personal Knowledge</label>
              <textarea class="input-field h-32 resize-y" placeholder=""
                        :value="$store.state.identity.personaData['persona_knowledge']"
                        @input="setPersonaField('persona_knowledge', $event)"></textarea>
              <p class="small-text mt-1">Provide information that your AI should always keep in mind.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Script Tab -->
      <div v-else-if="openTab === 'script'" key="script" class="space-y-6">
        <div class="card">
          <h3 class="section-title">Script</h3>
          <p class="section-description">This is the script that ChatSetter should follow.</p>
          <textarea class="input-field h-48 resize-y"
                    placeholder="Paste your script here"
                    :value="$store.state.identity.memory.script"
                    @input="updateScript($event)"></textarea>
        </div>
        <div class="card">
          <h3 class="section-title">Objections</h3>
          <p class="section-description">Common objections that occur during the sale process</p>
          <textarea class="input-field h-32 resize-y"
                    placeholder="Write the list of objections and responses here"
                    :value="$store.state.identity.memory.objections"
                    @input="updateObjections($event)"></textarea>
        </div>
      </div>

      <!-- Feedback Tab -->
      <div v-else key="feedback" class="page-content">
        <Revisions/>
      </div>
    </transition>
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
    '$route'(to, from) {
      this.getMyMemory();
    }
  },
  methods: {
    setTab(tab) {
      this.openTab = tab;
    },
    setIdentityTab(tab) {
      this.identityTab = tab;
    },
    setPersonaField(field, event) {
      this.$store.dispatch('identity/setPersonaField', {
        field,
        value: event.target.value
      });
    },
    updateScript(e) {
      this.$store.dispatch('identity/updateScript', { newValue: e.target.value });
    },
    updateObjections(e) {
      this.$store.dispatch('identity/updateObjections', { newValue: e.target.value });
    },
    getMyMemory() {
      this.$store.dispatch('identity/getMemory');
      const { tab, idtab } = this.$route.query;
      if (tab) this.openTab = tab;
      if (idtab) this.identityTab = idtab;
    }
  },
  created() {
    this.$store.dispatch('identity/getIdentity');
  },
  mounted() {
    this.getMyMemory();
  }
}
</script>

<style lang="scss">
/* Brand Colors */
$chatsetterGreen: #503de0;
$chatsetterLightBg: #fcfbf7;
$chatsetterText: #333;

/* Container */
.container {
  background-color: $chatsetterLightBg;
}

/* Utility */
.text-chatsetterGreen { color: $chatsetterGreen; }
.bg-chatsetterLightBg { background-color: $chatsetterLightBg; }

/* Card */
.card {
  background: #fff;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

/* Tabs */
.tab-btn {
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-bottom: 2px solid transparent;
  color: darken($chatsetterGreen, 15%);
  transition: all 0.2s;
  background: transparent;
}
.tab-btn.active {
  color: $chatsetterGreen;
  border-bottom-color: $chatsetterGreen;
}

/* Input Fields */
.input-field {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s;
}
.input-field:focus {
  outline: none;
  border-color: $chatsetterGreen;
}

/* Headings */
.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: $chatsetterGreen;
}
.section-description {
  font-size: 1rem;
  color: $chatsetterText;
  margin-bottom: 1rem;
}
.input-heading {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  display: block;
  color: $chatsetterText;
}
.section-subheading {
  font-size: 1rem;
  font-weight: 500;
  color: darken($chatsetterText, 20%);
}
.small-text {
  font-size: 0.75rem;
  color: darken($chatsetterText, 30%);
}

/* Toggle Buttons */
.toggle-buttons button {
  border: none;
  outline: none;
}

/* Fade Transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.bg-chatsetterGreen {
  background-color: $chatsetterGreen;
}
</style>
