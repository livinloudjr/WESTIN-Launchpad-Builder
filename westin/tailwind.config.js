module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: { extend: {
    colors: { ink: '#0B0A0C', panel: '#121013', line: '#2A2620', mute: '#9A9285', spark: '#D9C7A0', ok: '#8FB996', ivory: '#EFE9DD' },
    fontFamily: { display: ['var(--font-display)', 'serif'], sans: ['var(--font-body)', 'system-ui', 'sans-serif'] }
  } }
};
