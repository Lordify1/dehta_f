import { classMap } from "@/components/Tools/Misc"
import { useUI } from "@/context/UIContext"
import React, { useState } from "react"
import { FaCoins, FaDollarSign, FaSearchDollar } from "react-icons/fa"
import Modal from "../Modal"

type Props = {
    id: number,
    rarity: string,
    name: string,
    description: string,
    lens_cost: any,
    cost: any,
    icon: any,
    showBtn?: boolean,
    showPrice?: boolean
}

type SelectedGlass = {
    id: number,
    rarity: string,
    name: string,
    description: string,
    lens_cost: any,
    cost: any,
    icon: any
}

const GlassCard = ({id,rarity,name,description,lens_cost,icon,cost, showBtn = true, showPrice = true}:Props) => {
    const { setShowModal } = useUI();

    return(
        <>
        <div
          key={id}
          className={`border-(--owner) flex flex-col items-center justify-items-center`}
        >
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex bg-(--owner)">
              <img src={`${icon}`} className="w-[50%]" alt={icon} />
            </div>
            <h4 className="font-semibold text-lg">
              {name}
            </h4>
            {showPrice && (
                <div className="flex items-center gap-2 mb-2">
                <FaDollarSign className="text-[var(--owner)]" />
                <span>{cost.toLocaleString()}</span>
                </div>
            )}
            {showBtn && (
                <button
              className={`${classMap.buttonJsx({})}`}
              onClick={() => {setShowModal(true)}}
            >
              <FaSearchDollar className="inline mr-1" /> Buy Glass
            </button>
            )}
          </div>
        </div>
        </>
    )
}

export default GlassCard