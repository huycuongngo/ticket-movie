import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'

export default function Loading(props) {
  const { isLoading } = useSelector(state => state.LoadingReducer);
  // console.log(isLoading);

  return (
    <Fragment>
      { isLoading ? 
        <div style={{ position: "fixed", top: 0, left: 0, zIndex: 99, width: "100%", height: "100%", background: 'rgba(0,0,0,0.5)', display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div className='text-4xl'>Loading...</div>
        </div> : ''
      }
    </Fragment>
  )
}
