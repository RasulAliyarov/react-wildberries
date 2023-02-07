import React from 'react'
import "./AdminLogin.scss"
import { useFormik } from "formik"
import * as Yup from 'yup';
import { Icons, Images } from "../../../Config"
import {useNavigate} from "react-router-dom"

function AdminLogin() {

    const navigate = useNavigate()

    const SignInAdminValidation = Yup.object().shape({
        login: Yup.string().required("Введите логин"),
        password: Yup.string().required("Введите пароль")
    })

    const formikAdminSignIn = useFormik({
        initialValues: {
            login: "",
            password: ""
        },
        validateOnBlur: "",
        validationSchema: SignInAdminValidation,
        onSubmit: (values) => {
            console.log(values);
            navigate("/")
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
                        {formikAdminSignIn.errors.login && formikAdminSignIn.touched.login ? (<div className="errorMessage">{formikAdminSignIn.errors.login}</div>) : null}
                        <input value={formikAdminSignIn.values.login} name="login" type="text" placeholder="Login" onChange={formikAdminSignIn.handleChange} onBlur={formikAdminSignIn.handleBlur} />
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