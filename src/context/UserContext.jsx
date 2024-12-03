/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { URL } from "../url";


export const UserContext=createContext({})


export function UserContextProvider({children}){
    const [user,setUser]=useState(null)

    useEffect(()=>{
      getUser()

    },[])

    const getUser=async()=>{
      try{
        const token = localStorage.getItem('token');
        const res=await axios.get(URL+"/api/auth/refetch",{
          withCredentials:true,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        console.log("User data:", res.data)
        setUser(res.data)

      }
      catch(err){
        console.log(err)
      }
    }

    const logout=async()=>{
      try{
        const token = localStorage.getItem('token');
        await axios.get(URL+"/api/auth/logout",{
          withCredentials:true,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        setUser(null)
        window.location.href="/login"
      }
      catch(err){
        console.log(err)
      }
    }

    return (<UserContext.Provider value={{user,setUser,logout}}>
      {children}
    </UserContext.Provider>)
}
