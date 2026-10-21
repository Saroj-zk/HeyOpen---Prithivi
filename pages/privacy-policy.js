import * as React from 'react';
import LegalPage from '@/components/LegalPage';
import { PRIVACY_DOC } from '@/data/legal';

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      doc={PRIVACY_DOC}
      description="What Hey Open collects, what leaves our service, and what you can delete."
    />
  );
}
