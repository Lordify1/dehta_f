import React from 'react';
import { Fade } from 'react-awesome-reveal';
import { Link } from 'react-router-dom';
import { classMap } from '@/components/Tools/Misc';
import { FadeInAnim } from '../../components/Tools/Misc';
import { useUser } from "@/context/UserContext";


const HeroSection: React.FC = () => {

  const { user } = useUser();

  const authStatus = (auth:string, guest:string) => {
    const status = user ? auth : guest;
    return status;
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-start justify-end px-1 sm:px-20 py-20 text-start text-(--primary)] herobg p-2 border-spin"
    >
      <FadeInAnim delay={6} duration={1500}>
        <div className="max-w-5xl space-y-4 lg:space-y-4 p-2">
          <h1 className="text-6xl lg:text-7xl">The Future of Crytpo Intelligence Starts Here</h1>
          <p>Real-time market insights, prediction tools, trending narratives, <br/>and AI-powered crypto analytics; all in one Ecosystem</p>
          <Link to={`${authStatus('/dashboard', '/register')}`} className={`${classMap.button()} mt-4`}>
            {authStatus('Dashboard', 'Get Started')}
          </Link>
        </div>
      </FadeInAnim>
    </section>
  );
};

export default HeroSection;
