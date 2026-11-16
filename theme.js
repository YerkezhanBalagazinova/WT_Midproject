document.addEventListener("DOMContentLoaded", function () {

    const themeToggle = document.getElementById("themeToggle");

    function getSavedTheme() {
        try {
            return localStorage.getItem("hotelTheme");
        } catch (error) {
            return null;
        }
    }

    function saveTheme(theme) {
        try {
            localStorage.setItem("hotelTheme", theme);
        } catch (error) {
            console.log("Theme could not be saved.");
        }
    }

    if (getSavedTheme() === "dark") {
        document.body.classList.add("dark-mode");
    }

    function updateButton() {
        if (themeToggle) {
            if (document.body.classList.contains("dark-mode")) {
                themeToggle.textContent = "☀️ Light Mode";
            } else {
                themeToggle.textContent = "🌙 Dark Mode";
            }
        }
    }

    updateButton();

    // Toggle Dark Mode
    if (themeToggle) {
        themeToggle.addEventListener("click", function () {

            document.body.classList.toggle("dark-mode");

            if (document.body.classList.contains("dark-mode")) {
                saveTheme("dark");
            } else {
                saveTheme("light");
            }

            updateButton();
        });
    }

});