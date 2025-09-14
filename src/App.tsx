import React, { useState, useEffect } from 'react'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "./components/ui/sidebar"
import { Dashboard } from "./components/Dashboard"
import { VideoSection } from "./components/VideoSection"
import { StudentProfile } from "./components/StudentProfile"
import { CourseCatalog } from "./components/CourseCatalog"
import { Assignments } from "./components/Assignments"
import { ProgressTracker } from "./components/ProgressTracker"
import { Settings } from "./components/Settings"
import { LanguageSelector } from "./components/LanguageSelector"
import { ThemeToggle } from "./components/ThemeToggle"
import { OfflineIndicator, MobileOfflineIndicator } from "./components/OfflineIndicator"
import { MobileNavigation } from "./components/MobileNavigation"
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext"
import { ThemeProvider } from "./contexts/ThemeContext"
import { OfflineProvider } from "./contexts/OfflineContext"
import { registerSW } from "./utils/serviceWorker"
import { 
  BookOpen, 
  Play, 
  User, 
  GraduationCap, 
  FileText, 
  TrendingUp, 
  Settings as SettingsIcon,
  Home
} from 'lucide-react'

function AppContent() {
  const { t } = useLanguage()
  
  const menuItems = [
    { id: 'dashboard', labelKey: 'nav.dashboard', icon: Home },
    { id: 'videos', labelKey: 'nav.videoLearning', icon: Play },
    { id: 'profile', labelKey: 'nav.myProfile', icon: User },
    { id: 'courses', labelKey: 'nav.courses', icon: BookOpen },
    { id: 'assignments', labelKey: 'nav.assignments', icon: FileText },
    { id: 'progress', labelKey: 'nav.progress', icon: TrendingUp },
    { id: 'settings', labelKey: 'nav.settings', icon: SettingsIcon },
  ]
  const [activeSection, setActiveSection] = useState('dashboard')

  useEffect(() => {
    // Register service worker for offline functionality
    registerSW()
    
    // Add PWA meta tags
    const addMetaTag = (name: string, content: string) => {
      if (!document.querySelector(`meta[name="${name}"]`)) {
        const meta = document.createElement('meta')
        meta.name = name
        meta.content = content
        document.head.appendChild(meta)
      }
    }
    
    addMetaTag('theme-color', '#030213')
    addMetaTag('mobile-web-app-capable', 'yes')
    addMetaTag('apple-mobile-web-app-capable', 'yes')
    addMetaTag('apple-mobile-web-app-status-bar-style', 'default')
    addMetaTag('apple-mobile-web-app-title', 'SHIKSHA MITRA')
    
    // Add manifest link if not present
    if (!document.querySelector('link[rel="manifest"]')) {
      const link = document.createElement('link')
      link.rel = 'manifest'
      link.href = '/manifest.json'
      document.head.appendChild(link)
    }
  }, [])

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />
      case 'videos':
        return <VideoSection />
      case 'profile':
        return <StudentProfile />
      case 'courses':
        return <CourseCatalog />
      case 'assignments':
        return <Assignments />
      case 'progress':
        return <ProgressTracker />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarHeader className="border-b p-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-lg font-semibold">{t('app.title')}</h1>
                <p className="text-sm text-muted-foreground">{t('app.subtitle')}</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton 
                        onClick={() => setActiveSection(item.id)}
                        isActive={activeSection === item.id}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{t(item.labelKey)}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        
        <main className="flex-1 overflow-auto">
          <div className="border-b p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="md:inline-flex hidden" />
                <h2 className="text-xl font-semibold">
                  {t(menuItems.find(item => item.id === activeSection)?.labelKey || 'nav.dashboard')}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <OfflineIndicator />
                <LanguageSelector variant="minimal" className="min-w-[100px]" />
                <ThemeToggle />
              </div>
            </div>
          </div>
          <div className="p-6 pb-20 md:pb-6">
            {renderContent()}
          </div>
          <MobileOfflineIndicator />
        </main>
        
        <MobileNavigation 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </div>
    </SidebarProvider>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <OfflineProvider>
          <AppContent />
        </OfflineProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}