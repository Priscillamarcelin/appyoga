import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Star, MessageCircle, Send } from 'lucide-react-native';
import { GradientBackground } from '@/components/GradientBackground';
import { Button } from '@/components/Button';
import { Colors } from '@/constants/Colors';
import { testimonials } from '@/constants/Data';

export default function TestimonialsScreen() {
  const [showForm, setShowForm] = useState(false);
  const [userTestimonial, setUserTestimonial] = useState('');
  const [userName, setUserName] = useState('');

  const handleSubmitTestimonial = () => {
    if (!userName.trim() || !userTestimonial.trim()) {
      Alert.alert('Ops!', 'Por favor, preencha seu nome e depoimento.');
      return;
    }

    Alert.alert(
      'Obrigada! 💖',
      'Seu depoimento foi enviado com sucesso! Ele será revisado e pode aparecer na nossa lista de histórias inspiradoras.',
      [
        {
          text: 'Ok',
          onPress: () => {
            setShowForm(false);
            setUserTestimonial('');
            setUserName('');
          }
        }
      ]
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        color={index < rating ? Colors.warning : Colors.accent}
        fill={index < rating ? Colors.warning : 'transparent'}
      />
    ));
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Depoimentos</Text>
            <Text style={styles.subtitle}>
              Histórias reais de mulheres que transformaram seus rostos
            </Text>
          </View>

          {/* Testimonials List */}
          <View style={styles.testimonialsContainer}>
            {testimonials.map((testimonial) => (
              <View key={testimonial.id} style={styles.testimonialCard}>
                <View style={styles.testimonialHeader}>
                  <View style={styles.authorInfo}>
                    <Text style={styles.authorName}>{testimonial.name}</Text>
                    <Text style={styles.authorAge}>{testimonial.age} anos</Text>
                  </View>
                  <View style={styles.rating}>
                    {renderStars(testimonial.rating)}
                  </View>
                </View>
                
                <Text style={styles.testimonialText}>"{testimonial.text}"</Text>
                
                <View style={styles.testimonialFooter}>
                  <MessageCircle size={16} color={Colors.primary} />
                  <Text style={styles.verifiedText}>Depoimento verificado</Text>
                </View>
              </View>
            ))}
          </View>

          {/* User Testimonial Form */}
          {!showForm ? (
            <View style={styles.ctaContainer}>
              <Text style={styles.ctaTitle}>Sua História Importa!</Text>
              <Text style={styles.ctaText}>
                Você já começou ou completou o desafio? Compartilhe sua experiência 
                e inspire outras mulheres a transformarem seus rostos naturalmente.
              </Text>
              <Button
                title="Quero deixar meu depoimento"
                onPress={() => setShowForm(true)}
                size="large"
                style={styles.ctaButton}
              />
            </View>
          ) : (
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Seu Depoimento</Text>
              <Text style={styles.formSubtitle}>
                Conte sua experiência com o Yoga Facial 28 Dias
              </Text>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Seu nome</Text>
                <TextInput
                  style={styles.textInput}
                  value={userName}
                  onChangeText={setUserName}
                  placeholder="Como você gostaria de ser chamada?"
                  placeholderTextColor={Colors.text.secondary}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Sua experiência</Text>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  value={userTestimonial}
                  onChangeText={setUserTestimonial}
                  placeholder="Conte como foi sua experiência com o yoga facial. Como você se sente? Que mudanças notou? Qual foi o impacto na sua autoestima?"
                  placeholderTextColor={Colors.text.secondary}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
              
              <View style={styles.formButtons}>
                <Button
                  title="Cancelar"
                  onPress={() => setShowForm(false)}
                  variant="outline"
                  size="medium"
                  style={styles.cancelButton}
                />
                <Button
                  title="Enviar"
                  onPress={handleSubmitTestimonial}
                  size="medium"
                  style={styles.submitButton}
                />
              </View>
            </View>
          )}

          {/* Statistics */}
          <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>Resultados Comprovados</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>95%</Text>
                <Text style={styles.statLabel}>Notaram diferença em 7 dias</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>87%</Text>
                <Text style={styles.statLabel}>Completaram os 28 dias</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>92%</Text>
                <Text style={styles.statLabel}>Recomendariam para amigas</Text>
              </View>
            </View>
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
  testimonialsContainer: {
    paddingHorizontal: 20,
  },
  testimonialCard: {
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
  testimonialHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.text.primary,
  },
  authorAge: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
  },
  rating: {
    flexDirection: 'row',
    gap: 2,
  },
  testimonialText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text.primary,
    lineHeight: 24,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  testimonialFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  verifiedText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: Colors.primary,
  },
  ctaContainer: {
    margin: 20,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 24,
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
    marginBottom: 12,
    textAlign: 'center',
  },
  ctaText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  ctaButton: {
    minWidth: 250,
  },
  formContainer: {
    margin: 20,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  formTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: Colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  formSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.accent,
    borderRadius: 12,
    padding: 12,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text.primary,
    backgroundColor: Colors.background,
  },
  textArea: {
    height: 100,
  },
  formButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
  },
  submitButton: {
    flex: 1,
  },
  statsContainer: {
    margin: 20,
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statsTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: Colors.white,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.white,
    textAlign: 'center',
    lineHeight: 16,
  },
});