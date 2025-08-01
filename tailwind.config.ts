import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				// Base colors
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				
				// Glassmorphism colors
				glass: {
					bg: 'hsl(var(--glass-bg))',
					border: 'hsl(var(--glass-border))',
					shadow: 'hsl(var(--glass-shadow))'
				},
				
				// Romantic palette
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					light: 'hsl(var(--primary-light))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					light: 'hsl(var(--secondary-light))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
					light: 'hsl(var(--accent-light))'
				},
				
				// Special colors
				heart: {
					DEFAULT: 'hsl(var(--heart))',
					glow: 'hsl(var(--heart-glow))'
				},
				
				// Button colors
				button: {
					glass: 'hsl(var(--button-glass))',
					hover: 'hsl(var(--button-hover))',
					glow: 'hsl(var(--button-glow))'
				},
				
				// Text colors
				text: {
					primary: 'hsl(var(--text-primary))',
					secondary: 'hsl(var(--text-secondary))',
					light: 'hsl(var(--text-light))'
				},
				
				// Confetti colors
				confetti: {
					pink: 'hsl(var(--confetti-pink))',
					purple: 'hsl(var(--confetti-purple))',
					blue: 'hsl(var(--confetti-blue))',
					yellow: 'hsl(var(--confetti-yellow))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
