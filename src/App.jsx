import Routing from './Routing'
import './App.css'
import { DataContext } from './Components/DataProvider/DataProvider'
import { Type } from './Utility/action.type'
import { useContext, useEffect } from 'react'
import { auth } from './Utility/firebase'
import React from 'react'

function App() {
  const [{user}, dispatch]=useContext(DataContext)
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if (authUser){
        // console.log(authUser)
        dispatch({
          type:Type.SET_USER,
          user:authUser
        })
      }else{
 dispatch({
   type: Type.SET_USER,
   user: null,
 });

      }
    })
  },[])

  return (
    <>
    <Routing/>
    </>
  )
}


export default App