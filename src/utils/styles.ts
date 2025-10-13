export const parsePadding = (padding: string | number | 'none'): string => {
  if (padding === 'none') return '0'
  if (typeof padding === 'number') return `${padding}px`
  return padding
}

export const mergeStyles = (...styles: (Record<string, any> | string | undefined)[]): Record<string, any> => {
  const merged: Record<string, any> = {}
  
  styles.forEach(style => {
    if (!style) return
    
    if (typeof style === 'string') {
      style.split(';').forEach(rule => {
        const [key, value] = rule.split(':').map(s => s.trim())
        if (key && value) {
          const camelKey = key.replace(/-([a-z])/g, g => g[1].toUpperCase())
          merged[camelKey] = value
        }
      })
    } else {
      Object.assign(merged, style)
    }
  })
  
  return merged
}