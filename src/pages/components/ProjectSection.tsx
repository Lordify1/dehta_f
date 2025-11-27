import ParticleBackground from '@/components/ParticleBackground';
import { classMap } from '@/components/Tools/Misc';
import React from 'react';
import { Fade, Slide } from 'react-awesome-reveal';
import { FaAssistiveListeningSystems, FaSearch } from 'react-icons/fa';
import {ProjectsData} from '@/data/indexData.jsx'
import { Link } from 'react-router-dom';
import { FadeInAnim, SlideUp } from '../../components/Tools/Misc';

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





const ProjectSection: React.FC = () => {
  return (
    <section
      id="why"
      className="relative text-[var(--primary)] py-10 px-6 sm:px-16 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl items-center">
        <h1 className="text-3xl lg:text-6xl mb-10">Projects</h1>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-3 mb-2 items-center justify-items-center'>
        {ProjectsData.map((it:any, ind:any) => {
          return(
            <>
            <SlideUp delay={4}>
            <section key={ind} className={`${classMap.indexCard()}`}>
              <div className="flex flex-row items-center justify-start sm:mb-5">
                {it.icon} <h4 className='text-3xl'>{it.label}</h4>
              </div>
              <p className=''>{it.text}</p>
            </section>
            </SlideUp>
            </>
          )
        })}
        </div>
        <div className="flex flex-col items-center justify-center pt-3">
          <FadeInAnim delay={7}>
            <Link to={`/register`} className={`${classMap.button()}`}>
                Get Started
            </Link>
          </FadeInAnim>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;