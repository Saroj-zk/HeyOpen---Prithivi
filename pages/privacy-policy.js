import * as React from 'react';
import LegalPage from '@/components/LegalPage';
import { PRIVACY_SECTIONS, LEGAL_UPDATED } from '@/data/legal';

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="What Hey Open collects, what leaves our service, and what you can delete."
      updated={LEGAL_UPDATED}
      sections={PRIVACY_SECTIONS}
    />
  );
}
