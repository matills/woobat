export const getInitials = (text: string): string => {
  if (!text) return ''
  
  const words = text.trim().split(/\s+/)
  
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase()
  }
  
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase()
}

export const parseSize = (size: string | number): string => {
  if (typeof size === 'number') return `${size}px`
  return size
}

export const isPresetSize = (size: any): size is 'xs' | 'sm' | 'md' | 'lg' | 'xl' => {
  return ['xs', 'sm', 'md', 'lg', 'xl'].includes(size)
}