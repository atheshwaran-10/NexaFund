import React from 'react'
import TransactionList from './components/Table'
import { env } from '@/env'


const page = () => {

  return (
    <div>
      <TransactionList etherKey={env.ETHERSCAN_API_KEY}/>
    </div>
  )
}

export default page