export const LANGUAGES = [
    'php',
    'javascript',
    'typescript',
    'html',
    'css',
] as const

export type Language = (typeof LANGUAGES)[number]