// Obtener registros donde haya x cantidad de lenguajes o más
db.users.find(
    {
        lenguajes: { $exists: true }, // Porque no todos los documentos tienen el campo "lenguajes"
        $where: 'this.lenguajes.length > 9'
    }
)

// Documentos anidados
db.users.updateOne(
    {
        correo: 'info3@info.com'
    },
    {
        $set: {
            direccion: {
                pais: 'Colombia',
                dpto: 'Valle del Cauca',
                ciudad: 'Cali',
                direccion: 'más allá, bien lejos',
                estudios: ['Enfermería', 'Arte', 'Política', 'Modelaje']
            }
        }
    }
)
// Buscar quienes sean de Cali en el objeto dirección
db.users.find(
    {
        'direccion.ciudad': 'cali'
    }
)
// Buscar quienes tengan el campo estudios en el objeto dirección
db.users.find(
    {
        'direccion.estudios': {$exists: true}
    }
)
// Sólo se entrega el primer estudio de la lista
db.users.find(
    {
        'direccion.estudios': {$exists: true}
    },
    {
        _id: false,
        nombre: true,
        'direccion.estudios': {
            $slice: 1
        }
    }
)
// Actualizar el objeto dirección de un documento
db.users.updateOne(
    {
        correo: 'info2@info.com'
    },
    {
        $set: {
            'direccion.estudios': ['Historia', 'Fotografía', 'Investigación']
        }
    }
)