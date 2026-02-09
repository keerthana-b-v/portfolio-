document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.querySelector('.progress-bar');
    const headerNav = document.querySelector('.header-nav');
    const navDots = document.querySelectorAll('.nav-dot');
    const sections = document.querySelectorAll('.section');
    const jumpLinks = document.querySelectorAll('.quick-jump a, .nav-dot, .skip-btn, .project-title a, .footer-links a');
    const logo = document.querySelector('.nav-logo');

    /**
     * 🧲 Magnetic Logo
     */
    if (logo) {
        logo.addEventListener('mousemove', (e) => {
            const rect = logo.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            logo.style.transform = `translate3d(${x * 0.3}px, ${y * 0.3}px, 0)`;
        });
        logo.addEventListener('mouseleave', () => {
            logo.style.transform = `translate3d(0, 0, 0)`;
        });
    }

    /**
     * Scroll Progress & Header Visibility
     */
    window.addEventListener('scroll', () => {
        const winScroll = window.scrollY;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;

        if (progressBar) progressBar.style.width = scrolled + "%";

        if (winScroll > 300) {
            headerNav.classList.add('visible');
        } else {
            headerNav.classList.remove('visible');
        }
    });

    /**
     * 🎬 Advanced Scroll Reveal
     */
    const observerOptions = {
        threshold: 0.1, // Trigger earlier
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Sync navigation
                const id = entry.target.getAttribute('id');
                const navLinks = document.querySelectorAll(`.nav-dot, .quick-jump a`);
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) link.classList.add('active');
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Fix: Robust activation of elements in view on load
    const checkInitialReveal = () => {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            // If the element is within the viewport (or close to it)
            if (rect.top < window.innerHeight * 0.95) {
                section.classList.add('active');
            }
        });
    };

    // Run immediately and after short delays to catch all render phases
    checkInitialReveal();
    setTimeout(checkInitialReveal, 100);
    setTimeout(checkInitialReveal, 500);
    setTimeout(checkInitialReveal, 1000);

    /**
     * ✨ Interactive Card Glow
     */
    const cards = document.querySelectorAll('.project-item, .timeline-item');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    /**
     * Smooth Scroll
     */
    jumpLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    /**
     * ⌨️ Subtle blinking cursor
     */
    const heroRole = document.querySelector('.hero-role');
    if (heroRole) {
        heroRole.style.borderRight = '2px solid transparent';
        let visible = true;
        setInterval(() => {
            heroRole.style.borderRightColor = visible ? 'var(--accent-color)' : 'transparent';
            visible = !visible;
        }, 600);
    }
});
