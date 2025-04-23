<template>
    <div class="bg-white shadow sm:rounded-lg p-6">
      <div class="convert-box">
        <div v-show="changeConversionType" class="convert-options">
          <select class="nav-dropdown" :value="$store.state.ai.conversionType" @change="setNextConversionType($event)">
            <option value="book-sales-calls">Book sales calls in DMs</option>
            <option value="sell-direct">Sell direct in DMs</option>
          </select>
          <input type="text" class="nav-dropdown" placeholder="Comment Trigger Keywords" 
                 :value="$store.state.ai.commentTriggerKeywords" @change="setCommentKeywordTriggers($event)" />
          <div class="convert-actions">
            <input type="checkbox" :checked="$store.state.messages.followUpMode" @click="toggleFollowUpMode()">
            <p class="follow-up" @click="toggleFollowUpMode()">follow up (?)</p>
            <p class="button-x-2" @click="toggleChangeConversionType">Cancel</p>
            <p class="button-x-1" @click="setConverstionType">Ok</p>
          </div>
        </div>
        <div v-show="!changeConversionType" class="convert-current">
          <div class="convert-info">
            <h3 class="nav-dropdown">{{ conversionType() }}</h3>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="edit-icon cursor-pointer" @click="toggleChangeConversionType">
              <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7.8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/>
            </svg>
          </div>
          <p class="follow-up-indicator" v-show="$store.state.messages.followUpMode">with follow-up</p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Starter',
  data () {
    return {
      changeConversionType: false,
      nextConversionType: '',
      nextCommentKeywordTriggers: ''
    }
  },
  methods: {
    toggleFollowUpMode () {
      this.$store.dispatch('messages/toggleFollowUpMode', {})
    },
    toggleSequenceActive (event) {
      this.$store.dispatch('identity/toggleSequenceActive', { sequence: 0 })
    },
    toggleChangeConversionType () {
      this.changeConversionType = !this.changeConversionType
      if (this.changeConversionType) {
        this.nextConversionType = this.$store.state.ai.conversionType
        this.nextCommentKeywordTriggers = this.$store.state.ai.commentKeywordTriggers
      }
    },
    setNextConversionType (event) {
      this.nextConversionType = event.target.value
    },
    setCommentKeywordTriggers (event) {
      this.nextCommentKeywordTriggers = event.target.value
    },
    setConverstionType () {
      this.$store.dispatch('ai/setConversionType', {
        conversionType: this.nextConversionType,
        commentKeywordTriggers: this.nextCommentKeywordTriggers
      })
      this.changeConversionType = false
    },
    conversionType () {
      const options = {
        'book-sales-calls': 'Book sales calls in DMs',
        'sell-direct': 'Sell direct in DMs'
      }
      return options[this.$store.state.ai.conversionType]
    }
  }
}
</script>

<style lang="scss">
$chatsetter-green: #503de0;
$chatsetter-white: #ffffff;
/* Dropdowns used within the navbar */
.nav-section-title_ {
  color: $chatsetter-green;
}
.nav-dropdown {
  font-size: 14px;
  color: $chatsetter-white;
  background-color: darken($chatsetter-green, 5%);
  border: none;
  border-radius: 4px;
  padding: 0.5rem;
  outline: none;
}

/* On/Off text for toggles */
.onOff {
  font-size: 10px;
  margin: 0 0.5rem;
}
.disabled-choice {
  color: lighten($chatsetter-white, 40%) !important;
}

/* Edit icon style */
.edit-icon {
  width: 16px;
  color: $chatsetter-green;
  fill: $chatsetter-green;
}

/* Convert area styles */
.nav-convert {
  padding: 0 1.5rem;
}
.nav-convert-toggle {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /*margin-top: 0.5rem;*/
}

/* Box for conversion settings */
.convert-box {
  /*padding: 0.5rem 1rem;*/
  /*margin: 0 0.625rem;*/
}
.convert-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.convert-actions {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
.follow-up,
.follow-up-indicator {
  font-size: 0.75rem;
  cursor: pointer;
}
</style>
