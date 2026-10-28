import * as React from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CoreFeaturesSection from '@/components/CoreFeaturesSection';
import SupportedModelsSection from '@/components/SupportedModelsSection';
import WhyAskMultipleModelsSection from '@/components/WhyAskMultipleModelsSection';
import ProductMatrixSection from '@/components/ProductMatrixSection';
/* Hidden on request. The component is untouched, so putting it back is
   uncommenting these two lines. */
// import TokenFlowSection from '@/components/TokenFlowSection';
import BurnEnterpriseSection from '@/components/BurnEnterpriseSection';
import ComputeMarketSection from '@/components/ComputeMarketSection';
import PricingSection from '@/components/PricingSection';
import HowYouPaySection from '@/components/HowYouPaySection';
import TokenOptimizationSection from '@/components/TokenOptimizationSection';
import EnterpriseSection from '@/components/EnterpriseSection';
import ApiSection from '@/components/ApiSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>Hey Open | AI Assistant</title>
        <meta
          name="description"
          content="Hey Open - A private, multi-model AI experience with no account required to start."
        />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <Header />

      <Box component="main" sx={{ backgroundColor: 'var(--bg-page)', minHeight: '100vh', transition: 'background-color 0.35s ease' }}>
        <HeroSection />
        <CoreFeaturesSection />
        {/* Price comes third, straight after the case for using this at all,
            so the cost is answered while that case is still in mind rather
            than after four more sections of product. */}
        <PricingSection />
        {/* And how you settle it, which is the question that follows the
            price. Its own band of plain page between two tinted ones. */}
        <HowYouPaySection />
        <SupportedModelsSection />
        <WhyAskMultipleModelsSection />
        <ProductMatrixSection />
        {/* <TokenFlowSection /> */}
        {/* What happens to the money that does get spent, and when enterprise
            pays for it. */}
        <BurnEnterpriseSection />
        {/* Revenue line 04 above, opened up. Marked in development throughout. */}
        <ComputeMarketSection />
        <TokenOptimizationSection />
        <ApiSection />
        <EnterpriseSection />
        <Footer showCta />
      </Box>
    </>
  );
}

