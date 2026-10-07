
const IVA = 0.21;
const LIMITE_DESCUENTO_ALTO = 100000;
const LIMITE_DESCUENTO_BAJO = 50000;

const productos = [
    { id: 1, nombre: "Teclado mecánico", precio: 25000, stock: 5 },
    { id: 2, nombre: "Mouse gamer", precio: 15000, stock: 8 },
    { id: 3, nombre: "Monitor 24\"", precio: 120000, stock: 3 },
    { id: 4, nombre: "Auriculares", precio: 30000, stock: 4 },
];


let carrito = [];
let total = 0;



function armarCatalogo() {
    let texto = "CATÁLOGO DISPONIBLE\n\n";
    for (const producto of productos) {
        texto += `${producto.id}) ${producto.nombre} - $${producto.precio} (stock: ${producto.stock})\n`;
    }
    return texto;
}

function agregarProducto() {
    const idIngresado = prompt(armarCatalogo() + "\nIngresá el número del producto:");

  
    if (idIngresado === null) {
        return;
    }

    const id = Number(idIngresado);
    const producto = productos.find((p) => p.id === id);

    if (producto === undefined) {
        alert("El producto ingresado no existe.");
        console.warn(`ID inválido ingresado: ${idIngresado}`);
        return;
    }

    if (producto.stock === 0) {
        alert(`Lo sentimos, ${producto.nombre} está sin stock.`);
        return;
    }

    const cantidadIngresada = prompt(`¿Cuántas unidades de "${producto.nombre}" querés? (disponibles: ${producto.stock})`);

    if (cantidadIngresada === null) {
        return;
    }

    const cantidad = Number(cantidadIngresada);

   
    if (isNaN(cantidad) || cantidad <= 0 || !Number.isInteger(cantidad)) {
        alert("Cantidad inválida. Ingresá un número entero mayor a 0.");
    } else if (cantidad > producto.stock) {
        alert(`Stock insuficiente. Solo quedan ${producto.stock} unidades de ${producto.nombre}.`);
    } else {
        producto.stock -= cantidad;
        total += producto.precio * cantidad;

        const itemExistente = carrito.find((item) => item.id === producto.id);
        if (itemExistente) {
            itemExistente.cantidad += cantidad;
        } else {
            carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad });
        }

        alert(`Agregaste ${cantidad} x ${producto.nombre} al carrito.`);
        console.log(`Producto agregado: ${producto.nombre} x${cantidad}. Stock restante: ${producto.stock}`);
    }
}

function verCarrito() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    let resumen = "TU CARRITO\n\n";
    for (const item of carrito) {
        resumen += `${item.nombre} x${item.cantidad} = $${item.precio * item.cantidad}\n`;
    }
    resumen += `\nSubtotal: $${total}`;

    alert(resumen);
    console.log(resumen);
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert("No podés finalizar la compra con el carrito vacío.");
        return false;
    }

    
    let descuento = 0;
    if (total >= LIMITE_DESCUENTO_ALTO) {
        descuento = 0.1;
    } else if (total >= LIMITE_DESCUENTO_BAJO) {
        descuento = 0.05;
    } else {
        descuento = 0;
    }

    const montoDescuento = total * descuento;
    const totalConDescuento = total - montoDescuento;
    const totalFinal = totalConDescuento * (1 + IVA);

    const ticket =
        `COMPRA FINALIZADA\n\n` +
        `Subtotal: $${total.toFixed(2)}\n` +
        `Descuento (${descuento * 100}%): -$${montoDescuento.toFixed(2)}\n` +
        `IVA (${IVA * 100}%): +$${(totalConDescuento * IVA).toFixed(2)}\n` +
        `TOTAL A PAGAR: $${totalFinal.toFixed(2)}\n\n` +
        `¡Gracias por tu compra!`;

    alert(ticket);
    console.log(ticket);
    return true;
}


function iniciarSimulador() {
    let opcion = "";
    let continuar = true;

    while (continuar) {
        opcion = prompt(
            "MENÚ PRINCIPAL\n\n" +
            "1 - Agregar producto al carrito\n" +
            "2 - Ver carrito\n" +
            "3 - Finalizar compra\n" +
            "0 - Salir\n\n" +
            "Elegí una opción:"
        );

        
        if (opcion === null) {
            opcion = "0";
        }

        
        switch (opcion) {
            case "1":
                agregarProducto();
                break;
            case "2":
                verCarrito();
                break;
            case "3":
                if (finalizarCompra()) {
                    continuar = false;
                }
                break;
            case "0":
                alert("Gracias por visitar la tienda. ¡Hasta pronto!");
                continuar = false;
                break;
            default:
                alert("Opción inválida. Elegí un número del menú.");
                console.warn(`Opción no válida: ${opcion}`);
        }
    }

    console.log("Simulador finalizado.");
}


const botonIniciar = document.getElementById("btnIniciar");
botonIniciar.addEventListener("click", () => {
    carrito = [];
    total = 0;
    iniciarSimulador();
});
