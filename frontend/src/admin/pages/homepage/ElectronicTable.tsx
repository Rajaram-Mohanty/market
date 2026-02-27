import React from 'react'
import HomeCategoryTable from './HomeCategoryTable'
import { useAppSelector } from '../../../state/store'

const ElectronicTable = () => {
  const {customer} = useAppSelector(store => store)
  
  return (
    <div><HomeCategoryTable data={customer.homePageData?.electricCategories || []}/></div>
  )
}

export default ElectronicTable