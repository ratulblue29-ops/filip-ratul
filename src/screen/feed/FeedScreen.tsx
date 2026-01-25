import {
  Text,
  View,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';
import styles from './style';
import { Bell, Bookmark, Search } from 'lucide-react-native';
import MainDrawer from '../../components/feed/MainDrawer';
import Gig from '../../components/feed/Gig';
import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

const COLORS = {
  secondaryText: '#9E9E9E',
  yellow: '#fcd303',
};

const Drawer = createDrawerNavigator();

const FeedContent = ({ navigation }: any) => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('jobs')
      .where('status', '==', 'open')
      .onSnapshot(
        snapshot => {
          const jobsData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setJobs(jobsData);
          setLoading(false);
        },
        error => {
          console.error('Error:', error);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, []);

  const formatSchedule = (schedule: any) => {
    if (!schedule) return '';
    const date = new Date(schedule.date);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    };
    return `${date.toLocaleDateString('en-US', options)} • ${schedule.startTime}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.topRow}
          onPress={() => navigation.openDrawer()}
          activeOpacity={0.7}
        >
          <View>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?u=a' }}
              style={styles.avatar}
            />
          </View>
          <View>
            <Text style={styles.greetingText}>good morning</Text>
            <Text style={styles.nameText}>Alex</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('notification')} >
          <Bell width={24} height={24} color="white" />
          <View style={styles.notifDot} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Search width={24} height={24} color="white" />
        <TextInput
          placeholder="Search"
          placeholderTextColor={COLORS.secondaryText}
          style={styles.input}
        />
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={COLORS.yellow} />
        </View>
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={item => item.id}
          ListHeaderComponent={<Gig />}
          renderItem={({ item: gig }) => (
            <View style={styles.gigCard}>
              <View style={styles.row}>
                <Image
                  source={{ uri: 'https://i.pravatar.cc/150?u=' + gig.id }}
                  style={styles.gigAvatar}
                />

                <View style={styles.gigInfo}>
                  <View style={styles.rowBetween}>
                    <Text style={styles.gigTitle}>{gig.title}</Text>
                    <Bookmark width={24} height={24} color="#fff" />
                  </View>

                  <Text style={styles.locationText_gig}>
                    {gig.location?.city || 'Location'} • 3.1 Mi
                  </Text>

                  <View style={styles.rowBetween}>
                    <View style={styles.priceChip}>
                      <Text style={styles.priceChipText}>
                        €{gig.rate?.hourlyRate || 0}/Hr
                      </Text>
                    </View>
                    <Text style={styles.gigTime}>
                      {formatSchedule(gig.schedule)}
                    </Text>
                  </View>

                  {gig.requiredSkills && gig.requiredSkills.length > 0 && (
                    <View style={styles.tagRow}>
                      {gig.requiredSkills.map((skill: string, index: number) => (
                        <View key={index} style={styles.tag}>
                          <Text style={styles.tagText}>{skill}</Text>
                        </View>
                      ))}
                    </View>
                  )}

                  {gig.spotsLeft > 0 && (
                    <Text style={styles.spotsText}>{gig.spotsLeft} Spots Left</Text>
                  )}
                </View>
              </View>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const FeedScreen = () => {
  return (
    <Drawer.Navigator
      drawerContent={() => <MainDrawer />}
      screenOptions={{
        headerShown: false,
        drawerPosition: 'left',
        drawerType: 'front',
        overlayColor: 'rgba(255, 255, 255, 0.3)',
        swipeEnabled: true,
        drawerStyle: styles.drawerStyle,
      }}
    >
      <Drawer.Screen name="FeedContent" component={FeedContent} />
    </Drawer.Navigator>
  );
};

export default FeedScreen;