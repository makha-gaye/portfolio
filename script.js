// ==============================
// Scroll fluide pour le menu
// ==============================
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        window.scrollTo({
            top: targetSection.offsetTop - 80, // ajuste pour navbar fixe
            behavior: 'smooth'
        });
    });
});

// ==============================
// Menu actif selon le scroll
// ==============================
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY + 100; // décalage pour navbar
    sections.forEach(section => {
        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-links a[href="#${section.id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
});

// ==============================
// Fade-in animation pour sections
// ==============================
const faders = document.querySelectorAll('section');

const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(50px)';
    appearOnScroll.observe(section);
});
