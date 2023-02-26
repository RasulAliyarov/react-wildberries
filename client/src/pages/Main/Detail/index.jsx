import React, { useEffect } from 'react'
import "./Detail.scss"
import { Icons, Images } from "../../../Config/index"
import { addToCartReducer, productForBuyReduce, counterIncReduce, totalPriceReduce, counterDecReduce } from "../../../redux/Slices/wildSlice"
import { oneProductReduce, isLoadingReduce } from "../../../redux/Slices/adminSlice"
import { toast } from "react-hot-toast"
import UserService from "../../../Services/UserService"
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import axios from 'axios'

function Detail() {
  const { id } = useParams()

  const wildberries = useSelector(state => state.wildberries)
  const admin = useSelector(state => state.admin)

  const dispatch = useDispatch()
  const reducrPath = admin.oneProductState

  async function getDataById() {
    dispatch(isLoadingReduce(true))
    await axios.get(`http://localhost:8080/api/products/${id}`).then(res => {
      dispatch(oneProductReduce(res.data))
    })
    dispatch(isLoadingReduce(false))
  }
  useEffect(() => {
    getDataById()
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [])

  function handleAddToCart() {
    let item = wildberries.cart.filter(p => p.id === reducrPath?._id)
    if (item?.[0]) {
      toast.error(`${reducrPath?.name} уже в корзине.`, {
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
      return
    }

    dispatch(addToCartReducer({
      id: reducrPath?._id,
      img: reducrPath?.image,
      name: reducrPath?.name,
      brand: reducrPath?.brand,
      count: wildberries?.counterState,
      price: reducrPath?.price,
      color: reducrPath?.color,
    }))

    toast.success(`${reducrPath?.name} в корзине.`, {
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
    dispatch(totalPriceReduce({ price: parseInt(reducrPath?.price), count: parseInt(wildberries?.counterState) }))
  }
  return (
    <div className='detail contentBg'>
      {
        admin.isLoadingState ? <div className='loader'><img src={Images.Loader} alt="" /></div> :

          <div className="detail__wrapper container1500">
            <div className='detail__wrapper__title'>
              <h1>{reducrPath?.brand} / {reducrPath?.name}</h1>
              <span className='detail__wrapper__title__content'>
                <span>
                  {Icons.FillStar}
                  {Icons.FillStar}
                  {Icons.FillStar}
                  {Icons.FillStar}
                  {Icons.FillStar}
                </span>
                <span className='detail__wrapper__title__content__commentCount' href="#">2 278 отзывов</span>
                <h5><span> Артикул: </span>{reducrPath?._id?.toString()?.slice(2, 11)}</h5>
              </span>
            </div>

            <div className="detail__wrapper__top">
              <div className="detail__wrapper__top__left">
                <img src={reducrPath?.image} alt="" />
              </div>

              <div className="detail__wrapper__top__right">
                <h3>{reducrPath?.price} ₽ <span>1 550 ₽</span></h3>
                <h4>Бренд: {reducrPath?.brand}</h4>
                <div className='counter'>
                  <button className='decrementBtn' onClick={() => dispatch(counterDecReduce(1))}>-</button>
                  <span>{wildberries.counterState}</span>
                  <button className='incrementBtn' onClick={() => dispatch(counterIncReduce(1))}>+</button>
                </div>
                <span className='detail__wrapper__top__right__buttons'>
                  <span>
                    <button className='addToCart' onClick={() => handleAddToCart()}>
                      <img src={Images.Cart} alt="" />
                      Добавить в корзину
                    </button>

                    <i className='addToFavorite' onClick={() => {
                      UserService.addToFavorite(admin?.userState?.id, reducrPath?._id).then(r => {
                        if (!r) {
                          toast.error(`Ошибка`, {
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
                          return
                        }
                        toast.success(`${reducrPath?.name} в избранном.`, {
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
                    }}>{Icons.FillHeart}</i>

                  </span>

                  <Link to={`buy/${reducrPath?._id}`} className="buyBtn" onClick={() => {
                    dispatch(productForBuyReduce({
                      img: reducrPath?.image,
                      name: reducrPath?.name,
                      brand: reducrPath?.brand,
                      count: wildberries?.counterState,
                      price: reducrPath?.price,
                      color: reducrPath?.color,
                    }))
                  }}><i>{Icons.Dollar}</i>Купить</Link>
                </span>
              </div>
            </div>

            <div className="detail__wrapper__bottom">
              <h4>О товаре</h4>
              <span dangerouslySetInnerHTML={{ __html: reducrPath?.desc }}>

              </span>
            </div>
          </div>
      }
    </div >
  )
}

export default Detail