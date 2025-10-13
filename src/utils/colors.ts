export const isValidHex = (color: string): boolean => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)
}

export const isValidRgb = (color: string): boolean => {
  return /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/.test(color)
}

export const isValidRgba = (color: string): boolean => {
  return /^rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0|1|0?\.\d+)\s*\)$/.test(color)
}

export const isValidCssColor = (color: string): boolean => {
  const cssColors = [
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
  ]
  return cssColors.includes(color.toLowerCase())
}

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

export const addOpacity = (color: string, opacity: number): string => {
  if (isValidHex(color)) {
    const rgb = hexToRgb(color)
    if (rgb) {
      return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`
    }
  }
  
  if (isValidRgb(color)) {
    const match = color.match(/\d+/g)
    if (match) {
      return `rgba(${match[0]}, ${match[1]}, ${match[2]}, ${opacity})`
    }
  }
  
  return color
}