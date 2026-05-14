// Configuración de WhatsApp
const WHATSAPP_NUMBER = '573046697754';

function openWhatsApp(message) {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(url, '_blank');
}

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const menuIcon = document.querySelector('.menu-toggle i');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    if(navLinks.classList.contains('active')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
});

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    });
});

// Header scroll effect
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Scroll Reveal Animations
function reveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

window.addEventListener('scroll', reveal);
reveal(); // Disparar en la carga inicial

// Number Counter Animation
const counters = document.querySelectorAll('.counter');
let hasCounted = false;

function animateCounters() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
            }
        };
        updateCounter();
    });
}

// Disparar contador cuando la sección de 'Nosotros' sea visible
const aboutSection = document.getElementById('nosotros');
window.addEventListener('scroll', () => {
    if (hasCounted) return;
    
    const sectionTop = aboutSection.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight - 100) {
        animateCounters();
        hasCounted = true;
    }
});

// 3D Tilt Effect for Service Cards
const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
        const rotateY = ((x - centerX) / centerX) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
    });
});

// Parallax effect for Hero Background (Scroll + Mousemove)
const heroBg = document.querySelector('.hero-bg');
const heroSection = document.querySelector('.hero');

let scrollOffset = 0;
let mouseOffsetX = 0;
let mouseOffsetY = 0;

function updateHeroParallax() {
    if (heroBg) {
        heroBg.style.transform = `translate(${mouseOffsetX}px, calc(${scrollOffset * 0.4}px + ${mouseOffsetY}px))`;
    }
}

window.addEventListener('scroll', () => {
    scrollOffset = window.scrollY;
    updateHeroParallax();
});

if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
        // Calculate offset based on center of screen
        mouseOffsetX = (window.innerWidth / 2 - e.pageX) / 30;
        mouseOffsetY = (window.innerHeight / 2 - e.pageY) / 30;
        updateHeroParallax();
    });

    heroSection.addEventListener('mouseleave', () => {
        mouseOffsetX = 0;
        mouseOffsetY = 0;
        heroBg.style.transition = 'transform 0.5s ease-out';
        updateHeroParallax();
        setTimeout(() => {
            if (heroBg) heroBg.style.transition = 'none';
        }, 500);
    });
}
