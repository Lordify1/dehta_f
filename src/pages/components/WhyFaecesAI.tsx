import ParticleBackground from '@/components/ParticleBackground';
import { classMap } from '@/components/Tools/Misc';
import React from 'react';
import { Fade, Slide } from 'react-awesome-reveal';
import { FaAssistiveListeningSystems, FaSearch } from 'react-icons/fa';
import {indexFeatures} from '@/data/indexData.jsx'

const marketData = [
  {
    label: 'TAM',
    value: '$15 Billion',
    tooltip: 'Total Addressable Market',
    className: 'text--[var(--owner)]'
  },
  {
    label: 'SAM',
    value: '$3 Billion',
    tooltip: 'Serviceable Available Market',
    className: 'text-[var(--owner)]'
  },
  {
    label: 'SOM',
    value: '$30 Million',
    tooltip: 'Serviceable Obtainable Market',
    className: 'text-[var(--owner)]',
    sub: '(300k active users)'
  },
  {
    label: 'Problem Size',
    value: '$3–4 Billion/year',
    tooltip: 'Annual losses from hype, scams, and rug pulls',
    className: 'text-red-400'
  },
];





const WhyFaecesAI: React.FC = () => {
  return (
    <section
      id="why"
      className="relative text-[var(--primary)] py-10 px-6 sm:px-16 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl items-center">
        <h1 className="text-3xl lg:text-6xl mb-4">Why Dehta Labs</h1>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-3 mb-2'>
        {indexFeatures.map((it:any, ind:any) => {
          return(
            <>
            <section key={ind} className={`${classMap.indexCard()}`}>
              <div className="flex flex-row items-center justify-start mb-4">
                {it.icon} <h4 className='text-3xl'>{it.label}</h4>
              </div>
              <p className=''>{it.text}</p>
            </section>
            </>
          )
        })}
        </div>
      </div>
    </section>
  );
};

export default WhyFaecesAI;
