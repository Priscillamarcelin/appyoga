import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientBackground } from '@/components/GradientBackground';
import { Colors } from '@/constants/Colors';
import { Gift } from 'lucide-react-native';

const bonuses = [
  {
    title: 'E-book: Rosto Jovem Naturalmente',
    url: 'https://drive.google.com/file/d/1RHW29tI8A7EaJnO2yVwQKewl1QGH0ELI/view?usp=drive_link',
  },
  {
    title: 'Checklist Diário de Beleza',
    url: 'https://drive.google.com/file/d/1hiKGL_jiaX5Fcp5_WMbjd37WBZCohVgB/view?usp=drive_link',
  },
  {
    title: 'Guia: Alimentos que Rejuvenescem',
    url: 'https://drive.google.com/file/d/12SrMbRINe_HxCicxtdJ6a2FxLo1QeaNc/view?usp=drive_link',
  },
  {
    title: 'Planner de Autocuidado Semanal',
    url: 'https://drive.google.com/file/d/19M-1TbwZYBgshE41_9dUuMjvXsQ_Mt5k/view?usp=drive_link',
  },
  {
    title: 'Vídeo: Massagem Facial Relaxante',
    url: 'https://drive.google.com/file/d/1D00lUuuNn5RFqTfFdHE9THTZl9o7E6hg/view?usp=drive_link',
  },
  {
    title: 'Áudio de Afirmações Positivas',
    url: 'https://drive.google.com/file/d/1zTdrP9kHpJZjhAyp_zxkulspniKpuNQR/view?usp=drive_link',
  },
];

export default function BonusesScreen() {
  const openBonus = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          <Text style={styles.title}>🎁 Bônus Exclusivos</Text>
          <Text style={styles.description}>Aproveite todos os materiais complementares que preparamos para você:</Text>

          {bonuses.map((bonus, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => openBonus(bonus.url)}
            >
              <Gift color="white" size={20} />
              <Text style={styles.buttonText}>{bonus.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
    width: '100%',
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: 'white',
    marginLeft: 10,
    flexShrink: 1,
  },
});

