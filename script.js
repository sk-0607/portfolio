document.addEventListener('DOMContentLoaded', function() {
    // ===== PRELOADER =====
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.classList.add('cursor-visible');
        }, 500);
    });

    // ===== CUSTOM CURSOR =====
    const cursorOuter = document.querySelector('.cursor-outer');
    const cursorInner = document.querySelector('.cursor-inner');
    
    if (cursorOuter && cursorInner) {
        document.addEventListener('mousemove', function(e) {
            cursorOuter.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
            cursorInner.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
        });

        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .project-card, .social-icon, .submit-btn, .nav-link');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOuter.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursorOuter.classList.remove('hover');
            });
        });
    }

    // ===== NAVIGATION =====
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navbar.classList.toggle('menu-open');
            // Ensure body scroll is disabled when menu is open on mobile
            if (navbar.classList.contains('menu-open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbar.classList.remove('menu-open');
                document.body.style.overflow = 'auto';
            });
        });
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ===== TYPING ANIMATION =====
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const titles = ['AI & ML Enthusiast', 'Data Analyst', 'Creative Coder'];
        let titleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isEnd = false;
        
        function type() {
            const currentTitle = titles[titleIndex];
            const currentChar = currentTitle.substring(0, charIndex);
            
            typingText.textContent = currentChar;
            
            if (!isDeleting && charIndex < currentTitle.length) {
                charIndex++;
                setTimeout(type, 100);
            } else if (isDeleting && charIndex > 0) {
                charIndex--;
                setTimeout(type, 50);
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) {
                    titleIndex = (titleIndex + 1) % titles.length;
                }
                setTimeout(type, 1000);
            }
        }
        
        setTimeout(type, 1000);
    }

    // ===== SKILL BARS ANIMATION =====
    // Animate skill tags on scroll
    const animateSkillBars = () => {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        if (progressBars.length > 0) {
            // First reset all widths to 0
            progressBars.forEach(bar => {
                bar.style.width = '0';
            });
    
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const bar = entry.target;
                        const width = bar.getAttribute('data-width');
                        bar.style.width = width;
                        observer.unobserve(bar);
                    }
                });
            }, {
                threshold: 0.5,
                rootMargin: '0px 0px -100px 0px' // Adjusted margin
            });
    
            progressBars.forEach(bar => {
                observer.observe(bar);
            });
        }
    };
    animateSkillBars();    

    // ===== PROJECT FILTERING =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ===== CONTACT FORM =====
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // ===== SCROLL TO TOP BUTTON =====
    const scrollTopBtn = document.querySelector('.scroll-top-btn');

    if (scrollTopBtn) {
        // Show/hide button based on scroll position
        const toggleScrollButton = () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        };

        // Initial check
        toggleScrollButton();
        
        window.addEventListener('scroll', toggleScrollButton);
        
        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        window.addEventListener('resize', () => {
            scrollTopBtn.style.right = '30px';
            scrollTopBtn.style.bottom = '30px';
        });
    }

    // ===== PARTICLES.JS CONFIGURATION =====
    if (document.getElementById('particles-js')) {
      particlesJS('particles-js', {
        "particles": {
          "number": {
            "value": 80,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": "#6c63ff"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            },
            "polygon": {
              "nb_sides": 5
            }
          },
          "opacity": {
            "value": 0.5,
            "random": true,
            "anim": {
              "enable": true,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 3,
            "random": true,
            "anim": {
              "enable": true,
              "speed": 2,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#6c63ff",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": true,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "grab"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 140,
              "line_linked": {
                "opacity": 1
              }
            },
            "push": {
              "particles_nb": 4
            }
          }
        },
        "retina_detect": true
      });
    }

    //  GSAP ANIMATIONS
    // Animate sections on scroll
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 1
        });
    });
    
    // Animate timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            x: -50,
            duration: 0.8,
            delay: index * 0.2
        });
    });

    // ===== VANILLA TILT =====
    VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.2
    });
});