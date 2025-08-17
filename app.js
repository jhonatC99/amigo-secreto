/*
# Agregar nombres: Los usuarios escribirán el nombre de un amigo en un campo de texto y lo agregarán a una
lista visible al hacer clic en "Adicionar".
# Validar entrada: Si el campo de texto está vacío, el programa mostrará una alerta pidiendo un nombre válido.
# Visualizar la lista: Los nombres ingresados aparecerán en una lista debajo del campo de entrada.
# Sorteo aleatorio: Al hacer clic en el botón "Sortear Amigo", se seleccionará aleatoriamente un nombre de la
lista y se mostrará en la página.
*/

// Array que almacena los nombres de los amigos ingresados
let amigos = [];
let indiceAmigos = 0;

function limpiarEntrada() {
    document.querySelector('#amigo').value = '';
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
            let listHtml = document.getElementById('listaAmigos');
            let resultHtml = document.getElementById('resultado');
            //Limpia la lista actual de nombres
            listHtml.innerHTML = "";
            resultHtml.innerHTML = "";
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
    let tam = amigos.length;
    if (tam === 0) {
        alert("La lista de amigos está vacía, por favor ingrese un nombre.");
    } else {
        let numeroGenerado =  Math.floor(Math.random()*tam);
        //console.log(amigos.length);
        let listHtml = document.getElementById('listaAmigos');
        let resultHtml = document.getElementById('resultado');
        //Limpia la lista actual de nombres
        listHtml.innerHTML = "";
        resultHtml.innerHTML = "";
        resultHtml.innerHTML = `El amigo secreto sorteado es: ${amigos[numeroGenerado]}`;
        amigos = [];
        indiceAmigos = 0;
        limpiarEntrada();
    }
}