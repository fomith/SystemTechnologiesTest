import { Button, Container, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { listCoinsMarketResponseData } from '../../api/api.types'
import { Loading } from '../loading/loading.view'
import { SecondPageProps } from './second-page.container'

const linkToCoins = '/'

export interface SecondPageViewProps extends SecondPageProps {
  getCoinsMarketList: () => void
  changeDefaultCoin: (coin: listCoinsMarketResponseData) => void
}

const styled = {
  container: {
    display: 'flex',
    paddingTop: '25px',
    paddingBottom: '25px',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  center: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
}

export function SecondPageView ({
  baseCoin,
  listCoinsMarkets,
  loading,

  getCoinsMarketList,
  changeDefaultCoin
}: SecondPageViewProps): React.ReactElement {
  if (loading) {
    getCoinsMarketList()
    return <Loading />
  }

  const [value, setValue] = useState<string>('')
  const [result, setResult] = useState<number>(0)

  const calculating = (): void => {
    const data = value.split('in').map(x => x.trim().toUpperCase())
    const neededCoinValue = data[0].split(' ').map(x => x.trim())
    if (data[1] === baseCoin.Cur_Abbreviation) {
      const neededCoin = listCoinsMarkets.filter(x => x.Cur_Abbreviation === neededCoinValue[1])[0]
      setResult(neededCoin.Cur_OfficialRate * +neededCoinValue[0] * baseCoin.Cur_Scale)
    } else {
      changeDefaultCoin(listCoinsMarkets.filter(x => x.Cur_Abbreviation === data[1])[0])
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value)
  }
  return (
    <Container>
      <div style={styled.container}>
        <div style={styled.center}>
        <TextField
          id="standard-basic"
          label="Enter the values"
          placeholder='1 usd in byn'
          style={{ width: '250px' }}
          value={value}
          onChange={handleChange}
        />
        <Button
        variant="contained"
        size='large'
        color="primary"
        onClick={calculating}
        disabled={value.length < 12}
        >
          Посчитать
        </Button>
        </div>
        <NavLink to={linkToCoins}>
          <Button variant="contained" size='large' color="secondary">
            Вернуться к списку
          </Button>
        </NavLink>
      </div>
      <div style={styled.center}>
      <Typography variant="h4">
        {result > 0 && value.length >= 12
          ? `${value} = ${result.toFixed(4)} ${baseCoin.Cur_Abbreviation}`
          : 'invalid value entered'}
      </Typography>
      </div>
    </Container>
  )
}
