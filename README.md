# API para gestión de tareas (To-Do List)

Este proyecto es una API construida con Node.js y MariaDB para gestionar tareas diarias. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre una tabla `todo` en una base de datos MariaDB.

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/valehernandezz-jap/taller-18.1.git
   cd .\taller-18.1\
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

4. Crea un archivo .env en la raíz del proyecto con las siguientes variables de entorno:
   ```env
   DB_HOST=localhost        # Dirección del servidor de la base de datos (por defecto 'localhost')
   DB_USER=user_db          # Nombre de usuario para la base de datos
   DB_PASSWORD=password_db  # Contraseña del usuario para la base de datos
   DB_DATABASE=name_db      # Nombre de la base de datos a utilizar
   DB_PORT=XXXX             # Puerto de la base de datos (por defecto '3306')
   DB_CONNECTION_LIMIT=X    # Número máximo de conexiones simultáneas a la base de datos
   ```

6. Inicia el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

## Explicación

Esta API está construida con Express.js y conecta a una base de datos MariaDB. Los endpoints disponibles permiten realizar las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre las tareas.

- `/todo` (**GET**): Obtiene todas las tareas.
- `/todo/:id` (**GET**): Obtiene una tarea por su ID.
- `/todo` (**POST**): Crea una nueva tarea.
- `/todo/:id` (**PATCH**): Actualiza una tarea existente.
- `/todo/:id` (**DELETE**): Elimina una tarea.
