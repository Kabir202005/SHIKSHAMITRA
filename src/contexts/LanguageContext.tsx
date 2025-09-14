import React, { createContext, useContext, useState, ReactNode } from 'react'

export type Language = 'en' | 'hi' | 'pa'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translations
const translations = {
  en: {
    // App Navigation
    'nav.dashboard': 'Dashboard',
    'nav.videoLearning': 'Video Learning',
    'nav.myProfile': 'My Profile',
    'nav.courses': 'Courses',
    'nav.assignments': 'Assignments',
    'nav.progress': 'Progress',
    'nav.settings': 'Settings',
    
    // App Header
    'app.title': 'SHIKSHA MITRA',
    'app.subtitle': 'Digital Learning Platform',
    'app.languageSelector': 'Language',
    
    // Common
    'common.save': 'Save Changes',
    'common.cancel': 'Cancel',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.all': 'All',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.close': 'Close',
    'common.open': 'Open',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.download': 'Download',
    
    // Settings
    'settings.title': 'Settings',
    'settings.subtitle': 'Customize your learning experience',
    'settings.profile': 'Profile',
    'settings.notifications': 'Notifications',
    'settings.appearance': 'Appearance',
    'settings.offline': 'Offline',
    'settings.privacy': 'Privacy',
    
    // Profile Settings
    'profile.personalInfo': 'Personal Information',
    'profile.personalInfoDesc': 'Update your personal details and preferences',
    'profile.firstName': 'First Name',
    'profile.lastName': 'Last Name',
    'profile.email': 'Email Address',
    'profile.phone': 'Phone Number',
    'profile.class': 'Class',
    'profile.school': 'School',
    'profile.languageRegion': 'Language & Region',
    'profile.preferredLanguage': 'Preferred Language',
    'profile.timezone': 'Timezone',
    
    // Language Options
    'language.english': 'English',
    'language.hindi': 'हिंदी (Hindi)',
    'language.punjabi': 'ਪੰਜਾਬੀ (Punjabi)',
    
    // Class Options
    'class.8': 'Class 8',
    'class.9': 'Class 9',
    'class.10': 'Class 10',
    'class.11': 'Class 11',
    'class.12': 'Class 12',
    
    // Notification Settings
    'notifications.title': 'Notification Preferences',
    'notifications.subtitle': 'Choose what notifications you want to receive',
    'notifications.push': 'Push Notifications',
    'notifications.pushDesc': 'Receive notifications on your device',
    'notifications.assignments': 'Assignment Reminders',
    'notifications.assignmentsDesc': 'Get reminded about upcoming assignments',
    'notifications.courses': 'New Course Announcements',
    'notifications.coursesDesc': 'Get notified about new courses and content',
    'notifications.progress': 'Weekly Progress Reports',
    'notifications.progressDesc': 'Receive weekly summaries of your progress',
    'notifications.study': 'Study Reminders',
    'notifications.studyDesc': 'Daily reminders to maintain your study streak',
    
    // Appearance Settings
    'appearance.title': 'Appearance Settings',
    'appearance.subtitle': 'Customize how the app looks and feels',
    'appearance.darkMode': 'Dark Mode',
    'appearance.darkModeDesc': 'Switch between light and dark themes',
    'appearance.fontSize': 'Font Size',
    'appearance.primaryColor': 'Primary Color',
    'appearance.audioSettings': 'Audio Settings',
    'appearance.soundEffects': 'Sound Effects',
    'appearance.soundEffectsDesc': 'Play sounds for interactions and notifications',
    'appearance.autoplayVideos': 'Auto-play Videos',
    'appearance.autoplayVideosDesc': 'Automatically start videos when opened',
    
    // Font Size Options
    'fontSize.small': 'Small',
    'fontSize.medium': 'Medium',
    'fontSize.large': 'Large',
    'fontSize.extraLarge': 'Extra Large',
    
    // Offline Settings
    'offline.title': 'Offline Learning',
    'offline.subtitle': 'Manage your offline content and downloads',
    'offline.mode': 'Offline Mode',
    'offline.modeDesc': 'Enable learning without internet connection',
    'offline.autoDownload': 'Auto-download Content',
    'offline.autoDownloadDesc': 'Automatically download new lessons when on WiFi',
    'offline.quality': 'Download Quality',
    'offline.qualityLow': 'Low (saves data)',
    'offline.qualityStandard': 'Standard',
    'offline.qualityHigh': 'High (uses more data)',
    'offline.storageUsed': 'Storage Used',
    'offline.manageDownloads': 'Manage Downloads',
    
    // Privacy Settings
    'privacy.title': 'Privacy & Security',
    'privacy.subtitle': 'Control your privacy and data sharing preferences',
    'privacy.analytics': 'Share Learning Analytics',
    'privacy.analyticsDesc': 'Help improve the platform by sharing anonymous usage data',
    'privacy.profileVisibility': 'Profile Visibility',
    'privacy.profileVisibilityDesc': 'Allow other students to see your profile',
    'privacy.onlineStatus': 'Show Online Status',
    'privacy.onlineStatusDesc': 'Let others see when you\'re online',
    'privacy.downloadData': 'Download My Data',
    'privacy.policy': 'Privacy Policy',
    'privacy.deleteAccount': 'Delete Account',
    
    // Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.overview': 'Learning Overview',
    'dashboard.recentActivity': 'Recent Activity',
    'dashboard.quickActions': 'Quick Actions',
    
    // Default Values
    'default.studentName': 'Priya Sharma',
    'default.email': 'priya.sharma@student.edu',
    'default.phone': '+91 98765 43210',
    'default.school': 'Government High School, Nabha',
    'timezone.ist': 'IST (Indian Standard Time)',
    
    // Dashboard
    'dashboard.welcome': 'Ready to continue your learning journey?',
    'dashboard.coursesEnrolled': 'Courses Enrolled',
    'dashboard.videosWatched': 'Videos Watched',
    'dashboard.assignmentsDone': 'Assignments Done',
    'dashboard.averageScore': 'Average Score',
    'dashboard.currentProgress': 'Current Progress',
    'dashboard.continueWatching': 'Continue Watching',
    'dashboard.continueWatchingDesc': 'Pick up where you left off',
    'dashboard.upcomingAssignments': 'Upcoming Assignments',
    'dashboard.upcomingAssignmentsDesc': "Don't miss these deadlines",
    
    // Common Actions
    'common.watch': 'Watch',
    'common.view': 'View',
    'common.save': 'Save Changes',
    
    // Offline Features
    'offline.sync': 'Sync',
    'offline.syncNow': 'Sync Now',
    'offline.syncing': 'Syncing...',
    'offline.synced': 'Synced',
    'offline.syncFailed': 'Sync Failed',
    'offline.onlineMode': 'Online',
    'offline.offlineMode': 'Offline Mode',
    'offline.offlineReady': 'Offline Ready',
    'offline.noConnection': 'No internet connection',
    'offline.downloadContent': 'Download for offline use',
    'offline.contentAvailable': 'Content available offline',
  },
  
  hi: {
    // App Navigation
    'nav.dashboard': 'डैशबोर्ड',
    'nav.videoLearning': 'वीडियो शिक्षा',
    'nav.myProfile': 'मेरी प्रोफ़ाइल',
    'nav.courses': 'पाठ्यक्रम',
    'nav.assignments': 'असाइनमेंट',
    'nav.progress': 'प्रगति',
    'nav.settings': 'सेटिंग्स',
    
    // App Header
    'app.title': 'शिक्षा मित्र',
    'app.subtitle': 'डिजिटल लर्निंग प्लेटफॉर्म',
    'app.languageSelector': 'भाषा',
    
    // Common
    'common.save': 'परिवर्तन सेव करें',
    'common.cancel': 'रद्द करें',
    'common.search': 'खोजें',
    'common.filter': 'फ़िल्टर',
    'common.all': 'सभी',
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि',
    'common.success': 'सफल',
    'common.close': 'बंद करें',
    'common.open': 'खोलें',
    'common.edit': 'संपादित करें',
    'common.delete': 'हटाएं',
    'common.view': 'देखें',
    'common.download': 'डाउनलोड',
    
    // Settings
    'settings.title': 'सेटिंग्स',
    'settings.subtitle': 'अपने सीखने के अनुभव को कस्टमाइज़ करें',
    'settings.profile': 'प्रोफ़ाइल',
    'settings.notifications': 'सूचनाएं',
    'settings.appearance': 'स्वरूप',
    'settings.offline': 'ऑफ़लाइन',
    'settings.privacy': 'निजता',
    
    // Profile Settings
    'profile.personalInfo': 'व्यक्तिगत जानकारी',
    'profile.personalInfoDesc': 'अपने व्यक्तिगत विवरण और प्राथमिकताएं अपडेट करें',
    'profile.firstName': 'पहला नाम',
    'profile.lastName': 'अंतिम नाम',
    'profile.email': 'ईमेल पता',
    'profile.phone': 'फोन नंबर',
    'profile.class': 'कक्षा',
    'profile.school': 'विद्यालय',
    'profile.languageRegion': 'भाषा और क्षेत्र',
    'profile.preferredLanguage': 'पसंदीदा भाषा',
    'profile.timezone': 'समय क्षेत्र',
    
    // Language Options
    'language.english': 'English',
    'language.hindi': 'हिंदी (Hindi)',
    'language.punjabi': 'ਪੰਜਾਬੀ (Punjabi)',
    
    // Class Options
    'class.8': 'कक्षा 8',
    'class.9': 'कक्षा 9',
    'class.10': 'कक्षा 10',
    'class.11': 'कक्षा 11',
    'class.12': 'कक्षा 12',
    
    // Notification Settings
    'notifications.title': 'सूचना प्राथमिकताएं',
    'notifications.subtitle': 'चुनें कि आप कौन सी सूचनाएं प्राप्त करना चाहते हैं',
    'notifications.push': 'पुश नोटिफिकेशन',
    'notifications.pushDesc': 'अपने डिवाइस पर सूचनाएं प्राप्त करें',
    'notifications.assignments': 'असाइनमेंट रिमाइंडर',
    'notifications.assignmentsDesc': 'आगामी असाइनमेंट के बारे में याद दिलाया जाए',
    'notifications.courses': 'नए पाठ्यक्रम की घोषणाएं',
    'notifications.coursesDesc': 'नए पाठ्यक्रम और सामग्री के बारे में सूचित किया जाए',
    'notifications.progress': 'साप्ताहिक प्रगति रिपोर्ट',
    'notifications.progressDesc': 'अपनी प्रगति का साप्ताहिक सारांश प्राप्त करें',
    'notifications.study': 'अध्ययन रिमाइंडर',
    'notifications.studyDesc': 'अपनी अध्ययन श्रृंखला बनाए रखने के लिए दैनिक रिमाइंडर',
    
    // Appearance Settings
    'appearance.title': 'स्वरूप सेटिंग्स',
    'appearance.subtitle': 'ऐप का रूप और अनुभव कस्टमाइज़ करें',
    'appearance.darkMode': 'डार्क मोड',
    'appearance.darkModeDesc': 'हल्के और गहरे विषयों के बीच स्विच करें',
    'appearance.fontSize': 'फ़ॉन्ट आकार',
    'appearance.primaryColor': 'प्राथमिक रंग',
    'appearance.audioSettings': 'ऑडियो सेटिंग्स',
    'appearance.soundEffects': 'ध्वनि प्रभाव',
    'appearance.soundEffectsDesc': 'इंटरैक्शन और सूचनाओं के लिए ध्वनि बजाएं',
    'appearance.autoplayVideos': 'वीडियो ऑटो-प्ले',
    'appearance.autoplayVideosDesc': 'खोले जाने पर वीडियो स्वचालित रूप से शुरू करें',
    
    // Font Size Options
    'fontSize.small': 'छोटा',
    'fontSize.medium': 'मध्यम',
    'fontSize.large': 'बड़ा',
    'fontSize.extraLarge': 'अतिरिक्त बड़ा',
    
    // Offline Settings
    'offline.title': 'ऑफ़लाइन शिक्षा',
    'offline.subtitle': 'अपनी ऑफ़लाइन सामग्री और डाउनलोड प्रबंधित करें',
    'offline.mode': 'ऑफ़लाइन मोड',
    'offline.modeDesc': 'इंटरनेट कनेक्शन के बिना सीखना सक्षम करें',
    'offline.autoDownload': 'ऑटो-डाउनलोड सामग्री',
    'offline.autoDownloadDesc': 'WiFi पर होने पर नए पाठों को स्वचालित रूप से डाउनलोड करें',
    'offline.quality': 'डाउनलोड गुणवत्ता',
    'offline.qualityLow': 'कम (डेटा बचाता है)',
    'offline.qualityStandard': 'मानक',
    'offline.qualityHigh': 'उच्च (अधिक डेटा उपयोग)',
    'offline.storageUsed': 'उपयोग किया गया स्टोरेज',
    'offline.manageDownloads': 'डाउनलोड प्रबंधित करें',
    
    // Privacy Settings
    'privacy.title': 'निजता और सुरक्षा',
    'privacy.subtitle': 'अपनी निजता और डेटा साझाकरण प्राथमिकताओं को नियंत्रित करें',
    'privacy.analytics': 'शिक्षा विश्लेषण साझा करें',
    'privacy.analyticsDesc': 'गुमनाम उपयोग डेटा साझा करके प्लेटफॉर्म को बेहतर बनाने में मदद करें',
    'privacy.profileVisibility': 'प्रोफ़ाइल दृश्यता',
    'privacy.profileVisibilityDesc': 'अन्य छात्रों को अपनी प्रोफ़ाइल देखने की अनुमति दें',
    'privacy.onlineStatus': 'ऑनलाइन स्थिति दिखाएं',
    'privacy.onlineStatusDesc': 'दूसरों को बताएं कि आप कब ऑनलाइन हैं',
    'privacy.downloadData': 'मेरा डेटा डाउनलोड करें',
    'privacy.policy': 'गोपनीयता नीति',
    'privacy.deleteAccount': 'खाता हटाएं',
    
    // Dashboard
    'dashboard.welcome': 'वापस स्वागत है',
    'dashboard.overview': 'सीखने का अवलोकन',
    'dashboard.recentActivity': 'हाल की गतिविधि',
    'dashboard.quickActions': 'त्वरित कार्य',
    
    // Default Values
    'default.studentName': 'प्रिया शर्मा',
    'default.email': 'priya.sharma@student.edu',
    'default.phone': '+91 98765 43210',
    'default.school': 'सरकारी हाई स्कूल, नाभा',
    'timezone.ist': 'IST (भारतीय मानक समय)',
    
    // Dashboard
    'dashboard.welcome': 'अपनी पढ़ाई की यात्रा जारी रखने के लिए तैयार हैं?',
    'dashboard.coursesEnrolled': 'नामांकित कोर्स',
    'dashboard.videosWatched': 'देखे गए वीडियो',
    'dashboard.assignmentsDone': 'पूरे किए गए असाइनमेंट',
    'dashboard.averageScore': 'औसत स्कोर',
    'dashboard.currentProgress': 'वर्तमान प्रगति',
    'dashboard.continueWatching': 'देखना जारी रखें',
    'dashboard.continueWatchingDesc': 'जहाँ छोड़ा था वहाँ से शुरू करें',
    'dashboard.upcomingAssignments': 'आगामी असाइनमेंट',
    'dashboard.upcomingAssignmentsDesc': 'इन समय सीमाओं को न चूकें',
    
    // Common Actions
    'common.watch': 'देखें',
    'common.view': 'देखें',
    'common.save': 'परिवर्तन सहेजें',
    
    // Offline Features
    'offline.sync': 'सिंक',
    'offline.syncNow': 'अभी सिंक करें',
    'offline.syncing': 'सिंक हो रहा है...',
    'offline.synced': 'सिंक हो गया',
    'offline.syncFailed': 'सिंक असफल',
    'offline.onlineMode': 'ऑनलाइन',
    'offline.offlineMode': 'ऑफ़लाइन मोड',
    'offline.offlineReady': 'ऑफ़लाइन तैयार',
    'offline.noConnection': 'इंटरनेट कनेक्शन नहीं है',
    'offline.downloadContent': 'ऑफ़लाइन उपयोग के लिए डाउनलोड करें',
    'offline.contentAvailable': 'सामग्री ऑफ़लाइन उपलब्ध है',
  },
  
  pa: {
    // App Navigation
    'nav.dashboard': 'ਡੈਸ਼ਬੋਰਡ',
    'nav.videoLearning': 'ਵੀਡੀਓ ਸਿਖਲਾਈ',
    'nav.myProfile': 'ਮੇਰਾ ਪ੍ਰੋਫਾਈਲ',
    'nav.courses': 'ਕੋਰਸ',
    'nav.assignments': 'ਅਸਾਈਨਮੈਂਟ',
    'nav.progress': 'ਤਰੱਕੀ',
    'nav.settings': 'ਸੈਟਿੰਗਜ਼',
    
    // App Header
    'app.title': 'ਸਿੱਖਿਆ ਮਿੱਤਰ',
    'app.subtitle': 'ਡਿਜੀਟਲ ਲਰਨਿੰਗ ਪਲੇਟਫਾਰਮ',
    'app.languageSelector': 'ਭਾਸ਼ਾ',
    
    // Common
    'common.save': 'ਤਬਦੀਲੀਆਂ ਸੇਵ ਕਰੋ',
    'common.cancel': 'ਰੱਦ ਕਰੋ',
    'common.search': 'ਖੋਜੋ',
    'common.filter': 'ਫਿਲਟਰ',
    'common.all': 'ਸਭ',
    'common.loading': 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
    'common.error': 'ਗਲਤੀ',
    'common.success': 'ਸਫਲਤਾ',
    'common.close': 'ਬੰਦ ਕਰੋ',
    'common.open': 'ਖੋਲ੍ਹੋ',
    'common.edit': 'ਸੰਪਾਦਨ ਕਰੋ',
    'common.delete': 'ਮਿਟਾਓ',
    'common.view': 'ਵੇਖੋ',
    'common.download': 'ਡਾਊਨਲੋਡ',
    
    // Settings
    'settings.title': 'ਸੈਟਿੰਗਜ਼',
    'settings.subtitle': 'ਆਪਣੇ ਸਿਖਲਾਈ ਦੇ ਤਜਰਬੇ ਨੂੰ ਕਸਟਮਾਈਜ਼ ਕਰੋ',
    'settings.profile': 'ਪ੍ਰੋਫਾਈਲ',
    'settings.notifications': 'ਸੂਚਨਾਵਾਂ',
    'settings.appearance': 'ਦਿੱਖ',
    'settings.offline': 'ਆਫਲਾਈਨ',
    'settings.privacy': 'ਪਰਾਈਵੇਸੀ',
    
    // Profile Settings
    'profile.personalInfo': 'ਨਿੱਜੀ ਜਾਣਕਾਰੀ',
    'profile.personalInfoDesc': 'ਆਪਣੀ ਨਿੱਜੀ ਜਾਣਕਾਰੀ ਅਤੇ ਤਰਜੀਹਾਂ ਅੱਪਡੇਟ ਕਰੋ',
    'profile.firstName': 'ਪਹਿਲਾ ਨਾਮ',
    'profile.lastName': 'ਆਖਰੀ ਨਾਮ',
    'profile.email': 'ਈਮੇਲ ਪਤਾ',
    'profile.phone': 'ਫੋਨ ਨੰਬਰ',
    'profile.class': 'ਕਲਾਸ',
    'profile.school': 'ਸਕੂਲ',
    'profile.languageRegion': 'ਭਾਸ਼ਾ ਅਤੇ ਖੇਤਰ',
    'profile.preferredLanguage': 'ਤਰਜੀਹੀ ਭਾਸ਼ਾ',
    'profile.timezone': 'ਸਮਾਂ ਖੇਤਰ',
    
    // Language Options
    'language.english': 'English',
    'language.hindi': 'हिंदी (Hindi)',
    'language.punjabi': 'ਪੰਜਾਬੀ (Punjabi)',
    
    // Class Options
    'class.8': 'ਕਲਾਸ 8',
    'class.9': 'ਕਲਾਸ 9',
    'class.10': 'ਕਲਾਸ 10',
    'class.11': 'ਕਲਾਸ 11',
    'class.12': 'ਕਲਾਸ 12',
    
    // Notification Settings
    'notifications.title': 'ਸੂਚਨਾ ਤਰਜੀਹਾਂ',
    'notifications.subtitle': 'ਚੁਣੋ ਕਿ ਤੁਸੀਂ ਕੀ ਸੂਚਨਾਵਾਂ ਪ੍ਰਾਪਤ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ',
    'notifications.push': 'ਪੁਸ਼ ਸੂਚਨਾਵਾਂ',
    'notifications.pushDesc': 'ਆਪਣੇ ਡਿਵਾਈਸ ਉੱਤੇ ਸੂਚਨਾਵਾਂ ਪ੍ਰਾਪਤ ਕਰੋ',
    'notifications.assignments': 'ਅਸਾਈਨਮੈਂਟ ਰਿਮਾਈਂਡਰ',
    'notifications.assignmentsDesc': 'ਆਉਣ ਵਾਲੀਆਂ ਅਸਾਈਨਮੈਂਟਾਂ ਬਾਰੇ ਯਾਦ ਦਿਵਾਓ',
    'notifications.courses': 'ਨਵੇਂ ਕੋਰਸ ਐਲਾਨ',
    'notifications.coursesDesc': 'ਨਵੇਂ ਕੋਰਸਾਂ ਅਤੇ ਸਮੱਗਰੀ ਬਾਰੇ ਸੂਚਨਾ ਪਾਓ',
    'notifications.progress': 'ਹਫਤਾਵਾਰੀ ਤਰੱਕੀ ਰਿਪੋਰਟ',
    'notifications.progressDesc': 'ਆਪਣੀ ਤਰੱਕੀ ਦਾ ਹਫਤਾਵਾਰੀ ਸਾਰਾਂਸ਼ ਪ੍ਰਾਪਤ ਕਰੋ',
    'notifications.study': 'ਅਧਿਐਨ ਰਿਮਾਈਂਡਰ',
    'notifications.studyDesc': 'ਆਪਣੀ ਅਧਿਐਨ ਲੜੀ ਨੂੰ ਬਰਕਰਾਰ ਰੱਖਣ ਲਈ ਰੋਜ਼ਾਨਾ ਰਿਮਾਈਂਡਰ',
    
    // Appearance Settings
    'appearance.title': 'ਦਿੱਖ ਸੈਟਿੰਗਜ਼',
    'appearance.subtitle': 'ਐਪ ਦਾ ਰੂਪ ਅਤੇ ਅਹਿਸਾਸ ਕਸਟਮਾਈਜ਼ ਕਰੋ',
    'appearance.darkMode': 'ਡਾਰਕ ਮੋਡ',
    'appearance.darkModeDesc': 'ਹਲਕੇ ਅਤੇ ਗੂੜ੍ਹੇ ਥੀਮਾਂ ਵਿੱਚ ਸਵਿੱਚ ਕਰੋ',
    'appearance.fontSize': 'ਫੋਂਟ ਸਾਈਜ਼',
    'appearance.primaryColor': 'ਮੁੱਖ ਰੰਗ',
    'appearance.audioSettings': 'ਆਡੀਓ ਸੈਟਿੰਗਜ਼',
    'appearance.soundEffects': 'ਆਵਾਜ਼ ਪ੍ਰਭਾਵ',
    'appearance.soundEffectsDesc': 'ਇੰਟਰੈਕਸ਼ਨ ਅਤੇ ਸੂਚਨਾਵਾਂ ਲਈ ਆਵਾਜ਼ ਚਲਾਓ',
    'appearance.autoplayVideos': 'ਵੀਡੀਓ ਆਟੋ-ਪਲੇ',
    'appearance.autoplayVideosDesc': 'ਖੋਲ੍ਹੇ ਜਾਣ ਉੱਤੇ ਵੀਡੀਓ ਆਪਣੇ ਆਪ ਸ਼ੁਰੂ ਕਰੋ',
    
    // Font Size Options
    'fontSize.small': 'ਛੋਟਾ',
    'fontSize.medium': 'ਮੱਧਮ',
    'fontSize.large': 'ਵੱਡਾ',
    'fontSize.extraLarge': 'ਵਾਧੂ ਵੱਡਾ',
    
    // Offline Settings
    'offline.title': 'ਆਫਲਾਈਨ ਸਿਖਲਾਈ',
    'offline.subtitle': 'ਆਪਣੀ ਆਫਲਾਈਨ ਸਮੱਗਰੀ ਅਤੇ ਡਾਊਨਲੋਡ ਦਾ ਪ੍ਰਬੰਧਨ ਕਰੋ',
    'offline.mode': 'ਆਫਲਾਈਨ ਮੋਡ',
    'offline.modeDesc': 'ਇੰਟਰਨੈੱਟ ਕਨੈਕਸ਼ਨ ਤੋਂ ਬਿਨਾਂ ਸਿਖਲਾਈ ਨੂੰ ਸਮਰੱਥ ਬਣਾਓ',
    'offline.autoDownload': 'ਆਟੋ-ਡਾਊਨਲੋਡ ਸਮੱਗਰੀ',
    'offline.autoDownloadDesc': 'WiFi ਉੱਤੇ ਹੋਣ ਵੇਲੇ ਨਵੇਂ ਪਾਠਾਂ ਨੂੰ ਆਪਣੇ ਆਪ ਡਾਊਨਲੋਡ ਕਰੋ',
    'offline.quality': 'ਡਾਊਨਲੋਡ ਗੁਣਵੱਤਾ',
    'offline.qualityLow': 'ਘੱਟ (ਡੇਟਾ ਬਚਾਉਂਦਾ ਹੈ)',
    'offline.qualityStandard': 'ਮਿਆਰੀ',
    'offline.qualityHigh': 'ਉੱਚ (ਜ਼ਿਆਦਾ ਡੇਟਾ ਵਰਤਦਾ ਹੈ)',
    'offline.storageUsed': 'ਵਰਤਿਆ ਸਟੋਰੇਜ',
    'offline.manageDownloads': 'ਡਾਊਨਲੋਡ ਪ੍ਰਬੰਧਿਤ ਕਰੋ',
    
    // Privacy Settings
    'privacy.title': 'ਪਰਾਈਵੇਸੀ ਅਤੇ ਸਿਕਿਉਰਿਟੀ',
    'privacy.subtitle': 'ਆਪਣੀ ਪਰਾਈਵੇਸੀ ਅਤੇ ਡੇਟਾ ਸਾਂਝਾਕਰਨ ਤਰਜੀਹਾਂ ਨੂੰ ਕੰਟਰੋਲ ਕਰੋ',
    'privacy.analytics': 'ਸਿਖਲਾਈ ਵਿਸ਼ਲੇਸ਼ਣ ਸਾਂਝਾ ਕਰੋ',
    'privacy.analyticsDesc': 'ਗੁਮਨਾਮ ਵਰਤੋਂ ਡੇਟਾ ਸਾਂਝਾ ਕਰਕੇ ਪਲੇਟਫਾਰਮ ਨੂੰ ਬਿਹਤਰ ਬਣਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰੋ',
    'privacy.profileVisibility': 'ਪ੍ਰੋਫਾਈਲ ਦਿੱਖ',
    'privacy.profileVisibilityDesc': 'ਦੂਜੇ ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਆਪਣਾ ਪ੍ਰੋਫਾਈਲ ਵੇਖਣ ਦੀ ਆਗਿਆ ਦਿਓ',
    'privacy.onlineStatus': 'ਔਨਲਾਈਨ ਸਥਿਤੀ ਦਿਖਾਓ',
    'privacy.onlineStatusDesc': 'ਦੂਸਰਿਆਂ ਨੂੰ ਦੱਸੋ ਕਿ ਤੁਸੀਂ ਕਦੋਂ ਔਨਲਾਈਨ ਹੋ',
    'privacy.downloadData': 'ਮੇਰਾ ਡੇਟਾ ਡਾਊਨਲੋਡ ਕਰੋ',
    'privacy.policy': 'ਪਰਾਈਵੇਸੀ ਨੀਤੀ',
    'privacy.deleteAccount': 'ਖਾਤਾ ਮਿਟਾਓ',
    
    // Dashboard
    'dashboard.welcome': 'ਵਾਪਸ ਜੀ ਆਇਆਂ ਨੂੰ',
    'dashboard.overview': 'ਸਿਖਲਾਈ ਸੰਖੇਪ',
    'dashboard.recentActivity': 'ਹਾਲੀਆ ਗਤੀਵਿਧੀ',
    'dashboard.quickActions': 'ਤੇਜ਼ ਕਾਰਵਾਈਆਂ',
    
    // Default Values
    'default.studentName': 'ਪ੍ਰਿਆ ਸ਼ਰਮਾ',
    'default.email': 'priya.sharma@student.edu',
    'default.phone': '+91 98765 43210',
    'default.school': 'ਸਰਕਾਰੀ ਹਾਈ ਸਕੂਲ, ਨਾਭਾ',
    'timezone.ist': 'IST (ਭਾਰਤੀ ਮਿਆਰੀ ਸਮਾਂ)',
    
    // Dashboard
    'dashboard.welcome': 'ਕੀ ਤੁਸੀਂ ਆਪਣੀ ਸਿੱਖਿਆ ਦੀ ਯਾਤਰਾ ਜਾਰੀ ਰੱਖਣ ਲਈ ਤਿਆਰ ਹੋ?',
    'dashboard.coursesEnrolled': 'ਦਾਖਲ ਕੋਰਸ',
    'dashboard.videosWatched': 'ਦੇਖੇ ਗਏ ਵੀਡੀਓ',
    'dashboard.assignmentsDone': 'ਪੂਰੇ ਕੀਤੇ ਅਸਾਈਨਮੈਂਟ',
    'dashboard.averageScore': 'ਔਸਤ ਸਕੋਰ',
    'dashboard.currentProgress': 'ਮੌਜੂਦਾ ਤਰੱਕੀ',
    'dashboard.continueWatching': 'ਦੇਖਣਾ ਜਾਰੀ ਰੱਖੋ',
    'dashboard.continueWatchingDesc': 'ਜਿੱਥੇ ਛੱਡਿਆ ਸੀ ਉੱਥੋਂ ਸ਼ੁਰੂ ਕਰੋ',
    'dashboard.upcomingAssignments': 'ਆਉਣ ਵਾਲੇ ਅਸਾਈਨਮੈਂਟ',
    'dashboard.upcomingAssignmentsDesc': 'ਇਹਨਾਂ ਸਮਾਂ ਸੀਮਾਵਾਂ ਨੂੰ ਨਾ ਚੁੱਕੋ',
    
    // Common Actions
    'common.watch': 'ਦੇਖੋ',
    'common.view': 'ਦੇਖੋ',
    'common.save': 'ਤਬਦੀਲੀਆਂ ਸੇਵ ਕਰੋ',
    
    // Offline Features
    'offline.sync': 'ਸਿੰਕ',
    'offline.syncNow': 'ਹੁਣ ਸਿੰਕ ਕਰੋ',
    'offline.syncing': 'ਸਿੰਕ ਹੋ ਰਿਹਾ ਹੈ...',
    'offline.synced': 'ਸਿੰਕ ਹੋ ਗਿਆ',
    'offline.syncFailed': 'ਸਿੰਕ ਅਸਫਲ',
    'offline.onlineMode': 'ਔਨਲਾਈਨ',
    'offline.offlineMode': 'ਆਫਲਾਈਨ ਮੋਡ',
    'offline.offlineReady': 'ਆਫਲਾਈਨ ਤਿਆਰ',
    'offline.noConnection': 'ਇੰਟਰਨੈੱਟ ਕਨੈਕਸ਼ਨ ਨਹੀਂ ਹੈ',
    'offline.downloadContent': 'ਆਫਲਾਈਨ ਵਰਤੋਂ ਲਈ ਡਾਊਨਲੋਡ ਕਰੋ',
    'offline.contentAvailable': 'ਸਮੱਗਰੀ ਆਫਲਾਈਨ ਉਪਲਬਧ ਹੈ',
  }
}

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en')

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}