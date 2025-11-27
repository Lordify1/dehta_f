import ParticleBackground from '@/components/ParticleBackground';
import { classMap } from '@/components/Tools/Misc';
import React from 'react';
import { Fade, Slide } from 'react-awesome-reveal';
import { FaAssistiveListeningSystems, FaCoins, FaSearch } from 'react-icons/fa';
import {LensInfo} from '@/data/indexData.jsx'
import Lens from '../../assets/dehta_logo.png'
import { FadeInAnim, SlideRight, SlideUp } from '../../components/Tools/Misc';



const LensSection: React.FC = () => {
  return (
    <section
      id="lens"
      className="relative text-[var(--primary)] py-10 px-6 sm:px-16 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl items-center">
        <h1 className="text-3xl lg:text-6xl mb-10">Lens Token</h1>
        <div className='grid grid-cols-1 gap-3 mb-2 items-center justify-center'>
            <div className="flex flex-col w-full items-center justify-center text-center">
              <FadeInAnim delay={5}>
                <section className='flex items-center justify-center w-full'>
                    <img src={Lens} alt="lens_image" className='w-100 animate-pulse transition-all duration-initial' />
                </section>
              </FadeInAnim>
              <SlideUp>
                <section className='w-full p-5 max-w-5xl space-x-0.5'>
                    <p>Lens is the platform’s digital fuel. You earn it by checking in, unlocking achievements, or diving deeper into the ecosystem. Spend it to get AI-powered project analysis, purchase Glass NFTs, or unlock premium actions. It’s the gateway to everything valuable happening on the platform.</p>
                </section>
              </SlideUp>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-3 items-center justify-items-center w-full'>
                {LensInfo.map((it:any, ind:any) => {
                          return(
                   <>
                  <SlideRight delay={7}>
                   <section key={ind} className={`${classMap.indexCard(20,30)} flex items-center justify-start`}>
                    {it.icon}<p className='text-3xl lg:text-4xl'>{it.text}</p>
                   </section>
                  </SlideRight>
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