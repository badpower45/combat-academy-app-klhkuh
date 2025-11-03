
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Platform, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { useLocalization } from '@/contexts/LocalizationContext';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';

export default function RegisterScreen() {
  const router = useRouter();
  const { t } = useLocalization();
  const { colors } = useThemeContext();
  const { register } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!fullName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert(t('error'), 'Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert(t('error'), 'Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      Alert.alert(t('error'), 'Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(t('error'), 'Passwords do not match');
      return;
    }

    setLoading(true);
    
    try {
      // Register with a default role, will be updated in role selection
      await register(email, password, fullName, 'fan');
      
      // Navigate to role selection
      router.replace('/auth/role-selection');
    } catch (error) {
      Alert.alert(t('error'), 'Registration failed. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  const styles = StyleSheet.create({
    scrollContent: {
      flexGrow: 1,
    },
    container: {
      flex: 1,
      padding: 24,
      justifyContent: 'center',
      backgroundColor: colors.background,
    },
    header: {
      alignItems: 'center',
      marginBottom: 32,
    },
    logoContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: colors.highlight,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    form: {
      marginBottom: 24,
    },
    inputGroup: {
      marginBottom: 16,
    },
    inputLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 8,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 12,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    input: {
      flex: 1,
      paddingVertical: 16,
      paddingHorizontal: 12,
      fontSize: 16,
      color: colors.text,
    },
    termsContainer: {
      marginVertical: 16,
    },
    termsText: {
      color: colors.textSecondary,
      fontSize: 12,
      textAlign: 'center',
      lineHeight: 18,
    },
    termsLink: {
      color: colors.primary,
      fontWeight: '600',
    },
    registerButton: {
      backgroundColor: colors.secondary,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
      boxShadow: '0px 4px 12px rgba(3, 218, 198, 0.4)',
      elevation: 6,
    },
    registerButtonText: {
      color: colors.text,
      fontSize: 16,
      fontWeight: 'bold',
    },
    divider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 24,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: colors.border,
    },
    dividerText: {
      color: colors.textSecondary,
      fontSize: 14,
      marginHorizontal: 16,
    },
    socialButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.card,
      paddingVertical: 16,
      borderRadius: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    socialButtonText: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 12,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    loginText: {
      color: colors.primary,
      fontSize: 14,
      fontWeight: 'bold',
    },
    textSecondary: {
      color: colors.textSecondary,
      fontSize: 14,
    },
  });

  return (
    <>
      <Stack.Screen
        options={{
          title: t('createAccount'),
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
        }}
      />
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: colors.background }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <IconSymbol name="person.badge.plus.fill" size={64} color={colors.secondary} />
              </View>
              <Text style={styles.title}>{t('createAccount')}</Text>
              <Text style={styles.textSecondary}>Join the academy today</Text>
            </View>

            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{t('fullName')}</Text>
                <View style={styles.inputContainer}>
                  <IconSymbol name="person.fill" size={20} color={colors.textSecondary} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your full name"
                    placeholderTextColor={colors.textSecondary}
                    value={fullName}
                    onChangeText={setFullName}
                    autoCapitalize="words"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{t('email')}</Text>
                <View style={styles.inputContainer}>
                  <IconSymbol name="envelope.fill" size={20} color={colors.textSecondary} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
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
                <Text style={styles.inputLabel}>{t('password')}</Text>
                <View style={styles.inputContainer}>
                  <IconSymbol name="lock.fill" size={20} color={colors.textSecondary} />
                  <TextInput
                    style={styles.input}
                    placeholder="Create a password"
                    placeholderTextColor={colors.textSecondary}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    <IconSymbol
                      name={showPassword ? 'eye.slash.fill' : 'eye.fill'}
                      size={20}
                      color={colors.textSecondary}
                    />
                  </Pressable>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{t('confirmPassword')}</Text>
                <View style={styles.inputContainer}>
                  <IconSymbol name="lock.fill" size={20} color={colors.textSecondary} />
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm your password"
                    placeholderTextColor={colors.textSecondary}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <IconSymbol
                      name={showConfirmPassword ? 'eye.slash.fill' : 'eye.fill'}
                      size={20}
                      color={colors.textSecondary}
                    />
                  </Pressable>
                </View>
              </View>

              <View style={styles.termsContainer}>
                <Text style={styles.termsText}>
                  By signing up, you agree to our{' '}
                  <Text style={styles.termsLink}>Terms of Service</Text>
                  {' '}and{' '}
                  <Text style={styles.termsLink}>Privacy Policy</Text>
                </Text>
              </View>

              <Pressable 
                style={styles.registerButton} 
                onPress={handleRegister}
                disabled={loading}
              >
                <Text style={styles.registerButtonText}>
                  {loading ? t('loading') : t('createAccount')}
                </Text>
              </Pressable>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              <Pressable style={styles.socialButton}>
                <IconSymbol name="apple.logo" size={20} color={colors.text} />
                <Text style={styles.socialButtonText}>Sign up with Apple</Text>
              </Pressable>

              <Pressable style={styles.socialButton}>
                <IconSymbol name="g.circle.fill" size={20} color={colors.text} />
                <Text style={styles.socialButtonText}>Sign up with Google</Text>
              </Pressable>
            </View>

            <View style={styles.footer}>
              <Text style={styles.textSecondary}>{t('alreadyHaveAccount')} </Text>
              <Pressable onPress={() => router.back()}>
                <Text style={styles.loginText}>{t('signIn')}</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
