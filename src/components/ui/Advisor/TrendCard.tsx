import { classMap, ProgressBar } from "@/components/Tools/Misc";
import { useMisc } from "@/context/MiscContext";
import { useOffCanvas } from "@/context/OffCanvasContext";
import { FaCopy, FaEllipsisH, FaEllipsisV, FaEye, FaEyeDropper, FaShare, FaTrash, FaVoteYea } from "react-icons/fa";
import { useUser } from "@/context/UserContext";
import axios from "axios";
import { apiUrl } from "../../../App";
import { toast } from "react-toastify";
import SendRequest from "../../Tools/SendRequest";
import { EllipsisDropdown } from "../../Tools/Misc";
import TrendImg from '../../../assets/dehta_logo.png'


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
    target_votes: number,
    hash: any,
    commission_rate: any,
    reward_per_correct: any,
    minumum_vote_to_payout: number,
    status: string,
    creator: creator,
    votes: votes,
    data: any,
    clickFunction?: () => {}
};

const TrendCard = ({id,user_id, title,body, target_votes,hash,commission_rate,reward_per_correct,minumum_vote_to_payout,status, creator, votes, data, clickFunction}: Props) => {
    const {setSelectedTrend} = useMisc()
    const {setShowOffCanvas, setOffId, SetOfftitle} = useOffCanvas()
    const {user, getUser } = useUser();

    const trend = {
        id: id,
        user_id: user_id,
        title: title,
        body: body,
        target_votes: target_votes,
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
                {/* {user?.id === user_id && (
                    <EllipsisDropdown>
                        <SendRequest
                            url={`/api/trendbet/delete/${id}`}
                            method="post"
                            deleteBtn={true}
                            awaitConfirmation={true}
                            onResponse={() => {
                                getUser()
                            }}
                        />
                    </EllipsisDropdown>
                )} */}
            </div>
            {/* body */}
            <div className={`flex flex-col items-center justify-center w-full ${classMap.userCard()} text-center overflow-hidden h-40`}>
                    {/* <img
                        src={data.image ?? TrendImg}
                        alt={title}
                        className="w-full h-30 object-cover rounded-md mb-2"
                        onError={(e) => e.currentTarget.src = '/placeholder.png'}
                    /> */}
                <p>{body}</p>
            </div>
            {/* footer  */}
            <div className="flex flex-col items-center justify-center w-full p-1">
                {votes.length !== target_votes ? (
                <>
                <ProgressBar
                current={votes?.length}
                destination={target_votes}                
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
                </>
                ) : (
                    <div className="flex flex-col gap-1 w-full p-1 items-center justify-center opacity-70">
                        <p>Trend is Closed</p>
                        <button 
                        onClick={() => {
                            setSelectedTrend([data]);
                            setShowOffCanvas(true);
                            setOffId('viewTrend');
                            SetOfftitle(`Trend View`)
                        }} className={`${classMap.button()} w-full`}>View Results</button>
                    </div>
                )}
            </div>
        </section>
    )
}


export default TrendCard