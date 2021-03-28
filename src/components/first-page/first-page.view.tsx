import {
  Button,
  Container,
  makeStyles,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@material-ui/core'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { listCoinsMarketResponseData } from '../../api/api.types'
import { Loading } from '../loading/loading.view'
import { FirstPageProps } from './first-page.container'

const linkToCalculator = '/calculator'

export interface FirstPageViewProps extends FirstPageProps {
  getCoinsMarketList: () => void
  changeDefaultCoin: (coin: listCoinsMarketResponseData) => void
}

interface CurrenciesData {
  Cur_Abbreviation?: string
  Cur_Name?: string
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    margin: '0 auto'
  }
})

export function FirstPageView ({
  listCoinsMarkets,
  loading,
  baseCoin,
  changeDefaultCoin,
  getCoinsMarketList
}: FirstPageViewProps): React.ReactElement {
  const classes = useStyles()
  if (loading) {
    getCoinsMarketList()
    return <Loading />
  }

  const currencies: CurrenciesData[] = [
    ...listCoinsMarkets.map((item) => ({ Cur_Abbreviation: item.Cur_Abbreviation, Cur_Name: item.Cur_Name }))
  ]

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newCoin = listCoinsMarkets.filter(x => x.Cur_Abbreviation === event.target.value)[0]
    changeDefaultCoin(newCoin)
  }

  return (
  <Container>
    <div style={{ display: 'flex', paddingTop: '25px', paddingBottom: '25px', justifyContent: 'space-around' }}>
    <TextField
      style={{ width: '250px' }}
      id="standard-select-currency-native"
      select
      label="Изменить на:"
      value={baseCoin.Cur_Abbreviation}
      onChange={handleChange}
    >
      {currencies.map((option) => (
        <MenuItem key={option.Cur_Abbreviation} value={option.Cur_Abbreviation}>
          {option.Cur_Name}
        </MenuItem>
      ))}
    </TextField>
    <NavLink to={linkToCalculator}>
      <Button variant="contained" color="primary">
        Калькулятор валют
      </Button>
    </NavLink>
    </div>
    <div style={{ margin: '0 auto' }}>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>№</TableCell>
            <TableCell align="right">Abbreviation</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Count</TableCell>
            <TableCell align="right">Official Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listCoinsMarkets.map((row, index) => (
            <TableRow key={row.Cur_ID}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="right">{row.Cur_Abbreviation}</TableCell>
              <TableCell align="right">{row.Cur_Name}</TableCell>
              <TableCell align="right">{row.Cur_Scale}</TableCell>
              <TableCell align="right">{row.Cur_OfficialRate.toFixed(4)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>

  </Container>
  )
}
