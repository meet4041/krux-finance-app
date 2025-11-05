export const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    // Loan application queries
    if (message.includes('loan') && message.includes('application')) {
        return "I can help you with loan applications! We offer:\n\n• **Business Loans** - For entrepreneurs and businesses\n• **Personal Loans** - For individual needs\n• **MSME Loans** - For small and medium enterprises\n\nWhich type of loan are you interested in? I can guide you through the specific requirements and process.";
    }

    if (message.includes('business loan')) {
        return "For **Business Loans**, here's what you need:\n\n📋 **Requirements:**\n• Business registration proof\n• 2+ years of business existence\n• Annual turnover > ₹10 lakhs\n• ITR for last 2 years\n\n🔄 **Process:**\n1. Submit application with documents\n2. Verification (3-5 business days)\n3. Approval and disbursement\n\nWould you like to start an application or need more details?";
    }

    if (message.includes('personal loan')) {
        return "For **Personal Loans**, here are the details:\n\n📋 **Requirements:**\n• Monthly income > ₹25,000\n• Credit score > 650\n• Employment proof (3+ months)\n• Bank statements (6 months)\n\n💰 **Features:**\n• Amount: ₹50,000 to ₹15 lakhs\n• Tenure: 1-5 years\n• Quick disbursement within 24 hours\n\nReady to apply or have questions about eligibility?";
    }

    if (message.includes('msme') || message.includes('small business')) {
        return "**MSME Loans** are designed for small businesses:\n\n📋 **Requirements:**\n• Udyam registration certificate\n• Business existence > 1 year\n• Basic banking history\n• GST registration (if applicable)\n\n🎯 **Benefits:**\n• Collateral-free up to ₹10 lakhs\n• Subsidized interest rates\n• Government scheme benefits\n\nNeed help with MSME registration or loan application?";
    }

    // Document queries
    if (message.includes('document') || message.includes('required') || message.includes('documents')) {
        return "I can help with document requirements! For loan applications, typically needed:\n\n📄 **Common Documents:**\n• Aadhaar Card (Identity)\n• PAN Card\n• Address Proof (Utility bill/Rental agreement)\n• Income Proof (Salary slips/Bank statements)\n• Business Proof (for business loans)\n\nWhich specific loan type are you applying for? I'll provide the exact document list.";
    }

    // Status queries
    if (message.includes('status') || message.includes('check') || message.includes('track')) {
        return "To check your application status, I'll need your **Application ID**. You can find it in your application confirmation email/SMS.\n\nAlternatively, you can provide:\n• Your registered phone number\n• Application reference number\n\nI'll look up your current status and next steps!";
    }

    // Agent escalation
    if (message.includes('human') || message.includes('agent') || message.includes('representative') || message.includes('person')) {
        return "I understand you'd like to speak with a human agent. I'm connecting you with our support team right now. \n\n👨‍💼 **Please wait** while I transfer your conversation to one of our support executives. They'll be with you shortly to provide personalized assistance.\n\nIn the meantime, is there any specific information I can help prepare for the agent?";
    }

    // Greetings
    if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('good morning') || message.includes('good afternoon')) {
        return "Hello! 👋 Welcome to KRUX Finance support. I'm here to help you with:\n\n• 📝 Loan applications and process\n• 📄 Document requirements\n• 📊 Application status checks\n• 🔄 Account-related queries\n\nHow can I assist you with your loan journey today?";
    }

    // Thanks
    if (message.includes('thank') || message.includes('thanks')) {
        return "You're welcome! 😊 I'm glad I could help. If you have any more questions about loans, documents, or your application status, feel free to ask. Is there anything else you'd like to know?";
    }

    // Default response
    return "I understand you're looking for assistance with financial services. I specialize in helping with:\n\n• **Loan Applications** - Business, Personal, MSME\n• **Document Guidance** - Required paperwork and formats\n• **Status Updates** - Track your application progress\n• **Process Explanation** - Step-by-step guidance\n\nCould you please let me know what specific help you need? I'll provide detailed information!";
};

export const quickReplies = [
    {
        id: '1',
        title: 'Loan Application Help',
        message: 'I need help with the loan application process',
        category: 'loan-application'
    },
    {
        id: '2',
        title: 'Document Requirements',
        message: 'What documents are required for loan application?',
        category: 'document-requirements'
    },
    {
        id: '3',
        title: 'Check Application Status',
        message: 'I want to check my application status',
        category: 'application-status'
    },
    {
        id: '4',
        title: 'Speak to Human Agent',
        message: 'I want to speak with a human agent',
        category: 'general'
    },
    {
        id: '5',
        title: 'Business Loan Info',
        message: 'Tell me about business loans',
        category: 'loan-application'
    },
    {
        id: '6',
        title: 'Personal Loan Details',
        message: 'Information about personal loans',
        category: 'loan-application'
    }
];