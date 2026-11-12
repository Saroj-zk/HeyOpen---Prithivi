import * as React from 'react';
import Box from '@mui/material/Box';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CoreFeaturesSection from '@/components/CoreFeaturesSection';
import SupportedModelsSection from '@/components/SupportedModelsSection';
import WhyAskMultipleModelsSection from '@/components/WhyAskMultipleModelsSection';
import ProductMatrixSection from '@/components/ProductMatrixSection';
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
        <SupportedModelsSection />
        <WhyAskMultipleModelsSection />
        <ProductMatrixSection />
        <TokenOptimizationSection />
        <ApiSection />
        <EnterpriseSection />
        <Footer showCta />
      </Box>
    </>
  );
}

