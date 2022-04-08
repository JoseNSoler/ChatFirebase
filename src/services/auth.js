import { createUserWithEmailAndPassword, GithubAuthProvider,GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "@firebase/auth";
import { auth } from "../firebase-config";

export const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
}

export function signInWithGitHub() {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  }