# `Blog backend with NestJS`

Configuración: `./src/config`。

## Módulos

### Usuario

- `POST /user/register`：Crear usuario（`username`、`password`）
- `POST /auth/login`：Iniciar sesión（`username`、`password`）
- `POST /user/update`：Actualizar información del usuario
- `POST /user/password`：Cambiar contraseña（`oldPassword`、`newPassword`）

### Artículos

- `POST /article`：Crea un artículo
- `GET /article`：Obtener todos los artículos
- `GET /article/category/:categoryId`：Obtener todos los artículos de la categoría especificada
- `GET /article/tag/:tagId`：Obtener todos los artículos de la etiqueta especificada
- `GET /article/archives`：Obtener todos los artículos archivados
- `GET /article/:articleId`：Obtener un artículo por id
- `GET /article/recommend/:articleId`：Obtener el artículo recomendado para el artículo especificado
- `POST /article/:articleId/checkPassword`：Comprobar la contraseña del artículo especificado
- `POST /article/:articleId/views`：El número de vistas del artículo especificado +1
- `POST /article/:articleId/`：Actualiza el artículo especificado
- `DELETE /article/:articleId/`：Elimina el artículo especificado

### Categorías

- `POST /category`：Crear categorías de artículos
- `GET /category`：Obtener todas las categorías de artículos
- `GET /category/:id`：Obtener la categoría de artículo especificada
- `POST /category/:id`：Actualiza la categoría de artículo especificada
- `DELETE /category/:id`：Elimina la categoría de artículo especificada

### Etiquetas

- `POST /tag`: crear etiquetas de publicación
- `GET /tag`: obtener todas las etiquetas de publicación
- `GET /tag/:id`: Obtener la etiqueta del artículo especificado
- `POST /tag/:id`: actualiza la etiqueta de publicación especificada
- `DELETE /tag/:id`: elimina la etiqueta del artículo especificado

### Comentarios

- `POST /commengt`: crea un comentario
- `GET /commengt`: obtener todos los comentarios
- `GET /commengt/host/:hostId`: Obtener los comentarios del artículo (o página) especificado
- `POST /commengt/:id`: actualiza el comentario especificado
- `DELETE /commengt/:id`: elimina el comentario especificado

### Páginas

- `POST /page`: crear página
- `GET /page`: obtener todas las páginas
- `GET /page/:id`: obtener la página especificada
- `POST /page/:id`: actualiza la página especificada
- `POST /page/:id/views`: vistas de página especificadas +1
- `DELETE /page/:id`: elimina la página especificada

### Subir Archivos

- `POST /archivo/`: cargar un archivo
- `GET /file/:id`: Obtener el registro del archivo especificado
- `DELETE /file/:id`: elimina el registro del archivo especificado

### Buscar

- `POST /search/article`: busca un artículo
- `GET /search`: obtener todos los registros de búsqueda
- `DELETE /search/:id`: elimina el registro de búsqueda especificado

### Configuraciones

- `POST /setting`: configuración de actualización
- `POST /setting/get`: obtener la configuración

### Correos

- `POST /smtp`: enviar correo
- `GET /smtp`: Obtener registros de correo
- `DELETE /smtp/:id`: elimina el registro de correo especificado