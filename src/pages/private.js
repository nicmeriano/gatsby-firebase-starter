import React from "react"
import Layout from "../components/layout"
import PrivateRoute from "../components/privateRoute"

const Private = () => (
  <Layout>
    <h1>Private Page</h1>
  </Layout>
)

export default function PrivatePage({ location }) {
  return <PrivateRoute location={location} component={Private} />
}
