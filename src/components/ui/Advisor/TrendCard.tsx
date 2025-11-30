import { classMap, ProgressBar } from "@/components/Tools/Misc";
import { useMisc } from "@/context/MiscContext";
import { useOffCanvas } from "@/context/OffCanvasContext";
import { FaCopy, FaEye, FaEyeDropper, FaShare, FaTrash, FaVoteYea } from "react-icons/fa";
import { useUser } from "@/context/UserContext";
import axios from "axios";
import { apiUrl } from "../../../App";
import { toast } from "react-toastify";
import SendRequest from "../../Tools/SendRequest";


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
    const {user, getUser } = useUser();

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

    const deleteTrend = async () => {
        try{
            const res = await axios.post(`${apiUrl}/trendbet/delete/${id}`)

            toast.success(res?.message)
        }catch(err){
            console.log(err)
        }
    }

    return(
        <section
        key={id}
        className={`${classMap.dehtaCard()} flex flex-col p-2`}
        >
            {/* header  */}
            <div className="flex flex-row items-center justify-between w-full p-1">
                <h3>{creator.username}</h3>
                {user?.id === user_id && (
                    <SendRequest
                    url={`/api/trendbet/delete/${id}`}
                    method="post"
                    deleteBtn={true}
                    awaitConfirmation={true}
                    onResponse={() => {
                        getUser()
                    }}
                    />
                )}
            </div>
            {/* body */}
            <div className={`flex flex-col items-center justify-center h-30 w-full ${classMap.userCard()} text-center overflow-hidden`}>
                <p>{body}</p>
            </div>
            {/* footer  */}
            <div className="flex flex-col items-center justify-center w-full p-1">
                <ProgressBar
                current={votes?.length}
                destination={100}                
                />
                <div className="grid grid-cols-3 gap-1 w-full p-1 items-center justify-center">
                    <button 
                    onClick={() => {
                        setSelectedTrend([data]);
                        setShowOffCanvas(true);
                        setOffId('viewTrend');
                        SetOfftitle(`Trend View`)
                    }} className={`${classMap.button()}`}><FaEye className={`inline`}/></button>
                    <button disabled className={`${classMap.button()} opacity-40`}><FaShare className={`inline`}/></button>
                    <button disabled className={`${classMap.button()} opacity-40`}><FaCopy className={`inline`}/></button>
                </div>
            </div>
        </section>
    )
}


export default TrendCard