const pizzas = [
  {
    id: 1,
    nombre: "pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },

  {
    id: 2,
    nombre: "pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },

  {
    id: 5,
    nombre: "pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];


// -------------- Acá empieza la Resolucion ------------ //
// Obtener elementos del DOM
const inputNumber = document.querySelector(".input-number"); //capturamos el input number
const addButton = document.querySelector(".add-btn"); //capturamos el boton de buscar en el que usaremos elevento click 
const pizzaContainer = document.querySelector(".contenedor-pizza-card"); //capturamos el div dentro del cual renderizaremos las cards de pizzas o el mensaje de error

// Función para renderizar una pizza en el contenedor
function renderPizza(pizza) {
  pizzaContainer.innerHTML = `
    <div class="pizza-card">
      <h3>${pizza.nombre}</h3>
      <img src="${pizza.imagen}" alt="${pizza.nombre}" class="img-pizza"/>
      <p>Precio: $${pizza.precio}</p>
    </div>
  `;
}

// Función para mostrar un mensaje de error en el contenedor
function showError(message) {
  pizzaContainer.innerHTML = `<p class="error-message">${message}</p>`;
}

// Función para manejar la búsqueda y renderizado
function buscarPizza(event) {
  event.preventDefault(); //evitamos que la pagina se actualice

  const inputValue = parseInt(inputNumber.value); //Guardamos el numero del input

  if (isNaN(inputValue)) { //si no se ingresa un numero
    showError("Por favor, ingresa un número válido.");
    return;//sale de la funcion
  }

  const pizzaEncontrada = pizzas.find(pizza => pizza.id === inputValue); // nos fijamos si hay una pizza con el id que pasamos y la guardamos en pizzaEncontrada. Si no se encuentra nada entonces devuelve undefined
  //undefined cuenta como falso si lo pasamos como condicion

  if (pizzaEncontrada) { //si encuentra una pizza
    renderPizza(pizzaEncontrada); //ejecuta la funcion renderPizza
    localStorage.setItem("ultimaPizzaBuscada", JSON.stringify(pizzaEncontrada)); // la guardamos en el Local Storage con la clave ultimaPizzaBuscada
  } else { //si no se encontro una pizza con el ID(o sea undefined) 
    showError("No se encontró ninguna pizza con ese ID."); //ejecuta la funcion showError
  }
}

// Agregar el evento de click al botón
addButton.addEventListener("click", buscarPizza); //al hacer click ejecuta la funcion buscarPizza

// Obtener y mostrar la última pizza buscada al cargar la página
const ultimaPizzaBuscada = JSON.parse(localStorage.getItem("ultimaPizzaBuscada"));  // se utiliza localStorage.getItem para obtener la cadena JSON almacenada bajo la clave "lastSearchedPizza" en el localStorage. Luego, se utiliza JSON.parse para convertir la cadena JSON nuevamente en un objeto. 
if (ultimaPizzaBuscada) { //Si hay una pizza almacenada, se llama a la función renderPizza para mostrar los detalles de la última pizza buscada.
  renderPizza(ultimaPizzaBuscada);
}


