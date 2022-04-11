import { Button, Form, FormControl, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <Navbar bg="light" expand="lg">
            <Link to="/" >ChatLine</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
                <row>
                    <Form className="mr-2" inline>
                        <Link to="/login" >Iniciar Sesión</Link>{" "}
                        <Link className="ml-2" to="/Signup" >Registrate</Link>
                    </Form>
                </row>

            </Navbar.Collapse>
        </Navbar>
    )

}