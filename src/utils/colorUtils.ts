export interface RGB {
  r: number
  g: number
  b: number
}

export interface HSL {
  h: number
  s: number
  l: number
}

export function hexToRgb(hex: string): RGB | null {
  hex = hex.replace('#', '')
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('')
  }
  if (hex.length === 6) {
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    
    if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
      return { r, g, b }
    }
  }
  
  return null
}

export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

export function getColorBrightness(color: string | RGB): number {
  let rgb: RGB | null = null
  
  if (typeof color === 'string') {
    rgb = hexToRgb(color)
  } else {
    rgb = color
  }
  if (!rgb) return 128
  return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
}

export function isLightColor(color: string | RGB, threshold: number = 128): boolean {
  return getColorBrightness(color) > threshold
}

export function getContrastingTextColor(backgroundColor: string | RGB, lightColor: string = '#ffffff', darkColor: string = '#000000'): string {
  return isLightColor(backgroundColor) ? darkColor : lightColor
}

export function lightenColor(hex: string, percent: number): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex
  
  const factor = 1 + percent / 100
  const r = Math.min(255, Math.round(rgb.r * factor))
  const g = Math.min(255, Math.round(rgb.g * factor))
  const b = Math.min(255, Math.round(rgb.b * factor))
  
  return rgbToHex(r, g, b)
}

export function darkenColor(hex: string, percent: number): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex
  
  const factor = 1 - percent / 100
  const r = Math.max(0, Math.round(rgb.r * factor))
  const g = Math.max(0, Math.round(rgb.g * factor))
  const b = Math.max(0, Math.round(rgb.b * factor))
  
  return rgbToHex(r, g, b)
}

export function createColorWithOpacity(color: string, opacity: number): string {
  if (CSS.supports('background-color', 'color-mix(in srgb, red 50%, transparent)')) {
    const opacityPercent = Math.round(opacity * 100)
    return `color-mix(in srgb, ${color} ${opacityPercent}%, transparent)`
  }
  
  const rgb = hexToRgb(color)
  if (rgb) {
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`
  }
  
  return color
}

export function generateColorPalette(baseColor: string): Record<string, string> {
  const palette: Record<string, string> = {
    50: lightenColor(baseColor, 45),
    100: lightenColor(baseColor, 35),
    200: lightenColor(baseColor, 25),
    300: lightenColor(baseColor, 15),
    400: lightenColor(baseColor, 5),
    500: baseColor,
    600: darkenColor(baseColor, 10),
    700: darkenColor(baseColor, 20),
    800: darkenColor(baseColor, 30),
    900: darkenColor(baseColor, 40),
  }
  
  return palette
}
