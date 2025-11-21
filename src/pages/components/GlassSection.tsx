import ParticleBackground from '@/components/ParticleBackground';
import { classMap } from '@/components/Tools/Misc';
import React from 'react';
import { Fade, Slide } from 'react-awesome-reveal';
import { FaAssistiveListeningSystems, FaCoins, FaSearch } from 'react-icons/fa';
import {LensInfo} from '@/data/indexData.jsx'
import { appUrl } from '../../App';
import GlassPng from '../../assets/glass.png'



const GlassSection: React.FC = () => {
  return (
    <section
      id="glass"
      className="relative text-[var(--primary)] py-10 px-6 sm:px-16 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl items-center">
        <h1 className="text-3xl lg:text-6xl mb-4">Glass NFTs</h1>
        <div className='grid grid-cols-1 gap-3 mb-2 items-center justify-center'>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <section className='flex items-center justify-center'>
                    <img src={GlassPng} alt="glassPng" />
                </section>
                <section className='flex flex-col items-start justify-center w-full p-4 space-x-3'>
                    <h1 className='text-3xl lg:text-6xl'>Own your Glass</h1>
                    <h1 className='text-3xl lg:text-6xl'>Own your Identity</h1>
                    <span className='text-sm mt-2'>Glass are NFTs you can buy with Lens or cash—unique, tradeable profile items with varying rarity and utility.</span>
                </section>
            </div>
        </div>
      </div>
    </section>
  );
};

export default GlassSection;