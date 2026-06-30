/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        // 1. Core directories
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",

        // 2. Add this explicitly if your components directory is in the root:
        "./components/admin/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {},
    },
    plugins: []
}