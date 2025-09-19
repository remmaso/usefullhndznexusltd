// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Carousel Functionality
let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
let slideInterval;

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slideIndex = (n + slides.length) % slides.length;
    
    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
}

function changeSlide(n) {
    clearInterval(slideInterval);
    showSlide(slideIndex + n);
    startAutoSlide();
}

function currentSlide(n) {
    clearInterval(slideInterval);
    showSlide(n - 1);
    startAutoSlide();
}

function startAutoSlide() {
    slideInterval = setInterval(() => {
        showSlide(slideIndex + 1);
    }, 5000);
}

// Initialize carousel
showSlide(0);
startAutoSlide();

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Property Search Functionality
function searchProperties() {
    const location = document.getElementById('search-location').value;
    const propertyType = document.getElementById('property-type').value;
    const priceRange = document.getElementById('price-range').value;
    
    // In a real application, this would make an API call
    console.log('Searching for properties:', {
        location,
        propertyType,
        priceRange
    });
    
    // Show search results (mock implementation)
    alert(`Searching for ${propertyType || 'all'} properties in ${location || 'all locations'} with price range ${priceRange || 'any price'}`);
}

// Form Validation and Submission
document.addEventListener('DOMContentLoaded', () => {
    // Contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;
            
            // In a real application, this would send data to a server
            console.log('Contact form submitted:', { name, email, message });
            
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            // In a real application, this would subscribe the user
            console.log('Newsletter subscription:', { email });
            
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }
});

// Property Card Interactions
document.querySelectorAll('.property-card').forEach(card => {
    const btnView = card.querySelector('.btn-view');
    if (btnView) {
        btnView.addEventListener('click', () => {
            const propertyTitle = card.querySelector('h3').textContent;
            const propertyPrice = card.querySelector('.price').textContent;
            const propertyLocation = card.querySelector('.location').textContent;
            
            // In a real application, this would navigate to property details
            alert(`Viewing details for: ${propertyTitle}\nPrice: ${propertyPrice}\nLocation: ${propertyLocation}`);
        });
    }
});

// WhatsApp Chat Integration
document.querySelectorAll('.whatsapp-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Track WhatsApp click for analytics
        console.log('WhatsApp chat initiated');
        
        // In a real application, you might want to:
        // 1. Track this event in analytics
        // 2. Show a pre-chat form
        // 3. Open a custom chat widget
    });
});

// Scroll Animation Effects
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.property-card, .testimonial-card, .about-content > *');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Property Filter Functionality (Enhanced)
function filterProperties(type) {
    const cards = document.querySelectorAll('.property-card');
    
    cards.forEach(card => {
        if (type === 'all' || card.dataset.type === type) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Lazy Loading for Images
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img);
});

// Performance Optimization - Debounce Scroll Events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add scroll-to-top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 80px;
    right: 20px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(scrollTopBtn);

const handleScroll = debounce(() => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.transform = 'scale(1)';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.transform = 'scale(0.8)';
    }
}, 100);

window.addEventListener('scroll', handleScroll);

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Elite Properties website initialized');
    
    // Add loading states to buttons
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.type === 'submit') {
                const originalText = this.textContent;
                this.textContent = 'Loading...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                }, 2000);
            }
        });
    });
});

// Error handling for images
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', () => {
            img.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
            img.alt = 'Image not available';
        });
    });
});