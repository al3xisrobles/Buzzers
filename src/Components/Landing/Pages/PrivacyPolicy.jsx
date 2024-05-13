function PrivacyPolicy() {

  const text = `
  Effective Date: May 14, 2024
  # Introduction
  Buzzers, Inc. ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you create an account on our marketplace platform (the "Platform"). Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not create an account or use the Platform.

  # 1. Information We Collect
  We may collect the following types of information when you create an account on our Platform:
  • **Personal Information:** Your name, email address, phone number, mailing address, and any other information you provide during the registration process.
  • **Login Information:** Username, password, and any security questions and answers.
  • **Transaction Information:** Details about transactions you carry out on the Platform, including purchase history and payment information.
  • **Usage Information:** Information about how you use the Platform, such as the features you use and the time and frequency of your visits.
  • **Device Information:** Information about the device you use to access the Platform, including IP address, browser type, and operating system.

  # 2. How We Use Your Information
  We use the information we collect for the following purposes:
  • To create and manage your account.
  • To process transactions and send related information, including purchase confirmations and invoices.
  • To provide, operate, and maintain the Platform.
  • To improve, personalize, and expand our Platform.
  • To understand and analyze how you use our Platform.
  • To develop new products, services, features, and functionality.
  • To communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the Platform, and for marketing and promotional purposes.
  • To process your transactions and manage your orders.
  • To find and prevent fraud.
  • To comply with legal obligations.

  # 3. Sharing Your Information
  We may share your information with:
  • **Service Providers:** Third-party vendors, consultants, and other service providers who perform services on our behalf.
  • **Business Transfers:** In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business by another company.
  • **Legal Requirements:** If required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).
  • **Protection of Rights:** To protect and defend our rights or property, and the rights or property of our users.

  # 4. Security of Your Information
  We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.

  # 5. Your Privacy Rights
  Depending on your location, you may have the following rights regarding your personal information:
  • **The right to access** - You have the right to request copies of your personal data.
  • **The right to rectification** - You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.
  • **The right to erasure** - You have the right to request that we erase your personal data, under certain conditions.
  • **The right to restrict processing** - You have the right to request that we restrict the processing of your personal data, under certain conditions.
  • **The right to object to processing** - You have the right to object to our processing of your personal data, under certain conditions.
  • **The right to data portability** - You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.

  # 6. Changes to This Privacy Policy
  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
  `;

  const paragraphs = text.split('\n');

  const applyStyles = (line) => {
    // Trim the line to remove any leading whitespace
    const trimmedLine = line.trim();

    // Replace hashtags with heading tags
    const withHeadings = trimmedLine.replace(/^# (.+)/g, (match, p1) => `<h2 style="font-weight: bold; font-size: 1.8rem;">${p1}</h2>`);

    // Replace double asterisks with bold tags
    const withBold = withHeadings.replace(/\*\*(.+?)\*\*/g, (match, p1) => `<strong>${p1}</strong>`);

    // Return line as HTML using dangerouslySetInnerHTML
    return <p dangerouslySetInnerHTML={{ __html: withBold }} />;
  };

  return (
    <div className="bg-salt mx-auto border-b px-6 pt-8 pb-6 flex flex-col justify-center">
      <div className="max-w-[800px] mx-auto py-16">

        {/* Header */}
        <div className="text-4xl font-bold pt-8">
          <p>Privacy Policy for Buzzers, Inc.</p>
        </div>

        {/* Text */}
        <div className="text-xl space-y-6 leading-10">
          {paragraphs.map((paragraph, index) => applyStyles(paragraph, index))}
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
