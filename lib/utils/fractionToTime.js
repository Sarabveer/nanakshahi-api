const { general: { clockFromMoment } } = require( '../calendrica' )

/**
 * Convert Day Fraction to 12-Hour Time
 * @param {!number} tee Date to Convert
 * @return {string} Time
 * @example fractionToTime( .064 )
 * @private
 */
module.exports = tee => {
  // eslint-disable-next-line prefer-const
  let { hour, minute, second } = clockFromMoment( tee )
  // Round Minute up if seconds are over 30
  minute = second >= 30 ? ( minute + 1 ) : minute
  if ( minute === 60 ) {
    minute = 0
    hour += 1
  }
  let period = 'AM'
  if ( hour >= 12 ) {
    period = 'PM'
    hour -= 12
  }
  hour = hour === 0 ? 12 : hour
  return `${hour}:${minute < 10 ? `0${minute}` : minute} ${period}`
}
