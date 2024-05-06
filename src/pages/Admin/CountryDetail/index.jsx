import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getOne } from '../../../API'
import { Link } from 'react-router-dom'

const CountryDetail = () => {

  const { id } = useParams()
  const [getData, setGetData] = useState([])

  console.log(getData, "xxxx");

  useEffect(() => {
    getOne(id).then(res => setGetData(res.data))

  }, [id])


  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "30px", justifyContent: "center" }}>
      <Link to="/admin/countries">Go Admin Panel</Link>
      <h1>{getData.name}</h1>
      <p>{getData.description}</p>
      <img src={getData.flagImg} alt="" />

    </div>
  )
}

export default CountryDetail
