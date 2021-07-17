import React from 'react';

class Registrarse extends React.Component {

    
    constructor(props) {
        super(props);

        this.state = {

            correo: '',
            contrasena: '',
            nombre:''


        }
    }

    alCambiarNombre = (event) => {

        this.setState({ nombre: event.target.value });

    }

    alCambiarCorreo = (event) => {

        this.setState({ correo: event.target.value });

    }

    alCambiarContrasena = (event) => {

        this.setState({ contrasena: event.target.value });

    }

    alIngresar = ()=>{
       

        fetch('https://radiant-waters-32411.herokuapp.com/registrarse',{
            method : 'post',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({

                correo:this.state.correo,
                contrasena: this.state.contrasena,
                nombre : this.state.nombre

            })

        }).then(resp => resp.json())
        .then(usuario=>{

            
            if(usuario.id){

               

                this.props.cargarUsuario(usuario);
                this.props.onRouteChange('home');
                return;

            }else{
                console.log('Datos del usuario estan vacios',usuario);
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
                            <legend className="f1 fw6 ph0 mh0">Registrarse</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="nombre">Nombre</label>
                                <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" 
                                name="nombre" 
                                id="nombre"
                                onChange = {this.alCambiarNombre}
                                 />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="correo">Correo</label>
                                <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="correo" 
                                id="correo"
                                onChange ={this.alCambiarCorreo}
                                
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="contrasena">Contraseña</label>
                                <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="contrasena" 
                                id="contrasena"
                                onChange ={this.alCambiarContrasena}
                                />
                            </div>

                        </fieldset>

                        <div className="">
                            <input
                                onClick={this.alIngresar}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Sign in" />
                        </div>



                    </div>
                </main>

            </article>



        );

    }


}

export default Registrarse