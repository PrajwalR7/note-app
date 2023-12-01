# Noter
The application, named "Noter," functions similarly to platforms like Pastebin, enabling users to create, save, delete, and modify notes. These notes can be designated as either private or public.

## Architecture
![noter-arch](https://github.com/PrajwalR7/note-app/assets/57180548/a7f2a4f7-9696-44eb-b0e1-8dc862a967ba)

The backend infrastructure comprises two distinct servers: one dedicated to authentication and another handling application-specific requests. 
This separation allows for efficient scaling of resources. 
Authentication and verification are facilitated through JWT (JSON Web Tokens), while MongoDB serves as the primary document store for data storage and retrieval.
