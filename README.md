# Proyecto Backend III

Proyecto realizado en el marco del curso **Programación Backend III: Testing y Escalabilidad (Coderhouse)**.

### Descripción breve
Partiendo de una base de gestión de **usuarios, mascotas y adopciones**:
- Se agregaron **mocks de datos** con **Faker** (usuarios y mascotas) para pruebas y demostraciones rápidas.
- Se incorporó **logging** con **Winston** (niveles e impresión en consola) para trazabilidad.
- Se centralizó el **manejo de errores** con un middleware `errorHandler` (respuestas consistentes).
- Se habilitó **compresión HTTP** con `express-compression` para optimizar el tamaño de las respuestas.
- Se documentó el módulo **Users** con **Swagger** (endpoint `/docs`).
- Se desarrollaron **tests funcionales** del router de **adopciones** con **Mocha + Chai + Supertest** (éxito y errores).
- Se **dockerizó** el proyecto para ejecuciones reproducibles y despliegue simple.
- La persistencia usa **MongoDB** (Atlas o instancia local).
- Se respetó la estructura por capas (**DAO → Repositorio → Servicios → Controladores → Rutas**), evitando modificar la lógica original salvo **validaciones** y **try/catch** necesarios para robustez.

---

## Rutas de Mocks (base: `/api/mocks`)
- `GET /mockingusers` → Genera y devuelve **50 usuarios** mock.
- `GET /mockingpets` → Genera y devuelve **100 mascotas** mock.
- `POST /generateData` → Inserta en **MongoDB** la cantidad de **usuarios** y **mascotas** indicada en el body (`{ "users": N, "pets": M }`).

---

## Documentación (Swagger)
- **URL local:** `http://localhost:8080/docs`  
- Contiene las operaciones del módulo **Users**:
  - `GET /api/users`
  - `GET /api/users/{uid}`
  - `PUT /api/users/{uid}`
  - `DELETE /api/users/{uid}`

---

## Cómo ejecutar localmente
1. Instalar dependencias: `npm install`  
2. Levantar la app: `npm start`  
3. API base: `http://localhost:8080`  
   - Users: `/api/users`
   - Pets: `/api/pets`
   - Adoptions: `/api/adoptions`
   - Mocks: `/api/mocks/*`
   - Swagger: `/docs`

> Nota: El proyecto utiliza **MongoDB Atlas**; asegurarse de tener la IP habilitada en el cluster.

---

## Tests (adoption.router.js)
- Ejecutar: `npm test`  
- Cubre:
  - `POST /api/adoptions/:uid/:pid` (éxito, mascota ya adoptada, usuario inexistente, mascota inexistente)
  - `GET /api/adoptions` (listado)
  - `GET /api/adoptions/:aid` (éxito e inexistente)

---

## Docker

### Usar la imagen publicada
- **Docker Hub:** https://hub.docker.com/r/santicivalero/adoptme  
- **Pull:** `docker pull santicivalero/adoptme:latest`  
- **Run:** `docker run --rm -p 8080:8080 santicivalero/adoptme:latest`  
- **Probar:**
  - **API:** `http://localhost:8080/api/users`  
  - **Swagger:** `http://localhost:8080/docs`

### Construir y ejecutar tu propia imagen (local)
- **Build** (en la carpeta con el Dockerfile): `docker build -t adoptme:latest .`  
- **Run** (puerto 8080): `docker run --rm -p 8080:8080 adoptme:latest`

### Publicar en tu Docker Hub (usá tu propio usuario)
1. **Tag:** `docker tag adoptme:latest <TU_USUARIO_DH>/<NOMBRE_IMAGEN>:<TAG>`  
2. **Push:** `docker push <TU_USUARIO_DH>/<NOMBRE_IMAGEN>:<TAG>`

---

## Tecnologías principales
- **Node.js / Express**
- **MongoDB / Mongoose**
- **@faker-js/faker**
- **winston**
- **express-compression**
- **mocha / chai / supertest**
- **Docker**

---

## Autor
**Santiago Civalero**

