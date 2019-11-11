import React from "react"
import { useFirebase } from "../hooks/useFirebase"

export default function Profile() {
  const {
    auth: { user },
  } = useFirebase()

  return (
    <div>
      <h1>Your profile</h1>
      <ul>
        <li>Name: {user.displayName ? user.displayName : "No name defined"}</li>
        <li>E-mail: {user.email}</li>
      </ul>
    </div>
  )
}
