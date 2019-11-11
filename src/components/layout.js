import React from "react"
import Header from "./header"
import "./layout.css"
import { useFirebase } from "../hooks/useFirebase"

export default function Layout({ children }) {
  const { auth } = useFirebase()

  // this prevents components from flashing between auth states when page is refreshed
  // wait for user to be defined before loading (user = null only if logged out)
  if (auth.user === undefined) {
    return null
  }

  return (
    <div>
      <Header />
      {children}
    </div>
  )
}
