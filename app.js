//Variables
const productos = [
    {nombre: "Supreme Plus", precio: 50, img: "./Imagenes/supremePlus.webp"},
    {nombre: "Revitalift", precio: 100, img: "./Imagenes/cremaRevitalift.webp"},
    {nombre: "Garnier", precio: 150, img: "./Imagenes/garnier.webp"},
    {nombre: "Agnes", precio: 200, img: "./Imagenes/agnes.jpg"},
    {nombre: "Antiarrugas", precio: 250, img: "./Imagenes/cremaAntiarrugas.webp"},
    {nombre: "Vichy", precio: 300, img: "./Imagenes/vichy.jpg"},
];
let carrito = [];
const shopContent = document.querySelector (".shop-content");
let boton = document.querySelectorAll ('.boton');
const verCarrito = document.querySelector ('.header__cartIcon');
const modal = document.querySelector ('.modal-container');

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
        carrito.push ({
            img: producto.img,
            nombre: producto.nombre,
            precio: producto.precio,
        });
    })
});

verCarrito.addEventListener (("click"), () => {
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
        `;
        modal.append (contenidoCarrito);
    });    

    const total = carrito.reduce((acc, el) => acc + el.precio, 0);
    const totalCompra = document.createElement ("div");
    totalCompra.className = "total-content";
    totalCompra.innerHTML = `Total a pagar: $ ${total}`;
    modal.append (totalCompra);
});

