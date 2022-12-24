//Variables
const productos = [
    {nombre: "harina", precio: 50},
    {nombre: "galletitas", precio: 100},
    {nombre: "cerveza", precio: 150},
    {nombre: "leche", precio: 200},
    {nombre: "gaseosa", precio: 250},
];
let carrito = [];
let seleccion = prompt ("hola desea comprar algun producto? si o no");

while (seleccion != "si" && seleccion != "no"){
    alert("por favor ingresa si o no");
    seleccion = prompt ("hola desea comprar algo? si o no");
}

if (seleccion == "si"){
    alert("a continuacion nuestra lista de productos");
    let todosLosProductos = productos.map ((producto) => producto.nombre + " " + "$" + producto.precio);
    alert(todosLosProductos.join(" - "));
}else if (seleccion == "no"){
    alert("gracais por visitarnos, hasta pronto");
}

while (seleccion != "no"){
    let producto = prompt ("agrega un producto a tu carrito");
    let precio = 0;
    if (producto == "harina" || producto == "galletitas" || producto == "cerveza" || producto == "leche" || producto == "gaseosa"){
        switch (producto){
            case "harina":
                precio = 50;
                break;
                case "galletitas":
                    precio = 100;
                    break;
                    case "cerveza":
                        precio = 150;
                        break;
                        case "leche":
                            precio = 200;
                            break;
                            case "gaseosa":
                                precio = 250;
                                break;
                                default:
                                    break;
        }
        let unidades = parseInt (prompt ("cuantas unidades queres llevar?"));
        carrito.push ({producto, unidades, precio});
    }else {
        alert("no tenemos ese producto");
    }

    seleccion = prompt ("desea seguir comprando?");
    
    while (seleccion === "no"){
        alert("gracias por la compra! hasta pronto");
        carrito.forEach ((carritoFinal) => {
            alert(`producto: ${carritoFinal.producto}, unidades: ${carritoFinal.unidades}, total a pagar por producto: ${carritoFinal.unidades * carritoFinal.precio}`)
        })
        break;
    }
}

const total = carrito.reduce ((acum, el) => acum + el.precio * el.unidades, 0);
alert(`el total a pagar de su compra es: ${total}`);
