```mermaid
sequenceDiagram
    participant user
    participant browser
    participant server

    user->>browser: Writes note and clicks Save
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of server: Server processes the new note and saves it to the database
    server-->>browser: JSON response with the new note
    deactivate server

    Note right of browser: Browser updates the notes list dynamically without reloading the page
    browser->>browser: Render the new note in the list