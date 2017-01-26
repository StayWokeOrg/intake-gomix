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
  // build data object for POST to central
  const data = {
    name: user.name,
    email: user.email || null,
    phone: user.phone || null,
    zip: user.zip || null,
    topics: user.topics || [],
    campaign,
    source,
  }

  return data
}