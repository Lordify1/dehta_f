import ParticleBackground from '@/components/ParticleBackground';
import { classMap } from '@/components/Tools/Misc';
import React from 'react';
import { Fade, Slide } from 'react-awesome-reveal';
import { FaAssistiveListeningSystems, FaLink, FaSearch } from 'react-icons/fa';
import {TeamData} from '@/data/indexData.jsx'
import { Link } from 'react-router-dom';
import { FadeInAnim } from '../../components/Tools/Misc';






const TeamSection: React.FC = () => {
  return (
    <section
      id="team"
      className="relative text-[var(--primary)] py-10 px-6 sm:px-16 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl items-center">
        <h1 className="text-3xl lg:text-6xl mb-10">Dehta Team</h1>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-3 mb-2 items-center justify-items-center'>
        {TeamData.map((it:any, ind:any) => {
          return(
            <>
            <FadeInAnim delay={5}>
            <section key={ind} className={`${classMap.indexCard('30', '60')}`}>
              <div className="flex flex-col items-center justify-start sm:mb-5 space-y-2">
                <img src={`${it.image}`} className='rounded-full w-40' alt="" />
                <h4 className='text-2xl'>{it.name}</h4>
                <p className=''>{it.position}</p>
                <Link
                target={`_blank`}
                to={`${it.link}`}
                >
                    <FaLink className='text-[var(--owner)]'/>
                </Link>
              </div>
            </section>
            </FadeInAnim>
            </>
          )
        })}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;