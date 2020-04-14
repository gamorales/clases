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
db.users.insertOne(user)

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

// Listar registros
db.users.find()

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

// Actualizar documento
var usuario = db.users.findOne({nombre: 'Guillermo'})
usuario.sexo = 'M'
db.users.save(usuario)