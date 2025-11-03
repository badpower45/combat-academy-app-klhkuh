
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Pressable, Image, Alert } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { useLocalization } from '@/contexts/LocalizationContext';
import { useThemeContext } from '@/contexts/ThemeContext';

export default function CompetitionDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { t } = useLocalization();
  const { colors } = useThemeContext();
  const [selectedWeightClass, setSelectedWeightClass] = useState<string | null>(null);

  // Mock competition data
  const competition = {
    id: id as string,
    name: 'Championship Finals 2024',
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800',
    date: 'March 15, 2024',
    time: '6:00 PM',
    location: 'Dubai Arena',
    address: 'Sheikh Zayed Road, Dubai, UAE',
    weightClasses: [
      { name: 'Lightweight', range: 'Under 70kg', available: true },
      { name: 'Middleweight', range: '70-85kg', available: true },
      { name: 'Heavyweight', range: 'Over 85kg', available: false },
    ],
    entryFee: '$150',
    deadline: 'March 1, 2024',
    maxParticipants: 64,
    currentParticipants: 42,
    description: 'Join us for the most prestigious fighting championship of the year. This tournament features the best fighters from around the region competing for glory and substantial prizes.',
    rules: [
      'All participants must be 18 years or older',
      'Valid ID and medical clearance required',
      'Protective gear will be provided',
      'No refunds after registration deadline',
    ],
    prizes: [
      { place: '1st Place', prize: '$5,000' },
      { place: '2nd Place', prize: '$2,500' },
      { place: '3rd Place', prize: '$1,000' },
    ],
  };

  const handleRegister = () => {
    if (!selectedWeightClass) {
      Alert.alert(t('error'), 'Please select a weight class');
      return;
    }

    Alert.alert(
      t('confirm'),
      `Register for ${competition.name} in ${selectedWeightClass} class?\n\nEntry Fee: ${competition.entryFee}`,
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('confirm'),
          onPress: () => {
            Alert.alert(t('success'), 'Registration successful! Payment details will be sent to your email.', [
              { text: 'OK', onPress: () => router.back() },
            ]);
          },
        },
      ]
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    image: {
      width: '100%',
      height: 250,
      backgroundColor: colors.highlight,
    },
    content: {
      padding: 20,
    },
    header: {
      marginBottom: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 12,
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
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 12,
    },
    description: {
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 22,
    },
    weightClassCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 2,
      borderColor: colors.border,
    },
    weightClassCardSelected: {
      borderColor: colors.secondary,
      backgroundColor: colors.highlight,
    },
    weightClassCardDisabled: {
      opacity: 0.5,
    },
    weightClassHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    weightClassName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
    },
    weightClassRange: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    availabilityBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
    },
    availabilityText: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.text,
    },
    ruleItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    ruleText: {
      fontSize: 14,
      color: colors.textSecondary,
      marginLeft: 8,
      flex: 1,
      lineHeight: 20,
    },
    prizeCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    prizePlace: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
    },
    prizeAmount: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.secondary,
    },
    feeCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 20,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    feeLabel: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 8,
    },
    feeAmount: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.secondary,
    },
    registerButton: {
      backgroundColor: colors.secondary,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 8,
      marginBottom: 20,
    },
    registerButtonText: {
      color: colors.text,
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

  return (
    <>
      <Stack.Screen
        options={{
          title: t('competitionDetails'),
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
        }}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: competition.image }} style={styles.image} resizeMode="cover" />

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{competition.name}</Text>
            <View style={styles.infoRow}>
              <IconSymbol name="calendar" size={18} color={colors.textSecondary} />
              <Text style={styles.infoText}>
                {competition.date} at {competition.time}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <IconSymbol name="location.fill" size={18} color={colors.textSecondary} />
              <Text style={styles.infoText}>{competition.address}</Text>
            </View>
            <View style={styles.infoRow}>
              <IconSymbol name="clock.fill" size={18} color={colors.textSecondary} />
              <Text style={styles.infoText}>
                {t('deadline')}: {competition.deadline}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('description')}</Text>
            <Text style={styles.description}>{competition.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('weightClasses')}</Text>
            {competition.weightClasses.map((weightClass, index) => (
              <Pressable
                key={index}
                style={[
                  styles.weightClassCard,
                  selectedWeightClass === weightClass.name && styles.weightClassCardSelected,
                  !weightClass.available && styles.weightClassCardDisabled,
                ]}
                onPress={() => weightClass.available && setSelectedWeightClass(weightClass.name)}
                disabled={!weightClass.available}
              >
                <View style={styles.weightClassHeader}>
                  <Text style={styles.weightClassName}>{weightClass.name}</Text>
                  <View
                    style={[
                      styles.availabilityBadge,
                      {
                        backgroundColor: weightClass.available ? colors.success : colors.error,
                      },
                    ]}
                  >
                    <Text style={styles.availabilityText}>
                      {weightClass.available ? 'Available' : 'Full'}
                    </Text>
                  </View>
                </View>
                <Text style={styles.weightClassRange}>{weightClass.range}</Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Rules & Requirements</Text>
            {competition.rules.map((rule, index) => (
              <View key={index} style={styles.ruleItem}>
                <IconSymbol name="checkmark.circle.fill" size={16} color={colors.secondary} />
                <Text style={styles.ruleText}>{rule}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('prizePool')}</Text>
            {competition.prizes.map((prize, index) => (
              <View key={index} style={styles.prizeCard}>
                <Text style={styles.prizePlace}>{prize.place}</Text>
                <Text style={styles.prizeAmount}>{prize.prize}</Text>
              </View>
            ))}
          </View>

          <View style={styles.feeCard}>
            <Text style={styles.feeLabel}>{t('registrationFee')}</Text>
            <Text style={styles.feeAmount}>{competition.entryFee}</Text>
          </View>

          <Pressable style={styles.registerButton} onPress={handleRegister}>
            <IconSymbol name="checkmark.circle.fill" size={24} color={colors.text} />
            <Text style={styles.registerButtonText}>{t('registerNow')}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
}
