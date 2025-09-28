# PatientHub - Sistema de Gestión de Pacientes

Aplicación web desarrollada con Angular 16 para la gestión integral de pacientes en el sector salud. Permite realizar operaciones CRUD completas con una interfaz moderna y responsive.

## Características

- 📝 **CRUD Completo**: Crear, leer, actualizar y eliminar pacientes
- 🔍 **Filtrado**: Búsqueda por nombre y número de documento
- 📊 **Paginación**: Navegación eficiente de grandes conjuntos de datos
- 📤 **Exportación**: Exportar datos a Excel y CSV

## Instalación y Configuración

### Prerrequisitos
- Node.js (v16 o superior)
- npm o pnpm

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/PuelloJ/PatientHub.git
   cd PatientHub
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   pnpm install
   ```

3. **Ejecutar la aplicación**
   ```bash
   npm start
   # o
   ng serve
   ```

4. **Acceder a la aplicación**
   
   Navegar a `http://localhost:4200/`

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia el servidor de desarrollo |
| `npm run build` | Construye la aplicación para producción |
| `npm run watch` | Construye en modo desarrollo con watch |
| `npm test` | Ejecuta las pruebas unitarias |

## Estructura del Proyecto

```
src/
├── app/
│   ├── core/                 # Servicios principales e interceptores
│   │   ├── interceptors/     # Interceptores HTTP
│   │   └── services/         # Servicios de negocio
│   ├── features/             # Módulos de funcionalidades
│   │   └── patients/         # Módulo de pacientes
│   ├── models/               # Modelos de datos TypeScript
│   └── shared/               # Componentes y utilidades compartidas
└── assets/                   # Recursos estáticos
```

## 🔧 Configuración del Backend

La aplicación está configurada para conectarse a una API REST en `http://localhost:5000/api/Patient`. Asegúrate de que el backend esté ejecutándose en este puerto.

## 🤝 Contribución

1. Fork del proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

Desarrollado con ❤️ por [PuelloJ](https://github.com/PuelloJ) 
