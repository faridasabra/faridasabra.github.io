document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');

    // Header scroll effect with light/dark mode support
    const header = document.querySelector('header');
    const body = document.body;
    
    function updateHeaderOnScroll() {
        const isScrolled = window.scrollY > 50;
        header.classList.toggle('scrolled', isScrolled);
        
        // Update logo and nav colors based on scroll and mode
        const logo = document.querySelector('.logo a');
        const navLinks = document.querySelectorAll('.nav-links a');
        const burgerLines = document.querySelectorAll('.burger div');
        
        if (body.classList.contains('dark-mode')) {
            // Dark mode behavior
            if (isScrolled) {
                logo.style.color = 'var(--primary-color)';
                navLinks.forEach(link => link.style.color = 'var(--dark-color)');
                burgerLines.forEach(line => line.style.backgroundColor = 'var(--dark-color)');
            } else {
                logo.style.color = 'var(--white-color)';
                navLinks.forEach(link => link.style.color = 'var(--white-color)');
                burgerLines.forEach(line => line.style.backgroundColor = 'var(--white-color)');
            }
        } else {
            // Light mode behavior
            if (isScrolled) {
                logo.style.color = 'var(--primary-color)';
                navLinks.forEach(link => link.style.color = 'var(--dark-color)');
                burgerLines.forEach(line => line.style.backgroundColor = 'var(--dark-color)');
            } else {
                logo.style.color = 'var(--white-color)';
                navLinks.forEach(link => link.style.color = 'var(--white-color)');
                burgerLines.forEach(line => line.style.backgroundColor = 'var(--white-color)');
            }
        }
    }

    // Initial call and event listener
    updateHeaderOnScroll();
    window.addEventListener('scroll', updateHeaderOnScroll);

    // Rest of your existing code...
    burger.addEventListener('click', () => {
        // Toggle menu and burger animation
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
        
        // Prevent scrolling when menu is open
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });


    // Close mobile menu when clicking on a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burger.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-links') && !e.target.closest('.burger') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            burger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Dark Mode Toggle Functionality
    const darkModeToggle = document.getElementById('darkModeToggle');

    // Check for saved user preference or use system preference
    const savedMode = localStorage.getItem('darkMode');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedMode === 'dark' || (!savedMode && systemPrefersDark)) {
        body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }

    // Toggle dark mode
    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'dark');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'light');
        }
        updateHeaderOnScroll(); // Update header colors when mode changes
    });

    // Update mobile menu colors in dark mode
    function updateMobileMenuColors() {
        const navLinks = document.querySelector('.nav-links');
        if (body.classList.contains('dark-mode')) {
            navLinks.style.backgroundColor = '#2d3748';
        } else {
            navLinks.style.backgroundColor = 'var(--white-color)';
        }
    }

    // Call this when toggling dark mode
    darkModeToggle.addEventListener('change', updateMobileMenuColors);

    // Also call when opening mobile menu
    burger.addEventListener('click', function() {
        if (navLinks.classList.contains('active')) {
            updateMobileMenuColors();
        }
    });

    // Project Filtering (Updated for Multi-Category Support)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => {
                btn.classList.remove('active');
                btn.style.opacity = '0.8';
            });
            
            // Add active class to clicked button
            btn.classList.add('active');
            btn.style.opacity = '1';
            
            const filter = btn.getAttribute('data-filter');
            
            // Animate project cards
            projectCards.forEach((card, index) => {
                setTimeout(() => {
                    const categories = card.getAttribute('data-category').split(' ');
                    
                    if (filter === 'all' || categories.includes(filter)) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.5s ease forwards';
                    } else {
                        card.style.animation = 'fadeOut 0.3s ease forwards';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }, index * 50);
            });
        });
    });

    // Add CSS animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(20px); }
        }
    `;
    document.head.appendChild(style);

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate Skill Bars on Scroll
    const skillBars = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
    
    // Intersection Observer for skill bars
    const skillsSection = document.querySelector('.skills');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
});