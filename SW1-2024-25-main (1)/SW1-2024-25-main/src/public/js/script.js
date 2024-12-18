// Toggle between light and dark themes
themeToggle.addEventListener('click', () => {
    if (themeStylesheet.getAttribute('href') === '../css/dark.css') {
        themeStylesheet.setAttribute('href', '../css/light.css');
    } else {
        themeStylesheet.setAttribute('href', '../css/dark.css');
    }
});