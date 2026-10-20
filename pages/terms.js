import * as React from 'react';
import LegalPage from '@/components/LegalPage';

/* Drop the real text in as `sections`, each { heading, body: [paragraph, ...] },
   and set `updated`. Until then the page states that it is coming rather than
   carrying wording nobody at the company has agreed to. */
export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and Conditions"
      description="The terms that apply when you use Hey Open."
      sections={[]}
    />
  );
}
