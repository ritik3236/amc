import {nextui} from '@nextui-org/theme';
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    safelist: [
        {
            pattern: /bg-(red|green|blue|orange|yellow)-(300|400|500|600)/,
        },
    ],
    theme: {
        extend: {
            keyframes: {
                move: {
                    '0%, 100%': {
                        transform: 'translate(0)',
                    },

                    '25%': {
                        transform: 'translate(20px, -20px)',
                    },
                    '50%': {
                        transform: ' translate(-20px, 20px)',
                    },
                    '75%': {
                        transform: 'translate(20px, 20px)',
                    },
                },
                'infinite-scroll': {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(-100%)' },
                },
            },
        },
        animation: {
            'infinite-scroll': 'infinite-scroll 25s linear infinite',
            'move': 'move 5s ease-in-out infinite',
        },
    },
    darkMode: 'class',
    plugins: [
        nextui(),
        plugin(function ({addUtilities}) {
            addUtilities({
                '.a-delay-1': {
                    'animation-delay': '1s',
                },
                '.a-delay-2': {
                    'animation-delay': '2s',
                },
                '.a-delay-3': {
                    'animation-delay': '3s',
                },
            });
        }),
    ],
};
