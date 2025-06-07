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

// Email transporter configuration with improved settings
const createTransporter = () => {
    // Try multiple SMTP configurations
    const configs = [
        // Gmail configuration
        {
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        },
        // Generic SMTP configuration with timeout and connection settings
        {
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            },
            tls: {
                rejectUnauthorized: false,
                ciphers: 'SSLv3'
            },
            connectionTimeout: 10000, // 10 seconds
            greetingTimeout: 5000, // 5 seconds
            socketTimeout: 10000, // 10 seconds
            debug: process.env.NODE_ENV === 'development',
            logger: process.env.NODE_ENV === 'development'
        }
    ];

    // Use Gmail service if available, otherwise use generic SMTP
    if (process.env.SMTP_HOST === 'smtp.gmail.com' || !process.env.SMTP_HOST) {
        return nodemailer.createTransport(configs[0]);
    } else {
        return nodemailer.createTransport(configs[1]);
    }
};

const transporter = createTransporter();

// Enhanced email verification with better error handling
const verifyEmailConfig = async () => {
    try {
        console.log('Verifying email configuration...');
        console.log('SMTP Host:', process.env.SMTP_HOST || 'smtp.gmail.com');
        console.log('SMTP Port:', process.env.SMTP_PORT || 587);
        console.log('SMTP User:', process.env.SMTP_USER ? 'Set' : 'Not set');
        console.log('SMTP Pass:', process.env.SMTP_PASS ? 'Set' : 'Not set');
        
        await transporter.verify();
        console.log('✓ Email server is ready to take our messages');
        return true;
    } catch (error) {
        console.error('✗ Email configuration error:', error.message);
        console.error('Error code:', error.code);
        
        // Provide specific troubleshooting advice
        if (error.code === 'ETIMEDOUT') {
            console.error('\nTroubleshooting steps:');
            console.error('1. Check your internet connection');
            console.error('2. Verify SMTP server settings');
            console.error('3. Check if firewall is blocking the connection');
            console.error('4. For Gmail: Enable "Less secure app access" or use App Password');
            console.error('5. Try using port 465 with secure: true for SSL');
        } else if (error.code === 'EAUTH') {
            console.error('\nAuthentication failed:');
            console.error('1. Check username and password');
            console.error('2. For Gmail: Use App Password instead of regular password');
            console.error('3. Enable 2-factor authentication and generate App Password');
        }
        
        return false;
    }
};

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'abici.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/terms', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'terms.html'));
});

// Enhanced contact form submission with better error handling
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

        // Check if email service is available before attempting to send
        try {
            await transporter.verify();
        } catch (verifyError) {
            console.error('Email service unavailable:', verifyError.message);
            return res.status(503).json({
                success: false,
                message: 'Email service is temporarily unavailable. Please try again later or contact us directly at contact@abici.com'
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

        // Send emails with timeout handling
        const emailPromises = [
            // Send email to admin
            transporter.sendMail({
                from: `"ABICI Website" <${process.env.SMTP_USER}>`,
                to: process.env.ADMIN_EMAIL,
                subject: `New Contact Form Submission from ${name}`,
                html: emailHtml,
                replyTo: email
            }),
            // Send auto-reply to client
            transporter.sendMail({
                from: `"ABICI" <${process.env.SMTP_USER}>`,
                to: email,
                subject: 'Thank you for contacting ABICI',
                html: autoReplyHtml
            })
        ];

        // Wait for both emails with timeout
        await Promise.all(emailPromises);

        // Log the submission
        console.log(`Contact form submission: ${name} (${email}) - ${new Date().toISOString()}`);

        res.json({
            success: true,
            message: 'Message sent successfully! We will get back to you within 24 hours.'
        });

    } catch (error) {
        console.error('Contact form error:', error);
        
        // Provide more specific error messages
        let errorMessage = 'Failed to send message. Please try again later or contact us directly.';
        
        if (error.code === 'ETIMEDOUT') {
            errorMessage = 'Email service timeout. Please try again or contact us directly at contact@abici.com';
        } else if (error.code === 'EAUTH') {
            errorMessage = 'Email authentication failed. Please contact us directly at contact@abici.com';
        }
        
        res.status(500).json({
            success: false,
            message: errorMessage
        });
    }
});

// Newsletter subscription with better error handling
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

        // Check email service availability
        try {
            await transporter.verify();
        } catch (verifyError) {
            return res.status(503).json({
                success: false,
                message: 'Email service is temporarily unavailable. Please try again later.'
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

// Initialize server
const startServer = async () => {
    // Verify email configuration on startup
    const emailReady = await verifyEmailConfig();
    
    if (!emailReady) {
        console.warn('⚠️  Server starting without email functionality');
        console.warn('Contact forms will show appropriate error messages to users');
    }
    
    app.listen(PORT, () => {
        console.log(`ABICI server running on port ${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`Email status: ${emailReady ? '✓ Ready' : '✗ Not configured'}`);
    });
};

startServer();