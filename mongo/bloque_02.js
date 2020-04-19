db.users.updateOne(
    {
        nombre: 'Guillermo Alfonso Morales',
        edad: 37
    },
    {
        $set: {
            lenguajes: ['Python', 'PHP', 'Java', 'Kotlin', 'Visual Basic', 'C#', 'Javascript', 'HTML-XML'],
            databases: ['PostgreSQL', 'MySQL', 'SQL Server', 'Firebase', 'MongoDB']
        }
    }
)
db.users.updateOne(
    {
        nombre: 'Guillermo Alfonso Morales',
        edad: {
            $exists: false
        }
    },
    {
        $set: {
            lenguajes: ['Python', 'PHP', 'Java'],
            databases: ['PostgreSQL', 'MySQL']
        }
    }
)

// Obtener usuario con lenguajes pasados en lista
db.users.find(
    {
        lenguajes: {
            $all: ['Kotlin', 'PHP'] // AND
        }
    }
)
// Busca todos los usuarios donde en sus listas haya Python
db.users.find(
    {
        lenguajes: 'Python'
    }
)

// Actualizar elementos en la lista
db.users.updateOne(
    {
        nombre: 'Guillermo Alfonso Morales',
        edad: 37
    },
    {
        $push: {
            lenguajes: 'Node-JS'
        }
    }
)
// Agregar varios elementos
db.users.updateOne(
    {
        nombre: 'Guillermo Alfonso Morales',
        edad: {
            $exists: false
        }
    },
    {
        $push: {
            lenguajes: {
                $each: ['Kotlin', 'Javascript']
            }
        }
    }
)
// Agregar elemento en cierto indice
db.users.updateOne(
    {
        nombre: 'Guillermo Alfonso Morales',
        edad: {
            $exists: false
        }
    },
    {
        $push: {
            lenguajes: {
                $each: ['Ruby', 'Rust'],
                $position: 2
            }
        }
    }
)
// Actualizar elemento según su indice
db.users.updateMany(
    {
        lenguajes: {$exists: true}
    },
    {
        $set: {
            'lenguajes.2': 'Rust'
        }
    }
)
// Actualizar elemento cuando no se conoce el indice
db.users.updateMany(
    {
        lenguajes: {$exists: true},
        lenguajes: 'C#'
    },
    {
        $set: {
            'lenguajes.$': '.Net'
        }
    }
)

// Ordenar elementos de la lista
db.users.updateOne(
    {
        nombre: 'Guillermo Alfonso Morales',
        edad: {
            $exists: false
        }
    },
    {
        $push: {
            lenguajes: {
                $each: ['Go'],
                $sort: 1 // Ascendente, -1 Descendente
            }
        }
    }
)

// Eliminar elementos de la lista
db.users.updateMany(
    {
        lenguajes: {$exists: true}
    },
    {
        $pull: {
            // lenguajes: 'Ruby' // Un sólo elemento
            lenguajes: {
                $in: ['Rust', 'Go']  // Varios elementos
            }
        }
    }
)

// Obtener elementos de la lista a partir de su posición o indice
db.users.findOne(
    {
        nombre : 'Guillermo Alfonso Morales',
        edad: { $exists: true }
    },
    {
        _id: false,
        nombre: true,
        lenguajes: {
            $slice: [1, 4] // [desde, hasta] 
            // $slice: 1 // INT (posición)
        }
    }
)

// Obtener registros donde haya x cantidad de lenguajes
db.users.find(
    {
        lenguajes: {
            $size: 7
        }
    }
)
