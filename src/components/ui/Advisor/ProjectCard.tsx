import React, { useContext } from 'react';
import {
  classMap,
  stringToJson,
} from '@/components/Tools/Misc';
import { OffCanvasContext } from '@/context/OffCanvasContext';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { apiUrl } from '../../../App';

type Props = {
  id: number;
  name: string;
  tagline: string;
  status: string;
  quality_status: string;
  stage: string;
  industry: string;
  slug: string,
  rating: number;
  likes_count: number;
  views_count: number;
  comments_count: number;
  founder: any;
  description: string;
  image: string;
  userId?: number;
  authUserId?: number;
  hideButtons?: boolean;
  showForm?: any;
  more?: any;
  className?: any;
  team?: JSON;
  isDB?: boolean;
  logo?: string
};

export default function ProjectCard({
  id,
  name,
  tagline,
  status,
  quality_status,
  stage,
  industry,
  rating,
  slug,
  likes_count,
  views_count,
  comments_count,
  founder,
  description,
  logo,
  userId,
  authUserId,
  hideButtons = false,
  more,
  className,
  isDB
}: Props) {


  const isOwner = userId === authUserId;
  const {setShowOffCanvas, setOffData} = useContext(OffCanvasContext)

  const user = useAuth();

  const [localStatus, setLocalStatus] = React.useState(status);

  const user_id = user?.user ? authUserId : Math.random().toString(36).substring(2,20);

  const jsonIndustry = stringToJson(industry)

  const guest = user?.user ? false : true

  const updateStatus = async (id, stat) => {
    try{
      const res = await axios.post(`${apiUrl}/api/project/set_status/${id}/${stat}`);
      if(res.status === 200) status = stat;
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div
      key={id}
      className={`
        ${classMap.dehtaCard()}
        hover:border-border hover:shadow-md transition-all duration-300
        translate-y-4
        animate-fade-in,
        overflow-hidden
        ${className}
      `}
    >
      <div className="w-full">
        <div className="flex justify-between items-center mb-2 ">
          <h3 className="text-primary font-bold text-lg text-nowrap text-ellipsis">{name}</h3>
            {(isOwner && isDB) && (
            <button 
              title='Toggle Project Status'
              className={`p-2 transition-all duration-500 rounded-2xl w-10 border-1 flex ${localStatus === 'draft' ? 'items-start justify-start bg-muted-foreground' : `items-end justify-end bg-[var(--owner)]`}`}
              onClick={async () => {
              const newStatus = localStatus === 'draft' ? 'published' : 'draft';
              await updateStatus(id, newStatus);
              setLocalStatus(newStatus);
              }}
            >
              <span className={`${localStatus === 'draft' ? 'bg-muted' : 'bg-[var(--ceo)]'} rounded p-1 transition-all duration-500`}></span>
            </button>
            )}
        </div>
        <div className='h-20 overflow-hidden rounded-xl'>
          <img
          src={logo || '/logo.svg'}
          alt={`Project ${name}`}
          className="w-full h-30 object-cover rounded-md mb-3 transition-all duration-300 hover:rounded-xl"
        />
        </div>
        {/*<div className={`text-accent-foreground opacity-50 mt-3 border-1 grid grid-cols-2 justify-center ${classMap.projectInfo} rounded-none rounded-r-xl`}>
          <span>{rating} <FaStar className={`${classMap.inlineIcon()}`}/></span>
          <span>{likes_count} <FaSearchDollar className={`${classMap.inlineIcon()}`}/></span>
          {/* <span>{views_count} <FaEye className={`${classMap.inlineIcon()}`}/></span>
        </div> */}
        {!hideButtons && (
          <div className="grid grid-cols-1 justify-between gap-1 mt-2">
            <Link
            to={`/buildfi/${id}/${slug}`}
            className={classMap.button()}
            >
            View
            </Link>
            {user?.user?.role === 'investor' &&
            <button
            className={`${classMap.button('','','','','right')} ${isOwner && 'opacity-15'}`}
            disabled={isOwner && true}
            onClick={() => {
              // <InlineGuard
              // action={() => setShowOffCanvas(true)}
              // requireAuth={true}
              // fallback={navigateTo(`${advisorUrl}/login`)}
              // />
              setShowOffCanvas(true),
              more ? setOffData(id) : ''
            }}
            >Rate Startup
            </button>
            }
          </div>
        )}
      </div>
    </div>
  );
}
