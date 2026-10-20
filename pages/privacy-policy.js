import * as React from 'react';
import LegalPage from '@/components/LegalPage';

/* Drop the real text in as `sections`, each { heading, body: [paragraph, ...] },
   and set `updated`. Until then the page states that it is coming rather than
   carrying wording nobody at the company has agreed to. */
export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="How Hey Open handles your data."
      sections={[]}
    />
  );
}
