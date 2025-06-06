const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security and middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});

const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // limit each IP to 5 contact form submissions per hour
    message: 'Too many contact form submissions, please try again later.'
});

app.use(limiter);

// Serve static files
app.use(express.static('public'));

// Email transporter configuration
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

// Verify email configuration
transporter.verify((error, success) => {
    if (error) {
        console.log('Email configuration error:', error);
    } else {
        console.log('Email server is ready to take our messages');
    }
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'abici.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'services.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/expertise', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'expertise.html'));
});

app.get('/case-studies', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'case-studies.html'));
});

app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'blog.html'));
});

app.get('/careers', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'careers.html'));
});

app.get('/privacy', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'privacy.html'));
});

app.get('/terms', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'terms.html'));
});

// Contact form submission
app.post('/contact', contactLimiter, async (req, res) => {
    try {
        const { name, email, company, message, phone, service } = req.body;

        // Input validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and message are required fields'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }

        // Prepare email content
        const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>New Contact Form Submission - ABICI</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
                .content { background: #f9f9f9; padding: 30px; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #2563eb; }
                .value { margin-top: 5px; padding: 10px; background: white; border-left: 4px solid #2563eb; }
                .footer { background: #1f2937; color: white; padding: 20px; text-align: center; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>ABICI - New Contact Form Submission</h1>
                </div>
                <div class="content">
                    <div class="field">
                        <div class="label">Name:</div>
                        <div class="value">${name}</div>
                    </div>
                    <div class="field">
                        <div class="label">Email:</div>
                        <div class="value">${email}</div>
                    </div>
                    ${company ? `
                    <div class="field">
                        <div class="label">Company:</div>
                        <div class="value">${company}</div>
                    </div>
                    ` : ''}
                    ${phone ? `
                    <div class="field">
                        <div class="label">Phone:</div>
                        <div class="value">${phone}</div>
                    </div>
                    ` : ''}
                    ${service ? `
                    <div class="field">
                        <div class="label">Service Interest:</div>
                        <div class="value">${service}</div>
                    </div>
                    ` : ''}
                    <div class="field">
                        <div class="label">Message:</div>
                        <div class="value">${message}</div>
                    </div>
                    <div class="field">
                        <div class="label">Submitted:</div>
                        <div class="value">${new Date().toLocaleString()}</div>
                    </div>
                </div>
                <div class="footer">
                    <p>This message was sent from the ABICI website contact form.</p>
                    <p>Please respond promptly to maintain our high service standards.</p>
                </div>
            </div>
        </body>
        </html>
        `;

        // Auto-reply email for the client
        const autoReplyHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Thank You for Contacting ABICI</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
                .content { background: #f9f9f9; padding: 30px; }
                .footer { background: #1f2937; color: white; padding: 20px; text-align: center; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Thank You for Contacting ABICI</h1>
                </div>
                <div class="content">
                    <p>Dear ${name},</p>
                    <p>Thank you for reaching out to ABICI. We have received your message and appreciate your interest in our management consulting and lead auditing services.</p>
                    <p>Our team will review your inquiry and respond within 24 hours. In the meantime, feel free to explore our services and expertise on our website.</p>
                    <p>If your matter is urgent, please don't hesitate to call us at +46 8 123 456 78.</p>
                    <p>Best regards,<br>The ABICI Team</p>
                </div>
                <div class="footer">
                    <p>ABICI - Leading Management Consultancy</p>
                    <p>Stockholm, Sweden | contact@abici.com | +46 8 123 456 78</p>
                </div>
            </div>
        </body>
        </html>
        `;

        // Send email to admin
        await transporter.sendMail({
            from: `"ABICI Website" <${process.env.SMTP_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: `New Contact Form Submission from ${name}`,
            html: emailHtml,
            replyTo: email
        });

        // Send auto-reply to client
        await transporter.sendMail({
            from: `"ABICI" <${process.env.SMTP_USER}>`,
            to: email,
            subject: 'Thank you for contacting ABICI',
            html: autoReplyHtml
        });

        // Log the submission (in production, you might want to use a proper logging service)
        console.log(`Contact form submission: ${name} (${email}) - ${new Date().toISOString()}`);

        res.json({
            success: true,
            message: 'Message sent successfully! We will get back to you within 24 hours.'
        });

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again later or contact us directly.'
        });
    }
});

// Newsletter subscription
app.post('/newsletter', contactLimiter, async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }

        // Send notification to admin
        await transporter.sendMail({
            from: `"ABICI Website" <${process.env.SMTP_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: 'New Newsletter Subscription',
            html: `
                <h2>New Newsletter Subscription</h2>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
            `
        });

        // Send welcome email to subscriber
        await transporter.sendMail({
            from: `"ABICI" <${process.env.SMTP_USER}>`,
            to: email,
            subject: 'Welcome to ABICI Newsletter',
            html: `
                <h2>Welcome to ABICI Newsletter</h2>
                <p>Thank you for subscribing to our newsletter. You'll receive updates about our latest insights, industry trends, and company news.</p>
                <p>Best regards,<br>The ABICI Team</p>
            `
        });

        res.json({
            success: true,
            message: 'Successfully subscribed to newsletter!'
        });

    } catch (error) {
        console.error('Newsletter subscription error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to subscribe. Please try again later.'
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Error handler
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

app.listen(PORT, () => {
    console.log(`ABICI server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});