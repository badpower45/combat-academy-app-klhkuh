
import React, { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View, Text, Pressable, Platform, TextInput, Modal, Alert } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

export default function AdminScreen() {
  const router = useRouter();
  const [showLiveModal, setShowLiveModal] = useState(false);
  const [showContestModal, setShowContestModal] = useState(false);

  // Live Stream State
  const [liveTitle, setLiveTitle] = useState('');
  const [liveDescription, setLiveDescription] = useState('');

  // Contest State
  const [contestName, setContestName] = useState('');
  const [contestDescription, setContestDescription] = useState('');
  const [contestPrice, setContestPrice] = useState('');
  const [contestDuration, setContestDuration] = useState('');
  const [contestStages, setContestStages] = useState('');
  const [contestRules, setContestRules] = useState('');
  const [contestMaxParticipants, setContestMaxParticipants] = useState('');

  const handleStartLive = () => {
    if (!liveTitle.trim()) {
      Alert.alert('Error', 'Please enter a title for the live stream');
      return;
    }
    console.log('Starting live stream:', { liveTitle, liveDescription });
    Alert.alert('Success', 'Live stream started successfully!');
    setShowLiveModal(false);
    setLiveTitle('');
    setLiveDescription('');
  };

  const handleCreateContest = () => {
    if (!contestName.trim() || !contestPrice.trim() || !contestDuration.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    console.log('Creating contest:', {
      contestName,
      contestDescription,
      contestPrice,
      contestDuration,
      contestStages,
      contestRules,
      contestMaxParticipants,
    });
    Alert.alert('Success', 'Contest created successfully!');
    setShowContestModal(false);
    // Reset form
    setContestName('');
    setContestDescription('');
    setContestPrice('');
    setContestDuration('');
    setContestStages('');
    setContestRules('');
    setContestMaxParticipants('');
  };

  const adminStats = [
    { label: 'Active Streams', value: '2', icon: 'play.circle.fill', color: colors.accent },
    { label: 'Total Contests', value: '8', icon: 'trophy.fill', color: colors.secondary },
    { label: 'Registered Users', value: '1,234', icon: 'person.2.fill', color: colors.primary },
    { label: 'Revenue', value: '$12,450', icon: 'dollarsign.circle.fill', color: colors.success },
  ];

  const recentActivities = [
    { id: '1', action: 'New user registered', user: 'Ahmed Ali', time: '5 min ago' },
    { id: '2', action: 'Contest registration', user: 'Sara Hassan', time: '12 min ago' },
    { id: '3', action: 'Live stream ended', user: 'Admin', time: '1 hour ago' },
    { id: '4', action: 'New contest created', user: 'Admin', time: '2 hours ago' },
  ];

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'Admin Panel',
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
              <Text style={commonStyles.title}>Admin Panel</Text>
              <Text style={commonStyles.textSecondary}>Manage your academy</Text>
            </View>
          )}

          {/* Quick Actions */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionsGrid}>
              <Pressable
                style={[styles.actionCard, { backgroundColor: colors.accent }]}
                onPress={() => setShowLiveModal(true)}
              >
                <IconSymbol name="play.circle.fill" size={32} color={colors.text} />
                <Text style={styles.actionTitle}>Start Live</Text>
                <Text style={styles.actionSubtitle}>Begin streaming</Text>
              </Pressable>

              <Pressable
                style={[styles.actionCard, { backgroundColor: colors.secondary }]}
                onPress={() => setShowContestModal(true)}
              >
                <IconSymbol name="trophy.fill" size={32} color={colors.text} />
                <Text style={styles.actionTitle}>Create Contest</Text>
                <Text style={styles.actionSubtitle}>New competition</Text>
              </Pressable>

              <Pressable
                style={[styles.actionCard, { backgroundColor: colors.primary }]}
                onPress={() => router.push('/(tabs)/fighters')}
              >
                <IconSymbol name="person.2.fill" size={32} color={colors.text} />
                <Text style={styles.actionTitle}>Manage Fighters</Text>
                <Text style={styles.actionSubtitle}>View all fighters</Text>
              </Pressable>

              <Pressable
                style={[styles.actionCard, { backgroundColor: colors.warning }]}
                onPress={() => router.push('/(tabs)/tournaments')}
              >
                <IconSymbol name="calendar" size={32} color={colors.text} />
                <Text style={styles.actionTitle}>Tournaments</Text>
                <Text style={styles.actionSubtitle}>View schedule</Text>
              </Pressable>
            </View>
          </View>

          {/* Statistics */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.sectionTitle}>Statistics</Text>
            <View style={styles.statsGrid}>
              {adminStats.map((stat, index) => (
                <View key={index} style={styles.statCard}>
                  <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                    <IconSymbol name={stat.icon} size={24} color={stat.color} />
                  </View>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Recent Activities */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.sectionTitle}>Recent Activities</Text>
            {recentActivities.map((activity) => (
              <View key={activity.id} style={commonStyles.card}>
                <View style={styles.activityItem}>
                  <View style={styles.activityIcon}>
                    <IconSymbol name="clock.fill" size={20} color={colors.primary} />
                  </View>
                  <View style={styles.activityContent}>
                    <Text style={styles.activityAction}>{activity.action}</Text>
                    <Text style={commonStyles.textSecondary}>{activity.user}</Text>
                  </View>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Management Links */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.sectionTitle}>Management</Text>
            <Pressable style={commonStyles.card} onPress={() => console.log('User Management')}>
              <View style={styles.menuItem}>
                <IconSymbol name="person.3.fill" size={24} color={colors.primary} />
                <Text style={styles.menuText}>User Management</Text>
                <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
              </View>
            </Pressable>
            <Pressable style={commonStyles.card} onPress={() => console.log('Content Management')}>
              <View style={styles.menuItem}>
                <IconSymbol name="photo.fill" size={24} color={colors.secondary} />
                <Text style={styles.menuText}>Content Management</Text>
                <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
              </View>
            </Pressable>
            <Pressable style={commonStyles.card} onPress={() => console.log('Reports')}>
              <View style={styles.menuItem}>
                <IconSymbol name="chart.bar.fill" size={24} color={colors.accent} />
                <Text style={styles.menuText}>Reports & Analytics</Text>
                <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
              </View>
            </Pressable>
            <Pressable style={commonStyles.card} onPress={() => console.log('Settings')}>
              <View style={styles.menuItem}>
                <IconSymbol name="gear" size={24} color={colors.warning} />
                <Text style={styles.menuText}>Settings</Text>
                <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
              </View>
            </Pressable>
          </View>
        </ScrollView>

        {/* Start Live Modal */}
        <Modal
          visible={showLiveModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowLiveModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Start Live Stream</Text>
                <Pressable onPress={() => setShowLiveModal(false)}>
                  <IconSymbol name="xmark.circle.fill" size={28} color={colors.textSecondary} />
                </Pressable>
              </View>

              <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Stream Title *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter stream title"
                    placeholderTextColor={colors.textSecondary}
                    value={liveTitle}
                    onChangeText={setLiveTitle}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Description</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Enter stream description"
                    placeholderTextColor={colors.textSecondary}
                    value={liveDescription}
                    onChangeText={setLiveDescription}
                    multiline
                    numberOfLines={4}
                  />
                </View>

                <Pressable style={styles.primaryButton} onPress={handleStartLive}>
                  <IconSymbol name="play.circle.fill" size={24} color={colors.text} />
                  <Text style={styles.primaryButtonText}>Start Live Stream</Text>
                </Pressable>
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* Create Contest Modal */}
        <Modal
          visible={showContestModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowContestModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Create Contest</Text>
                <Pressable onPress={() => setShowContestModal(false)}>
                  <IconSymbol name="xmark.circle.fill" size={28} color={colors.textSecondary} />
                </Pressable>
              </View>

              <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Contest Name *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter contest name"
                    placeholderTextColor={colors.textSecondary}
                    value={contestName}
                    onChangeText={setContestName}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Description</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Enter contest description"
                    placeholderTextColor={colors.textSecondary}
                    value={contestDescription}
                    onChangeText={setContestDescription}
                    multiline
                    numberOfLines={3}
                  />
                </View>

                <View style={styles.inputRow}>
                  <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                    <Text style={styles.inputLabel}>Entry Price *</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="$0.00"
                      placeholderTextColor={colors.textSecondary}
                      value={contestPrice}
                      onChangeText={setContestPrice}
                      keyboardType="numeric"
                    />
                  </View>

                  <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                    <Text style={styles.inputLabel}>Duration (days) *</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="7"
                      placeholderTextColor={colors.textSecondary}
                      value={contestDuration}
                      onChangeText={setContestDuration}
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Number of Stages</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., 4 (Qualifiers, Quarter, Semi, Final)"
                    placeholderTextColor={colors.textSecondary}
                    value={contestStages}
                    onChangeText={setContestStages}
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Max Participants</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., 32"
                    placeholderTextColor={colors.textSecondary}
                    value={contestMaxParticipants}
                    onChangeText={setContestMaxParticipants}
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Contest Rules</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Enter contest rules and regulations"
                    placeholderTextColor={colors.textSecondary}
                    value={contestRules}
                    onChangeText={setContestRules}
                    multiline
                    numberOfLines={4}
                  />
                </View>

                <Pressable style={styles.primaryButton} onPress={handleCreateContest}>
                  <IconSymbol name="trophy.fill" size={24} color={colors.text} />
                  <Text style={styles.primaryButtonText}>Create Contest</Text>
                </Pressable>
              </ScrollView>
            </View>
          </View>
        </Modal>
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
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },
  actionCard: {
    flex: 1,
    minWidth: '47%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.4)',
    elevation: 6,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 12,
  },
  actionSubtitle: {
    fontSize: 12,
    color: colors.text,
    opacity: 0.8,
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
    elevation: 4,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
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
    textAlign: 'center',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.highlight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityAction: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  modalScroll: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  inputRow: {
    flexDirection: 'row',
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 12,
    gap: 8,
  },
  primaryButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
