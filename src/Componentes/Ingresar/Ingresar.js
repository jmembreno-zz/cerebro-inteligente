//import react from 'react'

import React from "react";

class Ingresar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            signInEmail: '',
            signInPassword: ''


        }
    }

    onEmailChange = (event) => {

        this.setState({ signInEmail: event.target.value });

    }

    onPasswordChange = (event) => {

        this.setState({ signInPassword: event.target.value });

    }

    onSubmitSignIn = () => {      
     

        fetch('https://radiant-waters-32411.herokuapp.com/ingresar', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

                correo: this.state.signInEmail,
                contrasena: this.state.signInPassword
            })

        }).then(resp => resp.json())
            
            .then(data => {
                if (data.id) {
                   
                    this.props.cargarUsuario(data);
                    console.group('desde ingresar ver datos del usuario  ',data)
                    this.props.onRouteChange('home');
                    return;

                }
            })


    }

    render() {

        const { onRouteChange } = this.props;


        return (

            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">

                <main className="pa4 black-80">

                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Ingresar</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Correo</label>
                                <input className="pa2 input-reset ba bg-transparent 
                                    hover-bg-black hover-white w-100" type="email"
                                    name="email-address" id="email-address"
                                    onChange={this.onEmailChange} />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Contraseña</label>
                                <input className="b pa2 input-reset ba bg-transparent 
                                    hover-bg-black hover-white w-100" type="password"
                                    name="password" id="password"
                                    onChange={this.onPasswordChange} />
                            </div>

                        </fieldset>

                        <div className="">
                            <input
                                onClick={this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Sign in" />
                        </div>

                        <div className="lh-copy mt3">
                            <p onClick={() => this.props.onRouteChange('registrarse')} className="f6 link dim black db pointer">Registrarse</p>

                        </div>

                    </div>
                </main>

            </article>


        );



    }


}

export default Ingresar;