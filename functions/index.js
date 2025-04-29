const functions = require('firebase-functions')
const cors = require('cors')({origin: true})
const axios = require('axios')
require('dotenv').config()
const clientId = process.env.INSTAGRAM_CLIENT_ID
const clientSecret = process.env.INSTAGRAM_CLIENT_SECRET
const redirectUri = process.env.INSTAGRAM_REDIRECT_URI
const clientIdCalendly = process.env.CALENDLY_CLIENT_ID
const clientSecretCalendly = process.env.CALENDLY_SECRET
const redirectUriCalendly = process.env.CALENDLY_REDIRECT_URI
const fetch = require('node-fetch')
const xml2js = require('xml2js')
const aiService = require('./services/ai')
const calendlyService = require('./services/calendly')
const firebaseService = require('./services/firebase')
// const puppeteerService = require('./services/puppeteer')
// const emailService = require('./services/email')
const db = firebaseService.db

exports.slam = functions.https.onRequest((req, res) => { // ok
    cors(req, res, async () => {
        let _data = req.body.data || {}
        console.log('_data', _data)

        let __data = JSON.parse(_data)

        console.log('__data', __data)

        let spaceId = __data.spaceId || 'noId'
        let data = __data.data
        let stringData = JSON.stringify(data)

        let now = (new Date()).getTime()

        await db.ref('slam_data/' + spaceId).set(stringData)
        await db.ref('slam_data_v2/' + spaceId).set(data)
        // await db.ref('slam_data_v3/' + spaceId + '/' + now).set(data)
        res.status(200).send({ received: true })
    })
})

let getAccessToken = async (uid) => {
  return new Promise(async (resolve, reject) => {
    let _token = await db.ref('/instagram_tokens_long_lived/' + (uid || 'f')).once('value')
    let token = _token.val()
    let access_token = token.access_token
    return resolve(access_token)
  })
}
exports.getMyCalendlyEvents = functions.https.onCall(async (data, context) => {
  let uid = context.auth && context.auth.uid
  return new Promise(async (resolve, reject) => {
    try {
      let events = await calendlyService.getMyCalendlyEvents(uid)
      return resolve(events)
    } catch (error) {
      console.log('Error in getMyCalendlyEvents', error)
    }
  })
})
exports.saveInstagramAccountOnSignup = functions.https.onCall(async (data, context) => {
  let uid = context.auth && context.auth.uid
  let instagramAccount = data.instagramAccount || 'f'
  return new Promise(async (resolve, reject) => {
    try {
      await db.ref('/instgramAccountOnSignup/' + (uid || 'f')).set(instagramAccount)
      return resolve('ok')
    } catch (error) {
      return reject('ok')
    }
  })
})

async function saveCostTracking (data) {
  return new Promise(async (resolve, reject) => {
    let {uid, response, purpose, model} = data
    let time = (new Date()).getTime()
    let tokens_in = response.data.usage.input_tokens
    let tokens_out = response.data.usage.output_tokens
    let cost_tracking_ref = 'cost_tracking/' + (uid || 'f')
    await db.ref(cost_tracking_ref).push({
      time,
      tokens_in,
      tokens_out,
      model,
      purpose,
      response: response.data
    })
    return resolve('ok')
  })
}
async function anthropicRequest (data) {
  return new Promise(async (resolve, reject) => {
    let {model, system, messages} = data
    try {
      // console.log('*** Messages ***')
      // console.log(messages)
      // console.log('*** Message 0 Content ***')
      // console.log(messages[0] && messages[0].content)
      const response = await axios.post(
        `https://api.anthropic.com/v1/messages`,
        {
          model,
          max_tokens: 2048,
          // max_tokens: 50,
          system,
          messages
        },
        {
          headers: {
            'x-api-key': process.env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
            'Content-Type': 'application/json'
          }
        }
      )
      return resolve(response)
    } catch (error) {
      return reject(error)
    }
  })
}
let selectModelByAllenId = (uid) => {
  // Choose Model: claude-3-haiku-20240307, claude-3-5-haiku-20241022, claude-3-5-sonnet-20241022, claude-3-7-sonnet-20250219
  let model = 'claude-3-7-sonnet-20250219'
  // let model = 'claude-3-5-haiku-20241022'
  // if (uid == 'KilV9ZEBkMXjbZ5QVNbdpKxxVs23') {
    // model = 'claude-3-7-sonnet-20250219'
  // } else if (uid == 'VZ4gFAgu2hfR1EFSuLnvzM7cihd2') {
    // model = 'claude-3-7-sonnet-20250219'
  // } else if (uid == 'ia3iUX9laNhxjS8yp9Al73JRYxl2') {
    // model = 'claude-3-7-sonnet-20250219'
  // }
  return model
}
async function getAnthropicResponse (system, messages, uid, purpose) {
    return new Promise(async (resolve, reject) => {
      try {
        let model = selectModelByAllenId(uid)
        let response = await anthropicRequest({model, system, messages})
        // await saveCostTracking({uid, response, purpose, model})
        return resolve(response)
      } catch (error) {
        return reject(error)
      }
  })
}
let getCommentReplies = async (uid, comment_id) => {
  return new Promise(async (resolve, reject) => {
      let _token = await db.ref('/instagram_tokens_long_lived/' + (uid || 'f')).once('value')
      let token = _token.val()
      let access_token = token.access_token
      // const url = `https://graph.instagram.com/v21.0/me/conversations?fields=participants,messages{message,created_time,from,to}&access_token=` + access_token
      const url = `https://graph.instagram.com/v22.0/${comment_id}/replies?fields=id,text,timestamp&access_token=${access_token}`

      await axios.get(url, {}, {
          headers: {
              'Authorization': `Bearer ${access_token}`,
              'Content-Type': 'application/json'
          }
      })
      .then(async (response) => {
        console.log('response')
        console.log(response.data)
        return resolve('ok')
      })
      .catch(async (error) => {
          console.error('Error 1:', error.response ? error.response.data : error.message)
          return reject(error)
      })
    })
}
let sendCommentResponse = async (data, t2, delay) => {
  return new Promise(async (resolve, reject) => {
    let {
      comment_id,
      sender_allen_uid,
      sender_converstion_id,
      receiver_instagram_id,
      sender_instagram_username
    } = data

    let token = await getAccessToken(sender_allen_uid)

    let possibleResponses = [
      'check your DMs',
      'check your messages',
      'Just messaged you!'
    ]
    let selectedResponseIndex = Math.floor(Math.random() * possibleResponses.length)
    let selectedResponse = possibleResponses[selectedResponseIndex]
    const url = `https://graph.instagram.com/v21.0/${comment_id}/replies`;
    const headers = {
        'Authorization': `Bearer ${token.access_token}`,
        'Content-Type': 'application/json'
    }

    let _data = {
      message: selectedResponse
    }

    axios.post(url, _data, { headers })
    .then(async (response) => {
      // let message_id = response.data.message_id
      // let comment_reply_tracking_ref = 'comment_reply_tracking/' + (uid || 'f')
      // await db.ref(comment_reply_tracking_ref).push({
      //   time: (new Date()).getTime(),
      //   message: selectedResponse
      // })
      return resolve(response.data)
    })
    .catch(error => {
      console.error('Error 3:', error.response ? error.response.data : error.message);
      return resolve('Ended with error')
    });
  })
}
let addGHLLog = async (fromId, fromUsername, toId, toUsername, status, object) => {
  return new Promise(async (resolve, reject) => {
    await db.ref('/ghl_logs/' + (fromId || 'f') + '/' + (toId || 'g')).push({
      time: (new Date()).getTime(),
      status,
      username: toUsername,
      object: object || null
    })
    return resolve('ok')
  })
}
// await addGHLLog(uid, instagram_username, receiver_instagram_id, senderUsername, `Received message -> message flow`)
// await addGHLLog(uid, instagram_username, receiver_instagram_id, senderUsername, `Conversation messages`, conversationMessages)
// await addGHLLog(uid, instagram_username, receiver_instagram_id, senderUsername, `Message Analysis`, messageAnalysis)
// await addGHLLog(uid, instagram_username, receiver_instagram_id, senderUsername, `Split response`, splitResponse)
// await addGHLLog(uid, instagram_username, receiver_instagram_id, senderUsername, `Formatted messages`, formattedMassages)
// await addGHLLog(uid, instagram_username, receiver_instagram_id, senderUsername, `Updating conversation messages`)
let getMyUsername = async (uid) => { 
  return new Promise(async (resolve, reject) => {
    let _instagram_username = await db.ref('instagram_details/' + uid + '/username').once('value')
    let instagram_username = _instagram_username.val()
    return resolve(instagram_username)
  })
}
let formatMessageInstagramToAnthropic = async (messages, my_username) => {
  return messages.map(msg => {
    const role = msg.from.username === my_username ? 'user' : 'assistant';
    return {
      role: role,
      content: [
        {
          type: 'text',
          text: msg.message
        }
      ]
    }
  })
}
let handleAnalysis = async (messageAnalysis, uid, igid) => { 
  return new Promise(async (resolve, reject) => {
    if (messageAnalysis && messageAnalysis.isInExcludedCountry) {
      let auto_responder_ref = 'autoRespondSettings/' + (uid || 'f') + '/' + (igid || 'g')
      await db.ref(auto_responder_ref).set(false)
      await sendNLQtoGHL(igid, 'excluded_country')
    } else if (messageAnalysis && messageAnalysis.goalCompleted) {
      let auto_responder_ref = 'autoRespondSettings/' + (uid || 'f') + '/' + (igid || 'g')
      await db.ref(auto_responder_ref).set(false)
      await sendNLQtoGHL(igid, 'goal_completed')
    }
    return resolve('ok')
  })
}
let sendNLQtoGHL = async (igid, code) => { 
  return new Promise(async (resolve, reject) => {

    let url = `https://services.leadconnectorhq.com/hooks/b0B76dvhKu9hnSxGAFTe/webhook-trigger/e94e363c-7861-4a30-b617-9602f3062e47`

    const headers = {
        'Content-Type': 'application/json'
    }

    let data = {
      instagram_id: igid,
      code
    }

    axios.post(url, data, { headers })
    .then(async (response) => {
      return resolve('ok')
    })
    .catch(error => {
      return resolve('Ended with error')
    })
  })
}
// sendNLQtoGHL('1231242354235234', 'goal_completed')
let sendOneMessage = (data) => { // {uid, conversationId, receiver_instagram_id}
    return new Promise(async (resolve, reject) => {
      let uid = data.uid
      let activeConversationReceiver = data.receiver_instagram_id
      console.log('sendOneMessage data', data)
      let instagram_username = await getMyUsername(uid)
      let conversationMessages = await getOneConversationMessagesB(uid, activeConversationReceiver)
      let conversationAnalysis = await analyzeInput(conversationMessages, instagram_username)
      await handleAnalysis(conversationAnalysis, uid, activeConversationReceiver)
      let aiResponse = await getChatResponse({messages: conversationMessages}, uid, instagram_username)
      console.log('aiResponse:', aiResponse.content && aiResponse.content[0] && aiResponse.content[0].text)

      // // Split long messages into shorter messages
      // let formattedMassages = []
      // if (aiResponse.content[0]) {
      //   let splitResponse = splitMessage(aiResponse.content[0].text)
      //   for (let i in splitResponse) {
      //     formattedMassages.push({
      //       content:[{type: 'text', text: splitResponse[i]}],
      //       role: 'assistant'
      //     })
      //   }
      // }

      // for (let f in formattedMassages) {
      //   if (formattedMassages[f].content[0]) {
      //     let delayTime = ((formattedMassages[f].content[0].text.length / 30) * 1000) * ((80 + Math.random() * 40)/100)
      //     status = await sendMessage({
      //       comment_id: false,
      //       sender_allen_uid: activeConversationUid,
      //       sender_converstion_id: conversationMessages.id,
      //       receiver_instagram_id: activeConversationReceiver,
      //       sender_instagram_username: instagram_username,
      //       message: formattedMassages[f]
      //     }, true, delayTime + 20000)
      //   }
      // }

      let status = await sendMessage({
        sender_allen_uid: uid,
        sender_converstion_id: conversationMessages ? conversationMessages.id : '-',
        receiver_instagram_id: activeConversationReceiver,
        sender_instagram_username: instagram_username,
        message: aiResponse
      }, true)

      return resolve('done')
  })
}
let handleMessageFromGHL = async (data) => {
  return new Promise(async (resolve, reject) => {
    let receiver_instagram_id = data.receiver_instagram_id
    let comment = data.comment
    let comment_id = data.comment_id || '-' // add this
    let message = data.message
    let user = data.user

    let uid
    let instagram_username

    if (user == 'richardyuallen') {
      uid = 'KilV9ZEBkMXjbZ5QVNbdpKxxVs23'
      instagram_username = 'richardyuallen'
    } else {
      uid = 'VZ4gFAgu2hfR1EFSuLnvzM7cihd2'
      instagram_username = 'richardyuzee'
    }

    let receiver_allen_id = uid
    let u = uid
    let activeConversationUid = uid
    let instagram_sender_id = receiver_instagram_id
    let c = receiver_instagram_id
    let activeConversationReceiver = receiver_instagram_id

    // // get sender username
    let senderUsername = await getInstagramUsernameById(receiver_allen_id, instagram_sender_id)

    if (message) {
      console.log('>> GHL Message from ' + senderUsername + ' (' + receiver_instagram_id + ') to ' + instagram_username)
      await addGHLLog(uid, instagram_username, receiver_instagram_id, senderUsername, 'NEW MESSAGE: ' + message)
    }

    let _noRespondList = await db.ref('noRespondList/' + (receiver_allen_id || 'f')).once('value')
    let noRespondList = _noRespondList && _noRespondList.val()
    let noRespondListArray = (noRespondList || '').split(',').map((v) => {
      return v.toLowerCase().trim()
    })

    // // if sender is in no-respond list, end
    if (noRespondListArray.indexOf(senderUsername) > -1) {
      return resolve('ok')
    }

    // check is existing conversation exists
    let __path = '/instagram_conversations_statuses/' + (receiver_allen_id || 'f') + '/' + instagram_sender_id + '/id'
    let _cid = await db.ref(__path).once('value')
    let cid = _cid.val()

    // update existing conversations
    if (cid) {
      await getOneConversationMessages(receiver_allen_id, cid, instagram_sender_id, 10)
    } else {
      await getConversations(receiver_allen_id)
      // create auto-respond tag
      let first_time_conversation_ref = 'autoRespondSettings/' + (receiver_allen_id || 'f') + '/' + (instagram_sender_id || 'g')
      await db.ref(first_time_conversation_ref).set(true)
    }

    // get settings
    let _auto_respond_settings = await db.ref('autoRespondSettings/' + receiver_allen_id + '/' + instagram_sender_id).once('value')
    let auto_respond_settings = _auto_respond_settings && _auto_respond_settings.val()
    let _master_switch = await db.ref('master_switch').once('value')
    let master_switch = _master_switch && _master_switch.val()
    let _sequenceStatus = await db.ref('sequences/' + receiver_allen_id + '/0/active').once('value')
    let sequenceStatus = _sequenceStatus && _sequenceStatus.val()

    // // get keyword triggers
    let _keywords = await db.ref('commentTriggerKeywords/' + (receiver_allen_id || 'f')).once('value')
    let keywords = _keywords && _keywords.val()
    let keywordsArray = (keywords || '').split(',').map((v) => {
      return v.toLowerCase().trim()
    })

    let aiResponse
    let status
    await addGHLLog(uid, instagram_username, receiver_instagram_id, senderUsername, `User auto-respond: ${auto_respond_settings},
      Customer master switch: ${sequenceStatus},
      App master switch: ${master_switch}
    `)

    if (auto_respond_settings && sequenceStatus && master_switch) {
      if (comment) { // I received a comment
        // sender's Instagram ID (other user)
        await addGHLLog(uid, instagram_username, receiver_instagram_id, senderUsername, `
          Received comment -> comment flow
        `)

        let ref = 'instagram_conversations_messages/'
                  + activeConversationUid
                  + '/' + activeConversationReceiver
        // get existing conversation messages
        let _conversationMessages = await db.ref(ref).once('value')
        let conversationMessages = _conversationMessages.val()

        // get my Instagram Username
        // let _instagram_username = await db.ref('instagram_details/' + activeConversationUid + '/username').once('value')
        // let instagram_username = _instagram_username.val()

        await addGHLLog(uid, instagram_username, receiver_instagram_id, senderUsername, `Conversation messages`, conversationMessages)

        aiResponse = await getChatResponse(conversationMessages || {messages: {data: [{message: ''}]}}, activeConversationUid, instagram_username, comment)

        await addGHLLog(uid, instagram_username, receiver_instagram_id, senderUsername, `Got chat response`, aiResponse)

        let splitResponse = splitMessage(aiResponse.content[0].text)
        await addGHLLog(uid, instagram_username, receiver_instagram_id, senderUsername, `Split messages`, splitResponse)
        let formattedMassages = []
        for (let i in splitResponse) {
          formattedMassages.push({
            content:[{type: 'text', text: splitResponse[i]}], // change to text: splitResponse[i]
            role: 'assistant'
          })
        }
        // await addGHLLog(uid, instagram_username, receiver_instagram_id, senderUsername, `
        //   Formatted messages: ${formattedMassages}
        // `)

        // handle comment
        // if comment is in keywords ,,,,
        let _text = message || '-'
        if (!keywords || (keywordsArray.indexOf(_text.toLowerCase()) > - 1)) {
          await sendCommentResponse({
            comment_id,
            sender_allen_uid: activeConversationUid,
            sender_converstion_id: false,
            receiver_instagram_id: activeConversationReceiver,
            sender_instagram_username: instagram_username
          })
          for (let f in formattedMassages) {
            if (formattedMassages[f].content[0]) {
              let delayTime = ((formattedMassages[f].content[0].text.length / 30) * 1000) * ((80 + Math.random() * 40)/100)
              status = await sendMessage({
                comment_id,
                sender_allen_uid: activeConversationUid,
                sender_converstion_id: false,
                receiver_instagram_id: activeConversationReceiver,
                sender_instagram_username: instagram_username,
                message: formattedMassages[f]
              }, true, delayTime)
            }
          }
        }
        await getConversations(activeConversationUid)
        return resolve('ok')
      } else { // I received a story reply or DM
        await addToMessageQueue({uid, receiver_instagram_id})
        // await sendOneMessage({uid, receiver_instagram_id})
        return resolve('ok')
      }
    }
  })
}
let addToMessageQueue = async (data) => {
  return new Promise(async (resolve, reject) => {
    let {uid, receiver_instagram_id, fromComment} = data
    let message_queue_ref = `/message_queue/${uid || 'f'}/${receiver_instagram_id || 'f'}`
    let time = (new Date()).getTime()
    await db.ref(message_queue_ref).set({
      time,
      count: 0,
      fromComment: fromComment || null
    })
    return resolve('ok')
  })
}
let shouldBeSent = async (uid, receiver) => {
  return new Promise(async (resolve, reject) => {
    let _auto_respond_settings = await db.ref('autoRespondSettings/' + (uid || 'f') + '/' + (receiver | 'f')).once('value')
    let auto_respond_settings = _auto_respond_settings && _auto_respond_settings.val()
    let auto_respond = auto_respond_settings !== false
    console.log('1', auto_respond)
    let _master_switch = await db.ref('master_switch').once('value')
    let master_switch = _master_switch && _master_switch.val()
    console.log('2', master_switch)
    let _sequenceStatus = await db.ref('sequences/' + uid + '/0/active').once('value')
    let sequenceStatus = _sequenceStatus && _sequenceStatus.val()
    console.log('3', sequenceStatus)
    return resolve(auto_respond && master_switch && sequenceStatus)
  })
}
let runMessageQueue = async () => {
  console.log('Running Message Queue')
  return new Promise(async (resolve, reject) => {
      let message_queue_ref = `/message_queue`
      let _message_queue = await db.ref(message_queue_ref).once('value')
      let message_queue = _message_queue.val() || {}
      for (let uid in message_queue) {
        let userConversations = message_queue[uid]
        for (let receiver in userConversations) {
          let followUpUser = userConversations[receiver]
          let now = (new Date()).getTime()
          let secondsSinceSent = (now - followUpUser.time)/1000
          if (followUpUser.count == 0) {
            console.log(`Waiting to send message to ${receiver}, ${secondsSinceSent} seconds since last message.'`)
            if (secondsSinceSent > 85) {
              let message_queue_ref__ = `/message_queue/${uid || 'f'}/${receiver || 'g'}`
              console.log('Sending message for this url entry:', message_queue_ref__)

              let _shouldBeSent = await shouldBeSent(uid, receiver)
              if (_shouldBeSent) {
                if (followUpUser.fromComment) {
                  let {
                    comment_id,
                    sender_allen_uid,
                    sender_converstion_id,
                    receiver_instagram_id,
                    sender_instagram_username
                  } = followUpUser.fromComment
                  await sendCommentResponse({
                    comment_id,
                    sender_allen_uid,
                    sender_converstion_id,
                    receiver_instagram_id,
                    sender_instagram_username
                  })
                }
                await sendOneMessage({uid, receiver_instagram_id: receiver})
                await waitTime(5)
                await db.ref(message_queue_ref__).set({
                  time: now,
                  count: 1
                })
              } else {
                await waitTime(5)
                await db.ref(message_queue_ref__).set({
                  time: now,
                  count: 4
                })
              }
            }
          }
        }
      }
  })
}
let sendFollowup = async (uid, igid, count) => {
  return new Promise(async (resolve, reject) => {
    let possibleResponses = [
      [
        `?😃`,
        `let me know so i can guide you to the right path 😊`,
        `let me know !`,
        `don't leave me hanging lol`,
        `Would Love to Hear from you When you get a chance 😊`
      ],
      [
        `saw my question above?`,
        `Just checking if you forgot to respond lol`,
        `hmm are my messages coming through?`,
        `are my messages getting lost in my inbox? lol`
      ],
      [
        `Heyo! I know it gets busy, just wanted to check if you forgot to reply 🙌`,
        `is this something youre still interested in?`,
        `Oh I see! Seems like you don't even have any time for fun things like our conversation here haha.`,
        `i know life gets in the way sometimes Would Love to Hear from you When you get a chance :)`,
        `Perhaps should I just leave you to it?`,
        `Is Everything okay on your side? 🤔`
      ]
    ]

    // check if should be sent
    let _shouldBeSent = await shouldBeSent(uid, igid)
    console.log('should be sent', uid, igid, _shouldBeSent)

    // send message
    if (_shouldBeSent) {
      let status = await sendMessage({
          sender_allen_uid: uid,
          sender_converstion_id: null,
          receiver_instagram_id: igid,
          sender_instagram_username: null,
          message: possibleResponses[count - 1][Math.floor(Math.random() * possibleResponses[count - 1].length)]
        }, false)
    }

    return resolve('ok')
  })
}
let runFollowupQueue = async () => {
  return new Promise(async (resolve, reject) => {
      let message_queue_ref = `/message_queue`
      let _message_queue = await db.ref(message_queue_ref).once('value')
      let message_queue = _message_queue.val() || {}
      for (let uid in message_queue) {
        let userConversations = message_queue[uid]
        for (let receiver in userConversations) {
          let followUpUser = userConversations[receiver]
          let now = (new Date()).getTime()
          let minutesSinceSent = ((now - followUpUser.time)/1000)/60
          if (followUpUser.count == 1) {
            if (minutesSinceSent > 30) {
              await waitTime(100)
              await sendFollowup(uid, receiver, 1)
              let message_queue_ref__ = `/message_queue/${uid || 'f'}/${receiver || 'g'}`
              await db.ref(message_queue_ref__).set({
                time: now,
                count: 2
              })
            }
          } else if (followUpUser.count == 2) {
            if (minutesSinceSent > 60) {
              await waitTime(100)
              await sendFollowup(uid, receiver, 2)
              let message_queue_ref__ = `/message_queue/${uid || 'f'}/${receiver || 'g'}`
              await db.ref(message_queue_ref__).set({
                time: now,
                count: 3
              })
            }
          } else {
            if (minutesSinceSent > 180) {
              await waitTime(100)
              await sendFollowup(uid, receiver, 3)
              let message_queue_ref__ = `/message_queue/${uid || 'f'}/${receiver || 'g'}`
              await db.ref(message_queue_ref__).set(null)
            }
          } 
        }
      }
  })
}
let sendMessage = async (data, t2, delay) => {
  return new Promise(async (resolve, reject) => {
    let sender_allen_uid = data.sender_allen_uid || 'f'
    let sender_instagram_username = data.sender_instagram_username || 'f'
    let receiver_instagram_id = data.receiver_instagram_id || 'f'
    let sender_converstion_id = data.sender_converstion_id || 'f'
    let comment_id = data.comment_id || false
    let message = data.message
    let isComment = data.isComment || false

    let uid = sender_allen_uid // v@b.com
    let _token = await db.ref('/instagram_tokens_long_lived/' + (uid || 'f')).once('value')
    let token = _token.val()
    const access_token = token.access_token

    const headers = {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
    };

    let _data
    if (comment_id) {
      _data = {
        message: JSON.stringify({ text: t2 ? (message.content[0] ? message.content[0].text : '') : message }),
        recipient: JSON.stringify({
          comment_id
        })
      }
    } else {
      _data = {
        message: JSON.stringify({ text: t2 ? (message.content[0] ? message.content[0].text : '') : message }),
        recipient: JSON.stringify({
          id: receiver_instagram_id
        })
      }
    }

    await waitTime(delay || 0)

    const url = `https://graph.instagram.com/v21.0/me/messages`;
    axios.post(url, _data, { headers })
    .then(async (response) => {
      let message_id = response.data.message_id
      return resolve(response.data)
    })
    .catch(error => {
      console.error('Error 4:', error.response && error.response.data && error.response.data.error && error.response.data.error.message)
      // console.error('comment_id', comment_id)
      // console.error('receiver_instagram_id', receiver_instagram_id)
      return resolve('Ended with error')
    });
  })
}
let getAIData = async (sender_allen_uid) => {
  return new Promise(async (resolve, reject) => {
    // get persona
    let persona_path = '/persona_data/' + (sender_allen_uid || 'f')
    let _persona = await db.ref(persona_path).once('value')
    let persona = _persona.val()
    let persona_detail = ''

    if (persona.persona_age) {
      persona_detail = persona_detail + 'Your age is: ' + (persona.persona_age || `you don't disclose your age`) + '. '
    }
    if (persona.persona_background) {
      persona_detail = persona_detail + 'Your background is: ' + persona.persona_background + '. '
    }
    if (persona.persona_company_description) {
      persona_detail = persona_detail + 'Your company description is: ' + persona.persona_company_description + '. '
    }
    if (persona.persona_company_email) {
      persona_detail = persona_detail + 'Your company email is: ' + persona.persona_company_email + '. '
    }
    if (persona.persona_company_name) {
      persona_detail = persona_detail + 'Your company name is: ' + persona.persona_company_name + '. '
    }
    if (persona.persona_company_phone) {
      persona_detail = persona_detail + 'Your company phone number is: ' + persona.persona_company_phone + '. '
    }
    if (persona.persona_company_website) {
      persona_detail = persona_detail + 'Your company website is: ' + persona.persona_company_website + '. '
    }
    if (persona.persona_expertise) {
      persona_detail = persona_detail + 'Your expertise is: ' + persona.persona_expertise + '. '
    }
    if (persona.persona_interests) {
      persona_detail = persona_detail + 'Your interests are: ' + persona.persona_interests + '. '
    }
    if (persona.persona_knowledge) {
      persona_detail = persona_detail + 'You have knowledge in: ' + persona.persona_knowledge + '. '
    }
    if (persona.persona_languages) {
      persona_detail = persona_detail + 'You speak these languages: ' + persona.persona_languages + '. '
    }
    if (persona.persona_name) {
      persona_detail = persona_detail + 'Your name is: ' + ((persona.persona_name || `you don't disclose your name`)) + '. '
    }
    if (persona.persona_occupation) {
      persona_detail = persona_detail + 'Your occupation is: ' + persona.persona_occupation + '. '
    }
    if (persona.persona_race) {
      persona_detail = persona_detail + 'Your race is: ' + persona.persona_race + '.'
    }

    // get sequences
    let sequencesPath = 'sequences/' + (sender_allen_uid || 'f')
    let _sequences = db.ref(sequencesPath).once('value')
    let sequences = _sequences.val && _sequences.val()

    // get memory
    let memory_path = '/memory/' + (sender_allen_uid || 'f')
    let _memory =  await db.ref(memory_path).once('value')
    let memory = _memory.val()

    // get corrections
    let corrections_path = '/conversationCorrectionsAfter/' + (sender_allen_uid || 'f')
    let _correction_conclusions_ =  await db.ref(corrections_path).once('value')
    let correction_conclusions_ = _correction_conclusions_.val() || {}
    let correction_conclusions = Object.keys(correction_conclusions_).map(v => {
      return correction_conclusions_[v][0].text
    })

    // get conversion type
    let conversion_type_path = '/converstionType/' + (sender_allen_uid || 'f')
    let _conversionType =  await db.ref(conversion_type_path).once('value')
    let CONVERSION_TYPE = _conversionType.val() || 'book-sales-calls'

    return resolve({
      persona_detail,
      sequences,
      memory,
      correction_conclusions,
      CONVERSION_TYPE
    })
  })
}
async function getPlaygroundChatResponse(message, existingConversation, sender_allen_uid) { // chat playground
      let promptData = await getAIData(sender_allen_uid)
      let {
        persona_detail,
        sequences,
        memory,
        correction_conclusions,
        CONVERSION_TYPE
      } = promptData

      let SCRIPT = memory ? (memory.script || false) : false
      let OBJECTIONS = memory ? (memory.objections || false) : false
      let currentGoals = `Task: Learn about the prospects' pains and goals. Goal: Book a sales call in the DMs, and uncover and handle any concerns and DMs along the way. Follow the script exactly.`
      if (CONVERSION_TYPE == 'book-sales-calls') {
        currentGoals = `Task: Learn about the prospects' pains and goals. Goal: Make a digital product sale in the DMs, and uncover and handle any concerns and DMs along the way. Follow the script exactly.`
      }

      let prompts = aiService.buildPrompts({
        MEMORY: memory,
        CORRECTIONS: correction_conclusions,
        PERSONA_DETAILS: persona_detail,
        COMPANY_DETAILS: ``,
        CONVERSATION_GUIDELINES: `Use short messages. Ask no more than one question at a time. Keep it light. Be friendly, professional. Take time to talk to the customer before getting straight into selling.`,
        GOALS: currentGoals,
        CHAT_HISTORY: '',
        USE_HAIKU3: true,
        SCRIPT,
        OBJECTIONS,
        CONVERSION_TYPE
      }, sender_allen_uid)
  let system_prompt = prompts.system_prompt
  try {
    let messages_ = [
      ...Object.keys(existingConversation).map((v, i) => {
        return {role: existingConversation[v].role, content: existingConversation[v].content}
      }),
      { role: 'user', content: message }
    ]
    const response = await getAnthropicResponse(system_prompt, messages_, sender_allen_uid, 'playground')
    return response.data
  } catch (error) {
    console.log('Error in getPlaygroundChatResponse')
    console.error(error.response);
  }
}
async function getChatResponse (existingConversation, sender_allen_uid, sender_instagram_username, commentMessage) {
  return new Promise(async (resolve, reject) => {
      let promptData = await getAIData(sender_allen_uid)
      let {
        persona_detail,
        sequences,
        memory,
        correction_conclusions,
        CONVERSION_TYPE
      } = promptData

      let SCRIPT = memory ? (memory.script || '') : ''
      let OBJECTIONS = memory ? (memory.objections || '') : ''
      let currentGoals = `Task: Learn about the prospects' pains and goals. Goal: Book a sales call in the DMs, and uncover and handle any concerns and DMs along the way. Follow the script exactly.`
      if (CONVERSION_TYPE == 'book-sales-calls') {
        currentGoals = `Task: Learn about the prospects' pains and goals. Goal: Make a digital product sale in the DMs, and uncover and handle any concerns and DMs along the way. Follow the script exactly.`
      }

      let prompts = aiService.buildPrompts({
        MEMORY: memory,
        CORRECTIONS: correction_conclusions,
        PERSONA_DETAILS: persona_detail,
        COMPANY_DETAILS: ``,
        CONVERSATION_GUIDELINES: `Use short messags. Ask no more than one question at a time. Keep it light. Be friendly, professional. Take time to talk to the customer before getting straight into selling.`,
        GOALS: currentGoals,
        CHAT_HISTORY: '',
        USE_HAIKU3: true,
        SCRIPT,
        OBJECTIONS,
        CONVERSION_TYPE
      }, sender_allen_uid)
      let system_prompt = prompts.system_prompt
      let existingMessages = existingConversation ? existingConversation.messages.data : []
    try {

      let messages_ = [
        ...existingMessages.reverse().map((v, i) => {
          return {
            role: (v.from && v.from.username) == sender_instagram_username ? 'assistant' : 'user',
            content: [
              {
                  type: 'text',
                  text: v.message || ''
              }
            ]
          }
        })
      ].filter((v) => {
        return v.content && v.content[0] && v.content[0] && (v.content[0].text !== '')
      })

      console.log('# messages_ in conversation:', (messages_ || []).length)

      if (commentMessage) {
        console.log('!!')
        messages_.push({
          role: 'user',
          content: [
            {
              type: 'text',
              text: commentMessage || ''
            }
          ]
        })
      }

      const response = await getAnthropicResponse(system_prompt, messages_, sender_allen_uid, 'user')
      return resolve(response.data)
    } catch (error) {
      console.log('Error in getChatResponse')
      console.error(error && error.response.data);
    }
  })
}
// landing page demo
async function getAIResponse (message, existingConversation, uid) {
    let prompts = aiService.buildPrompts({
      PERSONA_DETAILS: `Your name is Allen. You're 27. You run a successful social media company.`,
      COMPANY_DETAILS: `You work for Allen Systems. The company specializes in helping you make money on social media. Allen gives you full control of your chat setters with predictive AI.`,
      CONVERSATION_GUIDELINES: `Use short messages. Ask no more than one question at a time. Keep it light. Be friendly, professional. Take time to talk to the customer before getting straight into selling.`,
      GOALS: `Have the use sign up for the Allen app.`,
      CHAT_HISTORY: ''
    })
    let system_prompt = prompts.system_prompt
    // let user_prompt = prompts.user_prompt
    let messages_ = [
      ...Object.keys(existingConversation).map((v, i) => {
          return {role: existingConversation[v].role, content: existingConversation[v].content}
      }),      { role: 'user', content: message }
    ]
  try {
    const response = await getAnthropicResponse(system_prompt, messages_, uid, 'landing')
    return response.data
  } catch (error) {
    console.log('Error in getAIResponse')
    console.error(error.response);
  }
}
// revision chat
async function getRevisionChatResponse(instruction, messages, postCorrectionMessages, uid, newMessage, revisionId, override) {
      let persona_path = '/persona_data/' + (uid || 'f')
      let memory_path = '/memory/' + (uid || 'f')
      let _persona =  await db.ref(persona_path).once('value')
      let _memory =  await db.ref(memory_path).once('value')
      let persona = _persona.val()
      let memory = _memory.val()

      let persona_detail = ''

      // parse persona and add to prompt
      if (persona.persona_age) {
        persona_detail = persona_detail + 'Your age is: ' + persona.persona_age + '. '
      }
      if (persona.persona_background) {
        persona_detail = persona_detail + 'Your background is: ' + persona.persona_background + '. '
      }
      if (persona.persona_company_description) {
        persona_detail = persona_detail + 'Your company description is: ' + persona.persona_company_description + '. '
      }
      if (persona.persona_company_email) {
        persona_detail = persona_detail + 'Your company email is: ' + persona.persona_company_email + '. '
      }
      if (persona.persona_company_name) {
        persona_detail = persona_detail + 'Your company name is: ' + persona.persona_company_name + '. '
      }
      if (persona.persona_company_phone) {
        persona_detail = persona_detail + 'Your company phone number is: ' + persona.persona_company_phone + '. '
      }
      if (persona.persona_company_website) {
        persona_detail = persona_detail + 'Your company website is: ' + persona.persona_company_website + '. '
      }
      if (persona.persona_expertise) {
        persona_detail = persona_detail + 'Your expertise is: ' + persona.persona_expertise + '. '
      }
      if (persona.persona_interests) {
        persona_detail = persona_detail + 'Your interests are: ' + persona.persona_interests + '. '
      }
      if (persona.persona_knowledge) {
        persona_detail = persona_detail + 'You have knowledge in: ' + persona.persona_knowledge + '. '
      }
      if (persona.persona_languages) {
        persona_detail = persona_detail + 'You speak these languages: ' + persona.persona_languages + '. '
      }
      if (persona.persona_name) {
        persona_detail = persona_detail + 'Your name is: ' + persona.persona_name + '. '
      }
      if (persona.persona_occupation) {
        persona_detail = persona_detail + 'Your occupation is: ' + persona.persona_occupation + '. '
      }
      if (persona.persona_race) {
        persona_detail = persona_detail + 'Your race is: ' + persona.persona_race + '.'
      }

      // add files

      let currentGoals = `Improve your conversation.`


      let SCRIPT = memory ? (memory.script || '') : ''
      let OBJECTIONS = memory ? (memory.objections || '') : ''

      let conversion_type_path = '/converstionType/' + (uid || 'f')
      let _conversionType =  await db.ref(uid).once('value')
      let CONVERSION_TYPE = _conversionType.val() || 'book-sales-calls'


      let prompts = aiService.buildPrompts({
        MEMORY: memory,
        PERSONA_DETAILS: persona_detail,
        COMPANY_DETAILS: ``,
        CONVERSATION_GUIDELINES: `Use short messages. Ask no more than one question at a time. Keep it light. Be friendly, professional. Take time to talk to the customer before getting straight into selling.`,
        GOALS: currentGoals,
        CHAT_HISTORY: messages,
        CHAT_HISTORY_2: postCorrectionMessages,
        CORRECTION: true,
        USE_HAIKU3: true,
        SCRIPT,
        OBJECTIONS,
        CONVERSION_TYPE
      })
    let system_prompt = prompts.system_prompt
    // let user_prompt = prompts.user_prompt
  try {
    let messages_ = [
        ...Object.keys(postCorrectionMessages || []).map((v, i) => {
            return {role: postCorrectionMessages[v].role, content: [{type: postCorrectionMessages[v].type, text: postCorrectionMessages[v].text}]}
        }),
        { role: 'user', content: instruction },
        { role: 'user', content: [{
          type: 'text',
          text: override ? 'What did you learn from this?' : newMessage.toString()
        }] }
    ]

    const response = await getAnthropicResponse(system_prompt, messages_, uid, 'revision')
    let newAIMesssage = {...response.data.content[0], role: 'assistant'}
    let _msg = await db.ref('conversationCorrectionsAfter/' + uid + '/' + revisionId).once('value')
    let msg = _msg.val() || []
    msg.push(newAIMesssage)
    await db.ref('conversationCorrectionsAfter/' + uid + '/' + revisionId).update(msg)

    return response.data
  } catch (error) {
    console.error('error')
    console.error(error)
  }
}
// style/reverse chat (chat as setter)
async function getReverseChatResponse(message, existingConversation, style, uid) {
    // console.log('message, existingConversation', message, existingConversation)
    // console.log('test', [
    //         ...Object.keys(existingConversation).map((v, i) => {
    //             return {role: existingConversation[v].role, content: existingConversation[v].content}
    //         }),
    //         { role: 'user', content: message }
    //     ])

    let prompts = aiService.buildPrompts({
      PERSONA_DETAILS: `Your name is Max. You're 27. You run a successful social media company. You're social, professional, and value your time.`,
      COMPANY_DETAILS: `You have a company called Max Systems that is successfully scaled to $14k/month in revenue with a 95% margin.`,
      CONVERSATION_GUIDELINES: `You found "Allen Systems" that promises to help offload my DM work through AI. Look for a solution for my problems. You are looking for a solution to your problem and Allen might offer it. You are willing to pay a reasonable amount because your time is valuable. ${style}`,
      GOALS: `You are tired of having to deal with incoming DMs. If Allen offers a good solution to this, sign up. Otherwise, explain why you won't sign up.`,
      CHAT_HISTORY: ''
    })
    let system_prompt = prompts.system_prompt
    // let user_prompt = prompts.user_prompt
  try {

    let messages_ = [
      ...Object.keys(existingConversation).map((v, i) => {
        return {role: existingConversation[v].role, content: existingConversation[v].content}
      }),
      { role: 'user', content: message }
    ]

    const response = await getAnthropicResponse(system_prompt, messages_, uid, 'style')
    // save reasoning
    // let index1 = response.data.indexOf(`<response>`)
    // let index2 = response.data.indexOf(`</response>`)
    // let messageOnly = response.data.substring(index1, index2)
    // console.log('response.data')
    // console.log(response.data)
    return response.data
  } catch (error) {
    console.log('Error *')
    console.error(error.response);
  }
}
// helpers
let getOtherUsername = (messages) => {
  let fromId = messages[0].from.id
  let fromUsername = messages[0].from.username
  let toId = messages[0].to.data[0].id
  let toUsername = messages[0].to.data[0].username

  if (fromUsername == instagram_username) {
    return toUsername
  } else {
    return fromUsername
  }
}
let getOtherId = (messages) => {
  let fromId = messages[0].from.id
  let fromUsername = messages[0].from.username
  let toId = messages[0].to.data[0].id
  let toUsername = messages[0].to.data[0].username

  if (fromUsername == instagram_username) {
    return toId
  } else {
    return fromId
  }
}
let getMyUserId = (messages, instagram_username) => {
  let fromId = messages[0].from.id
  let fromUsername = messages[0].from.username
  let toId = messages[0].to.data[0].id
  let toUsername = messages[0].to.data[0].username

  if (fromUsername == instagram_username) {
    return fromId
  } else {
    return toId
  }
}
let getMyUserIdB = (messages, instagram_username) => {
  let fromId = messages.data[0].from.id
  let fromUsername = messages.data[0].from.username
  let toId = messages.data[0].to.data[0].id
  let toUsername = messages.data[0].to.data[0].username
  if (fromUsername == instagram_username) {
    return fromId
  } else {
    return toId
  }
}
let waitTime = async (t) => {
    return new Promise(resolve => {
        setTimeout(() => resolve(true), t);
    });
}
let splitMessage = (textMessage) => {
    let splitResponse = []
    let startWithString = textMessage
    let randomSplit = 280 + Math.floor(Math.random() * 180)
    if (startWithString.length > randomSplit) {
      let tempString = startWithString.substring(0, randomSplit)
      let periodIndex = tempString.lastIndexOf('. ')
      let qIndex = tempString.lastIndexOf('? ')
      let xIndex = tempString.lastIndexOf('! ')
      let _index = Math.max(periodIndex, qIndex, xIndex)
      if (_index > -1) {
        let pushString = startWithString.substring(0, _index + 1).trim()
        splitResponse.push(pushString)
        startWithString = startWithString.substring(_index + 1).trim()
      }
    }
    if (startWithString) {
      splitResponse.push(startWithString)
    }
    return splitResponse
}
// conversations
let getConversations = async (uid) => {
    return new Promise(async (resolve, reject) => {
      let _token = await db.ref('/instagram_tokens_long_lived/' + (uid || 'f')).once('value')
      let token = _token.val()
      let access_token = token.access_token
      let _instagramInfo = await db.ref('/instagram_details/' + (uid || 'f')).once('value')
      let instagramInfo = _instagramInfo.val() || {}
      let my_instagram_uid = instagramInfo.id2
      let my_instagram_username = instagramInfo.username
      const url = `https://graph.instagram.com/v21.0/me/conversations?fields=participants,messages{message,created_time,from,to}&access_token=` + access_token

      await axios.get(url, {}, {
          headers: {
              'Authorization': `Bearer ${access_token}`,
              'Content-Type': 'application/json'
          }
      })
      .then(async (response) => {
          let conversations = response.data ? (response.data.data || {}) : {}
          // console.log('conversations')
          // console.log(conversations)
          let getOtherIdB = (participants) => {
            if (participants[0].username == my_instagram_username) {
              return participants[1].id
            } else {
              return participants[0].id
            }
          }
          let getOtherUsernameB = (participants) => {
            if (participants[0].username == my_instagram_username) {
              return participants[1].username
            } else {
              return participants[0].username
            }
          }

          let conversationsObject = {}
          for (let c in conversations) {
            let conversation = conversations[c]
            if (conversation.participants.data.length > 1) {
              let other_user_instagram_id = getOtherIdB(conversation.participants.data)

              if (conversation.participants.data.length < 3) {
                conversationsObject[other_user_instagram_id] = conversation
              }
            }
          }

          let conversationsPath = '/instagram_conversations_messages/' + (uid || 'f') 
          await db.ref(conversationsPath).set(conversationsObject)

          let key = Object.keys((conversationsObject || {}))[0]
          let conversation = conversationsObject[key]
          let _messages = conversation.messages
          if (conversation && _messages) {
            let myInstagramUserId = getMyUserIdB(_messages, my_instagram_username) || 'failed_userid'
            await db.ref('/instagram_details/' + (uid|| 'f') + '/id2').set(myInstagramUserId)
          }

          let statusObject = {}
          let newUsernames = {}
          for (let c in conversations) {
            let conversation = conversations[c]
            if (conversation.participants.data.length > 1) {
              let other_user_instagram_id = getOtherIdB(conversation.participants.data)
              let other_user_instagram_username = getOtherUsernameB(conversation.participants.data)
              if (conversation.messages) {
                conversation.messages.data = [conversation.messages.data[0]]
                if (conversation.participants.data.length < 3) {
                  newUsernames[other_user_instagram_id] = other_user_instagram_username
                  statusObject[other_user_instagram_id] = {
                    ...conversation,
                    other_user_instagram_username
                  }
                }
              }
            }
          }
          let statusPath = '/instagram_conversations_statuses/' + (uid || 'f')
          await db.ref(statusPath).set(statusObject)
          let usernamePath = '/instagram_usernames'
          await db.ref(usernamePath).update(newUsernames)

          return resolve('ok')
      })
      .catch(async (error) => {
          console.error('Error 5:', error.response ? error.response.data : error.message)
          return reject(error)
      })
    })
}
let getKeywordsArray = async (uid) => {
  return new Promise(async (resolve, reject) => {
    let _keywords = await db.ref('commentTriggerKeywords/' + (uid || 'f')).once('value')
    let keywords = _keywords && _keywords.val()
    let keywordsArray = (keywords || '').split(',').map((v) => {
      return v.toLowerCase().trim()
    })
  })
}
let getAllenIds = async (instagram_receiver_id, instagram_sender_id) => {
  return new Promise(async (resolve, reject) => {
    let _receiver_allen_id = await db.ref('instagram_details').orderByChild('id2').equalTo(instagram_receiver_id).once('value')
    let _sender_allen_id = await db.ref('instagram_details').orderByChild('id2').equalTo(instagram_sender_id).once('value')
    let __receiver_allen_id = _receiver_allen_id.val() // 1
    let __sender_allen_id = _sender_allen_id.val() // 1
    let receiver_allen_id = Object.keys(__receiver_allen_id || {})[0]
    let sender_allen_id = Object.keys(__sender_allen_id || {})[0]
    return resolve({
      receiver_allen_id: receiver_allen_id || null,
      sender_allen_id: sender_allen_id || null
    })
  })
}
let noRespond = async (uid, senderUsername) => {
  return new Promise(async (resolve, reject) => {
    let _noRespondList = await db.ref('noRespondList/' + (uid || 'f')).once('value')
    let noRespondList = _noRespondList && _noRespondList.val()
    let noRespondListArray = (noRespondList || '').split(',').map((v) => {
      return v.toLowerCase().trim()
    })
    if (noRespondListArray.indexOf(senderUsername) > -1) {
      return resolve(true)
    }
    return resolve(false)
  })
}

let getMySavedInstagramDetails = async (uid) => {
  return new Promise(async (resolve, reject) => {
    let _instagramInfo = await db.ref('/instagram_details/' + (uid || 'f')).once('value')
    let instagramInfo = _instagramInfo.val() || {}
    return resolve(instagramInfo)
  })
}
let getConversationsUsers = async (uid, url, count, max_messages, pagination) => {
    return new Promise(async (resolve, reject) => {
      let access_token = await getAccessToken(uid)
      let my_instagram_details = await getMySavedInstagramDetails(uid)
      let my_instagram_username = my_instagram_details.username

      let _url = `https://graph.instagram.com/v21.0/me/conversations?fields=participants&limit=${max_messages || 100}&access_token=` + access_token

      await axios.get(url || _url, {}, {
          headers: {
              'Authorization': `Bearer ${access_token}`,
              'Content-Type': 'application/json'
          }
      })
      .then(async (response) => {
        if (url || pagination) {
          await waitTime(1000)
          // console.log('RUNNING', (count || 0))
          getConversationsUsers(uid, response.data.paging.next, (count || 0) + 1)
        }
        let conversations = response.data ? (response.data.data || {}) : {}
        let getOtherIdB = (participants) => {
          if (participants[0].username == my_instagram_username) {
            return participants[1].id
          } else {
            return participants[0].id
          }
        }
        let getOtherUsernameB = (participants) => {
          if (participants[0].username == my_instagram_username) {
            return participants[1].username
          } else {
            return participants[0].username
          }
        }

        let conversationsObject = {}
        for (let c in conversations) {
          let conversation = conversations[c]
          if (conversation.participants.data.length > 1) {
            let other_user_instagram_id = getOtherIdB(conversation.participants.data)

            if (conversation.participants.data.length < 3) {
              conversationsObject[other_user_instagram_id] = conversation
            }
          }
        }

        let newUsernames = {}
        for (let c in conversations) {
          let conversation = conversations[c]
          if (conversation.participants.data.length > 1) {
            let other_user_instagram_id = getOtherIdB(conversation.participants.data)
            let other_user_instagram_username = getOtherUsernameB(conversation.participants.data)
            // console.log('ID, Username', other_user_instagram_id, other_user_instagram_username)
            newUsernames[other_user_instagram_id] = {
              username: other_user_instagram_username,
              conversationId: conversation.id
            }
          }
        }
        let usernamePath = '/instagram_usernames_by_uid/' + (uid || 'f')
        await db.ref(usernamePath).update(newUsernames)
        return resolve('ok')
      })
      .catch(async (error) => {
          console.error('Error 6:', error.response ? error.response.data : error.message)
          return reject(error)
      })
    })
}
// getConversationsUsers('ia3iUX9laNhxjS8yp9Al73JRYxl2')
let getConversationMessages = async (uid, instagram_username) => {
  return new Promise(async (resolve, reject) => {
    // let uid = 'b8KqppppANRh7EXaYHFEo67ISJK2' // v@b.com
    let _token = await db.ref('/instagram_tokens_long_lived/' + (uid || 'f')).once('value')
    let token = _token.val()
    let access_token = token.access_token
    let _conversations = await db.ref('/instagram_conversations/' + (uid || 'f')).once('value')
    let conversations = _conversations.val()
    let totalConversations = Object.keys(conversations).length
    let count = 0
    for (let c in conversations) {
        let conversation = conversations[c]
        let conversationId = conversation.id
        let url = `https://graph.instagram.com/v21.0/`+ (conversationId || 'f') + `/messages?fields=message,created_time,from,to,attachments&access_token=` + access_token
        let data = {}

        setTimeout(() => {
            axios.get(url, data, {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(async (response) => {
                let conversationMessages = response.data ? (response.data.data || []) : []
                let conversationLength = conversationMessages.length
                let conversationsStatuses = {}
                let conversationsStatus = {}

                let now = (new Date()).getTime()
                conversationsStatus.last_update = conversationMessages[conversationLength - 1] ? (new Date(conversationMessages[conversationLength - 1].created_time || now)).getTime() : now
                conversationsStatus.message_peek = conversationMessages[conversationLength - 1] ? (conversationMessages[conversationLength - 1].message || '-') : '-'
                conversationsStatus.tags = {platform: 'Instagram'}
                conversationsStatus.new_messages_count = 1
                conversationsStatus.from_instagram_user_id = getOtherId(conversationMessages) || 'user_id_failed'
                conversationsStatus.from_instagram_username = getOtherUsername(conversationMessages) || 'username_failed'
                conversationsStatus.favorite = false
                conversationsStatuses.id = conversationsStatus

                if (conversationsStatus.from_instagram_user_id !== 'NaN') {
                }

                let myInstagramUserId = getMyUserId(conversationMessages) || 'failed_userid'

                await db.ref('/instagram_details/' + (uid|| 'f') + '/id2').set(myInstagramUserId)

                let conversationPath = '/instagram_conversations_messages/' 
                                      + (uid || 'f') + '/' + 
                                      + (conversationsStatus.from_instagram_user_id)
                let conversationUserPath = '/instagram_conversation_ids/' 
                                      + (uid || 'f') + '/' + 
                                      + (conversationsStatus.from_instagram_user_id)
                let statusPath = '/instagram_conversations_statuses/' 
                                      + (uid || 'f') + '/' + 
                                      + (conversationsStatus.from_instagram_user_id)
                await db.ref(conversationPath).set(conversationMessages)
                await db.ref(conversationUserPath).set(conversationId)
                await db.ref(statusPath).set(conversationsStatus)
                count = count + 1
                if (count >= totalConversations) {
                  return resolve('ok')
                }
            })
            .catch(async (error) => {
                count = count + 1
                if (count >= totalConversations) {
                  return resolve('ok')
                }
                console.error('Error 7:', error.response ? error.response.data : error.message);
            })
        }, count * 100)
    }
  })
}
let getOneConversationMessages = async (uid, conversationId, receiver_instagram_id, max_messages) => {
  return new Promise(async (resolve, reject) => {
    console.log('getOneConversationMessages')
    console.log('uid, conversationId, receiver_instagram_id, max_messages')
    console.log(uid, conversationId, receiver_instagram_id, max_messages)
    let _token = await db.ref('/instagram_tokens_long_lived/' + (uid || 'f')).once('value')
    let token = _token.val()
    let access_token = token.access_token
    let url
    // console.log('max_messages', max_messages)
    if (max_messages && (max_messages > 25)) {
      url = `https://graph.instagram.com/v22.0/`+ (conversationId || 'ggg') + `/messages?fields=message,created_time,from,to,attachments,participants&access_token=` + access_token + `&limit=` + max_messages
    } else {
      url = `https://graph.instagram.com/v22.0/`+ (conversationId || 'ggg') + `/messages?fields=message,created_time,from,to,attachments,participants&access_token=` + access_token
    }

    let data = {}

    axios.get(url, data, {
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(async (response) => {
        let conversationMessages = response.data
        if (conversationMessages) {
          let ref = '/instagram_conversations_messages/'
                    + (uid || 'f') + '/'
                    + (receiver_instagram_id || 'f')
                    + '/messages'
          await db.ref(ref).set(conversationMessages)
        }
        return resolve('ok')
    })
    .catch(error => {
        console.error('Error in getOneConversationMessages:', error.response ? error.response.data : error.message)
    })
  })
}
let getConversationId = async (uid, instagram_id) => {
  return new Promise(async (resolve, reject) => {
    let _conversationId = await db.ref(`/instagram_usernames_by_uid/${uid || 'f'}/${instagram_id || 'f'}/conversationId`).once('value')
    let conversationId = _conversationId.val()
    return resolve(conversationId)
  })
}
let getOneConversationMessagesB = async (uid, receiver_instagram_id, max_messages) => {
  return new Promise(async (resolve, reject) => {
    let access_token = await getAccessToken(uid)
    let conversationId = await getConversationId(uid, receiver_instagram_id)
    // console.log('getOneConversationMessagesB getConversationsUsers===>', uid, receiver_instagram_id, conversationId)
    let url = `https://graph.instagram.com/v22.0/${conversationId}?fields=messages{message,created_time,from,to}&access_token=${access_token}`
    axios.get(url)
    .then(async (response) => {
      return resolve(response && response.data && response.data.messages)
    })
    .catch(error => {
        console.error('Error in getOneConversationMessagesB')
        console.error(error.response ? error.response.data : error.message)
        return reject(error)
    })
  })
}
let getMessageContent = async (uid, messageId) => {
    let _token = await db.ref('/instagram_tokens_long_lived/' + (uid || 'f')).once('value')
    let token = _token.val()
    let access_token = token.access_token
    console.log('access_token', access_token)
    const url = `https://graph.instagram.com/v21.0/` + (messageId || 'f') + `/?fields=id,created_time,from,to,message&access_token=` + access_token

    const data = {
    };

    axios.get(url, data, {
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        return response.data
    })
    .catch(error => {
        console.error('Error 8:', error.response ? error.response.data : error.message);
        return error.response
    })
}
async function subscribeUserToEvents(igUserId, _access_token) {
  return new Promise(async (resolve, reject) => {
    let userId = igUserId || 'f'
    let access_token = _access_token || 'f'
    let LIST_OF_WEBHOOK_FIELDS = 'messages,comments'

    let tokenEndpoint = `https://graph.instagram.com/v21.0/` + userId + `/subscribed_apps`
    try {
        const response = await axios.post(tokenEndpoint, {}, {
          params: {
            subscribed_fields: LIST_OF_WEBHOOK_FIELDS,
            access_token: access_token
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })

        const data = response.data
        console.log('Subscribed to webhook:', data)
        return resolve('ok')
    } catch (error) {
        console.error('Error subscribing to webhook:', error.response)
        return reject(false)
    }
  })
}
async function exchangeCodeForToken(code) {
    const tokenEndpoint = `https://api.instagram.com/oauth/access_token`
    const params = new URLSearchParams()
    params.append('client_id', clientId)
    params.append('client_secret', clientSecret)
    params.append('grant_type', 'authorization_code')
    params.append('redirect_uri', redirectUri)
    params.append('code', code)
    try {
        const response = await axios.post(tokenEndpoint, params, {
          params: {
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'authorization_code',
            redirect_uri: redirectUri,
            code
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })

        const data = response.data;
        // console.log('Access Token Response:', data)
        return data
    } catch (error) {
        console.error('Error exchanging code for token:', error)
        return false
    }
}
async function exchangeShortLivedTokenForLongLivedToken(token) {
    let tokenEndpoint = `https://graph.instagram.com/access_token`
    tokenEndpoint = tokenEndpoint + '?clientId=' + clientId
    tokenEndpoint = tokenEndpoint + '&client_secret=' + clientSecret
    tokenEndpoint = tokenEndpoint + '&grant_type=' + 'ig_exchange_token'
    tokenEndpoint = tokenEndpoint + '&redirect_uri=' + redirectUri
    tokenEndpoint = tokenEndpoint + '&access_token=' + token.access_token

    const _data = {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'ig_exchange_token',
      redirect_uri: redirectUri,
      access_token: token.access_token
    }

    try {

      const response = await axios.get(tokenEndpoint, _data, {
          headers: {
              'Authorization': `Bearer ${token.access_token}`,
              'Content-Type': 'application/json'
          }
      })
      const data = response.data;
      return data
    } catch (error) {
      console.error('Error gettling long-lived token:', error)
      return false
    }
}
async function getMyInstagramInfo(uid) {
  return new Promise(async (resolve, reject) => {
    let access_token = await getAccessToken(uid)
    const url = `https://graph.instagram.com/v21.0/me/?fields=id,username&access_token=` + access_token

    const data = {
    }

    axios.get(url, data, {
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(async (response) => {
        // save Instagram Data
        await db.ref('/instagram_details/' + (uid || 'f')).set(response.data)
        return resolve(response.data)
    })
    .catch(error => {
        console.error('Error getting my Instagram info:', error.response ? error.response.data : error.message)
        return reject(false)
    })
  })
}
function parseWebhookNotification(data) {
  // Default result object in case we cannot identify the event
  const result = {
    entryOn: null,
    sender: null,
    receiver: null,
    message: null,
    type: null,
    messageId: null,
    conversationId: null
  };

  // Safely extract the first entry
  const entry = data ? (data.entry ? data.entry[0] : null) : null

  if (!entry) {
    return result;
  }

  // 1. Check if this is a direct messaging event
  if (entry.id) {
    result.entryOn = entry.id
  }

  if (entry.messaging) {
    const messaging = entry.messaging[0]
    // result.sender = messaging?.sender?.id ?? null;
    result.sender = messaging ? (messaging.sender ? messaging.sender.id : null) : null
    // result.receiver = messaging?.recipient?.id ?? null;
    result.receiver = messaging ? (messaging.recipient ? messaging.recipient.id : null) : null
    // result.message = messaging?.message?.text ?? null;
    result.message = messaging ? (messaging.message ? messaging.message.text : null) : null
    result.messageId = messaging ? (messaging.message ? messaging.message.mid : null) : null
    result.type = 'message'

    // If available, extract conversation ID
    result.conversationId = messaging ? (messaging.conversation ? messaging.conversation.id : null) : null

    return result
  }

  // 2. Otherwise, check if this is a 'changes' event (comment or story reply)
  if (entry.changes) {
    const change = entry.changes[0]
    const value = change ? change.value : null

    // 2a. Comment
    // If there's a comment_id, assume it's a comment
    if (value && value.comment_id) {
      // result.sender = value?.from?.id ?? null;
      result.sender = value ? (value.from ? value.from.id : null) : null
      // For comments, `post_id` could serve as the 'receiver' or target content
      // result.receiver = value?.post_id ?? null;
      result.receiver = value ? value.post_id : null
      // result.message = value?.message ?? null;
      result.message = value ? value.message : null
      result.type = 'comment'
      return result
    }

    // 2b. Story reply
    // If there's a story_id, assume it's a story reply
    if (value && value.story_id) {
      // result.sender = value?.from?.id ?? null;
      result.sender = value ? (value.from ? value.from.id : null) : null
      // Use story_id as the 'receiver' to identify which story was replied to
      // result.receiver = value?.story_id ?? null;
      result.receiver = value ? value.story_id : null
      // result.message = value?.message ?? null;
      result.message = value ? value.message : null
      result.type = 'story';
      return result;
    }
  }

  // If none of the above matched, return the default (mostly null) result
  return result;
}
async function verifyWebhook(header, body) {
  if (!header) return null;
  const [timestampStr, signatureStr] = header.split(",");
  const [, timestamp] = timestampStr.split("=");
  const [version, sentSignature] = signatureStr.split("=");

  const now = Math.round(Date.now() / 1000);

  if (
    Number.isNaN(parseInt(timestamp)) ||
    Math.abs(now - parseInt(timestamp)) > 300
  )
    return null; // 5 minutes buffer interval

  const stringToHash = timestamp + "." + body;

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    textEncoder.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signatureBuffer = await crypto.subtle.sign(
    { name: "HMAC", hash: "SHA-256" },
    cryptoKey,
    textEncoder.encode(stringToHash)
  );
  const signature = buf2hex(signatureBuffer);

  if (signature !== sentSignature && version !== "v1") return null;
}
let sendFollowUpMessage = async (data, count) => {
  return new Promise(async (resolve, reject) => {
    console.log('sendFollowUpMessage data =>>', data)
    let uid = data.uid || 'f'
    let activeConversationUid = uid
    let cid = data.cid
    let activeConversationReceiver = data.igid

    let possibleResponses = [
      [
        `hey did you see it?`
      ],
      [
        `bumping this^`
      ],
      [
        `you getting my messages?`
      ]
    ]
    let selectedResponseIndex = Math.floor(Math.random() * possibleResponses[count].length)
    let selectedResponse = possibleResponses[count][selectedResponseIndex] 

    let ref = 'instagram_conversations_messages/'
              + activeConversationUid
              + '/' + activeConversationReceiver
    let _conversationMessages = await db.ref(ref).once('value')
    let conversationMessages = _conversationMessages.val()
    let _instagram_username = await db.ref('instagram_details/' + activeConversationUid + '/username').once('value')
    let instagram_username = _instagram_username.val()

    let __path = '/instagram_conversations_statuses/' + (activeConversationUid || 'f') + '/' + activeConversationReceiver + '/id'
    // await getOneConversationMessages(uid, cid, activeConversationReceiver, 10)

    let aiResponse = {
      content: [{
        type: 'text',
        text: selectedResponse
      }],
      role: 'assistant'
    }

    let _auto_respond_settings = await db.ref('autoRespondSettings/' + activeConversationUid + '/' + activeConversationReceiver).once('value')
    let auto_respond_settings = _auto_respond_settings && _auto_respond_settings.val()
    let _master_switch = await db.ref('master_switch').once('value')
    let master_switch = _master_switch && _master_switch.val()
    let _sequenceStatus = await db.ref('sequences/' + activeConversationUid + '/0/active').once('value')
    let sequenceStatus = _sequenceStatus && _sequenceStatus.val()

    // console.log('aiResponse', aiResponse)

    console.log(`sending followup message from ${activeConversationUid} to ${activeConversationReceiver}`)

    if (auto_respond_settings && master_switch && sequenceStatus) {
      // setTimeout(async () => {
      let status = await sendMessage({
        sender_allen_uid: activeConversationUid,
        sender_converstion_id: conversationMessages.id,
        receiver_instagram_id: activeConversationReceiver,
        sender_instagram_username: instagram_username,
        // conversationId: conversationMessages.id
        // receiver_instagram_id: getOtherId(conversationObject),
        message: aiResponse
      }, true, 250)
      await getOneConversationMessages(activeConversationUid, cid, activeConversationReceiver, 10)
      let followup_tracking_ref = 'followup_tracking/' + (uid || 'f')
      await db.ref(followup_tracking_ref).push({
        time: (new Date()).getTime(),
        message: aiResponse,
        sender_allen_uid: activeConversationUid,
        sender_converstion_id: conversationMessages.id,
        receiver_instagram_id: activeConversationReceiver,
        sender_instagram_username: instagram_username
      })
    }

    // uid, conversationId, receiver_instagram_id, max_messages

    return resolve('done')
    // }, Math.floor(Math.random() * 1000 * 15)
  })
}
let getInstagramUsernameById = async (uid, instagramId) => {
  return new Promise(async (resolve, reject) => {
    let _token = await db.ref('/instagram_tokens_long_lived/' + (uid || 'f')).once('value')
    let token = _token.val()
    const access_token = token.access_token

    const url = `https://graph.instagram.com/v21.0/${instagramId}?fields=username&access_token=` + access_token

    await axios.get(url, {}, {
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(async (response) => {
      return resolve(response.data.username)
    })
    .catch(async (error) => {
        console.error('Error getting username:', error.response ? error.response.data : error.message)
        return reject(error)
    })
  })
}
let convertXmlToJson = (xmlString) => {
  return new Promise(async (resolve, reject) => {
    if (xmlString) {
      const parser = new xml2js.Parser({ explicitArray: false });
      return resolve(parser.parseStringPromise(xmlString))
    } else {
      return resolve({})
    }
  })
}
function extractResponse(str) {
  const startTag = `<response>`;
  const endTag = `</response>`;
  const startIndex = str.indexOf(startTag);
  
  // If the start tag isn't found, return an empty string (or you could return null)
  if (startIndex === -1) {
    return '';
  }
  
  const endIndex = str.indexOf(endTag, startIndex);
  
  // If the end tag isn't found, return an empty string (or you could return null)
  if (endIndex === -1) {
    return '';
  }
  
  // Return substring from start tag to the end of the end tag.
  return str.substring(startIndex, endIndex + endTag.length);
}
async function analyzeInput (conversationMessages, sender_instagram_username) {
  return new Promise(async (resolve, reject) => {
    try {

      let existingMessages = conversationMessages.messages.data
      let messages_ = [
        ...existingMessages.reverse().map((v, i) => {
          return {
            role: (v.from && v.from.username) == sender_instagram_username ? 'assistant' : 'user',
            content: [
              {
                  type: 'text',
                  text: v.message || '-'
              }
            ]
          }
        })
      ]

      let analysisPrompt = `# Analyze the current conversation. Answer the following questions in XML format:
        1. Is the user from one of the following countries. Countries: India, Phillipenes.
        2. The goal of the conversation is to book a call. Has the user booked a call?

        # Don't include anything else. Don't continue the conversation. Just answers to questions 1 and 2.
        # Answer in XML format as follows and with only this information:

        <response>
          <question1>[Answer to question 1 as true or false.]</question1>
          <question2>[Answer to question 2 as true or false.]</question2>
        </response>
      `
      let model = 'claude-3-5-haiku-20241022'
      const response = await axios.post(
        `https://api.anthropic.com/v1/messages`,
        {
          model,
          max_tokens: 2048,
          system: analysisPrompt,
          messages: messages_
        },
        {
          headers: {
            'x-api-key': process.env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
            'Content-Type': 'application/json'
          }
        }
      )
      let analysis = {
        isInExcludedCountry: false,
        goalCompleted: false
      }
      // console.log('ANALYSIS RESPONSE', response.data)
      let answerAsXML = response.data.content
      if (answerAsXML[0]) {
        let onlyXML = extractResponse(answerAsXML[0].text)
        let analysisJSON = await convertXmlToJson(onlyXML)
        if (analysisJSON.response && analysisJSON.response.question1 && (analysisJSON.response.question1 == 'true')) {
          analysis.isInExcludedCountry = true
        }
        if (analysisJSON.response && analysisJSON.response.question2 && (analysisJSON.response.question2 == 'true')) {
          analysis.goalCompleted = true
        }
      }
      return resolve(analysis)
    } catch (error) {
      return resolve(error)
    }
  })
}
let noRespondTo = async (receiver_allen_id, senderUsername) => {
  return new Promise(async (resolve, reject) => {
    let _noRespondList = await db.ref('noRespondList/' + (receiver_allen_id || 'f')).once('value')
    let noRespondList = _noRespondList && _noRespondList.val()
    let noRespondListArray = (noRespondList || '').split(',').map((v) => {
      return v.toLowerCase().trim()
    })
    if (noRespondListArray.indexOf(senderUsername) > -1) {
      return resolve(true)
    }
    return resolve(false)
  })
}
let shouldRespondToMessage = async (data) => {
  return new Promise(async (resolve, reject) => {
    let {body, receiver_allen_id, senderUsername, instagram_sender_id} = data
    console.log('data', data)
    if (body.entry[0].messaging[0].read) {
      return resolve(false)
    }
    let _mTest = body.entry[0].messaging[0]
    if (_mTest.message && _mTest.message.is_echo) {
      return resolve(false)
    }
    let noRespond = await noRespondTo(receiver_allen_id, senderUsername)
    if (noRespond) {
      return resolve(false)
    }
    // let _ghlAccounts = await db.ref('ghlAccounts').once('value')
    // let ghlAccounts = _ghlAccounts.val()
    // if (ghlAccounts.indexOf(receiver_allen_id) > -1) {
    //   return resolve(false)
    // }
    let __shouldBeSent = await shouldBeSent(receiver_allen_id, instagram_sender_id)
    if (!__shouldBeSent) {
      return resolve(false)
    }
    return resolve(true)
  })
}
let shouldRespondToComment = async (data) => {
  return new Promise(async (resolve, reject) => {
    let {body, entryOnId, instagram_sender_id, receiver_allen_id, senderUsername} = data

    // if I'm commenting to myself
    if (body.entry[0].changes[0].value.from.id == entryOnId) {
      return resolve(false)
    }
    // return if I'm commenting on my own post
    if (entryOnId == instagram_sender_id) {
      return resolve(false)
    }
    let noRespond = await noRespondTo(receiver_allen_id, senderUsername)
    if (noRespond) {
      return resolve(false)
    }
    let _keywords = await db.ref('commentTriggerKeywords/' + (receiver_allen_id || 'f')).once('value')
    let keywords = _keywords && _keywords.val()
    let keywordsArray = await getKeywordsArray(receiver_allen_id)
    let _text = body.entry[0].changes[0].value ? body.entry[0].changes[0].value.text : '-'
    if (!(!keywords || (keywordsArray.indexOf(_text.toLowerCase()) > - 1))) {
      return resolve(false)
    }
    return resolve(true)
  })
}
let checkAutoResponder = async (uid, igid) => {
  return new Promise(async (resolve, reject) => {
    let auto_responder_ref = 'autoRespondSettings/' + (uid || 'f') + '/' + (igid || 'g')
    let _autoResponderSettings = await db.ref(auto_responder_ref).once('value')
    let autoRespondSettings = _autoResponderSettings.val()
    if (autoRespondSettings === false) {
      // has been set false
    } else {
      await db.ref(auto_responder_ref).set(true)
    }
    return resolve('ok')
  })
}

// http://127.0.0.1:5001/mypage-25a24/us-central1/startGettingUsers
exports.startGettingUsers = functions.https.onRequest(async (data, context) => {
  await getConversationsUsers('VZ4gFAgu2hfR1EFSuLnvzM7cihd2', false, false, false, true)
})
exports.saveUsers = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    console.log('saveUsers body', req.body)
    let uid = req.body.uid
    let newUsernames = req.body.data
    let usernamePath = '/instagram_usernames_by_uid_/' + (uid || 'f')
    await db.ref(usernamePath).update(newUsernames)
    res.status(200).send('ok')
  })
})
exports.saveUsersB = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    console.log('saveUsers body', req.body)
    let uid = req.body.uid
    let newUsernames = req.body.data
    let usernamePath = '/instagram_usernames_by_uid_b/' + (uid || 'f')
    await db.ref(usernamePath).update(newUsernames)
    res.status(200).send('ok')
  })
})
async function processConversation (data) {
  return new Promise(async (resolve, reject) => {
    let {model, system, messages} = data
    try {
      const response = await axios.post(
        `https://api.anthropic.com/v1/messages`,
        {
          model,
          max_tokens: 2048,
          // max_tokens: 50,
          system,
          messages
        },
        {
          headers: {
            'x-api-key': process.env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
            'Content-Type': 'application/json'
          }
        }
      )
      return resolve(response)
    } catch (error) {
      return reject(error)
    }
  })
}

let processConversationSystemPrompt = `You are an AI assistant designed to analyze conversations and identify how likely a given contact is to require ChatSetter—a tool that automates managing direct messages (DMs), follow-ups, lead nurturing, and sales through social media (particularly Instagram). Your task is to parse provided conversation transcripts between a business/influencer and their contact, and assign a numerical score between 0 (least likely to benefit from ChatSetter) and 10 (most likely to benefit from ChatSetter).

When analyzing the conversation, consider these factors:

The contact's explicit need or expressed difficulty managing messages or leads.

Indicators of high volume messaging that could overwhelm manual handling.

The presence of missed or delayed responses from the influencer/business.

Any interest or mention of automation, time-saving, or efficient management of messages.

Conversations indicating potential for booking calls, selling digital products, or monetizing through DMs.

Assign scores based on these criteria:

0-2: Little or no indication of needing automation. Manual messaging appears sufficient.

3-5: Mild indications of messaging management struggles or minor inefficiencies.

6-8: Clear indications of significant messaging volume, missed opportunities, or expressed interest in solutions.

9-10: Strong explicit expressions of overwhelm, frequent missed messages, high volume leads, and strong indicators of significant benefit from automated messaging solutions like ChatSetter.

Output only the score and a concise justification (1-2 sentences) explaining why the score was given.
`

let _processConversationSystemPrompt = (messages) => {
  let prompt = processConversationSystemPrompt + `

  Analyze the conversation:
    ${messages}
  `

  return prompt
}

exports.determineBestLeads = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    console.log('determineBestLeads body', req.body)
    let uid = 'n9JzjvJTnMh7AtHxlGT2dq585Bu2'    
    let conversationPath = `instagram_usernames_by_uid_b/` + (uid || 'f')
    let _oneConversation = await db.ref(conversationPath).orderByChild('completed_').limitToFirst(1).once('value')
    let oneConversation = _oneConversation.val()
    let oneConversationKey = Object.keys(oneConversation)[0] || 'f'

    console.log('oneConversation')
    console.log(oneConversation)

    if (oneConversation[oneConversationKey].messages) {
      let otherUsername = oneConversation[oneConversationKey].username
      let fullConversation = (oneConversation[oneConversationKey].messages ? oneConversation[oneConversationKey].messages.data : [])
      let messages = [
        ...Object.keys(fullConversation).map((v, i) => {
            return {
              role: fullConversation[v].from.username == otherUsername ? 'assistant' : 'user',
              content: fullConversation[v].message || '-'
            }
        }).reverse(),
        {role: 'assistant', content: 'I will now rate the above conversation based on how likely you are to need ChatSetter.'}
      ]
      let messagesAsString = ''
      for (let m in messages) {
        let message = messages[m]
        messagesAsString = messagesAsString + `
          ${message.role}: ${message.content}
        `
      }
      let data = {
        system: _processConversationSystemPrompt(messagesAsString),
        model: 'claude-3-7-sonnet-20250219',
        messages
      }
      let response = await processConversation(data)
      let content = response.content
      console.log('Got response', response.data.content)
      let scoresPath = 'scores_/' + (uid || 'f') + '/' + oneConversationKey
      await db.ref(scoresPath).set(response.data)
      
      let conversationProcessedPath = conversationPath + '/' + oneConversationKey + '/completed_'
      await db.ref(conversationProcessedPath).set(true)
    } else {
      let conversationProcessedPath = conversationPath + '/' + oneConversationKey + '/completed_'
      await db.ref(conversationProcessedPath).set(true)
    }
    res.status(200).send('ok')
  })
})

// OAuth, Tokens, etc
exports.getCalendlyToken = functions.https.onCall((data, context) => {
    let uid = context.auth && context.auth.uid
    let code = data.code || false
    return new Promise(async (resolve, reject) => {
        let token = false
        if (code) {
            let tokenData = await calendlyService.exchangeCodeForTokenCalendly(code)
            if (tokenData) {
              await db.ref('/calendly_tokens/' + (uid || 'f')).set(tokenData)
              // let tokenData2 = await exchangeShortLivedTokenForLongLivedTokenCalendly(tokenData)
              // if (tokenData2) {
              // let now = (new Date()).getTime()
              // await db.ref('/calendly_tokens_long_lived/' + (uid || 'f')).set({...tokenData, last_refreshed: now})
                // let myInstagramInfo = await getMyInstagramInfo(uid, tokenData2)
                // let myInstagramUserId = myInstagramInfo.id
                // let myInstagramUsername = myInstagramInfo.username
                // this gets all conversations and sets /conversations and statuses
                // let _c = await getConversations(uid)
                // await getConversationMessages(uid, myInstagramUsername)
                // await subscribeUserToEvents(myInstagramUserId, tokenData2.access_token)
              token = true
              // }
            }
        }
        return resolve(token)
    })
})
exports.getInstagramToken = functions.https.onCall((data, context) => {
    let uid = context.auth && context.auth.uid
    let code = data.code || false
    return new Promise(async (resolve, reject) => {
        let token = false
        if (code) {
            let tokenData = await exchangeCodeForToken(code)
            if (tokenData) {
              await db.ref('/instagram_tokens/' + (uid || 'f')).set(tokenData)
              let tokenData2 = await exchangeShortLivedTokenForLongLivedToken(tokenData)
              if (tokenData2) {
                let now = (new Date()).getTime()
                await db.ref('/instagram_tokens_long_lived/' + (uid || 'f')).set({...tokenData2, last_refreshed: now})
                let myInstagramInfo = await getMyInstagramInfo(uid, tokenData2)
                let myInstagramUserId = myInstagramInfo.id
                let myInstagramUsername = myInstagramInfo.username
                // this gets all conversations and sets /conversations and statuses
                let _c = await getConversations(uid)
                // await getConversationMessages(uid, myInstagramUsername)
                await subscribeUserToEvents(myInstagramUserId, tokenData2.access_token)
                token = true
              }
            }
        }
        return resolve(token)
    })
})
exports.igredirect = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        console.log('req!', req)
        if (req.method === 'GET') {
            // response.send("Hello from the Allen API!")
            console.log('req.query!', req.query)
            const mode = req.query['hub.mode']
            const token = req.query['hub.verify_token']
            const challenge = req.query['hub.challenge']
            const VERIFY_TOKEN = 'abcd1234'

            // stuff

            // Check if mode and token are present and valid
            if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            // Token is verified, respond with the challenge token from the request
            console.log('WEBHOOK_VERIFIED')
                res.status(200).send(challenge)
            } else {
            // Respond with '403 Forbidden' if verify tokens do not match
                res.sendStatus(403)
            }
        }
    })
})

// App stuff
exports.storeCid = functions.https.onCall(async (data, context) => { // saving checkout session ID
  return new Promise(async (resolve, reject) => {
    let uid = context.auth && context.auth.uid
    let cid = data.cid
    console.log('storeCid data', data)
    let _existingCid = await db.ref('/cids/' + (uid || 'f')).once('value')
    let existingCid = _existingCid.val()
    if (!existingCid && cid) {
      await db.ref('/cids/' + (uid || 'f')).set({cid, exists: true})
    }
    return resolve({result: 'ok'})
  })
})
exports.addSequence = functions.https.onCall(async (data, context) => {
  return new Promise(async (resolve, reject) => {
    let uid = context.auth && context.auth.uid
    let _mySequences = await db.ref('/sequences/' + (uid || 'f')).once('value')
    let mySequences = _mySequences.val && _mySequences.val()
    let default_sequence_data = {
      active: false,
      name: 'My Sequence',
      id: Math.floor(Math.random() * 100000000000).toString(),
      tasks: [
        {
          task: 'Tell the prospect about my website',
          goal: 'The prospect should sign up for my mailing list'
        }
      ],
      triggers: [{
        type: 'dm_general',
        keywords: ''
      }]
    }
    if (mySequences) {
      mySequences.push(default_sequence_data)
    } else {
      mySequences = [default_sequence_data]
    }
    await db.ref('/sequences/' + (uid || 'f')).set(mySequences)
    return resolve({result: 'ok'})
  })
})
exports.searchForUser = functions.https.onCall(async (data, context) => {
  return new Promise(async (resolve, reject) => {
    let uid = context.auth && context.auth.uid
    let usernameString = data.userString.toLowerCase()
    let _user = await db.ref(`instagram_usernames_by_uid/${uid || 'f'}`).orderByChild('username').equalTo(usernameString).once('value')
    let user = _user.val()
    console.log('user', user)
    let userId = _user.key
    let userData = {
      userId: Object.keys(user)[0],
      val: user[Object.keys(user)[0]].conversationId,
      username: usernameString
    }
    if (userData) {
      return resolve(userData)
    } else {
      return resolve({result: 'ok'})
    }
  })
})
exports.addFile = functions.https.onCall(async (data, context) => {
  return new Promise(async (resolve, reject) => {
    let uid = context.auth && context.auth.uid
    let _myFiles = await db.ref('/memory/' + (uid || 'f') + '/files').once('value')
    let myFiles = _myFiles.val && _myFiles.val()
    let file_data = {
      name: data.name,
      url: data.url,
      active: true
    }
    if (myFiles) {
      myFiles.push(file_data)
    } else {
      myFiles = [file_data]
    }
    await db.ref('/memory/' + (uid || 'f') + '/files').set(myFiles)
    return resolve({result: 'ok'})
  })
})
exports.deleteSequence = functions.https.onCall(async (data, context) => {
  return new Promise(async (resolve, reject) => {
    let uid = context.auth && context.auth.uid
    let sequenceIndex = data.sequenceIndex
    let _mySequences = await db.ref('/sequences/' + (uid || 'f')).once('value')
    let mySequences = _mySequences.val && _mySequences.val()
    if (mySequences && (sequenceIndex || (sequenceIndex === 0))) {
      mySequences.splice(sequenceIndex, 1)
    }
    await db.ref('/sequences/' + (uid || 'f')).set(mySequences)
    return resolve({result: 'ok'})
  })
})
exports.deleteFile = functions.https.onCall(async (data, context) => {
  return new Promise(async (resolve, reject) => {
    let uid = context.auth && context.auth.uid
    let fileIndex = data.fileIndex
    let _myFiles = await db.ref('/memory/' + (uid || 'f') + '/files').once('value')
    let myFiles = _myFiles.val && _myFiles.val()
    if (myFiles && (fileIndex || (fileIndex === 0))) {
      myFiles.splice(fileIndex, 1)
    }
    await db.ref('/memory/' + (uid || 'f') + '/files').set(myFiles)
    return resolve({result: 'ok'})
  })
})
exports.getMoreMessages = functions.https.onCall(async (data, context) => {
  return new Promise(async (resolve, reject) => {
    let uid = (context.auth && context.auth.uid) || 'f'
    let receiverInstagramId = data.conversationId
    let cid = data.cid
    let number = data.number
    console.log('uid')
    console.log('receiverInstagramId')
    console.log('cid')
    console.log('number')
    console.log(uid)
    console.log(receiverInstagramId)
    console.log(cid)
    console.log(number)
    await getOneConversationMessages(uid, cid, receiverInstagramId, number ? number + 25 : 25)
    return resolve('ok')
  })
})
exports.sendInstagramMessage = functions.https.onCall(async (data, context) => {
    let uid = context.auth && context.auth.uid
    let conversationId = data.conversationId || 'f'
    let message = data.message
    let receiver_instagram_id = data.receiver_instagram_id

    let _conversationObject = await db.ref('instagram_conversations_messages/' + uid + '/' + conversationId).once('value')
    let conversationObject = _conversationObject.val()
    let _instagramDetails = await db.ref('instagram_details/' + (uid || 'f')).once('value')
    let instagramDetails = _instagramDetails.val()

    let sender_instagram_username = instagramDetails.username

    let getOtherId = (messages) => {
        for (let m in messages) {
            let message = messages[m]
            let from = message.from
            // let fromId = from.id
            if (from.username !== sender_instagram_username) {
                return from.id
            }
        }
    }

    let status = await sendMessage({
      sender_allen_uid: uid,
      sender_converstion_id: conversationId,
      // receiver_instagram_id: getOtherId(conversationObject),
      receiver_instagram_id,
      sender_instagram_username,
      message: message[0].text
    })
    
    return {result: 'ok', messageStatus: status}
})
exports.getMyRecentMessages = functions.https.onCall(async (data, context) => {
  return new Promise(async (resolve, reject) => {
    return resolve('ok!')
  })
})

// AI Functions
exports.sendOneMessageAsAdmin = functions.https.onCall(async (data, context) => {
  return new Promise(async (resolve, reject) => {
    console.log('sendOneMessageAsAdmin data', data)
    await sendOneMessage(data)
    return resolve('ok')
  })
})
exports.startFollowups = functions.https.onCall(async (data, context) => {
  return new Promise(async (resolve, reject) => {
    console.log('startFollowups data', data)
    let {uid, receiver_instagram_id} = data
    let now = (new Date()).getTime()
    await sendFollowup(uid, receiver_instagram_id, 1)
    let message_queue_ref__ = `/message_queue/${uid || 'f'}/${receiver_instagram_id || 'g'}`
    await db.ref(message_queue_ref__).set({
      time: now,
      count: 2
    })
    return resolve('ok')
  })
})
exports.sendInstagramMessageRevision = functions.https.onCall(async (data, context) => {
  return new Promise(async (resolve, reject) => {
    let uid = context.auth && context.auth.uid
    let revisionId = data.revisionId || 'f'
    let override = data.override
    let newMessage = data.message ? data.message[0] : ''

    console.log('data')
    console.log(data)
    // return resolve(false)

    let _correctionObject = await db.ref('conversationCorrections/' + uid + '/' + revisionId).once('value')
    let correctionObject = _correctionObject.val()
    let postCorrectionMessages = []

    if (!override) {
      let _postCorrectionMessages = await db.ref('conversationCorrectionsAfter/' + uid + '/' + revisionId).once('value')
      postCorrectionMessages = _postCorrectionMessages.val() || []
      postCorrectionMessages.push({role: 'user', type: 'text', text: newMessage.text})
      await db.ref('conversationCorrectionsAfter/' + uid + '/' + revisionId).update(postCorrectionMessages)
    }
    let instruction = correctionObject.correctionMessage
    let messages = correctionObject.messages ? (correctionObject.messages.data || []) : []

    let response = await getRevisionChatResponse(instruction, messages, postCorrectionMessages, uid, newMessage, revisionId, override)
    
    return resolve({result: 'ok', messageStatus: 'ok'}) // first one
  })
})
exports.sendDemoChatMessage = functions.https.onCall(async (data, context) => {
    let uid = context.auth && context.auth.uid
    let message = data.message
    let conversationId = data.demoConversationId || false
    let existingConversation = {}
    if (!conversationId) {
        conversationId = Math.floor(Math.random() * 10000000000000000000)
    } else {
        let _exstingConversation = await db.ref('/demo_ai_chats/' + (conversationId || 'f')).once('value')
        existingConversation = _exstingConversation.val()
    }
    let response = await getAIResponse(message, existingConversation, uid)
    let textMessage = response.content[0].text
    let formattedMessage = {
        content:[{type: 'text', text: message}],
        role: 'user'
    }
    let formattedResponse = response
    await db.ref('/demo_ai_chats/' + (conversationId || 'f')).push(formattedMessage)
    await db.ref('/demo_ai_chats/' + (conversationId || 'f')).push(formattedResponse)
    return {result: 'ok', conversationId}
})
exports.sendReverseChatMessage = functions.https.onCall(async (data, context) => {
    let uid = context.auth && context.auth.uid
    let conversationId = data.reverseAIChatID || false
    let message = data.message
    let style = data.style
    let existingConversation = {}
    if (!conversationId) {
        conversationId = Math.floor(Math.random() * 10000000000000000000)
    } else {
        let _exstingConversation = await db.ref('/reverse_ai_chats/' + (conversationId || 'f')).once('value')
        existingConversation = _exstingConversation.val()
    }
    let response = await getReverseChatResponse(message, existingConversation, style, uid)
    let textMessage = response.content[0].text
    let formattedMessage = {
        content:[{type: 'text', text: message}],
        role: 'user'
    }
    let formattedResponse = response
    await db.ref('/reverse_ai_chats/' + (conversationId || 'f')).push(formattedMessage)
    await db.ref('/reverse_ai_chats/' + (conversationId || 'f')).push(formattedResponse)

    return {result: 'ok', conversationId}
})
exports.sendPlaygroundChatMessage = functions.https.onCall(async (data, context) => {
    let uid = context.auth && context.auth.uid
    let message = data.message
    let conversationId = data.demoConversationId || false
    let existingConversation = {}
    if (!conversationId) {
        conversationId = Math.floor(Math.random() * 10000000000000000000)
    } else {
        let _exstingConversation = await db.ref('/playground_ai_chats/' + (conversationId || 'f')).once('value')
        existingConversation = _exstingConversation.val()
    }
    let response = await getPlaygroundChatResponse(message, existingConversation, uid)
    console.log('aiResponse2', response)
    let formattedMessage = {
        content:[{type: 'text', text: message}],
        role: 'user'
    }
    let formattedResponse = response

    let textMessage = response.content[0].text
    let splitResponse = splitMessage(textMessage)
    await db.ref('/playground_ai_chats/' + (conversationId || 'f')).push(formattedMessage)
    let formattedMessage0 = {
        content:[{type: 'text', text: splitResponse[0]}],
        role: 'assistant'
    }
    let formattedMessage1 = {
        content:[{type: 'text', text: splitResponse[1]}],
        role: 'assistant'
    }
    await db.ref('/playground_ai_chats/' + (conversationId || 'f')).push(formattedMessage0)
    if (splitResponse[1]) {
      await waitTime(100)
      await db.ref('/playground_ai_chats/' + (conversationId || 'f')).push(formattedMessage1)
    }

    return {result: 'ok', conversationId}
})

// Callbacks, webhooks
exports.ghlwebhook = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    let otherUserIGID = req.body.contact.attributionSource.mediumId
    let messageText = req.body.customData.message
    let commentText = req.body.customData.comment
    let commentId = req.body.customData.comment_id
    let user
    if (req.body.location.id == 'kRRq4dTswr9hGTfzlxPQ') {
      user = 'richardyuallen'
    } else {
      user = 'richardyuzee'
    }
    await handleMessageFromGHL({
      comment_id: commentId,
      receiver_instagram_id: otherUserIGID,
      comment: commentText,
      message: messageText,
      user: user
    })
    if (req.body.user) {
      res.status(200).send('OK')
    }
  })
})
exports.igcallback = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method === 'GET') {
      const mode = req.query['hub.mode']
      const token = req.query['hub.verify_token']
      const challenge = req.query['hub.challenge']
      const VERIFY_TOKEN = 'abcd1234'
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
          res.status(200).send(challenge)
      } else {
          res.sendStatus(403)
      }
    } else if (req.method === 'POST') {
      let body = req.body
      let isComment = body.entry[0].changes
      let isMessage = body.entry[0].messaging
      let notification = parseWebhookNotification(body)
      console.log('notification')
      console.log(notification)

      let entryOnId = notification.entryOn || 'f'
      if (isMessage) {
        let instagram_sender_id = notification.sender || 'g'
        let instagram_receiver_id = notification.receiver || 'g'
        if (entryOnId == instagram_receiver_id) {
          let allenIds = await getAllenIds(instagram_receiver_id, instagram_sender_id)
          let {receiver_allen_id, sender_allen_id} = allenIds
          await getConversationsUsers(receiver_allen_id, false, false, 10)
          await checkAutoResponder(receiver_allen_id, instagram_sender_id)
          console.log('allenIds', allenIds)
          let senderUsername = await getInstagramUsernameById(receiver_allen_id, instagram_sender_id)
          let _shouldRespondToMessage = await shouldRespondToMessage({body, receiver_allen_id, senderUsername, instagram_sender_id})
          if (_shouldRespondToMessage) {
            // await sendOneMessage({uid: receiver_allen_id, receiver_instagram_id: instagram_sender_id})
            await addToMessageQueue({uid: receiver_allen_id, receiver_instagram_id: instagram_sender_id})
          }
        }
      } else if (isComment) {
        let instagram_sender_id = body.entry[0].changes[0].value.from.id
        let instagram_receiver_id = notification.receiver || 'g'
        if (entryOnId == instagram_receiver_id) {
          let allenIds = await getAllenIds(instagram_receiver_id, instagram_sender_id)
          let {receiver_allen_id, sender_allen_id} = allenIds
          await getConversationsUsers(receiver_allen_id, false, false, 10)
          await checkAutoResponder(receiver_allen_id, instagram_sender_id)
          let comment_id = body.entry[0].changes[0].value.id
          let senderUsername = body.entry[0].changes[0].value.from.username
          let _shouldRespondToComment = await shouldRespondToComment({body, entryOnId, instagram_sender_id, receiver_allen_id, senderUsername})
          if (_shouldRespondToComment) {
            let myInstagramInfo = await getMyInstagramInfo(receiver_allen_id)
            let instagram_username = myInstagramInfo.username
            let _text = body.entry[0].changes[0].value ? body.entry[0].changes[0].value.text : '-'
            await addToMessageQueue({
              uid: receiver_allen_id,
              receiver_instagram_id: instagram_sender_id,
              fromComment: {
                comment_id: body.entry[0].changes[0].value.id.toString(),
                sender_allen_uid: receiver_allen_id,
                sender_converstion_id: false,
                receiver_instagram_id: instagram_receiver_id,
                sender_instagram_username: instagram_username
              }
            })
            // await sendOneMessage({uid: receiver_allen_id, receiver_instagram_id: instagram_sender_id})
          }
        }
      }

    }
    return res.status(200).send('OK')
  })
})
exports.calendlycallback = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        // if (req.method === 'GET') {
        //   const mode = req.query['hub.mode']
        //   const token = req.query['hub.verify_token']
        //   const challenge = req.query['hub.challenge']
        //   const VERIFY_TOKEN = 'abcd1234'
        //   if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        //       res.status(200).send(challenge)
        //   } else {
        //       res.sendStatus(403)
        //   }
        // } else if (req.method === 'POST') {
        //   let body = req.body
        //   let isComment = body.entry[0].changes
        //   let isMessage = body.entry[0].messaging
        // }
        res.status(200).send('OK')
        return
    })
})

// Queues
exports.runMessageQueue = functions.pubsub.schedule('every 2 minutes').onRun(async (context) => {
  runMessageQueue()
})
exports.runFollowupQueue = functions.pubsub.schedule('every 10 minutes').onRun(async (context) => {
  runFollowupQueue()
})