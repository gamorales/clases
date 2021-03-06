show databases // Muestra todas las DB del sistema
show collections // Muestras las colecciones o tablas

use cursoMongo // Se crea la instancia, pero aún no la DB

// Insertar registro
var user = {
    nombre: "Guillermo Alfonso Morales",
    edad: 37,
    email: "info@info.com"
}
// Versión vieja, no usar más
db.users.insert(user) // Crea la colección users y si no existia la DB, la crea

// Insert One
var user2 = {
    nombre: "Daniel Alejandro Ruiz Morales",
    edad: 29,
    email: "info2@info.com"
}
db.users.insertOne(user2)

// Insert Many
var usersList = [
    {
        nombre: "Gloria Lyda Morales Rotavista",
        edad: 70,
        email: "info3@info.com"
    },
    {
        nombre: "Diana Carolina Arevalo Martínez",
        edad: 33,
        email: "info4@info.com"
    }
]
db.users.insertMany(usersList)

// Listar registros
db.users.find()
        [.skip(INT)]  // Desde qué registro quiero comenzar (OFFSET)
        [.limit(INT)] // Limita la cantidad de registros a retornar
        [.count()]    // Retorna la cantidad de registros de la búsqueda

db.users.find(
    {},
    {nombre: true, email: true}
).sort( // Organiza por campo nombre
    {
        nombre: 1 // Ascendente, -1 Descendente
    }
)
db.users.find(
    {edad: 37}, // WHERE
    {nombre: true, email: true} // SELECT
).pretty() // Pretty lista de forma más legible
db.users.find(
    {
        edad: {
            $eq: 37 // Igual a la consulta anterior
        }
    }, // WHERE
    {nombre: true, email: true} // SELECT
).pretty() // Pretty lista de forma más legible

db.users.find(
    {
        edad: {
            $ne: 37 // Los registros con edad diferente a 37
            // $gt(e) -> mayor (o igual) que
            // $eq -> igual
            // $lt(e) -> menor (o igual) que
        }
    }, // WHERE
    {nombre: true, email: true} // SELECT
).pretty() // Pretty lista de forma más legible

// Find One: sólo el primer documento
db.users.findOne(
    {
        edad: {
            $ne: 37 // Los registros con edad diferente a 37
        }
    },
    {nombre: true, email: true} // SELECT
)

// Consultas lógicas
db.users.find(
    {
        $and: [
            {edad: {$gt: 20}},
            {edad: {$lt: 40}}
        ]
    },
    {nombre: true, email: true}
).pretty()
db.users.find(
    {
        $or: [
            {edad: 29},
            {edad: {$eq: 37}}
        ]
    },
    {nombre: true, email: true}
).pretty()

// Like -> Expresión Regular
db.users.find(
    {
        nombre: /^Gui/ // Comienza con Gui
    },
    {nombre: true, email: true}
).pretty()

db.users.find(
    {
        nombre: /a$/ // Finaliza con a
    },
    {nombre: true, email: true}
).pretty()
db.users.find(
    {
        nombre: /le/ // Contenga le
    },
    {nombre: true, email: true}
).pretty()

// IN y NOT IN
db.users.find(
    {
        edad: {
            $in: [29,37]
        }
    },
    {nombre: true, email: true}
).pretty()
db.users.find(
    {
        edad: {
            $nin: [29,37]
        }
    },
    {nombre: true, email: true}
).pretty()

// Exists, validar que un campo exista (no valor)
var users_sexo = [
    {
        nombre: "Guido Van Rossum",
        edad: 64,
        email: "guido@python.com",
        sexo: 'M'
    },
    {
        nombre: "Ada Lovelace",
        edad: 92,
        email: "lovelace@ada.com",
        sexo: 'F'
    }
]
db.users.insertMany(users_sexo)
db.users.find(
    {
        sexo: {
            $exists: true
        }
    },
    {nombre: true, email: true, sexo:true}
).pretty()

// Actualizar documento con save
var usuario = db.users.findOne({nombre: 'Guillermo'})
usuario.sexo = 'M'
db.users.save(usuario)

// updateOne, updateMany, upsert y findAndModify
db.users.updateOne(
    { // WHERE
        nombre: 'Guillermo'
    },
    { // SET
        $set: {
            direccion: 'Calle 145C # 82-41'
        }
    }
)
// Actualizará todos los documentos que no tengan el campo dirección
db.users.updateMany(
    { // WHERE
        direccion: { // Campo a actualizar en todos los documentos
            $exists: false
        }
    },
    { // SET
        $set: {
            direccion: 'Por definir'
        }
    }
)
// Eliminar un campo del documento
db.users.updateOne(
    {
        edad: {$exists: true}
    },
    {
        $unset: {edad: true}
    }
)
// upsert, crea un documento sino existe
db.users.updateOne(
    { // WHERE
        nombre: 'Steven Wozniak'
    },
    { // SET
        $set: {
            direccion: 'Some place in USA'
        }
    },
    {
        upsert: true
    }
)
// Como ya existe, lo modifica
db.users.updateOne(
    { // WHERE
        nombre: 'Steven Wozniak'
    },
    { // SET
        $set: {
            edad: 56
        }
    },
    {
        upsert: true
    }
)
// Buscar y modificar
db.users.findAndModify(
    {
        query: {
            nombre: /^Diana/
        },
        update: {
            sexo: 'F'
        }
    }
)

// Renombrar campos
db.users.updateMany(
    {}, // Todos
    {
        $rename: {
            email: 'correo'
        }
    }
)

// Eliminar documentos
db.users.remove(
    { // WHERE
        nombre: 'Ada Lovelace'
    }
)
db.users.remove({}) // Elimina todo
// Eliminar colección y base de datos
db.<collection>.drop() // Elimina la colección
db.dropDatabase() // Elimina la base de datos