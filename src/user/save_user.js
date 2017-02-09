const validateUser = require('./validate_user')
const validateCampaign = require('./validate_campaign')
const encodeUser = require('./encode_user')
const zipToLatLong = require('../zip_to_lat_long')
const debug = require('debug')('user') // eslint-disable-line
const firebase = require('firebase')
const Promise = require('promise')

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

    // todo feels like this is not how promises are supposed to work;
    //      am I wrong? - matt
    firebasedb.ref(`contacts/${newContactKey}`).set({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      zip: userData.zip,
      topics: userData.topics,
      campaign: userData.campaign,
      source: userData.source,
      created_at: new Date().toISOString(),
    }).then(() => {
      if (! userData.zip) {
        debug('no zip')
        resolve()
      }

      zipToLatLong(userData.zip).then((latLong) => {
        if (! latLong) resolve()
          
        const firstname = userData.name.split(' ')[0]
        const newContactPublicKey = firebasedb.ref().child('contactsPublic').child(userData.campaign).push().key

        debug('sending to firebase:', firstname)
        debug(latLong)

        firebasedb.ref(`contactsPublic/${userData.campaign}/${newContactKey}`).set({
          name: firstname,
          zip: userData.zip,
          lat: latLong.LAT,
          long: latLong.LNG,
        }).then(resolve, reject)
      }, (that) => {
        // todo handle error
        debug('error in zip lat long')
        reject()
      })
    }, (reason) => {
      debug('error', reason)
      reject(reason)
    })
  })
}
