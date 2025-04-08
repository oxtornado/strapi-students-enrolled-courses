🎓 Gestión de Matrículas de Estudiantes

Este proyecto implementa una API con Strapi y SQLite para gestionar la matrícula de estudiantes en cursos ofrecidos por una institución educativa.

📌 Objetivo

Facilitar la gestión y consulta de estudiantes matriculados en cursos, asegurando la correcta inscripción y cumplimiento de reglas de negocio.

🛠️ Tecnologías utilizadas

Strapi (Backend CMS)

SQLite (Base de datos ligera)

Node.js y JavaScript

🏗️ Modelo de Datos

Estudiantes: Nombre, apellido, fecha de nacimiento, correo electrónico, teléfono.

Cursos: Nombre, descripción, fecha de inicio, fecha de finalización, créditos.

Matrículas: Relaciona estudiantes y cursos con fecha de inscripción.

Relaciones:

Un estudiante puede matricularse en varios cursos (N:M).

Un curso puede tener múltiples estudiantes inscritos (N:M).

📜 Reglas de negocio

Un estudiante no puede matricularse dos veces en el mismo curso dentro del mismo periodo.

Cada curso tiene un límite de capacidad para matriculación.

🔍 Consultas esperadas

1️⃣ Lista de estudiantes matriculados en un curso específico

{
    "method": "GET",
    "path": "/matriculas/curso/:curso",
    "handler": "matricula.find",
    "config": {
        "policies": []
    }
}

📌 Ruta: src/api/matricula/routes/matricula.ts

También disponible para un periodo específico:

{
    "method": "GET",
    "path": "/matriculas/curso/:curso/periodo/:periodo",
    "handler": "matricula.find",
    "config": {
        "policies": []
    }
}

2️⃣ Verificar la cantidad de estudiantes matriculados en un curso

{
    "method": "GET",
    "path": "/matriculas/curso/:curso/periodo/:periodo/estudiante/:estudiante",
    "handler": "matricula.find",
    "config": {
        "policies": []
    }aa
}

📌 Ruta: src/api/matricula/routes/matricula.ts

3️⃣ Lista de cursos en los que está matriculado un estudiante

{
    "method": "GET",
    "path": "/matriculas/curso/:curso/estudiante/:estudiante",
    "handler": "matricula.find",
    "config": {
        "policies": []
    }
}

📌 Ruta: src/api/matricula/routes/matricula.ts

🚀 Instalación y ejecución

Clonar el repositorio:

git clone https://github.com/tu-repo/matriculas-estudiantes.git

Instalar dependencias:

cd matriculas-estudiantes
npm install

Iniciar el servidor Strapi:

npm run develop

Acceder a la interfaz de administración de Strapi en:

http://localhost:1337/admin

📩 Contacto

Si tienes preguntas o sugerencias, puedes escribirme a (mi correo electrónico)[mailto:dnielussa@gmail.com]. 😊

