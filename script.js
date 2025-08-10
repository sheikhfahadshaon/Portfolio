// Theme: respect system, allow override via toggle, and persist choice
const rootEl = document.documentElement;
const THEME_KEY = 'preferred-theme';

const applyTheme = (theme) => {
    if (theme === 'light' || theme === 'dark') {
        rootEl.setAttribute('data-theme', theme);
    } else {
        rootEl.removeAttribute('data-theme');
    }
};

const getSystemTheme = () => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

const loadInitialTheme = () => {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') {
        applyTheme(stored);
    } else {
        // No preference stored; follow system
        applyTheme(undefined);
    }
};

const toggleTheme = () => {
    const current = rootEl.getAttribute('data-theme');
    const next = current ? (current === 'dark' ? 'light' : 'dark') : getSystemTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
};

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const stored = localStorage.getItem(THEME_KEY);
    if (!stored) {
        // Only auto-update when user hasn't explicitly chosen a theme
        applyTheme(undefined);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    loadInitialTheme();
    const switchEl = document.getElementById('themeSwitch');
    if (switchEl) {
        // Initialize switch position based on effective theme
        const effectiveTheme = rootEl.getAttribute('data-theme') || getSystemTheme();
        switchEl.checked = effectiveTheme === 'dark';
        switchEl.addEventListener('change', () => {
            const next = switchEl.checked ? 'dark' : 'light';
            applyTheme(next);
            localStorage.setItem(THEME_KEY, next);
        });
    }
});

// Mobile Navigation Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            // Optimistically set active on click; observer will correct if needed
            document.querySelectorAll('.nav-links a.active').forEach((a) => a.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
const NAVBAR_OFFSET = 80; // matches approximate navbar height

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href) return;
        if (href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - NAVBAR_OFFSET;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

// Project filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        filterButtons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        projectCards.forEach((card) => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        const mailtoLink = `mailto:fahadshaon09@gmail.com?subject=${encodeURIComponent(
            subject
        )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

        window.location.href = mailtoLink;
        contactForm.reset();
    });
}

// Animation on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card, .project-card, .cp-card, .timeline-item').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Scrollspy: highlight active nav link based on scroll position
const sectionIds = ['home', 'about', 'skills', 'competitive', 'projects', 'education', 'contact'];
const idToNavLink = new Map();

sectionIds.forEach((id) => {
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) idToNavLink.set(id, link);
});

const setActiveLink = (id) => {
    const link = idToNavLink.get(id);
    if (!link) return;
    const current = document.querySelector('.nav-links a.active');
    if (current === link) return;
    document.querySelectorAll('.nav-links a.active').forEach((a) => a.classList.remove('active'));
    link.classList.add('active');
};

const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter((el) => !!el);

let ticking = false;
const updateActiveOnScroll = () => {
    let bestId = null;
    let bestDist = Number.POSITIVE_INFINITY;
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const dist = Math.abs(rect.top - NAVBAR_OFFSET);
        if (dist < bestDist) {
            bestDist = dist;
            bestId = section.id;
        }
    });
    if (bestId) setActiveLink(bestId);
};

window.addEventListener(
    'scroll',
    () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveOnScroll();
                ticking = false;
            });
            ticking = true;
        }
    },
    { passive: true }
);

window.addEventListener('load', () => {
    updateActiveOnScroll();
});

window.addEventListener('resize', () => {
    updateActiveOnScroll();
});

