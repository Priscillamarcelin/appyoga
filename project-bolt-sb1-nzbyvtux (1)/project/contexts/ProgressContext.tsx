import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProgressContextType {
  completedDays: boolean[];
  favoriteTips: number[];
  markDayCompleted: (day: number) => void;
  toggleFavoriteTip: (tipIndex: number) => void;
  getCurrentDay: () => number;
  getProgressPercentage: () => number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completedDays, setCompletedDays] = useState<boolean[]>(new Array(28).fill(false));
  const [favoriteTips, setFavoriteTips] = useState<number[]>([]);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const savedProgress = await AsyncStorage.getItem('yoga_progress');
      const savedFavorites = await AsyncStorage.getItem('favorite_tips');
      
      if (savedProgress) {
        setCompletedDays(JSON.parse(savedProgress));
      }
      if (savedFavorites) {
        setFavoriteTips(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  const saveProgress = async (progress: boolean[]) => {
    try {
      await AsyncStorage.setItem('yoga_progress', JSON.stringify(progress));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const saveFavorites = async (favorites: number[]) => {
    try {
      await AsyncStorage.setItem('favorite_tips', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const markDayCompleted = (day: number) => {
    const newProgress = [...completedDays];
    newProgress[day - 1] = true;
    setCompletedDays(newProgress);
    saveProgress(newProgress);
  };

  const toggleFavoriteTip = (tipIndex: number) => {
    const newFavorites = favoriteTips.includes(tipIndex)
      ? favoriteTips.filter(i => i !== tipIndex)
      : [...favoriteTips, tipIndex];
    setFavoriteTips(newFavorites);
    saveFavorites(newFavorites);
  };

  const getCurrentDay = () => {
    return completedDays.findIndex(completed => !completed) + 1 || 28;
  };

  const getProgressPercentage = () => {
    const completed = completedDays.filter(Boolean).length;
    return Math.round((completed / 28) * 100);
  };

  return (
    <ProgressContext.Provider value={{
      completedDays,
      favoriteTips,
      markDayCompleted,
      toggleFavoriteTip,
      getCurrentDay,
      getProgressPercentage
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}