/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./client/src/**/*.{html,ts,tsx,js,jsx}'],
    theme: {
        extend: {},
    },
    plugins: [require('@tailwindcss/forms')],
};
