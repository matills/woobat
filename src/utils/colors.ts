const HEX_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
const RGB_REGEX = /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/
const RGBA_REGEX = /^rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0|1|0?\.\d+)\s*\)$/

const CSS_COLORS = new Set([
  'transparent', 'currentcolor', 'inherit', 'initial', 'unset',
  'black', 'silver', 'gray', 'white', 'maroon', 'red', 'purple',
  'fuchsia', 'green', 'lime', 'olive', 'yellow', 'navy', 'blue',
  'teal', 'aqua', 'orange', 'aliceblue', 'antiquewhite', 'aquamarine',
  'azure', 'beige', 'bisque', 'blanchedalmond', 'blueviolet', 'brown',
  'burlywood', 'cadetblue', 'chartreuse', 'chocolate', 'coral',
  'cornflowerblue', 'cornsilk', 'crimson', 'cyan', 'darkblue',
  'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgreen', 'darkgrey',
  'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange',
  'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue',
  'darkslategray', 'darkslategrey', 'darkturquoise', 'darkviolet',
  'deeppink', 'deepskyblue', 'dimgray', 'dimgrey', 'dodgerblue',
  'firebrick', 'floralwhite', 'forestgreen', 'gainsboro', 'ghostwhite',
  'gold', 'goldenrod', 'greenyellow', 'grey', 'honeydew', 'hotpink',
  'indianred', 'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush',
  'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan',
  'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightgrey',
  'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue',
  'lightslategray', 'lightslategrey', 'lightsteelblue', 'lightyellow',
  'limegreen', 'linen', 'magenta', 'mediumaquamarine', 'mediumblue',
  'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue',
  'mediumspringgreen', 'mediumturquoise', 'mediumvioletred',
  'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite',
  'oldlace', 'olivedrab', 'orangered', 'orchid', 'palegoldenrod',
  'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip',
  'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'rebeccapurple',
  'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown',
  'seagreen', 'seashell', 'sienna', 'skyblue', 'slateblue', 'slategray',
  'slategrey', 'snow', 'springgreen', 'steelblue', 'tan', 'thistle',
  'tomato', 'turquoise', 'violet', 'wheat', 'whitesmoke', 'yellowgreen'
])

export const isValidHex = (color: string): boolean => HEX_REGEX.test(color)

export const isValidRgb = (color: string): boolean => RGB_REGEX.test(color)

export const isValidRgba = (color: string): boolean => RGBA_REGEX.test(color)

export const isValidCssColor = (color: string): boolean => 
  CSS_COLORS.has(color.toLowerCase())

export const isValidColor = (color: string): boolean => {
  if (!color) return false
  return isValidHex(color) || 
         isValidRgb(color) || 
         isValidRgba(color) || 
         isValidCssColor(color)
}

export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  if (!isValidHex(hex)) return null
  
  let cleanHex = hex.replace('#', '')
  
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(char => char + char).join('')
  }
  
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

export const rgbToRgba = (rgb: string, opacity: number): string => {
  const match = rgb.match(/\d+/g)
  if (!match || match.length < 3) return rgb
  return `rgba(${match[0]}, ${match[1]}, ${match[2]}, ${opacity})`
}

export const addOpacity = (color: string, opacity: number): string => {
  if (isValidHex(color)) {
    const rgb = hexToRgb(color)
    return rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})` : color
  }
  
  if (isValidRgb(color)) {
    return rgbToRgba(color, opacity)
  }
  
  return color
}