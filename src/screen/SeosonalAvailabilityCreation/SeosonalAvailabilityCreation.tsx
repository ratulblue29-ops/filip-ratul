import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  X,
  BriefcaseBusiness,
  CircleCheck,
  Calendar,
  ChevronLeft,
  ChevronRight,
  File,
  Eye,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

const COLORS = {
  border: '#2A2A2A',
};

const SeosonalAvailabilityCreationScreen = () => {
  const navigation = useNavigation();
  const [selectedRange, setSelectedRange] = useState({ start: 3, end: 7 });
  const [locations, setLocations] = useState([
    'San Francisco, CA',
    'Mykonos, Gr',
    'New York, NY',
    'Austin, TX',
  ]);
  const [aboutText, setAboutText] = useState('');
  const [isActive, setIsActive] = useState(true);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const removeLocation = (index: number) => {
    const updatedLocations = locations.filter((_, i) => i !== index);
    setLocations(updatedLocations);
  };

  const renderCalendar = () => {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const dates = Array.from({ length: 35 }, (_, i) => i - 2);

    return (
      <View style={styles.calendarContainer}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity activeOpacity={0.7}>
            <ChevronLeft width={20} height={20} color='#FFD900' />
          </TouchableOpacity>
          <Text style={styles.calendarMonth}>February 2025</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <ChevronRight width={20} height={20} color='#FFD900' />
          </TouchableOpacity>
        </View>

        <View style={styles.calendarDays}>
          {days.map((day, i) => (
            <Text key={i} style={styles.dayHeader}>
              {day}
            </Text>
          ))}
        </View>

        <View style={styles.calendarGrid}>
          {dates.map((date, i) => {
            const isInRange = date >= selectedRange.start && date <= selectedRange.end;
            const isPrevMonth = date < 1;
            const isNextMonth = date > 28;
            const displayDate = isPrevMonth ? 28 + date : isNextMonth ? date - 28 : date;
            const isStartDate = date === selectedRange.start;
            const isEndDate = date === selectedRange.end;

            return (
              <TouchableOpacity
                key={i}
                style={[
                  styles.dateCell,
                  isInRange && styles.dateSelected,
                  isStartDate && styles.dateSelectedStart,
                  isEndDate && styles.dateSelectedEnd,
                ]}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.dateText,
                    (isPrevMonth || isNextMonth) && styles.dateInactive,
                    isInRange && styles.dateTextSelected,
                  ]}
                >
                  {displayDate > 0 ? displayDate : ''}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.calendarActions}>
          <TouchableOpacity
            style={styles.calendarCancelBtn}
            activeOpacity={0.7}
          >
            <Text style={styles.calendarCancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.calendarDoneBtn}
            activeOpacity={0.7}
          >
            <Text style={styles.calendarDoneText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} activeOpacity={0.7}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Create Availability</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.postText}>Post</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Job Details</Text>
          <Text style={styles.subsectionTitle}>Target Position</Text>
          <View style={styles.jobCard}>
            <BriefcaseBusiness width={20} height={20} color='#FFFFFF' />
            <Text style={styles.jobText}>Head Mixologist</Text>
            <CircleCheck width={20} height={20} color='#FFD900' />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Availability</Text>
          <View style={styles.labeldateRow}>
            <Text style={styles.dateLabel}>Start Date</Text>
            <Text style={styles.dateLabel}>End Date</Text>
          </View>
          <View style={styles.dateRow}>
            <TouchableOpacity
              style={styles.dateCard}
              activeOpacity={0.7}
            >
              <Calendar width={24} height={24} color='#ffffff' />
              <View style={styles.dateInfo}>
                <Text style={styles.dateValue}>Feb 03,{'\n'}2025</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dateCard}
              activeOpacity={0.7}
            >
              <Calendar width={24} height={24} color='#ffffff' />
              <View style={styles.dateInfo}>
                <Text style={styles.dateValue}>Feb 07,{'\n'}2025</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {renderCalendar()}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <Text style={styles.subsectionTitle}>Preferred Location</Text>
          <View style={styles.locationsContainer}>
            {locations && locations.length > 0 && locations.map((location, index) => (
              <View key={index} style={styles.locationChip}>
                <Text style={styles.locationText}>{location}</Text>
                <TouchableOpacity
                  onPress={() => removeLocation(index)}
                  activeOpacity={0.7}
                >
                  <X width={16} height={16} color='#FFFFFF' />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About You</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Describe your experience and what makes you perfect for this role..."
            placeholderTextColor='#9CA3AF'
            multiline
            numberOfLines={6}
            value={aboutText}
            onChangeText={setAboutText}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resume/CV</Text>
          <View style={styles.fileCard}>
            <View style={styles.fileLeft}>
              <File width={20} height={20} color='#FFD900' />
              <View>
                <Text style={styles.fileName}>Alex_mixologist_cv_2025.Pdf</Text>
                <Text style={styles.fileSubtext}>Uploaded 2 days ago</Text>
              </View>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <X width={20} height={20} color='#9CA3AF' />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.toggleCard}>
            <View style={styles.toggleLeft}>
              <Eye width={20} height={20} color='#FFD900' />
              <View>
                <Text style={styles.toggleTitle}>Active Post</Text>
                <Text style={styles.toggleSubtext}>
                  Immediately Visible To Employers
                </Text>
              </View>
            </View>
            <Switch
              value={isActive}
              onValueChange={setIsActive}
              trackColor={{ false: '#2A2A2A', true: '#FFD900' }}
              thumbColor='#FFFFFF'
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SeosonalAvailabilityCreationScreen;