
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Pressable, Image, Alert, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { useLocalization } from '@/contexts/LocalizationContext';
import { useThemeContext, ThemeMode } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { t, locale, setLocale } = useLocalization();
  const { colors, themeMode, setThemeMode } = useThemeContext();
  const { user, isAuthenticated, logout } = useAuth();
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const handleMenuPress = (route: string | null) => {
    if (route) {
      router.push(route as any);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      t('logout'),
      'Are you sure you want to logout?',
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('logout'),
          style: 'destructive',
          onPress: () => {
            logout();
            router.replace('/auth/login');
          },
        },
      ]
    );
  };

  const handleThemeChange = (mode: ThemeMode) => {
    setThemeMode(mode);
    setShowThemeModal(false);
  };

  const handleLanguageChange = (lang: 'en' | 'ar') => {
    setLocale(lang);
    setShowLanguageModal(false);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      paddingBottom: Platform.OS === 'ios' ? 20 : 120,
    },
    header: {
      padding: 20,
      paddingTop: 60,
      backgroundColor: colors.card,
      alignItems: 'center',
    },
    avatarContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: colors.highlight,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
      borderWidth: 3,
      borderColor: colors.secondary,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 4,
    },
    email: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 8,
    },
    roleBadge: {
      paddingHorizontal: 16,
      paddingVertical: 6,
      borderRadius: 12,
      backgroundColor: colors.secondary,
    },
    roleText: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.text,
      textTransform: 'capitalize',
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 20,
      backgroundColor: colors.card,
      marginTop: 1,
    },
    statItem: {
      alignItems: 'center',
    },
    statValue: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    content: {
      padding: 16,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.textSecondary,
      marginBottom: 12,
      marginLeft: 4,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      padding: 16,
      borderRadius: 12,
      marginBottom: 8,
    },
    menuItemContent: {
      flex: 1,
      marginLeft: 16,
    },
    menuItemTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 2,
    },
    menuItemSubtitle: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.error,
      padding: 16,
      borderRadius: 12,
      justifyContent: 'center',
      marginTop: 8,
      marginBottom: 20,
    },
    logoutButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
      marginLeft: 8,
    },
    guestContainer: {
      padding: 20,
    },
    guestText: {
      fontSize: 16,
      color: colors.textSecondary,
      marginBottom: 20,
      textAlign: 'center',
    },
    authButton: {
      backgroundColor: colors.secondary,
      paddingVertical: 14,
      paddingHorizontal: 32,
      borderRadius: 12,
      marginBottom: 12,
      width: '100%',
      alignItems: 'center',
    },
    authButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
    },
    modalOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modalContent: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 20,
      width: '80%',
      maxWidth: 400,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 16,
      textAlign: 'center',
    },
    modalOption: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      borderRadius: 12,
      backgroundColor: colors.background,
      marginBottom: 8,
    },
    modalOptionSelected: {
      backgroundColor: colors.highlight,
      borderWidth: 2,
      borderColor: colors.secondary,
    },
    modalOptionText: {
      fontSize: 16,
      color: colors.text,
    },
    modalCloseButton: {
      marginTop: 12,
      padding: 12,
      alignItems: 'center',
    },
    modalCloseButtonText: {
      fontSize: 14,
      color: colors.textSecondary,
    },
  });

  if (!isAuthenticated) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <View style={styles.avatarContainer}>
                <IconSymbol name="person.fill" size={50} color={colors.textSecondary} />
              </View>
              <Text style={styles.name}>Guest User</Text>
              <Text style={styles.email}>Please sign in to continue</Text>
            </View>

            <View style={styles.guestContainer}>
              <Text style={styles.guestText}>
                Sign in to access your profile, track your progress, and register for competitions.
              </Text>
              <Pressable
                style={styles.authButton}
                onPress={() => router.push('/auth/login')}
              >
                <Text style={styles.authButtonText}>{t('signIn')}</Text>
              </Pressable>
              <Pressable
                style={[styles.authButton, { backgroundColor: colors.primary }]}
                onPress={() => router.push('/auth/register')}
              >
                <Text style={styles.authButtonText}>{t('createAccount')}</Text>
              </Pressable>
            </View>

            <View style={styles.content}>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t('settings')}</Text>
                <Pressable
                  style={styles.menuItem}
                  onPress={() => setShowLanguageModal(true)}
                >
                  <IconSymbol name="globe" size={24} color={colors.secondary} />
                  <View style={styles.menuItemContent}>
                    <Text style={styles.menuItemTitle}>{t('language')}</Text>
                    <Text style={styles.menuItemSubtitle}>
                      {locale === 'en' ? 'English' : 'العربية'}
                    </Text>
                  </View>
                  <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
                </Pressable>

                <Pressable
                  style={styles.menuItem}
                  onPress={() => setShowThemeModal(true)}
                >
                  <IconSymbol name="moon.fill" size={24} color={colors.secondary} />
                  <View style={styles.menuItemContent}>
                    <Text style={styles.menuItemTitle}>{t('theme')}</Text>
                    <Text style={styles.menuItemSubtitle}>
                      {themeMode === 'dark' ? t('darkMode') : themeMode === 'light' ? t('lightMode') : t('systemDefault')}
                    </Text>
                  </View>
                  <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
                </Pressable>
              </View>
            </View>
          </ScrollView>

          {showLanguageModal && (
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setShowLanguageModal(false)}
            >
              <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
                <Text style={styles.modalTitle}>{t('language')}</Text>
                <Pressable
                  style={[styles.modalOption, locale === 'en' && styles.modalOptionSelected]}
                  onPress={() => handleLanguageChange('en')}
                >
                  <Text style={styles.modalOptionText}>English</Text>
                  {locale === 'en' && (
                    <IconSymbol name="checkmark" size={20} color={colors.secondary} />
                  )}
                </Pressable>
                <Pressable
                  style={[styles.modalOption, locale === 'ar' && styles.modalOptionSelected]}
                  onPress={() => handleLanguageChange('ar')}
                >
                  <Text style={styles.modalOptionText}>العربية</Text>
                  {locale === 'ar' && (
                    <IconSymbol name="checkmark" size={20} color={colors.secondary} />
                  )}
                </Pressable>
                <Pressable
                  style={styles.modalCloseButton}
                  onPress={() => setShowLanguageModal(false)}
                >
                  <Text style={styles.modalCloseButtonText}>{t('cancel')}</Text>
                </Pressable>
              </Pressable>
            </Pressable>
          )}

          {showThemeModal && (
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setShowThemeModal(false)}
            >
              <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
                <Text style={styles.modalTitle}>{t('theme')}</Text>
                <Pressable
                  style={[styles.modalOption, themeMode === 'light' && styles.modalOptionSelected]}
                  onPress={() => handleThemeChange('light')}
                >
                  <Text style={styles.modalOptionText}>{t('lightMode')}</Text>
                  {themeMode === 'light' && (
                    <IconSymbol name="checkmark" size={20} color={colors.secondary} />
                  )}
                </Pressable>
                <Pressable
                  style={[styles.modalOption, themeMode === 'dark' && styles.modalOptionSelected]}
                  onPress={() => handleThemeChange('dark')}
                >
                  <Text style={styles.modalOptionText}>{t('darkMode')}</Text>
                  {themeMode === 'dark' && (
                    <IconSymbol name="checkmark" size={20} color={colors.secondary} />
                  )}
                </Pressable>
                <Pressable
                  style={[styles.modalOption, themeMode === 'system' && styles.modalOptionSelected]}
                  onPress={() => handleThemeChange('system')}
                >
                  <Text style={styles.modalOptionText}>{t('systemDefault')}</Text>
                  {themeMode === 'system' && (
                    <IconSymbol name="checkmark" size={20} color={colors.secondary} />
                  )}
                </Pressable>
                <Pressable
                  style={styles.modalCloseButton}
                  onPress={() => setShowThemeModal(false)}
                >
                  <Text style={styles.modalCloseButtonText}>{t('cancel')}</Text>
                </Pressable>
              </Pressable>
            </Pressable>
          )}
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            {user?.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
            ) : (
              <IconSymbol name="person.fill" size={50} color={colors.textSecondary} />
            )}
          </View>
          <Text style={styles.name}>{user?.fullName}</Text>
          <Text style={styles.email}>{user?.email}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{user?.role}</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Events</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Wins</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user?.memberSince}</Text>
            <Text style={styles.statLabel}>{t('memberSince')}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            <Pressable
              style={styles.menuItem}
              onPress={() => handleMenuPress(null)}
            >
              <IconSymbol name="person.circle.fill" size={24} color={colors.secondary} />
              <View style={styles.menuItemContent}>
                <Text style={styles.menuItemTitle}>{t('editProfile')}</Text>
                <Text style={styles.menuItemSubtitle}>Update your information</Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
            </Pressable>

            <Pressable
              style={styles.menuItem}
              onPress={() => handleMenuPress(null)}
            >
              <IconSymbol name="bell.fill" size={24} color={colors.secondary} />
              <View style={styles.menuItemContent}>
                <Text style={styles.menuItemTitle}>{t('notifications')}</Text>
                <Text style={styles.menuItemSubtitle}>Manage notifications</Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
            </Pressable>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('settings')}</Text>
            <Pressable
              style={styles.menuItem}
              onPress={() => setShowLanguageModal(true)}
            >
              <IconSymbol name="globe" size={24} color={colors.secondary} />
              <View style={styles.menuItemContent}>
                <Text style={styles.menuItemTitle}>{t('language')}</Text>
                <Text style={styles.menuItemSubtitle}>
                  {locale === 'en' ? 'English' : 'العربية'}
                </Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
            </Pressable>

            <Pressable
              style={styles.menuItem}
              onPress={() => setShowThemeModal(true)}
            >
              <IconSymbol name="moon.fill" size={24} color={colors.secondary} />
              <View style={styles.menuItemContent}>
                <Text style={styles.menuItemTitle}>{t('theme')}</Text>
                <Text style={styles.menuItemSubtitle}>
                  {themeMode === 'dark' ? t('darkMode') : themeMode === 'light' ? t('lightMode') : t('systemDefault')}
                </Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
            </Pressable>
          </View>

          {user?.role === 'admin' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Admin</Text>
              <Pressable
                style={styles.menuItem}
                onPress={() => router.push('/(tabs)/admin')}
              >
                <IconSymbol name="crown.fill" size={24} color={colors.accent} />
                <View style={styles.menuItemContent}>
                  <Text style={styles.menuItemTitle}>{t('adminPanel')}</Text>
                  <Text style={styles.menuItemSubtitle}>Manage app content</Text>
                </View>
                <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
              </Pressable>
            </View>
          )}

          <Pressable style={styles.logoutButton} onPress={handleLogout}>
            <IconSymbol name="arrow.right.square.fill" size={24} color={colors.text} />
            <Text style={styles.logoutButtonText}>{t('logout')}</Text>
          </Pressable>
        </View>

        {showLanguageModal && (
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setShowLanguageModal(false)}
          >
            <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
              <Text style={styles.modalTitle}>{t('language')}</Text>
              <Pressable
                style={[styles.modalOption, locale === 'en' && styles.modalOptionSelected]}
                onPress={() => handleLanguageChange('en')}
              >
                <Text style={styles.modalOptionText}>English</Text>
                {locale === 'en' && (
                  <IconSymbol name="checkmark" size={20} color={colors.secondary} />
                )}
              </Pressable>
              <Pressable
                style={[styles.modalOption, locale === 'ar' && styles.modalOptionSelected]}
                onPress={() => handleLanguageChange('ar')}
              >
                <Text style={styles.modalOptionText}>العربية</Text>
                {locale === 'ar' && (
                  <IconSymbol name="checkmark" size={20} color={colors.secondary} />
                )}
              </Pressable>
              <Pressable
                style={styles.modalCloseButton}
                onPress={() => setShowLanguageModal(false)}
              >
                <Text style={styles.modalCloseButtonText}>{t('cancel')}</Text>
              </Pressable>
            </Pressable>
          </Pressable>
        )}

        {showThemeModal && (
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setShowThemeModal(false)}
          >
            <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
              <Text style={styles.modalTitle}>{t('theme')}</Text>
              <Pressable
                style={[styles.modalOption, themeMode === 'light' && styles.modalOptionSelected]}
                onPress={() => handleThemeChange('light')}
              >
                <Text style={styles.modalOptionText}>{t('lightMode')}</Text>
                {themeMode === 'light' && (
                  <IconSymbol name="checkmark" size={20} color={colors.secondary} />
                )}
              </Pressable>
              <Pressable
                style={[styles.modalOption, themeMode === 'dark' && styles.modalOptionSelected]}
                onPress={() => handleThemeChange('dark')}
              >
                <Text style={styles.modalOptionText}>{t('darkMode')}</Text>
                {themeMode === 'dark' && (
                  <IconSymbol name="checkmark" size={20} color={colors.secondary} />
                )}
              </Pressable>
              <Pressable
                style={[styles.modalOption, themeMode === 'system' && styles.modalOptionSelected]}
                onPress={() => handleThemeChange('system')}
              >
                <Text style={styles.modalOptionText}>{t('systemDefault')}</Text>
                {themeMode === 'system' && (
                  <IconSymbol name="checkmark" size={20} color={colors.secondary} />
                )}
              </Pressable>
              <Pressable
                style={styles.modalCloseButton}
                onPress={() => setShowThemeModal(false)}
              >
                <Text style={styles.modalCloseButtonText}>{t('cancel')}</Text>
              </Pressable>
            </Pressable>
          </Pressable>
        )}
      </ScrollView>
    </>
  );
}
