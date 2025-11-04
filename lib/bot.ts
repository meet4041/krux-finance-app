// lib/bot.ts
import { Conversation } from '@/types';

const RESPONSE_TEMPLATES = {
  greeting: [
    "Hello! I'm your KRUX Finance assistant. How can I help you with your loan today?",
    "Hi there! Welcome to KRUX Finance support. What can I assist you with?"
  ],
  loan_application: {
    general: "Our loan application process is simple and straightforward. We offer Business, Personal, and MSME loans. Which type are you interested in?",
    business: "For Business Loans, you'll need: Business registration documents, 6 months bank statements, KYC documents, and Business financials. Loan amounts range from ₹50,000 to ₹50,00,000.",
    personal: "Personal Loans require: KYC documents, 3 months salary slips, bank statements, and employment proof. Amounts range from ₹10,000 to ₹20,00,000.",
    msme: "MSME Loans need: Business registration, Udyam certificate, 6 months bank statements, and KYC documents. Special rates for MSME customers!"
  },
  documents: {
    general: "Document requirements vary by loan type. Common documents include: Aadhaar, PAN, address proof, income proof, and bank statements. Which loan type are you applying for?",
    formats: "Please submit clear, color scans of all documents. PDF format preferred for multiple pages. Maximum file size: 10MB per document."
  },
  status: {
    general: "To check your application status, I'll need your application ID. You can find it in your application confirmation email or SMS.",
    not_found: "I couldn't find an application with that ID. Please check the number and try again, or contact our support team for assistance.",
    sample_status: "Application #APP12345: ✓ Document verification ✓ Credit assessment → Current status: Under review. Expected completion: 2-3 business days."
  },
  escalation: "I understand you'd like to speak with a human agent. I'm connecting you with our support team now. They'll be with you shortly. Please hold...",
  fallback: "I'm not sure I understand. Could you please rephrase? Or you can ask about: loan applications, document requirements, application status, or speak to a human agent."
};

export const botService = {
  async getResponse(message: string, conversation: Conversation): Promise<string> {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    const lowerMessage = message.toLowerCase();

    // Greeting detection
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return this.getRandomResponse(RESPONSE_TEMPLATES.greeting);
    }

    // Loan application queries
    if (lowerMessage.includes('loan') || lowerMessage.includes('apply')) {
      if (lowerMessage.includes('business')) {
        return RESPONSE_TEMPLATES.loan_application.business;
      } else if (lowerMessage.includes('personal')) {
        return RESPONSE_TEMPLATES.loan_application.personal;
      } else if (lowerMessage.includes('msme')) {
        return RESPONSE_TEMPLATES.loan_application.msme;
      }
      return RESPONSE_TEMPLATES.loan_application.general;
    }

    // Document queries
    if (lowerMessage.includes('document') || lowerMessage.includes('doc') || lowerMessage.includes('paper')) {
      if (lowerMessage.includes('format') || lowerMessage.includes('scan')) {
        return RESPONSE_TEMPLATES.documents.formats;
      }
      return RESPONSE_TEMPLATES.documents.general;
    }

    // Status queries
    if (lowerMessage.includes('status') || lowerMessage.includes('check') || lowerMessage.includes('track')) {
      if (lowerMessage.includes('app') || lowerMessage.match(/app\d+/)) {
        return RESPONSE_TEMPLATES.status.sample_status;
      }
      return RESPONSE_TEMPLATES.status.general;
    }

    // Escalation requests
    if (lowerMessage.includes('human') || lowerMessage.includes('agent') || lowerMessage.includes('representative')) {
      return RESPONSE_TEMPLATES.escalation;
    }

    return RESPONSE_TEMPLATES.fallback;
  },

  getRandomResponse(responses: string[]): string {
    return responses[Math.floor(Math.random() * responses.length)];
  }
};