// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        htmlElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }

    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');

        if (mobileMenuToggle.classList.contains('active')) {
            mobileMenuToggle.querySelector('span:nth-child(1)').style.transform = 'rotate(45deg) translate(5px, 5px)';
            mobileMenuToggle.querySelector('span:nth-child(2)').style.opacity = '0';
            mobileMenuToggle.querySelector('span:nth-child(3)').style.transform = 'rotate(-45deg) translate(8px, -8px)';
        } else {
            mobileMenuToggle.querySelector('span:nth-child(1)').style.transform = 'rotate(0deg)';
            mobileMenuToggle.querySelector('span:nth-child(2)').style.opacity = '1';
            mobileMenuToggle.querySelector('span:nth-child(3)').style.transform = 'rotate(0deg)';
        }
    });

    // Close mobile menu when clicking a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            mobileMenuToggle.querySelector('span:nth-child(1)').style.transform = 'rotate(0deg)';
            mobileMenuToggle.querySelector('span:nth-child(2)').style.opacity = '1';
            mobileMenuToggle.querySelector('span:nth-child(3)').style.transform = 'rotate(0deg)';
        });
    });

    // Scroll animations
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

    // Initial check for elements in view
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    if (filterButtons.length > 0 && projectItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                // Filter projects
                projectItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                    } else {
                        const itemCategories = item.getAttribute('data-categories').split(',');
                        if (itemCategories.includes(filterValue)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    }

    // Form validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Simple validation
            let isValid = true;

            if (name === '') {
                showError('name', 'Name is required');
                isValid = false;
            } else {
                removeError('name');
            }

            if (email === '') {
                showError('email', 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            } else {
                removeError('email');
            }

            if (message === '') {
                showError('message', 'Message is required');
                isValid = false;
            } else {
                removeError('message');
            }

            // If form is valid
            if (isValid) {
                // Here you would typically send the form data to your backend
                // For demo purposes, show success message
                const formElements = contactForm.elements;
                for (let i = 0; i < formElements.length; i++) {
                    if (formElements[i].type !== 'submit') {
                        formElements[i].value = '';
                    }
                }

                const successMessage = document.createElement('div');
                successMessage.classList.add('form-success');
                successMessage.innerHTML = 'Your message has been sent successfully!';

                contactForm.appendChild(successMessage);

                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    }

    // Helper functions
    function showError(inputId, message) {
        const formControl = document.getElementById(inputId).parentElement;
        const errorElement = formControl.querySelector('.error-message') || document.createElement('div');

        errorElement.className = 'error-message';
        errorElement.innerText = message;

        if (!formControl.querySelector('.error-message')) {
            formControl.appendChild(errorElement);
        }

        formControl.classList.add('error');
    }

    function removeError(inputId) {
        const formControl = document.getElementById(inputId).parentElement;
        const errorElement = formControl.querySelector('.error-message');

        if (errorElement) {
            errorElement.remove();
        }

        formControl.classList.remove('error');
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});