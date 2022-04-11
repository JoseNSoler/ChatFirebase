import React, { Component } from "react";
import { auth } from "../firebase-config";
import { db } from "../firebase-config"

import { Link } from "react-router-dom";


import { Container, Button, Form, Col } from "react-bootstrap";


export default class Chatter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: auth.currentUser,
            chats: [],
            content: '',
            readError: null,
            writeError: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async componentDidMount() {
        
        this.setState({ readError: null });
        try {
            db.ref("chats").on("valor", snapshot => {
                let chats = [];
                snapshot.forEach((snap) => {
                    chats.push(snap.val());
                });
                this.setState({ chats });
            });
        } catch (error) {
            this.setState({ readError: error.message });
        }
        console.log(db)
    }

    handleChange(event) {
        this.setState({
            content: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ writeError: null });
        try {

            await db.ref("chats").push({
                content: this.state.content,
                timestamp: Date.now(),
                uid: this.state.user.uid,
                image: this.state.user.photoURL,
                email: this.state.user.email
            });
            this.setState({ content: '' });
        } catch (error) {
            this.setState({ writeError: error.message });
        }
    }

    formatDate(timestamp) {

        const newDate = new Date(timestamp)
        const date = newDate.getDate();
        const month = newDate.getMonth() + 1;
        const year = newDate.getFullYear();
        const hour = newDate.getHours();
        const minute = newDate.getMinutes();

        return date + "/" + month + "/" + year + " " + hour + ":" + minute;
    }

    render() {

        return (
            <div>
                

                <div id="container-ppal">
                    <Container>
                        <div>
                            <h1><Link to=""> ChatLine</Link></h1>
                            <div>En línea: {" "}<strong className="text-info">{this.state.user.email}</strong>
                            </div>
                            <hr></hr>
                            <div id="container">
                                <div className="jb">

                                    <div>
                                        {this.state.chats.map((chat) => {
                                            return (this.state.user.uid === chat.uid
                                                ?
                                                <div className="bubble-l mt-2">
                                                    <div key={chat.timestamp} className="d-flex align-items-center text-center justify-content-start">
                                                        <div></div>
                                                        <div className="pr-2">                    
                                                            <p className="mb-1">{chat.content}</p>
                                                            <p className="p-email ml-3 mb-1">~{this.state.user.email || "~Anonymous"}</p>
                                                            <p className="p-format">{this.formatDate(chat.timestamp)}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                :

                                                <div className="bubble-r mt-2">
                                                    <div key={chat.timestamp} className="d-flex align-items-center text-center justify-content-end ">
                                                        <div className="pr-2">            
                                                            <p className="mb-1">{chat.content}</p>
                                                            <p className="p-email mr-3 mb-1">~{chat.email || "~Anonymous"}</p>
                                                            <p className="p-format">{this.formatDate(chat.timestamp)}</p>
                                                        </div>
                                                        <div></div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>

                                </div>

                            </div>
                            <hr></hr>
                            <div id="text-msn">
                                <form onSubmit={this.handleSubmit}>
                                    <row>
                                        <Form.Group>
                                            <Col sm={7}>
                                                <Form.Control autoComplete="off" id="form-input" className="mr-2" type="text" onChange={this.handleChange} value={this.state.content} required></Form.Control>
                                            </Col>
                                        </Form.Group>
                                        {this.state.error ? <p>{this.state.writeError}</p> : null}
                                        <Form.Group>
                                            <Button variant="success" type="submit">Enviar</Button>
                                        </Form.Group>
                                    </row>

                                </form>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        );
    }
}
