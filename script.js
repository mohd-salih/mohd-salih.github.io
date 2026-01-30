// ============================================================
// CONFIGURATION SECTION - Choose your preferred method
// ============================================================

const CONTACT_CONFIG = {
    // Method 1: Discord Webhook (Recommended for instant notifications)
    // Get webhook URL from: Discord Server Settings > Integrations > Webhooks
    discord: {
        enabled: true,
        webhookUrl: 'https://discord.com/api/webhooks/1466334199395913903/9OluS8TYPpd-E3WaWBrjuyIJpYIUmapGm9fnF7Sp7zwWcsm367Ms_al-SZSr-8kU016H'  // ← PASTE YOUR URL HERE
    },
    
    // Method 2: EmailJS (Free email service)
    // Sign up at: https://www.emailjs.com/
    emailjs: {
        enabled: false, // Set to true to enable EmailJS
        publicKey: 'YOUR_EMAILJS_PUBLIC_KEY',
        serviceId: 'YOUR_SERVICE_ID',
        templateId: 'YOUR_TEMPLATE_ID'
    },
    
    // Method 3: FormSubmit (Simple email forwarding)
    // Just use your email in the URL below
    formsubmit: {
        enabled: false, // Set to true to enable FormSubmit
        email: 'iam.salih@outlook.com'
    }
};

// ============================================================
// Navigation & UI Scripts (Keep as is)
// ============================================================

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

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

function initAOS() {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    elements.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initAOS);

// ============================================================
// ENHANCED CONTACT FORM HANDLER
// ============================================================

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.btn-submit');
        submitBtn.classList.add('loading');
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toLocaleString()
        };
        
        try {
            let success = false;
            
            // Method 1: Send to Discord
            if (CONTACT_CONFIG.discord.enabled) {
                success = await sendToDiscord(formData);
            }
            
            // Method 2: Send via EmailJS
            if (CONTACT_CONFIG.emailjs.enabled) {
                success = await sendViaEmailJS(formData) || success;
            }
            
            // Method 3: Send via FormSubmit
            if (CONTACT_CONFIG.formsubmit.enabled) {
                success = await sendViaFormSubmit(formData) || success;
            }
            
            // If no method is enabled, show configuration warning
            if (!CONTACT_CONFIG.discord.enabled && 
                !CONTACT_CONFIG.emailjs.enabled && 
                !CONTACT_CONFIG.formsubmit.enabled) {
                console.warn('⚠️ No contact form method enabled! Please configure in script.js');
                // Still show success for demo purposes
                success = true;
            }
            
            if (success) {
                // Show success message
                formSuccess.classList.add('show');
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.classList.remove('show');
                }, 5000);
            } else {
                throw new Error('Failed to send message');
            }
            
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting your message. Please try again or contact me directly via email at iam.salih@outlook.com');
        } finally {
            submitBtn.classList.remove('loading');
        }
    });
}

// ============================================================
// Method 1: Discord Webhook Integration
// ============================================================

async function sendToDiscord(formData) {
    if (!CONTACT_CONFIG.discord.webhookUrl || 
        CONTACT_CONFIG.discord.webhookUrl === 'YOUR_DISCORD_WEBHOOK_URL_HERE') {
        console.warn('Discord webhook URL not configured');
        return false;
    }
    
    try {
        // Create rich embed for Discord
        const embed = {
            title: "🔔 New Portfolio Contact Form Submission",
            color: 0x00ff88, // Green color matching your theme
            fields: [
                {
                    name: "👤 Name",
                    value: formData.name,
                    inline: true
                },
                {
                    name: "📧 Email",
                    value: formData.email,
                    inline: true
                },
                {
                    name: "📋 Subject",
                    value: formData.subject,
                    inline: false
                },
                {
                    name: "💬 Message",
                    value: formData.message.length > 1024 ? 
                           formData.message.substring(0, 1021) + '...' : 
                           formData.message,
                    inline: false
                },
                {
                    name: "🕐 Timestamp",
                    value: formData.timestamp,
                    inline: false
                }
            ],
            footer: {
                text: "Portfolio Contact Form"
            },
            timestamp: new Date().toISOString()
        };
        
        const response = await fetch(CONTACT_CONFIG.discord.webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: "Portfolio Bot",
                avatar_url: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                embeds: [embed]
            })
        });
        
        if (response.ok) {
            console.log('✅ Message sent to Discord successfully!');
            return true;
        } else {
            console.error('Discord webhook error:', await response.text());
            return false;
        }
    } catch (error) {
        console.error('Discord send error:', error);
        return false;
    }
}

// ============================================================
// Method 2: EmailJS Integration
// ============================================================

async function sendViaEmailJS(formData) {
    if (!window.emailjs) {
        console.warn('EmailJS library not loaded. Add the script tag to your HTML.');
        return false;
    }
    
    try {
        emailjs.init(CONTACT_CONFIG.emailjs.publicKey);
        
        const response = await emailjs.send(
            CONTACT_CONFIG.emailjs.serviceId,
            CONTACT_CONFIG.emailjs.templateId,
            {
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message,
                timestamp: formData.timestamp
            }
        );
        
        console.log('✅ Email sent via EmailJS successfully!');
        return true;
    } catch (error) {
        console.error('EmailJS error:', error);
        return false;
    }
}

// ============================================================
// Method 3: FormSubmit Integration
// ============================================================

async function sendViaFormSubmit(formData) {
    try {
        const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_CONFIG.formsubmit.email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message,
                _captcha: 'false' // Disable captcha
            })
        });
        
        if (response.ok) {
            console.log('✅ Email sent via FormSubmit successfully!');
            return true;
        }
        return false;
    } catch (error) {
        console.error('FormSubmit error:', error);
        return false;
    }
}

// ============================================================
// Additional UI Features
// ============================================================

const heroBackground = document.querySelector('.hero-background');
if (heroBackground) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Email copied to clipboard!');
    });
}

document.querySelectorAll('.info-value, .contact-card p').forEach(element => {
    if (element.textContent.includes('@')) {
        element.style.cursor = 'pointer';
        element.addEventListener('click', () => {
            copyToClipboard(element.textContent);
            
            const originalText = element.textContent;
            element.textContent = 'Copied!';
            element.style.color = 'var(--primary)';
            
            setTimeout(() => {
                element.textContent = originalText;
                element.style.color = '';
            }, 2000);
        });
    }
});

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Console easter egg
console.log('%c👨‍💻 Hello, Recruiter! 👨‍💻', 'color: #00ff88; font-size: 20px; font-weight: bold;');
console.log('%cI see you\'re checking the console. I like that!', 'color: #9aa0a6; font-size: 14px;');
console.log('%cFeel free to reach out: iam.salih@outlook.com', 'color: #00ff88; font-size: 14px;');
console.log('%c⚡ Let\'s build secure systems together! ⚡', 'color: #00ff88; font-size: 16px; font-weight: bold;');