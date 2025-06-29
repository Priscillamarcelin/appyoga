import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Play, Calendar, Heart, MessageCircle, Info, Sparkles, Gift } from 'lucide-react-native';
import { GradientBackground } from '@/components/GradientBackground';
import { Button } from '@/components/Button';
import { ProgressBar } from '@/components/ProgressBar';
import { useProgress } from '@/contexts/ProgressContext';
import { Colors } from '@/constants/Colors';

export default function HomeScreen() {
  const { getCurrentDay, getProgressPercentage } = useProgress();
  const currentDay = getCurrentDay();
  const progressPercentage = getProgressPercentage();

  const menuItems = [
    {
      title: 'Iniciar Desafio',
      subtitle: `Dia ${currentDay} de 28`,
      icon: Play,
      color: Colors.primary,
      onPress: () => router.push('/challenge')
    },
    {
      title: 'Ver Progresso',
      subtitle: `${progressPercentage}% concluído`,
      icon: Calendar,
      color: Colors.primary,
      onPress: () => router.push('/challenge')
    },
    {
      title: 'Dicas de Autocuidado',
      subtitle: 'Cuide-se por completo',
      icon: Heart,
      color: '#E17055',
      onPress: () => router.push('/tips')
    },
    {
      title: 'Depoimentos',
      subtitle: 'Histórias inspiradoras',
      icon: MessageCircle,
      color: '#74B9FF',
      onPress: () => router.push('/testimonials')
    },
    {
      title: 'Sobre o Método',
      subtitle: 'Entenda o yoga facial',
      icon: Info,
      color: '#FDCB6E',
      onPress: () => router.push('/about')
    },
    {
      title: 'Bônus',
      subtitle: 'Conteúdos extras exclusivos',
      icon: Gift,
      color: '#A29BFE',
      onPress: () => router.push('/bonuses')
    }
  ];

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Sparkles size={32} color={Colors.primary} />
            </View>
            <Text style={styles.title}>Yoga Facial</Text>
            <Text style={styles.subtitle}>28 Dias</Text>
            <Text style={styles.welcome}>
              Bem-vinda ao seu programa de rejuvenescimento natural
            </Text>
          </View>

          {/* Hero Image */}
          <View style={styles.heroContainer}>
            <Image
              source={{ uri: 'https://i.ibb.co/Swx2BYYD/cover-png.png' }}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <View style={styles.heroOverlay}>
              <Text style={styles.heroText}>Transforme seu rosto naturalmente</Text>
            </View>
          </View>

          {/* Progress Section */}
          {progressPercentage > 0 && (
            <View style={styles.progressSection}>
              <Text style={styles.progressTitle}>Seu Progresso</Text>
              <ProgressBar progress={progressPercentage} height={12} />
              <Text style={styles.progressText}>{progressPercentage}% concluído</Text>
            </View>
          )}

          {/* Menu Items */}
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={item.onPress}
                activeOpacity={0.8}
              >
                <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                  <item.icon size={24} color={Colors.white} />
                </View>
                <View style={styles.menuContent}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Call to Action */}
          <View style={styles.ctaContainer}>
            <Text style={styles.ctaTitle}>Pronta para começar?</Text>
            <Text style={styles.ctaSubtitle}>
              Apenas 10 minutos por dia para um rosto mais jovem e radiante
            </Text>
            <Button
              title="Começar Agora"
              onPress={() => router.push('/challenge')}
              size="large"
              style={styles.ctaButton}
            />
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: Colors.primary,
    marginBottom: 8,
  },
  welcome: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  heroContainer: {
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
    height: 200,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
  },
  heroText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.white,
    textAlign: 'center',
  },
  progressSection: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    backgroundColor: Colors.white,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  progressTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.text.primary,
    marginBottom: 12,
    textAlign: 'center',
  },
  progressText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginTop: 8,
  },
  menuContainer: {
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 16,
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  menuSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
  },
  ctaContainer: {
    margin: 20,
    padding: 24,
    backgroundColor: Colors.white,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  ctaTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: Colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  ctaSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text.secondary,
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 24,
  },
  ctaButton: {
    minWidth: 200,
  },
});
