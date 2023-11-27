import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import NavbarDrop from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const NoticiaEspecifica = () => {
  const { id } = useParams();
  const [noticiaData, setNoticiaData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/noticias/${id}`
        );

        setNoticiaData(response.data);
      } catch (error) {
        console.error("Error al cargar datos de la carrera:", error);
      }
    };

    fetchData();
  }, [id]);

  const convertirFecha = (fecha) => {
    if (!fecha) {
      return '';
    }
    const fechaFormateada = new Date(fecha).toISOString().split('T')[0];
    return fechaFormateada;
  };

  return (
    <div>
      <NavbarDrop />
      <div className="containerCarrera">
        <div className="header-contentC">
          <h1>{noticiaData.titulo}</h1>
          <img
            className="imageC"
            src={noticiaData.img}
            alt="Descripción de la imagen"
          />
        </div>

        <div className="contentC">
          <p>{noticiaData.descripcion}</p>
        </div>

        <div className="additional-texts">
          <div className="text-groupC">
            <p>
              <strong></strong> {noticiaData.contenido}
            </p>
            <p>
              <strong>Fecha de Publicación: </strong> {convertirFecha(noticiaData.fecha_publicacion)}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NoticiaEspecifica;
