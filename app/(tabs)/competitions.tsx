
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { useLocalization } from '@/contexts/LocalizationContext';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';

interface Competition {
  id: string;
  name: string;
  image: string;
  date: string;
  location: string;
  weightClasses: string[];
  entryFee: string;
  deadline: string;
  status: 'open' | 'registered' | 'closed';
  maxParticipants: number;
  currentParticipants: number;
}

export default function CompetitionsScreen() {
  const router = useRouter();
  const { t } = useLocalization();
  const { colors } = useThemeContext();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'available' | 'registered'>('available');

  const competitions: Competition[] = [
    {
      id: '1',
      name: 'Championship Finals 2024',
      image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800',
      date: 'March 15, 2024',
      location: 'Dubai Arena',
      weightClasses: ['Lightweight', 'Middleweight', 'Heavyweight'],
      entryFee: '$150',
      deadline: 'March 1, 2024',
      status: 'open',
      maxParticipants: 64,
      currentParticipants: 42,
    },
    {
      id: '2',
      name: 'Spring Tournament',
      image: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=800',
      date: 'April 20, 2024',
      location: 'Abu Dhabi Sports Complex',
      weightClasses: ['Lightweight', 'Welterweight'],
      entryFee: '$100',
      deadline: 'April 5, 2024',
      status: 'open',
      maxParticipants: 32,
      currentParticipants: 18,
    },
    {
      id: '3',
      name: 'Regional Championship',
      image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800',
      date: 'May 10, 2024',
      location: 'Sharjah Stadium',
      weightClasses: ['All Weight Classes'],
      entryFee: '$200',
      deadline: 'April 25, 2024',
      status: 'registered',
      maxParticipants: 128,
      currentParticipants: 95,
    },
  ];

  const filteredCompetitions = competitions.filter(comp => 
    activeTab === 'available' ? comp.status === 'open' : comp.status === 'registered'
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return colors.success;
      case 'registered':
        return colors.secondary;
      case 'closed':
        return colors.error;
      default:
        return colors.textSecondary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open':
        return t('openForRegistration');
      case 'registered':
        return t('registered');
      case 'closed':
        return t('closed');
      default:
        return status;
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 20,
      paddingTop: 60,
      backgroundColor: colors.card,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    headerSubtitle: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    tabContainer: {
      flexDirection: 'row',
      padding: 16,
      gap: 12,
    },
    tab: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 12,
      backgroundColor: colors.card,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    tabActive: {
      backgroundColor: colors.secondary,
      borderColor: colors.secondary,
    },
    tabText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    tabTextActive: {
      color: colors.text,
    },
    content: {
      padding: 16,
    },
    competitionCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      marginBottom: 16,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.border,
    },
    competitionImage: {
      width: '100%',
      height: 180,
      backgroundColor: colors.highlight,
    },
    competitionContent: {
      padding: 16,
    },
    competitionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    competitionName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      flex: 1,
      marginRight: 8,
    },
    statusBadge: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
    },
    statusText: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.text,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    infoText: {
      fontSize: 14,
      color: colors.textSecondary,
      marginLeft: 8,
      flex: 1,
    },
    weightClassesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginVertical: 12,
    },
    weightClassBadge: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
      backgroundColor: colors.highlight,
      borderWidth: 1,
      borderColor: colors.border,
    },
    weightClassText: {
      fontSize: 12,
      color: colors.text,
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 12,
    },
    feeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    feeLabel: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    feeAmount: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.secondary,
    },
    progressContainer: {
      marginBottom: 12,
    },
    progressBar: {
      height: 6,
      backgroundColor: colors.highlight,
      borderRadius: 3,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      backgroundColor: colors.secondary,
    },
    progressText: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 4,
    },
    registerButton: {
      backgroundColor: colors.secondary,
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 8,
    },
    registerButtonText: {
      color: colors.text,
      fontSize: 16,
      fontWeight: 'bold',
    },
    viewButton: {
      backgroundColor: colors.highlight,
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    viewButtonText: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '600',
    },
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 60,
    },
    emptyStateIcon: {
      marginBottom: 16,
    },
    emptyStateText: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
    },
  });

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t('competitions')}</Text>
          <Text style={styles.headerSubtitle}>
            Find and register for upcoming competitions
          </Text>
        </View>

        <View style={styles.tabContainer}>
          <Pressable
            style={[styles.tab, activeTab === 'available' && styles.tabActive]}
            onPress={() => setActiveTab('available')}
          >
            <Text style={[styles.tabText, activeTab === 'available' && styles.tabTextActive]}>
              {t('availableCompetitions')}
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === 'registered' && styles.tabActive]}
            onPress={() => setActiveTab('registered')}
          >
            <Text style={[styles.tabText, activeTab === 'registered' && styles.tabTextActive]}>
              {t('myRegistrations')}
            </Text>
          </Pressable>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {filteredCompetitions.length === 0 ? (
            <View style={styles.emptyState}>
              <IconSymbol
                name="trophy.fill"
                size={64}
                color={colors.textSecondary}
                style={styles.emptyStateIcon}
              />
              <Text style={styles.emptyStateText}>
                {activeTab === 'available'
                  ? 'No competitions available at the moment'
                  : 'You haven&apos;t registered for any competitions yet'}
              </Text>
            </View>
          ) : (
            filteredCompetitions.map((competition) => (
              <View key={competition.id} style={styles.competitionCard}>
                <Image
                  source={{ uri: competition.image }}
                  style={styles.competitionImage}
                  resizeMode="cover"
                />
                <View style={styles.competitionContent}>
                  <View style={styles.competitionHeader}>
                    <Text style={styles.competitionName}>{competition.name}</Text>
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: getStatusColor(competition.status) },
                      ]}
                    >
                      <Text style={styles.statusText}>
                        {getStatusText(competition.status)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.infoRow}>
                    <IconSymbol name="calendar" size={16} color={colors.textSecondary} />
                    <Text style={styles.infoText}>{competition.date}</Text>
                  </View>

                  <View style={styles.infoRow}>
                    <IconSymbol name="location.fill" size={16} color={colors.textSecondary} />
                    <Text style={styles.infoText}>{competition.location}</Text>
                  </View>

                  <View style={styles.infoRow}>
                    <IconSymbol name="clock.fill" size={16} color={colors.textSecondary} />
                    <Text style={styles.infoText}>
                      {t('deadline')}: {competition.deadline}
                    </Text>
                  </View>

                  <View style={styles.weightClassesContainer}>
                    {competition.weightClasses.map((weightClass, index) => (
                      <View key={index} style={styles.weightClassBadge}>
                        <Text style={styles.weightClassText}>{weightClass}</Text>
                      </View>
                    ))}
                  </View>

                  <View style={styles.divider} />

                  <View style={styles.feeContainer}>
                    <Text style={styles.feeLabel}>{t('registrationFee')}</Text>
                    <Text style={styles.feeAmount}>{competition.entryFee}</Text>
                  </View>

                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          {
                            width: `${(competition.currentParticipants / competition.maxParticipants) * 100}%`,
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.progressText}>
                      {competition.currentParticipants} / {competition.maxParticipants} {t('participants')}
                    </Text>
                  </View>

                  {competition.status === 'open' ? (
                    <Pressable
                      style={styles.registerButton}
                      onPress={() => router.push(`/competition-details?id=${competition.id}`)}
                    >
                      <IconSymbol name="checkmark.circle.fill" size={20} color={colors.text} />
                      <Text style={styles.registerButtonText}>{t('registerNow')}</Text>
                    </Pressable>
                  ) : (
                    <Pressable
                      style={styles.viewButton}
                      onPress={() => router.push(`/competition-details?id=${competition.id}`)}
                    >
                      <Text style={styles.viewButtonText}>{t('view')} {t('competitionDetails')}</Text>
                    </Pressable>
                  )}
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </>
  );
}
