
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, View, Text, Pressable, Platform } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

export default function TournamentsScreen() {
  const [selectedTab, setSelectedTab] = useState<'active' | 'upcoming' | 'past'>('active');

  const tournaments = {
    active: [
      {
        id: '1',
        name: 'Championship Finals 2024',
        date: 'Dec 20-25, 2024',
        participants: 32,
        status: 'In Progress',
        round: 'Semi-Finals',
        location: 'Main Arena',
      },
      {
        id: '2',
        name: 'Regional Qualifiers',
        date: 'Dec 18-22, 2024',
        participants: 64,
        status: 'Quarter-Finals',
        round: 'Quarter-Finals',
        location: 'Training Center',
      },
    ],
    upcoming: [
      {
        id: '3',
        name: 'Winter Tournament 2025',
        date: 'Jan 15-20, 2025',
        participants: 48,
        status: 'Registration Open',
        location: 'Grand Stadium',
      },
      {
        id: '4',
        name: 'Youth Championship',
        date: 'Feb 5-10, 2025',
        participants: 40,
        status: 'Coming Soon',
        location: 'Youth Arena',
      },
    ],
    past: [
      {
        id: '5',
        name: 'Fall Championship 2024',
        date: 'Nov 10-15, 2024',
        participants: 32,
        winner: 'Ahmed Al-Rashid',
        location: 'Main Arena',
      },
      {
        id: '6',
        name: 'Summer Tournament 2024',
        date: 'Aug 20-25, 2024',
        participants: 48,
        winner: 'Omar Hassan',
        location: 'Grand Stadium',
      },
    ],
  };

  const brackets = [
    { round: 'Finals', matches: 1 },
    { round: 'Semi-Finals', matches: 2 },
    { round: 'Quarter-Finals', matches: 4 },
    { round: 'Round of 16', matches: 8 },
  ];

  const recentResults = [
    {
      id: '1',
      fighter1: 'Ahmed Al-Rashid',
      fighter2: 'Khalid Ibrahim',
      winner: 'Ahmed Al-Rashid',
      method: 'KO',
      round: 'Round 2',
      time: '2:34',
    },
    {
      id: '2',
      fighter1: 'Omar Hassan',
      fighter2: 'Youssef Ali',
      winner: 'Omar Hassan',
      method: 'Decision',
      round: 'Round 3',
      time: '3:00',
    },
  ];

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'Tournaments',
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
              <Text style={commonStyles.title}>Tournaments</Text>
              <Text style={commonStyles.textSecondary}>Browse and track competitions</Text>
            </View>
          )}

          {/* Tab Selector */}
          <View style={styles.tabContainer}>
            <Pressable
              style={[styles.tab, selectedTab === 'active' && styles.tabActive]}
              onPress={() => setSelectedTab('active')}
            >
              <Text style={[styles.tabText, selectedTab === 'active' && styles.tabTextActive]}>
                Active
              </Text>
            </Pressable>
            <Pressable
              style={[styles.tab, selectedTab === 'upcoming' && styles.tabActive]}
              onPress={() => setSelectedTab('upcoming')}
            >
              <Text style={[styles.tabText, selectedTab === 'upcoming' && styles.tabTextActive]}>
                Upcoming
              </Text>
            </Pressable>
            <Pressable
              style={[styles.tab, selectedTab === 'past' && styles.tabActive]}
              onPress={() => setSelectedTab('past')}
            >
              <Text style={[styles.tabText, selectedTab === 'past' && styles.tabTextActive]}>
                Past
              </Text>
            </Pressable>
          </View>

          {/* Tournament List */}
          <View style={commonStyles.section}>
            {tournaments[selectedTab].map((tournament) => (
              <Pressable key={tournament.id} style={commonStyles.cardHighlight}>
                <View style={styles.tournamentHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.tournamentName}>{tournament.name}</Text>
                    <Text style={commonStyles.textSecondary}>{tournament.date}</Text>
                  </View>
                  <View style={[commonStyles.badge, { backgroundColor: colors.secondary }]}>
                    <Text style={commonStyles.badgeText}>{tournament.status}</Text>
                  </View>
                </View>
                <View style={commonStyles.divider} />
                <View style={styles.tournamentDetails}>
                  <View style={styles.detailItem}>
                    <IconSymbol name="person.2.fill" size={16} color={colors.textSecondary} />
                    <Text style={styles.detailText}>{tournament.participants} Fighters</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <IconSymbol name="location.fill" size={16} color={colors.textSecondary} />
                    <Text style={styles.detailText}>{tournament.location}</Text>
                  </View>
                </View>
                {tournament.round && (
                  <View style={styles.roundInfo}>
                    <Text style={styles.roundText}>Current: {tournament.round}</Text>
                  </View>
                )}
                {tournament.winner && (
                  <View style={styles.winnerInfo}>
                    <IconSymbol name="trophy.fill" size={16} color={colors.accent} />
                    <Text style={styles.winnerText}>Winner: {tournament.winner}</Text>
                  </View>
                )}
              </Pressable>
            ))}
          </View>

          {/* Tournament Bracket */}
          {selectedTab === 'active' && (
            <View style={commonStyles.section}>
              <Text style={commonStyles.sectionTitle}>Tournament Bracket</Text>
              <View style={commonStyles.card}>
                {brackets.map((bracket, index) => (
                  <View key={index}>
                    <View style={styles.bracketRow}>
                      <Text style={styles.bracketRound}>{bracket.round}</Text>
                      <View style={styles.bracketMatches}>
                        <Text style={styles.bracketMatchCount}>{bracket.matches} matches</Text>
                      </View>
                    </View>
                    {index < brackets.length - 1 && <View style={styles.bracketDivider} />}
                  </View>
                ))}
                <Pressable style={styles.viewBracketButton}>
                  <Text style={styles.viewBracketText}>View Full Bracket</Text>
                  <IconSymbol name="chevron.right" size={16} color={colors.primary} />
                </Pressable>
              </View>
            </View>
          )}

          {/* Recent Results */}
          {selectedTab === 'active' && (
            <View style={commonStyles.section}>
              <Text style={commonStyles.sectionTitle}>Recent Results</Text>
              {recentResults.map((result) => (
                <View key={result.id} style={commonStyles.card}>
                  <View style={styles.resultCard}>
                    <View style={styles.fighters}>
                      <Text style={[styles.fighterName, result.winner === result.fighter1 && styles.winnerName]}>
                        {result.fighter1}
                      </Text>
                      <Text style={styles.vs}>VS</Text>
                      <Text style={[styles.fighterName, result.winner === result.fighter2 && styles.winnerName]}>
                        {result.fighter2}
                      </Text>
                    </View>
                    <View style={styles.resultDetails}>
                      <View style={styles.resultBadge}>
                        <Text style={styles.resultMethod}>{result.method}</Text>
                      </View>
                      <Text style={commonStyles.textSecondary}>
                        {result.round} - {result.time}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Register Button */}
          {selectedTab === 'upcoming' && (
            <Pressable style={styles.registerButton}>
              <IconSymbol name="person.badge.plus" size={24} color={colors.text} />
              <Text style={styles.registerButtonText}>Register for Tournament</Text>
            </Pressable>
          )}
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  tabTextActive: {
    color: colors.text,
  },
  tournamentHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tournamentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  tournamentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    color: colors.textSecondary,
    fontSize: 14,
    marginLeft: 6,
  },
  roundInfo: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  roundText: {
    color: colors.secondary,
    fontSize: 14,
    fontWeight: '600',
  },
  winnerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  winnerText: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  bracketRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  bracketRound: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  bracketMatches: {
    backgroundColor: colors.highlight,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  bracketMatchCount: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  bracketDivider: {
    height: 1,
    backgroundColor: colors.border,
  },
  viewBracketButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  viewBracketText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  resultCard: {
    gap: 12,
  },
  fighters: {
    alignItems: 'center',
  },
  fighterName: {
    fontSize: 16,
    color: colors.text,
    marginVertical: 4,
  },
  winnerName: {
    fontWeight: 'bold',
    color: colors.secondary,
  },
  vs: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  resultDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultBadge: {
    backgroundColor: colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  resultMethod: {
    color: colors.text,
    fontSize: 12,
    fontWeight: 'bold',
  },
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  registerButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
