import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendConfirmationEmail = async ({ to, guestName, apartmentInfo, checkInDate, isAdmin = false, guestInfo }) => {
  try {
    let subject, html;

    if (isAdmin) {
      // Email to admin
      subject = `New Check-in: ${guestInfo.name} - ${apartmentInfo.complex} ${apartmentInfo.number}`;
      html = `
        <h2>New Guest Check-in</h2>
        <p><strong>Date:</strong> ${new Date(checkInDate).toLocaleString()}</p>
        <h3>Guest Information:</h3>
        <p><strong>Name:</strong> ${guestInfo.name}</p>
        <p><strong>Phone:</strong> ${guestInfo.phone}</p>
        <p><strong>Email:</strong> ${guestInfo.email}</p>
        <h3>Apartment Details:</h3>
        <p><strong>Complex:</strong> ${apartmentInfo.complex}</p>
        <p><strong>Unit:</strong> ${apartmentInfo.number}</p>
        <p><strong>Address:</strong> ${apartmentInfo.address}</p>
      `;
    } else {
      // Email to guest
      subject = 'Welcome to Furnished Apartments Dallas';
      html = `
        <h2>Welcome ${guestName}!</h2>
        <p>Thank you for checking in to your furnished apartment.</p>
        <h3>Your Check-in Details:</h3>
        <p><strong>Date:</strong> ${new Date(checkInDate).toLocaleString()}</p>
        <p><strong>Complex:</strong> ${apartmentInfo.complex}</p>
        <p><strong>Unit:</strong> ${apartmentInfo.number}</p>
        <p><strong>Address:</strong> ${apartmentInfo.address}</p>
        <h3>Important Contact Information:</h3>
        <p>For ANY concerns or questions, please contact us directly:</p>
        <p>Email: customerservice@furnished-apartments-dallas.com</p>
        <p>Phone: 713-766-0495</p>
        <p><strong>Important:</strong> Please do NOT contact the building leasing office. All communication must go through Furnished Apartments Dallas directly.</p>
      `;
    }

    await transporter.sendMail({
      from: '"Furnished Apartments Dallas" <customerservice@furnished-apartments-dallas.com>',
      to,
      subject,
      html
    });
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error('Failed to send confirmation email');
  }
};