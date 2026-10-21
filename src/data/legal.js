/* =====================================================================
   DRAFT LEGAL COPY - NOT YET REVIEWED BY A LAWYER
   =====================================================================

   These two documents were drafted against what this codebase actually
   does and what the marketing pages actually claim. They are a starting
   point for counsel, not finished policy.

   Everything in SQUARE BRACKETS is a fact only the company can supply.
   Search this file for "[" before publishing; the pages will render the
   brackets verbatim, which is deliberate so an unfinished document
   cannot go out looking finished.

   Three claims here are repeated from the marketing pages and have not
   been verified against the implementation. If any is not true in
   production it must be cut from BOTH places before launch, because in a
   privacy policy it stops being marketing and becomes a representation:

     1. "zero retention" - prompts and responses not kept after processing
     2. "no training" - conversations not used to train models
     3. the TEE / hardware enclave claim on the Private AI page, which is
        deliberately NOT asserted below

   ===================================================================== */

export const LEGAL_UPDATED = '[DATE OF PUBLICATION]';

export const PRIVACY_SECTIONS = [
  {
    heading: '1. Who we are',
    body: [
      'Hey Open is a multi-model AI service operated by [LEGAL ENTITY NAME], a company registered in [JURISDICTION] with registered address [REGISTERED ADDRESS] ("we", "us", "our").',
      'For the purposes of the UK and EU General Data Protection Regulation, we are the data controller for the personal data described in this policy. You can reach us about anything in this document at [PRIVACY CONTACT EMAIL].',
      'This policy covers the Hey Open website, the chat application, and our API. It does not cover the third-party model providers your requests may be routed to, who handle data under their own terms. Section 5 explains that relationship.',
    ],
  },
  {
    heading: '2. Using Hey Open without an account',
    body: [
      'You can start using the chat without creating an account. When you do, we do not ask for your name, email address or any other identifying detail, and we do not create a profile for you.',
      'Some features do require an account or a connected wallet: a paid subscription, API keys, and anything involving the $OPEN token. Those are described below.',
    ],
  },
  {
    heading: '3. What we collect',
    body: [
      'Prompts, files and responses. What you type, any file you upload, and what the model sends back. These are processed to answer your request. See section 6 for how long they are kept.',
      'Memory. Facts the assistant keeps about you to use in later conversations. Memory is stored in your browser, not on our servers. See section 7.',
      'Account and billing data. If you subscribe, we collect your email address and the billing details needed to take payment. Card details are handled by our payment processor, [PAYMENT PROCESSOR], and are not stored by us.',
      'Wallet data. If you connect a wallet, we process your public wallet address. We never ask for, receive or store a private key or seed phrase, and no part of Hey Open will ever ask you for one.',
      'Newsletter. If you subscribe to updates, we keep the email address you give us until you unsubscribe.',
      'Technical data. IP address, browser and device type, and basic request logs, which we use to keep the service running and to detect abuse.',
      'Cookies and local storage. See section 9.',
    ],
  },
  {
    heading: '4. Why we process it, and on what legal basis',
    body: [
      'To provide the service you asked for, including routing your request to a model and returning the answer. Legal basis: performance of a contract.',
      'To take payment and maintain your subscription. Legal basis: performance of a contract, and compliance with tax and accounting law.',
      'To keep the service secure, prevent abuse, and investigate misuse. Legal basis: our legitimate interests in running a safe service.',
      'To send you product updates, if you asked for them. Legal basis: your consent, which you can withdraw at any time.',
      'To comply with legal obligations where we are required to.',
      'We do not sell personal data. We do not share it for cross-context behavioural advertising. We do not use it to build advertising profiles.',
    ],
  },
  {
    heading: '5. Model providers, and what leaves our service',
    body: [
      'Hey Open does not train or host the frontier models it offers. When you send a request, the content of that request is forwarded to the provider of the model you selected, or to the provider the router selects for you. Those providers include OpenAI, Anthropic, Google and OpenRouter, among others.',
      'This means the text of your prompt, and any file you attach, leaves our infrastructure and is processed by that provider under their own privacy terms and retention periods. We cannot extend our retention commitments to them, and you should read the terms of any provider you care about.',
      'Memory is treated differently and more cautiously. It is not sent to models routed to outside providers unless you switch on "Share memory with external models" in settings, which is off by default.',
      'We also use service providers who process data on our behalf under contract: [HOSTING PROVIDER] for hosting, [PAYMENT PROCESSOR] for payments, and [ANALYTICS PROVIDER, IF ANY] for analytics. A current list is available on request.',
    ],
  },
  {
    heading: '6. How long we keep things',
    body: [
      'Prompts and responses are not retained after your request has been processed and the answer returned to you.',
      'Account and billing records are kept for as long as you have an account and afterwards for the period we are required to keep financial records, which is [RETENTION PERIOD, e.g. seven years] in [JURISDICTION].',
      'Technical and security logs are kept for [LOG RETENTION PERIOD] and then deleted.',
      'Newsletter addresses are kept until you unsubscribe.',
      'Memory is not on this list because we never hold it. It lives in your browser until you delete it or clear your site data.',
    ],
  },
  {
    heading: '7. Memory',
    body: [
      'Memory is stored only in the browser you are using. It does not sync between your devices, we do not hold a copy, and clearing your site data removes it permanently. We cannot restore it for you.',
      'You can see every stored entry in Settings, add entries by hand, and delete any of them individually. You can switch off "Generate memory from chats" so nothing new is written, and switch off "Use memory" so nothing stored is read.',
      '"Share memory with external models" is off by default. While it is off, memory is not included in requests routed to outside providers.',
    ],
  },
  {
    heading: '8. Training',
    body: [
      'We do not use your conversations, files or memory to train models, and we do not sell or licence them to anyone for that purpose.',
      'We cannot make that promise on behalf of the third-party providers your requests are routed to. Whether a given provider trains on API traffic is governed by their terms, and it differs between them and between tiers of their service.',
    ],
  },
  {
    heading: '9. Cookies and local storage',
    body: [
      'We use browser storage to keep the service working: your theme preference, your session, and your memory entries. These are necessary for the features you are using and are not used for advertising.',
      '[IF ANALYTICS OR NON-ESSENTIAL COOKIES ARE ADDED, DESCRIBE THEM HERE AND IMPLEMENT A CONSENT BANNER. Non-essential cookies require prior consent in the EU and UK.]',
    ],
  },
  {
    heading: '10. Your rights',
    body: [
      'If you are in the UK, the EU or another jurisdiction with equivalent law, you have the right to access the personal data we hold about you, to have it corrected or erased, to restrict or object to how we use it, to receive it in a portable form, and to withdraw consent where we relied on it.',
      'If you are a California resident, you have the right to know what personal information we collect and why, to request deletion or correction, and to opt out of sale or sharing. We do not sell or share personal information as those terms are defined by the CCPA, and we will not discriminate against you for exercising any right.',
      'To exercise any of these, write to [PRIVACY CONTACT EMAIL]. We will respond within the period the law requires, which is one month under the GDPR and 45 days under the CCPA.',
      'If you are unhappy with how we have handled your data you can complain to your supervisory authority. In the UK that is the Information Commissioner’s Office; in the EU it is the authority in the country where you live.',
      'Much of your data never reaches us at all. Memory sits in your browser and prompts are not retained, so for a lot of what you might want deleted there is nothing on our side to delete.',
    ],
  },
  {
    heading: '11. International transfers',
    body: [
      'Our service providers and the model providers we route to operate in [LIST OF COUNTRIES/REGIONS, including the United States]. Where personal data leaves the UK or the European Economic Area we rely on [TRANSFER MECHANISM: UK IDTA, EU Standard Contractual Clauses, or an adequacy decision], and you can request a copy of the safeguards we use.',
    ],
  },
  {
    heading: '12. Security',
    body: [
      'We use encryption in transit, access controls on our systems, and the operational practices described at [SECURITY PAGE URL, IF ANY].',
      'No service can promise perfect security. If a breach occurs that is likely to present a risk to you, we will notify you and the relevant regulator within the timeframes the law sets.',
      '[IF HARDWARE ISOLATION, TEE OR CONFIDENTIAL COMPUTE IS USED IN PRODUCTION, DESCRIBE IT PRECISELY HERE, NAMING WHICH REQUESTS IT COVERS. Do not assert it until it has been verified: the Private AI page makes this claim and it has not been confirmed against the implementation.]',
    ],
  },
  {
    heading: '13. Children',
    body: [
      'Hey Open is not intended for children. You must be at least [MINIMUM AGE, typically 13, 16 in parts of the EU, or 18] to use it. We do not knowingly collect personal data from anyone below that age, and if we learn that we have, we will delete it.',
    ],
  },
  {
    heading: '14. Changes to this policy',
    body: [
      'We will update this page when our practices change, and the date at the top will tell you when it last changed. If a change materially affects your rights we will give you notice before it takes effect.',
    ],
  },
  {
    heading: '15. Contact',
    body: [
      'Write to [PRIVACY CONTACT EMAIL], or to [LEGAL ENTITY NAME] at [REGISTERED ADDRESS].',
      '[IF A DATA PROTECTION OFFICER OR AN EU/UK REPRESENTATIVE UNDER GDPR ARTICLE 27 IS REQUIRED, NAME THEM HERE.]',
    ],
  },
];

export const TERMS_SECTIONS = [
  {
    heading: '1. These terms',
    body: [
      'These terms are an agreement between you and [LEGAL ENTITY NAME], a company registered in [JURISDICTION] ("we", "us", "our"), covering your use of the Hey Open website, chat application and API.',
      'By using Hey Open you accept these terms. If you do not accept them, do not use the service.',
    ],
  },
  {
    heading: '2. Who may use it',
    body: [
      'You must be at least [MINIMUM AGE] years old. If you are using Hey Open for an organisation, you confirm you are authorised to accept these terms on its behalf.',
      'You may not use the service if you are subject to sanctions, or located in a country subject to an embargo, that would make it unlawful for us to provide it to you.',
    ],
  },
  {
    heading: '3. What Hey Open is',
    body: [
      'Hey Open gives you access to AI models built and hosted by other companies, through one interface and one subscription. We route your request to a model, return the answer, and handle billing. We do not build or host the frontier models themselves.',
      'Which models are available, and what they cost us, is outside our control. Providers change, deprecate and reprice their models, and we may add or remove models accordingly. We do not guarantee that any particular model will remain available.',
      'Model availability, context limits and prices shown on the site are indicative and may change.',
    ],
  },
  {
    heading: '4. Accounts, wallets and keys',
    body: [
      'You can use the chat without an account. Subscriptions, API keys and token features require one.',
      'You are responsible for your account credentials, your API keys and any activity under them. Treat an API key like a password: anything done with your key is billed to you.',
      'If you connect a wallet, you remain solely responsible for it. We will never ask for your private key or seed phrase, and anyone who does is attempting to defraud you.',
    ],
  },
  {
    heading: '5. Subscriptions and payment',
    body: [
      'Paid plans are billed in advance on a recurring basis at the price shown at checkout. By subscribing you authorise us to charge your payment method each billing period until you cancel.',
      'You can cancel at any time. Cancellation takes effect at the end of the period you have already paid for, and you keep access until then.',
      '[REFUND POLICY. Note that consumers in the UK and EU have a statutory 14-day right to cancel distance contracts, which can be waived for digital content only if the consumer expressly agrees and acknowledges losing it. State your position here.]',
      'We may change prices. If we do, we will give you at least [NOTICE PERIOD] notice before the change applies to your subscription, and you may cancel before it takes effect.',
      'Fair use: plans described as unlimited are subject to the acceptable use terms below and to limits applied to prevent automated abuse.',
    ],
  },
  {
    heading: '6. The $OPEN token',
    body: [
      'Any reference on this site to the $OPEN token, to staking, or to token utility is provided for information only. It is not investment advice, not a recommendation, and not an offer or solicitation to buy or sell any asset.',
      'Digital assets are volatile and you can lose the entire value of your holding. Nothing here is a promise of future value, profit, return or liquidity. You are responsible for deciding whether holding or using the token is appropriate for you, and for any tax arising from it.',
      'Token-related features may be restricted or unavailable in your jurisdiction, and we may restrict access where we are required to.',
      '[THIS SECTION NEEDS SPECIALIST REVIEW. Token offerings are regulated differently in each jurisdiction and the wording here is generic. Jurisdictions where the token is not offered must be named.]',
    ],
  },
  {
    heading: '7. Your content',
    body: [
      'You keep ownership of what you submit. We claim no rights over your prompts, files or outputs beyond what is needed to operate the service.',
      'You grant us a limited licence to process your content for the sole purpose of providing the service, including transmitting it to the model provider handling your request.',
      'You are responsible for what you submit. You confirm you have the right to submit it and that doing so does not infringe anyone else’s rights or break any law.',
      'Outputs are generated by third-party models. We make no claim of ownership over them, and we cannot guarantee that an output is original, or that using it will not infringe a third party’s rights.',
    ],
  },
  {
    heading: '8. Acceptable use',
    body: [
      'You may not use Hey Open to break the law, or to produce or distribute child sexual abuse material, content that sexualises minors, non-consensual intimate imagery, or material that incites violence or terrorism. These prohibitions apply regardless of which model you select or how the model is described.',
      'You may not use it to harass, defame, impersonate or deceive, to create malware, to attempt unauthorised access to any system, or to infringe intellectual property rights.',
      'You may not resell, sublicense or redistribute access, scrape the service, work around rate limits or billing, or use outputs to train a competing model, unless we have agreed in writing.',
      'Where Hey Open offers models described as uncensored or less restricted, that describes the model’s own filtering, not permission to do anything in this section. The prohibitions above apply to every model on the platform.',
      'Individual model providers impose their own usage policies, and your request is subject to those as well as to these terms.',
      'We may suspend or terminate access for a breach of this section, and report unlawful activity where required.',
    ],
  },
  {
    heading: '9. AI outputs',
    body: [
      'AI models get things wrong. Outputs may be inaccurate, outdated, biased, incomplete or entirely fabricated, including where they are expressed confidently or carry citations.',
      'Outputs are not professional advice. Do not rely on them for medical, legal, financial, safety or similarly consequential decisions without a qualified human checking them first.',
      'You are responsible for reviewing any output before you act on it or publish it.',
    ],
  },
  {
    heading: '10. Availability',
    body: [
      'We aim to keep the service running but do not guarantee it will be uninterrupted or error-free. It depends on third-party providers whose outages we cannot control.',
      'We may modify, suspend or discontinue any part of it. Where a change is material and within our control we will give reasonable notice.',
      '[IF AN SLA IS OFFERED ON ANY PLAN, REFERENCE IT HERE.]',
    ],
  },
  {
    heading: '11. Intellectual property',
    body: [
      'The Hey Open name, logo, interface, and the software behind the service are owned by us or our licensors. These terms do not transfer any of it to you.',
      'Model names and trademarks belong to their respective owners and are used to identify which model you are selecting. Their appearance does not imply endorsement or partnership.',
    ],
  },
  {
    heading: '12. Disclaimers',
    body: [
      'To the fullest extent the law allows, the service is provided "as is" and "as available", without warranties of any kind, whether express or implied, including fitness for a particular purpose, merchantability and non-infringement.',
      'Nothing in these terms excludes liability for death or personal injury caused by negligence, for fraud, or for anything else that cannot lawfully be excluded. If you use Hey Open as a consumer, your statutory rights are unaffected.',
    ],
  },
  {
    heading: '13. Limitation of liability',
    body: [
      'To the fullest extent the law allows, we are not liable for indirect, incidental, special or consequential loss, nor for lost profits, lost revenue, lost data or lost business opportunity, however caused.',
      'Our total liability arising out of or in connection with these terms is limited to the greater of the amount you paid us in the [TWELVE] months before the claim arose, or [MINIMUM LIABILITY FIGURE].',
      '[CONFIRM THIS CAP IS ENFORCEABLE IN YOUR JURISDICTION AND APPROPRIATE FOR CONSUMER USERS. Consumer protection law restricts what can be capped in many jurisdictions, including the UK and EU.]',
    ],
  },
  {
    heading: '14. Indemnity',
    body: [
      'If you use Hey Open other than as a consumer, you agree to indemnify us against claims, losses and reasonable costs arising from your use of the service, your content, or your breach of these terms.',
    ],
  },
  {
    heading: '15. Suspension and termination',
    body: [
      'You may stop using the service at any time and cancel any subscription as described above.',
      'We may suspend or terminate your access if you breach these terms, if we are required to by law, or if continuing would expose us or other users to risk. Where it is reasonable to do so we will tell you why and give you a chance to put it right.',
      'Sections that by their nature should survive termination will do so, including content ownership, disclaimers, liability and governing law.',
    ],
  },
  {
    heading: '16. Changes to these terms',
    body: [
      'We may update these terms. The date at the top shows when they last changed. For material changes we will give notice before they take effect, and continuing to use the service afterwards means you accept them. If you do not, stop using the service and cancel.',
    ],
  },
  {
    heading: '17. Governing law and disputes',
    body: [
      'These terms are governed by the law of [GOVERNING LAW], and the courts of [JURISDICTION FOR DISPUTES] have [exclusive / non-exclusive] jurisdiction.',
      'If you are a consumer, this does not deprive you of the protection of the mandatory law of the country where you live, or of your right to bring proceedings there.',
      '[IF ARBITRATION OR A CLASS ACTION WAIVER IS INTENDED FOR US USERS, IT MUST BE DRAFTED SEPARATELY AND SURFACED PROMINENTLY. It is not included here.]',
    ],
  },
  {
    heading: '18. Contact',
    body: [
      'Write to [LEGAL CONTACT EMAIL], or to [LEGAL ENTITY NAME] at [REGISTERED ADDRESS].',
    ],
  },
];
