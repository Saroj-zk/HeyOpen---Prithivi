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
import BurnEnterpriseSection from '@/components/BurnEnterpriseSection';
// import ComputeOptionsSection from '@/components/ComputeOptionsSection';
// import ComputeMarketSection from '@/components/ComputeMarketSection';
import PricingSection from '@/components/PricingSection';
import HowYouPaySection from '@/components/HowYouPaySection';
import TokenOptimizationSection from '@/components/TokenOptimizationSection';
import EnterpriseSection from '@/components/EnterpriseSection';
import ApiSection from '@/components/ApiSection';
import Footer from '@/components/Footer';
import PageMeta from '@/components/PageMeta';

export default function Home() {
  return (
    <>
      <PageMeta
        title="Hey Open | Private, Multi-Model AI"
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
        {/* Compute options moved INTO the burn section above, as the right
            column beside the funnel, which is the slot the prepaid
            enterprise card used to hold. It was always one of the things
            producing the funnel's first revenue line, and beside it the
            pair reads as a source and a destination.

            The component is untouched and still exports the section whole,
            so putting it back here is uncommenting this line and its
            import — but then the figure would be on the page twice. */}
        {/* <ComputeOptionsSection /> */}
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

