// ============================================
// JOB PORTAL WEBSITE - MAIN JAVASCRIPT FILE
// ============================================

// 1. SEARCH FUNCTIONALITY
function searchJobs() {
    const jobTitle = document.getElementById('job-title')?.value.toLowerCase() || '';
    const location = document.getElementById('location')?.value.toLowerCase() || '';
    const jobCards = document.querySelectorAll('.job-card');
    
    jobCards.forEach(card => {
        const title = card.querySelector('.job-title')?.textContent.toLowerCase() || '';
        const meta = card.querySelector('.job-meta')?.textContent.toLowerCase() || '';
        
        const matchesTitle = title.includes(jobTitle) || jobTitle === '';
        const matchesLocation = meta.includes(location) || location === '';
        
        card.style.display = (matchesTitle && matchesLocation) ? 'block' : 'none';
    });
}

// 2. FORM VALIDATION
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ff6b6b';
            input.style.boxShadow = '0 0 5px rgba(255, 107, 107, 0.5)';
            isValid = false;
        } else {
            input.style.borderColor = '#ccc';
            input.style.boxShadow = 'none';
        }
    });
    
    if (!isValid) {
        alert('Please fill all required fields!');
    }
    return isValid;
}

// 3. JOB APPLICATION FORM HANDLER
function submitApplication(event) {
    event.preventDefault();
    
    if (!validateForm('applicationForm')) return;
    
    const fullName = document.querySelector('input[placeholder="Your full name"]')?.value;
    const email = document.querySelector('input[placeholder="example@email.com"]')?.value;
    const phone = document.querySelector('input[placeholder="+252 ..."]')?.value;
    
    alert(`Thank you ${fullName}! Your application has been submitted.\nWe'll contact you at ${email} soon.`);
    document.getElementById('applicationForm')?.reset();
}

// 4. CONTACT FORM HANDLER
function submitContact(event) {
    event.preventDefault();
    
    const name = document.querySelector('input[placeholder="Your Name"]')?.value;
    const email = document.querySelector('input[placeholder="your@email.com"]')?.value;
    const message = document.querySelector('textarea[placeholder*="Message"]')?.value;
    
    if (name && email && message) {
        alert(`Thank you ${name}! Your message has been sent.\nWe'll reply to ${email} shortly.`);
        event.target.reset();
    } else {
        alert('Please fill all fields!');
    }
}

// 5. POST JOB FORM HANDLER
function submitJobPosting(event) {
    event.preventDefault();
    
    if (!validateForm('jobPostForm')) return;
    
    const jobTitle = document.querySelector('input[name="job_title"]')?.value;
    const company = document.querySelector('input[name="company_name"]')?.value;
    
    alert(`Job posting for "${jobTitle}" at ${company} submitted successfully!`);
    event.target.reset();
}

// 6. NAVIGATION ACTIVE STATE
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'home-page replacment.html';
    const navLinks = document.querySelectorAll('nav a, .nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes(currentPage)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// 7. SMOOTH SCROLLING
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// 8. TOGGLE MOBILE MENU
function toggleMobileMenu() {
    const nav = document.querySelector('nav');
    if (nav) {
        nav.classList.toggle('mobile-active');
    }
}

// 9. LOCAL STORAGE - SAVE FAVORITES
function saveFavoriteJob(jobTitle) {
    let favorites = JSON.parse(localStorage.getItem('favoriteJobs')) || [];
    if (!favorites.includes(jobTitle)) {
        favorites.push(jobTitle);
        localStorage.setItem('favoriteJobs', JSON.stringify(favorites));
        alert(`✓ "${jobTitle}" added to favorites!`);
    } else {
        alert('Already in favorites!');
    }
}

function getFavoriteJobs() {
    return JSON.parse(localStorage.getItem('favoriteJobs')) || [];
}

// 10. FILTER JOBS BY STATUS
function filterJobsByStatus(status) {
    const jobCards = document.querySelectorAll('.job-card');
    jobCards.forEach(card => {
        const jobStatus = card.getAttribute('data-status');
        card.style.display = (status === 'all' || jobStatus === status) ? 'block' : 'none';
    });
}

// 11. LOGIN FORM VALIDATION
function validateLogin(event) {
    event.preventDefault();
    
    const email = document.querySelector('input[type="email"]')?.value;
    const password = document.querySelector('input[type="password"]')?.value;
    
    if (email && password) {
        if (email.includes('@')) {
            alert(`Welcome back! Logging in as ${email}`);
            // Here you would typically send to a server
        } else {
            alert('Please enter a valid email address!');
        }
    }
}

// 12. SHOW PASSWORD TOGGLE
function togglePasswordVisibility() {
    const passwordInput = document.querySelector('input[type="password"]');
    if (passwordInput) {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
    }
}

// 13. COUNTDOWN TIMER FOR APPLICATIONS
function startApplicationDeadlineTimer(deadline) {
    const timerElement = document.querySelector('.application-deadline');
    if (!timerElement) return;
    
    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = new Date(deadline).getTime() - now;
        
        if (distance <= 0) {
            timerElement.textContent = 'Application Closed';
            timerElement.style.color = '#ff6b6b';
        } else {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            timerElement.textContent = `${days}d ${hours}h remaining`;
        }
    };
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

// 14. DARK MODE TOGGLE
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

function loadDarkModePreference() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}

// 15. LOAD MORE JOBS
let jobsDisplayed = 6;
function loadMoreJobs() {
    const allJobs = document.querySelectorAll('.job-card');
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    for (let i = jobsDisplayed; i < jobsDisplayed + 6 && i < allJobs.length; i++) {
        allJobs[i].style.display = 'block';
    }
    
    jobsDisplayed += 6;
    
    if (jobsDisplayed >= allJobs.length) {
        loadMoreBtn?.style.display = 'none';
    }
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    setActiveNav();
    loadDarkModePreference();
    
    // Attach search event listener
    const searchBtn = document.querySelector('.btn-search');
    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            searchJobs();
        });
    }
    
    // Attach form listeners
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            if (form.id === 'applicationForm') {
                submitApplication(e);
            } else if (form.classList.contains('contact-form') || form.classList.contains('post-form')) {
                e.preventDefault();
                validateForm(form.id);
            }
        });
    });
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Email validation
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Phone validation
function isValidPhone(phone) {
    return /^\+?[0-9\s\-()]{7,}$/.test(phone);
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Get URL parameters
function getURLParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

console.log('✓ Job Portal JavaScript loaded successfully!');
