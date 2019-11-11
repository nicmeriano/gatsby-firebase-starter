import React from "react"
import { navigate } from "gatsby"
import { useFirebase } from "../hooks/useFirebase.js"

export default function PrivateRoute({
  component: Component,
  location,
  ...rest
}) {
  const {
    auth: { user },
  } = useFirebase()

  if (user !== undefined && !user && location.pathname !== "/login") {
    navigate("/login")
    return null
  }

  return <Component {...rest} />
}
