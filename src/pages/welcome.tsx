// Home.tsx
import React from 'react';
import Layout from './components/Layout';
import HeroSection from './components/HeroSection';
import AboutFaeces from './components/AboutFaeces';
import AiTools from './components/AiTools';
import Roadmap from './components/Roadmap';
import Tokenomics from './components/Tokenomics';
import Community from './components/Community';
import Partners from './components/Partners';
import ContactSection from './components/ContactSection';
import PrivateSell from './components/PrivateSell';
import DemoSection from './components/DemoSection';
import WhyFaecesAI from './components/WhyFaecesAI';
import ParticleBackground from '@/components/ParticleBackground';
import { Helmet } from 'react-helmet-async';
import { appName } from '@/app';
import SaleTimer from './components/PrivateSalePage/SaleTimer';
import FAQ from './components/Faq';




const Home: React.FC = () => {
  return (
    <>
    <SaleTimer header={true}/>
    <Layout showNavs={true}>
        <Helmet>
          <title>The Future of Crypto Intelligence - {appName}</title>
          <link rel="preconnect" href="https://fonts.bunny.net" />
          <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
        </Helmet>
        <HeroSection />
        <WhyFaecesAI/>
        <FAQ/>
        {/* <AboutFaeces /> */}
        {/* <DemoSection/> */}
        {/* <AiTools /> */}
        {/* <Roadmap /> */}
        {/* <Tokenomics /> */}
        {/* <PrivateSell/> */}
        {/* <Community /> */}
        {/* <Partners /> */}
        {/* <ContactSection /> */}
    </Layout>
    </>
  );
};

export default Home;