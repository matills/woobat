export interface IconLoaderOptions {
  fallbackIcon?: string
  warnOnMissing?: boolean
}

export interface IconInfo {
  component: any
  isLucide: boolean
  name: string
}

class IconLoader {
  private static instance: IconLoader
  private lucideIcons: any = null
  private loadPromise: Promise<any> | null = null
  private iconCache = new Map<string, IconInfo>()
  private options: IconLoaderOptions

  constructor(options: IconLoaderOptions = {}) {
    this.options = {
      fallbackIcon: 'AlertCircle',
      warnOnMissing: true,
      ...options
    }
  }

  static getInstance(options?: IconLoaderOptions): IconLoader {
    if (!IconLoader.instance) {
      IconLoader.instance = new IconLoader(options)
    }
    return IconLoader.instance
  }

  async loadLucideIcons(): Promise<any> {
    if (this.lucideIcons !== null) {
      return this.lucideIcons
    }

    if (this.loadPromise) {
      return this.loadPromise
    }

    this.loadPromise = import('lucide-vue-next')
      .then((icons) => {
        this.lucideIcons = icons
        return icons
      })
      .catch((error) => {
        if (this.options.warnOnMissing) {
          console.warn('Woobat UI: lucide-vue-next is not installed. Icon support will be limited to CSS classes.', error)
        }
        this.lucideIcons = false
        return null
      })

    return this.loadPromise
  }

  isLucideIcon(iconName?: string): boolean {
    if (!iconName || this.lucideIcons === false) return false

    const cssPatterns = [
      'fa-', 'fas-', 'far-', 'fab-', 'fal-',
      'icon-', 'material-', 'mdi-',
      'bi-', 'bootstrap-',
      'feather-',
      ' ', '.', '#'
    ]

    if (cssPatterns.some(pattern => iconName.includes(pattern))) {
      return false
    }

    if (!this.lucideIcons) {
      this.loadLucideIcons()
      return false
    }

    return this.hasLucideIcon(iconName)
  }

  getLucideComponent(iconName?: string): any {
    if (!iconName || !this.lucideIcons || this.lucideIcons === false) {
      return null
    }
    const cached = this.iconCache.get(iconName)
    if (cached) {
      return cached.component
    }

    const component = this.findLucideComponent(iconName)
    
    if (component) {
      this.iconCache.set(iconName, {
        component,
        isLucide: true,
        name: iconName
      })
    }

    return component
  }

  getFallbackIcon(): any {
    if (this.options.fallbackIcon && this.lucideIcons) {
      return this.findLucideComponent(this.options.fallbackIcon)
    }
    return null
  }

  clearCache(): void {
    this.iconCache.clear()
  }

  getIconSize(size: string = 'md'): number {
    const sizeMap: Record<string, number> = {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      '2xl': 24
    }
    return sizeMap[size] || 16
  }

  private hasLucideIcon(iconName: string): boolean {
    const pascalName = this.toPascalCase(iconName)
    return !!(this.lucideIcons[pascalName] || this.lucideIcons[iconName])
  }

  private findLucideComponent(iconName: string): any {
    const pascalName = this.toPascalCase(iconName)
    return this.lucideIcons[pascalName] || this.lucideIcons[iconName] || null
  }

  private toPascalCase(str: string): string {
    return str
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('')
  }
}

export const iconLoader = IconLoader.getInstance()

export const isLucideIcon = (iconName?: string) => iconLoader.isLucideIcon(iconName)
export const getLucideComponent = (iconName?: string) => iconLoader.getLucideComponent(iconName)
export const getIconSize = (size?: string) => iconLoader.getIconSize(size)
export const loadLucideIcons = () => iconLoader.loadLucideIcons()
