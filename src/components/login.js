import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"
import { useFirebase } from "../hooks/useFirebase"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const { auth } = useFirebase()

  const { user, signin, signInWithGoogle, signInWithFacebook } = auth

  const handleChange = (e, id) => {
    if (id === "username") {
      setUsername(e.target.value)
    } else if (id === "password") {
      setPassword(e.target.value)
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    signin(username, password).catch(e => setError(e.message))
  }

  useEffect(() => {
    if (user) {
      navigate(`/app/`)
    }
  }, [user])

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input
            type="text"
            name="username"
            onChange={e => handleChange(e, "username")}
            autoComplete="off"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            onChange={e => handleChange(e, "password")}
            autoComplete="off"
          />
        </label>
        <input type="submit" value="Log In" />
      </form>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      <button onClick={signInWithFacebook}>Sign in with Facebook</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  )
}
