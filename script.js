// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initCyberBackground();
    initProductFilters();
    initHoverEffects();
    initScrollAnimation();
    initMobileMenu();
    initProductDetailPopup();
    initSmoothScrolling();
});

// Create dynamic cyber background effect
function initCyberBackground() {
    const bg = document.querySelector('.cyber-bg');
    if (!bg) return;

    // Add more dynamic elements to cyber background
    for (let i = 0; i < 50; i++) {
        const dot = document.createElement('div');
        dot.classList.add('cyber-dot');
        dot.style.top = `${Math.random() * 100}%`;
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.width = `${Math.random() * 3 + 1}px`;
        dot.style.height = dot.style.width;
        dot.style.opacity = Math.random() * 0.5;
        dot.style.backgroundColor = Math.random() > 0.5 ? '#0cff6c' : '#00e1ff';
        dot.style.position = 'absolute';
        dot.style.borderRadius = '50%';
        dot.style.filter = 'blur(1px)';
        dot.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
        dot.style.animationDelay = `${Math.random() * 5}s`;
        dot.style.zIndex = '-1';
        bg.appendChild(dot);
    }
}

// Product category filter functionality
function initProductFilters() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const productCards = document.querySelectorAll('.product-card');
    const productsGrid = document.querySelector('.products-grid');
    
    if (!categoryBtns.length || !productCards.length) return;

    // Add initial animation classes and set initial data categories
    productCards.forEach((card, index) => {
        // Assign categories based on actual data attributes
        if (card.getAttribute('data-category')) {
            // Keep existing category attribute if it exists
        } else {
            // Assign categories (for new cards without attributes)
            let category;
            if (index === 0) {
                category = 'firmware';
            } else {
                category = 'hardware';
            }
            card.setAttribute('data-category', category);
        }
        
        // Set initial state
        card.style.opacity = '1';
        card.style.transform = 'translateX(0)';
        card.style.transition = 'opacity 0.25s ease, transform 0.3s ease';
    });

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // If already active, don't do anything
            if (btn.classList.contains('active')) return;
            
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const category = btn.getAttribute('data-category');
            
            // Apply a subtle scale animation to the grid
            productsGrid.style.transition = 'transform 0.3s ease';
            productsGrid.style.transform = 'scale(0.98)';
            
            // First, hide all products with a clean fade out
            productCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(10px)';
            });
            
            // After all have faded out, show only the matching ones
            setTimeout(() => {
                productsGrid.style.transform = 'scale(1)';
                
                // First hide all cards
                productCards.forEach(card => {
                    card.style.display = 'none';
                });
                
                // Then show and animate only matching cards
                const visibleCards = Array.from(productCards).filter(card => 
                    category === 'all' || card.getAttribute('data-category') === category
                );
                
                // Display all matching cards at once
                visibleCards.forEach(card => {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                });
                
                // Force reflow before animating them in
                void productsGrid.offsetWidth;
                
                // Animate with staggered delay
                visibleCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 50);
                });
            }, 300); // Wait for fade out to complete
        });
    });
}

// Enhanced hover effects
function initHoverEffects() {
    // Cyber button hover effect with shine
    const cyberBtns = document.querySelectorAll('.cyber-btn');
    
    cyberBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            btn.style.setProperty('--mouse-x', `${x}px`);
            btn.style.setProperty('--mouse-y', `${y}px`);
        });
    });
    
    // Add hover effect with cursor position - DO NOT REASSIGN CATEGORIES HERE
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card) => {
        // Add hover effect with cursor position
        const cardImage = card.querySelector('.product-image');
        if (cardImage) {
            cardImage.addEventListener('mousemove', (e) => {
                const rect = cardImage.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                
                const rotateY = 5 * (0.5 - x);
                const rotateX = 5 * (y - 0.5);
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            });
            
            cardImage.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        }
    });
    
    // Add hover effect to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const highlight = `radial-gradient(circle at ${x}px ${y}px, rgba(12, 255, 108, 0.15), transparent 40%)`;
            card.style.backgroundImage = highlight;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.backgroundImage = 'none';
        });
    });
}

// Scroll animations
function initScrollAnimation() {
    const elements = document.querySelectorAll('.hero-content, .feature-card, .product-card, .cta-content, .testimonial');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
    
    // Add CSS animation class
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// Mobile menu functionality
function initMobileMenu() {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    if (!header || !nav) return;
    
    // Create mobile menu toggle button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.style.display = 'none';
    
    // Add styles for mobile menu
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: flex !important;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                border: none;
                background-color: transparent;
                color: var(--primary-color);
                font-size: 1.5rem;
                cursor: pointer;
                z-index: 101;
            }
            
            nav {
                position: fixed;
                top: 0;
                right: -100%;
                width: 70%;
                height: 100vh;
                background-color: rgba(5, 5, 5, 0.95);
                backdrop-filter: blur(10px);
                padding: 6rem 2rem 2rem;
                transition: right 0.3s ease;
                z-index: 100;
                box-shadow: -5px 0 30px rgba(0, 0, 0, 0.5);
                border-left: 1px solid var(--border-color);
            }
            
            nav.active {
                right: 0;
            }
            
            nav ul {
                flex-direction: column;
                align-items: flex-start;
            }
            
            nav ul li {
                width: 100%;
                margin: 0.5rem 0;
            }
            
            nav ul li a {
                display: block;
                padding: 0.8rem 0;
                font-size: 1.1rem;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add mobile menu toggle functionality
    header.querySelector('.container').appendChild(mobileMenuBtn);
    
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileMenuBtn.innerHTML = nav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            nav.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Close menu when clicking on links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const scrollPosition = window.scrollY;
    hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    
    // Add glowing effect to buttons on scroll
    const cyberBtns = document.querySelectorAll('.cyber-btn');
    cyberBtns.forEach(btn => {
        const rect = btn.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        const buttonCenter = rect.top + rect.height / 2;
        const distance = Math.abs(viewportCenter - buttonCenter);
        
        if (distance < 200) {
            const intensity = 1 - distance / 200;
            btn.style.boxShadow = `0 0 ${intensity * 20}px ${intensity * 5}px rgba(12, 255, 108, ${intensity * 0.3})`;
        } else {
            btn.style.boxShadow = '';
        }
    });
});

// Create a particle effect
function createParticleEffect() {
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = Math.random() > 0.5 ? '#0cff6c' : '#00e1ff';
            this.opacity = Math.random() * 0.5;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    const particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Resize canvas when window resizes
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialize particle effect
createParticleEffect();

// Initialize Product Detail Popup
function initProductDetailPopup() {
    const viewDetailBtns = document.querySelectorAll('.view-btn');
    const popup = document.getElementById('product-popup');
    const closeBtn = document.querySelector('.close-popup');
    const backBtn = document.querySelector('.back-btn');
    const popupImage = document.getElementById('popup-product-image');
    const popupTitle = document.getElementById('popup-product-title');
    const popupPrice = document.getElementById('popup-product-price');
    const defaultFeatures = document.querySelector('.feature-default');
    const firmwareFeatures = document.querySelector('.feature-firmware');
    
    // Open popup when clicking View Details
    viewDetailBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get product details from the parent card
            const card = btn.closest('.product-card');
            const productTitle = card.querySelector('h3').textContent;
            const productPrice = card.querySelector('.price').textContent;
            const productImage = card.querySelector('img').getAttribute('src');
            const productCategory = card.getAttribute('data-category');
            
            // Update popup content
            popupImage.src = productImage;
            popupTitle.textContent = productTitle;
            popupPrice.textContent = productPrice;
            
            // Show the appropriate features list based on product type
            if (productTitle.includes('[EMU]𝘼𝘿𝙑𝘼𝙉𝘾𝙀𝘿 𝙁𝙄𝙍𝙈𝙒𝘼𝙍𝙀') || productCategory === 'firmware') {
                defaultFeatures.style.display = 'none';
                firmwareFeatures.style.display = 'block';
                
                // Update price if needed
                if (productTitle.includes('[EMU]𝘼𝘿𝙑𝘼𝙉𝘾𝙀𝘿 𝙁𝙄𝙍𝙈𝙒𝘼𝙍𝙀')) {
                    popupPrice.textContent = '€100.00';
                }
            } else {
                defaultFeatures.style.display = 'block';
                firmwareFeatures.style.display = 'none';
            }
            
            // Show popup with animation
            popup.style.display = 'flex';
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    popup.classList.add('active');
                });
            });
            
            // Prevent page scrolling when popup is open
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close popup functions
    function closePopup() {
        popup.classList.remove('active');
        setTimeout(() => {
            popup.style.display = 'none';
            document.body.style.overflow = '';
        }, 400);
    }
    
    // Close popup on X button click
    closeBtn.addEventListener('click', closePopup);
    
    // Close popup on Back button click
    backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closePopup();
    });
    
    // Close popup when clicking outside
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            closePopup();
        }
    });
    
    // Close popup with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            closePopup();
        }
    });
}

// Initialize smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Only process # links
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                if (targetId === '#') return; // Skip if it's just # 
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Smooth scroll to the element
                    window.scrollTo({
                        top: targetElement.offsetTop - (window.innerHeight * 0.1), // Position it 10% from the top (was 25%)
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
} 