sequenceDiagram
    participant browser
    participant server

    browser->>server: POST /notes { "content": "Nueva nota" }
    activate server
    server-->browser: 200 OK
    server->>database: Guardar nota "Nueva nota"
    deactivate server

    note right of browser: El navegador actualiza la lista de notas
