
const crearCliente = async (req,res) =>{
    try {
        
        const { nombreUsuario, contrasenia, persona} = req.body;


    } catch (error) {
        
        res.status(500).json({estado:'error', mensaje:'Error al crear el cliente'});

    }
}

module.exports = {
    crearCliente
}