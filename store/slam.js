export const state = () => ({
  slamTrivia: {},
  slamTable: {},
  voteScores: {},
  slamLeaderboard: {},
  slamData: {}
})

export const getters = {
}

export const mutations = {
  SET_SLAM_TRIVIA (state, item) {
    state.slamTrivia = item
  },
  SET_SLAM_TABLE (state, item) {
    state.slamTable = item
  },
  SET_SLAM_VOTE (state, item) {
    state.voteScores = item
  },
  SET_SLAM_LEADERBOARD (state, item) {
    state.slamLeaderboard = item
  },
  SET_SLAM_DATA (state, item) {
    state.slamData = item
  }
}

export const actions = {
  async watchSlamLeaderboards({ state }, item) {
    return new Promise(async (resolve, reject) => {
    // firebaseInstance.database().ref('/slam_data_2/slam_data').on('value', (snap2) => {
      // let data2 = snap2.val() || {}
      // data2 = data2.data || {}
      // let data = JSON.parse(data2 || {})
      // console.log('data2', data2)

      console.log('*** Watching leaderboard ***')

      // this.$fire.database.ref('/slam_data').on('value', (snap) => {
      //   let slamTable = snap.val()
      //   console.log('slamTable', slamTable)
      //   // state.commit('auth/SET_SLAM_TABLE', slamTable)
      // })


      let spaceId = item.spaceid
      console.log('spaceid***', spaceId)

      this.$fire.database.ref('/slam_data/' + spaceId).on('value', (snap) => {
        let data = snap.val() || {}
        console.log('data raw', data)

        data = JSON.parse(data)

        // for (let user in data) {
        //   let a = data[user] || {}
        //   let b = data2[user] || {}
        //   for (let emoji in a) {
        //     data[user][emoji] = data2[user] ? data2[user][emoji] : 0
        //   }
        // }

        // sort the data
        let sortedData = {}
        let dataAsArray = []
        let voteScores = {
          trump: 0,
          biden: 0,
          rfk: 0,
          other: 0,
          thumbsDown: 0
        }
        let trump = 0
        let biden = 0
        let rfk = 0
        let other = 0
        let thumbsDown = 0
        let total = 0


        for (let d in data) {
          let rowToPush = data[d]
          let rowTotal = 0

          let myTopEmojiScore = 0
          let myTopEmoji = 'heart'

          for (let emoji in data[d]) {
            let thisCount = data[d][emoji] || 0
            if (thisCount > myTopEmojiScore) {
                myTopEmoji = emoji
                myTopEmojiScore = thisCount
            }
            // if (emoji == 'heart') {
              // trump = trump + thisCount
              // if (thisCount > myTopEmojiScore) {}
            // } 

            // else if (emoji == 'thumbs-up') {
            //   console.log('thumbs-up')
            //   let thisCount = data[d][emoji]
            //   biden = biden + thisCount
            // } else if (emoji == '100') {
            //   console.log('100')
            //   let thisCount = data[d][emoji]
            //   rfk = rfk + thisCount
            // } else if (emoji == 'fist') {
            //   console.log('fist')
            //   let thisCount = data[d][emoji]
            //   other = other + thisCount
            // } else if (emoji == 'thumbs-down') {
            //   console.log('fist')
            //   let thisCount = data[d][emoji]
            //   thumbsDown = thumbsDown + thisCount
            // }

            if (emoji !== 'hand-up' && (typeof data[d][emoji] == 'number')) {
              rowTotal = parseInt(rowTotal + data[d][emoji] || 0)
              total = total + rowTotal
            }
          }
          rowToPush.topEmoji = myTopEmoji
          rowToPush.username = d
          rowToPush.total = rowTotal
          dataAsArray.push(rowToPush)
        }
        // console.log('dataAsArray', dataAsArray)
        dataAsArray = dataAsArray.sort((b, a) => {
          return a['100'] - b['100']
        })
        // console.log('dataAsArray2', dataAsArray)
        for (let i in dataAsArray) {
          sortedData[dataAsArray[i].username] = dataAsArray[i]
        }

        voteScores.trump = trump
        voteScores.biden = biden
        voteScores.rfk = rfk
        voteScores.other = other
        voteScores.thumbsDown = thumbsDown

        console.log('sortedData', sortedData)
        console.log('number', dataAsArray.length)
        console.log('data', data)

        this.commit('slam/SET_SLAM_LEADERBOARD', sortedData)
        this.commit('slam/SET_SLAM_DATA', data)
        // this.commit('slam/SET_TOTAL_EMOJIS', total)
        // this.commit('slam/SET_SLAM_VOTE', voteScores)
      })
    // })
      // return resolve(setupGuide)
    })
  },
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