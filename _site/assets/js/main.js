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
});

/*
 * =========================================
 *  FAQ ACCORDION LOGIC
 * =========================================
 */
document.addEventListener('DOMContentLoaded', function () {
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length === 0) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.faq-item.active');

            // If there's an active item and it's not the one we just clicked, close it.
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
                currentlyActive.querySelector('.faq-answer').classList.remove('active');
                currentlyActive.querySelector('.faq-toggle').classList.remove('active');
            }

            // Now, toggle the one we clicked.
            item.classList.toggle('active');
            item.querySelector('.faq-answer').classList.toggle('active');
            item.querySelector('.faq-toggle').classList.toggle('active');
        });
    });
});

$(function () {
    var owlPlugin = function () {
        if ($('.owl-3-slider').length > 0) {
            var owl3 = $('.owl-3-slider').owlCarousel({
                loop: true,
                autoHeight: true,
                margin: 20,
                autoplay: true,
                smartSpeed: 700,
                items: 1,
                stagePadding: 0,
                nav: true,
                dots: true,
                navText: ['<span class="icon-keyboard_backspace"></span>', '<span class="icon-keyboard_backspace"></span>'],
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 1
                    },
                    800: {
                        items: 2
                    },
                    1000: {
                        items: 2
                    },
                    1100: {
                        items: 3
                    }
                }
            });
        }
        $('.js-custom-next-v2').click(function (e) {
            e.preventDefault();
            owl3.trigger('next.owl.carousel');
        })
        $('.js-custom-prev-v2').click(function (e) {
            e.preventDefault();
            owl3.trigger('prev.owl.carousel');
        })
        if ($('.owl-4-slider').length > 0) {
            var owl4 = $('.owl-4-slider').owlCarousel({
                loop: true,
                autoHeight: true,
                margin: 10,
                autoplay: true,
                smartSpeed: 700,
                items: 4,
                nav: false,
                dots: true,
                navText: ['<span class="icon-keyboard_backspace"></span>', '<span class="icon-keyboard_backspace"></span>'],
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 2
                    },
                    800: {
                        items: 2
                    },
                    1000: {
                        items: 3
                    },
                    1100: {
                        items: 4
                    }
                }
            });
        }


        if ($('.owl-single-text').length > 0) {
            var owlText = $('.owl-single-text').owlCarousel({
                loop: true,
                autoHeight: true,
                margin: 0,
                mouseDrag: false,
                touchDrag: false,
                autoplay: true,
                smartSpeed: 1200,
                items: 1,
                nav: false,
                navText: ['<span class="icon-keyboard_backspace"></span>', '<span class="icon-keyboard_backspace"></span>']
            });
        }
        if ($('.owl-single').length > 0) {
            var owl = $('.owl-single').owlCarousel({
                loop: true,
                autoHeight: true,
                margin: 0,
                autoplay: true,
                smartSpeed: 800,
                mouseDrag: false,
                touchDrag: false,
                items: 1,
                nav: false,
                navText: ['<span class="icon-keyboard_backspace"></span>', '<span class="icon-keyboard_backspace"></span>'],
                onInitialized: counter
            });

            function counter(event) {
                $('.owl-total').text(event.item.count);
            }

            $('.js-custom-owl-next').click(function (e) {
                e.preventDefault();
                owl.trigger('next.owl.carousel');
                owlText.trigger('next.owl.carousel');
            })
            $('.js-custom-owl-prev').click(function (e) {
                e.preventDefault();
                owl.trigger('prev.owl.carousel');
                owlText.trigger('prev.owl.carousel');
            })

            $('.owl-dots .owl-dot').each(function (i) {
                $(this).attr('data-index', i - 3);
            });

            owl.on('changed.owl.carousel', function (event) {

                var i = event.item.index;
                if (i === 1) {
                    i = event.item.count;
                } else {
                    i = i - 1;
                }
                $('.owl-current').text(i);
                $('.owl-total').text(event.item.count);
            })
        }

    }
    owlPlugin();

    var owlSingleSlider = function () {
        if ($('.single-slider').length) {
            $('.single-slider').owlCarousel({
                center: false,
                items: 1,
                loop: true,
                stagePadding: 0,
                margin: 0,
                smartSpeed: 1500,
                autoplay: true,
                autoHeight: true,
                autoplayHoverPause: true,
                dots: true,
                nav: true,
                navText: ['<span class="icon-keyboard_backspace"></span>', '<span class="icon-keyboard_backspace"></span>'],

                responsive: {
                    400: {
                        stagePadding: 0,
                        margin: 0,
                    },
                    600: {
                        stagePadding: 0,
                        margin: 0,
                    }
                }
            });
        }
    }


})

/*
 * =========================================
 *  LOAD MORE PROJECTS LOGIC
 * =========================================
 */
document.addEventListener('DOMContentLoaded', function () {
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (!loadMoreBtn) return; // Exit if the button doesn't exist

    loadMoreBtn.addEventListener('click', function () {
        const hiddenItems = document.querySelectorAll('.project-item.hidden');

        hiddenItems.forEach(item => {
            // Remove the 'hidden' class to make them visible
            item.classList.remove('hidden');
        });

        // Hide the "Load More" button after it's been clicked
        loadMoreBtn.style.display = 'none';
    });
});

/*
* =========================================
* MODAL POPUP LOGIC FOR PROJECTS
* =========================================
*/
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('project-modal');
    if (!modal) return;

    // Use our new, specific class to find triggers
    const modalTriggers = document.querySelectorAll('.js-modal-trigger');
    const closeModalBtn = document.getElementById('close-modal-btn');

    // Placeholders inside the modal
    const modalImage = document.getElementById('modal-image');
    const modalTags = document.getElementById('modal-tags');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalTech = document.getElementById('modal-tech');
    const modalLinks = document.getElementById('modal-links');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function (e) {
            e.preventDefault();
            const card = this.closest('.project-card');

            // 1. Extract data from the card's data attributes
            const imageSrc = card.querySelector('.project-image img').src;
            const tagsHTML = card.querySelector('.project-tags').innerHTML;
            const title = card.querySelector('h3').textContent;
            const description = card.dataset.fullDescription;
            const techHTML = card.querySelector('.project-tech').innerHTML;
            const githubLink = card.dataset.githubLink;
            const demoLink = card.dataset.demoLink;

            // 2. Populate the modal
            modalImage.src = imageSrc;
            modalImage.alt = title + " preview";
            modalTags.innerHTML = tagsHTML;
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            modalTech.innerHTML = techHTML;

            // 3. Rebuild the links in the modal footer with the new badge styles
            let linksHTML = '';
            if (githubLink) {
                linksHTML += `<a href="${githubLink}" target="_blank" rel="noopener noreferrer" class="btn-badge github-badge"><i class="fab fa-github"></i> GitHub</a>`;
            }
            if (demoLink) {
                linksHTML += `<a href="${demoLink}" target="_blank" rel="noopener noreferrer" class="btn-badge demo-badge"><i class="fas fa-rocket"></i> Live Demo</a>`;
            }
            modalLinks.innerHTML = linksHTML;

            // 4. Show the modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});

/*
 * =========================================
 *  NAVIGATION ACTIVE STATE ON SCROLL (SCROLLSPY)
 * =========================================
 */
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav a, .mobile-nav a');

    if (sections.length === 0 || navLinks.length === 0) return;

    // This function removes the .active class from all navigation links
    const removeActiveClasses = () => {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
    };

    // Options for the Intersection Observer
    const observerOptions = {
        root: null, // observes intersections relative to the viewport
        rootMargin: '-100px 0px -50% 0px', // Adjusts the "trigger area". Triggers when a section is between 100px from the top and the vertical center of the screen.
        threshold: 0
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                removeActiveClasses();

                // Add .active to the corresponding nav link(s)
                document.querySelectorAll(`a[href="#${id}"]`).forEach(link => {
                    link.classList.add('active');
                });
            }
        });
    }, observerOptions);

    // Tell the observer to watch each section
    sections.forEach(section => {
        observer.observe(section);
    });

    // Also handle smooth scrolling for nav clicks
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Close mobile nav if it's open
                const mobileNav = document.getElementById('mobile-nav');
                const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
                if (mobileNav && mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            }
        });
    });
});