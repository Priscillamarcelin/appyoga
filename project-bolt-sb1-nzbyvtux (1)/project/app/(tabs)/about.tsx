import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CircleCheck as CheckCircle, Shield, Clock, Users } from 'lucide-react-native';
import { GradientBackground } from '@/components/GradientBackground';
import { Colors } from '@/constants/Colors';
import { aboutContent } from '@/constants/Data';

export default function AboutScreen() {
  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Sobre o Método</Text>
            <Text style={styles.subtitle}>
              Descubra o poder transformador do Yoga Facial
            </Text>
          </View>

          {/* Hero Image */}
          <View style={styles.heroContainer}>
            <Image
  source={{ uri: 'https://i.ibb.co/Mx68M5tM/cover-png.png' }} // <- link novo
  style={styles.heroImage}
  resizeMode="cover"
/>
          </View>

          {/* What is Facial Yoga */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{aboutContent.title}</Text>
            <Text style={styles.sectionText}>{aboutContent.description}</Text>
          </View>

          {/* Benefits */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Benefícios Comprovados</Text>
            <View style={styles.benefitsList}>
              {aboutContent.benefits.map((benefit, index) => (
                <View key={index} style={styles.benefitItem}>
                  <CheckCircle size={20} color={Colors.success} />
                  <Text style={styles.benefitText}>{benefit}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* How it Works */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Como Funciona</Text>
            <Text style={styles.sectionText}>
              O yoga facial trabalha fortalecendo os 57 músculos do rosto através de exercícios 
              específicos e controlados. Assim como o corpo, os músculos faciais respondem ao 
              exercício, tornando-se mais firmes, tonificados e definidos.
            </Text>
            
            <View style={styles.processContainer}>
              <View style={styles.processStep}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>1</Text>
                </View>
                <Text style={styles.stepTitle}>Aquecimento</Text>
                <Text style={styles.stepDescription}>
                  Preparamos os músculos com movimentos suaves
                </Text>
              </View>
              
              <View style={styles.processStep}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>2</Text>
                </View>
                <Text style={styles.stepTitle}>Exercícios</Text>
                <Text style={styles.stepDescription}>
                  Fortalecemos áreas específicas com técnicas direcionadas
                </Text>
              </View>
              
              <View style={styles.processStep}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>3</Text>
                </View>
                <Text style={styles.stepTitle}>Relaxamento</Text>
                <Text style={styles.stepDescription}>
                  Finalizamos com técnicas de relaxamento e massagem
                </Text>
              </View>
            </View>
          </View>

          {/* Features */}
          <View style={styles.featuresContainer}>
            <Text style={styles.sectionTitle}>Por que Escolher Nosso Método?</Text>
            
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <Shield size={32} color={Colors.primary} />
                <Text style={styles.featureTitle}>100% Natural</Text>
                <Text style={styles.featureDescription}>
                  Sem procedimentos invasivos, agulhas ou produtos químicos
                </Text>
              </View>
              
              <View style={styles.featureItem}>
                <Clock size={32} color={Colors.primary} />
                <Text style={styles.featureTitle}>Apenas 10 Minutos</Text>
                <Text style={styles.featureDescription}>
                  Exercícios práticos que cabem na sua rotina diária
                </Text>
              </View>
              
              <View style={styles.featureItem}>
                <Users size={32} color={Colors.primary} />
                <Text style={styles.featureTitle}>Milhares de Mulheres</Text>
                <Text style={styles.featureDescription}>
                  Mais de 10.000 mulheres já transformaram seus rostos
                </Text>
              </View>
            </View>
          </View>

          {/* Guarantee */}
          <View style={styles.guaranteeContainer}>
            <Text style={styles.guaranteeTitle}>Nossa Garantia</Text>
            <Text style={styles.guaranteeText}>{aboutContent.guarantee}</Text>
            <Text style={styles.guaranteeSubtext}>
              Se você não notar diferença nos primeiros 7 dias, oferecemos 
              suporte personalizado para ajustar sua prática.
            </Text>
          </View>

          {/* Call to Action */}
          <View style={styles.ctaContainer}>
            <Text style={styles.ctaTitle}>Pronta para Começar?</Text>
            <Text style={styles.ctaText}>
              Junte-se a milhares de mulheres que já descobriram o segredo 
              para um rosto mais jovem e radiante naturalmente.
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
  heroContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    height: 200,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  sectionContainer: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: Colors.text.primary,
    marginBottom: 12,
  },
  sectionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text.secondary,
    lineHeight: 24,
  },
  benefitsList: {
    gap: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  benefitText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text.secondary,
    lineHeight: 24,
    flex: 1,
  },
  processContainer: {
    marginTop: 16,
    gap: 16,
  },
  processStep: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.secondary,
    borderRadius: 12,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepNumberText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: Colors.white,
  },
  stepTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  stepDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  featuresContainer: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  featuresList: {
    gap: 20,
  },
  featureItem: {
    alignItems: 'center',
    padding: 16,
  },
  featureTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.text.primary,
    marginTop: 12,
    marginBottom: 8,
  },
  featureDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  guaranteeContainer: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: Colors.success,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  guaranteeTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: Colors.white,
    marginBottom: 12,
    textAlign: 'center',
  },
  guaranteeText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 24,
  },
  guaranteeSubtext: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.white,
    textAlign: 'center',
    lineHeight: 22,
    opacity: 0.9,
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
    textAlign: 'center',
  },
  ctaText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});