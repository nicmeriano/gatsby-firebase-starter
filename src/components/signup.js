import React, { useState } from "react"
import { navigate } from "gatsby"
import { useFirebase } from "../hooks/useFirebase"

export default function SignUp() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const {
    auth: { user, signup },
  } = useFirebase()

  const handleChange = (e, id) => {
    if (id === "username") {
      setUsername(e.target.value)
    } else if (id === "password") {
      setPassword(e.target.value)
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    signup(username, password).catch(e => setError(e.message))
  }

  if (user) {
    navigate(`/app/profile`)
  }

  return (
    <>
      <h1>Sign Up</h1>
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
        <input type="submit" value="Sign Up" />
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  )
}
