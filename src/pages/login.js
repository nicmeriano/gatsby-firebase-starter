import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Login from "../components/login"

export default function LoginPage() {
  return (
    <Layout>
      <Login />
      <p>
        Don't have an account? Sign Up <Link to="/signup">Here</Link>
      </p>
    </Layout>
  )
}
