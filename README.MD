## Coding Challenge: AutoScout24 Listing Report

## Prerequesties

* [Node V12+](https://nodejs.org/en/download/releases/)

## Installation

1. Install dependencies
```bash
    npm install
```

2. [Change credentials in users config block](./src/config.js)
    * Default credentials are **admin:admin**
    
3. Run server using
```bash
    npm start
```
## Folder structure

* **[src](./src)**: Root folder with the source code
* **[controllers](./src/controllers)**: Routes handlers that are used by express
* **[data-sources](./src/data-sources)**: Data sources that are used by application, i.e. csv loader
* **[middlewares](./src/middlewares)**: Middlewares for the restricting non-manager to get the data
* **[model](./src/model)**: Input files that are used for processing
* **[services](./src/services)**: Main services that handle business logic
* **[services/reports](./src/services/reports)**: Reports generation business logic
* **[shared](./src/shared)**: Shared code by different modules
* **[views](./src/views)**: Views for the Pug template generator


