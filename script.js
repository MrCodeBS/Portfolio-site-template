// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar color change on scroll
const nav = document.querySelector('nav');
const changeNavbarColor = () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
};

window.addEventListener('scroll', changeNavbarColor);

// Animate elements on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.project, .skill-tag').forEach((el) => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Parallax effect for header
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    header.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
});

// Typed.js effect for subtitle
document.addEventListener('DOMContentLoaded', function() {
    const typed = new Typed('.subtitle', {
        strings: ['Web Developer', 'Designer Extraordinaire', 'Problem Solver'],
        typeSpeed: 50,
        backSpeed: 50,
        loop: true
    });
});

// Project hover effect
document.querySelectorAll('.project').forEach(project => {
    project.addEventListener('mouseenter', () => {
        project.querySelector('.project-content').style.transform = 'translateY(0)';
    });
    project.addEventListener('mouseleave', () => {
        project.querySelector('.project-content').style.transform = 'translateY(100%)';
    });
});

// Skill tag animation
document.querySelectorAll('.skill-tag').forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
});

// Dark mode toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
});

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    body.classList.add('dark-mode');
}

// Add custom cursor
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

// Easter egg: Konami code
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiCodePosition = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiCodePosition]) {
        konamiCodePosition++;
        if (konamiCodePosition === konamiCode.length) {
            activateEasterEgg();
            konamiCodePosition = 0;
        }
    } else {
        konamiCodePosition = 0;
    }
});

function activateEasterEgg() {
    alert('You found the secret! Here's a virtual high five! ✋');
    // Add more fun effects or features here
}

// Glitch effect for header text
const glitchText = document.querySelector('.glitch');
let glitchInterval;

function startGlitchEffect() {
    glitchInterval = setInterval(() => {
        glitchText.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 5 - 2.5}px)`;
        setTimeout(() => {
            glitchText.style.transform = 'translate(0, 0)';
        }, 50);
    }, 3000);
}

function stopGlitchEffect() {
    clearInterval(glitchInterval);
    glitchText.style.transform = 'translate(0, 0)';
}

glitchText.addEventListener('mouseenter', startGlitchEffect);
glitchText.addEventListener('mouseleave', stopGlitchEffect);

// Scroll progress indicator
const progressBar = document.createElement('div');
progressBar.classList.add('scroll-progress');
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
    progressBar.style.width = `${scrollPercentage}%`;
});

// Lazy loading images
const lazyImages = document.querySelectorAll('img[data-src]');
const lazyImageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            lazyImageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => lazyImageObserver.observe(img));

// Add a simple loading animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.classList.add('loader-hidden');
    loader.addEventListener('transitionend', () => {
        document.body.removeChild(loader);
    });
});