const debug = require('debug')('user') // eslint-disable-line
const firebase = require('firebase')
const Promise = require('promise')

// Initialize Firebase
const app = firebase.initializeApp({
  apiKey: 'AIzaSyCNINGHzxjzpEnw01681nXBniWqX9IklDA',
  authDomain: `zip-to-lat-long.firebaseapp.com`,
  databaseURL: `https://zip-to-lat-long.firebaseio.com`,
  storageBucket: `zip-to-lat-long.appspot.com`,
  messagingSenderId: '294227894166',
}, 'zip-to-lat-long')

const firebasedb = firebase.database(app)

/**
 * zipToLatLong - get a latitude and longitude given a zip code
 *
 * @param  {string} zip code
 * @return {object}
 */
module.exports = function zipToLatLong(zip) {
  return new Promise((resolve, reject) => {
    firebasedb.ref(`zips/${zip}`)
      .once('value')
      .then(resolve, reject)

    return 'abc'
  })
}
