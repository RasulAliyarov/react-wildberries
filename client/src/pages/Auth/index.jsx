import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
function Auth() {
  let [name, setName] = useState("")
  let [password, setPasssword] = useState("")
  let [token, setToken] = useState("")

  function logout() {
    setToken("")
    axios.get("http://localhost:8080/auth/logout/").then(() => {
      localStorage.removeItem("token");
    }).then(() => { })
  }

  useEffect(() => {
    setToken(localStorage.getItem("token"))
  }, [])
  return (
    < div className="App" >
      <button onClick={() => logout()}>Logout</button>
      <form action="" style={token ? { display: "none" } : { display: "block" }}>
        <input type="text" name="" placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input type="text" name="" placeholder="Password" onChange={(e) => setPasssword(e.target.value)} />
        <button type="submit" onClick={(e) => {
          e.preventDefault()
          axios.post("http://localhost:8080/auth/login/", {
            username: name,
            password: password
          }).then(res => {
            setToken(res.data.token)
            localStorage.setItem('token', JSON.stringify(res.data.token))
          })
        }}>Login</button>
      </form>
    </ div>
  );
}

export default Auth;
