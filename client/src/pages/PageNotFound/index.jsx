import React from 'react'
import "./PageNotFound.scss"
import { Link } from "react-router-dom"
import {Images} from "../../Config/index"

function PageNotFound() {
  return (
    <div className='pageNotFound'>
      <div className="pageNotFound__content">
        <img src={Images.NotFound} alt="" />
      <Link to="/">Go Home</Link>
      </div>
    </div>
  )
}

export default PageNotFound