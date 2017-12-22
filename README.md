# Minesweeper

## Decisiones tomadas

### Stack

- Backend: Node.js con Express
- Frontend: React.js. No usé Redux (y tal vez terminé arrepintiéndome un poco).

### Decisiones de diseño/arquitectura

- Se usó como boilerplate: **express-generator** para el backend y **create-react-app** de Facebook para el front.
- La carpeta client, dentro del root, contiene todo el front de React.
- En dev, se inician dos webservers al mismo tiempo, uno para el back y otro para el front. Los requests hechos a nuestra API desde el front se redirigen vía proxy al back.

## Otras liberías

- Axios para pegarle a mi API.
- LoDash para no reinventar la rueda.

## Iniciar el proyecto

1. Dentro del root, darle `npm install` y luego `npm start`.
1. En otra tab de la Terminal, ingresar a la carpeta client, instalar las dependencias con `npm install` e iniciar con `npm start`.
1. El backend corre en el puerto 3001 y el frontend corre en el puerto 3000. Ingresar con el buscador a `locahost:3000`.

## Objetivos:

* Diseñar e implementar un API RESTful para el juego.

_**ALCANZADO:**_ Se planteó una API simple con una sola ruta que se encarga de generar aleatoriamente el tablero y devolverlo en formato array de arrays.

* Implementar un cliente para la API diseñada en el punto anterior. Idealmente en un lenguaje diferente, de tu preferencia, al usado en la API.

_**ALCANZADO:**_ El cliente consume la API al iniciar o reiniciar una partida.

* Cuando una celda que tiene minas adyacentes es relevada, todos los cuadrados adyacentes deben ser revelados (y así sucesivamente).

_**NO ALCANZADO:**_ Se planteó una función que recorriera las celdas adyacentes a la recién clickeada en busca de ausencia de minas y se buscó implementarla recursivamente. No se logró por cuestiones de tiempo.

* La habilidad para poner banderas o signos de preguntas en las celdas

_**NO ALCANZADO:**_ Por cuestiones de tiempo.

* Detectar cuando el juego terminó

_**ALCANZADO PARCIALMENTE:**_ Se detecta cuando el usuario pierdo pero no cuando gana.

* Seguimiento del tiempo de la partida

_** NO ALCANZADO:**_ Por cuestiones de tiempo.

* La habilidad de seleccionar parámetros del juego, numero de filas, columnas y minas.

_**ALCANZADO:**_ El cliente envía un request a la API con estos parámetros.
