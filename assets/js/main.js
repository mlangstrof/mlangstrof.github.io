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

    // Missing-translation notice: shown when the visitor arrived via a fallback
    // language link (?nt=1). The flag is stripped from the URL so it never
    // persists on reload or when the link is shared.
    var NT_FLAG = "nt";
    var notice = document.querySelector("[data-nt-notice]");
    if (notice) {
        var params = new URLSearchParams(window.location.search);
        if (params.has(NT_FLAG)) {
            notice.removeAttribute("hidden");
            params.delete(NT_FLAG);
            var qs = params.toString();
            var clean =
                window.location.pathname +
                (qs ? "?" + qs : "") +
                window.location.hash;
            try {
                window.history.replaceState(null, "", clean);
            } catch (e) {
                /* replaceState unavailable — the flag simply remains in the URL */
            }
        }
        var dismiss = notice.querySelector("[data-nt-dismiss]");
        if (dismiss) {
            dismiss.addEventListener("click", function () {
                notice.setAttribute("hidden", "");
            });
        }
    }

    // Copy-to-clipboard buttons on highlighted code blocks. Hugo wraps code in
    // <div class="highlight">; a button is injected into each wrapper. Labels
    // come from data attributes on the prose container so they stay localized.
    var prose = document.querySelector("[data-prose]");
    if (prose && navigator.clipboard) {
        var copyLabel = prose.getAttribute("data-copy") || "Copy";
        var copiedLabel = prose.getAttribute("data-copied") || "Copied";
        var blocks = prose.querySelectorAll(".highlight");
        Array.prototype.forEach.call(blocks, function (block) {
            var code = block.querySelector("code");
            if (!code) {
                return;
            }
            var btn = document.createElement("button");
            btn.type = "button";
            btn.className = "code-copy";
            btn.textContent = copyLabel;
            btn.setAttribute("aria-label", copyLabel);
            block.appendChild(btn);
            btn.addEventListener("click", function () {
                navigator.clipboard.writeText(code.textContent).then(function () {
                    btn.textContent = copiedLabel;
                    btn.classList.add("is-copied");
                    window.setTimeout(function () {
                        btn.textContent = copyLabel;
                        btn.classList.remove("is-copied");
                    }, 2000);
                });
            });
        });
    }

    // Share: copy the current page URL to the clipboard. The link is read from
    // the live location so it always matches the canonical rendered page.
    var shareCopy = document.querySelector("[data-share-copy]");
    if (shareCopy && navigator.clipboard) {
        var originalTitle = shareCopy.getAttribute("title") || "";
        var copiedTitle = shareCopy.getAttribute("data-copied") || "Copied";
        shareCopy.addEventListener("click", function () {
            navigator.clipboard.writeText(window.location.href).then(function () {
                shareCopy.classList.add("is-copied");
                shareCopy.setAttribute("title", copiedTitle);
                shareCopy.setAttribute("aria-label", copiedTitle);
                window.setTimeout(function () {
                    shareCopy.classList.remove("is-copied");
                    shareCopy.setAttribute("title", originalTitle);
                    shareCopy.setAttribute("aria-label", originalTitle);
                }, 2000);
            }).catch(function () {
                /* Clipboard denied/unavailable: leave the button unchanged. */
            });
        });
    }

    // Self-hosted image zoom (no third-party / CDN library). Clicking a prose
    // image opens a lightweight overlay with the enlarged image; click anywhere
    // or press Escape to close. Transitions are handled in CSS and disabled for
    // users who prefer reduced motion.
    var proseForZoom = document.querySelector("[data-prose]");
    if (proseForZoom) {
        var zoomImages = proseForZoom.querySelectorAll("img");
        if (zoomImages.length) {
            var overlay = null;
            var overlayImg = null;
            var lastFocused = null;

            var closeZoom = function () {
                if (!overlay || !overlay.classList.contains("is-open")) {
                    return;
                }
                overlay.classList.remove("is-open");
                overlay.setAttribute("aria-hidden", "true");
                document.removeEventListener("keydown", onKeydown);
                if (lastFocused && lastFocused.focus) {
                    lastFocused.focus();
                }
            };

            var onKeydown = function (event) {
                if (event.key === "Escape") {
                    closeZoom();
                }
            };

            var buildOverlay = function () {
                overlay = document.createElement("div");
                overlay.className = "zoom-overlay";
                overlay.setAttribute("aria-hidden", "true");
                overlayImg = document.createElement("img");
                overlayImg.alt = "";
                overlay.appendChild(overlayImg);
                overlay.addEventListener("click", closeZoom);
                document.body.appendChild(overlay);
            };

            Array.prototype.forEach.call(zoomImages, function (img) {
                img.classList.add("is-zoomable");
                img.addEventListener("click", function () {
                    if (!overlay) {
                        buildOverlay();
                    }
                    overlayImg.src = img.currentSrc || img.src;
                    overlayImg.alt = img.alt || "";
                    lastFocused = document.activeElement;
                    overlay.classList.add("is-open");
                    overlay.setAttribute("aria-hidden", "false");
                    document.addEventListener("keydown", onKeydown);
                });
            });
        }
    }

    // Site search overlay. Fetches the per-language JSON index (scoped by the
    // build), filters client-side, and renders instant results. Keyboard:
    // "/" opens, Escape closes, Arrow keys move the selection, Enter opens it.
    var searchOverlay = document.querySelector("[data-search-overlay]");
    var searchOpeners = document.querySelectorAll("[data-search-open]");
    if (searchOverlay && searchOpeners.length) {
        var searchInput = searchOverlay.querySelector("[data-search-input]");
        var searchResults = searchOverlay.querySelector("[data-search-results]");
        var searchStatus = searchOverlay.querySelector("[data-search-status]");
        var searchClosers = searchOverlay.querySelectorAll("[data-search-close]");
        var indexUrl = searchOverlay.getAttribute("data-index");
        var labelSearching = searchOverlay.getAttribute("data-l-searching") || "";
        var labelNoMatch = searchOverlay.getAttribute("data-l-nomatch") || "";
        var labelHint = searchOverlay.getAttribute("data-l-hint") || "";

        var searchDocs = null;
        var searchLoading = false;
        var searchLastFocused = null;
        var activeIndex = -1;

        var capitalize = function (value) {
            if (!value) {
                return "";
            }
            return value.charAt(0).toUpperCase() + value.slice(1);
        };

        var setActive = function (index) {
            var items = searchResults.querySelectorAll("[role=option]");
            if (!items.length) {
                activeIndex = -1;
                return;
            }
            if (index < 0) {
                index = items.length - 1;
            }
            if (index >= items.length) {
                index = 0;
            }
            activeIndex = index;
            Array.prototype.forEach.call(items, function (item, i) {
                var current = i === activeIndex;
                item.classList.toggle("is-active", current);
                item.setAttribute("aria-selected", current ? "true" : "false");
                if (current) {
                    item.scrollIntoView({ block: "nearest" });
                }
            });
        };

        var renderResults = function (query) {
            searchResults.innerHTML = "";
            activeIndex = -1;
            var trimmed = query.trim().toLowerCase();
            if (!trimmed) {
                searchStatus.textContent = labelHint;
                searchStatus.hidden = false;
                return;
            }
            if (!searchDocs) {
                searchStatus.textContent = labelSearching;
                searchStatus.hidden = false;
                return;
            }
            var matches = searchDocs.filter(function (doc) {
                var haystack = [doc.title, doc.summary, doc.section, (doc.tags || []).join(" ")]
                    .join(" ").toLowerCase();
                return haystack.indexOf(trimmed) !== -1;
            }).slice(0, 12);

            if (!matches.length) {
                searchStatus.textContent = labelNoMatch;
                searchStatus.hidden = false;
                return;
            }
            searchStatus.hidden = true;
            matches.forEach(function (doc) {
                var li = document.createElement("li");
                li.setAttribute("role", "option");
                li.setAttribute("aria-selected", "false");
                li.className = "search-overlay__result";

                var link = document.createElement("a");
                link.href = doc.url;
                link.className = "search-overlay__result-link";

                var title = document.createElement("span");
                title.className = "search-overlay__result-title";
                title.textContent = doc.title;

                var meta = document.createElement("span");
                meta.className = "search-overlay__result-meta";
                var metaParts = [];
                if (doc.section) {
                    metaParts.push(capitalize(doc.section));
                }
                if (doc.date) {
                    metaParts.push(doc.date);
                }
                meta.textContent = metaParts.join(" \u00b7 ");

                link.appendChild(title);
                link.appendChild(meta);
                li.appendChild(link);
                searchResults.appendChild(li);
            });
        };

        var loadIndex = function () {
            if (searchDocs || searchLoading || !indexUrl) {
                return;
            }
            searchLoading = true;
            fetch(indexUrl).then(function (response) {
                return response.json();
            }).then(function (data) {
                searchDocs = Array.isArray(data) ? data : [];
                searchLoading = false;
                if (searchOverlay.classList.contains("is-open")) {
                    renderResults(searchInput.value);
                }
            }).catch(function () {
                searchLoading = false;
            });
        };

        var openSearch = function () {
            if (searchOverlay.classList.contains("is-open")) {
                return;
            }
            searchLastFocused = document.activeElement;
            searchOverlay.classList.add("is-open");
            searchOverlay.setAttribute("aria-hidden", "false");
            document.body.classList.add("is-search-open");
            loadIndex();
            renderResults(searchInput.value);
            searchInput.focus();
            searchInput.select();
        };

        var closeSearch = function () {
            if (!searchOverlay.classList.contains("is-open")) {
                return;
            }
            searchOverlay.classList.remove("is-open");
            searchOverlay.setAttribute("aria-hidden", "true");
            document.body.classList.remove("is-search-open");
            if (searchLastFocused && searchLastFocused.focus) {
                searchLastFocused.focus();
            }
        };

        Array.prototype.forEach.call(searchOpeners, function (opener) {
            opener.addEventListener("click", openSearch);
        });
        Array.prototype.forEach.call(searchClosers, function (closer) {
            closer.addEventListener("click", closeSearch);
        });

        searchInput.addEventListener("input", function () {
            renderResults(searchInput.value);
        });

        searchInput.addEventListener("keydown", function (event) {
            if (event.key === "ArrowDown") {
                event.preventDefault();
                setActive(activeIndex + 1);
            } else if (event.key === "ArrowUp") {
                event.preventDefault();
                setActive(activeIndex - 1);
            } else if (event.key === "Enter") {
                var items = searchResults.querySelectorAll("[role=option] a");
                if (activeIndex >= 0 && items[activeIndex]) {
                    event.preventDefault();
                    window.location.href = items[activeIndex].href;
                }
            }
        });

        // Focus trap: keep Tab within the modal while it is open.
        searchOverlay.addEventListener("keydown", function (event) {
            if (event.key !== "Tab" || !searchOverlay.classList.contains("is-open")) {
                return;
            }
            var focusable = searchOverlay.querySelectorAll("input, button, a[href]");
            var list = Array.prototype.filter.call(focusable, function (el) {
                return el.offsetParent !== null;
            });
            if (!list.length) {
                return;
            }
            var first = list[0];
            var last = list[list.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeSearch();
                return;
            }
            if (event.key === "/" && !searchOverlay.classList.contains("is-open")) {
                var tag = (document.activeElement && document.activeElement.tagName) || "";
                var editable = document.activeElement && document.activeElement.isContentEditable;
                if (tag !== "INPUT" && tag !== "TEXTAREA" && tag !== "SELECT" && !editable) {
                    event.preventDefault();
                    openSearch();
                }
            }
        });
    }

    // Print button on the CV page: hand off to the browser's print / save-as-PDF
    // (no separately maintained PDF file). The print stylesheet lives in CSS.
    var printButtons = document.querySelectorAll("[data-print]");
    Array.prototype.forEach.call(printButtons, function (button) {
        button.addEventListener("click", function () {
            window.print();
        });
    });
})();
