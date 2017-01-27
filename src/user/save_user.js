const validateUser = require('./validate_user')
const validateCampaign = require('./validate_campaign')
const encodeUser = require('./encode_user')
const debug = require('debug')('user') // eslint-disable-line
const firebase = require('firebase')

// Initialize Firebase
firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
  storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
})

const firebasedb = firebase.database()

module.exports = function saveUser({ user, source }) {
  return new Promise((resolve, reject) => {
    // validate user data
    const invalid = validateUser(user)
    if (invalid) return reject(invalid)

    // validate campaign
    const campaign = validateCampaign(user.campaign)
    if (!campaign) return reject('user must have a campaign')

    // validate source
    if (!source) return reject('user must have a source')

    // encode data
    const userData = encodeUser({
      user,
      campaign,
      source,
    })

    debug(userData)

    // post private info to firebase
    const newContactKey = firebasedb.ref().child('contacts').push().key

    return firebasedb.ref(`contacts/${newContactKey}`).set({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      zip: userData.zip,
      topics: userData.topics,
      campaign: userData.campaign,
      source: userData.source,
    }).then(resolve, reject)

    // @todo
    /* @todo
    if (userData.zip && 1 === 2) {
      // post public info to firebase
      const firstname = userData.name.split(' ')[0]
      const newUser = firebasedb.ref(`publicInfo/${userData.campaign}`).push()
      return firebasedb.ref(`/publicInfo/zips/${userData.zip.toString()}`)
        .once('value').then((snapshot) => {
          debug('sending to firebase:', firstname)
          newUser.set({
            name: firstname,
            zip: userData.zip,
            lat: snapshot.val().LAT,
            long: snapshot.val().LNG,
          })
        })
    }
    */
  })
}
