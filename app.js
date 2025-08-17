/*
# Agregar nombres: Los usuarios escribiran el nombre de un amigo en un campo de texto y lo agregaran a una
    lista visible al hacer clic en "Adicionar".
# Validar entrada: Si el campo de texto esta vacio, el programa mostrara una alerta pidiendo un nombre valido.
# Visualizar la lista: Los nombres ingresados apareceran en una lista debajo del campo de entrada.
# Sorteo aleatorio: Al hacer clic en el boton "Sortear Amigo", se seleccionara aleatoriamente un nombre de la
    lista y se mostrara en la pagina.
*/

// Array que almacena los nombres de los amigos ingresados
let amigos = [];
// Variable numerica que almacena 
let indiceAmigos = 0;

function limpiarEntrada() {
    document.querySelector('#amigo').value = '';
    return;
}

function limpiarListas() {
    let listHtml = document.getElementById('listaAmigos');
    let resultHtml = document.getElementById('resultado');
    //Limpia la lista actual de nombres
    listHtml.innerHTML = "";
    resultHtml.innerHTML = "";
    return;
}

function validarNombre(nombre) {
    let limpio = nombre.trim();

    //Lista de todas las validaciones contempladas
    const reglas = [
        { test: limpio.length > 0, mensaje: "Por favor, inserte un nombre." },
        { test: limpio.length >= 2, mensaje: "El nombre debe tener al menos dos letras." },
        { test: /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(limpio), mensaje: "El nombre solo puede contener letras y espacios." },
        { test: !/\s{2,}/.test(limpio), mensaje: "El nombre no puede tener espacios múltiples seguidos." }
    ];

    for (let regla of reglas) {
        if (!regla.test) {
            alert(regla.mensaje);
            return false;
        }
    }

    return true; //Cumple todas las validaciones
}

function imprimirAmigos (listAmigos, indice) {
    let listHtml = document.getElementById('listaAmigos');
    let elemToList = document.createElement('li');
    let text = document.createTextNode(listAmigos[indice]);
    elemToList.appendChild(text);
    listHtml.appendChild(elemToList);
    return;
}

function agregarAmigo() {
    let textUsuario = document.getElementById('amigo').value;
    let tam = amigos.length;
    if (validarNombre(textUsuario)) {
        
        if (tam === 0) {
            limpiarListas();
        }
        let limpio = textUsuario.trim();
        // Se adiciona el valor limpio a la cadena amigos
        amigos.push(limpio);
        console.log(amigos);
        imprimirAmigos(amigos, indiceAmigos);
        //Incrementa el indice para evitar usar un bucle
        indiceAmigos++;
    }
    limpiarEntrada();
}

function sortearAmigo() {
    let resultHtml = document.getElementById('resultado');
    let tam = amigos.length;
    if (tam === 0) {
        alert("La lista de amigos está vacía, por favor ingrese un nombre.");
    } else {
        let numeroGenerado =  Math.floor(Math.random()*tam);
        limpiarListas();
        resultHtml.innerHTML = `El amigo secreto sorteado es: ${amigos[numeroGenerado]}`;
        amigos = [];
        indiceAmigos = 0;
        limpiarEntrada();
    }
}