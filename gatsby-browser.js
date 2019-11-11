import React from "react"
import { ProvideFirebase } from "./src/hooks/useFirebase"

export const wrapRootElement = ({ element }) => {
  return <ProvideFirebase>{element}</ProvideFirebase>
}
