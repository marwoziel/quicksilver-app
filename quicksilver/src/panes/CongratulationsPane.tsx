import React from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

export default function CongratulationsPane() {
      const { width, height } = useWindowSize()
    return (
        <>
    <h1>Congratulations! </h1> 
    <Confetti recycle={false}
      width={width}
      height={height}
    />
    </>
    );
}