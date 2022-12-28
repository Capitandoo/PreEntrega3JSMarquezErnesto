//Variables
const productos = [
    {id: 1, nombre: "Supreme Plus", precio: 50, img: "./Imagenes/supremePlus.webp", cantidad: 1},
    {id: 2, nombre: "Revitalift", precio: 100, img: "./Imagenes/cremaRevitalift.webp", cantidad: 1},
    {id: 3, nombre: "Garnier", precio: 150, img: "./Imagenes/garnier.webp", cantidad: 1},
    {id: 4, nombre: "Agnes", precio: 200, img: "./Imagenes/agnes.jpg", cantidad: 1},
    {id: 5, nombre: "Antiarrugas", precio: 250, img: "./Imagenes/cremaAntiarrugas.webp", cantidad: 1},
    {id: 6, nombre: "Vichy", precio: 300, img: "./Imagenes/vichy.jpg", cantidad: 1},
];
let carrito = JSON.parse (localStorage.getItem ("carrito")) || [];
const shopContent = document.querySelector (".shop-content");
let boton = document.querySelectorAll ('.boton');
const verCarrito = document.querySelector ('.header__cartIcon');
const modal = document.querySelector ('.modal-container');
const cantidadCarrito = document.querySelector ('.header__cart--notificacion');

productos.forEach ((producto) => {
    let content = document.createElement ("div");
    content.className = "card";
    content.innerHTML = `
    <img src = "${producto.img}">
    <h3>${producto.nombre}</h3>
    <p class = "price">$ ${producto.precio}</p>
    `;
    shopContent.append (content);
    
    let comprar = document.createElement ("button");
    comprar.className = "comprar";
    comprar.innerText = "comprar";
    content.append (comprar);
    
    comprar.addEventListener ("click", () => {
        const repetido = carrito.some ((productoRepetido) => productoRepetido.id === producto.id);
        if (repetido){
            carrito.map ((prod) => {
                if (prod.id === producto.id){
                    prod.cantidad++;
                };
            });
        }else{
            carrito.push ({
                id: producto.id,
                img: producto.img,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: producto.cantidad,
            });
        };
        contadorCarrito ();
        guardarLocal ();
    });
});

const pintarCarrito = () => {
    modal.innerHTML = "";
    modal.style.display = "flex";
    const modalHeader = document.createElement ("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `<h1 class = "modal-header-title">Carrito</h1>`;
    modal.append (modalHeader);

    const modalBorrar = document.createElement ("h2");
    modalBorrar.className = "modal-borrar";
    modalBorrar.innerText = "X";
    modalHeader.append (modalBorrar);

    modalBorrar.addEventListener ("click", () => {
        modal.style.display = "none";
    });

    carrito.forEach ((producto) => {
        let contenidoCarrito = document.createElement ("div");
        contenidoCarrito.className = "modal-container";
        contenidoCarrito.innerHTML = `
            <img src = "${producto.img}">
            <h3>${producto.nombre} </h3>
            <p>$ ${Number (producto.precio)} </p>
            <p>Cantidad: ${producto.cantidad}</p>
            <span class = "borrar-producto">X</span>
        `;
        modal.append (contenidoCarrito);

        let eliminar = contenidoCarrito.querySelector (".borrar-producto");

        eliminar.addEventListener ("click", () => {
            eliminarProducto (producto.id);
        });
    });    

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
    const totalCompra = document.createElement ("div");
    totalCompra.className = "total-content";
    totalCompra.innerHTML = `Total a pagar: $ ${total}`;
    modal.append (totalCompra);
};

verCarrito.addEventListener (("click"), pintarCarrito);

const eliminarProducto = (id) => {
    const encontrarId = carrito.find ((elemento) => elemento.id === id);
    carrito = carrito.filter ((carritoId) => {
        return carritoId !== encontrarId;
    });
    contadorCarrito ();
    guardarLocal ();
    pintarCarrito ();
};

const contadorCarrito = () => {
    cantidadCarrito.style.display = "block";
    const numeroCarrito = carrito.length;
    localStorage.setItem ("numeroCarrito", JSON.stringify (numeroCarrito));
    cantidadCarrito.innerText = JSON.parse (localStorage.getItem ("numeroCarrito"));
};

const guardarLocal = () => {
    localStorage.setItem ("carrito", JSON.stringify (carrito));
};

contadorCarrito ();