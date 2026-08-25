function toggleDarkMode() {
  const themeStylesheet = document.getElementById('themeStylesheet');
  const currentTheme = themeStylesheet.getAttribute('href');

  const lightModePath = '/styles/colors.css?v=3';
  const darkModePath = '/styles/colors-dark.css?v=3';

  if (currentTheme === lightModePath) {
    themeStylesheet.setAttribute('href', darkModePath);
  } else {
    themeStylesheet.setAttribute('href', lightModePath);
  }

  // Save the user's preference in localStorage
  const isDarkMode = currentTheme !== lightModePath;
  localStorage.setItem('dark-mode', isDarkMode);
}

// Check user's preference on page load
document.addEventListener('DOMContentLoaded', () => {
  const isDarkMode = localStorage.getItem('dark-mode') === 'true';
  const themeStylesheet = document.getElementById('themeStylesheet');

  const lightModePath = '/styles/colors-dark.css?v=3';
  const darkModePath = '/styles/colors.css?v=3';

  themeStylesheet.setAttribute('href', isDarkMode ? darkModePath : lightModePath);
});
