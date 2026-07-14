// Top-bar behavior: theme toggle (persisted), mobile nav collapse, and a
// hide-on-scroll-down / reveal-on-scroll-up sticky bar. The correct theme is
// already applied before paint by the inline bootstrap in head.html; this file
// only handles user interaction and is loaded deferred.
(function () {
    "use strict";

    var root = document.documentElement;
    var LIGHT = "cc-light";
    var DARK = "cc-dark";
    var STORAGE_KEY = "theme";

    function currentTheme() {
        return root.getAttribute("data-theme") === DARK ? DARK : LIGHT;
    }

    function applyTheme(theme) {
        root.setAttribute("data-theme", theme);
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch (e) {
            /* storage unavailable — choice simply won't persist */
        }
    }

    // Theme toggle
    var themeToggle = document.querySelector("[data-theme-toggle]");
    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            applyTheme(currentTheme() === DARK ? LIGHT : DARK);
        });
    }

    // Mobile nav
    var navToggle = document.querySelector("[data-nav-toggle]");
    var mobileNav = document.querySelector("[data-mobile-nav]");

    function closeMobileNav() {
        if (mobileNav && !mobileNav.hasAttribute("hidden")) {
            mobileNav.setAttribute("hidden", "");
            if (navToggle) {
                navToggle.setAttribute("aria-expanded", "false");
            }
        }
    }

    if (navToggle && mobileNav) {
        navToggle.addEventListener("click", function () {
            var willOpen = mobileNav.hasAttribute("hidden");
            if (willOpen) {
                mobileNav.removeAttribute("hidden");
            } else {
                mobileNav.setAttribute("hidden", "");
            }
            navToggle.setAttribute("aria-expanded", String(willOpen));
        });
    }

    // Hide-on-scroll top bar
    var bar = document.querySelector("[data-topbar]");
    if (bar) {
        var lastY = window.pageYOffset || 0;
        var ticking = false;
        var threshold = 8;

        var update = function () {
            var y = window.pageYOffset || 0;
            if (Math.abs(y - lastY) > threshold) {
                if (y > lastY && y > bar.offsetHeight) {
                    bar.classList.add("is-hidden");
                    closeMobileNav();
                } else {
                    bar.classList.remove("is-hidden");
                }
                lastY = y;
            }
            ticking = false;
        };

        window.addEventListener(
            "scroll",
            function () {
                if (!ticking) {
                    window.requestAnimationFrame(update);
                    ticking = true;
                }
            },
            { passive: true }
        );
    }
})();
