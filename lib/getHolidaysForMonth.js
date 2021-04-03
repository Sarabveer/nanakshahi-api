const findMovableHoliday = require( './findMovableHoliday' )
const getDateFromNanakshahi = require( './getDateFromNanakshahi' )
const getNanakshahiDate = require( './getNanakshahiDate' )
const { holidays, months } = require( './consts' )
const { leapYear, toGurmukhiNum } = require( './utils' )

/**
 * Returns all Gurpurabs and Holidays for a Nanakshahi Month
 * @param {!number} month Nanakshahi Month, 1-12
 * @param {!number} [year] Nanakshahi Year. Default is current Nanakshahi Year.
 * @return {Object} Holidays for the month with Date and name in English and Punjabi
 * @example getHolidaysForMonth( 1 )
 */
function getHolidaysForMonth( month, year = getNanakshahiDate().englishDate.year ) {
  // Get Fesitval dates for specific Nanakshahi Month
  const calendarDates = holidays[ month ]

  // Go though list and add dates
  const holidaysList = []
  calendarDates.forEach( value => {
    const nanakshahiDate = getDateFromNanakshahi( year, month, value.date )
    holidaysList.push( {
      date: {
        gregorianDate: nanakshahiDate.gregorianDate,
        nanakshahiDate: {
          englishDate: {
            date: nanakshahiDate.englishDate.date,
            day: nanakshahiDate.englishDate.day,
          },
          punjabiDate: {
            date: nanakshahiDate.punjabiDate.date,
            day: nanakshahiDate.punjabiDate.day,
          },
        },
      },
      holidays: value.holidays,
    } )
  } )

  // Length of Nanakshahi Months
  const monthLength = [
    31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30,
    leapYear( year + 1 ) ? 31 : 30, // Phagun Leap Check
  ]

  // Check all moveable holidays fall in Nanakshahi month
  const startMonth = getDateFromNanakshahi( year, month, 1 ).gregorianDate
  const movableHolidays = [ 'ravidaas', 'holla', 'kabeer', 'bandishhorr', 'naamdev', 'gurunanak' ]
  movableHolidays.forEach( value => {
    const { gregorianDate, name } = findMovableHoliday( value, startMonth.getFullYear() )
    const diffDays = ( gregorianDate.getTime() - startMonth.getTime() ) / ( 1000 * 60 * 60 * 24 )
    if ( diffDays < monthLength[ month - 1 ] && diffDays >= 0 ) {
      const { englishDate, punjabiDate } = getNanakshahiDate( gregorianDate )
      holidaysList.push( {
        date: {
          gregorianDate,
          nanakshahiDate: {
            englishDate: {
              date: englishDate.date,
              day: englishDate.day,
            },
            punjabiDate: {
              date: punjabiDate.date,
              day: punjabiDate.day,
            },
          },
        },
        holidays: [ name ],
      } )
    }
  } )

  // Sort holidays based on Nanakshahi Date
  holidaysList.sort( ( a, b ) => (
    a.date.nanakshahiDate.englishDate.date - b.date.nanakshahiDate.englishDate.date
  ) )

  // Add month metadata
  const nanakshahiMonth = {
    englishMonth: {
      month,
      monthName: months[ month - 1 ].en,
      year,
    },
    punjabiMonth: {
      month: toGurmukhiNum( month ),
      monthName: months[ month - 1 ].pa,
      year: toGurmukhiNum( year ),
    },
  }

  return {
    nanakshahiMonth,
    holidays: holidaysList,
  }
}

module.exports = getHolidaysForMonth
