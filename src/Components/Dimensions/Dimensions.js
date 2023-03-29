import React from 'react'
import './Dimensions.css'
import Card from '../Card/Card'

function Dimensions() {
  return (
    <div className='dimensions'>
      <h6>Dimension and Metrics</h6>
      <div className='cards'>
      <Card title={"App ID"} />
      <Card title={"App Name"} />
        <Card title={"AD Request"}/>
        <Card title={"AD Response"} />
        <Card title={"Impressions"} />
        <Card title={"Clicks"}/>
        <Card title={"Revenue"} />
        
      </div>
      
    </div>
  )
}

export default Dimensions
