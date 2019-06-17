const suncalc = require( 'suncalc' )
const { toUnicodeNum } = require( './utils' )
const { pakshName, tithiName } = require( './consts' )

const phases = [
  { emoji: '🌑', name: 'New Moon' },
  { emoji: '🌒', name: 'Waxing Crescent' },
  { emoji: '🌓', name: 'First Quarter' },
  { emoji: '🌔', name: 'Waxing Gibbous' },
  { emoji: '🌕', name: 'Full Moon' },
  { emoji: '🌖', name: 'Waning Gibbous' },
  { emoji: '🌗', name: 'Last Quarter' },
  { emoji: '🌘', name: 'Waning Crescent' },
  { emoji: '🌑', name: 'New Moon' },
]

/**
 * Get Tithi and other Moon/Lunar Info
 * @param {Object} date JavaScript Date() Object
 * @return {Object} Tithi and Moon Info
 * @example getTithi( new Date() )
 */
function getTithi( date ) {
  // Get Moon Phase and Illumination
  const { phase, fraction } = suncalc.getMoonIllumination( date )

  // Get Tithi, Paksh, and Tithi Name
  const rawTithi = phase * 30
  let tithiDay = Math.trunc( rawTithi ) + 1
  let paksh
  if ( tithiDay > 15 ) {
    paksh = pakshName.vadi
    tithiDay -= 15
  } else {
    paksh = pakshName.sudi
  }

  let tithi
  if ( tithiDay === 15 && paksh.en === 'Vadi' ) {
    tithi = tithiName[ 15 ] // eslint-disable-line prefer-destructuring
  } else {
    tithi = tithiName[ tithiDay - 1 ]
  }

  // Create Return Object
  const calculatedTithi = {
    tithiDay: {
      pa: toUnicodeNum( tithiDay ),
      en: tithiDay,
    },
    paksh,
    tithiName: tithi,
    tithiFraction: rawTithi % 1,
    phase: phases[ Math.round( phase * 8 ) ],
    moonIllumination: fraction,
  }

  return calculatedTithi
}

module.exports = getTithi
