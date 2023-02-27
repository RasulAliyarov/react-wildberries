import React from 'react'
import "./AdminLogin.scss"
import { useFormik } from "formik"
import * as Yup from 'yup';
import { Icons, Images } from "../../../Config"
import { loginAdminReduce } from "../../../redux/Slices/adminSlice"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import _api from '../../../http';
import { toast } from "react-hot-toast"

function AdminLogin() {

    const navigate = useNavigate()
    const wildberries = useSelector(state => state.wildberries)
    const admin = useSelector(state => state.admin)
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
            _api.post("/loginAdmin", ({ ...values }))
                .then((value) => {
                    dispatch(loginAdminReduce(value?.data))
                    navigate("/admin/panel")
                    formikAdminSignIn.resetForm()
                })
                .catch(e => {
                    console.log(e)
                    if (e) {
                        toast.error(`Пользователь не обнаружен`, {
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
                    }
                })
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