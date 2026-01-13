import { StyleSheet } from 'react-native';

const COLORS = {
  background: '#111111',
  cardBg: '#000000',
  cardBorder: '#374151',
  primary: '#FFD900',
  white: '#FFFFFF',
  gray: '#9CA3AF',
  darkGray: '#6B7280',
  green: '#84CC16',
  teal: '#10B981',
  darkCard: '#181711',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 500,
    color: COLORS.white,
    fontFamily: 'InterDisplayMedium',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
});

export default styles;