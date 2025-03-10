document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Prepare template parameters
            const templateParams = {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message
            };
            
            // Send email using EmailJS
            emailjs.send('service_e65r2sl', 'template_serikfn', templateParams, 'uONAyRS8A6dhJ3vKt')
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    
                    // Clear the form
                    contactForm.reset();
                    
                    // Show success message
                    alert('Thank you for your message! I will get back to you soon.');
                    
                    // Reset button
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                }, function(error) {
                    console.log('FAILED...', error);
                    
                    // Show error message
                    alert('Oops! Something went wrong. Please try again later.');
                    
                    // Reset button
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }

    // Typing effect for hero section
    const heroText = document.querySelector('.hero p');
    const text = heroText.textContent;
    heroText.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    setTimeout(typeWriter, 1000);

    // Smooth scrolling for anchor links
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
});