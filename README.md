# Proyecto Backend III

Proyecto realizado en el marco del curso **Programación Backend III: Testing y Escalabilidad** de Coderhouse.  
Se aplicaron mocks sobre una base existente de gestión de mascotas (usuarios, mascotas y adopciones).

---

## Descripción breve
Esta entrega incorpora:
- Generación de datos falsos (usuarios y mascotas) con **Faker**.  
- Registro de logs con **Winston**.  
- Manejo centralizado de errores.  
- Compresión de respuestas con **express-compression**.

---

## Rutas implementadas

**Base:** `/api/mocks`

- **GET /mockingusers** → Genera y devuelve 50 usuarios mock.  
- **GET /mockingpets** → Genera y devuelve 100 mascotas mock.  
- **POST /generateData** → Inserta en MongoDB la cantidad de usuarios y mascotas especificada en el body.  

---

 **Autor:** Santiago Civalero
