import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Enquiry, EnquiryDocument } from './schemas/enquiry.schema';

@Injectable()
export class EnquiriesService {
  private readonly logger = new Logger(EnquiriesService.name);
  private transporter: nodemailer.Transporter;

  constructor(
    @InjectModel(Enquiry.name) private enquiryModel: Model<EnquiryDocument>,
    private configService: ConfigService,
  ) {
    this.initializeTransporter();
  }

  private initializeTransporter() {
    const host = this.configService.get<string>('EMAIL_HOST') || 'smtp.gmail.com';
    const port = Number(this.configService.get<string>('EMAIL_PORT') || '587');
    const secure = this.configService.get<string>('EMAIL_SECURE') === 'true';
    const user = this.configService.get<string>('EMAIL_USER');
    const pass = this.configService.get<string>('EMAIL_PASS');

    if (user && pass) {
      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: { user, pass },
      });
      this.logger.log(`Nodemailer SMTP transporter initialized with user: ${user}`);
    } else {
      this.logger.warn('Nodemailer SMTP credentials missing. Emails will not be sent.');
    }
  }

  async findAll(): Promise<Enquiry[]> {
    return this.enquiryModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Enquiry> {
    const enquiry = await this.enquiryModel.findById(id).exec();
    if (!enquiry) {
      throw new NotFoundException(`Enquiry with ID ${id} not found`);
    }
    return enquiry;
  }

  async create(enquiryData: any): Promise<Enquiry> {
    const createdEnquiry = new this.enquiryModel(enquiryData);
    const savedEnquiry = await createdEnquiry.save();

    // Trigger email notification asynchronously
    this.sendNotificationEmail(savedEnquiry);

    return savedEnquiry;
  }

  async updateStatus(id: string, status: string): Promise<Enquiry> {
    const updatedEnquiry = await this.enquiryModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();
    if (!updatedEnquiry) {
      throw new NotFoundException(`Enquiry with ID ${id} not found`);
    }
    return updatedEnquiry;
  }

  async remove(id: string): Promise<any> {
    const result = await this.enquiryModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Enquiry with ID ${id} not found`);
    }
    return result;
  }

  private async sendNotificationEmail(enquiry: Enquiry) {
    if (!this.transporter) {
      this.logger.warn('SMTP transporter not initialized. Skipping email notification.');
      return;
    }

    const mailFrom = this.configService.get<string>('MAIL_FROM') || 'samunder2611@gmail.com';
    const receiver = this.configService.get<string>('CONTACT_RECEIVER_EMAIL') || 'samunder2611@gmail.com';

    const mailOptions = {
      from: mailFrom,
      to: receiver,
      subject: `New Lead Inquiry: ${enquiry.subject || 'General Request'}`,
      text: `
        You have received a new inquiry on ParshYogaMat.

        Customer Details:
        - Name: ${enquiry.name}
        - Email: ${enquiry.email}
        - Phone: ${enquiry.phone}
        - Date: ${enquiry.date}
        - Interested In: ${enquiry.product || 'General Inquiry'}

        Message:
        ${enquiry.message}

        Please log in to the admin panel to update its status.
      `,
      html: `
        <h3>New Lead Inquiry Received</h3>
        <p>You have received a new inquiry on ParshYogaMat.</p>
        <table border="1" cellpadding="6" style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td><strong>Customer Name</strong></td>
            <td>${enquiry.name}</td>
          </tr>
          <tr>
            <td><strong>Email</strong></td>
            <td>${enquiry.email}</td>
          </tr>
          <tr>
            <td><strong>Phone</strong></td>
            <td>${enquiry.phone}</td>
          </tr>
          <tr>
            <td><strong>Interested Product</strong></td>
            <td>${enquiry.product || 'General Inquiry'}</td>
          </tr>
          <tr>
            <td><strong>Subject</strong></td>
            <td>${enquiry.subject || 'General'}</td>
          </tr>
          <tr>
            <td><strong>Date</strong></td>
            <td>${enquiry.date}</td>
          </tr>
        </table>
        <p><strong>Message:</strong></p>
        <blockquote style="background: #f9f9f9; border-left: 6px solid #ccc; padding: 12px;">
          ${enquiry.message.replace(/\n/g, '<br/>')}
        </blockquote>
      `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      this.logger.log(`Notification email sent: ${info.messageId}`);
    } catch (error) {
      this.logger.error('Failed to send notification email', error.stack);
    }
  }
}
