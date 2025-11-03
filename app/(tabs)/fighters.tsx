
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, View, Text, Pressable, Platform, Image, TextInput } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

export default function FightersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'champions' | 'contenders'>('all');

  const fighters = [
    {
      id: '1',
      name: 'Ahmed Al-Rashid',
      nickname: 'The Thunder',
      record: { wins: 15, losses: 2, draws: 0 },
      belt: 'Heavyweight Champion',
      rank: 1,
      image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400',
      weight: '93 kg',
      height: '188 cm',
      age: 28,
      country: 'UAE',
    },
    {
      id: '2',
      name: 'Omar Hassan',
      nickname: 'The Warrior',
      record: { wins: 12, losses: 3, draws: 1 },
      belt: 'Middleweight Champion',
      rank: 2,
      image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=400',
      weight: '84 kg',
      height: '180 cm',
      age: 26,
      country: 'Egypt',
    },
    {
      id: '3',
      name: 'Khalid Ibrahim',
      nickname: 'The Lion',
      record: { wins: 10, losses: 4, draws: 0 },
      belt: 'Contender',
      rank: 3,
      image: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=400',
      weight: '77 kg',
      height: '175 cm',
      age: 24,
      country: 'Saudi Arabia',
    },
    {
      id: '4',
      name: 'Youssef Ali',
      nickname: 'The Falcon',
      record: { wins: 8, losses: 5, draws: 2 },
      belt: 'Contender',
      rank: 4,
      image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400',
      weight: '70 kg',
      height: '172 cm',
      age: 23,
      country: 'Jordan',
    },
  ];

  const stats = [
    { label: 'Total Fighters', value: '156', icon: 'person.2.fill', color: colors.primary },
    { label: 'Champions', value: '8', icon: 'trophy.fill', color: colors.accent },
    { label: 'Active', value: '142', icon: 'checkmark.circle.fill', color: colors.secondary },
  ];

  const filteredFighters = fighters.filter((fighter) => {
    const matchesSearch = fighter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fighter.nickname.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === 'champions') {
      return matchesSearch && fighter.belt.includes('Champion');
    } else if (selectedCategory === 'contenders') {
      return matchesSearch && fighter.belt === 'Contender';
    }
    return matchesSearch;
  });

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'Fighters',
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
              <Text style={commonStyles.title}>Fighters</Text>
              <Text style={commonStyles.textSecondary}>Browse fighter profiles</Text>
            </View>
          )}

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <IconSymbol name={stat.icon} size={24} color={stat.color} />
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <IconSymbol name="magnifyingglass" size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search fighters..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Category Filter */}
          <View style={styles.categoryContainer}>
            <Pressable
              style={[styles.categoryButton, selectedCategory === 'all' && styles.categoryButtonActive]}
              onPress={() => setSelectedCategory('all')}
            >
              <Text style={[styles.categoryText, selectedCategory === 'all' && styles.categoryTextActive]}>
                All
              </Text>
            </Pressable>
            <Pressable
              style={[styles.categoryButton, selectedCategory === 'champions' && styles.categoryButtonActive]}
              onPress={() => setSelectedCategory('champions')}
            >
              <Text style={[styles.categoryText, selectedCategory === 'champions' && styles.categoryTextActive]}>
                Champions
              </Text>
            </Pressable>
            <Pressable
              style={[styles.categoryButton, selectedCategory === 'contenders' && styles.categoryButtonActive]}
              onPress={() => setSelectedCategory('contenders')}
            >
              <Text style={[styles.categoryText, selectedCategory === 'contenders' && styles.categoryTextActive]}>
                Contenders
              </Text>
            </Pressable>
          </View>

          {/* Fighters List */}
          <View style={commonStyles.section}>
            {filteredFighters.map((fighter) => (
              <Pressable key={fighter.id} style={commonStyles.cardHighlight}>
                <View style={styles.fighterCard}>
                  <View style={styles.fighterHeader}>
                    <Image source={{ uri: fighter.image }} style={styles.fighterImage} />
                    <View style={styles.fighterRank}>
                      <Text style={styles.rankText}>#{fighter.rank}</Text>
                    </View>
                  </View>
                  <View style={styles.fighterInfo}>
                    <Text style={styles.fighterName}>{fighter.name}</Text>
                    <Text style={styles.fighterNickname}>&quot;{fighter.nickname}&quot;</Text>
                    <View style={[commonStyles.badge, { marginTop: 8, alignSelf: 'flex-start' }]}>
                      <Text style={commonStyles.badgeText}>{fighter.belt}</Text>
                    </View>
                  </View>
                </View>

                <View style={commonStyles.divider} />

                {/* Fighter Stats */}
                <View style={styles.recordContainer}>
                  <View style={styles.recordItem}>
                    <Text style={styles.recordValue}>{fighter.record.wins}</Text>
                    <Text style={styles.recordLabel}>Wins</Text>
                  </View>
                  <View style={styles.recordDivider} />
                  <View style={styles.recordItem}>
                    <Text style={styles.recordValue}>{fighter.record.losses}</Text>
                    <Text style={styles.recordLabel}>Losses</Text>
                  </View>
                  <View style={styles.recordDivider} />
                  <View style={styles.recordItem}>
                    <Text style={styles.recordValue}>{fighter.record.draws}</Text>
                    <Text style={styles.recordLabel}>Draws</Text>
                  </View>
                </View>

                <View style={commonStyles.divider} />

                {/* Fighter Details */}
                <View style={styles.detailsGrid}>
                  <View style={styles.detailItem}>
                    <IconSymbol name="scalemass.fill" size={16} color={colors.textSecondary} />
                    <Text style={styles.detailText}>{fighter.weight}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <IconSymbol name="arrow.up.and.down" size={16} color={colors.textSecondary} />
                    <Text style={styles.detailText}>{fighter.height}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <IconSymbol name="calendar" size={16} color={colors.textSecondary} />
                    <Text style={styles.detailText}>{fighter.age} years</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <IconSymbol name="flag.fill" size={16} color={colors.textSecondary} />
                    <Text style={styles.detailText}>{fighter.country}</Text>
                  </View>
                </View>

                <Pressable style={styles.viewProfileButton}>
                  <Text style={styles.viewProfileText}>View Full Profile</Text>
                  <IconSymbol name="chevron.right" size={16} color={colors.primary} />
                </Pressable>
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
    elevation: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    marginLeft: 12,
  },
  categoryContainer: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  categoryButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  categoryButtonActive: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  categoryTextActive: {
    color: colors.text,
  },
  fighterCard: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  fighterHeader: {
    position: 'relative',
  },
  fighterImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 16,
  },
  fighterRank: {
    position: 'absolute',
    top: -8,
    right: 8,
    backgroundColor: colors.accent,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.highlight,
  },
  rankText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: 'bold',
  },
  fighterInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  fighterName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  fighterNickname: {
    fontSize: 14,
    color: colors.secondary,
    fontStyle: 'italic',
  },
  recordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
  },
  recordItem: {
    alignItems: 'center',
  },
  recordValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  recordLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  recordDivider: {
    width: 1,
    backgroundColor: colors.border,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 8,
  },
  detailText: {
    color: colors.textSecondary,
    fontSize: 14,
    marginLeft: 8,
  },
  viewProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  viewProfileText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
});
