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
    /**
     * 🧲 Magnetic Logo - DISABLED as per user request
     */
    /*
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
    */

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
                const id = entry.target.getAttribute('id');

                if (id === 'skills') {
                    const tags = entry.target.querySelectorAll('.skill-tag');
                    tags.forEach((tag, index) => {
                        tag.style.transitionDelay = `${index * 50}ms`;
                        tag.classList.add('active');
                    });
                }

                // Sync navigation (Both Side Nav and Header Nav)
                const navLinks = document.querySelectorAll(`.nav-dot, .quick-jump a`);
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    // Check if href matches #id (for internal links) or if it's the blog page
                    const href = link.getAttribute('href');
                    if (href === `#${id}` || (id === 'blog-preview' && href.includes('blog.html'))) {
                        link.classList.add('active');
                    }
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
     * Smooth Scroll
     */
    jumpLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Only handle smooth scroll for local anchors
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 100,
                        behavior: 'smooth'
                    });
                } else if (window.location.pathname !== '/' && !window.location.pathname.includes('index.html')) {
                    // If we're on blog.html and click a hash link, go to index.html with that hash
                    window.location.href = 'index.html' + href;
                }
            }
            // For non-anchor links (like blog.html), let the default navigation happen
        });
    });

    /**
     * 🖱️ Custom Cursor Logic
     */
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');
    const interactiveElements = document.querySelectorAll('a, button, .skill-tag, .project-item, .nav-dot, .blog-card, .bento-item');

    if (cursor) {
        window.addEventListener('mousemove', (e) => {
            const { clientX: x, clientY: y } = e;
            requestAnimationFrame(() => {
                cursor.style.left = `${x}px`;
                cursor.style.top = `${y}px`;
                if (cursorDot) {
                    cursorDot.style.left = `${x}px`;
                    cursorDot.style.top = `${y}px`;
                }
            });
        });

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
            });
        });
    }

    /**
     * 🌊 Scroll Skew Effect
     */
    let lastScrollY = window.scrollY;

    const skewOnScroll = () => {
        const currentScrollY = window.scrollY;
        const diff = currentScrollY - lastScrollY;
        const speed = diff * 0.15;

        sections.forEach(section => {
            section.style.transform = `skewY(${speed * 0.05}deg)`;
        });

        lastScrollY = currentScrollY;
        requestAnimationFrame(skewOnScroll);
    };
    skewOnScroll();

    /**
     * 🧊 3D Tilt Effect REMOVED
     */
    // Users requested removal of tilt animation. 


    /* 📱 Mobile Menu Logic */
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const quickJump = document.querySelector('.quick-jump');

    if (mobileMenuBtn && quickJump) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            quickJump.classList.toggle('mobile-active');
            // Prevent body scroll when menu is open
            document.body.style.overflow = quickJump.classList.contains('mobile-active') ? 'hidden' : '';
        });

        // Close menu when a link is clicked
        const mobileLinks = quickJump.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                quickJump.classList.remove('mobile-active');
                document.body.style.overflow = '';
            });
        });
    }

    /**
     * ⌨️ Subtle blinking cursor
     */
    const heroRole = document.querySelector('.hero-role');
    if (heroRole) {
        heroRole.style.borderRight = '2px solid transparent';
        let visible = true;
        setInterval(() => {
            heroRole.style.borderRightColor = visible ? 'var(--primary)' : 'transparent';
            visible = !visible;
        }, 600);
    }
});
