export const COLOR_OPTIONS = {
  red: 'bg-red-300',
  blue: 'bg-blue-300',
  green: 'bg-green-300',
  yellow: 'bg-yellow-200',
  purple: 'bg-purple-300',
  orange: 'bg-orange-300',
  gray: 'bg-gray-400',
  pink: 'bg-pink-300',
  teal: 'bg-teal-200',
  indigo: 'bg-indigo-300',
} as const; 

export type ClanColor = keyof typeof COLOR_OPTIONS;