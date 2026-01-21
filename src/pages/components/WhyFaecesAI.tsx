import ParticleBackground from '@/components/ParticleBackground';
import { classMap } from '@/components/Tools/Misc';
import React from 'react';
import { Fade, Slide } from 'react-awesome-reveal';
import { FaAssistiveListeningSystems, FaChartLine, FaSearch } from 'react-icons/fa';
import {indexFeatures} from '@/data/indexData.jsx'
import { FadeInAnim, SlideDown, SlideUp, StaggeredList } from '../../components/Tools/Misc';
import { IoBarChartOutline, IoTrendingUp } from 'react-icons/io5';


const narData = [
  {
    name: "AI Tokens",
    sub: "621 Tokens",
    mini_text: "15,000 Buys",
    rotation: "-rotate-5",
    margin: 'ms-10'
  },
  {
    name: "Meme SZN",
    sub: "700 Tokens",
    mini_text: "34,000 Buys",
    rotation: "-rotate-3",
    margin: 'ms-25'
  },
  {
    name: "GameFi",
    sub: "800 Tokens",
    mini_text: "30,000 Buys",
    rotation: "-rotate-1",
    margin: 'ms-35'
  }
]


const WhyFaecesAI: React.FC = () => {
  return (
    <section
      id="why"
      className="text-[var(--primary)] py-10 px-6 sm:px-16 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col items-center mb-6 space-y-3 text-center">
          <h6 className={`${classMap.glassEffect()} min-w-10`}>
            Why Dehta Labs
          </h6>
          <h1 className="text-6xl font-semibold">
            Innovative Features of Dehta Labs
          </h1>
          <span className="max-w-3xl text-white/70">
            Our platform combines Real-time Market Insights, AI Prediction Tools,
            and Narrative Trend Indicators to keep you profitable in every
            season.
          </span>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Feature Card */}
          <section
            className={`${classMap.indexCard()} lg:col-span-3 relative`}
            style={{ minHeight: '320px' }}
          >
            <div className="flex items-start gap-4 pt-10 px-3">
              <img
                className="w-10"
                src="/assets/ui/realtime_why.svg"
                alt="Realtime"
              />
              <div className="space-y-1">
                <p className="text-2xl font-medium">
                  Real-time Market Insights
                </p>
                <span className="text-white/70">
                  Get access to live crypto market data enhanced with AI-driven
                  insights to track trends and stay ahead every season.
                </span>
              </div>
            </div>

            {/* Mini Cards */}
            <div className="absolute bottom-4 right-4 grid grid-cols-2 gap-4">
              <object
                data="/assets/ui/why_bitcoin.svg"
                type="image/svg+xml"
                className="justify-self-end"
              />
              <object
                data="/assets/ui/Frame 20.svg"
                type="image/svg+xml"
                className="justify-self-end"
              />
            </div>
          </section>

          {/* Bottom Grid */}
          {/* <section className="flex flex-col lg:flex-row gap-4"> */}
            <div
              className={`${classMap.indexCard()} lg:col-span-2`}
              style={{ minHeight: '260px' }}
            >
              <div className="flex items-start gap-4 pt-10 px-3">
                <img
                  className="w-10"
                  src="/assets/ui/ai_icon.svg"
                  alt="Realtime"
                />
                <div className="space-y-1">
                  <p className="text-2xl font-medium">
                    AI Prediction Tools
                  </p>
                  <span className="text-white/70">
                    Advanced AI models identify momentum shifts before the
                    market reacts.
                  </span>
                </div>
              </div>
              <div className="relative flex items-center justify-between w-full px-8 mt-6">
                  <object data="/assets/ui/why_ai.svg" className='w-60' type="image/svg+xml"></object>
                  <svg
                    className="absolute left-[270px] top-1/2 -translate-y-1/2"
                    width="120"
                    height="200"
                    viewBox="0 0 120 160"
                    fill="none"
                  >
                    <path d="M0 20 C40 20, 60 20, 120 10" stroke="#22c55e" strokeWidth="1" />
                    <path d="M0 80 C40 80, 60 80, 120 80" stroke="#22c55e" strokeWidth="1" />
                    <path d="M0 140 C40 140, 60 140, 120 150" stroke="#22c55e" strokeWidth="1" />
                  </svg>
                  <div className="flex flex-col gap-4">
                    <span className={`${classMap.glassEffect()} flex text-center items-center gap-2`}>Scans live crypto data</span>
                    <span className={`${classMap.glassEffect()} flex text-center items-center gap-2`}>Forecasts market movement</span>
                    <span className={`${classMap.glassEffect()} flex text-center items-center gap-2`}>Predicts early market shifts</span>
                  </div>
              </div>
            </div>

            <div
              className={`${classMap.indexCard()} lg:col-span-1`}
              style={{ minHeight: '260px' }}
            >
              <div className="flex items-start gap-4 pt-10 px-3">
                <img
                  className="w-10"
                  src="/assets/ui/nar_icon.svg"
                  alt="Realtime"
                />
                <div className="space-y-1">
                  <p className="text-2xl font-medium">
                    Narrative Trend Indicator
                  </p>
                  <span className="text-white/70">
                    Detects emerging crypto narratives before they go mainstream.
                  </span>
                </div>
              </div>
              <div className="relative flex flex-col gap-3 mt-4 space-y-1">
                <StaggeredList>
                {narData.map((it:any, ind:any) => {
                  return(
                    <section
                      key={ind}
                      className={`
                        mt-2
                        relative
                        border border-green-700
                        w-60
                        px-5
                        rounded-lg
                        bg-[#1c2a1e]/90
                        backdrop-blur-md
                        p-3
                        ${it.rotation}
                        ${it.margin}
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:scale-[1.02]
                      `}
                    >
                        <div className='flex items-center justify-between'>
                          <small>{it.name}</small>
                          <IoTrendingUp/>
                        </div>
                        <div className='flex items-center justify-between'>
                          <small>{it.sub}</small>
                          <small>{it.mini_text}</small>
                        </div>
                    </section>
                  )
                })}
                </StaggeredList>
              </div>
            </div>
          {/* </section> */}
        </div>
      </div>
    </section>
  );
};

export default WhyFaecesAI;
