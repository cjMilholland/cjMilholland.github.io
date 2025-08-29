// Options Trading Trainer - Interactive JavaScript
// Built with Grok Code Fast 1

class OptionsTradingTrainer {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupScrollEffects();
        this.setupModuleInteractions();
        this.setupToolInteractions();
        this.setupProgressTracking();
        this.setupAccessibility();
        this.setupPerformanceMonitoring();
    }

    // Mobile Menu Toggle
    setupMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const mainNav = document.querySelector('.main-nav');

        if (mobileToggle && mainNav) {
            mobileToggle.addEventListener('click', () => {
                mainNav.classList.toggle('active');
                mobileToggle.classList.toggle('active');

                // Animate hamburger menu
                const spans = mobileToggle.querySelectorAll('span');
                if (spans.length >= 3) {
                    if (mainNav.classList.contains('active')) {
                        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                        spans[1].style.opacity = '0';
                        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                    } else {
                        spans[0].style.transform = 'none';
                        spans[1].style.opacity = '1';
                        spans[2].style.transform = 'none';
                    }
                }
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileToggle.contains(e.target) && !mainNav.contains(e.target)) {
                    mainNav.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    const spans = mobileToggle.querySelectorAll('span');
                    if (spans.length >= 3) {
                        spans[0].style.transform = 'none';
                        spans[1].style.opacity = '1';
                        spans[2].style.transform = 'none';
                    }
                }
            });
        }
    }

    // Smooth Scrolling Navigation
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const header = document.querySelector('.header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = targetSection.offsetTop - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Update active nav link
                    this.updateActiveNavLink(targetId);

                    // Close mobile menu if open
                    const mainNav = document.querySelector('.main-nav');
                    const mobileToggle = document.querySelector('.mobile-menu-toggle');
                    if (mainNav && mainNav.classList.contains('active')) {
                        mainNav.classList.remove('active');
                        if (mobileToggle) {
                            mobileToggle.classList.remove('active');
                        }
                    }
                }
            });
        });
    }

    // Update Active Navigation Link
    updateActiveNavLink(activeId) {
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === activeId) {
                link.classList.add('active');
            }
        });
    }

    // Scroll Effects and Active Section Detection
    setupScrollEffects() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const activeId = '#' + entry.target.id;
                    this.updateActiveNavLink(activeId);
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });

        // Add scroll effect to header
        let lastScrollTop = 0;
        const header = document.querySelector('.header');

        if (header) {
            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    // Scrolling down
                    header.style.transform = 'translateY(-100%)';
                } else {
                    // Scrolling up
                    header.style.transform = 'translateY(0)';
                }

                lastScrollTop = scrollTop;
            });
        }
    }

    // Module Interactions
    setupModuleInteractions() {
        const moduleCards = document.querySelectorAll('.module-card');

        moduleCards.forEach((card, index) => {
            // Add click handlers for module buttons
            const startButton = card.querySelector('.btn-outline');
            if (startButton) {
                startButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    const moduleId = card.dataset ? card.dataset.module : 'unknown';
                    this.showModuleComingSoon(moduleId);
                });
            }

            // Add hover effects
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Tool Interactions
    setupToolInteractions() {
        const toolCards = document.querySelectorAll('.tool-card');

        toolCards.forEach(card => {
            const toolButton = card.querySelector('.btn-outline');
            if (toolButton) {
                toolButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    const toolTitle = card.querySelector('h3');
                    const toolName = toolTitle ? toolTitle.textContent : 'Unknown Tool';
                    this.showToolComingSoon(toolName);
                });
            }
        });
    }

    // Progress Tracking System
    setupProgressTracking() {
        // Initialize progress from localStorage
        this.loadProgress();

        // Set up progress update intervals (simulate learning progress)
        setInterval(() => {
            this.updateSimulatedProgress();
        }, 30000); // Update every 30 seconds
    }

    loadProgress() {
        const progress = JSON.parse(localStorage.getItem('ott_progress') || '{}');

        Object.keys(progress).forEach(moduleId => {
            const moduleCard = document.querySelector(`[data-module="${moduleId}"]`);
            if (moduleCard) {
                const progressFill = moduleCard.querySelector('.progress-fill');
                const progressText = moduleCard.querySelector('.progress-text');

                if (progressFill && progressText) {
                    progressFill.style.width = progress[moduleId] + '%';
                    progressText.textContent = Math.round(progress[moduleId]) + '% Complete';
                }
            }
        });
    }

    updateSimulatedProgress() {
        // Simulate progress for demonstration (in real app, this would be based on actual learning)
        const moduleCards = document.querySelectorAll('.module-card');

        moduleCards.forEach(card => {
            const moduleId = card.dataset.module;
            const currentProgress = parseFloat(card.querySelector('.progress-fill').style.width || '0%');

            if (currentProgress < 100) {
                const newProgress = Math.min(currentProgress + Math.random() * 2, 100);
                this.updateModuleProgress(moduleId, newProgress);
            }
        });
    }

    updateModuleProgress(moduleId, progress) {
        const moduleCard = document.querySelector(`[data-module="${moduleId}"]`);
        if (moduleCard) {
            const progressFill = moduleCard.querySelector('.progress-fill');
            const progressText = moduleCard.querySelector('.progress-text');

            progressFill.style.width = progress + '%';
            progressText.textContent = Math.round(progress) + '% Complete';

            // Save to localStorage
            const savedProgress = JSON.parse(localStorage.getItem('ott_progress') || '{}');
            savedProgress[moduleId] = progress;
            localStorage.setItem('ott_progress', JSON.stringify(savedProgress));
        }
    }

    // Accessibility Features
    setupAccessibility() {
        // Keyboard navigation for mobile menu
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    mobileToggle.click();
                }
            });
        }

        // Skip to main content link (add to HTML if needed)
        this.addSkipLink();

        // High contrast mode detection
        if (window.matchMedia && window.matchMedia('(prefers-contrast: high)').matches) {
            document.body.classList.add('high-contrast');
        }

        // Reduced motion detection
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('reduced-motion');
        }
    }

    addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add styles for skip link
        const style = document.createElement('style');
        style.textContent = `
            .skip-link {
                position: absolute;
                top: -40px;
                left: 6px;
                background: #000;
                color: #fff;
                padding: 8px;
                text-decoration: none;
                z-index: 1001;
                border-radius: 4px;
            }
            .skip-link:focus {
                top: 6px;
            }
        `;
        document.head.appendChild(style);
    }

    // Performance Monitoring
    setupPerformanceMonitoring() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            if ('performance' in window) {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
            }
        });

        // Lazy load images if any (placeholder for future images)
        this.setupLazyLoading();
    }

    setupLazyLoading() {
        // Intersection Observer for lazy loading
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            // Observe all images with data-src attribute
            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }

    // Utility Methods
    showModuleComingSoon(moduleId) {
        this.showNotification(`Module ${moduleId} content is coming soon! Check back later.`, 'info');
    }

    showToolComingSoon(toolName) {
        this.showNotification(`${toolName} will be available soon!`, 'info');
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create new notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
                <span class="notification-message">${message}</span>
                <button class="notification-close" aria-label="Close notification">&times;</button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
            color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
            border: 1px solid ${type === 'success' ? '#c3e6cb' : type === 'error' ? '#f5c6cb' : '#bee5eb'};
            border-radius: 8px;
            padding: 16px;
            z-index: 1002;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            max-width: 400px;
            animation: slideInRight 0.3s ease-out;
        `;

        // Add close functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease-out';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);

        document.body.appendChild(notification);
    }

    // Error Handling
    handleError(error, context = '') {
        console.error(`Options Trading Trainer Error${context ? ` (${context})` : ''}:`, error);

        // In production, you might want to send this to an error tracking service
        if (window.location.hostname !== 'localhost') {
            // Send error to tracking service
            this.showNotification('An error occurred. Please try again later.', 'error');
        }
    }

    // Data Export/Import (for progress tracking)
    exportProgress() {
        const progress = localStorage.getItem('ott_progress');
        if (progress) {
            const dataStr = JSON.stringify(JSON.parse(progress), null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);

            const link = document.createElement('a');
            link.href = url;
            link.download = 'options-trading-progress.json';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
    }

    importProgress(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const progress = JSON.parse(e.target.result);
                localStorage.setItem('ott_progress', JSON.stringify(progress));
                this.loadProgress();
                this.showNotification('Progress imported successfully!', 'success');
            } catch (error) {
                this.handleError(error, 'Import Progress');
                this.showNotification('Invalid file format.', 'error');
            }
        };
        reader.readAsText(file);
    }
}

// Add CSS animations for notifications
const notificationStyles = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .notification-icon {
        font-size: 1.2rem;
        font-weight: bold;
    }

    .notification-message {
        flex: 1;
    }

    .notification-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

// Add notification styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.optionsTradingTrainer = new OptionsTradingTrainer();
        console.log('Options Trading Trainer initialized successfully');
    } catch (error) {
        console.error('Failed to initialize Options Trading Trainer:', error);
    }
});

// Global error handler
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    // In production, send to error tracking service
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Register service worker when implemented
        // navigator.serviceWorker.register('/sw.js');
    });
}
