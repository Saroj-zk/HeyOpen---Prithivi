import * as React from 'react';
import LegalPage from '@/components/LegalPage';
import { TERMS_SECTIONS, LEGAL_UPDATED } from '@/data/legal';

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and Conditions"
      description="The terms that apply when you use Hey Open."
      updated={LEGAL_UPDATED}
      sections={TERMS_SECTIONS}
    />
  );
}
