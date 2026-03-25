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
        // 1. Find if the clicked element (or its parent) is a modal trigger
        const trigger = e.target.closest('.js-modal-trigger');
        if (!trigger) return; // Exit if we didn't click a trigger

        e.preventDefault();
        console.log('Modal Trigger Clicked:', trigger); // Debugging line

        const modal = document.getElementById('project-modal');
        // Look for the parent row that contains all the project data
        const row = trigger.closest('.project-row');

        if (!modal || !row) return;

        // 2. Extract data from the row's data attributes
        const imageSrc = row.querySelector('.project-img').src;
        const tagsHTML = row.querySelector('.project-tags').innerHTML;
        const title = row.querySelector('.project-title').textContent;
        const description = row.dataset.fullDescription;
        const githubLink = row.dataset.githubLink;
        const demoLink = row.dataset.demoLink;

        // 3. Populate Modal
        document.getElementById('modal-image').src = imageSrc;
        document.getElementById('modal-tags').innerHTML = tagsHTML;
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-description').textContent = description;

        // 4. Build Professional Modal Links
        let linksHTML = '';
        if (githubLink) {
            linksHTML += `<a href="${githubLink}" target="_blank" class="btn-badge github-badge"><i class="fab fa-github"></i> GitHub</a>`;
        }
        if (demoLink) {
            linksHTML += `<a href="${demoLink}" target="_blank" class="btn btn-primary"><i class="fas fa-rocket"></i> Live Demo</a>`;
        }
        document.getElementById('modal-links').innerHTML = linksHTML;

        // 5. Open Modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop background scrolling
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