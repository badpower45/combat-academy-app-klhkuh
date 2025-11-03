
import React, { createContext, useContext, useState, useEffect } from 'react';
import { I18n } from 'i18n-js';
import { getLocales } from 'expo-localization';
import { I18nManager } from 'react-native';

// Define translations
const translations = {
  en: {
    // Auth
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    fullName: 'Full Name',
    createAccount: 'Create Account',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: "Don't have an account?",
    signIn: 'Sign In',
    signUp: 'Sign Up',
    
    // Role Selection
    selectRole: 'Select Your Role',
    selectRoleDescription: 'Choose how you want to experience the academy',
    imAFan: "I'm a Fan",
    fanDescription: 'Watch live streams, buy tickets, and follow fighters',
    imAFighter: "I'm a Fighter",
    fighterDescription: 'Register for competitions and build your profile',
    
    // Navigation
    home: 'Home',
    live: 'Live',
    tournaments: 'Tournaments',
    fighters: 'Fighters',
    profile: 'Profile',
    admin: 'Admin',
    competitions: 'Competitions',
    
    // Home
    welcomeBack: 'Welcome Back',
    liveNow: 'Live Now',
    upcomingEvents: 'Upcoming Events',
    featuredFighters: 'Featured Fighters',
    quickActions: 'Quick Actions',
    buyTickets: 'Buy Tickets',
    registerForEvent: 'Register for Event',
    viewSchedule: 'View Schedule',
    
    // Live Streaming
    viewers: 'Viewers',
    watchLive: 'Watch Live',
    upcomingStreams: 'Upcoming Streams',
    liveChat: 'Live Chat',
    sendMessage: 'Send a message...',
    
    // Tournaments
    activeTournaments: 'Active',
    upcomingTournaments: 'Upcoming',
    pastTournaments: 'Past',
    viewBracket: 'View Bracket',
    participants: 'Participants',
    prizePool: 'Prize Pool',
    
    // Fighters
    searchFighters: 'Search fighters...',
    allCategories: 'All',
    lightweight: 'Lightweight',
    middleweight: 'Middleweight',
    heavyweight: 'Heavyweight',
    record: 'Record',
    wins: 'Wins',
    losses: 'Losses',
    draws: 'Draws',
    
    // Competitions (Fighter Hub)
    availableCompetitions: 'Available Competitions',
    myRegistrations: 'My Registrations',
    competitionDetails: 'Competition Details',
    registerNow: 'Register Now',
    registrationFee: 'Registration Fee',
    deadline: 'Deadline',
    weightClasses: 'Weight Classes',
    location: 'Location',
    date: 'Date',
    status: 'Status',
    openForRegistration: 'Open for Registration',
    registered: 'Registered',
    closed: 'Closed',
    
    // Profile
    settings: 'Settings',
    editProfile: 'Edit Profile',
    notifications: 'Notifications',
    language: 'Language',
    theme: 'Theme',
    logout: 'Logout',
    memberSince: 'Member Since',
    
    // Admin
    adminPanel: 'Admin Panel',
    startLiveStream: 'Start Live Stream',
    createCompetition: 'Create Competition',
    manageUsers: 'Manage Users',
    viewReports: 'View Reports',
    streamTitle: 'Stream Title',
    streamUrl: 'Stream URL',
    competitionName: 'Competition Name',
    description: 'Description',
    entryFee: 'Entry Fee',
    maxParticipants: 'Max Participants',
    
    // Theme
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    systemDefault: 'System Default',
    
    // Common
    save: 'Save',
    cancel: 'Cancel',
    submit: 'Submit',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    confirm: 'Confirm',
    back: 'Back',
    next: 'Next',
    finish: 'Finish',
  },
  ar: {
    // Auth
    login: 'تسجيل الدخول',
    register: 'التسجيل',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    confirmPassword: 'تأكيد كلمة المرور',
    fullName: 'الاسم الكامل',
    createAccount: 'إنشاء حساب',
    alreadyHaveAccount: 'هل لديك حساب بالفعل؟',
    dontHaveAccount: 'ليس لديك حساب؟',
    signIn: 'تسجيل الدخول',
    signUp: 'إنشاء حساب',
    
    // Role Selection
    selectRole: 'اختر دورك',
    selectRoleDescription: 'اختر كيف تريد تجربة الأكاديمية',
    imAFan: 'أنا مشاهد',
    fanDescription: 'شاهد البث المباشر، اشترِ التذاكر، وتابع المقاتلين',
    imAFighter: 'أنا مقاتل',
    fighterDescription: 'سجل في المسابقات وابنِ ملفك الشخصي',
    
    // Navigation
    home: 'الرئيسية',
    live: 'مباشر',
    tournaments: 'البطولات',
    fighters: 'المقاتلون',
    profile: 'الملف الشخصي',
    admin: 'الإدارة',
    competitions: 'المسابقات',
    
    // Home
    welcomeBack: 'مرحباً بعودتك',
    liveNow: 'مباشر الآن',
    upcomingEvents: 'الفعاليات القادمة',
    featuredFighters: 'مقاتلون مميزون',
    quickActions: 'إجراءات سريعة',
    buyTickets: 'شراء التذاكر',
    registerForEvent: 'التسجيل في الفعالية',
    viewSchedule: 'عرض الجدول',
    
    // Live Streaming
    viewers: 'المشاهدون',
    watchLive: 'شاهد مباشرة',
    upcomingStreams: 'البث القادم',
    liveChat: 'الدردشة المباشرة',
    sendMessage: 'أرسل رسالة...',
    
    // Tournaments
    activeTournaments: 'نشطة',
    upcomingTournaments: 'قادمة',
    pastTournaments: 'سابقة',
    viewBracket: 'عرض الجدول',
    participants: 'المشاركون',
    prizePool: 'الجوائز',
    
    // Fighters
    searchFighters: 'ابحث عن المقاتلين...',
    allCategories: 'الكل',
    lightweight: 'وزن خفيف',
    middleweight: 'وزن متوسط',
    heavyweight: 'وزن ثقيل',
    record: 'السجل',
    wins: 'انتصارات',
    losses: 'خسائر',
    draws: 'تعادلات',
    
    // Competitions (Fighter Hub)
    availableCompetitions: 'المسابقات المتاحة',
    myRegistrations: 'تسجيلاتي',
    competitionDetails: 'تفاصيل المسابقة',
    registerNow: 'سجل الآن',
    registrationFee: 'رسوم التسجيل',
    deadline: 'الموعد النهائي',
    weightClasses: 'فئات الأوزان',
    location: 'الموقع',
    date: 'التاريخ',
    status: 'الحالة',
    openForRegistration: 'متاح للتسجيل',
    registered: 'مسجل',
    closed: 'مغلق',
    
    // Profile
    settings: 'الإعدادات',
    editProfile: 'تعديل الملف الشخصي',
    notifications: 'الإشعارات',
    language: 'اللغة',
    theme: 'المظهر',
    logout: 'تسجيل الخروج',
    memberSince: 'عضو منذ',
    
    // Admin
    adminPanel: 'لوحة التحكم',
    startLiveStream: 'بدء البث المباشر',
    createCompetition: 'إنشاء مسابقة',
    manageUsers: 'إدارة المستخدمين',
    viewReports: 'عرض التقارير',
    streamTitle: 'عنوان البث',
    streamUrl: 'رابط البث',
    competitionName: 'اسم المسابقة',
    description: 'الوصف',
    entryFee: 'رسوم الدخول',
    maxParticipants: 'الحد الأقصى للمشاركين',
    
    // Theme
    darkMode: 'الوضع الداكن',
    lightMode: 'الوضع الفاتح',
    systemDefault: 'إعدادات النظام',
    
    // Common
    save: 'حفظ',
    cancel: 'إلغاء',
    submit: 'إرسال',
    delete: 'حذف',
    edit: 'تعديل',
    view: 'عرض',
    search: 'بحث',
    filter: 'تصفية',
    sort: 'ترتيب',
    loading: 'جاري التحميل...',
    error: 'خطأ',
    success: 'نجح',
    confirm: 'تأكيد',
    back: 'رجوع',
    next: 'التالي',
    finish: 'إنهاء',
  },
};

type LocaleType = 'en' | 'ar';

interface LocalizationContextType {
  locale: LocaleType;
  setLocale: (locale: LocaleType) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<LocaleType>('en');
  const [i18n] = useState(() => {
    const i18nInstance = new I18n(translations);
    i18nInstance.enableFallback = true;
    i18nInstance.defaultLocale = 'en';
    return i18nInstance;
  });

  useEffect(() => {
    // Get device locale
    const deviceLocale = getLocales()[0];
    const deviceLanguage = deviceLocale.languageCode as LocaleType;
    
    // Set initial locale based on device
    if (deviceLanguage === 'ar' || deviceLanguage === 'en') {
      setLocaleState(deviceLanguage);
      i18n.locale = deviceLanguage;
    }
  }, []);

  const setLocale = (newLocale: LocaleType) => {
    setLocaleState(newLocale);
    i18n.locale = newLocale;
    
    // Update RTL layout
    const isRTL = newLocale === 'ar';
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.forceRTL(isRTL);
      // Note: App needs to restart for RTL to take full effect
    }
  };

  const t = (key: string): string => {
    return i18n.t(key);
  };

  const isRTL = locale === 'ar';

  return (
    <LocalizationContext.Provider value={{ locale, setLocale, t, isRTL }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within LocalizationProvider');
  }
  return context;
};
