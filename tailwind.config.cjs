/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: ['class'],
    theme: {
        extend: {
            fontFamily: {
                'fira-code': ['Fira Code', 'monospace'],
            },
        },
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
        require('@headlessui/tailwindcss')({ prefix: 'ui' }),
    ],
}
