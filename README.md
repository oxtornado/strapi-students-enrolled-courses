# 🎓 Gestión de Matrículas de Estudiantes

Este proyecto implementa una API con **Strapi** y **SQLite** para gestionar la matrícula de **estudiantes** en **cursos** ofrecidos por una institución educativa.

## 📌 Objetivo
Facilitar la gestión y consulta de estudiantes matriculados en cursos, asegurando la correcta inscripción y cumplimiento de reglas de negocio.

## 🛠️ Tecnologías utilizadas
- **Strapi** (Backend CMS)
- **SQLite** (Base de datos ligera)
- **Node.js** y **JavaScript**

## 🏗️ Modelo de Datos
- **Estudiantes**: Nombre, apellido, fecha de nacimiento, correo electrónico, teléfono.
- **Cursos**: Nombre, descripción, fecha de inicio, fecha de finalización, créditos.
- **Matrículas**: Relaciona estudiantes y cursos con fecha de inscripción.
- **Relaciones**:
  - Un **estudiante** puede matricularse en varios **cursos** (N:M).
  - Un **curso** puede tener múltiples **estudiantes** inscritos (N:M).

## 📜 Reglas de negocio
1. Un estudiante **no puede matricularse dos veces** en el mismo curso dentro del mismo periodo.
2. Cada curso tiene un **límite de capacidad** para matriculación.

## 🔍 Consultas esperadas

### 1️⃣ Lista de estudiantes matriculados en un curso específico
```json
{
    "method": "GET",
    "path": "/matriculas/curso/:curso",
    "handler": "matricula.find",
    "config": {
        "policies": []
    }
}
```
📌 **Ruta:** `src/api/matricula/routes/matricula.ts`

También disponible para un periodo específico:
```json
{
    "method": "GET",
    "path": "/matriculas/curso/:curso/periodo/:periodo",
    "handler": "matricula.find",
    "config": {
        "policies": []
    }
}
```

### 2️⃣ Verificar la cantidad de estudiantes matriculados en un curso
```json
{
    "method": "GET",
    "path": "/matriculas/curso/:curso/periodo/:periodo/estudiante/:estudiante",
    "handler": "matricula.find",
    "config": {
        "policies": []
    }aa
}
```
📌 **Ruta:** `src/api/matricula/routes/matricula.ts`

### 3️⃣ Lista de cursos en los que está matriculado un estudiante
```json
{
    "method": "GET",
    "path": "/matriculas/curso/:curso/estudiante/:estudiante",
    "handler": "matricula.find",
    "config": {
        "policies": []
    }
}
```
📌 **Ruta:** `src/api/matricula/routes/matricula.ts`

## 🚀 Instalación y ejecución
1. Clonar el repositorio:
   ```sh
   git clone https://github.com/tu-repo/matriculas-estudiantes.git
   ```
2. Instalar dependencias:
   ```sh
   cd matriculas-estudiantes
   npm install
   ```
3. Iniciar el servidor Strapi:
   ```sh
   npm run develop
   ```
4. Acceder a la interfaz de administración de Strapi en:
   ```sh
   http://localhost:1337/admin
   ```

## 📩 Contacto
Si tienes preguntas o sugerencias, puedes escribirme a [mi correro electronico](mailto:dnielussa@gmail.com).

