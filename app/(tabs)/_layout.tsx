
import React from 'react';
import { Platform } from 'react-native';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';
import { useAuth } from '@/contexts/AuthContext';

export default function TabLayout() {
  const { user } = useAuth();
  const isFighter = user?.role === 'fighter';
  const isAdmin = user?.role === 'admin';

  const tabs: TabBarItem[] = [
    {
      name: '(home)',
      route: '/(tabs)/(home)/',
      icon: 'house.fill',
      label: 'Home',
    },
    {
      name: 'live',
      route: '/(tabs)/live',
      icon: 'play.circle.fill',
      label: 'Live',
    },
    {
      name: 'tournaments',
      route: '/(tabs)/tournaments',
      icon: 'trophy.fill',
      label: 'Tournaments',
    },
    ...(isFighter ? [{
      name: 'competitions',
      route: '/(tabs)/competitions',
      icon: 'flag.checkered',
      label: 'Competitions',
    }] : []),
    {
      name: 'fighters',
      route: '/(tabs)/fighters',
      icon: 'person.2.fill',
      label: 'Fighters',
    },
    ...(isAdmin ? [{
      name: 'admin',
      route: '/(tabs)/admin',
      icon: 'crown.fill',
      label: 'Admin',
    }] : []),
    {
      name: 'profile',
      route: '/(tabs)/profile',
      icon: 'person.fill',
      label: 'Profile',
    },
  ];

  // Calculate container width based on number of tabs
  const calculateContainerWidth = () => {
    const baseWidth = 70; // Width per tab
    return Math.min(tabs.length * baseWidth, 420);
  };

  if (Platform.OS === 'ios') {
    return (
      <NativeTabs>
        <NativeTabs.Trigger name="(home)">
          <Icon sf="house.fill" drawable="ic_home" />
          <Label>Home</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="live">
          <Icon sf="play.circle.fill" drawable="ic_live" />
          <Label>Live</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="tournaments">
          <Icon sf="trophy.fill" drawable="ic_tournaments" />
          <Label>Tournaments</Label>
        </NativeTabs.Trigger>
        {isFighter && (
          <NativeTabs.Trigger name="competitions">
            <Icon sf="flag.checkered" drawable="ic_competitions" />
            <Label>Competitions</Label>
          </NativeTabs.Trigger>
        )}
        <NativeTabs.Trigger name="fighters">
          <Icon sf="person.2.fill" drawable="ic_fighters" />
          <Label>Fighters</Label>
        </NativeTabs.Trigger>
        {isAdmin && (
          <NativeTabs.Trigger name="admin">
            <Icon sf="crown.fill" drawable="ic_admin" />
            <Label>Admin</Label>
          </NativeTabs.Trigger>
        )}
        <NativeTabs.Trigger name="profile">
          <Icon sf="person.fill" drawable="ic_profile" />
          <Label>Profile</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}
      >
        <Stack.Screen name="(home)" />
        <Stack.Screen name="live" />
        <Stack.Screen name="tournaments" />
        <Stack.Screen name="competitions" />
        <Stack.Screen name="fighters" />
        <Stack.Screen name="admin" />
        <Stack.Screen name="profile" />
      </Stack>
      <FloatingTabBar tabs={tabs} containerWidth={calculateContainerWidth()} />
    </>
  );
}
