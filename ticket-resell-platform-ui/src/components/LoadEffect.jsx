import { Backdrop, CircularProgress } from '@mui/material'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

export default function LoadEffect() {

  return (
    <Backdrop sx={(theme) => ({ color: '#2dc275', zIndex: theme.zIndex.drawer + 1, backgroundColor: 'transparent' })} open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}
