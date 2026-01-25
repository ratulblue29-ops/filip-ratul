import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../../screen/feed/style';
import FeedCard from './FeedCard';
import firestore from '@react-native-firebase/firestore';

const COLORS = {
  yellow: '#fcd303',
};

const Gig = () => {
  const [recommendedJobs, setRecommendedJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('jobs')
      .where('status', '==', 'open')
      .limit(2) 
      .onSnapshot(
        snapshot => {
          const jobsData = snapshot.docs.map(doc => {
            const data = doc.data();
            
            return {
              id: doc.id,
              name: data.title || 'N/A',
              role: data.type || 'N/A',
              rate: `€${data.rate?.hourlyRate || 0}`,
              location: `${data.location?.city || 'Location'} • 3.1 Mi`,
              badge: data.spotsLeft > 0 ? `${data.spotsLeft} Spots Left` : 'Full',
              availability: formatAvailability(data.schedule),
              tags: data.requiredSkills || [],
              image: data.bgImage || 'No image',
            };
          });
          setRecommendedJobs(jobsData);
          setLoading(false);
        },
        error => {
          console.error('Error fetching recommended jobs:', error);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, []);

  const formatAvailability = (schedule: any) => {
    if (!schedule) return 'Flexible';
    
    const date = new Date(schedule.date);
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
    };
    return `${date.toLocaleDateString('en-US', options)} • ${schedule.startTime} - ${schedule.endTime}`;
  };

  return (
    <View>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Recommended For You</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={{ paddingVertical: 20, alignItems: 'center' }}>
          <ActivityIndicator size="small" color={COLORS.yellow} />
        </View>
      ) : (
        <FlatList
          data={recommendedJobs}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <FeedCard item={item} />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={{ color: '#9E9E9E', textAlign: 'center', paddingVertical: 20 }}>
              No recommended jobs available
            </Text>
          }
        />
      )}

      <Text style={styles.sectionTitle}>Newest Availabilities</Text>
    </View>
  );
};

export default Gig;