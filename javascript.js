document.addEventListener("DOMContentLoaded", () => {
    initIntroOverlay();
    initNavbarHighlight();
    initDropdownMenus();
    initSvgAnimations();
    initTableFadeAnimation();
    initTableFadeAnimation2();
    initFadeSections();
    initProjectFade();
    stopAllVideos();
    initTimelineFadeAnimation();
    initLangFade();
    initRefereeFadeAnimation();
    initRefereeFadeAnimation2();
    initSearchFunction();

    document.querySelectorAll('.slider').forEach(slider => {
        showSlides(slider, 1);
    });
});

/* ---------------- Intro Overlay Function ---------------- */
function initIntroOverlay() {
    const overlay = document.getElementById("intro-overlay");
    const navbar = document.querySelector("nav");

    if (!overlay || !navbar) return;

    setTimeout(() => {
        overlay.classList.add("opacity-0", "transition-opacity", "duration-1000");
    }, 1500);

    setTimeout(() => {
        overlay.style.display = "none";
        navbar.classList.add("fade-in");
    }, 1800);
}

/* ---------------- Navigation Bar Highlight Function ---------------- */
function initNavbarHighlight() {
    const normalize = txt =>
        String(txt || "")
            .trim()
            .replace(/\s+/g, " ")
            .replace(/&amp;|&/gi, "and")
            .replace(/[^a-z0-9\s]/gi, "")
            .toLowerCase();

    const navLinks = Array.from(document.querySelectorAll(".nav-link"));
    if (!navLinks.length) return;

    function clearActive() {
        navLinks.forEach(l => {
            l.classList.remove("text-blue-300");
            l.classList.add("text-white");
        });
    }

    function highlightByText(rawText) {
        const key = normalize(rawText);
        let matched = false;
        navLinks.forEach(l => {
            if (normalize(l.textContent) === key) {
                l.classList.remove("text-white");
                l.classList.add("text-blue-300");
                matched = true;
            }
        });
        return matched;
    }

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            const txt = link.textContent;
            clearActive();
            const ok = highlightByText(txt);
            if (!ok) {
                link.classList.remove("text-white");
                link.classList.add("text-blue-300");
            }
        });
    });
}

/* ---------------- Dropdown Menu Function ---------------- */
function initDropdownMenus() {
    const desktopButton = document.getElementById("dropdownNavbarLink");
    const desktopDropdown = document.getElementById("dropdownNavbar");

    const mobileButton = document.getElementById("mobileMoreBtn");
    const mobileDropdown = document.getElementById("dropdown-more");

    if (desktopButton && desktopDropdown) {
        const desktopArrow = desktopButton.querySelector("svg");
        desktopButton.addEventListener("click", e => {
            e.stopPropagation();
            const isHidden = desktopDropdown.classList.contains("hidden");

            if (isHidden) {
                desktopDropdown.classList.remove("hidden");
                requestAnimationFrame(() => {
                    desktopDropdown.classList.remove("opacity-0", "scale-95");
                });
            } else {
                desktopDropdown.classList.add("opacity-0", "scale-95");
                setTimeout(() => {
                    desktopDropdown.classList.add("hidden");
                }, 200);
            }

            desktopArrow?.classList.toggle("rotate-180", isHidden);
        });
        desktopDropdown.addEventListener("click", e => e.stopPropagation());
    }

    if (mobileButton && mobileDropdown) {
        const mobileArrow = mobileButton.querySelector("svg");
        mobileButton.addEventListener("click", e => {
            e.stopPropagation();
            const isHidden = mobileDropdown.classList.contains("hidden");

            if (isHidden) {
                mobileDropdown.classList.remove("hidden");
            } else {
                mobileDropdown.classList.add("hidden");
            }

            mobileArrow?.classList.toggle("rotate-180", isHidden);
        });
        mobileDropdown.addEventListener("click", e => e.stopPropagation());
    }

    document.addEventListener("click", e => {
        if (
            !desktopDropdown?.contains(e.target) &&
            !desktopButton?.contains(e.target)
        ) {
            desktopDropdown?.classList.add("opacity-0", "scale-95");
            setTimeout(() => {
                desktopDropdown?.classList.add("hidden");
            }, 200);
            desktopButton?.querySelector("svg")?.classList.remove("rotate-180");
        }
        if (
            !mobileDropdown?.contains(e.target) &&
            !mobileButton?.contains(e.target)
        ) {
            mobileDropdown?.classList.add("hidden");
            mobileButton?.querySelector("svg")?.classList.remove("rotate-180");
        }
    });
}

/* ---------------- Svg Function ---------------- */
function initSvgAnimations() {
    document.querySelectorAll("svg").forEach(svg => {
        svg.classList.add("transform", "transition-transform", "duration-300");
    });
}

/* ---------------- Table Fade Function ---------------- */
function initTableFadeAnimation() {
    const table = document.querySelector('.table-fade');
    if (!table) return;

    function handleScroll() {
        const tableTop = table.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (tableTop < windowHeight - 100) {
            table.classList.add('fade-in');
            window.removeEventListener('scroll', handleScroll);
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();
}

/* ---------------- Section Fade Function ---------------- */
function initFadeSections() {
    const sections = document.querySelectorAll('.fade-section');
    if (!sections.length) return;

    function handleScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight - 100) {
                section.classList.add('fade-in');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();
}


/* ---------------- Slider Function ---------------- */
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(el, n) {
    const slider = el.closest('.slider');
    showSlides(slider, (slider.currentIndex || 1) + n);
}

function currentSlide(el, n) {
    const slider = el.closest('.slider');
    showSlides(slider, n);
}

function showSlides(slider, n) {
    const slides = slider.querySelectorAll('.mySlides');
    const dots = slider.querySelectorAll('.demo');
    const captionText = slider.querySelector('#caption') || null;

    if (!slider.slideIndex) slider.slideIndex = 1;
    slider.currentIndex = n;

    if (n > slides.length) slider.currentIndex = 1;
    if (n < 1) slider.currentIndex = slides.length;

    slides.forEach(s => (s.style.display = 'none'));
    dots.forEach(d => d.classList.remove('active'));

    slides[slider.currentIndex - 1].style.display = 'block';
    dots[slider.currentIndex - 1].classList.add('active');

    if (captionText) captionText.innerHTML = dots[slider.currentIndex - 1].alt;
}


/* ---------------- Project Fade Function ---------------- */
function initProjectFade() {
    const fadeProjects = document.querySelectorAll(".fade-project");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    entry.target.classList.add("fade-in", "glow-active");
                } else {
                    entry.target.classList.remove("glow-active");
                }
            });
        },
        { threshold: [0.5] }
    );

    fadeProjects.forEach((fadeProject) => observer.observe(fadeProject));
}

function stopAllVideos() {
    document.querySelectorAll('iframe').forEach(iframe => {
        iframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
    });
}

/* ---------------- Table Fade Function 2---------------- */
function initTableFadeAnimation2() {
    const table = document.querySelector('.table-fade-2');
    if (!table) return;

    function handleScroll() {
        const tableTop = table.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (tableTop < windowHeight - 100) {
            table.classList.add('fade-in');
            window.removeEventListener('scroll', handleScroll);
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();
}

/* ---------------- Timeline Fade Function ---------------- */
function initTimelineFadeAnimation() {
    const timeline = document.querySelector('.timeline-fade');
    if (!timeline) return;

    function handleScroll() {
        const timelineTop = timeline.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (timelineTop < windowHeight - 100) {
            timeline.classList.add('fade-in');
            window.removeEventListener('scroll', handleScroll);
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();
}

/* ---------------- Languages Fade Function ---------------- */
function initLangFade() {
    const items = document.querySelectorAll(".lang-item");
    if (!items.length) return;

    function handleScroll() {
        const windowHeight = window.innerHeight;

        items.forEach((item, index) => {
            const itemTop = item.getBoundingClientRect().top;

            if (itemTop < windowHeight - 100) {
                setTimeout(() => {
                    item.classList.add("fade-in");
                }, index * 250);
            }
        });
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();
}

/* ---------------- Referees Fade Function ---------------- */
function initRefereeFadeAnimation() {
    const referee = document.querySelector('.referee-fade');
    if (!referee) return;

    function handleScroll() {
        const refereeTop = referee.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (refereeTop < windowHeight - 100) {
            referee.classList.add('fade-in');
            window.removeEventListener('scroll', handleScroll);
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();
}

/* ---------------- Referees Fade Function 2 ---------------- */
function initRefereeFadeAnimation2() {
    const referee = document.querySelector('.referee-fade-2');
    if (!referee) return;

    function handleScroll() {
        const refereeTop = referee.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (refereeTop < windowHeight - 100) {
            referee.classList.add('fade-in');
            window.removeEventListener('scroll', handleScroll);
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();
}

/* ---------------- Search Function ---------------- */
function initSearchFunction() {
    const input = document.getElementById('search-navbar');
    const inputMobile = document.getElementById('search-navbar-mobile');
    if (!input && !inputMobile) return;

    let matches = [];
    let currentIndex = -1;
    let previousHighlights = [];

    function syncInputs(source, target) {
        if (!target) return;
        target.value = source.value;
    }

    function removeHighlights() {
        previousHighlights.forEach(span => {
            const parent = span.parentNode;
            if (parent) {
                parent.replaceChild(document.createTextNode(span.textContent), span);
                parent.normalize();
            }
        });
        previousHighlights = [];
    }

    function highlightMatches(query) {
        if (!query) return [];
        const body = document.body;

        function recursiveHighlight(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent;
                const lower = text.toLowerCase();
                const lowerQuery = query.toLowerCase();
                const index = lower.indexOf(lowerQuery);

                if (index >= 0) {
                    const span = document.createElement('span');
                    span.className = 'bg-yellow-300 text-black transition-all duration-500';
                    const matchedText = node.splitText(index);
                    const after = matchedText.splitText(query.length);
                    span.textContent = matchedText.textContent;
                    matchedText.parentNode.replaceChild(span, matchedText);
                    previousHighlights.push(span);

                    recursiveHighlight(after);
                }
            } else if (node.nodeType === Node.ELEMENT_NODE && node.childNodes && !['SCRIPT', 'STYLE', 'INPUT', 'TEXTAREA'].includes(node.tagName)) {
                node.childNodes.forEach(child => recursiveHighlight(child));
            }
        }

        recursiveHighlight(body);
        return previousHighlights;
    }

    function navigateTo(index) {
        if (!matches.length) return;
        matches.forEach(m => m.classList.remove('outline-current'));
        const current = matches[index];
        if (!current) return;
        current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        current.classList.add('outline-current');
    }

    function performSearch(query) {
        removeHighlights();
        matches = highlightMatches(query);
        currentIndex = -1;
    }

    function handleInput(source, target) {
        const query = source.value.trim();
        syncInputs(source, target);
        performSearch(query);
    }

    if (input) {
        input.addEventListener('input', () => handleInput(input, inputMobile));
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (!matches.length) return;
                currentIndex = (currentIndex + 1) % matches.length;
                navigateTo(currentIndex);
            }
        });
    }

    if (inputMobile) {
        inputMobile.addEventListener('input', () => handleInput(inputMobile, input));
        inputMobile.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (!matches.length) return;
                currentIndex = (currentIndex + 1) % matches.length;
                navigateTo(currentIndex);
            }
        });
    }
}





