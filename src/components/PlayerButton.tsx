import React from 'react'
import '../styles/Button.css';
import { PlayerButtonType } from '../types/Buttons';
import { FowardSVG, PauseSVG, PlaySVG } from './ButtonsSVG';

const PlayerButton = ({ onClick, type }: PlayerButtonType) => {
  const Svgs = {
    prev: <FowardSVG />,
    next: <FowardSVG />,
    pause: <PauseSVG />,
    play: <PlaySVG />
  }
  return (
    <button className={`playerButton ${type}`} type="button" onClick={onClick}>
      {Svgs[type]}
    </button>
  )
}

export default PlayerButton;