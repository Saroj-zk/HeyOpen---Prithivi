import * as React from 'react';
import { ChatStudio } from '@/components/ChatStudio';
import PageMeta from '@/components/PageMeta';

// The /chat route in the reference app hides the header and footer 
// for an immersive studio experience.
export default function ChatPage() {
  return (
    <>
      <PageMeta
        title="Chat | Hey Open"
        description="Open a private chat across every supported model, with nothing retained and no account required to start."
        path="/chat"
      />
      <ChatStudio />
    </>
  );
}
