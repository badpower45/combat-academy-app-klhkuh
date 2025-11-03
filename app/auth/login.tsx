
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Platform, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { useLocalization } from '@/contexts/LocalizationContext';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const { t } = useLocalization();
  const { colors } = useThemeContext();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert(t('error'), 'Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert(t('error'), 'Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      await login(email, password);
      router.replace('/(tabs)/(home)/');
    } catch (error) {
      Alert.alert(t('error'), 'Login failed. Please check your credentials.');
      console.error('Login error:', error);
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
      marginBottom: 48,
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
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: colors.textSecondary,
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
    forgotPassword: {
      alignSelf: 'flex-end',
      marginTop: 8,
    },
    forgotPasswordText: {
      color: colors.primary,
      fontSize: 14,
      fontWeight: '600',
    },
    loginButton: {
      backgroundColor: colors.secondary,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 24,
      boxShadow: '0px 4px 12px rgba(3, 218, 198, 0.4)',
      elevation: 6,
    },
    loginButtonText: {
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
    registerText: {
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
          title: t('login'),
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
                <IconSymbol name="figure.boxing" size={64} color={colors.secondary} />
              </View>
              <Text style={styles.title}>{t('welcomeBack')}</Text>
              <Text style={styles.subtitle}>Sign in to continue</Text>
            </View>

            <View style={styles.form}>
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
                    placeholder="Enter your password"
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
                <Pressable style={styles.forgotPassword}>
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </Pressable>
              </View>

              <Pressable 
                style={styles.loginButton} 
                onPress={handleLogin}
                disabled={loading}
              >
                <Text style={styles.loginButtonText}>
                  {loading ? t('loading') : t('signIn')}
                </Text>
              </Pressable>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              <Pressable style={styles.socialButton}>
                <IconSymbol name="apple.logo" size={20} color={colors.text} />
                <Text style={styles.socialButtonText}>Sign in with Apple</Text>
              </Pressable>

              <Pressable style={styles.socialButton}>
                <IconSymbol name="g.circle.fill" size={20} color={colors.text} />
                <Text style={styles.socialButtonText}>Sign in with Google</Text>
              </Pressable>
            </View>

            <View style={styles.footer}>
              <Text style={styles.textSecondary}>{t('dontHaveAccount')} </Text>
              <Pressable onPress={() => router.push('/auth/register')}>
                <Text style={styles.registerText}>{t('signUp')}</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
