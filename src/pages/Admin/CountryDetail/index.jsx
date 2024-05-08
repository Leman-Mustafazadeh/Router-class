import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import { getOne } from '../../../API'
import { Link } from 'react-router-dom'
import { endpoints } from '../../../API/base'

const CountryDetail = () => {

  const {id} = useParams()
const [getData, setGetData] = useState({
    name: '',
    description: '',
    flagImg: ''
  });
  

  useEffect(() => {
    getOne(endpoints.countries, id)
      .then((res) => {
        setGetData(res); // Update state with the fetched data
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  
  // console.log(getData);
console.log(id);

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
