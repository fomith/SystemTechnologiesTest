import React from 'react'
import LoadingIndicator from 'react-loading-indicator'

const style = {
  container: {
    heigth: '150px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export function Loading (): React.ReactElement {
  return (
    <div style={style.container}>
      <LoadingIndicator segmentWidth={5} segmentLength={10} />
    </div>
  )
}
