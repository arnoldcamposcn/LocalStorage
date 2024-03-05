
// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Event Listeners
eventListeners();


function eventListeners(){
    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit',agregarTweet);

    // Cuando el document esta listo 
    document.addEventListener('DOMContentLoaded', ()=>{
        tweets = JSON.parse(localStorage.getItem('tweets')) ||[];

        console.log(tweets);

        crearHTML();
    })
}

// Funciones
function agregarTweet(e){
    e.preventDefault();

    const tweet = document.querySelector('#tweet').value;

    if( tweet === ''){
        mostrarError('No puede ir vacio');
        return;
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    // Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];

    crearHTML();

    // Reiniciar el formulario
    formulario.reset();
}

//Mostrar mensaje de errror

function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // Eliminar la alerta despues de 3 segundos
    setTimeout(() => {
       mensajeError.remove(); 
    }, 3000);
}
   
//Muestra un listado de los tweetws

function crearHTML(){

    limpiarHTML();
    if(tweets.length > 0){
        tweets.forEach( tweet =>{
        // Agregar un boton de eliminar

        const BtnEliminar = document.createElement('a');
        BtnEliminar.classList.add('borrar-tweet');
        BtnEliminar.innerText = 'X';

        // Añadir la funcion de eliminar
        BtnEliminar.onclick = () =>{
        borrarTweet(tweet.id);
        }
        // Crear el html
        const li = document.createElement('li');

        // Añadir el texto
        li.innerText = tweet.tweet;

        // Añadir el boton
        li.appendChild(BtnEliminar);

        // Insertarlo en el HTML
        listaTweets.appendChild(li);
    });
}
sincronizarStorage();
}

// Agregar los Tweets actuales a localStorage
function sincronizarStorage(){
    localStorage.setItem('tweets',JSON.stringify(tweets));
}

// borrar tweet
function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();
}


// Limpiar el HTML

function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);

    }
}