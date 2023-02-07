import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import "./Auth.scss"
import { useFormik } from "formik"
import * as Yup from 'yup';
import { Icons } from "../../Config/index"

function Auth() {

  const SignInValidation = Yup.object().shape({
    username: Yup.string().required("Введите логин"),
    password: Yup.string().required("Введите пароль")
  })
  const SignUpValidation = Yup.object().shape({
    fullname: Yup.string().max(20, "Cимволов не должно быть больше 20").required("Введите полное имя"),
    email: Yup.string().email("Не корректный формат").required("Введите емайл"),
    username: Yup.string().max(20, "Cимволов не должно быть больше 20").required("Введите логин"),
    phoneNumber: Yup.number().typeError("Используйте цифры").required("Введите номер телефона"),
    password: Yup.string().max(20, "Cимволов не должно быть больше 20").required("Введите пароль"),
    repeatPassword: Yup.string().max(20, "Cимволов не должно быть больше 20").required("Введите повторно пароль"),
  })

  const formikSignIn = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validateOnBlur: "",
    validationSchema: SignInValidation,
    onSubmit: (values) => {
      console.log(values);
  
      formikSignIn.resetForm()
    }
  })

  const formikSignUp = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      phoneNumber: "",
      username: "",
      password: "",
      repeatPassword: "",
    },
    validateOnBlur: "",
    validationSchema: SignUpValidation,
    onSubmit: (values) => {
      console.log(values);
      formikSignUp.resetForm()
    }
  })

  return (
    <div className="auth contentBg">
      <div className="auth__content ">
        <Tabs defaultIndex={0}>
          <TabList>
            <Tab><span>Войти</span> {Icons.Login}</Tab>
            <Tab><span>Зарегестрироаться</span>{Icons.Registrtion}</Tab>
          </TabList>

          {/* Sign in */}
          <TabPanel>
            <form className="form" onSubmit={formikSignIn.handleSubmit}>
              <img src="https://partner-cons.com/files/73810-business-idea-animation.gif" alt="" />
              <span className="form__field">
                {formikSignIn.errors.username && formikSignIn.touched.username ? (<div className="errorMessage">{formikSignIn.errors.username}</div>) : null}
                <input value={formikSignIn.values.username} name="username" type="text" placeholder="Username" onChange={formikSignIn.handleChange} onBlur={formikSignIn.handleBlur} />
                {Icons.Username}
              </span>

              <span className="form__field">
                {formikSignIn.errors.password && formikSignIn.touched.password ? (<div className="errorMessage">{formikSignIn.errors.password}</div>) : null}
                <input value={formikSignIn.values.password} name="password" type="text" placeholder="Password" onChange={formikSignIn.handleChange} onBlur={formikSignIn.handleBlur} />
                {Icons.Password}
              </span>

              <button className="btn" type="submit">
                <span className="btnName">Войти</span>
              </button>
            </form>
          </TabPanel>
          {/* Sing Up */}
          <TabPanel>
            <form className="form" onSubmit={formikSignUp.handleSubmit}>
              <span className="form__field">
                {formikSignUp.errors.fullname && formikSignUp.touched.fullname ? (<div className="errorMessage">{formikSignUp.errors.fullname}</div>) : null}
                <input value={formikSignUp.values.fullname} name="fullname" type="text" placeholder="Полное имя" onChange={formikSignUp.handleChange} onBlur={formikSignUp.handleBlur} />
                {Icons.Fullname}
              </span>
              <span className="form__field">
                {formikSignUp.errors.email && formikSignUp.touched.email ? (<div className="errorMessage">{formikSignUp.errors.email}</div>) : null}
                <input value={formikSignUp.values.email} name="email" type="email" placeholder="Емейл" onChange={formikSignUp.handleChange} onBlur={formikSignUp.handleBlur} />
                {Icons.Email}
              </span>
              <span className="form__field">
                {formikSignUp.errors.phoneNumber && formikSignUp.touched.phoneNumber ? (<div className="errorMessage">{formikSignUp.errors.phoneNumber}</div>) : null}
                <input value={formikSignUp.values.phoneNumber} name="phoneNumber" type="number" placeholder="Номер телефона" onChange={formikSignUp.handleChange} onBlur={formikSignUp.handleBlur} />
                {Icons.Phone}
              </span>
              <span className="form__field">
                {formikSignUp.errors.username && formikSignUp.touched.username ? (<div className="errorMessage">{formikSignUp.errors.username}</div>) : null}
                <input value={formikSignUp.values.username} name="username" type="text" placeholder="Логин" onChange={formikSignUp.handleChange} onBlur={formikSignUp.handleBlur} />
                {Icons.Username}
              </span>

              <span className="form__field">
                {formikSignUp.errors.password && formikSignUp.touched.password ? (<div className="errorMessage">{formikSignUp.errors.password}</div>) : null}
                <input value={formikSignUp.values.password} name="password" type="password" placeholder="Пароль" onChange={formikSignUp.handleChange} onBlur={formikSignUp.handleBlur} />
                {Icons.Password}
              </span>
              <span className="form__field">
                {formikSignUp.errors.repeatPassword && formikSignUp.touched.repeatPassword ? (<div className="errorMessage">{formikSignUp.errors.repeatPassword}</div>) : null}
                <input value={formikSignUp.values.repeatPassword} name="repeatPassword" type="password" placeholder="Потвторите пароль" onChange={formikSignUp.handleChange} onBlur={formikSignUp.handleBlur} />
                {Icons.Password}
              </span>

              <button className="btn" type="submit">
                <span className="btnName">Авторизоваться</span>
              </button>
            </form>
          </TabPanel>

        </Tabs>
      </div>
    </div>
  );
}

export default Auth;
