
import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Animated } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { useLocalization } from '@/contexts/LocalizationContext';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function RoleSelectionScreen() {
  const router = useRouter();
  const { t } = useLocalization();
  const { colors } = useThemeContext();
  const { updateUserRole } = useAuth();
  const [selectedRole, setSelectedRole] = React.useState<'fan' | 'fighter' | null>(null);

  const handleRoleSelect = (role: 'fan' | 'fighter') => {
    setSelectedRole(role);
    updateUserRole(role);
    
    // Navigate to home after a short delay
    setTimeout(() => {
      router.replace('/(tabs)/(home)/');
    }, 300);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      flexGrow: 1,
      padding: 24,
      justifyContent: 'center',
    },
    header: {
      alignItems: 'center',
      marginBottom: 48,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 12,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    rolesContainer: {
      gap: 20,
    },
    roleCard: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 24,
      borderWidth: 2,
      borderColor: colors.border,
      overflow: 'hidden',
    },
    roleCardSelected: {
      borderColor: colors.secondary,
      backgroundColor: colors.highlight,
    },
    roleIconContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.highlight,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
      alignSelf: 'center',
    },
    roleTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
      textAlign: 'center',
    },
    roleDescription: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 20,
    },
    checkmark: {
      position: 'absolute',
      top: 16,
      right: 16,
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.secondary,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <>
      <Stack.Screen
        options={{
          title: t('selectRole'),
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerBackVisible: false,
        }}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>{t('selectRole')}</Text>
          <Text style={styles.subtitle}>{t('selectRoleDescription')}</Text>
        </View>

        <View style={styles.rolesContainer}>
          {/* Fan Role */}
          <Pressable
            style={[
              styles.roleCard,
              selectedRole === 'fan' && styles.roleCardSelected,
            ]}
            onPress={() => handleRoleSelect('fan')}
          >
            {selectedRole === 'fan' && (
              <View style={styles.checkmark}>
                <IconSymbol name="checkmark" size={20} color={colors.text} />
              </View>
            )}
            <View style={styles.roleIconContainer}>
              <IconSymbol name="eye.fill" size={40} color={colors.secondary} />
            </View>
            <Text style={styles.roleTitle}>{t('imAFan')}</Text>
            <Text style={styles.roleDescription}>{t('fanDescription')}</Text>
          </Pressable>

          {/* Fighter Role */}
          <Pressable
            style={[
              styles.roleCard,
              selectedRole === 'fighter' && styles.roleCardSelected,
            ]}
            onPress={() => handleRoleSelect('fighter')}
          >
            {selectedRole === 'fighter' && (
              <View style={styles.checkmark}>
                <IconSymbol name="checkmark" size={20} color={colors.text} />
              </View>
            )}
            <View style={styles.roleIconContainer}>
              <IconSymbol name="figure.boxing" size={40} color={colors.accent} />
            </View>
            <Text style={styles.roleTitle}>{t('imAFighter')}</Text>
            <Text style={styles.roleDescription}>{t('fighterDescription')}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
}
