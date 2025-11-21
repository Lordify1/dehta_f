import ParticleBackground from '@/components/ParticleBackground';
import { classMap } from '@/components/Tools/Misc';
import React from 'react';
import { Fade, Slide } from 'react-awesome-reveal';
import { FaAssistiveListeningSystems, FaCoins, FaSearch } from 'react-icons/fa';
import {LensInfo} from '@/data/indexData.jsx'



const LensSection: React.FC = () => {
  return (
    <section
      id="lens"
      className="relative text-[var(--primary)] py-10 px-6 sm:px-16 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl items-center">
        <h1 className="text-3xl lg:text-6xl mb-4">Lens Token</h1>
        <div className='grid grid-cols-1 gap-3 mb-2 items-center justify-center'>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <section className='flex items-center justify-center w-full'>
                    <FaSearch className='text-3xl text-[5rem] text-[var(--owner)] animate-pulse transition-all'/>
                </section>
                <section className='w-full p-5 space-x-0.5'>
                    <p>Lens is the platform’s digital fuel. You earn it by checking in, unlocking achievements, or diving deeper into the ecosystem. Spend it to get AI-powered project analysis, purchase Glass NFTs, or unlock premium actions. It’s the gateway to everything valuable happening on the platform.</p>
                </section>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3'>
                {LensInfo.map((it:any, ind:any) => {
                          return(
                   <>
                   <section key={ind} className={`${classMap.indexCard(20,30)} flex items-center justify-start`}>
                    {it.icon}<p className='text-3xl lg:text-4xl'>{it.text}</p>
                   </section>
                   </>
                    )
                })}
            </div>
        </div>
      </div>
    </section>
  );
};

export default LensSection;