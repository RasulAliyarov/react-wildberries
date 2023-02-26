import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import "./UserDetail.scss"
import { userDetailReduce, isLoadingReduce } from "../../../redux/Slices/adminSlice"
import wildSlice, { sellerProductsReduce } from "../../../redux/Slices/wildSlice"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Images } from "../../../Config"
import { useNavigate } from "react-router-dom"
import { API_URL } from '../../../http';

function UserDetail() {
    const admin = useSelector(state => state.admin)
    const wildberries = useSelector(state => state.wildberries)
    const dispatch = useDispatch()
    const editorRef = useRef(null);
    const navigate = useNavigate()

    const { id } = useParams()
    async function getDataById() {
        dispatch(isLoadingReduce(true))
        await axios.get(`http://localhost:8080/api/getUserById/${id}`).then(res => {
            dispatch(userDetailReduce(res.data))
        })
        dispatch(isLoadingReduce(false))
    }

    useEffect(() => {
        getDataById()
    }, [])
    console.log(wildberries?.sellerProducts)
    return (
        <div className='adminPages'>
            {
                admin.isLoadingState ? <div className='loader'><img src={Images.Loader} alt="" /></div> :
                    <div className='userDetail'>
                        <span className='userDetail__left'>
                            <div>
                                <img src="https://st2.depositphotos.com/5682790/10456/v/600/depositphotos_104564156-stock-illustration-male-user-icon.jpg" alt="" />
                            </div>
                        </span>
                        <div className="userDetail__right">
                            <ul>
                                <li><span>Full name:</span>{admin.userDetailState?.fullname}</li>
                                <li><span>Name:</span>{admin.userDetailState?.username}</li>
                                <li><span>Email:</span>{admin.userDetailState?.email}</li>
                                <li><span>Country:</span>{admin.userDetailState?.country}</li>
                                <li><span>Phone number:</span>{admin.userDetailState?.phonenumber}</li>
                                <li><span>Post index:</span>{admin.userDetailState?.postIndex}</li>
                                <li><span>Card number:</span>{admin.userDetailState?.bankCard}</li>
                            </ul>
                        </div>
                    </div>
            }
        </div>
    )
}

export default UserDetail