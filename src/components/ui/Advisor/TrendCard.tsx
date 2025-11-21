import { classMap, ProgressBar } from "@/components/Tools/Misc";
import { useMisc } from "@/context/MiscContext";
import { useOffCanvas } from "@/context/OffCanvasContext";
import { dataSlice } from "ethers";
import { FaCopy, FaEye, FaEyeDropper, FaShare, FaVoteYea } from "react-icons/fa";

type creator = {
    username: string,
    avatar: string
}

type votes = {
    id: number
}

type Props = {
    id: any,
    user_id: number,
    title: string,
    body: string,
    target_vote: number,
    hash: any,
    commission_rate: any,
    reward_per_correct: any,
    minumum_vote_to_payout: number,
    status: string,
    creator: creator,
    votes: votes,
    data: any
};

const TrendCard = ({id,user_id, title,body, target_vote,hash,commission_rate,reward_per_correct,minumum_vote_to_payout,status, creator, votes, data}: Props) => {
    const {setSelectedTrend} = useMisc()
    const {setShowOffCanvas, setOffId, SetOfftitle} = useOffCanvas()

    const trend = {
        id: id,
        user_id: user_id,
        title: title,
        body: body,
        target_vote: target_vote,
        hash: hash,
        commission_rate: commission_rate,
        reward_per_correct: reward_per_correct,
        minumum_vote_to_payout: minumum_vote_to_payout,
        status: status,
        creator: creator,
        votes: votes
    }

    return(
        <section
        key={id}
        className={`${classMap.card} flex flex-col p-2`}
        >
            {/* header  */}
            <div className="flex flex-row items-center justify-end w-full p-1">
                <h3>{creator.username}</h3>
                <img src={creator?.avatar !== null ? creator?.avatar : "https://placehold.co/80x80"} className="w-5 border-1 rounded-full ms-1 text-sm overflow-hidden" alt={creator?.username} />
            </div>
            {/* body */}
            <div className={`flex flex-col items-center justify-center h-20 w-full ${classMap.userCard()} text-center`}>
                <p>{body}</p>
            </div>
            {/* footer  */}
            <div className="flex flex-col items-center justify-center w-full p-1">
                <ProgressBar
                current={votes?.length}
                destination={100}                
                />
                <div className="grid grid-cols-4 gap-1 w-full p-1 items-center justify-center">
                    <button 
                    onClick={() => {
                        setSelectedTrend([data]);
                        setShowOffCanvas(true);
                        setOffId('viewTrend');
                        SetOfftitle(`Trend View`)
                    }} className={`${classMap.button()}`}><FaEye className={`inline`}/></button>
                    <button onClick={() => setSelectedTrend([data])} className={`${classMap.button()}`}><FaVoteYea className={`inline`}/></button>
                    <button className={`${classMap.button()}`}><FaShare className={`inline`}/></button>
                    <button className={`${classMap.button()}`}><FaCopy className={`inline`}/></button>
                </div>
            </div>
        </section>
    )
}


export default TrendCard