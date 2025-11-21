import { classMap } from "@/components/Tools/Misc"
import { useUI } from "@/context/UIContext"
import React, { useState } from "react"
import { FaCoins, FaSearchDollar } from "react-icons/fa"
import Modal from "../Modal"

type Props = {
    id: number,
    rarity: string,
    name: string,
    description: string,
    lens_cost: any,
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
    icon: any
}

const GlassCard = ({id,rarity,name,description,lens_cost,icon, showBtn = true, showPrice = true}:Props) => {
    const { setShowModal } = useUI();

    return(
        <>
        <div
          key={id}
          className={`${classMap.userCard(1)} ${rarity === 'special' ? 'border-b-4 border-b-red-500' : 'border-b-3 border-b-[var(--owner)]'}`}
        >
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-4xl mb-2">{icon}</span>
            <h4 className="font-semibold text-lg">
              {name}
            </h4>
            <p className="text-sm text-[var(--muted-foreground)] mb-3">
              {description}
            </p>
            {showPrice && (
                <div className="flex items-center gap-2 mb-2">
                <FaCoins className="text-[var(--owner)]" />
                <span>{lens_cost.toLocaleString()} Lens</span>
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