/**
 * ANDRIAMAROLAHY R. - Portfolio Main Script
 */

document.addEventListener('DOMContentLoaded', () => {
    let lastFocusedElement = null;

    const isSafeExternalUrl = (value) => {
        if (!value) return false;

        try {
            const parsedUrl = new URL(value, window.location.origin);
            return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
        } catch {
            return false;
        }
    };

    const createExternalLink = (href, className, iconClass, label) => {
        const link = document.createElement('a');
        link.href = href;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = className;

        const icon = document.createElement('i');
        icon.className = iconClass;

        const span = document.createElement('span');
        span.textContent = label;

        link.append(icon, document.createTextNode(' '), span);
        return link;
    };

    const setMobileMenuState = (menuButton, menu, isOpen) => {
        menuButton.classList.toggle('active', isOpen);
        menu.classList.toggle('active', isOpen);
        menuButton.setAttribute('aria-expanded', String(isOpen));
    };

    const getFocusableElements = (container) => {
        const selector = [
            'a[href]',
            'button:not([disabled])',
            'textarea:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            '[tabindex]:not([tabindex="-1"])'
        ].join(', ');

        return Array.from(container.querySelectorAll(selector))
            .filter((element) => !element.hasAttribute('disabled') && !element.getAttribute('aria-hidden'));
    };

    const openModal = (modal) => {
        lastFocusedElement = document.activeElement;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        const closeButton = modal.querySelector('#close-modal-btn');
        if (closeButton) {
            closeButton.focus();
        }
    };

    const closeModal = (modal) => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';

        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus();
        }
    };

    /* =========================================
     *  1. MOBILE MENU TOGGLE
     * ========================================= */
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', () => {
            const isOpen = !mobileNav.classList.contains('active');
            setMobileMenuState(mobileMenuToggle, mobileNav, isOpen);
        });

        // Close mobile menu when clicking a link
        const mobileNavLinks = mobileNav.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                setMobileMenuState(mobileMenuToggle, mobileNav, false);
            });
        });
    }

    /* =========================================
     *  2. SCROLL ANIMATIONS (Fade-in)
     * ========================================= */
    const animateElements = document.querySelectorAll('.animate-fade-in');

    const revealElement = (element) => {
        element.classList.add('is-visible');
    };

    if (animateElements.length > 0) {
        if ('IntersectionObserver' in window) {
            const fadeInObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    revealElement(entry.target);
                    observer.unobserve(entry.target);
                });
            }, {
                root: null,
                threshold: 0.15
            });

            animateElements.forEach((element) => fadeInObserver.observe(element));
        } else {
            const animateOnScroll = () => {
                animateElements.forEach((element) => {
                    const elementTop = element.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;

                    if (elementTop < windowHeight * 0.9) {
                        revealElement(element);
                    }
                });
            };

            window.addEventListener('load', animateOnScroll);
            window.addEventListener('scroll', animateOnScroll);
        }
    }


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
        document.getElementById('modal-description').textContent = description;
        document.getElementById('modal-tags').innerHTML = tagsHTML;

        // 3. Build CTAs Dynamically
        const modalLinks = document.getElementById('modal-links');
        modalLinks.textContent = '';

        if (isSafeExternalUrl(githubLink)) {
            modalLinks.appendChild(createExternalLink(
                githubLink,
                'pro-icon-link',
                'fab fa-github',
                'GitHub'
            ));
        }

        if (isSafeExternalUrl(demoLink)) {
            modalLinks.appendChild(createExternalLink(
                demoLink,
                'pro-icon-link pro-icon-link--alt',
                'fas fa-rocket',
                'Live Demo'
            ));
        }

        // 4. Open
        openModal(modal);
    });

    /* =========================================
     *  MODAL CLOSE LOGIC
     * ========================================= */
    document.addEventListener('click', (e) => {
        const isCloseBtn = e.target.closest('#close-modal-btn');
        const isBackdrop = e.target.id === 'project-modal';

        if (isCloseBtn || isBackdrop) {
            const modal = document.getElementById('project-modal');
            if (!modal) return;
            closeModal(modal);
        }
    });

    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('project-modal');
        if (!modal || !modal.classList.contains('active')) return;

        if (e.key === 'Escape') {
            e.preventDefault();
            closeModal(modal);
            return;
        }

        if (e.key !== 'Tab') return;

        const focusableElements = getFocusableElements(modal);
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
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
