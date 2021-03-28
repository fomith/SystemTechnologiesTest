import { connect } from 'react-redux'
import { listCoinsMarketResponseData } from '../../api/api.types'
import { getCoinsMarketList, RootReducerInterface, changeDefaultCoin } from '../../store/root-reducer'
import { SecondPageView } from './second-page.view'

export interface SecondPageProps {
  listCoinsMarkets: listCoinsMarketResponseData[]
  baseCoin: listCoinsMarketResponseData
  loading: boolean
}

const state = (state: { root: RootReducerInterface }): SecondPageProps => ({
  listCoinsMarkets: state.root._coinMarketData,
  baseCoin: state.root.baseCoin,
  loading: state.root.loading
})

export const SecondPage = connect(state, { getCoinsMarketList, changeDefaultCoin })(SecondPageView)
