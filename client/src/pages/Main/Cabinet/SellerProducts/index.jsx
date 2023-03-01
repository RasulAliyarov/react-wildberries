import React, { useEffect } from 'react'
import "./SellerProduct.scss"
import { useDispatch, useSelector } from 'react-redux';
import { sellerProductsReduce } from "../../../../redux/Slices/wildSlice"
import { isLoadingReduce } from "../../../../redux/Slices/adminSlice"
import axios from 'axios';
import { API_URL } from '../../../../http';
import { Link } from "react-router-dom"
import { confirmAlert } from 'react-confirm-alert';
import { Images } from "../../../../Config/index"
import 'react-confirm-alert/src/react-confirm-alert.css';
import UserService from '../../../../Services/UserService';
import { toast } from "react-hot-toast"
import { Helmet } from "react-helmet";

function SellerProducts() {
    const wildberries = useSelector(state => state.wildberries)
    const admin = useSelector(state => state.admin)
    const dispatch = useDispatch()
    async function getData() {
        dispatch(isLoadingReduce(true))
        await axios.get(`${API_URL}/products`).then(r => {
            dispatch(sellerProductsReduce(r.data.filter(p => p.user === admin.userState.id && p.deleteState === false)))
        })
        dispatch(isLoadingReduce(false))
    }
    useEffect(() => {
        getData()
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, [admin.userState])

    function submit(id) {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        UserService.deleteProduct(id, getData)
                            .then(res => {
                                console.log(res)
                                toast.success('Товар удален.', {
                                    style: {
                                        border: '1px solid #4C1174',
                                        padding: '16px',
                                        color: '#4C1174',
                                    },
                                    iconTheme: {
                                        primary: '#4C1174',
                                        secondary: '#FFFAEE',
                                    },
                                });
                            })
                    }
                },
                {
                    label: 'No',
                    onClick: () => {

                    }
                }
            ]
        });
    }

    return (
        <div className='sellerProducts'>
            {
                admin.isLoadingState ? <div className='loader'><img src={Images.Loader} alt="" /></div> :
                    <div className="sellerProducts__wrapper">
                        <div className="sellerProducts__wrapper__products">
                            {
                                wildberries.sellerProducts.map(p => {
                                    return (
                                        <div key={p._id} className="sellerProducts__wrapper__products__product">
                                            <div className="sellerProducts__wrapper__products__product__top">
                                                <img src={p.image} alt="" />

                                                <span className='cardDiscount'>-30%</span>
                                            </div>
                                            <div className="sellerProducts__wrapper__products__product__bottom">
                                                <span className='price'>
                                                    <h5>{p.price} ₽ </h5>
                                                    <span>615 ₽</span>
                                                </span>
                                                <span className='productTitle'>
                                                    <p>{p.brand}/{p.name}</p>
                                                </span>
                                            </div>
                                            <span className='cardButtons'>
                                                <button className='cardButtons__delBtn' onClick={() => submit(p._id)}>Delete</button>
                                                <Link to={`/cabinet/${admin.userState?.username}/editProduct/${p?._id}`} className='cardButtons__editBtn' >Edit</Link>
                                            </span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {/* <div className={wildberries?.sellerProducts?.length > 0 ? "CartFull" : "CartEmpty"}>
                            <img src={Images.FavoriteBG} alt="" />
                        </div> */}
                    </div>

            }
            <Helmet>
                <meta charSet="utf-8" />
                <title>{`${admin?.userState?.username ? ' ' + admin?.userState?.username : ''} - My products`}</title>
            </Helmet>
        </div>
    )
}

export default SellerProducts