import './App.css';
import Navegacion from './Componentes/Navegacion/Navegacion';
import Logo from './Componentes/Logo/Logo';
import ImageLinkForm from './Componentes/ImageLinkForm/ImageLinkForm'

import Registrarse from './Componentes/Registrarse/Registrarse'
import ReconociFacial from './Componentes/ReconociFacial/ReconociFacial'
import Ingresar from './Componentes/Ingresar/Ingresar'


import Rank from './Componentes/Rank/Rank'
import Particles from 'react-particles-js';

import React, { Component } from 'react';




const particulaOpciones = {
  particles: {
    number: {
      value: 90,
      density: {
        enable: true,
        value_area: 850
      }

    }

  }
}

const estadoInicial = {

  input: '',
  imageUrl: '',
  caja: {},
  ruta: 'ingresar',
  estasingresando: false,
  usuario: {
    id: '',
    nombre: '',
    correo: '',
    ingresos: 0,
    se_nos_unio_en: new Date()

  }
}

class App extends Component {

  constructor() {
    super();
    this.state = estadoInicial;

  }



  cargarUsuario = (data) => {

    this.setState({
      usuario: {
        id: data.id,
        nombre: data.nombre,
        correo: data.correo,
        ingresos: data.entradas,
        se_nos_unio_en: data.se_nos_unio_en



      }
    });


  }



  /*  Aqui solo estabamos probando si funcionaba y claro que funciono pero tuvimos que intalar
  en el servidor backend el cors
  componentDidMount(){
   
     fetch('http://localhost:3000')
     .then(resp=> resp.json())
     .then( data => console.log(data))
   
   }*/

  calc_localiza_facial = (dataface) => {

    const clarifai_cara = dataface.outputs[0].data.regions[0].region_info.bounding_box;
    const imagen = document.getElementById('input_imagen');

    const ancho_img = Number(imagen.width);
    const alto_img = Number(imagen.height);

    return {

      column_izquierda: clarifai_cara.left_col * ancho_img,
      primera_fila: clarifai_cara.top_row * alto_img,
      column_derecha: ancho_img - (clarifai_cara.right_col * ancho_img),
      ultima_fila: alto_img - (clarifai_cara.bottom_row * alto_img)


    }

  }

  mostrar_Caja_cara = (caja) => {

    this.setState({ caja: caja });
  }

  onInputChange = (event) => {

    this.setState({ input: event.target.value });

  }

  onButtonSubmit = () => {

    this.setState({ imageUrl: this.state.input })

    fetch('https://radiant-waters-32411.herokuapp.com/imagenurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })

    }).then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://radiant-waters-32411.herokuapp.com/imagen', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.usuario.id
            })

          })
            .then(response => response.json())
            .then(ingresos => {
              this.setState({
                usuario: {
                  ingresos: ingresos,
                  nombre: this.state.usuario.nombre,
                  id: this.state.usuario.id
                }
              })
            }).catch(console.log)
        }

        this.mostrar_Caja_cara(this.calc_localiza_facial(response))
      })
      .catch(err => console.log(err));

  }

  onRouteChange = (ruta) => {



    if (ruta === 'salir') {

      this.setState(estadoInicial)

    } else if (ruta === 'home') {

      this.setState({ estasingresando: true })

    }

    this.setState({ ruta: ruta });


  }

  render() {


    const { estasingresando, imageUrl, ruta, caja } = this.state;

    return (

      <div className="App">

        <Particles className="particles"
          params={particulaOpciones}
        />

        <Navegacion estasingresando={estasingresando} onRouteChange={this.onRouteChange} />
        {ruta === 'home'

          ? <div>
            <Logo />
            <Rank nombre={this.state.usuario.nombre} ingresos={this.state.usuario.ingresos} />
            <ImageLinkForm onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />

            <ReconociFacial caja={caja} imageUrl={imageUrl} />
          </div>

          : (

            ruta === 'ingresar'
              ? <Ingresar cargarUsuario={this.cargarUsuario} onRouteChange={this.onRouteChange} />
              : <Registrarse cargarUsuario={this.cargarUsuario} onRouteChange={this.onRouteChange} />

          )

        }
      </div>
    );
  }
}

export default App;
