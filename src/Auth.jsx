import React, { useState } from 'react';
import 'firebase/auth'
import 'firebase/firestore'
import { useFirebaseApp, useUser } from 'reactfire';
import userEvent from '@testing-library/user-event';

import { auth } from './services/auth';


export default (props) => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    

    const firebase = useFirebaseApp();

    const user = useUser();

    const submit = async () => {
        console.log(email, password)
        await auth().createUserWithEmailAndPassword(email,password)
    }
    
    return(
        <div>
            {user.email}
            <div>
                <label htmlFor="email">Correo Electronico</label>
                <input type='email' id='email' onChange={(e) => setEmail(e.target.value)}></input>

                <label htmlFor="password">Contraseña</label>
                <input type='password' id='password' onChange={(e) => setPassword(e.target.value)}></input>

                <button onClick={submit}>Iniciar sesion</button>
            </div>
        </div>
    )
}