/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.js", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                'plex-serif': ['"IBM Plex Serif"', 'serif'],
              },
              // Define custom font weights for IBM Plex Serif
              fontWeight: {
                '100': '100',
                '200': '200',
                '300': '300',
                '400': '400',
                '500': '500',
                '600': '600',
                '700': '700',
              },
              // Define custom classes for different font styles and weights
              fontStyle: {
                normal: 'normal',
                italic: 'italic',
              },
            boxShadow: {
                'xl': 'shadow-[inset_0px_20px_20px_10px_#00000024]',
            },
            colors: {
                google: {
                    'text-gray': '#3c4043',
                    'button-blue': '#1a73e8',
                    'button-blue-hover': '#5195ee',
                    'button-dark': '#202124',
                    'button-dark-hover': '#555658',
                    'button-border-light': '#dadce0',
                    'logo-blue': '#4285f4',
                    'logo-green': '#34a853',
                    'logo-yellow': '#fbbc05',
                    'logo-red': '#ea4335',
                },
            },
            animation: {
                slidein300: "slidein 1s ease 300ms forwards",
                slidein500: "slidein 1s ease 500ms forwards",
                slidein700: "slidein 1s ease 700ms forwards",
            },
            keyframes: {
                slidein: {
                    '0%': { transform: 'translateY(-100%)', opacity: 0 },
                    '100%': { transform: 'translateY(0%)', opacity: 1 },
                }
            }
        },
    },
    plugins: [],
};
