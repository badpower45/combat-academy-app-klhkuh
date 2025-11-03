
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Platform, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { useAuth } from '@/contexts/AuthContext';
import { useThemeContext } from '@/contexts/ThemeContext';
import { colors } from '@/styles/commonStyles';

export default function AdminLoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const { theme } = useThemeContext();
  const router = useRouter();

  const handleAdminLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    // Check if email contains 'admin' for demo purposes
    if (!email.toLowerCase().includes('admin')) {
      Alert.alert('Access Denied', 'You do not have admin privileges');
      return;
    }

    setLoading(true);
    try {
      await login(email, password, 'admin');
      Alert.alert('Success', 'Welcome to Admin Panel');
      router.replace('/(tabs)/admin');
    } catch (error) {
      console.error('Admin login error:', error);
      Alert.alert('Error', 'Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const dynamicStyles = {
    container: {
      ...styles.container,
      backgroundColor: theme === 'dark' ? colors.background : '#FFFFFF',
    },
    title: {
      ...styles.title,
      color: theme === 'dark' ? colors.text : '#1A1A1A',
    },
    subtitle: {
      ...styles.subtitle,
      color: theme === 'dark' ? colors.textSecondary : '#666666',
    },
    input: {
      ...styles.input,
      backgroundColor: theme === 'dark' ? colors.card : '#F5F5F5',
      color: theme === 'dark' ? colors.text : '#1A1A1A',
      borderColor: theme === 'dark' ? colors.border : '#E0E0E0',
    },
    label: {
      ...styles.label,
      color: theme === 'dark' ? colors.text : '#1A1A1A',
    },
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Admin Login',
          headerShown: true,
          presentation: 'modal',
        }}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={dynamicStyles.container}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <IconSymbol name="crown.fill" size={64} color={colors.accent} />
            </View>
            <Text style={dynamicStyles.title}>Admin Access</Text>
            <Text style={dynamicStyles.subtitle}>
              Enter your admin credentials to access the control panel
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={dynamicStyles.label}>Email Address</Text>
              <View style={styles.inputContainer}>
                <IconSymbol name="envelope.fill" size={20} color={colors.textSecondary} />
                <TextInput
                  style={dynamicStyles.input}
                  placeholder="admin@academy.com"
                  placeholderTextColor={colors.textSecondary}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={dynamicStyles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <IconSymbol name="lock.fill" size={20} color={colors.textSecondary} />
                <TextInput
                  style={dynamicStyles.input}
                  placeholder="Enter your password"
                  placeholderTextColor={colors.textSecondary}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                >
                  <IconSymbol
                    name={showPassword ? 'eye.slash.fill' : 'eye.fill'}
                    size={20}
                    color={colors.textSecondary}
                  />
                </Pressable>
              </View>
            </View>

            <Pressable
              style={[styles.loginButton, loading && styles.loginButtonDisabled]}
              onPress={handleAdminLogin}
              disabled={loading}
            >
              {loading ? (
                <Text style={styles.loginButtonText}>Logging in...</Text>
              ) : (
                <>
                  <IconSymbol name="arrow.right.circle.fill" size={24} color={colors.text} />
                  <Text style={styles.loginButtonText}>Access Admin Panel</Text>
                </>
              )}
            </Pressable>

            <View style={styles.securityNote}>
              <IconSymbol name="shield.fill" size={16} color={colors.warning} />
              <Text style={styles.securityText}>
                This area is restricted to authorized administrators only
              </Text>
            </View>
          </View>

          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <IconSymbol name="arrow.left" size={20} color={colors.primary} />
            <Text style={styles.backButtonText}>Back to App</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: `${colors.accent}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  form: {
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  input: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
  },
  eyeButton: {
    padding: 8,
    position: 'absolute',
    right: 8,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 12,
    gap: 8,
    boxShadow: '0px 4px 12px rgba(255, 64, 129, 0.4)',
    elevation: 6,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    padding: 12,
    backgroundColor: `${colors.warning}20`,
    borderRadius: 8,
    gap: 8,
  },
  securityText: {
    flex: 1,
    color: colors.warning,
    fontSize: 12,
    lineHeight: 18,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  backButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});
