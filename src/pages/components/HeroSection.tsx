import React from 'react';
import { Fade } from 'react-awesome-reveal';
import { Link } from 'react-router-dom';
import { classMap } from '@/components/Tools/Misc';
import { FadeInAnim } from '../../components/Tools/Misc';

const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center px-1 sm:px-16 py-20 text-center text-(--primary)] herobg p-2 border-spin"
    >
      <FadeInAnim delay={6} duration={1500}>
        <div className="max-w-6xl space-y-3 lg:space-y-8 ">
          <h1 className="text-5xl lg:text-7xl">The Future of Crytpo Intelligence Starts Here</h1>
          <p>Real-time market insights, prediction tools, trending narratives, and AI-powered crypto analytics; all in one Ecosystem</p>
          <Link to={'/register'} className={`${classMap.button()}`}>
            Get Started
          </Link>
        </div>
      </FadeInAnim>
    </section>
  );
};

export default HeroSection;
