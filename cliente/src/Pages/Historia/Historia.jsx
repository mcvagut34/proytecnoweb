import React from "react";
import "./historia.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const Historia = () => {
  return (
    <div>
      <Navbar />
      <div className="historia-wrapper">
        <img
          src="https://res.cloudinary.com/dwwj8mhse/image/upload/v1699757234/bfej4mgj3wi5dp2zqzvx.jpg"
          alt="Imagen Historia"
          className="imagen"
        />
        <div className="linea-vertical1"></div>
        <div className="linea-vertical2"></div>

        <div className="textContainer">
          <div className="texto-izqH">
            <p>La Historia de U.C.B.</p>
          </div>
          <div className="texto-der1H">
            <p>
              En febrero se crea el "Comité de obispos Pro Universidad Católica"
              que, con el apoyo de Monseñor Carmine Rocco, Nuncio Apostólico del
              Papa en Bolivia, designan como Secretario Ejecutivo del Comité a
              Monseñor Prata.
            </p>
          </div>
          <div className="texto-der2H">
            <p>
              El 14 de mayo, en la ciudad de La Paz, siete profesores y 31
              alumnos inauguraron las clases de lo que, en ese momento, fue el
              "Instituto Superior de Economía de la Empresa", el núcleo básico
              de la futura Universidad.El 16 de julio "Se crea y se elige
              canónicamente, contando con el beneplásito de la Santa Sede
              Apostólica, bajo la dependencia de la conferencia Episcopal de
              Bolivia la Universidad Católica Boliviana"El 1 de agosto un
              Decreto Ley con número 07745, promulgado por el gobierno de
              entonces "autoriza la instalación y funcionamiento de la
              Universidad Católica Boliviana".
            </p>
          </div>
        </div>
        {/* <a href="" className="enlace">
          Explora toda la historia de la U.C.B.
        </a> */}
      </div>
      <Footer />
    </div>
  );
};

export default Historia;
