import ParticleBackground from '@/components/ParticleBackground';
import React from 'react';
import { Fade, Slide } from 'react-awesome-reveal';
import SaleTimer from './PrivateSalePage/SaleTimer';
import { Link, Route } from 'react-router-dom';
import { classMap, colorMap } from '@/components/Tools/Misc';
import { advisorUrl, appUrl } from '@/app';

const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center px-1 sm:px-16 py-20 text-center text-[var(--primary)] herobg p-2"
    >
      <Fade cascade damping={0.3} duration={1000} triggerOnce={false}>
        <div className="max-w-5xl space-y-3 lg:space-y-8">
          <h1 className="text-4xl lg:text-8xl">The Future of Crytpo Intelligence Starts Here</h1>
          <p>Real-time market insights, prediction tools, trending narratives, and AI-powered crypto analytics; all in one Ecosystem</p>
          <button className={`${classMap.button()}`}>
            Get Started
          </button>
        </div>
      </Fade>
    </section>
  );
};

export default HeroSection;
