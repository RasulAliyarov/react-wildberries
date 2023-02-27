import React, { useEffect } from 'react'
import "../Products/AdminPanel.scss"
import { Link } from "react-router-dom"
import { usersStateReduce, isLoadingReduce, attentionReduce, yesNoReduce, searchStringReduce } from "../../../redux/Slices/adminSlice"
import { useDispatch, useSelector } from 'react-redux';
import _api, { API_URL } from '../../../http';
import { Images } from '../../../Config/index';
import UserService from '../../../Services/UserService';
import { toast } from 'react-hot-toast';

var id = null
function User() {
  const admin = useSelector(state => state.admin)
  const dispatch = useDispatch()

  async function getData() {
    dispatch(isLoadingReduce(true))
    await _api.get(`${API_URL}/users`).then((value) => {
      dispatch(usersStateReduce(
        value?.data?.filter(p => p?.deleteState === false && p?.roles.includes("USER"))
      ))
    })
    dispatch(isLoadingReduce(false))
  }

  useEffect(() => {
    getData()
    dispatch(searchStringReduce({
      string: "",
      category: "",
      username: "",
      country: ""
    }))
  }, [])

  function handlerAttentioModal(state, imgState) {
    dispatch(yesNoReduce(imgState))
    setTimeout(() => {
      dispatch(attentionReduce(state))
      dispatch(yesNoReduce("neitral"))
    }, 2200)

    if (imgState === "yes") {
      UserService.deleteUser(id, getData)
    }
  }

  return (
    <div className='adminPages'>
      {
        admin.isLoadingState ? <div className='loader'><img src={Images.Loader} alt="" /></div> :

          <div className="adminPages__wrapper">
            <div className="adminPages__wrapper__top">
              <input type="text" placeholder='Search by username' onChange={(e) => dispatch(searchStringReduce({ username: e.target.value }))} />

              <input type="text" placeholder='Search by country' onChange={(e) => dispatch(searchStringReduce({ country: e.target.value }))} />
            </div>
            <div className="adminPages__wrapper__bottom">
              <table className='adminPages__wrapper__bottom__table'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Full name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Phone number</th>
                    <th>country</th>
                    <th>Roles</th>
                    <th className='delTh'>Action</th>
                    <th className='detailTh'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    admin?.usersState?.
                      filter(s => s.username?.toLowerCase()?.includes(admin.searchString?.username?.toLowerCase())
                        || s.country?.toLowerCase()?.includes(admin.searchString?.country?.toLowerCase())).
                      map((p, index) => {
                        return (
                          <tr key={p._id} className="contentRow">
                            <td className='userData productsTd'>{index}</td>
                            <td className='userData productsTd'>{p?.fullname}</td>
                            <td className='userData productsTd'>{p?.username}</td>
                            <td className='userData productsTd'>{p?.email}</td>
                            <td className='userData productsTd'>{p?.phonenumber ? p?.phonenumber : "📞"}</td>
                            <td className='userData productsTd'>{p?.country ? p?.country : "🏴"}</td>
                            <td className='userData productsTd'>{p?.roles}</td>
                            <td className='delTd userData productsTd'><button className='productDelete' onClick={() => {
                              dispatch(attentionReduce(true))
                              id = p._id
                            }}>Delete</button></td>
                            <td className='detailTd userData productsTd'>
                              <Link className='adminProductDetail' to={`/admin/panel/user/${p._id}`}>Detail</Link>
                            </td>
                          </tr>
                        )
                      })
                  }
                </tbody>
              </table>
            </div>
            <div className={admin.attentionState ? "attentionModal " : "attentionModalNone"}>

              <div className="attentionModal__bg" onClick={() => dispatch(attentionReduce(false))}></div>

              <div className='attentionModal__content'>
                <span>
                  <img src={Images.Success}
                    style={admin.yesNoState === "yes" ? { display: "block" } : { display: "none" }} alt="" />
                  <img src={Images.Cancel}
                    style={admin.yesNoState === "no" ? { display: "block" } : { display: "none" }} alt="" />
                  <h4 src={Images.Cancel}
                    style={admin.yesNoState === "neitral" ? { display: "block" } : { display: "none" }} alt="" >
                    Delete Product?
                  </h4>
                </span>
                <div className='attentionModal__content__buttons'>
                  <button className='attentionModal__content__buttons__ok' onClick={() => handlerAttentioModal(false, "yes")}>Ok</button>
                  <button className='attentionModal__content__buttons__cancel' onClick={() => handlerAttentioModal(false, "no")}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
      }
    </div >
  )
}

export default User