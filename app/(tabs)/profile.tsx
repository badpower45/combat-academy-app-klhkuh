
import React, { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View, Text, Pressable, Platform, Image } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

export default function ProfileScreen() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true); // Set to true for demo purposes

  const userProfile = {
    name: 'Mohammed Ahmed',
    email: 'mohammed@example.com',
    memberSince: 'Jan 2024',
    avatar: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=200',
  };

  const menuItems = [
    {
      id: '1',
      title: 'My Tickets',
      icon: 'ticket.fill',
      color: colors.accent,
      badge: '3',
      route: null,
    },
    {
      id: '2',
      title: 'Favorite Fighters',
      icon: 'heart.fill',
      color: colors.primary,
      badge: '12',
      route: '/(tabs)/fighters',
    },
    {
      id: '3',
      title: 'Watch History',
      icon: 'clock.fill',
      color: colors.secondary,
      route: null,
    },
    {
      id: '4',
      title: 'Notifications',
      icon: 'bell.fill',
      color: colors.accent,
      route: null,
    },
    {
      id: '5',
      title: 'Settings',
      icon: 'gear',
      color: colors.textSecondary,
      route: null,
    },
    {
      id: '6',
      title: 'Help & Support',
      icon: 'questionmark.circle.fill',
      color: colors.textSecondary,
      route: null,
    },
  ];

  const stats = [
    { label: 'Events Attended', value: '8' },
    { label: 'Hours Watched', value: '42' },
    { label: 'Favorites', value: '12' },
  ];

  const handleMenuPress = (route: string | null) => {
    if (route) {
      router.push(route as any);
    } else {
      console.log('Feature coming soon');
    }
  };

  if (!isLoggedIn) {
    return (
      <>
        {Platform.OS === 'ios' && (
          <Stack.Screen
            options={{
              title: 'Profile',
              headerLargeTitle: true,
            }}
          />
        )}
        <View style={commonStyles.container}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={[
              styles.contentContainer,
              Platform.OS !== 'ios' && styles.contentContainerWithTabBar,
            ]}
            showsVerticalScrollIndicator={false}
          >
            {Platform.OS !== 'ios' && (
              <View style={styles.header}>
                <Text style={commonStyles.title}>Profile</Text>
              </View>
            )}

            {/* Guest View */}
            <View style={styles.guestContainer}>
              <View style={styles.guestIcon}>
                <IconSymbol name="person.circle.fill" size={80} color={colors.primary} />
              </View>
              <Text style={styles.guestTitle}>Welcome to Combat Academy</Text>
              <Text style={styles.guestSubtitle}>
                Sign in to access your profile, track your progress, and enjoy exclusive features
              </Text>

              <Pressable
                style={styles.loginButton}
                onPress={() => router.push('/auth/login')}
              >
                <IconSymbol name="arrow.right.circle.fill" size={24} color={colors.text} />
                <Text style={styles.loginButtonText}>Sign In</Text>
              </Pressable>

              <Pressable
                style={styles.registerButton}
                onPress={() => router.push('/auth/register')}
              >
                <IconSymbol name="person.badge.plus.fill" size={24} color={colors.primary} />
                <Text style={styles.registerButtonText}>Create Account</Text>
              </Pressable>

              <View style={styles.guestFeatures}>
                <Text style={styles.featuresTitle}>What you&apos;ll get:</Text>
                <View style={styles.featureItem}>
                  <IconSymbol name="checkmark.circle.fill" size={20} color={colors.success} />
                  <Text style={styles.featureText}>Access to live streams</Text>
                </View>
                <View style={styles.featureItem}>
                  <IconSymbol name="checkmark.circle.fill" size={20} color={colors.success} />
                  <Text style={styles.featureText}>Tournament registration</Text>
                </View>
                <View style={styles.featureItem}>
                  <IconSymbol name="checkmark.circle.fill" size={20} color={colors.success} />
                  <Text style={styles.featureText}>Exclusive fighter content</Text>
                </View>
                <View style={styles.featureItem}>
                  <IconSymbol name="checkmark.circle.fill" size={20} color={colors.success} />
                  <Text style={styles.featureText}>Personalized experience</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </>
    );
  }

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'Profile',
            headerLargeTitle: true,
          }}
        />
      )}
      <View style={commonStyles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.contentContainer,
            Platform.OS !== 'ios' && styles.contentContainerWithTabBar,
          ]}
          showsVerticalScrollIndicator={false}
        >
          {Platform.OS !== 'ios' && (
            <View style={styles.header}>
              <Text style={commonStyles.title}>Profile</Text>
            </View>
          )}

          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <Image source={{ uri: userProfile.avatar }} style={styles.avatar} />
            <Text style={styles.userName}>{userProfile.name}</Text>
            <Text style={commonStyles.textSecondary}>{userProfile.email}</Text>
            <View style={styles.memberBadge}>
              <IconSymbol name="star.fill" size={14} color={colors.accent} />
              <Text style={styles.memberText}>Member since {userProfile.memberSince}</Text>
            </View>
          </View>

          {/* Admin Access */}
          {isAdmin && (
            <Pressable
              style={styles.adminButton}
              onPress={() => router.push('/(tabs)/admin')}
            >
              <View style={styles.adminButtonContent}>
                <View style={styles.adminIcon}>
                  <IconSymbol name="crown.fill" size={24} color={colors.accent} />
                </View>
                <View style={styles.adminTextContainer}>
                  <Text style={styles.adminButtonTitle}>Admin Panel</Text>
                  <Text style={styles.adminButtonSubtitle}>Manage academy operations</Text>
                </View>
                <IconSymbol name="chevron.right" size={24} color={colors.accent} />
              </View>
            </Pressable>
          )}

          {/* Stats */}
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          {/* Menu Items */}
          <View style={commonStyles.section}>
            {menuItems.map((item) => (
              <Pressable
                key={item.id}
                style={commonStyles.card}
                onPress={() => handleMenuPress(item.route)}
              >
                <View style={styles.menuItem}>
                  <View style={[styles.menuIcon, { backgroundColor: `${item.color}20` }]}>
                    <IconSymbol name={item.icon} size={24} color={item.color} />
                  </View>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <View style={styles.menuRight}>
                    {item.badge && (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{item.badge}</Text>
                      </View>
                    )}
                    <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
                  </View>
                </View>
              </Pressable>
            ))}
          </View>

          {/* Action Buttons */}
          <View style={commonStyles.section}>
            <Pressable style={styles.editButton}>
              <IconSymbol name="pencil" size={20} color={colors.text} />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </Pressable>
            <Pressable
              style={styles.logoutButton}
              onPress={() => setIsLoggedIn(false)}
            >
              <IconSymbol name="arrow.right.square" size={20} color={colors.error} />
              <Text style={styles.logoutButtonText}>Log Out</Text>
            </Pressable>
          </View>

          {/* App Info */}
          <View style={styles.appInfo}>
            <Text style={styles.appInfoText}>Combat Academy App v1.0.0</Text>
            <Text style={[styles.appInfoText, { marginTop: 4 }]}>© 2024 All rights reserved</Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  contentContainerWithTabBar: {
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
  },
  guestContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  guestIcon: {
    marginBottom: 24,
  },
  guestTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  guestSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 12,
    width: '100%',
    maxWidth: 300,
    boxShadow: '0px 4px 12px rgba(187, 134, 252, 0.4)',
    elevation: 6,
  },
  loginButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 32,
    width: '100%',
    maxWidth: 300,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  registerButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  guestFeatures: {
    width: '100%',
    maxWidth: 300,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 12,
  },
  profileHeader: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
    elevation: 4,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 4,
    borderColor: colors.primary,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.highlight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 12,
  },
  memberText: {
    color: colors.textSecondary,
    fontSize: 12,
    marginLeft: 6,
  },
  adminButton: {
    backgroundColor: colors.highlight,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.accent,
    boxShadow: '0px 4px 12px rgba(255, 64, 129, 0.3)',
    elevation: 6,
  },
  adminButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  adminIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: `${colors.accent}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  adminTextContainer: {
    flex: 1,
  },
  adminButtonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  adminButtonSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    justifyContent: 'space-around',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
    elevation: 4,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 8,
  },
  badgeText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: 'bold',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  editButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.error,
  },
  logoutButtonText: {
    color: colors.error,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  appInfo: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  appInfoText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
});
