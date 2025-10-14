export const parsePadding = (padding: string | number | 'none'): string => {
  if (padding === 'none') return '0'
  if (typeof padding === 'number') return `${padding}px`
  return padding
}

const toCamelCase = (str: string): string => 
  str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())

const parseStyleRule = (rule: string): [string, string] | null => {
  const [key, value] = rule.split(':').map(s => s.trim())
  if (!key || !value) return null
  return [toCamelCase(key), value]
}

const parseStringStyle = (style: string): Record<string, any> => {
  const result: Record<string, any> = {}
  
  style.split(';').forEach(rule => {
    const parsed = parseStyleRule(rule)
    if (parsed) {
      const [key, value] = parsed
      result[key] = value
    }
  })
  
  return result
}

export const mergeStyles = (
  ...styles: (Record<string, any> | string | undefined)[]
): Record<string, any> => {
  return styles.reduce<Record<string, any>>((merged, style) => {
    if (!style) return merged
    
    const parsed = typeof style === 'string' 
      ? parseStringStyle(style) 
      : style
    
    return { ...merged, ...parsed }
  }, {})
}