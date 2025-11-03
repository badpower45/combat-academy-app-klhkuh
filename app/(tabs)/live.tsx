
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, View, Text, Pressable, Platform, Image, TextInput } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

export default function LiveScreen() {
  const [comment, setComment] = useState('');

  const liveStreams = [
    {
      id: '1',
      title: 'Championship Finals - Round 3',
      viewers: 12453,
      status: 'live',
      thumbnail: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800',
    },
    {
      id: '2',
      title: 'Training Session with Champions',
      viewers: 3421,
      status: 'live',
      thumbnail: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800',
    },
  ];

  const upcomingStreams = [
    {
      id: '3',
      title: 'Winter Tournament - Day 1',
      scheduledTime: 'Today at 8:00 PM',
      thumbnail: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=800',
    },
    {
      id: '4',
      title: 'Fighter Interviews',
      scheduledTime: 'Tomorrow at 6:00 PM',
      thumbnail: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=800',
    },
  ];

  const comments = [
    { id: '1', user: 'Ahmed', text: 'Amazing fight! 🔥', time: '2m ago' },
    { id: '2', user: 'Sara', text: 'Who do you think will win?', time: '5m ago' },
    { id: '3', user: 'Omar', text: 'This is intense!', time: '8m ago' },
  ];

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'Live Streaming',
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
              <Text style={commonStyles.title}>Live Streaming</Text>
              <Text style={commonStyles.textSecondary}>Watch fights in real-time</Text>
            </View>
          )}

          {/* Main Live Stream */}
          <View style={styles.mainStreamContainer}>
            <View style={styles.videoPlayer}>
              <Image
                source={{ uri: liveStreams[0].thumbnail }}
                style={styles.videoThumbnail}
              />
              <View style={styles.videoOverlay}>
                <View style={styles.liveIndicator}>
                  <View style={styles.liveDot} />
                  <Text style={styles.liveText}>LIVE</Text>
                </View>
                <View style={styles.viewersCount}>
                  <IconSymbol name="eye.fill" size={16} color={colors.text} />
                  <Text style={styles.viewersText}>{liveStreams[0].viewers.toLocaleString()}</Text>
                </View>
              </View>
              <Pressable style={styles.playButton}>
                <IconSymbol name="play.fill" size={48} color={colors.text} />
              </Pressable>
            </View>
            <View style={styles.streamInfo}>
              <Text style={styles.streamTitle}>{liveStreams[0].title}</Text>
              <Text style={commonStyles.textSecondary}>Live now - Championship match</Text>
            </View>
          </View>

          {/* Stream Controls */}
          <View style={styles.controlsContainer}>
            <Pressable style={styles.controlButton}>
              <IconSymbol name="hand.thumbsup.fill" size={24} color={colors.primary} />
              <Text style={styles.controlText}>Like</Text>
            </Pressable>
            <Pressable style={styles.controlButton}>
              <IconSymbol name="square.and.arrow.up" size={24} color={colors.secondary} />
              <Text style={styles.controlText}>Share</Text>
            </Pressable>
            <Pressable style={styles.controlButton}>
              <IconSymbol name="bell.fill" size={24} color={colors.accent} />
              <Text style={styles.controlText}>Notify</Text>
            </Pressable>
          </View>

          {/* Live Chat */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.sectionTitle}>Live Chat</Text>
            <View style={styles.chatContainer}>
              {comments.map((comment) => (
                <View key={comment.id} style={styles.commentItem}>
                  <View style={styles.commentHeader}>
                    <Text style={styles.commentUser}>{comment.user}</Text>
                    <Text style={styles.commentTime}>{comment.time}</Text>
                  </View>
                  <Text style={styles.commentText}>{comment.text}</Text>
                </View>
              ))}
            </View>
            <View style={styles.commentInputContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Add a comment..."
                placeholderTextColor={colors.textSecondary}
                value={comment}
                onChangeText={setComment}
              />
              <Pressable style={styles.sendButton}>
                <IconSymbol name="paperplane.fill" size={20} color={colors.primary} />
              </Pressable>
            </View>
          </View>

          {/* Other Live Streams */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.sectionTitle}>Other Live Streams</Text>
            {liveStreams.slice(1).map((stream) => (
              <Pressable key={stream.id} style={commonStyles.card}>
                <View style={styles.streamCard}>
                  <Image source={{ uri: stream.thumbnail }} style={styles.streamThumbnail} />
                  <View style={styles.streamCardOverlay}>
                    <View style={styles.liveIndicatorSmall}>
                      <View style={styles.liveDotSmall} />
                      <Text style={styles.liveTextSmall}>LIVE</Text>
                    </View>
                  </View>
                  <View style={styles.streamCardInfo}>
                    <Text style={styles.streamCardTitle}>{stream.title}</Text>
                    <View style={styles.streamCardMeta}>
                      <IconSymbol name="eye.fill" size={14} color={colors.textSecondary} />
                      <Text style={styles.streamCardViewers}>{stream.viewers.toLocaleString()} viewers</Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>

          {/* Upcoming Streams */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.sectionTitle}>Upcoming Streams</Text>
            {upcomingStreams.map((stream) => (
              <Pressable key={stream.id} style={commonStyles.card}>
                <View style={styles.streamCard}>
                  <Image source={{ uri: stream.thumbnail }} style={styles.streamThumbnail} />
                  <View style={styles.streamCardOverlay}>
                    <View style={styles.scheduledBadge}>
                      <IconSymbol name="clock.fill" size={12} color={colors.text} />
                    </View>
                  </View>
                  <View style={styles.streamCardInfo}>
                    <Text style={styles.streamCardTitle}>{stream.title}</Text>
                    <Text style={commonStyles.textSecondary}>{stream.scheduledTime}</Text>
                  </View>
                </View>
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
  mainStreamContainer: {
    marginBottom: 16,
  },
  videoPlayer: {
    width: '100%',
    height: 220,
    backgroundColor: colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
  },
  videoOverlay: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.text,
    marginRight: 6,
  },
  liveText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  viewersCount: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  viewersText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -24 }, { translateY: -24 }],
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(187, 134, 252, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  streamInfo: {
    marginTop: 12,
  },
  streamTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  controlButton: {
    alignItems: 'center',
  },
  controlText: {
    color: colors.text,
    fontSize: 12,
    marginTop: 4,
  },
  chatContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    marginBottom: 12,
  },
  commentItem: {
    marginBottom: 12,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  commentUser: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  commentTime: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  commentText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  commentInput: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
    paddingVertical: 8,
  },
  sendButton: {
    marginLeft: 8,
    padding: 8,
  },
  streamCard: {
    flexDirection: 'row',
  },
  streamThumbnail: {
    width: 120,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  streamCardOverlay: {
    position: 'absolute',
    top: 8,
    left: 8,
  },
  liveIndicatorSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveDotSmall: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.text,
    marginRight: 4,
  },
  liveTextSmall: {
    color: colors.text,
    fontSize: 10,
    fontWeight: 'bold',
  },
  scheduledBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 8,
    borderRadius: 12,
  },
  streamCardInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  streamCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  streamCardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streamCardViewers: {
    color: colors.textSecondary,
    fontSize: 12,
    marginLeft: 4,
  },
});
