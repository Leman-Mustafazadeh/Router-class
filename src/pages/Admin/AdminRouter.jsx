import React, { useEffect, useState } from 'react'
import AddminNavbar from '../../components/Admin/Navbar'
import {Outlet, json, useNavigate} from "react-router"
import { getAll } from '../../API'
import { endpoints } from '../../API/base'
import useLocalStorage from "../../hooks/useLocalStroage"
const AdminRouter = () => {
  const [users,setUsers]= useState([])
  const [localStorageId,setlocalStorageId] = useLocalStorage("AdminId",null)
  const localId = JSON.parse(localStorage.getItem("adminId"))
  const [ adminId, setAdminId] = useState(localId? localId : null)
  const navigate  = useNavigate()
  useEffect(()=>{
    getAll(endpoints.users).then((res)=>{
      setUsers(res.data)
    })

    if(localStorageId==null){
      navigate("/admin/login")
    }
  },[localStorageId])
  

  const [country,setCountry]=useState([])
  const [search,setSearch]= useState([])

  useEffect(()=>{
    getAll(endpoints.countries).then((res)=>{
      setCountry(res.data)
    })
  },[])
  return (
    <div>
        <AddminNavbar adminId={adminId} setAdminId={setAdminId} setlocalStorageId={setlocalStorageId}localStorageId={localStorageId} />
        <Outlet context={[country,setCountry,users,setAdminId,setlocalStorageId,localStorageId]} />
    </div>
  )
}

export default AdminRouter
