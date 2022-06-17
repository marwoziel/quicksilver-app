import React from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import './CongratulationsPane.css';

export default function CongratulationsPane() {
      const { width, height } = useWindowSize()
    return (
        <>
        <div className="congratulations-pane d-flex mt-5 justify-content-center align-items-center flex-column">
    <h4 className="mt-5">Congratulations! You've successfully staked the tokens!</h4> 
    <div className="button-container mt-4">
        <button className="stake mx-2"> Stake on another network </button>
        <button className="use-qassets mx-2"> Use qAssets in DeFi</button> 
        </div>
    </div>
    <Confetti recycle={false}
      width={width}
      height={height}
    />
    </>
    );
}