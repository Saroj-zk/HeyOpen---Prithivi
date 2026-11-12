import * as React from 'react';
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
// import ComputeMarketSection from '@/components/ComputeMarketSection';
import PricingSection from '@/components/PricingSection';
import TokenOptimizationSection from '@/components/TokenOptimizationSection';
import EnterpriseSection from '@/components/EnterpriseSection';
import ApiSection from '@/components/ApiSection';
import Footer from '@/components/Footer';
import PageMeta from '@/components/PageMeta';

export default function Home() {
  return (
    <>
      <PageMeta
        title="HeyOpen | Private, Multi-Model AI"
        description="Every major AI model in one private workspace. Nothing retained, nothing trained on, and one memory that carries across all of them."
        path="/"
      />

      <Header />

      <Box component="main" sx={{ backgroundColor: 'var(--bg-page)', minHeight: '100vh', transition: 'background-color 0.35s ease' }}>
        <HeroSection />
        <CoreFeaturesSection />
        {/* Price comes third, straight after the case for using this at all,
            so the cost is answered while that case is still in mind rather
            than after four more sections of product. */}
        <PricingSection />
        {/* How you pay, and the revenue-to-burn funnel with the compute
            options chart, used to sit here and after ProductMatrixSection.
            Both moved to portable/revenue-sections/ to be reused in the
            OpenLedger main site; see that folder's README. */}
        <SupportedModelsSection />
        <WhyAskMultipleModelsSection />
        <ProductMatrixSection />
        {/* <TokenFlowSection /> */}
        {/* Hidden on request. The component is untouched, so putting it back
            is uncommenting this line and its import. It opened up revenue line
            04 of the funnel above and was marked in development throughout. */}
        {/* <ComputeMarketSection /> */}
        <TokenOptimizationSection />
        <ApiSection />
        <EnterpriseSection />
        <Footer showCta />
      </Box>
    </>
  );
}

