import React, { useState, useRef } from 'react';
import { 
  StyleSheet, View, Text, Image, FlatList, 
  Dimensions, TouchableOpacity, SafeAreaView 
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Ye data aapki screens ko define karta hai
const DATA = [
  {
    id: '1',
    title: 'One-stop solution for your financial needs',
    description: 'From loans to investments, find everything you need in one place',
    image: require('../../assets/images/onboarding11.png'), // File name check kar lein
  },
  {
    id: '2',
    title: 'Track your growth easily',
    description: 'Manage all your assets and liabilities in a single dashboard',
    image: require('../../assets/images/onboarding22.png'),
  },
  {
    id: '3',
    title: 'Secure and Reliable',
    description: 'Your data is encrypted and safe with our banking-grade security',
    image: require('../../assets/images/onboarding33.png'),
  },
];

const OnboardingScreen = ({ navigation }) => { // 1. navigation prop yahan add karein
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleNext = () => {
    if (currentIndex < DATA.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      // 2. Navigation logic: Onboarding khatam hone par Login pe bhejein
      navigation.navigate('Login'); 
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Slider */}
      <FlatList
        ref={flatListRef}
        data={DATA}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        keyExtractor={(item) => item.id}
      />

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {DATA.map((_, index) => (
          <View 
            key={index} 
            style={[styles.dot, currentIndex === index ? styles.activeDot : null]} 
          />
        ))}
      </View>

      {/* Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {currentIndex === DATA.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F0E13' }, // Dark background as per image
  slide: { width, alignItems: 'center', padding: 20, justifyContent: 'center' },
  image: { width: width * 0.8, height: height * 0.4, marginTop: 40 },
  textContainer: { marginTop: 40, alignItems: 'center' },
  title: { 
    fontSize: 24, fontWeight: 'bold', color: '#FFF', 
    textAlign: 'center', marginBottom: 15, paddingHorizontal: 20 
  },
  description: { 
    fontSize: 16, color: '#AAA', textAlign: 'center', 
    lineHeight: 24, paddingHorizontal: 30 
  },
  pagination: { 
    flexDirection: 'row', justifyContent: 'center', marginBottom: 40 
  },
  dot: { 
    height: 8, width: 8, borderRadius: 4, 
    backgroundColor: '#333', marginHorizontal: 5 
  },
  activeDot: { backgroundColor: '#4FD1C5', width: 20 }, // Teal color from image
  footer: { paddingHorizontal: 20, marginBottom: 30 },
  button: { 
    backgroundColor: '#4FD1C5', paddingVertical: 15, 
    borderRadius: 30, alignItems: 'center' 
  },
  buttonText: { color: '#0F0E13', fontSize: 18, fontWeight: 'bold' },
});

export default OnboardingScreen;