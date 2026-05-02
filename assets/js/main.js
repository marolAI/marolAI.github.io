/**
 * ANDRIAMAROLAHY R. — Portfolio Main Script
 */

document.addEventListener('DOMContentLoaded', () => {
    let lastFocusedElement = null;

    /* =========================================
     *  UTILITY
     * ========================================= */
    const isSafeExternalUrl = (value) => {
        if (!value) return false;
        try {
            const url = new URL(value, window.location.origin);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch { return false; }
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

    const getFocusableElements = (container) => {
        return Array.from(container.querySelectorAll(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )).filter(el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));
    };

    /* =========================================
     *  DARK MODE TOGGLE
     * ========================================= */
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon   = document.getElementById('theme-icon');
    const htmlEl      = document.documentElement;

    const applyTheme = (theme) => {
        htmlEl.setAttribute('data-theme', theme);
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
        localStorage.setItem('portfolio-theme', theme);
    };

    // Init from storage
    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    applyTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = htmlEl.getAttribute('data-theme');
            applyTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    /* =========================================
     *  HEADER — SCROLL BEHAVIOR
     * ========================================= */
    const header = document.getElementById('site-header');
    let lastScroll = 0;

    const handleScroll = () => {
        const scrollY = window.scrollY;
        if (scrollY > 40) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
        lastScroll = scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial

    /* =========================================
     *  MOBILE MENU
     * ========================================= */
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    const setMobileMenuState = (isOpen) => {
        mobileMenuToggle?.classList.toggle('active', isOpen);
        mobileNav?.classList.toggle('active', isOpen);
        mobileMenuToggle?.setAttribute('aria-expanded', String(isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    mobileMenuToggle?.addEventListener('click', () => {
        const isOpen = !mobileNav?.classList.contains('active');
        setMobileMenuState(isOpen);
    });

    mobileNav?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => setMobileMenuState(false));
    });

    /* =========================================
     *  SCROLL ANIMATIONS
     * ========================================= */
    const animateElements = document.querySelectorAll('.animate-fade-in');

    if (animateElements.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            });
        }, { threshold: 0.12 });
        animateElements.forEach(el => observer.observe(el));
    } else {
        animateElements.forEach(el => el.classList.add('is-visible'));
    }

    /* =========================================
     *  SCROLLSPY
     * ========================================= */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav a, .mobile-nav a');

    if (sections.length > 0 && navLinks.length > 0) {
        const spy = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => link.classList.remove('active'));
                    document.querySelectorAll(`a[href="#${id}"]`).forEach(link => link.classList.add('active'));
                }
            });
        }, { rootMargin: '-80px 0px -50% 0px', threshold: 0 });

        sections.forEach(s => spy.observe(s));
    }

    /* =========================================
     *  SMOOTH SCROLL
     * ========================================= */
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                const offset = 80;
                const top = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    /* =========================================
     *  MODAL
     * ========================================= */
    const openModal = (modal) => {
        lastFocusedElement = document.activeElement;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        modal.querySelector('#close-modal-btn')?.focus();
    };

    const closeModal = (modal) => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        lastFocusedElement?.focus?.();
    };

    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('.js-modal-trigger');
        if (!trigger) return;
        e.preventDefault();

        const modal = document.getElementById('project-modal');
        const row = trigger.closest('.project-row');
        if (!modal || !row) return;

        const imageSrc   = row.querySelector('.project-img').src;
        const title      = row.querySelector('.project-title').textContent;
        const description = row.getAttribute('data-full-description');
        const githubLink  = row.getAttribute('data-github-link');
        const demoLink    = row.getAttribute('data-demo-link');
        const tagsHTML    = row.querySelector('.project-tags').innerHTML;

        document.getElementById('modal-image').src = imageSrc;
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-description').textContent = description;
        document.getElementById('modal-tags').innerHTML = tagsHTML;

        const modalLinks = document.getElementById('modal-links');
        modalLinks.textContent = '';
        if (isSafeExternalUrl(githubLink)) {
            modalLinks.appendChild(createExternalLink(githubLink, 'pro-icon-link', 'fab fa-github', 'GitHub'));
        }
        if (isSafeExternalUrl(demoLink)) {
            modalLinks.appendChild(createExternalLink(demoLink, 'pro-icon-link pro-icon-link--alt', 'fas fa-rocket', 'Live Demo'));
        }

        openModal(modal);
    });

    document.addEventListener('click', (e) => {
        if (e.target.closest('#close-modal-btn') || e.target.id === 'project-modal') {
            const modal = document.getElementById('project-modal');
            if (modal) closeModal(modal);
        }
    });

    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('project-modal');
        if (!modal?.classList.contains('active')) return;

        if (e.key === 'Escape') { e.preventDefault(); closeModal(modal); return; }

        if (e.key === 'Tab') {
            const focusable = getFocusableElements(modal);
            if (!focusable.length) return;
            const first = focusable[0], last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
    });
});
