/* eslint-disable */
import { AnyAction } from 'redux'
import { listCoinsMarkets } from '../api/api'
import { listCoinsMarketResponseData } from '../api/api.types'

const GET_MARKET_STATE = 'GET_MARKET_STATE'
const LOADING_DATA = 'LOADING_DATA'
const CHANGE_DEFAULT_COIN = 'CHANGE_DEFAULT_COIN'

export interface RootReducerInterface {
  _coinMarketData: listCoinsMarketResponseData[]
  loading: boolean
  baseCoin: listCoinsMarketResponseData
}

const initState: RootReducerInterface = {
  _coinMarketData: [{ Cur_ID: 0, Cur_Abbreviation: 'BYN', Cur_Name: 'Белорусский рубль', Cur_OfficialRate: 1, Cur_Scale: 1, Date: 'asd' }],
  loading: true,
  baseCoin: { Cur_ID: 0, Cur_Abbreviation: 'BYN', Cur_Name: 'Белорусский рубль', Cur_OfficialRate: 1, Cur_Scale: 1, Date: 'asd' }
}

export const rootReducer = (state = initState, action: AnyAction): RootReducerInterface => {
  switch (action.type) {
    case 'GET_MARKET_STATE': {
      if (state.loading) {
        return { ...state, _coinMarketData: [...state._coinMarketData, ...action.data] }
      } else {
        return state
      }
      
    }
    case 'LOADING_DATA': {
      return { ...state, loading: action.data.loading }
    }
    case 'CHANGE_DEFAULT_COIN': {
      return { 
        ...state, 
        baseCoin: action.data.newBaseCoin,
        _coinMarketData: [...state._coinMarketData.map(x => ({
          ...x,
          Cur_OfficialRate: x.Cur_OfficialRate / action.data.newBaseCoin.Cur_OfficialRate
        }))]
      
      }
    }
    default:
      return { ...state }
  }
}

export const getCoinsMarketList = () => {
  return async (dispatch: any) => {
    const response = await listCoinsMarkets()
    dispatch({ type: GET_MARKET_STATE, data: response.data })
    dispatch({ type: LOADING_DATA, data: { loading: false } })
  }
}

export const changeDefaultCoin = (coin: listCoinsMarketResponseData) => {
  return (dispatch: any) => {
    dispatch({ type: CHANGE_DEFAULT_COIN, data: { newBaseCoin: coin } })
  }
}
