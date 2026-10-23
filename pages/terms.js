import * as React from 'react';
import LegalPage from '@/components/LegalPage';
import { TERMS_DOC } from '@/data/legal';

export default function TermsPage() {
  return (
    <LegalPage
      doc={TERMS_DOC}
      description="The terms that apply when you use Hey Open."
    />
  );
}
