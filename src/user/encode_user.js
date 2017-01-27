const debug = require('debug')('user') // eslint-disable-line

/**
 * encodeUser - encode user data before saving
 *
 * @param  {object} user user object
 * @param  {string} campaign
 * @param  {string} source web/sms
 * @return {Promise}
 */
module.exports = function encodeUser({ user, campaign, source }) {
  // make sure empty and single still are arrays
  let topics = user.topics || []
  topics = (topics.constructor === Array) ? topics : [topics]

  // build data object for POST to central
  const data = {
    name: user.name,
    email: user.email || null,
    phone: user.phone || null,
    zip: user.zip || null,
    topics,
    campaign,
    source,
  }

  return data
}
