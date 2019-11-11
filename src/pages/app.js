import React, { useEffect } from "react"
import { navigate } from "gatsby"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import PrivateRoute from "../components/privateRoute"
import Profile from "../components/profile"

const Default = ({ location }) => {
  useEffect(() => {
    if (location !== "/app/") {
      navigate("/app/")
    }
  }, [])
  return <h1>Default APP page</h1>
}

export default function App() {
  return (
    <Layout>
      <Router>
        <PrivateRoute default component={Default} />
        <PrivateRoute path="/app/profile" component={Profile} />
      </Router>
    </Layout>
  )
}
