
import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

export default function TicketsScreen() {
  const router = useRouter();
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  const events = [
    {
      id: '1',
      title: 'Championship Finals',
      date: 'Dec 25, 2024',
      time: '8:00 PM',
      location: 'Main Arena',
      image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800',
      tickets: [
        { id: 't1', type: 'VIP', price: 150, available: 5 },
        { id: 't2', type: 'Premium', price: 100, available: 20 },
        { id: 't3', type: 'Standard', price: 50, available: 50 },
      ],
    },
    {
      id: '2',
      title: 'Winter Tournament',
      date: 'Dec 30, 2024',
      time: '6:00 PM',
      location: 'Grand Stadium',
      image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800',
      tickets: [
        { id: 't4', type: 'VIP', price: 120, available: 10 },
        { id: 't5', type: 'Premium', price: 80, available: 30 },
        { id: 't6', type: 'Standard', price: 40, available: 100 },
      ],
    },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Buy Tickets',
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
        }}
      />
      <View style={commonStyles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={commonStyles.title}>Event Tickets</Text>
            <Text style={commonStyles.textSecondary}>Select an event and ticket type</Text>
          </View>

          {events.map((event) => (
            <View key={event.id} style={styles.eventSection}>
              <View style={commonStyles.cardHighlight}>
                <Image source={{ uri: event.image }} style={styles.eventImage} />
                <View style={styles.eventDetails}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <View style={styles.eventMeta}>
                    <View style={styles.metaItem}>
                      <IconSymbol name="calendar" size={16} color={colors.textSecondary} />
                      <Text style={styles.metaText}>{event.date}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <IconSymbol name="clock.fill" size={16} color={colors.textSecondary} />
                      <Text style={styles.metaText}>{event.time}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <IconSymbol name="location.fill" size={16} color={colors.textSecondary} />
                      <Text style={styles.metaText}>{event.location}</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.ticketsContainer}>
                <Text style={styles.ticketsTitle}>Available Tickets</Text>
                {event.tickets.map((ticket) => (
                  <Pressable
                    key={ticket.id}
                    style={[
                      styles.ticketCard,
                      selectedTicket === ticket.id && styles.ticketCardSelected,
                    ]}
                    onPress={() => setSelectedTicket(ticket.id)}
                  >
                    <View style={styles.ticketInfo}>
                      <Text style={styles.ticketType}>{ticket.type}</Text>
                      <Text style={styles.ticketAvailable}>
                        {ticket.available} available
                      </Text>
                    </View>
                    <View style={styles.ticketPrice}>
                      <Text style={styles.priceAmount}>${ticket.price}</Text>
                      {selectedTicket === ticket.id && (
                        <IconSymbol name="checkmark.circle.fill" size={24} color={colors.success} />
                      )}
                    </View>
                  </Pressable>
                ))}
              </View>
            </View>
          ))}

          {selectedTicket && (
            <Pressable style={styles.buyButton}>
              <IconSymbol name="cart.fill" size={24} color={colors.text} />
              <Text style={styles.buyButtonText}>Proceed to Checkout</Text>
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
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  eventSection: {
    marginBottom: 32,
  },
  eventImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 16,
  },
  eventDetails: {
    marginBottom: 16,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  eventMeta: {
    gap: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  metaText: {
    color: colors.textSecondary,
    fontSize: 14,
    marginLeft: 8,
  },
  ticketsContainer: {
    marginTop: 16,
  },
  ticketsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  ticketCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: colors.border,
  },
  ticketCardSelected: {
    borderColor: colors.success,
    backgroundColor: colors.highlight,
  },
  ticketInfo: {
    flex: 1,
  },
  ticketType: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  ticketAvailable: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  ticketPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  priceAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  buyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.success,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 16,
    boxShadow: '0px 4px 12px rgba(76, 175, 80, 0.4)',
    elevation: 6,
  },
  buyButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
