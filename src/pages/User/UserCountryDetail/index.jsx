import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import {getOne} from "../../../API"
import { Link } from "react-router-dom";
import { endpoints } from '../../../API/base.js';
const UserCountryDetail = () => {

  const {id} = useParams()
  const [getData,setGetData]= useState([])

  useEffect(()=>{
    getOne(endpoints.countries,id).then((res)=>setGetData(res.data))
  },[id])
    console.log(getData);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "30px", justifyContent: "center", }}>
    <Link to="/usercountries">Go Admin Panel</Link>
    <h1>{getData.name}</h1>
    <p>{getData.description}</p>
    <img src={getData.flagImg} alt="" />

  </div>
  )
}

export default UserCountryDetail
