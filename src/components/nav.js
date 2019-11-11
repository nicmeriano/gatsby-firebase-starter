import React from "react"
import { Link } from "gatsby"
import { useFirebase } from "../hooks/useFirebase"

export default function Nav() {
  const { auth } = useFirebase()

  return (
    <nav>
      <ul>
        <Link to="/">Home</Link>
        <Link to="/private">Private Page</Link>
        {auth.user ? (
          <>
            <Link to="/app/">Dashboard</Link>
            <Link to="/app/profile">Profile</Link>
            <button to="/" onClick={() => auth.signout()}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Log In</Link>
          </>
        )}
      </ul>
    </nav>
  )
}
