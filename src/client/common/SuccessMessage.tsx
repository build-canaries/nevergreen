import React from 'react'
import {ScaledGrid} from './scale/ScaledGrid'
import {Tile} from '../monitor/Tile'

interface SuccessMessageProps {
  readonly message: string;
}

export function SuccessMessage({message}: SuccessMessageProps) {
  return (
    <ScaledGrid>
      <Tile>
        <span data-locator='success-message'>{message}</span>
      </Tile>
    </ScaledGrid>
  )
}
