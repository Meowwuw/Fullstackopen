graph TD
    A[Aplicación SPA] --> B[API del servidor]
    B --> C[Base de datos]
    B --> A
    C --> A
    A --> D[Mensaje de confirmación]
