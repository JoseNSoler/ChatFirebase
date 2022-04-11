import React, { Component } from "react";
import { Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
//import '../styles/Home.css';
import NavBar from "./components/NavBar";


export default class Main extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <div class="jumbotron" className="container center">
                    sadasdasd
                    <Container>
                        <hr className='my-2' />
                        <p>
                            <Link to="/Signup">Registrate</Link><br />
                            <Link to="/login">Iniciar Sesión</Link>
                        </p>
                    </Container>
                </div>
            </div >


        );
    }
}
