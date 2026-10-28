/**
 * Pure utility functions for portfolio logic, validation, theme management, and contact transmissions.
 */

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof ContactFormData, string>>;
}

export type ThemeMode = 'green' | 'purple' | 'cyan';

export interface ThemeColors {
  name: ThemeMode;
  label: string;
  primary: string;
  secondary: string;
  borderGlow: string;
  rgb: string;
}

export const THEME_CONFIGS: Record<ThemeMode, ThemeColors> = {
  green: {
    name: 'green',
    label: 'Hacker Green',
    primary: '#B6FF5C',
    secondary: '#46E7FF',
    borderGlow: 'rgba(182, 255, 92, 0.4)',
    rgb: '182, 255, 92',
  },
  purple: {
    name: 'purple',
    label: 'Cyber Purple',
    primary: '#A855F7',
    secondary: '#46E7FF',
    borderGlow: 'rgba(168, 85, 247, 0.4)',
    rgb: '168, 85, 247',
  },
  cyan: {
    name: 'cyan',
    label: 'Neon Cyan',
    primary: '#46E7FF',
    secondary: '#B6FF5C',
    borderGlow: 'rgba(70, 231, 255, 0.4)',
    rgb: '70, 231, 255',
  },
};

/**
 * Validates the contact form inputs
 */
export function validateContactForm(data: Partial<ContactFormData>): ValidationResult {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  const trimmedName = data.name ? data.name.trim() : '';
  const trimmedEmail = data.email ? data.email.trim() : '';
  const trimmedMessage = data.message ? data.message.trim() : '';

  if (!trimmedName) {
    errors.name = 'Identification required: please enter your name.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail) {
    errors.email = 'Comms link required: please enter your email.';
  } else if (!emailRegex.test(trimmedEmail)) {
    errors.email = 'Invalid email syntax detected.';
  }

  if (!trimmedMessage) {
    errors.message = 'Payload empty: please enter your message.';
  } else if (trimmedMessage.length < 10) {
    errors.message = 'Message must be at least 10 characters for transmission.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Generates an encrypted transmission ID
 */
export function generateTransmissionId(timestamp: number = Date.now()): string {
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TX-${timestamp.toString(36).toUpperCase()}-${rand}`;
}

/**
 * Formats a terminal timestamp
 */
export function formatTerminalTimestamp(dateInput: Date | number | string = new Date()): string {
  const d = new Date(dateInput);
  const pad = (n: number) => n.toString().padStart(2, '0');
  const year = d.getUTCFullYear();
  const month = pad(d.getUTCMonth() + 1);
  const day = pad(d.getUTCDate());
  const hours = pad(d.getUTCHours());
  const minutes = pad(d.getUTCMinutes());
  const seconds = pad(d.getUTCSeconds());
  return `${year}.${month}.${day} // ${hours}:${minutes}:${seconds} UTC`;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'languages' | 'tools' | 'datascience';
  status: string;
  description: string;
  iconName: string;
}

/**
 * Filters skills by category
 */
export function filterSkills(skills: SkillItem[], activeCategory: string): SkillItem[] {
  if (activeCategory === 'all') return skills;
  return skills.filter((skill) => skill.category === activeCategory);
}
