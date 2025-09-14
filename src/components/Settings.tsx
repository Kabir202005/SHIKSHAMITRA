import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { ContentDownloader } from "./ContentDownloader"
import { LanguageSelector } from "./LanguageSelector"
import { ThemeToggle } from "./ThemeToggle"
import { useLanguage } from "../contexts/LanguageContext"
import { useTheme } from "../contexts/ThemeContext"
import { useOffline } from "../contexts/OfflineContext"
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Globe, 
  Shield,
  Download,
  Wifi,
  Volume2,
  Moon,
  Sun,
  HelpCircle,
  LogOut
} from 'lucide-react'

export function Settings() {
  const { t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const { hasOfflineData, clearOfflineData } = useOffline()
  const [notifications, setNotifications] = useState(true)
  const [autoDownload, setAutoDownload] = useState(false)
  const [offlineMode, setOfflineMode] = useState(false)

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">{t('settings.title')}</h1>
        <p className="text-muted-foreground">{t('settings.subtitle')}</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">{t('settings.profile')}</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">{t('settings.notifications')}</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Moon className="h-4 w-4" />
            <span className="hidden sm:inline">{t('settings.appearance')}</span>
          </TabsTrigger>
          <TabsTrigger value="offline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">{t('settings.offline')}</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">{t('settings.privacy')}</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {t('profile.personalInfo')}
              </CardTitle>
              <CardDescription>{t('profile.personalInfoDesc')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{t('profile.firstName')}</Label>
                  <Input id="firstName" defaultValue={t('default.studentName').split(' ')[0]} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">{t('profile.lastName')}</Label>
                  <Input id="lastName" defaultValue={t('default.studentName').split(' ')[1]} />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">{t('profile.email')}</Label>
                <Input id="email" type="email" defaultValue={t('default.email')} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">{t('profile.phone')}</Label>
                <Input id="phone" defaultValue={t('default.phone')} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="class">{t('profile.class')}</Label>
                <Select defaultValue="class10">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="class8">{t('class.8')}</SelectItem>
                    <SelectItem value="class9">{t('class.9')}</SelectItem>
                    <SelectItem value="class10">{t('class.10')}</SelectItem>
                    <SelectItem value="class11">{t('class.11')}</SelectItem>
                    <SelectItem value="class12">{t('class.12')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="school">{t('profile.school')}</Label>
                <Input id="school" defaultValue={t('default.school')} />
              </div>
              
              <Button>{t('common.save')}</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                {t('profile.languageRegion')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">{t('profile.preferredLanguage')}</Label>
                <LanguageSelector showIcon={false} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timezone">{t('profile.timezone')}</Label>
                <Select defaultValue="ist">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ist">{t('timezone.ist')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                {t('notifications.title')}
              </CardTitle>
              <CardDescription>{t('notifications.subtitle')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('notifications.push')}</Label>
                  <p className="text-sm text-muted-foreground">{t('notifications.pushDesc')}</p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('notifications.assignments')}</Label>
                  <p className="text-sm text-muted-foreground">{t('notifications.assignmentsDesc')}</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('notifications.courses')}</Label>
                  <p className="text-sm text-muted-foreground">{t('notifications.coursesDesc')}</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('notifications.progress')}</Label>
                  <p className="text-sm text-muted-foreground">{t('notifications.progressDesc')}</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('notifications.study')}</Label>
                  <p className="text-sm text-muted-foreground">{t('notifications.studyDesc')}</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                {t('appearance.title')}
              </CardTitle>
              <CardDescription>{t('appearance.subtitle')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('appearance.darkMode')}</Label>
                  <p className="text-sm text-muted-foreground">{t('appearance.darkModeDesc')}</p>
                </div>
                <div className="flex items-center gap-2">
                  <ThemeToggle variant="outline" />
                  <span className="text-sm text-muted-foreground">
                    {theme === 'dark' ? 'Dark' : 'Light'}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>{t('appearance.fontSize')}</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">{t('fontSize.small')}</SelectItem>
                    <SelectItem value="medium">{t('fontSize.medium')}</SelectItem>
                    <SelectItem value="large">{t('fontSize.large')}</SelectItem>
                    <SelectItem value="extra-large">{t('fontSize.extraLarge')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>{t('appearance.primaryColor')}</Label>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-blue-600 cursor-pointer" />
                  <div className="w-8 h-8 bg-green-500 rounded-full border cursor-pointer" />
                  <div className="w-8 h-8 bg-purple-500 rounded-full border cursor-pointer" />
                  <div className="w-8 h-8 bg-orange-500 rounded-full border cursor-pointer" />
                  <div className="w-8 h-8 bg-red-500 rounded-full border cursor-pointer" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="h-5 w-5" />
                {t('appearance.audioSettings')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('appearance.soundEffects')}</Label>
                  <p className="text-sm text-muted-foreground">{t('appearance.soundEffectsDesc')}</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('appearance.autoplayVideos')}</Label>
                  <p className="text-sm text-muted-foreground">{t('appearance.autoplayVideosDesc')}</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Offline Settings */}
        <TabsContent value="offline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                {t('offline.title')}
              </CardTitle>
              <CardDescription>{t('offline.subtitle')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('offline.mode')}</Label>
                  <p className="text-sm text-muted-foreground">{t('offline.modeDesc')}</p>
                </div>
                <Switch checked={offlineMode} onCheckedChange={setOfflineMode} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('offline.autoDownload')}</Label>
                  <p className="text-sm text-muted-foreground">{t('offline.autoDownloadDesc')}</p>
                </div>
                <Switch checked={autoDownload} onCheckedChange={setAutoDownload} />
              </div>
              
              <div className="space-y-2">
                <Label>{t('offline.quality')}</Label>
                <Select defaultValue="standard">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">{t('offline.qualityLow')}</SelectItem>
                    <SelectItem value="standard">{t('offline.qualityStandard')}</SelectItem>
                    <SelectItem value="high">{t('offline.qualityHigh')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{t('offline.storageUsed')}</span>
                  <span className="text-sm text-muted-foreground">2.3 GB / 5 GB</span>
                </div>
                <div className="w-full bg-background rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '46%' }} />
                </div>
              </div>
              
              {hasOfflineData && (
                <Button 
                  variant="outline" 
                  className="w-full text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  onClick={clearOfflineData}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Clear Offline Data
                </Button>
              )}
            </CardContent>
          </Card>
          
          {/* Content Downloader */}
          <ContentDownloader />
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                {t('privacy.title')}
              </CardTitle>
              <CardDescription>{t('privacy.subtitle')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('privacy.analytics')}</Label>
                  <p className="text-sm text-muted-foreground">{t('privacy.analyticsDesc')}</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('privacy.profileVisibility')}</Label>
                  <p className="text-sm text-muted-foreground">{t('privacy.profileVisibilityDesc')}</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('privacy.onlineStatus')}</Label>
                  <p className="text-sm text-muted-foreground">{t('privacy.onlineStatusDesc')}</p>
                </div>
                <Switch />
              </div>
              
              <div className="space-y-4 pt-4 border-t">
                <Button variant="outline" className="w-full">
                  {t('privacy.downloadData')}
                </Button>
                <Button variant="outline" className="w-full">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  {t('privacy.policy')}
                </Button>
                <Button variant="destructive" className="w-full">
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('privacy.deleteAccount')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}