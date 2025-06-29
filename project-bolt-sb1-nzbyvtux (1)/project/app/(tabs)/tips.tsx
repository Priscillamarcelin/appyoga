import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, Droplets, Moon, Sun, Wind, Circle as XCircle } from 'lucide-react-native';
import { GradientBackground } from '@/components/GradientBackground';
import { useProgress } from '@/contexts/ProgressContext';
import { Colors } from '@/constants/Colors';
import { selfCareTips } from '@/constants/Data';

const iconMap = {
  droplets: Droplets,
  moon: Moon,
  sun: Sun,
  wind: Wind,
  heart: Heart,
  'x-circle': XCircle,
};

export default function TipsScreen() {
  const { favoriteTips, toggleFavoriteTip } = useProgress();

  const getIconComponent = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || Heart;
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Dicas de Autocuidado</Text>
            <Text style={styles.subtitle}>
              Cuide-se por completo para potencializar os resultados
            </Text>
          </View>

          {/* Tips List */}
          <View style={styles.tipsContainer}>
            {selfCareTips.map((tip) => {
              const IconComponent = getIconComponent(tip.icon);
              const isFavorite = favoriteTips.includes(tip.id);

              return (
                <View key={tip.id} style={styles.tipCard}>
                  <View style={styles.tipHeader}>
                    <View style={styles.tipIconContainer}>
                      <IconComponent size={24} color={Colors.primary} />
                    </View>
                    <TouchableOpacity
                      style={[
                        styles.favoriteButton,
                        isFavorite && styles.favoriteButtonActive
                      ]}
                      onPress={() => toggleFavoriteTip(tip.id)}
                      activeOpacity={0.8}
                    >
                      <Heart 
                        size={20} 
                        color={isFavorite ? Colors.white : Colors.error} 
                        fill={isFavorite ? Colors.white : 'transparent'}
                      />
                    </TouchableOpacity>
                  </View>
                  
                  <Text style={styles.tipTitle}>{tip.title}</Text>
                  <Text style={styles.tipDescription}>{tip.description}</Text>
                  
                  {isFavorite && (
                    <View style={styles.favoriteTag}>
                      <Text style={styles.favoriteTagText}>💖 Favorita</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>

          {/* Favorite Tips Section */}
          {favoriteTips.length > 0 && (
            <View style={styles.favoritesSection}>
              <Text style={styles.favoritesTitle}>Suas Dicas Favoritas</Text>
              <Text style={styles.favoritesSubtitle}>
                {favoriteTips.length} {favoriteTips.length === 1 ? 'dica favorita' : 'dicas favoritas'}
              </Text>
              
              <View style={styles.favoritesList}>
                {favoriteTips.map((tipId) => {
                  const tip = selfCareTips.find(t => t.id === tipId);
                  if (!tip) return null;
                  
                  const IconComponent = getIconComponent(tip.icon);
                  
                  return (
                    <View key={tip.id} style={styles.favoriteTipItem}>
                      <IconComponent size={20} color={Colors.primary} />
                      <Text style={styles.favoriteTipTitle}>{tip.title}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          )}

          {/* Call to Action */}
          <View style={styles.ctaContainer}>
            <Text style={styles.ctaTitle}>Lembre-se</Text>
            <Text style={styles.ctaText}>
              O yoga facial funciona melhor quando combinado com hábitos saudáveis. 
              Suas escolhas diárias fazem toda a diferença no resultado final!
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  tipsContainer: {
    paddingHorizontal: 20,
  },
  tipCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  tipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButtonActive: {
    backgroundColor: Colors.error,
  },
  tipTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  tipDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text.secondary,
    lineHeight: 24,
  },
  favoriteTag: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 12,
  },
  favoriteTagText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: Colors.text.primary,
  },
  favoritesSection: {
    margin: 20,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  favoritesTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: Colors.text.primary,
    marginBottom: 4,
    textAlign: 'center',
  },
  favoritesSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  favoritesList: {
    gap: 12,
  },
  favoriteTipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: Colors.secondary,
    borderRadius: 12,
  },
  favoriteTipTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.text.primary,
    flex: 1,
  },
  ctaContainer: {
    margin: 20,
    backgroundColor: Colors.accent,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  ctaTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: Colors.text.primary,
    marginBottom: 12,
  },
  ctaText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});