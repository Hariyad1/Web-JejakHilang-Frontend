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
        const token = localStorage.getItem('authToken');
        if (!token) return;

        const res=await axios.get(URL+"/api/auth/refetch",{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        setUser(res.data)

      }
      catch(err){
        console.log("Error fetching user:", err)
      }
    }

    const logout=async()=>{
      try{
        localStorage.removeItem('authToken');
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
