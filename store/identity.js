export const state = () => ({
  identities: [
    {name: 'ChatSetter'}
  ],
  personaData: {},
  sequences: {},
  memory: {},
  style: [],
  sequencesLoaded: false,
  hideSetupGuide: false
})

export const getters = {
  getConversations(state) {
    return state.conversations
  }
}

export const mutations = {
  setMessagesStatuses(state, statuses) {
    console.log('setting statuses', statuses)
    state.statuses = statuses
  },
  setConversation(state, data) {
    let conversationId = data.conversationId
    let conversation = data.conversation
    console.log('setConversation', conversationId, conversation)
    state.conversations[conversationId] = conversation
  },
  setPersona(state, data) {
    console.log('setPersona', data)
    state.personaData = {...data, loaded: true}
  },
  setStyle(state, data) {
    console.log('setStyle', data)
    state.style = data
  },
  hideSetupGuide(state, hideSetupGuide) {
    console.log('hideSetupGuide', hideSetupGuide)
    state.hideSetupGuide = hideSetupGuide
  },
  setSequences(state, data) {
    console.log('sequences', data)
    state.sequences = data
    state.sequencesLoaded = true
  },
  setMemory(state, data) {
    console.log('memory', data)
    state.memory = data
  },
  toggleSequenceActive(state, data) {
    console.log('sequence', data)
    state.sequences[data].active = !state.sequences[data].active
  },
  updateSetupGuideItem(state, { sectionIndex, itemIndex, completed }) {
    // This mutation is used by components to update their local state immediately
    // when a setup item is completed, without waiting for a database refresh
    if (this.$fire && this.$fire.auth && this.$fire.auth.currentUser) {
      const uid = this.$fire.auth.currentUser.uid
      // Update in Firebase (but don't wait for it)
      this.$fire.database.ref(`setupGuides/${uid}/${sectionIndex}/items/${itemIndex}/completed`).set(completed)
    }
  }
}

export const actions = {
  async getMySetupGuide({ state }, item) {
    return new Promise(async (resolve, reject) => {
      let uid = this.$fire.auth.currentUser.uid || 'f'
      let _setupGuide = await this.$fire.database.ref('setupGuides/' + uid).once('value')
      let setupGuide = _setupGuide.val() || false
      return resolve(setupGuide)
    })
  },
  async saveSetupGuide({ state }, item) {
    return new Promise(async (resolve, reject) => {
      let uid = this.$fire.auth.currentUser.uid || 'f'
      await this.$fire.database.ref('setupGuides/' + uid).set(item.sections)
      return resolve('ok')
    })
  },
  async saveIdentityField({ state }, item) {
    // let user = this.$fire.auth.currentUser.uid
    // let uid = this.$fire.auth.currentUser.uid || 'f'
    // let conversationId = item.conversationId || 'f'
    // let path = 'instagram_conversations_messages/' + uid + '/' + conversationId
    // let _conversation = await this.$fire.database.ref(path).once('value')
    // let conversation = _conversation.val() || {} 
    // console.log('conversation', conversationId, conversation)
    // this.commit('messages/setConversation', {conversationId, conversation})
  },
  async changeSequenceName({ state }, item) {
    return new Promise(async (resolve, reject) => {
      let uid = this.$fire.auth.currentUser.uid
      let sequenceIndex = item.sequenceIndex
      let value = item.value
      let path = 'sequences/' + uid + '/' + sequenceIndex + '/name/'
      await this.$fire.database.ref(path).set(value)
      return resolve('ok')
    })
  },
  async updateFileInstruction({ state }, item) {
    return new Promise(async (resolve, reject) => {
      let uid = this.$fire.auth.currentUser.uid
      let fileIndex = item.fileIndex
      let newValue = item.newValue
      let path = 'memory/' + uid + '/files/' + fileIndex + '/instruction'
      await this.$fire.database.ref(path).set(newValue)
      return resolve('ok')
    })
  },
  async updateScript({ state }, item) {
    return new Promise(async (resolve, reject) => {
      let uid = this.$fire.auth.currentUser.uid || 'f'
      let fileIndex = item.fileIndex
      let newValue = item.newValue
      let path = 'memory/' + uid + '/script'
      await this.$fire.database.ref(path).set(newValue)
      
      // If there's script content, update the setup guide item for "Add a script to follow"
      if (newValue && newValue.trim()) {
        // Script section is at index 2, and "Add a script to follow" is the first item (index 0)
        const sectionIndex = 2;
        const itemIndex = 0;
        
        // Update the item in the setup guide - both in the database and UI
        const setupGuidePath = `setupGuides/${uid}/${sectionIndex}/items/${itemIndex}/completed`;
        await this.$fire.database.ref(setupGuidePath).set(true);
        
        // Emit event to notify SetupGuide component to update UI
        if (this._vm) {
          this._vm.$root.$emit('setupGuideItemCompleted', { sectionIndex, itemIndex });
        }
      }
      
      return resolve('ok')
    })
  },
  async updateObjections({ state }, item) {
    return new Promise(async (resolve, reject) => {
      let uid = this.$fire.auth.currentUser.uid || 'f'
      let fileIndex = item.fileIndex
      let newValue = item.newValue
      let path = 'memory/' + uid + '/objections'
      await this.$fire.database.ref(path).set(newValue)
      
      // If there's objections content, update the setup guide item for "Add objections & responses"
      if (newValue && newValue.trim()) {
        // Script section is at index 2, and "Add objections & responses" is the second item (index 1)
        const sectionIndex = 2;
        const itemIndex = 1;
        
        // Update the item in the setup guide - both in the database and UI
        const setupGuidePath = `setupGuides/${uid}/${sectionIndex}/items/${itemIndex}/completed`;
        await this.$fire.database.ref(setupGuidePath).set(true);
        
        // Emit event to notify SetupGuide component to update UI
        if (this._vm) {
          this._vm.$root.$emit('setupGuideItemCompleted', { sectionIndex, itemIndex });
        }
      }
      
      return resolve('ok')
    })
  },
  async editTaskTask({ state }, item) {
    return new Promise(async (resolve, reject) => {
      let uid = this.$fire.auth.currentUser.uid
      let sequenceIndex = item.sequenceIndex
      let taskIndex = item.taskIndex
      let value = item.value
      let path = 'sequences/' + uid + '/' + sequenceIndex + '/tasks/' + taskIndex + '/task'
      await this.$fire.database.ref(path).set(value)
      return resolve('ok')
    })
  },
  async editTaskGoal({ state }, item) {
    return new Promise(async (resolve, reject) => {
      let uid = this.$fire.auth.currentUser.uid
      let sequenceIndex = item.sequenceIndex
      let taskIndex = item.taskIndex
      let value = item.value
      let path = 'sequences/' + uid + '/' + sequenceIndex + '/tasks/' + taskIndex + '/goal'
      await this.$fire.database.ref(path).set(value)
      return resolve('ok')
    })
  },
  async editTriggerKeywords({ state }, item) {
    return new Promise(async (resolve, reject) => {
      let uid = this.$fire.auth.currentUser.uid
      let sequenceIndex = item.sequenceIndex
      let triggerIndex = item.triggerIndex
      let value = item.value
      let path = 'sequences/' + uid + '/' + sequenceIndex + '/triggers/' + triggerIndex + '/keywords'
      await this.$fire.database.ref(path).set(value)
      return resolve('ok')
    })
  },
  async hideSetupGuide({ state }, item) {
    this.commit('identity/hideSetupGuide', true)
  },
  async getConversation({ state }, item) {
    let user = this.$fire.auth.currentUser.uid
    let uid = this.$fire.auth.currentUser.uid || 'f'
    let conversationId = item.conversationId || 'f'
    let path = 'instagram_conversations_messages/' + uid + '/' + conversationId
    let _conversation = await this.$fire.database.ref(path).once('value')
    let conversation = _conversation.val() || {} 
    console.log('conversation', conversationId, conversation)
    this.commit('messages/setConversation', {conversationId, conversation})
  },
  async getIdentity({ state }, item) {
    let uid = this.$fire.auth.currentUser.uid || 'f'
    let path = 'persona_data/' + uid
    let _personaData = await this.$fire.database.ref(path).once('value')
    let personaData = _personaData.val() || {} 
    console.log('personaData', personaData)
    this.commit('identity/setPersona', personaData)
  },
  async getStyle({ state }, item) {
    let uid = this.$fire.auth.currentUser.uid || 'f'
    let path = 'style/' + uid
    let _styleData = await this.$fire.database.ref(path).once('value')
    let styleData = _styleData.val() || {} 
    console.log('styleData', styleData)
    this.commit('identity/setStyle', styleData)
  },
  async getSequences({ state }, item) {
    let uid = this.$fire.auth.currentUser.uid || 'f'
    let path = 'sequences/' + uid
    let _sequences = await this.$fire.database.ref(path).once('value')
    let sequences = _sequences.val() || {} 
    console.log('sequences', sequences)
    this.commit('identity/setSequences', sequences)
  },
  async getMemory({ state }, item) {
    let uid = this.$fire.auth.currentUser.uid || 'f'
    let path = 'memory/' + uid
    let _getMemory = await this.$fire.database.ref(path).once('value')
    let getMemory = _getMemory.val() || {} 
    console.log('getMemory', getMemory)
    this.commit('identity/setMemory', getMemory)
  },
  async uploadFile({ state }, item) {
    return new Promise(async (resolve, reject) => {

      let uid = this.$fire.auth.currentUser.uid || 'f'
      let file = item.file
      var extension = file.name
      extension = extension.substr(extension.lastIndexOf('.'), extension.length)
      console.log('a')
      // let productId = item.productId

      let snapshot = await this.$fire.storage.ref('files').child(uid).child(file.name).put(file)
      let url = await this.$fire.storage.ref('files').child(uid).child(file.name).getDownloadURL()

      // save file
      let addFile = await this.$fire.functions.httpsCallable('addFile')
      addFile({name: file.name, url}).then(async (result) => {
          console.log('addFile result', result)
          return resolve('Success!')
          // if (result.data.result == 'ok') {
          // } else {
            // say failed to get messages
            // return reject('Fail!')
          // }
      })

      // await firebaseInstance.database().ref('/app/user_public_info/' + uid + '/profilePic').set(url)
      console.log('url', url)

      return resolve({
        message: 'ok',
        url
      })

    })
  },
  async addSequence({ state }, item) {
    return new Promise(async (resolve, reject) => {
      let addSequence = this.$fire.functions.httpsCallable('addSequence')
      addSequence({}).then(async (result) => {
          console.log('addSequence result', result)
          if (result.data.result == 'ok') {
            return resolve('Success!')
          } else {
            // say failed to get messages
            return reject('Fail!')
          }
      })
    })
  },
  async deleteSequence({ state }, item) {
    return new Promise(async (resolve, reject) => {
      let deleteSequence = this.$fire.functions.httpsCallable('deleteSequence')
      deleteSequence(item).then(async (result) => {
          console.log('deleteSequence result', result)
          if (result.data.result == 'ok') {
            return resolve('Success!')
          } else {
            // say failed to get messages
            return reject('Fail!')
          }
      })
    })
  },
  async activateMassMessaging({ state }, item) {
    return new Promise(async (resolve, reject) => {
      let activateMassMessaging = this.$fire.functions.httpsCallable('activateMassMessaging')
      activateMassMessaging(item).then(async (result) => {
          console.log('activateMassMessaging result', result)
          if (result.data.result == 'ok') {
            return resolve('Success!')
          } else {
            // say failed to get messages
            return reject('Fail!')
          }
      })
    })
  },
  async deleteFile({ state }, item) {
    return new Promise(async (resolve, reject) => {
      let deleteFile = this.$fire.functions.httpsCallable('deleteFile')
      deleteFile(item).then(async (result) => {
          console.log('deleteFile result', result)
          if (result.data.result == 'ok') {
            return resolve('Success!')
          } else {
            // say failed to get messages
            return reject('Fail!')
          }
      })
    })
  },
  async toggleSequenceActive({ state }, item) {
    let uid = this.$fire.auth.currentUser.uid || 'f'
    let sequence = item.sequence
    let path = 'sequences/' + uid + '/' + sequence + '/active'
    console.log('!!', state, sequence)
    // console.log('!!!', state.sequences[sequence].active)
    console.log('path', path)
    await this.$fire.database.ref(path).set((state.sequences && state.sequences[[sequence]]) ? !state.sequences[sequence].active : true)
    this.commit('identity/toggleSequenceActive', sequence)
  },
  async setPersonaField({ state, dispatch, commit }, item) {
    console.log('setPersonaField', item)
    let uid = this.$fire.auth.currentUser.uid || 'f'
    let field = item.field
    let value = item.value

    let path = 'persona_data/' + uid + '/' + field
    await this.$fire.database.ref(path).set(value)
    console.log('field set')
    
    // If the field is persona_name and has a value, update the setup guide
    if (field === 'persona_name' && value) {
      // Identity section is at index 1, and "Add your name" is the first item (index 0)
      const sectionIndex = 1;
      const itemIndex = 0;
      
      // Update the item in the setup guide - both in the database and UI
      const setupGuidePath = `setupGuides/${uid}/${sectionIndex}/items/${itemIndex}/completed`;
      await this.$fire.database.ref(setupGuidePath).set(true);
      
      // Emit event to notify SetupGuide component to update UI
      if (this._vm) {
        this._vm.$root.$emit('setupGuideItemCompleted', { sectionIndex, itemIndex });
      }
    }
    
    // After updating any field, check both basic and advanced info
    const personaDataRef = await this.$fire.database.ref(`persona_data/${uid}`).once('value');
    const personaData = personaDataRef.val() || {};
    
    // Define field categories
    const basicInfoFields = [
      'persona_name', 
      'pronouns', 
      'persona_occupation', 
      'persona_company_name', 
      'persona_company_website', 
      'persona_company_email', 
      'persona_company_phone', 
      'persona_company_description'
    ];
    
    const advancedInfoFields = [
      'persona_age',
      'nationality',
      'persona_race',
      'persona_languages',
      'persona_expertise',
      'persona_interests',
      'persona_background',
      'persona_knowledge'
    ];
    
    // Check if a field has a valid value
    const hasValue = (data, fieldName) => 
      data[fieldName] && data[fieldName].trim && data[fieldName].trim() !== '';
    
    // Count filled fields
    const filledBasicFields = basicInfoFields.filter(fieldName => hasValue(personaData, fieldName));
    const filledAdvancedFields = advancedInfoFields.filter(fieldName => hasValue(personaData, fieldName));
    
    // BASIC INFO: If more than one basic field is filled, mark "Add basic info" as completed
    if (filledBasicFields.length > 1) {
      // Identity section is at index 1, and "Add basic info" is the second item (index 1)
      const sectionIndex = 1;
      const itemIndex = 1;
      
      // Update the item in the setup guide - both in the database and UI
      const setupGuidePath = `setupGuides/${uid}/${sectionIndex}/items/${itemIndex}/completed`;
      await this.$fire.database.ref(setupGuidePath).set(true);
      
      // Emit event to notify SetupGuide component to update UI
      if (this._vm) {
        this._vm.$root.$emit('setupGuideItemCompleted', { sectionIndex, itemIndex });
      }
    }
    
    // ADVANCED INFO: If at least one advanced field is filled, mark "Add advanced info" as completed
    if (filledAdvancedFields.length > 0) {
      // Identity section is at index 1, and "Add advanced info" is the third item (index 2)
      const sectionIndex = 1;
      const itemIndex = 2;
      
      // Update the item in the setup guide - both in the database and UI
      const setupGuidePath = `setupGuides/${uid}/${sectionIndex}/items/${itemIndex}/completed`;
      await this.$fire.database.ref(setupGuidePath).set(true);
      
      // Emit event to notify SetupGuide component to update UI
      if (this._vm) {
        this._vm.$root.$emit('setupGuideItemCompleted', { sectionIndex, itemIndex });
      }
    }
  },
}