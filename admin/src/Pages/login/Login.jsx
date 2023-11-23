import "./login.css";
import axios from "axios";
import React, { useContext } from "react";
import { AuthContexto } from "../../Context/AuthContexto";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { motion } from 'framer-motion';



const Login = () => {

  const [credenciales, setCredenciales] = useState({
    usuario: undefined,
    password: undefined,
  });
  const [intentosFallidos, setIntentosFallidos] = useState(false);
  const [setBloquearIngreso] = useState(false);
  const { loading, dispatch } = useContext(AuthContexto);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredenciales((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };



const handleLogin = async (e) => {
  e.preventDefault();
  dispatch({ type: "LOGIN_INICIADO" });
  try {
    const res = await axios.post("/autenticacion/login", credenciales);
    if (res.data.roles && res.data.roles.includes("admin")) {
      dispatch({ type: "LOGIN_EXITOSO", payload: res.data.detalles });
      toast.success("Inicio de sesión exitoso, Bienvenido", {
        duration: 5000,
        position: "top-center",
        style: {
          background: "#27D23C",
          color: "white",
          fontWeight: "bold",
          borderRadius: "10px",
          boxShadow: "0 20px 12px rgba(0, 0, 0, 0.4)",
          width: "300px",
          height: "80px",
        },
      });
      setTimeout(() => {
        navigate("/usuarios");
      }, 1200);
    } else {
      dispatch({ type: "LOGIN_FALLIDO", message: "No eres administrador" });
      toast.error("No eres administrador", {
        duration: 5000,
        position: "top-center",
        style: {
          background: "red",
          color: "white",
          fontWeight: "bold",
          borderRadius: "10px",
          boxShadow: "0 20px 12px rgba(0, 0, 0, 0.4)",
          width: "300px",
          height: "80px",
        },
      });
    }
  } catch (err) {
    dispatch({ type: "LOGIN_FALLIDO", payload: err.response.data });
    if (err.response.status === 404) {
      setIntentosFallidos(true);
      setBloquearIngreso(true);
        setTimeout(() => {
          setIntentosFallidos(false);
          setBloquearIngreso(false);
        }, 5000); 
      toast.error(err.response.data.message, {
        duration: 5000, 
        position: "top-center",
        style: {
          background: "red", 
          color: "white", 
          fontWeight: "bold", 
          borderRadius: "10px", 
          boxShadow: "0 20px 12px rgba(0, 0, 0, 0.4)",
          width: "300px", 
          height: "120px",
        },
      });
    } else if (err.response.status === 401) {
      toast.error("Error, acceso no autorizado", {
        duration: 5000, 
        position: "top-center", 
        style: {
          background: "red", 
          color: "white", 
          fontWeight: "bold", 
          borderRadius: "10px",
          boxShadow: "0 20px 12px rgba(0, 0, 0, 0.4)", 
          width: "300px", 
          height: "80px", 
        },
      });
    } else if (err.response.status === 400) {
      toast.error("Contraseña incorrecta", {
        duration: 5000, 
        position: "top-center", 
        style: {
          background: "red", 
          color: "white", 
          fontWeight: "bold",
          borderRadius: "10px",
          boxShadow: "0 20px 12px rgba(0, 0, 0, 0.4)", 
          width: "300px", 
          height: "80px", 
        },
      });
    } else {
      toast.error("Error de inicio de sesión", {
        duration: 5000, 
        position: "top-center",
        style: {
          background: "red",
          color: "white", 
          fontWeight: "bold", 
          borderRadius: "10px",
          boxShadow: "0 20px 12px rgba(0, 0, 0, 0.4)", 
          width: "300px", 
          height: "80px", 
        },
      });
    }
  }
};




  //console.log(usuario)

  return (
    <div className="login">
    <motion.div
      className="login__container"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="titulo"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Universidad Católica Boliviana
      </motion.h1>
      <motion.div
        className="login__logo animate-text"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <img
          src="https://res.cloudinary.com/dwwj8mhse/image/upload/v1697428216/cropped-logo-UCB_fawwhm.png"
          alt="Logo de UCB"
          className="login_log"
        />
      </motion.div>
      <motion.div
        className="form-group"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <input
          type="text"
          className="login__input"
          placeholder="Usuario"
          id="usuario"
          onChange={handleChange}
        />
      </motion.div>
      <motion.div
        className="form-group2"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <input
          type="password"
          className={intentosFallidos ? 'error' : ''}
          placeholder="Contraseña"
          id="password"
          disabled={intentosFallidos}
          onChange={handleChange}
        />
      </motion.div>
      <motion.button
        disabled={loading}
        className="login__button"
        onClick={handleLogin}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        Iniciar sesión
      </motion.button>
      {/* {error && (
        <motion.span
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0, duration: 0.5 }}
        >
          {error.message}
        </motion.span>
      )} */}
      <Toaster />
    </motion.div>
  </div>
  );
};

export default Login;