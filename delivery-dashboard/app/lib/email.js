const nodemailer = require('nodemailer');

// Create reusable transporter
const createTransporter = () => {
    return nodemailer.createTransporter({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    });
};

// Generic email sending function
const sendEmail = async (to, subject, html, text = '') => {
    try {
        const transporter = createTransporter();

        const mailOptions = {
            from: process.env.EMAIL_FROM || 'TopCup <noreply@topcup.com>',
            to,
            subject,
            html,
            text: text || html.replace(/<[^>]*>/g, '') // Strip HTML for text version
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Email sending failed:', error);
        return { success: false, error: error.message };
    }
};

// Send OTP email
const sendOTP = async (email, otp, name = 'User') => {
    const subject = 'Verify your TopCup account';
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .otp-box { background: white; border: 2px dashed #667eea; padding: 20px; text-align: center; margin: 20px 0; border-radius: 10px; }
                .otp-code { font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 5px; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
                .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🧁 TopCup</h1>
                    <p style="margin: 0;">Verify Your Account</p>
                </div>
                <div class="content">
                    <h2>Hi ${name}!</h2>
                    <p>Thank you for signing up with TopCup. Please use the OTP below to verify your email address:</p>
                    
                    <div class="otp-box">
                        <p style="margin: 0; color: #666;">Your OTP Code</p>
                        <div class="otp-code">${otp}</div>
                        <p style="margin: 10px 0 0 0; color: #999; font-size: 14px;">Valid for 10 minutes</p>
                    </div>
                    
                    <p><strong>Note:</strong> If you didn't request this code, please ignore this email.</p>
                    
                    <div class="footer">
                        <p>This email was sent by TopCup</p>
                        <p>Need help? Contact us at support@topcup.com</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;

    return await sendEmail(email, subject, html);
};

// Send password reset email
const sendPasswordReset = async (email, resetLink, name = 'User') => {
    const subject = 'Reset your TopCup password';
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .button { display: inline-block; padding: 15px 40px; background: #667eea; color: white; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: bold; }
                .button:hover { background: #5568d3; }
                .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🧁 TopCup</h1>
                    <p style="margin: 0;">Password Reset Request</p>
                </div>
                <div class="content">
                    <h2>Hi ${name}!</h2>
                    <p>We received a request to reset your TopCup password. Click the button below to create a new password:</p>
                    
                    <div style="text-align: center;">
                        <a href="${resetLink}" class="button">Reset Password</a>
                    </div>
                    
                    <p style="color: #666; font-size: 14px;">Or copy and paste this link into your browser:</p>
                    <p style="word-break: break-all; color: #667eea;">${resetLink}</p>
                    
                    <div class="warning">
                        <strong>⚠️ Security Notice:</strong> This link will expire in 1 hour. If you didn't request a password reset, please ignore this email and your password will remain unchanged.
                    </div>
                    
                    <div class="footer">
                        <p>This email was sent by TopCup</p>
                        <p>Need help? Contact us at support@topcup.com</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;

    return await sendEmail(email, subject, html);
};

// Send order confirmation email
const sendOrderConfirmation = async (email, orderDetails) => {
    const subject = `Order Confirmed - #${orderDetails.orderId}`;
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; }
                .order-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
                .item { border-bottom: 1px solid #eee; padding: 10px 0; }
                .total { font-size: 20px; font-weight: bold; color: #667eea; text-align: right; margin-top: 10px; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🎉 Order Confirmed!</h1>
                    <p style="margin: 0;">Thank you for your order</p>
                </div>
                <div class="content">
                    <h2>Hi ${orderDetails.customerName}!</h2>
                    <p>Your order has been confirmed and is being prepared.</p>
                    
                    <div class="order-box">
                        <h3>Order #${orderDetails.orderId}</h3>
                        ${orderDetails.items.map(item => (`
                            <div class="item">
                                <strong>${item.name}</strong> x ${item.quantity}
                                <span style="float: right;">₹${item.price * item.quantity}</span>
                            </div>
                        `)).join('')}
                        <div class="total">Total: ₹${orderDetails.total}</div>
                    </div>
                    
                    <p><strong>Delivery Address:</strong><br>${orderDetails.address}</p>
                    <p><strong>Estimated Delivery:</strong> ${orderDetails.estimatedDelivery}</p>
                    
                    <div class="footer">
                        <p>Track your order at www.topcup.com/orders/${orderDetails.orderId}</p>
                        <p>Questions? Contact us at support@topcup.com</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;

    return await sendEmail(email, subject, html);
};

module.exports = {
    sendEmail,
    sendOTP,
    sendPasswordReset,
    sendOrderConfirmation
};
