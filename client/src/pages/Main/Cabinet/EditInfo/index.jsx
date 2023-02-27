import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import _api, { API_URL } from "../../../../http";
import { useFormik } from "formik"
import { useNavigate } from 'react-router-dom';
import { userDataReduce } from "../../../../redux/Slices/wildSlice"
import { isLoadingReduce } from "../../../../redux/Slices/adminSlice"
import "./EditInfo.scss"
import { Images } from "../../../../Config/index"
import { Helmet } from "react-helmet";
import { toast } from "react-hot-toast"

function EditInfo() {
  const wildberries = useSelector(state => state.wildberries)
  const admin = useSelector(state => state.admin)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function getUser() {
    dispatch(isLoadingReduce(true))
    await _api.get(`${API_URL}/getUserById/${admin?.userState?.id}`)
      .then(res => {
        dispatch(userDataReduce(res?.data))
      })
      .catch((e) => {
        if (e) {
        }
      })
    dispatch(isLoadingReduce(false))
  }

  useEffect(() => {
    getUser()
  }, [admin?.userState])

  const formikUserInfo = useFormik({
    initialValues: {
      phonenumber: "",
      postIndex: "",
      country: "",
      bankCard: "",
      email: "",
      fullname: "",
      username: "",
    },
    validateOnBlur: "",
    onSubmit: (values) => {
      let entries = Object.entries(values)
      let nonEmptyOrNull = entries.filter(([key, val]) => val !== '' && val !== null)
      let output = Object.fromEntries(nonEmptyOrNull)
      if (Object.keys(output).length === 0) {
        toast.error(`Нет изменений.`, {
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

      _api.put(`${API_URL}/editUser/${admin?.userState?.id}`, { ...output }).then(r => {
        if (r?.data)
          toast.success(`Данные успешно изменены.`, {
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
      }).catch(e => {
        if (e)
          toast.error(`Ошибка.`, {
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
  })

  return (
    <div className="editInfo">
      {
        admin.isLoadingState ? <div className='loader' style={{ top: "60%" }}><img src={Images.Loader} alt="" /></div> :

          <form className="form" onSubmit={formikUserInfo.handleSubmit}>
            <span className="form__field" >
              {formikUserInfo.errors.fullname && formikUserInfo.touched.fullname ? (<div className="errorMessage">{formikUserInfo.errors.fullname}</div>) : null}
              <label htmlFor="name">Name:</label>
              <input defaultValue={wildberries.userData?.fullname} id="name" name="fullname" type="text" onChange={formikUserInfo.handleChange} onBlur={formikUserInfo.handleBlur} />
              <i>🖊</i>
            </span>
            <span className="form__field" >
              {formikUserInfo.errors.username && formikUserInfo.touched.username ? (<div className="errorMessage">{formikUserInfo.errors.username}</div>) : null}
              <label htmlFor="userName">Username:</label>
              <input defaultValue={wildberries.userData?.username} id="userName" name="username" type="text" onChange={formikUserInfo.handleChange} onBlur={formikUserInfo.handleBlur} />
              <i>🖊</i>
            </span>
            <span className="form__field" >
              {formikUserInfo.errors.phonenumber && formikUserInfo.touched.phonenumber ? (<div className="errorMessage">{formikUserInfo.errors.phonenumber}</div>) : null}
              <label htmlFor="phonenumber">Phone number:</label>
              <input defaultValue={wildberries.userData?.phonenumber} id="phonenumber" name="phonenumber" type="text" onChange={formikUserInfo.handleChange} onBlur={formikUserInfo.handleBlur} />
              <i>🖊</i>
            </span>
            <span className="form__field" >
              {formikUserInfo.errors.country && formikUserInfo.touched.country ? (<div className="errorMessage">{formikUserInfo.errors.country}</div>) : null}
              <label htmlFor="country">Country:</label>
              <input defaultValue={wildberries.userData?.country} id="country" name="country" type="text" onChange={formikUserInfo.handleChange} onBlur={formikUserInfo.handleBlur} />
              <i>🖊</i>
            </span>
            <span className="form__field" >
              {formikUserInfo.errors.email && formikUserInfo.touched.email ? (<div className="errorMessage">{formikUserInfo.errors.email}</div>) : null}
              <label htmlFor="email">Email:</label>
              <input defaultValue={wildberries.userData?.email} id="email" name="email" type="text" onChange={formikUserInfo.handleChange} onBlur={formikUserInfo.handleBlur} />
              <i>🖊</i>
            </span>
            <span className="form__field" >
              {formikUserInfo.errors.postIndex && formikUserInfo.touched.postIndex ? (<div className="errorMessage">{formikUserInfo.errors.postIndex}</div>) : null}
              <label htmlFor="postIndex">Post index:</label>
              <input defaultValue={wildberries.userData?.postIndex} id="postIndex" name="postIndex" type="text" onChange={formikUserInfo.handleChange} onBlur={formikUserInfo.handleBlur} />
              <i>🖊</i>
            </span>
            <span className="form__field" >
              {/* {formikUserInfo.errors.activated && formikUserInfo.touched.activated ? (<div className="errorMessage">{formikUserInfo.errors.activated}</div>) : null} */}
              <label htmlFor="activated">Account activation:</label>
              <input defaultValue={wildberries.userData?.activated} disabled id="activated" name="activated" type="text" onChange={formikUserInfo.handleChange} onBlur={formikUserInfo.handleBlur} />
              {/* <i>🖊</i> */}
            </span>
            <span className="form__field" >
              {formikUserInfo.errors.bankCard && formikUserInfo.touched.bankCard ? (<div className="errorMessage">{formikUserInfo.errors.bankCard}</div>) : null}
              <label htmlFor="bankCard">Bank card:</label>
              <input defaultValue={wildberries.userData?.bankCard} id="bankCard" name="bankCard" type="text" onChange={formikUserInfo.handleChange} onBlur={formikUserInfo.handleBlur} />
              <i>🖊</i>
            </span>

            <button className="btn" type="submit">
              <span className="btnName">Редактировать</span>
            </button>
          </form>
      }
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${admin?.userState?.username ? ' ' + admin?.userState?.username : ''} - Edit`}</title>
      </Helmet>
    </div>
  )
}

export default EditInfo