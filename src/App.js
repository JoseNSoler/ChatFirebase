import React, { useRef, useState } from 'react';
import './App.css';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { Jumbotron, Button, Form, Col } from 'react-bootstrap';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';




const firebaseConfig = {
  apiKey: "AIzaSyA5PQ9zKM8vVYzO0rFsQRmrILdLehFktGA",

  authDomain: "testfront-ferresofka.firebaseapp.com",

  databaseURL: "https://testfront-ferresofka-default-rtdb.firebaseio.com",

  projectId: "testfront-ferresofka",

  storageBucket: "testfront-ferresofka.appspot.com",

  messagingSenderId: "134262825428",

  appId: "1:134262825428:web:178678e76a3a11fef83641"

}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const auth = firebase.auth();
const firestore = firebase.firestore();



function App() {


  const [user] = useAuthState(auth);

  console.log(user)

  return (
    <div className="App">
      <header>
        <h1>{user ? user.displayName : " no hay usuairo"}</h1>
        <><SignOut/></>
        
      </header>

      <section>
        {user ? <ChatRoom/>:<SignIn/>}
      </section>
    </div>
  );
}


function SignUp() {
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  

  const  handleSubmit = (event) => {
    event.preventDefault();

    createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("awsdasdsdsdsdsdsdsd")
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });

  }


  const handleChange = (event) => {
    switch (event.target.name) {
      case "email":
        setemail(event.target.value)
        break;
      case "password":
        setpass(event.target.value)
        break;
      default:
        break;
    }
  }

  return(
    <div>
    <Form onSubmit={handleSubmit} style={{ height: "359px" }}>
                            <div className="form-input">
                                <Form.Group>
                                    <h1>Registrate en ChatLine
                                    </h1>
                                    <p>Ingresa tus datos para crear tu cuenta.</p>
                                </Form.Group>

                                <Form.Group>
                                    <Col sm={7}>
                                        <Form.Control id="form-input" placeholder="Email" name="email" type="email" onChange={(e) => {handleChange(e)}} value={email} required />
                                    </Col>
                                </Form.Group>

                                <Form.Group>
                                    <Col sm={7}>
                                        <Form.Control id="form-input" placeholder="Password" name="password" onChange={(e) => {handleChange(e)}} value={pass} type="password" required/>
                                    </Col>

                                </Form.Group>
                            </div>
                                    <Button type="submit" className='buttonRegister'>Registrate</Button>
                            <br />
                        </Form>
            </div>
  )
}

function SignIn() {


  const signInWithGoogle = () => {
    console.log(auth)
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  const signInWithGithub = () => {
    console.log(auth)
    const provider = new firebase.auth.GithubAuthProvider();
    auth.signInWithPopup(provider);
  }



  return(<>
      <button onClick={signInWithGithub}>Sign in with Github</button>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      <>No tienes usuario?</>
      <SignUp/>
      
      </>

  )
}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
  <div>
    <div className={`message ${messageClass}`}>
      <img alt='imagenProfile' src={photoURL || 'https://user-images.githubusercontent.com/59320487/163134225-4cc380aa-5f12-4e00-8409-c64218e1a183.png'} />
      <p>{text}</p>
    </div>
  </div>
  )
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
  <div>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button type="submit" disabled={!formValue}>submit</button>

    </form>
  </div>
  )
}



export default App;

