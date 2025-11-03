
import React from 'react';
import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, View, Text, Pressable, Platform, Image } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { useTheme } from '@react-navigation/native';
import { colors, commonStyles } from '@/styles/commonStyles';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();

  const upcomingEvents = [
    {
      id: '1',
      title: 'Championship Finals',
      date: 'Dec 25, 2024',
      time: '8:00 PM',
      status: 'live',
      image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800',
    },
    {
      id: '2',
      title: 'Winter Tournament',
      date: 'Dec 30, 2024',
      time: '6:00 PM',
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800',
    },
  ];

  const featuredFighters = [
    {
      id: '1',
      name: 'Ahmed Al-Rashid',
      record: '15-2-0',
      belt: 'Champion',
      image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400',
    },
    {
      id: '2',
      name: 'Omar Hassan',
      record: '12-3-1',
      belt: 'Contender',
      image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=400',
    },
  ];

  const quickActions = [
    { id: '1', title: 'Buy Tickets', icon: 'ticket.fill', color: colors.accent, route: '/tickets' },
    { id: '2', title: 'Register', icon: 'person.badge.plus', color: colors.secondary, route: '/register' },
    { id: '3', title: 'Schedule', icon: 'calendar', color: colors.primary, route: '/(tabs)/tournaments' },
  ];

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'Combat Academy',
            headerLargeTitle: true,
          }}
        />
      )}
      <View style={[commonStyles.container]}>
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
              <Text style={commonStyles.title}>Combat Academy</Text>
              <Text style={commonStyles.textSecondary}>Welcome to the arena</Text>
            </View>
          )}

          {/* Live Now Banner */}
          <Pressable
            style={styles.liveBanner}
            onPress={() => router.push('/(tabs)/live')}
          >
            <View style={styles.liveIndicator}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE NOW</Text>
            </View>
            <Text style={styles.liveBannerTitle}>Championship Finals - Round 3</Text>
            <Text style={styles.liveBannerSubtitle}>Tap to watch live stream</Text>
          </Pressable>

          {/* Quick Actions */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActionsGrid}>
              {quickActions.map((action) => (
                <Pressable
                  key={action.id}
                  style={[styles.quickActionCard, { borderColor: action.color }]}
                  onPress={() => console.log('Navigate to:', action.route)}
                >
                  <IconSymbol name={action.icon} size={32} color={action.color} />
                  <Text style={styles.quickActionText}>{action.title}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Upcoming Events */}
          <View style={commonStyles.section}>
            <View style={commonStyles.sectionHeader}>
              <Text style={commonStyles.sectionTitle}>Upcoming Events</Text>
              <Pressable onPress={() => router.push('/(tabs)/tournaments')}>
                <Text style={[commonStyles.textSecondary, { color: colors.primary }]}>See All</Text>
              </Pressable>
            </View>
            {upcomingEvents.map((event) => (
              <Pressable key={event.id} style={commonStyles.card}>
                <View style={styles.eventCard}>
                  <Image source={{ uri: event.image }} style={styles.eventImage} />
                  <View style={styles.eventInfo}>
                    <View style={styles.eventHeader}>
                      <Text style={styles.eventTitle}>{event.title}</Text>
                      {event.status === 'live' && (
                        <View style={styles.liveBadge}>
                          <Text style={styles.liveBadgeText}>LIVE</Text>
                        </View>
                      )}
                    </View>
                    <Text style={commonStyles.textSecondary}>{event.date}</Text>
                    <Text style={commonStyles.textSecondary}>{event.time}</Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>

          {/* Featured Fighters */}
          <View style={commonStyles.section}>
            <View style={commonStyles.sectionHeader}>
              <Text style={commonStyles.sectionTitle}>Featured Fighters</Text>
              <Pressable onPress={() => router.push('/(tabs)/fighters')}>
                <Text style={[commonStyles.textSecondary, { color: colors.primary }]}>See All</Text>
              </Pressable>
            </View>
            {featuredFighters.map((fighter) => (
              <Pressable key={fighter.id} style={commonStyles.card}>
                <View style={styles.fighterCard}>
                  <Image source={{ uri: fighter.image }} style={styles.fighterImage} />
                  <View style={styles.fighterInfo}>
                    <Text style={styles.fighterName}>{fighter.name}</Text>
                    <Text style={commonStyles.textSecondary}>Record: {fighter.record}</Text>
                    <View style={[commonStyles.badge, { marginTop: 8 }]}>
                      <Text style={commonStyles.badgeText}>{fighter.belt}</Text>
                    </View>
                  </View>
                  <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
                </View>
              </Pressable>
            ))}
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
  liveBanner: {
    backgroundColor: colors.accent,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    boxShadow: '0px 8px 16px rgba(255, 64, 129, 0.4)',
    elevation: 8,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.text,
    marginRight: 8,
  },
  liveText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  liveBannerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  liveBannerSubtitle: {
    fontSize: 14,
    color: colors.text,
    opacity: 0.9,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 2,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
    elevation: 4,
  },
  quickActionText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  eventCard: {
    flexDirection: 'row',
  },
  eventImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  eventInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  liveBadge: {
    backgroundColor: colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  liveBadgeText: {
    color: colors.text,
    fontSize: 10,
    fontWeight: 'bold',
  },
  fighterCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fighterImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  fighterInfo: {
    flex: 1,
  },
  fighterName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
});
