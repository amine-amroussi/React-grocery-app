import React, { useEffect } from 'react'

const Alert = ({type , msg , removeAlert , list}) => {

  useEffect(()=> {
    const timeOut = setTimeout(()=> {
      removeAlert();
    } , 3000) 

    return () => clearTimeout(timeOut)

  } , [list , removeAlert ])

  return <p className={`alert alert-${type} `} > {msg} </p>
}

export default Alert