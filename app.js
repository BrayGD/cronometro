//seleccionar los elementos para dar vida
const tiempoElm = document.getElementById("tiempo");
const botonInicioPausa = document.getElementById("boton-inicio-pausa");
const botonReinicio = document.getElementById("boton-reiniciar");


let [segundos, minutos,horas] = [0, 0, 0];

let intervaloTiempo;
let estadoCronometro = "pausado";



//funcion actualizar cronómetro

function actualizarCronometro (){

    //condición que irá avanzando el tiempo y antes de llegar al 60 y mostrarlo, iniciará el siguiente nivel de minutos
    segundos++;
    if (segundos / 60 === 1){
        segundos = 0;
        minutos ++;
        if (minutos / 60 === 1){
            minutos = 0;
            horas ++;
        }
    } 

    //Conforme va avanzando el tiempo se le debe asignar el cronómetro
    const segundosConFormato = asignarFormato(segundos);
    const minutosConFormato = asignarFormato(minutos);
    const horasConFornato = asignarFormato(horas);
  // se actualiza el texto del div que muestra el texto del tiempo pero ya con un formato asignado  
    tiempoElm.innerText = `${horasConFornato}:${minutosConFormato}:${segundosConFormato}`;
}

//darle formato al cronómetro con condición ternaria para que agregue un 0 si mi unidad de tiempo es menor a 10
function asignarFormato (unidadDeTiempo){
    return unidadDeTiempo < 10 ? "0" + unidadDeTiempo : unidadDeTiempo;
}
//crear eventos

// evento para que a la hora de hacer click inice una acción 
botonInicioPausa.addEventListener("click", function(){
    // al dar click en el boton, si el estado del cronometro esta en pausado se van a cambiar  cosas del cronometro como el elemento del HTML, sus estilos y cada 1000 milisegundos va a avanzar el
    if (estadoCronometro === "pausado"){
        intervaloTiempo = window.setInterval(actualizarCronometro, 1000);
        botonInicioPausa.innerHTML = `<i class="bi bi-pause-fill" id="boton-inicio-pausa"></i>`;
        botonInicioPausa.classList.remove("iniciar");
        botonInicioPausa.classList.add("pausar");
        estadoCronometro = "andando";
    // de lo contrario, el cronometro va a mantener sus propiedades iniciales en el HTML (elementos, estilos) y obviamente el cronometro no va a avanzar
    }else{
        window.clearInterval(intervaloTiempo);
        botonInicioPausa.innerHTML = `<i class="bi bi-play-fill" id="boton-inicio-pausa"></i>`;
        botonInicioPausa.classList.remove("pausar");
        botonInicioPausa.classList.add("iniciar");
        estadoCronometro = "pausado";
    }
})

//evento reiniciar 
botonReinicio.addEventListener("click", function(){
    window.clearInterval(intervaloTiempo);

    horas = 0;     
    minutos = 0;
    segundos = 0;

    //actualizar botones
    tiempoElm.innerText = "00:00:00";
    botonInicioPausa.innerHTML = `<i class="bi bi-play-fill" id="boton-inicio-pausa"></i>`;
    botonInicioPausa.classList.remove("pausar");
    botonInicioPausa.classList.add("iniciar");

    // Estado cronómetro
    estadoCronometro = "pausado";
    
})
