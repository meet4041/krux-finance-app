// lib/bot.ts
import { Conversation } from '@/types';

const RESPONSE_TEMPLATES = {
  greeting: [
    "Hello! I'm your KRUX Finance assistant. How can I help you with your loan today?",
    "Hi there! Welcome to KRUX Finance support. What can I assist you with?",
    "Welcome to KRUX Finance! I'm here to help with your loan queries. How can I assist you today?",
    "Good day! I'm your KRUX Finance loan assistant. What brings you here today?"
  ],
  loan_application: {
    general: "Our loan application process is simple and straightforward. We offer Business, Personal, and MSME loans. Which type are you interested in?",
    business: `For Business Loans, here are the details:
• Required Documents: Business registration, 6 months bank statements, KYC documents, Business financials
• Loan Amount: ₹50,000 to ₹50,00,000
• Interest Rate: Starting from 10.5% p.a.
• Processing Time: 3-5 business days
• Eligibility: Business must be operational for 2+ years`,

    personal: `For Personal Loans, here are the details:
• Required Documents: KYC documents, 3 months salary slips, bank statements, employment proof
• Loan Amount: ₹10,000 to ₹20,00,000
• Interest Rate: Starting from 9.5% p.a.
• Processing Time: 24-48 hours
• Eligibility: Minimum monthly income ₹25,000`,

    msme: `For MSME Loans, here are the details:
• Required Documents: Business registration, Udyam certificate, 6 months bank statements, KYC documents
• Loan Amount: ₹1,00,000 to ₹2,00,00,000
• Interest Rate: Starting from 8.5% p.a. (Special rates for MSME)
• Processing Time: 2-4 business days
• Eligibility: Registered MSME with Udyam certificate`,

    eligibility: "To check your eligibility, I'll need some basic information. Could you share your monthly income/business turnover and the loan amount you're looking for?",
    interest_rates: "Our current interest rates: Personal Loans from 9.5%, Business Loans from 10.5%, MSME Loans from 8.5%. Rates vary based on credit profile and loan amount.",
    processing_time: "Processing times: Personal Loans (24-48 hours), Business Loans (3-5 days), MSME Loans (2-4 days). This includes document verification and approval."
  },
  documents: {
    general: "Document requirements vary by loan type. Common documents include: Aadhaar, PAN, address proof, income proof, and bank statements. Which loan type are you applying for?",
    formats: `Please submit clear, color scans of all documents:
• PDF format preferred for multiple pages
• Maximum file size: 10MB per document
• Ensure all details are clearly visible
• Photos should be well-lit and without glare`,
    
    aadhaar: "For Aadhaar card: Front and back sides are required. Ensure the photo and details are clearly visible.",
    pan: "PAN card copy is mandatory. Make sure the PAN number and your name are clearly readable.",
    address_proof: "Acceptable address proofs: Aadhaar, Utility bill (last 2 months), Passport, Driving License, or Rental agreement.",
    income_proof: "Income proof can be: Salary slips (last 3 months), Bank statements (6 months), ITR (last 2 years), or Form 16."
  },
  status: {
    general: "To check your application status, I'll need your application ID. You can find it in your application confirmation email or SMS.",
    not_found: "I couldn't find an application with that ID. Please check the number and try again, or contact our support team for assistance.",
    sample_status: `Application #APP12345 Status:
✓ Document Verification - Completed
✓ Credit Assessment - Completed  
→ Current Status: Under Final Review
⏰ Expected Completion: 2-3 business days
📧 You'll receive an email once approved`,

    stages: `Our loan application goes through these stages:
1. Document Submission & Verification
2. Credit Assessment & Scoring
3. Underwriting & Approval
4. Loan Disbursement
Each stage typically takes 1-2 business days.`
  },
  repayment: {
    general: "We offer flexible repayment options with tenure from 6 months to 5 years. You can choose EMIs that suit your cash flow.",
    emi_calculator: "I can help you calculate your EMI! Please share: Loan amount, interest rate, and tenure (in months).",
    prepayment: "Yes, we allow prepayment with minimal charges. For personal loans, prepayment charges are 2% after 6 months. For business loans, it's 1% after 1 year.",
    late_payment: "Late payment charges are 2% per month on the overdue amount. We recommend setting up auto-debit to avoid missed payments."
  },
  escalation: {
    general: "I understand you'd like to speak with a human agent. I'm connecting you with our support team now. They'll be with you shortly. Please hold...",
    urgent: "I see this requires immediate attention. Let me escalate this to our priority support team. An agent will join this conversation within 2 minutes.",
    callback: "Would you like us to call you back? Our relationship manager can call you within 30 minutes to discuss your query in detail."
  },
  features: {
    benefits: `KRUX Finance offers:
• Instant loan approval in principle
• Competitive interest rates
• Flexible repayment tenure
• Minimal documentation
• Dedicated relationship manager
• 24/7 customer support`,

    security: "Your data is 100% secure with bank-level encryption. We are RBI compliant and follow all financial security protocols.",
    customer_support: "You can reach our customer support at: Phone: 1800-123-4567, Email: support@kruxfinance.com, WhatsApp: +91-9876543210"
  },
  goodbye: {
    general: [
      "Thank you for chatting with KRUX Finance! Have a great day! 👋",
      "It was a pleasure assisting you. Feel free to come back if you have more questions!",
      "Thank you for choosing KRUX Finance. Wishing you success with your financial goals!",
      "We're here to help whenever you need us. Have a wonderful day! 🌟"
    ],
    followup: "Before you go, would you like to rate your experience today? Your feedback helps us improve our service!",
    satisfaction: "Thank you for your time! If you need any further assistance, don't hesitate to reach out. We're always here to help!",
    end_chat: "Chat session ended. Thank you for using KRUX Finance support. You can start a new conversation anytime you need assistance."
  },
  feedback: {
    request: "How would you rate your experience with me today? (Excellent/Good/Average/Poor)",
    thank_you: "Thank you for your feedback! We'll use it to improve our service.",
    excellent: "That's wonderful to hear! Thank you for the excellent rating. We're always here to help!",
    good: "Great! We're happy to help. Let us know if there's anything we can do better.",
    average: "Thank you for your feedback. We're constantly working to improve our service.",
    poor: "I'm sorry to hear that. I'll share your feedback with our team to help us improve."
  },
  fallback: [
    "I'm not sure I understand. Could you please rephrase your question?",
    "I want to make sure I help you correctly. Could you provide more details about your query?",
    "I'm here to help with loan applications, document requirements, application status, EMI calculations, or connecting you with a human agent. Which one are you looking for?",
    "Let me connect you with the right information. Are you asking about loans, documents, application status, or something else?"
  ]
};

export const botService = {
  async getResponse(message: string, conversation: Conversation): Promise<string> {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    const lowerMessage = message.toLowerCase().trim();

    // Goodbye/End conversation detection
    if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye') || 
        lowerMessage.includes('see you') || lowerMessage.includes('cya') ||
        lowerMessage.includes('thank you') || lowerMessage.includes('thanks') ||
        lowerMessage.includes('end') || lowerMessage.includes('stop') ||
        lowerMessage.includes('that\'s all') || lowerMessage.includes('that is all')) {
      
      if (lowerMessage.includes('thank')) {
        return this.getRandomResponse(RESPONSE_TEMPLATES.goodbye.general);
      }
      return this.getRandomResponse(RESPONSE_TEMPLATES.goodbye.general) + 
             "\n\n" + RESPONSE_TEMPLATES.goodbye.end_chat;
    }

    // Feedback detection
    if (lowerMessage.includes('excellent') || lowerMessage.includes('awesome') || lowerMessage.includes('great') || lowerMessage.includes('amazing')) {
      return RESPONSE_TEMPLATES.feedback.excellent;
    }
    if (lowerMessage.includes('good') || lowerMessage.includes('nice') || lowerMessage.includes('fine')) {
      return RESPONSE_TEMPLATES.feedback.good;
    }
    if (lowerMessage.includes('average') || lowerMessage.includes('okay') || lowerMessage.includes('ok')) {
      return RESPONSE_TEMPLATES.feedback.average;
    }
    if (lowerMessage.includes('poor') || lowerMessage.includes('bad') || lowerMessage.includes('not good')) {
      return RESPONSE_TEMPLATES.feedback.poor;
    }

    // Greeting detection
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || 
        lowerMessage.includes('good morning') || lowerMessage.includes('good afternoon') || 
        lowerMessage.includes('good evening') || lowerMessage.match(/^h[i|ey]/)) {
      return this.getRandomResponse(RESPONSE_TEMPLATES.greeting);
    }

    // Loan application queries
    if (lowerMessage.includes('loan') || lowerMessage.includes('apply') || lowerMessage.includes('application')) {
      if (lowerMessage.includes('business')) {
        return RESPONSE_TEMPLATES.loan_application.business;
      } else if (lowerMessage.includes('personal')) {
        return RESPONSE_TEMPLATES.loan_application.personal;
      } else if (lowerMessage.includes('msme')) {
        return RESPONSE_TEMPLATES.loan_application.msme;
      } else if (lowerMessage.includes('eligibility') || lowerMessage.includes('eligible')) {
        return RESPONSE_TEMPLATES.loan_application.eligibility;
      } else if (lowerMessage.includes('interest') || lowerMessage.includes('rate')) {
        return RESPONSE_TEMPLATES.loan_application.interest_rates;
      } else if (lowerMessage.includes('process') || lowerMessage.includes('time') || lowerMessage.includes('duration')) {
        return RESPONSE_TEMPLATES.loan_application.processing_time;
      }
      return RESPONSE_TEMPLATES.loan_application.general;
    }

    // Document queries
    if (lowerMessage.includes('document') || lowerMessage.includes('doc') || lowerMessage.includes('paper') || lowerMessage.includes('require')) {
      if (lowerMessage.includes('format') || lowerMessage.includes('scan') || lowerMessage.includes('upload')) {
        return RESPONSE_TEMPLATES.documents.formats;
      } else if (lowerMessage.includes('aadhaar')) {
        return RESPONSE_TEMPLATES.documents.aadhaar;
      } else if (lowerMessage.includes('pan')) {
        return RESPONSE_TEMPLATES.documents.pan;
      } else if (lowerMessage.includes('address')) {
        return RESPONSE_TEMPLATES.documents.address_proof;
      } else if (lowerMessage.includes('income') || lowerMessage.includes('salary')) {
        return RESPONSE_TEMPLATES.documents.income_proof;
      }
      return RESPONSE_TEMPLATES.documents.general;
    }

    // Status queries
    if (lowerMessage.includes('status') || lowerMessage.includes('check') || lowerMessage.includes('track') || lowerMessage.includes('update')) {
      if (lowerMessage.includes('app') || lowerMessage.match(/app\d+/) || lowerMessage.includes('id')) {
        return RESPONSE_TEMPLATES.status.sample_status;
      } else if (lowerMessage.includes('stage') || lowerMessage.includes('step')) {
        return RESPONSE_TEMPLATES.status.stages;
      }
      return RESPONSE_TEMPLATES.status.general;
    }

    // Repayment queries
    if (lowerMessage.includes('emi') || lowerMessage.includes('repay') || lowerMessage.includes('installment') || 
        lowerMessage.includes('prepayment') || lowerMessage.includes('late payment')) {
      if (lowerMessage.includes('calculate') || lowerMessage.includes('emi')) {
        return RESPONSE_TEMPLATES.repayment.emi_calculator;
      } else if (lowerMessage.includes('prepayment') || lowerMessage.includes('foreclose')) {
        return RESPONSE_TEMPLATES.repayment.prepayment;
      } else if (lowerMessage.includes('late') || lowerMessage.includes('penalty')) {
        return RESPONSE_TEMPLATES.repayment.late_payment;
      }
      return RESPONSE_TEMPLATES.repayment.general;
    }

    // Features and benefits
    if (lowerMessage.includes('benefit') || lowerMessage.includes('feature') || lowerMessage.includes('offer') || 
        lowerMessage.includes('why krux') || lowerMessage.includes('advantage')) {
      return RESPONSE_TEMPLATES.features.benefits;
    }

    // Security queries
    if (lowerMessage.includes('secure') || lowerMessage.includes('safe') || lowerMessage.includes('privacy') || 
        lowerMessage.includes('data') || lowerMessage.includes('protection')) {
      return RESPONSE_TEMPLATES.features.security;
    }

    // Contact information
    if (lowerMessage.includes('contact') || lowerMessage.includes('call') || lowerMessage.includes('email') || 
        lowerMessage.includes('phone') || lowerMessage.includes('number') || lowerMessage.includes('whatsapp')) {
      return RESPONSE_TEMPLATES.features.customer_support;
    }

    // Escalation requests
    if (lowerMessage.includes('human') || lowerMessage.includes('agent') || lowerMessage.includes('representative') || 
        lowerMessage.includes('person') || lowerMessage.includes('manager')) {
      if (lowerMessage.includes('urgent') || lowerMessage.includes('emergency') || lowerMessage.includes('immediately')) {
        return RESPONSE_TEMPLATES.escalation.urgent;
      } else if (lowerMessage.includes('call back') || lowerMessage.includes('callback')) {
        return RESPONSE_TEMPLATES.escalation.callback;
      }
      return RESPONSE_TEMPLATES.escalation.general;
    }

    // Feedback request
    if (lowerMessage.includes('rate') || lowerMessage.includes('feedback') || lowerMessage.includes('review')) {
      return RESPONSE_TEMPLATES.feedback.request;
    }

    return this.getRandomResponse(RESPONSE_TEMPLATES.fallback);
  },

  getRandomResponse(responses: string[]): string {
    return responses[Math.floor(Math.random() * responses.length)];
  }
};