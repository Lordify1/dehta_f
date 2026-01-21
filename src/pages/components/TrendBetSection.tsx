import ParticleBackground from '@/components/ParticleBackground';
import { classMap } from '@/components/Tools/Misc';
import React from 'react';
import { Fade, Slide } from 'react-awesome-reveal';
import { FaAssistiveListeningSystems, FaChartBar, FaCoins, FaSearch, FaVoteYea } from 'react-icons/fa';
import {TrendBetData} from '@/data/indexData.jsx'
import { SlideDown, SlideUp } from '../../components/Tools/Misc';
import { IoMedalOutline, IoRocketOutline, IoSettingsOutline, IoTrendingUp } from 'react-icons/io5';



const TrendBetSection: React.FC = () => {
  return (
    <section
      id="trendbet"
      className="relative text-(--primary) py-10 px-6 sm:px-16 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl items-center text-center">
        <h1 className="text-3xl lg:text-6xl mb-4">TrendBet</h1>
        <div className='grid grid-cols-1 gap-3 pt-5 items-center justify-center'>
            <section className='flex flex-row items-center justify-center text-center'>
                <SlideDown className='flex flex-col items-center justify-between text-center' delay={5}>
                    <span className='max-w-5xl p-1'>TrendBet is a prediction-based platform where ideas turn into rewards. Creators launch trends and set options, while participants join in, cast votes, and compete for payouts. Create trends. Predict outcomes. Earn rewards.</span>
                </SlideDown>
            </section>
            <section className="flex flex-row items-center justify-center w-full">
                <object data="/assets/ui/trendbet_all.png" className='w-100 lg:w-130' type="image/png"></object>
            </section>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-10 mt-10">
            {/* Creator Card */}
            <section className="flex flex-col w-full max-w-sm border border-white/20 rounded-xl overflow-hidden bg-black">
                {/* Header */}
                <div className="bg-white px-6 py-4">
                    <span className="text-black font-semibold text-sm uppercase tracking-wide">
                    As a Creator
                    </span>
                </div>
                {/* Body */}
                <div className="grid grid-cols-2 h-full">

                    {/* Steps */}
                    <div className="flex flex-col justify-between p-6 text-white/60 text-sm">
                    <span>Step 1</span>
                    <span>Step 2</span>
                    <span>Step 3</span>
                    </div>

                    {/* Divider */}
                    <div className="absolute left-1/2 top-[72px] bottom-0 w-px bg-white/10" />

                    {/* Actions */}
                    <div className="flex flex-col justify-between p-6">
                    <span className="flex items-center gap-3 font-medium">
                        <IoRocketOutline /> Launch Trend
                    </span>
                    <span className="flex items-center gap-3 font-medium">
                        <IoSettingsOutline /> Set Conditions
                    </span>
                    <span className="flex items-center gap-3 font-medium">
                        <IoMedalOutline /> Get Rewards
                    </span>
                    </div>

                </div>
            </section>

            {/* Participant Card */}
            <section className="flex flex-col w-full max-w-sm border border-white/20 rounded-xl overflow-hidden bg-black">

                {/* Header */}
                <div className="bg-white px-6 py-4">
                    <span className="text-black font-semibold text-sm uppercase tracking-wide">
                    As a Participant
                    </span>
                </div>

                {/* Body */}
                <div className="grid grid-cols-2 h-full">

                    {/* Steps */}
                    <div className="flex flex-col justify-between p-6 text-white/60 text-sm">
                    <span>Step 1</span>
                    <span>Step 2</span>
                    <span>Step 3</span>
                    </div>

                    {/* Divider */}
                    <div className="absolute left-1/2 top-[72px] bottom-0 w-px bg-white/10" />

                    {/* Actions */}
                    <div className="flex flex-col justify-between p-6">
                    <span className="flex items-center gap-3 font-medium">
                        <IoTrendingUp /> Join Trend
                    </span>
                    <span className="flex items-center gap-3 font-medium">
                        <FaVoteYea /> Cast Vote
                    </span>
                    <span className="flex items-center gap-3 font-medium">
                        <IoMedalOutline /> Win Payouts
                    </span>
                    </div>

                </div>
            </section>
            </div>
        </div>
      </div>
    </section>
  );
};

export default TrendBetSection;