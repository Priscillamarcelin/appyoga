import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Video, ResizeMode } from 'expo-av';
import { CircleCheck as CheckCircle, Trophy } from 'lucide-react-native';
import { GradientBackground } from '@/components/GradientBackground';
import { Button } from '@/components/Button';
import { ProgressBar } from '@/components/ProgressBar';
import { useProgress } from '@/contexts/ProgressContext';
import { Colors } from '@/constants/Colors';
import { exerciseData } from '@/constants/Data';
import { WebView } from 'react-native-webview';

export default function ChallengeScreen() {
  const { completedDays, markDayCompleted, getCurrentDay, getProgressPercentage } = useProgress();
  const [selectedDay, setSelectedDay] = useState(getCurrentDay());
  const currentDay = getCurrentDay();
  const progressPercentage = getProgressPercentage();

  const handleCompleteDay = () => {
    markDayCompleted(selectedDay);
    Alert.alert(
      'Parabéns! 🎉',
      `Você completou o dia ${selectedDay}! Continue assim, você está no caminho certo para um rosto mais jovem e radiante.`,
      [{ text: 'Continuar', style: 'default' }]
    );
  };

  const getExerciseForDay = (day: number) => {
    return exerciseData.find(exercise => exercise.day === day) || exerciseData[0];
  };

  const getMotivationalMessage = () => {
    const completed = completedDays.filter(Boolean).length;
    if (completed === 0) return "Hoje você dá o primeiro passo! 🌱";
    if (completed === 7) return "Uma semana completa! Você já pode sentir a diferença? ✨";
    if (completed === 14) return "Duas semanas! Sua dedicação está transformando seu rosto! 💫";
    if (completed === 21) return "Três semanas! Você está quase lá, guerreira! 🔥";
    if (completed === 28) return "PARABÉNS! Você completou o desafio! Você é incrível! 🏆";
    return "Cada dia você fica mais radiante! Continue! 💖";
  };

  const getEmbedUrl = (url: string) => {
    if (url.includes("watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }
    if (url.includes("youtu.be")) {
      const id = url.split("youtu.be/")[1];
      return `https://www.youtube.com/embed/${id}`;
    }
    return url;
  };

  const selectedExercise = getExerciseForDay(selectedDay);

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Desafio 28 Dias</Text>
            <Text style={styles.subtitle}>{getMotivationalMessage()}</Text>
            <ProgressBar progress={progressPercentage} height={10} style={styles.progressBar} />
            <Text style={styles.progressText}>{progressPercentage}% concluído</Text>
          </View>

          <View style={styles.exerciseContainer}>
            <View style={styles.exerciseHeader}>
              <Text style={styles.dayNumber}>Dia {selectedDay}</Text>
              <Text style={styles.exerciseTitle}>{selectedExercise.title}</Text>
              <Text style={styles.exerciseDescription}>{selectedExercise.description}</Text>
            </View>

            <View style={styles.videoContainer}>
              {selectedExercise.videoUrl.trim().includes("youtube.com") || selectedExercise.videoUrl.trim().includes("youtu.be") ? (
                Platform.OS === 'web' ? (
                  <View style={{ width: "100%", height: "100%" }}>
                    <iframe
                      src={getEmbedUrl(selectedExercise.videoUrl)}
                      style={{ width: "100%", height: "100%", border: "none" }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Vídeo"
                    />
                  </View>
                ) : (
                  <WebView
                    source={{ uri: selectedExercise.videoUrl }}
                    javaScriptEnabled
                    domStorageEnabled
                    allowsFullscreenVideo
                    style={styles.video}
                  />
                )
              ) : (
                <Video
                  source={{ uri: selectedExercise.videoUrl }}
                  style={styles.video}
                  useNativeControls
                  resizeMode={ResizeMode.CONTAIN}
                  shouldPlay={false}
                />
              )}
            </View>

            <View style={styles.motivationContainer}>
              <Text style={styles.motivationText}>{selectedExercise.motivation}</Text>
            </View>

            <View style={styles.actionButtons}>
              {!completedDays[selectedDay - 1] ? (
                <Button
                  title="Marcar como Concluído"
                  onPress={handleCompleteDay}
                  size="large"
                  style={styles.completeButton}
                />
              ) : (
                <View style={styles.completedContainer}>
                  <CheckCircle size={24} color={Colors.success} />
                  <Text style={styles.completedText}>Dia Concluído!</Text>
                </View>
              )}

              {selectedDay < 28 && completedDays[selectedDay - 1] && (
                <Button
                  title="Próximo Dia"
                  onPress={() => setSelectedDay(selectedDay + 1)}
                  variant="secondary"
                  size="large"
                  style={styles.nextButton}
                />
              )}
            </View>
          </View>

          <View style={styles.daysContainer}>
            <Text style={styles.daysTitle}>Todos os Dias</Text>
            <View style={styles.daysGrid}>
              {Array.from({ length: 28 }, (_, index) => {
                const day = index + 1;
                const isCompleted = completedDays[index];
                const isCurrent = day === currentDay;
                const isSelected = day === selectedDay;

                return (
                  <TouchableOpacity
                    key={day}
                    style={[
                      styles.dayButton,
                      isCompleted && styles.dayButtonCompleted,
                      isCurrent && styles.dayButtonCurrent,
                      isSelected && styles.dayButtonSelected
                    ]}
                    onPress={() => setSelectedDay(day)}
                    activeOpacity={0.8}
                  >
                    {isCompleted ? (
                      <CheckCircle size={16} color={Colors.white} />
                    ) : (
                      <Text style={[
                        styles.dayButtonText,
                        isSelected && styles.dayButtonTextSelected
                      ]}>
                        {day}
                      </Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {progressPercentage === 100 && (
            <View style={styles.achievementContainer}>
              <Trophy size={48} color={Colors.warning} />
              <Text style={styles.achievementTitle}>Desafio Completo!</Text>
              <Text style={styles.achievementText}>
                Você completou os 28 dias! Seu rosto está mais jovem, firme e radiante. 
                Parabéns pela sua dedicação!
              </Text>
            </View>
          )}
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
    marginBottom: 16,
  },
  progressBar: {
    width: '100%',
    marginBottom: 8,
  },
  progressText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.text.secondary,
  },
  exerciseContainer: {
    margin: 20,
    backgroundColor: Colors.white,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  exerciseHeader: {
    padding: 20,
    alignItems: 'center',
  },
  dayNumber: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.primary,
    marginBottom: 8,
  },
  exerciseTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: Colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  exerciseDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  videoContainer: {
    height: 240,
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
  },
  motivationContainer: {
    padding: 20,
    backgroundColor: Colors.secondary,
  },
  motivationText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.text.primary,
    textAlign: 'center',
    lineHeight: 24,
    fontStyle: 'italic',
  },
  actionButtons: {
    padding: 20,
    gap: 12,
  },
  completeButton: {
    backgroundColor: Colors.success,
  },
  completedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  completedText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.success,
  },
  nextButton: {
    backgroundColor: Colors.primary,
  },
  daysContainer: {
    margin: 20,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  daysTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.text.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  dayButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  dayButtonCompleted: {
    backgroundColor: Colors.success,
  },
  dayButtonCurrent: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  dayButtonSelected: {
    backgroundColor: Colors.primary,
  },
  dayButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.text.primary,
  },
  dayButtonTextSelected: {
    color: Colors.white,
  },
  achievementContainer: {
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
  achievementTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.text.primary,
    marginTop: 16,
    marginBottom: 12,
  },
  achievementText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});
