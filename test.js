/* eslint-disable no-console */
const n = require( './index' )

const date = new Date()

console.log( n.getNanakshahiDate( date ) )
console.log( n.getDateFromNanakshahi( 550, 10, 23 ) )
console.log( n.getHolidaysForDay( date ) )
console.log( n.getHolidaysForMonth( 1 ) )
console.log( n.findMovableHoliday( 'gurunanak' ) )
