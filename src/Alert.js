import React, { useEffect } from 'react'

const Alert = ({type, msg, removeAlert}) => {
  useEffect(()=>{
    const timeout = setTimeout(() => {
      removeAlert(); //when para not passed then defauly
    }, 2000)
    return () => clearTimeout(timeout)

  }, [])
  return (
      <p className={`alert alert-${type}`}> {msg} </p>
  
  )
}

export default Alert
