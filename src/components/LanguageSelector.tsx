import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Globe } from 'lucide-react'
import { useLanguage, Language } from '../contexts/LanguageContext'

interface LanguageSelectorProps {
  className?: string
  showIcon?: boolean
  variant?: 'default' | 'minimal'
}

export function LanguageSelector({ className = '', showIcon = true, variant = 'default' }: LanguageSelectorProps) {
  const { language, setLanguage, t } = useLanguage()

  const languageOptions = [
    { value: 'en' as Language, label: 'English', nativeLabel: 'English' },
    { value: 'hi' as Language, label: 'Hindi', nativeLabel: 'हिंदी' },
    { value: 'pa' as Language, label: 'Punjabi', nativeLabel: 'ਪੰਜਾਬੀ' },
  ]

  const currentLanguage = languageOptions.find(lang => lang.value === language)

  if (variant === 'minimal') {
    return (
      <Select value={language} onValueChange={setLanguage}>
        <SelectTrigger className={`w-auto min-w-[120px] ${className}`}>
          {showIcon && <Globe className="h-4 w-4 mr-2" />}
          <SelectValue>
            {currentLanguage?.nativeLabel}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {languageOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <span className="font-medium">{option.nativeLabel}</span>
              {option.value !== 'en' && (
                <span className="text-muted-foreground ml-2">({option.label})</span>
              )}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor="language-selector" className="text-sm font-medium">
        {t('app.languageSelector')}
      </label>
      <Select value={language} onValueChange={setLanguage}>
        <SelectTrigger id="language-selector">
          {showIcon && <Globe className="h-4 w-4 mr-2" />}
          <SelectValue>
            {currentLanguage?.nativeLabel}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {languageOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <div className="flex items-center justify-between w-full">
                <span className="font-medium">{option.nativeLabel}</span>
                {option.value !== 'en' && (
                  <span className="text-muted-foreground ml-2">({option.label})</span>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}