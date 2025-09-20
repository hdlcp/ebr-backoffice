// src/config/colors.ts

export const colors = {
  // Couleurs principales
  primary: '#007A3F',      // Vert principal
  container: '#E4D1B0',    // Beige container
  white: '#FFFFFF',        // Blanc
  danger: '#D32F2F',       // Rouge danger
  
  // Couleurs de texte
  text: {
    primary: '#333333',
    secondary: '#4A5568',
    light: '#718096'
  },
  
  // Couleurs de fond
  background: {
    primary: '#F1EFEF',     // Background général
    secondary: '#F7FAFC',
    tertiary: '#EDF2F7'
  },
  
  // Couleurs d'état
  success: '#007A3F',
  error: '#FF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
  
  // Couleurs de bordure
  border: {
    light: '#E2E8F0',
    medium: '#CBD5E0',
    dark: '#A0AEC0'
  },
  
  // Ombre
  shadow: 'rgba(0, 0, 0, 0.5)'
} as const;