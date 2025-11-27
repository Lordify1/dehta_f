import ParticleBackground from '@/components/ParticleBackground';
import { classMap } from '@/components/Tools/Misc';
import React from 'react';
import { Fade, Slide } from 'react-awesome-reveal';
import { FaAssistiveListeningSystems, FaChartBar, FaCoins, FaSearch } from 'react-icons/fa';
import {TrendBetData} from '@/data/indexData.jsx'
import { SlideDown, SlideUp } from '../../components/Tools/Misc';



const TrendBetSection: React.FC = () => {
  return (
    <section
      id="lens"
      className="relative text-(--primary) py-10 px-6 sm:px-16 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl items-center">
        <h1 className="text-3xl lg:text-6xl mb-4">TrendBet</h1>
        <div className='grid grid-cols-1 gap-3 pt-5 items-center justify-center'>
            <div className="grid grid-cols-1 lg:grid-cols-3">
                <section className='flex flex-col items-center justify-center'>
                    <h1 className='text-2xl lg:text-3xl mb-2'>As a Creator</h1>
                    {TrendBetData.map((it:any) => {
                        if (it.type !== 'creator') return null;
                        return it.data.map((sect:any, index:any) => {
                            return (
                                <SlideUp delay={5}>
                                <section key={`creator-${index}`} className={`${classMap.indexCard(20,30)} flex items-center justify-start mb-3`}>
                                    {sect.icon}
                                    <h4 className='text-3xl lg:text-3xl'>{sect.text}</h4>
                                </section>
                                </SlideUp>
                            )
                        })
                    })}
                </section>
                <section className='flex flex-col items-center justify-center text-center'>
                    <SlideDown className='flex flex-col items-center justify-center text-center' delay={5}>
                    <FaChartBar className='text-9xl animate-pulse transition-all duration-initial'/>
                    </SlideDown>
                </section>
                <section className='flex flex-col items-center justify-center'>
                    <h1 className='text-2xl lg:text-3xl mb-2'>As a Participant</h1>
                    {TrendBetData.map((it:any) => {
                        if (it.type !== 'participant') return null;
                        return it.data.map((sect:any, index:any) => {
                            return (
                                <SlideUp delay={5}>
                                <section key={`participant-${index}`} className={`${classMap.indexCard(20,30)} flex items-center justify-start mb-3`}>
                                    {sect.icon}
                                    <h4 className='text-3xl lg:text-3xl'>{sect.text}</h4>
                                </section>
                                </SlideUp>
                            )
                        })
                    })}
                </section>
            </div>
        </div>
      </div>
    </section>
  );
};

export default TrendBetSection;