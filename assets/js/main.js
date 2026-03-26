/**
 * ANDRIAMAROLAHY R. - Portfolio Main Script
 */

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
     *  1. MOBILE MENU TOGGLE
     * ========================================= */
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        const mobileNavLinks = mobileNav.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
            });
        });
    }

    /* =========================================
     *  2. SCROLL ANIMATIONS (Fade-in)
     * ========================================= */
    const animateElements = document.querySelectorAll('.animate-fade-in');

    const animateOnScroll = () => {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight * 0.9) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);


    /* =========================================
     *  6. MODAL POPUP LOGIC FOR PROJECTS
     * ========================================= */
    document.addEventListener('click', function (e) {
        const trigger = e.target.closest('.js-modal-trigger');
        if (!trigger) return;

        e.preventDefault();
        const modal = document.getElementById('project-modal');
        const row = trigger.closest('.project-row');
        if (!modal || !row) return;

        // 1. Extract Data
        const imageSrc = row.querySelector('.project-img').src;
        const title = row.querySelector('.project-title').textContent;
        const description = row.getAttribute('data-full-description'); // Fix: Get from attribute
        const githubLink = row.getAttribute('data-github-link');
        const demoLink = row.getAttribute('data-demo-link');

        // Get tags (clone the innerHTML so we keep the spans)
        const tagsHTML = row.querySelector('.project-tags').innerHTML;

        // 2. Populate text/image
        document.getElementById('modal-image').src = imageSrc;
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-description').innerHTML = description;
        document.getElementById('modal-tags').innerHTML = tagsHTML;

        // 3. Build CTAs Dynamically
        let linksHTML = '';
        if (githubLink && githubLink !== "") {
            linksHTML += `<a href="${githubLink}" target="_blank" class="pro-icon-link"><i class="fab fa-github"></i> <span>GitHub</span></a>`;
        }
        if (demoLink && demoLink !== "") {
            linksHTML += `<a href="${demoLink}" target="_blank" class="pro-icon-link pro-icon-link--alt"><i class="fas fa-rocket"></i> <span>Live Demo</span></a>`;
        }
        document.getElementById('modal-links').innerHTML = linksHTML;

        // 4. Open
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    /* =========================================
     *  MODAL CLOSE LOGIC
     * ========================================= */
    document.addEventListener('click', (e) => {
        const isCloseBtn = e.target.closest('#close-modal-btn');
        const isBackdrop = e.target.id === 'project-modal';

        if (isCloseBtn || isBackdrop) {
            const modal = document.getElementById('project-modal');
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
    /* =========================================
     *  7. SCROLLSPY & SMOOTH SCROLL
     * ========================================= */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav a, .mobile-nav a');

    if (sections.length > 0 && navLinks.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-100px 0px -50% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => link.classList.remove('active'));
                    document.querySelectorAll(`a[href="#${id}"]`).forEach(link => link.classList.add('active'));
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    // Smooth Scrolling for Nav Links
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});

