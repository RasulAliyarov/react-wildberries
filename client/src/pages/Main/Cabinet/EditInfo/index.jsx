import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import _api, { API_URL } from "../../../../http";
import { useFormik } from "formik"
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { userDataReduce } from "../../../../redux/Slices/wildSlice"
import { isLoadingReduce } from "../../../../redux/Slices/adminSlice"
import "./EditInfo.scss"
import { Images } from "../../../../Config/index"
import { Helmet } from "react-helmet";

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
        if (e) console.log("UserState is Empty")
      })
    dispatch(isLoadingReduce(false))
  }

  useEffect(() => {
    getUser()
  }, [admin?.userState])

  const UserInfoValidation = Yup.object().shape({
    // phonenumber: Yup.string().required("Requred"),
    // postIndex: Yup.string().required("Requred"),
    // country: Yup.string().required("Requred"),
    // bankCard: Yup.string().required("Requred"),
    email: Yup.string().required("Requred"),
    // activated: Yup.string().required("Requred"),
    fullname: Yup.string().required("Requred"),
    username: Yup.string().required("Requred"),
  })
  const formikUserInfo = useFormik({
    initialValues: {
      phonenumber: "",
      postIndex: "",
      country: "",
      bankCard: "",
      email: "",
      // activated: "",
      fullname: "",
      username: "",
    },
    validateOnBlur: "",
    validationSchema: UserInfoValidation,
    onSubmit: (values) => {
      _api.put(`${API_URL}/editUser/${admin?.userState?.id}`, { ...values }).then(r => {
        if (r?.data)
          console.log("User is update")
      }).catch(e => {
        if (e)
          console.log(e, "Error")
      })
      console.log(values)
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
        <title>{admin?.userState?.username} - Edit</title>
      </Helmet>
    </div>
  )
}

export default EditInfo