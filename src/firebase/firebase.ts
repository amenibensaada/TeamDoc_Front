import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfXyg0bHuyr4i3ifUvdqxhqf7Ec2cgR9w",
  authDomain: "teamdoc-25126.firebaseapp.com",
  projectId: "teamdoc-25126",
  storageBucket: "teamdoc-25126.appspot.com",
  messagingSenderId: "415794666197",
  appId: "1:415794666197:web:acfe81f148fc29659c205c",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
