import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, 
  Search,
  BriefcaseBusiness,
  MessageSquareText,
  CircleCheck,
  X,
  Eye,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import WalletIcon from '../../components/svg/money';

type NotificationType = {
  id: string;
  type: 'shift' | 'message' | 'confirmation' | 'payment' | 'rejection' | 'view';
  title: string;
  description: string;
  time: string;
  isNew?: boolean;
};

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleMarkAllRead = () => {
    // Handle
  };

  const todayNotifications: NotificationType[] = [
    {
      id: '1',
      type: 'shift',
      title: 'New Shift Offer',
      description: 'Barista Shift\nAt The Coffee Club • $25/Hr. Tap To View Details.',
      time: '2h Ago',
      isNew: true,
    },
    {
      id: '2',
      type: 'message',
      title: 'Message From Sarah',
      description: 'Hey, Are You Available To Start An Hour Early Tomorrow? The Manager Was Asking...',
      time: '4h Ago',
    },
    {
      id: '3',
      type: 'confirmation',
      title: 'Offer Accepted',
      description: 'Confirmed! You Are Booked For The Friday Night Shift At Hotel Grand',
      time: '5h Ago',
    },
  ];

  const yesterdayNotifications: NotificationType[] = [
    {
      id: '4',
      type: 'payment',
      title: 'Payment Processed',
      description: 'Your Payment Of $150.00 For The Shift At The Burger Joint Has Been Processed.',
      time: '1d Ago',
    },
    {
      id: '5',
      type: 'rejection',
      title: 'Application Declined',
      description: 'Unfortunately, The Position At Seaside Cafe Has Been Filled.',
      time: '3d Ago',
    },
  ];

  const earlierNotifications: NotificationType[] = [
    {
      id: '6',
      type: 'view',
      title: 'Profile View',
      description: '5 Employers Viewed Your Profile This Week. Keep Your Availability Updated!',
      time: 'Oct 27',
    },
  ];

  const renderIcon = (type: string, isNew: boolean) => {
    const iconSize = 28;
    
    switch (type) {
      case 'shift':
        return (
          <View style={styles.iconContainer}>
            <BriefcaseBusiness width={iconSize} height={iconSize} color= '#2BEE79' />
            {isNew && <View style={styles.newDot} />}
          </View>
        );
      case 'message':
        return (
          <View style={styles.iconContainer}>
            <MessageSquareText width={iconSize} height={iconSize} color= '#60A5FA' />
          </View>
        );
      case 'confirmation':
        return (
          <View style={styles.iconContainer}>
            <CircleCheck width={iconSize} height={iconSize} color= '#525252' fill= '#2BEE79' />
          </View>
        );
      case 'payment':
        return (
          <View style={styles.iconContainer}>
            <WalletIcon width={iconSize} height={iconSize} color="#EAB308" />
          </View>
        );
      case 'rejection':
        return (
          <View style={styles.iconContainer}>
            <View style={styles.iconContainerRed}>
              <X width={22} height={22} color= '#525252' />
            </View>
          </View>
        );
      case 'view':
        return (
          <View style={styles.iconContainer}>
            <Eye width={iconSize} height={iconSize} color= '#956BC3' />
          </View>
        );
      default:
        return null;
    }
  };

  const renderNotificationItem = (notification: NotificationType) => (
    <TouchableOpacity key={notification.id} style={styles.notificationCard} activeOpacity={0.7}>
      {renderIcon(notification.type, notification.isNew || false)}
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{notification.title}</Text>
          <Text style={styles.notificationTime}>{notification.time}</Text>
        </View>
        <Text style={styles.notificationDescription} numberOfLines={2}>
          {notification.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const filteredToday = todayNotifications.filter(n =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredYesterday = yesterdayNotifications.filter(n =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredEarlier = earlierNotifications.filter(n =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} activeOpacity={0.7}>
          <ArrowLeft width={24} height={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
        <TouchableOpacity onPress={handleMarkAllRead} activeOpacity={0.7}>
          <Text style={styles.markAllRead}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Search width={24} height={24} color="white" />
        <TextInput
          placeholder="Search Notification"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filteredToday.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Today</Text>
            {filteredToday.map(renderNotificationItem)}
          </>
        )}

        {filteredYesterday.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Yesterday</Text>
            {filteredYesterday.map(renderNotificationItem)}
          </>
        )}

        {filteredEarlier.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Earlier</Text>
            {filteredEarlier.map(renderNotificationItem)}
          </>
        )}

        {filteredToday.length === 0 && filteredYesterday.length === 0 && filteredEarlier.length === 0 && (
          <Text style={styles.noResults}>No notifications found</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationScreen;