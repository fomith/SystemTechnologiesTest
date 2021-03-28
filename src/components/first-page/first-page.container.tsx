import { connect } from 'react-redux'
import { listCoinsMarketResponseData } from '../../api/api.types'
import {
  RootReducerInterface,
  getCoinsMarketList,
  changeDefaultCoin
} from '../../store/root-reducer'
import { FirstPageView } from './first-page.view'

export interface FirstPageProps {
  listCoinsMarkets: listCoinsMarketResponseData[]
  loading: boolean
  baseCoin: listCoinsMarketResponseData
}

const state = (state: { root: RootReducerInterface }): FirstPageProps => ({
  listCoinsMarkets: state.root._coinMarketData,
  loading: state.root.loading,
  baseCoin: state.root.baseCoin
})

export const FirstPage = connect(state, { getCoinsMarketList, changeDefaultCoin })(FirstPageView)
