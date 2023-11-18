import { Dimensions } from 'react-native'

const { width } = Dimensions.get('window')
let rem = 16

if (width >= 1024) {
  rem = 40
} else if (width >= 768) {
  rem = 30
} else if (width >= 600) {
  rem = 24
} else if (width > 414) {
  rem = 18
}

const remValue = {
  $rem: rem
}

export default remValue
