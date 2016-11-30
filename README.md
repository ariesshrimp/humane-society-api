# Oregon Humane Society API
A GraphQL API for data about animals sheltered at the Oregon Humane Society.

## Running
For now it's impossible to run this project locally (you would need the Firebase credentials to access any data). Generalizing read access to the database is next up on the roadmap.

Currently `babel-cli` is an implicit dependency. I didn't feel like including it in the dev deps, but as of Node 7.0 it's still needed for native JS modules (`import` and `export` stuff).
