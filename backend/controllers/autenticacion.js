import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';
import { crearError } from '../extra/error.js';


// export const registroUsuario = async (req, res, next) => {
//     try {
//       const {
//         nombre,
//         apellido,
//         fechaNacimiento,
//         usuario,
//         email,
//         password,
//         pais,
//         img,
//         ciudad,
//         telefono,
//       } = req.body;
  
//       const usuarioExistente = await Usuario.findOne({ $or: [{ email }, { usuario }] });
//       if (usuarioExistente) {
//         return res.status(400).json({ mensaje: 'El usuario o correo electrónico ya está registrado.' });
//       }
  
    
  
//       const nuevoUsuario = new Usuario({
//         nombre,
//         apellido,
//         fechaNacimiento,
//         usuario,
//         email,
//         password,
//         pais,
//         img,
//         ciudad,
//         telefono,
//         roles,
//         activo: true,
//         intentosFallidos: 0,
//         resetPasswordToken: null,
//         resetPasswordExpires: null,
//       });
  
//       await nuevoUsuario.save();
  
//       res.status(201).json({ mensaje: 'Usuario registrado con éxito' });
//     } catch (error) {
//       console.error(`Error al registrar usuario: ${error.message}`);
//       next(error);
//     }
//   };

export const registroUsuario = async (req, res, next) => {
  try {
 

    //Verificación
    const usuarioExistente = await Usuario.findOne({ usuario: req.body.usuario });
    if (usuarioExistente) {
      res.status(400).json({ message: "El usuario ya existe" });
    }

    const usuarioExistente2 = await Usuario.findOne({ email: req.body.email });
    if (usuarioExistente2) {
      res.status(400).json({ message: "El email ya existe" });
    }

    const usuario = new Usuario({
      ...req.body,
    });

    await usuario.save();
    res.status(201).json({ message: 'Usuario creado correctamente' });
  } catch (err) {
    next(err);
  }
};
  

  export const loginAdmin = async (req, res, next) => {
    try {
      const user = await Usuario.findOne({ usuario: req.body.usuario, activo: true });
  
     if (!user) {
       throw crearError(404, "Usuario no encontrado");
      }
  
      if (!user.roles.includes('admin')) {
        throw crearError(401, "Acceso denegado");
      } else {
        // Comparar la contraseña directamente sin verificar el hash
        const contraseñaValida = req.body.password === user.password;
  
        if (!contraseñaValida) {
          await Usuario.findByIdAndUpdate(user._id, { $inc: { intentosFallidos: 1 } });
  
          if (user.intentosFallidos >= 2) {
            throw crearError(404, "El administrador ha alcanzado el límite de intentos fallidos. Por favor, inténtelo de nuevo en 5 segundos.");
          }
  
          return next(crearError(400, "Contraseña incorrecta"));
        }
  
        // Restablecer intentosFallidos a 0 si la contraseña es válida
        await Usuario.findByIdAndUpdate(user._id, { intentosFallidos: 0 });
  
        const token = jwt.sign({ id: user._id, roles: user.roles }, process.env.JWT, { expiresIn: '1h' });
        const { password, roles, ...otherDetails } = user._doc;
  
        res
          .cookie("admin_token", token, { httpOnly: true })
          .status(200)
          .json({ detalles: { ...otherDetails }, roles });
      }
    } catch (error) {

      console.error(error);
      res.status(error.status || 500).json({ error: error.message });
    }
  };

export const logoutAdmin = (req, res) => {
    res.clearCookie("admin_token");
    res.status(200).json({ mensaje: 'Cierre de sesión exitoso para administrador' });
  };
  


  
