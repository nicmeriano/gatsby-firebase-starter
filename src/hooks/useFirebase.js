import React, { useState, useEffect, useContext, createContext } from "react"
import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

let app

// don't initialize untill you're in the browser - required to work with Gatsby
if (typeof window !== "undefined") {
  app = firebase.initializeApp({
    apiKey: process.env.GATSBY_FIREBASE_API_KEY,
    authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
    projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
    storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_ID,
    appId: process.env.GATSBY_FIREBASE_APP_ID,
  })
}

const FirebaseContext = createContext({ auth: {}, firebase: {} })

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideFirebase({ children }) {
  const firebase = useProvideFirebase()
  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  )
}

// Hook for child components to get the auth/firestore object ...
// ... and re-render when it changes.
export const useFirebase = () => {
  return useContext(FirebaseContext)
}

// Provider hook that creates auth object and handles state
function useProvideFirebase() {
  const [user, setUser] = useState(undefined) // set as undefined to let components know whether it has been initialized (to prevent flashing page redirects)

  const sendEmailVerification = user => {
    if (user) {
      user.sendEmailVerification().catch(e => {
        throw new Error(e.message)
      })
    }
  }

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = (email, password) => {
    return app
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        setUser(response.user)
        return response.user
      })
  }

  const signInWithGoogle = () => {
    return app.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
    // TODO: Add error handling as described in docs https://firebase.google.com/docs/auth/web/google-signin
  }
  const signInWithFacebook = () => {
    return app.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
    // TODO: Add error handling as described in docs https://firebase.google.com/docs/auth/web/google-signin
  }

  const signup = (email, password) => {
    return app
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        setUser(user)
        sendEmailVerification(user)
        return user
      })
  }

  const signout = () => {
    return app
      .auth()
      .signOut()
      .then(() => {
        setUser(null)
      })
  }

  const sendPasswordResetEmail = email => {
    return app
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true
      })
  }

  const confirmPasswordReset = (code, password) => {
    return app
      .auth()
      .confirmPasswordReset(code, password)
      .then(() => {
        return true
      })
  }

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    console.log("use effect useFirebase start")
    const unsubscribe = app.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
    return () => unsubscribe()
  }, [])

  return {
    auth: {
      user,
      signin,
      signup,
      signout,
      sendPasswordResetEmail,
      confirmPasswordReset,
      signInWithGoogle,
      signInWithFacebook,
    },
    firestore: firebase.firestore(),
  }
}
