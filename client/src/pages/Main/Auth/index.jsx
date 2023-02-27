import { useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import "./Auth.scss"
import { useFormik } from "formik"
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom"
import { Icons, Images } from "../../../Config/index"
import { loginReduce, registrationReduce, checkAuth } from "../../../redux/Slices/adminSlice"
import { useDispatch, useSelector } from 'react-redux';
import _api from "../../../http";
import { toast } from "react-hot-toast"

function Auth() {
  const navigate = useNavigate()
  const admin = useSelector(state => state.admin)
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth())
      navigate("/")
    }
  }, [])


  const SignInValidation = Yup.object().shape({
    username: Yup.string().required("Введите логин"),
    password: Yup.string().required("Введите пароль")
  })
  const SignUpValidation = Yup.object().shape({
    fullname: Yup.string().max(20, "Cимволов не должно быть больше 20").required("Введите полное имя"),
    email: Yup.string().email("Не корректный формат").required("Введите емайл"),
    username: Yup.string().max(20, "Cимволов не должно быть больше 20").required("Введите логин"),
    password: Yup.string().max(20, "Cимволов не должно быть больше 20").required("Введите пароль"),
    repeatpassword: Yup.string().max(20, "Cимволов не должно быть больше 20").required("Введите повторно пароль"),
  })


  const formikSignIn = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validateOnBlur: "",
    validationSchema: SignInValidation,
    onSubmit: (values) => {
      _api.post("/login", ({ ...values }))
        .then((value) => {
          dispatch(loginReduce(value.data))
          formikSignIn.resetForm()
          navigate("/")
        })
        .catch(e => {
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

  const formikSignUp = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      // phonenumber: "",
      username: "",
      password: "",
      repeatpassword: "",
    },
    validateOnBlur: "",
    validationSchema: SignUpValidation,
    onSubmit: (values) => {
      _api.post("/registration", ({ ...values }))
        .then((value) => {
          dispatch(registrationReduce(value?.data))
          navigate("/")
          formikSignUp.resetForm()
        })
        .catch((e) => {
          if (e) {
            toast.error(`Ошибка авторизации`, {
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
              <img src={Images.Login} alt="" />
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
              {/* <span className="form__field">
                {formikSignUp.errors.phonenumber && formikSignUp.touched.phonenumber ? (<div className="errorMessage">{formikSignUp.errors.phonenumber}</div>) : null}
                <input value={formikSignUp.values.phonenumber} name="phonenumber" type="tel" placeholder="Номер телефона" onChange={formikSignUp.handleChange} onBlur={formikSignUp.handleBlur} />
                {Icons.Phone}
              </span> */}
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
                {formikSignUp.errors.repeatpassword && formikSignUp.touched.repeatpassword ? (<div className="errorMessage">{formikSignUp.errors.repeatpassword}</div>) : null}
                <input value={formikSignUp.values.repeatpassword} name="repeatpassword" type="password" placeholder="Потвторите пароль" onChange={formikSignUp.handleChange} onBlur={formikSignUp.handleBlur} />
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
