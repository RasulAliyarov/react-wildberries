import React from 'react'
import "./AdminLogin.scss"
import { useFormik } from "formik"
import * as Yup from 'yup';
import { Icons, Images } from "../../../Config"
import {loginReduce} from "../../../redux/Slices/wildSlice"
import {useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';

function AdminLogin() {

    const navigate = useNavigate()
    const wildberries = useSelector(state => state.wildberries)
    const dispatch = useDispatch()

    const SignInAdminValidation = Yup.object().shape({
        username: Yup.string().required("Введите логин"),
        password: Yup.string().required("Введите пароль")
    })

    const formikAdminSignIn = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validateOnBlur: "",
        validationSchema: SignInAdminValidation,
        onSubmit: (values) => {
            dispatch(loginReduce({...values}))
            navigate("/admin/panel")
            formikAdminSignIn.resetForm()
        }
    })

    return (
        <div className='adminLogin'>
            <div className="adminLogin__wrapper">
                <h1>Hello, Admin</h1>
                <form className="adminLogin__wrapper__form" onSubmit={formikAdminSignIn.handleSubmit}>
                    <img src={Images.WbAdmin} alt="" />
                    <span className="adminLogin__wrapper__form__field">
                        {formikAdminSignIn.errors.username && formikAdminSignIn.touched.username ? (<div className="errorMessage">{formikAdminSignIn.errors.username}</div>) : null}
                        <input value={formikAdminSignIn.values.username} name="username" type="text" placeholder="Username" onChange={formikAdminSignIn.handleChange} onBlur={formikAdminSignIn.handleBlur} />
                        {Icons.Username}
                    </span>

                    <span className="adminLogin__wrapper__form__field">
                        {formikAdminSignIn.errors.password && formikAdminSignIn.touched.password ? (<div className="errorMessage">{formikAdminSignIn.errors.password}</div>) : null}
                        <input value={formikAdminSignIn.values.password} name="password" type="text" placeholder="Password" onChange={formikAdminSignIn.handleChange} onBlur={formikAdminSignIn.handleBlur} />
                        {Icons.Password}
                    </span>

                    <button className="adminBtn" type="submit">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin