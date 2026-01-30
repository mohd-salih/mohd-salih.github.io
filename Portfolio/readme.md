# Mohammed Salih A - Portfolio Website

A professional, responsive portfolio website showcasing cybersecurity expertise and SOC analyst experience.

## Features

- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Cybersecurity-themed dark interface with smooth animations
- **Separate Project Pages**: Detailed pages for each major project
- **Contact Form**: Functional contact form ready for email integration
- **Performance Optimized**: Fast loading with CSS animations and optimized code

## File Structure

```
portfolio/
├── index.html              # Main landing page
├── project-wazuh.html      # Wazuh SIEM project details
├── project-splunk.html     # Splunk monitoring project details
├── project-ad.html         # Active Directory project details
├── styles.css              # Comprehensive styling
├── script.js               # Interactive functionality
└── README.md               # This file
```

## Quick Start

1. **Upload to Web Host**: Upload all files to your web hosting service (GitHub Pages, Netlify, Vercel, etc.)
2. **Configure Contact Form**: See "Contact Form Setup" below
3. **Customize Content**: Update personal information as needed

## Contact Form Setup

The contact form is currently configured with a simulated submission. To make it fully functional, choose one of these options:

### Option 1: EmailJS (Recommended - Free & Easy)

1. **Sign up** at [EmailJS](https://www.emailjs.com/)
2. **Create an email service** (Gmail, Outlook, etc.)
3. **Create an email template** with these variables:
   - `{{from_name}}` - sender's name
   - `{{from_email}}` - sender's email
   - `{{subject}}` - message subject
   - `{{message}}` - message content

4. **Update script.js** (lines 82-90):
```javascript
// Initialize EmailJS
emailjs.init("YOUR_PUBLIC_KEY");

// Send email
await emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData);
```

### Option 2: Backend API

Create your own backend endpoint and update the fetch call in script.js (lines 93-99):

```javascript
const response = await fetch('https://your-backend.com/api/contact', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
});
```

### Option 3: Form Services

Use services like:
- **Formspree**: https://formspree.io/
- **Getform**: https://getform.io/
- **Form-Data**: https://www.form-data.com/

## Customization

### Update Personal Information

Edit `index.html` to update:
- Contact details (email, phone, location)
- Professional summary
- Skills and certifications
- Project descriptions
- Social media links

### Change Color Scheme

Edit CSS variables in `styles.css` (lines 1-20):

```css
:root {
    --primary: #00ff88;        /* Main accent color */
    --secondary: #0a0e27;      /* Dark background */
    --accent: #ff3366;         /* Secondary accent */
    /* ... more variables ... */
}
```

### Add More Projects

1. Duplicate one of the project HTML files
2. Update content and metadata
3. Add a new project card in `index.html` (Projects section)
4. Link to the new project page

## Deployment Options

### GitHub Pages (Free)

1. Create a GitHub repository
2. Upload all files
3. Go to Settings > Pages
4. Select main branch as source
5. Your site will be live at `https://username.github.io/repository-name`

### Netlify (Free)

1. Drag and drop the entire folder to Netlify.com
2. Site goes live immediately
3. Automatic HTTPS and custom domain support

### Vercel (Free)

1. Import repository from GitHub
2. Deploy with one click
3. Automatic deployments on push

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Performance Features

- Lightweight CSS animations
- Optimized image loading
- Smooth scroll behavior
- Intersection Observer for scroll animations
- No external dependencies (except fonts)

## Security Considerations

- No inline scripts (CSP-friendly)
- Email validation on client side
- Rate limiting ready for backend implementation
- No sensitive data in frontend code

## Analytics (Optional)

To add Google Analytics, insert before `</head>` in all HTML files:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_GA_ID');
</script>
```

## License

All rights reserved © 2026 Mohammed Salih A

## Support

For questions or issues:
- Email: iam.salih@outlook.com
- LinkedIn: https://www.linkedin.com/in/mhmdsalih

## Credits

- Fonts: Google Fonts (JetBrains Mono, Outfit)
- Icons: Custom SVG icons
- Design: Custom cybersecurity-themed design

---

**Note**: Remember to update the contact form configuration before going live to ensure messages reach you!