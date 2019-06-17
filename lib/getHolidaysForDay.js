const getNanakshahiDate = require( './getNanakshahiDate' )
const getMovableHoliday = require( './getMovableHoliday' )
const { holidays } = require( './consts' )

/**
 * Returns all Gurpurabs and Holidays for a Date
 * @param {Object} gregorianDate JavaScript Date() Object
 * @return {Array} Holidays for the day with Date and name in English and Punjabi
 * @example getHolidaysForDay( new Date() )
 */
module.exports = gregorianDate => {
  // Get Gregorian Date
  const gregorianYear = gregorianDate.getFullYear()
  const gregorianMonth = gregorianDate.getMonth() + 1
  const gregorianDay = gregorianDate.getDate()

  // Get Date Info
  const nanakshahi = getNanakshahiDate( gregorianDate )
  const { month, date } = nanakshahi.englishDate

  // Get Fesitval date for specific Nanakshahi Month
  const calendarDates = holidays[ month ]

  // Check if there is Fesitval on Date
  let holidaysList = []
  calendarDates.every( value => {
    if ( value.date === date ) {
      holidaysList = value.holidays
      return false
    }
    return true
  } )

  // Get Movable Holidays
  let movableDate
  let movableMonth
  let movableDay
  const movableHolidays = [ 'ravidaas', 'holla', 'kabeer', 'bandishhorr', 'naamdev', 'gurunanak' ]
  movableHolidays.every( value => {
    movableDate = getMovableHoliday( value, gregorianYear )
    movableMonth = movableDate.gregorianDate.getMonth() + 1
    movableDay = movableDate.gregorianDate.getDate()
    if ( movableMonth === gregorianMonth && movableDay === gregorianDay ) {
      holidaysList.push( movableDate.name )
      return false
    }
    return true
  } )

  return holidaysList
}
