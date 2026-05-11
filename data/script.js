window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.classList.add('hide');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1000);
});


const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
        cursorFollower.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
    });
    
    document.querySelectorAll('a, button, .btn-primary, .btn-secondary, .social-link, .project-card, .tag').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorFollower.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            cursorFollower.classList.remove('active');
        });
    });
}


const roles = ['Frontend Developer', 'UI/UX Designer', 'React Expert', 'Vue Developer'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingText = document.querySelector('.typing-text');

function typeEffect() {
    if (!typingText) return;
    
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 500);
        return;
    }
    
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
}

if (typingText) {
    setTimeout(typeEffect, 500);
}



const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    if (currentScroll > lastScroll && currentScroll > 300) {
        navbar.classList.add('hide');
    } else {
        navbar.classList.remove('hide');
    }
    
    lastScroll = currentScroll;
});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link, .mobile-link');

function updateActiveLink() {
    let current = '';
    const scrollPosition = window.scrollY + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && href === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink();


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
          
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});


const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}


const themeToggle = document.getElementById('themeToggle');
let isDark = true;

const savedTheme = localStorage.getItem('portfolio_theme');
if (savedTheme === 'light') {
    isDark = false;
    document.body.classList.add('light-mode');
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
    document.body.classList.remove('light-mode');
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

function toggleTheme() {
    isDark = !isDark;
    
    if (isDark) {
        document.body.classList.remove('light-mode');
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('portfolio_theme', 'dark');
    } else {
        document.body.classList.add('light-mode');
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('portfolio_theme', 'light');
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}


const skillItems = document.querySelectorAll('.skill-item');

function animateSkillBars() {
    skillItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        
        if (isVisible) {
            const progress = item.querySelector('.skill-progress');
            if (progress && !item.classList.contains('animated')) {
                const width = progress.style.width;
                progress.style.width = '0';
                setTimeout(() => {
                    progress.style.width = width;
                }, 100);
                item.classList.add('animated');
            }
        }
    });
}

window.addEventListener('scroll', animateSkillBars);
animateSkillBars();


const revealElements = document.querySelectorAll('.project-card, .stat-card, .skill-category, .about-text, .about-stats, .contact-info, .contact-form');

function revealOnScroll() {
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        
        if (isVisible) {
            el.classList.add('active');
        }
    });
}

revealElements.forEach(el => {
    el.classList.add('reveal');
});

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

const EMAILJS_PUBLIC_KEY = "9DIuAhvfS7yf_Ap-K"; 
const EMAILJS_SERVICE_ID = "service_osl9x3c";   
const EMAILJS_TEMPLATE_ID = "template_jy56h5m";  

emailjs.init(EMAILJS_PUBLIC_KEY);

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        const nameInput = document.querySelector('#contactForm input[name="name"]');
        const phoneInput = document.querySelector('#contactForm input[name="phone"]');
        const subjectInput = document.querySelector('#contactForm input[name="subject"]');
        const messageTextarea = document.querySelector('#contactForm textarea[name="message"]');
        
        const name = nameInput ? nameInput.value.trim() : '';
        const phone = phoneInput ? phoneInput.value.trim() : '';
        const subject = subjectInput ? subjectInput.value.trim() : '';
        const message = messageTextarea ? messageTextarea.value.trim() : '';
        
        if (!name) {
            showNotification('Please enter your name!', 'error');
            nameInput?.focus();
            return;
        }
        
        if (!phone) {
            showNotification('Please enter your phone number!', 'error');
            phoneInput?.focus();
            return;
        }
        
        if (!message) {
            showNotification('Please enter your message!', 'error');
            messageTextarea?.focus();
            return;
        }
        
        const templateParams = {
            from_name: name,
            from_phone: phone,
            subject: subject || 'No subject',
            message: message,
            to_name: 'SeYeD AmiR',
            reply_to: `${name} <${phone}>`
        };
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            const response = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
            
            console.log('✅ Email sent successfully!', response);
            
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            
            if (nameInput) nameInput.value = '';
            if (phoneInput) phoneInput.value = '';
            if (subjectInput) subjectInput.value = '';
            if (messageTextarea) messageTextarea.value = '';
            
            showNotification('Message sent successfully! I will get back to you soon.', 'success');
            
            const backupKey = "contact_messages_backup";
            const existing = JSON.parse(localStorage.getItem(backupKey) || '[]');
            existing.push({
                id: Date.now(),
                name, phone, subject, message,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem(backupKey, JSON.stringify(existing.slice(-50)));
            
        } catch (error) {
            console.error('❌ EmailJS Error:', error);
         
            const mailtoLink = `mailto:seyedamir.fatemi@gmail.com?subject=Message from ${name}&body=
Name: ${name}%0A
Phone: ${phone}%0A
Subject: ${subject}%0A
Message: ${message}%0A
---%0A
Sent from your portfolio site`;
            
            if (confirm('Email service failed. Would you like to open your email client instead?')) {
                window.location.href = mailtoLink;
            }
            
            submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Failed!';
            showNotification('Failed to send. Please try again or email me directly.', 'error');
        }
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 3000);
    });
}

function showNotification(message, type = 'success') {
    const oldToast = document.querySelector('.custom-toast');
    if (oldToast) oldToast.remove();
    
    const notification = document.createElement('div');
    notification.className = 'custom-toast';
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 14px 24px;
        border-radius: 12px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-size: 14px;
        box-shadow: 0 10px 25px -5px rgba(0,0,0,0.2);
        font-family: 'Space Grotesk', monospace;
    `;
    notification.innerHTML = type === 'success' 
        ? '<i class="fas fa-check-circle"></i> ' + message 
        : '<i class="fas fa-times-circle"></i> ' + message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

const toastStyle = document.createElement('style');
toastStyle.textContent = `
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100px); opacity: 0; }
    }
`;
document.head.appendChild(toastStyle);

console.log('✅ Contact form loaded with EmailJS');


let header = document.querySelector('.glass-nav');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});


const heroImage = document.querySelector('.hero-image');

window.addEventListener('scroll', () => {
    if (heroImage) {
        const scrolled = window.pageYOffset;
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});


const gradientBg = document.querySelector('.gradient-bg');

document.addEventListener('mousemove', (e) => {
    if (gradientBg) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        gradientBg.style.background = `
            radial-gradient(circle at ${x}% ${y}%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at ${100 - x}% ${100 - y}%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)
        `;
    }
});


const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);