import React from 'react'
import { Button } from './ui/button'
import { useLanguage } from '../contexts/LanguageContext'
import { 
  Home, 
  Play, 
  User, 
  BookOpen, 
  FileText, 
  TrendingUp, 
  Settings as SettingsIcon 
} from 'lucide-react'

interface MobileNavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export function MobileNavigation({ activeSection, setActiveSection }: MobileNavigationProps) {
  const { t } = useLanguage()
  
  const menuItems = [
    { id: 'dashboard', labelKey: 'nav.dashboard', icon: Home },
    { id: 'videos', labelKey: 'nav.videoLearning', icon: Play },
    { id: 'courses', labelKey: 'nav.courses', icon: BookOpen },
    { id: 'assignments', labelKey: 'nav.assignments', icon: FileText },
    { id: 'progress', labelKey: 'nav.progress', icon: TrendingUp },
    { id: 'profile', labelKey: 'nav.myProfile', icon: User },
    { id: 'settings', labelKey: 'nav.settings', icon: SettingsIcon },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 md:hidden">
      <div className="flex items-center justify-around px-2 py-1">
        {menuItems.slice(0, 5).map((item) => (
          <Button
            key={item.id}
            variant={activeSection === item.id ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveSection(item.id)}
            className="flex-1 flex flex-col items-center gap-1 h-12 max-w-[70px] p-1"
          >
            <item.icon className="h-4 w-4" />
            <span className="text-xs truncate leading-tight">
              {t(item.labelKey)}
            </span>
          </Button>
        ))}
      </div>
    </nav>
  )
}