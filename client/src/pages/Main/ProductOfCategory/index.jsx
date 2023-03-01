import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../../http';
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from 'react-redux';
import { } from "../../../redux/Slices/wildSlice";
import { productsReduce, isLoadingReduce } from "../../../redux/Slices/adminSlice";
import { Images } from "../../../Config/index"
import { Link } from "react-router-dom"
import { productModalReducer,burgerModaToggleReducer} from "../../../redux/Slices/wildSlice"
import "./ProductOfCategory.scss"
import ProductModal from "../../../components/Main/ProductModal"

function ProductOfCategory() {
    let { name } = useParams()
    const wildberries = useSelector(state => state.wildberries)
    const admin = useSelector(state => state.admin)
    const dispatch = useDispatch()

    async function getData() {
        dispatch(isLoadingReduce(true))
        await axios.get(`${API_URL}/products`).then((value) => {
            dispatch(productsReduce(
                value.data.filter(p => p.deleteState === false && p.category === name),
            ))
        })
        dispatch(isLoadingReduce(false))
    }
    useEffect(() => {
        getData()
        dispatch(burgerModaToggleReducer(false))
    }, [name])

    return (
        <div className='productOfCategory contentBg'>
            {
                admin.isLoadingState ? <div className='loader'><img src={Images.Loader} alt="" /></div> :
                    <div className="productOfCategory__wrapper container1500">
                        <div className="productOfCategory__wrapper__content">
                            <h2 className='sectionTtile sectionTtile--modified'>{name}</h2>

                            <div className="productOfCategory__wrapper__content__products">
                                {
                                    admin.productsState?.map(p => {
                                        return (
                                            <div key={p._id} className="productOfCategory__wrapper__content__products__product">
                                                <Link to={`/detail/${p?._id}`}>
                                                    <div className="productOfCategory__wrapper__content__products__product__top">
                                                        <img src={p.image} alt="" />
                                                        <span className='cardDiscount'>-30%</span>
                                                    </div>
                                                    <div className="productOfCategory__wrapper__content__products__product__bottom">
                                                        <span className='price'>
                                                            <h5>{p.price} ₽ </h5>
                                                            <span>615 ₽</span>
                                                        </span>
                                                        <span className='productTitle'>
                                                            <p>{p.brand}/{p.name}</p>
                                                        </span>
                                                    </div>
                                                </Link>
                                                <button className='cardModalBtn' onClick={() => {
                                                    dispatch(productModalReducer({
                                                        state: true,
                                                        productData: { ...p }
                                                    }))
                                                }}>Быстрый просмотр</button>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </div>
                    </div>
            }
            <div className={wildberries.productModalState?.state ? "productModalWrapper" : "productModalNone"}>
                <div className='productModalWrapperBg' onClick={() => {
                    dispatch(productModalReducer({ state: false }))
                }}></div>
                <ProductModal />
            </div>

            <Helmet>
                <meta charSet="utf-8" />
                <title>{name}</title>

            </Helmet>
        </div>
    )
}

export default ProductOfCategory