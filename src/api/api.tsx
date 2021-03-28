import Axios, { AxiosResponse } from 'axios'
import { listCoinsMarketResponseData } from './api.types'

const apiBase = Axios.create({
  baseURL: 'https://www.nbrb.by/api/exrates/',
  withCredentials: false
})

export const listCoinsMarkets = async (): Promise<AxiosResponse<listCoinsMarketResponseData[]>> => await apiBase
  .get<listCoinsMarketResponseData[]>('rates?periodicity=0')
