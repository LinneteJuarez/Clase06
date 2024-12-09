/*
    Vamos a modificar el color del borde de un <div> dependiendo del tamaño de la pantalla.

    Por defecto el borde es blanco.
    Si el ancho de la pantalla es menor a 800 pixeles, el borde será rojo.
    Si el ancho es igual o mayor a 800 será verde.
    Y si el ancho es igual o mayor a 1200 será azul.
*/

/*///// 1. Estableceremos las variables que determinan el límite del ancho de la pantalla para crear nuestra condición. ///*/
let screenThreshold = 800;
let upperScreenThreshold = 1200;


/*///// 2. Luego identificaremos nuestro <div> que existe en el documento HTML ///*/
const DIV = document.getElementById("tester");


/*///// 3. Ahora crearemos nuestra función con la condición que evaluará el tamaño de la ventana para cambiar el color del borde de acuerdo a nuestra regla. ///*/
function isWindowWideEnough(event) {
    if (window.innerWidth >= upperScreenThreshold) {
        DIV.style.borderColor = "blue";

    } else if (window.innerWidth >= screenThreshold) {
        DIV.style.borderColor = "#00ff00";

    } else {
        DIV.style.borderColor = "red";
    }
}


/*///// 4. Por último, configuraremos el evento "window resize" para escuchar cuando la ventana cambie de tamaño y así disparar nuestra función que evalua el tamaño de la ventana. ///*/
window.addEventListener("resize", isWindowWideEnough);




/* Happy Coding! 👾 */

// Documentación sobre los condicionales if / else y otros disponibles:
// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/conditionals#if...else_statements

// Documentación sobre los comandos de dibujo disponibles:
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2Dlet limiteDeCirculos = 5000;
let contadorDeCirculos = 0;


console.log("hola")
const PI2 = Math.PI * 2;
const CANVAS = document.getElementById("lienzo");
const CTX = CANVAS.getContext("2d");
CANVAS.width = window.innerWidth;
CANVAS.height = window.innerHeight;

function updateCanvasSize() {
    CANVAS.width = CANVAS.getBoundingClientRect().width;
    CANVAS.height = CANVAS.getBoundingClientRect().height;
}

function getRandomColor(){
    const letters = '123456789ABCDEF';
    let color = '#';
    for(let i = 0; i < 6; i++){
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color;
}

/*///// 1. Definición del círculo como una "Clase" capaz de utilizarse como template para crear múltiples objetos, en este caso "círculos" ///*/
class Circulo {
    constructor(params = {}) {
        /*
            Estamos definiendo que la funcion "circulo" va a recibir sus parámetros por medio de un solo objeto, de esta manera no tienen que estar en un orden específico como habiamos visto anteriormente.
    
            Adicionalmente, estamos definiendo un valor por defecto igual a un objeto vacío "{}"; en caso de que no definamos ese parametro al invocar la función, se realizará la asignación automática "params = {}".
    
            A partir de aquí, la definición del objeto te va a resultar bastante familiar, es igual a lo que hemos hecho hasta ahora.
        */
        this.borderColor = params.borderColor ||getRandomColor();
        this.borderWidth = 5;
        this.x = Math.random() * CANVAS.width;
        this.y = Math.random() * CANVAS.height;
        /*
            Math.random() es una función que nos devuelve un valor decimal aleatorio entre 0 y 1. Al multiplicarlo por un número es como si ampliaramos el rango de ese valor aleatorio.
    
            Por ejemplo "Math.random() * 50" nos devuelve un valor aleatorio entre 0 y 50.
        */
        this.speed = {
            x: Math.random() *0.8,
            y: 0.2
        }
    }

    /*
        El método updatePosition() se define sin usar el comando "function" y sin usar una variable, simplemente está dentro de la definición de la clase y fuera del constructor()
    */
    updatePosition() {
        this.x += this.speed.x;
        this.y += this.speed.y;
    }

    draw() {
        CTX.strokeStyle = this.borderColor;
        CTX.lineWidth = this.borderWidth;
        CTX.globalAlpha = 0.5;
        CTX.beginPath();
        CTX.ellipse(this.x, this.y, 30, 30, 0, 0, PI2);
        CTX.closePath();
        CTX.stroke();

        this.updatePosition();
        /*
            Para invocar el método "updatePosition()" dentro de funciones en la clase tenemos que hacer referencia a la clase u objeto mismo por medio de "this".
        */
    };
}




/*///// 
    2. Creamos un circulo usando la función "generadora" que acabamos de definir por medio del comando "new".

    Estamos guardándolo en una variable para mantener registro de este círculo y actualizar su posición poco a poco en cada "frame".
///*/
let circulo1 = new Circulo();




/*///// 3. Definimos la funcion de renderizado que estaremos repitiendo usando requestAnimationFrame() ///*/
function render() {
    //CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);

    /*///// 4. Ciclo "for" para crear nuevos circulos ///*/
    /*
        Estamos usando el ciclo "for" para crear circulos dentro del render porque no hemos visto las "estructuras de datos" tipo "array" para correr el ciclo for una sola vez y guardar los nuevos objetos; lo veremos en el siguiente ejercicio.
    */
    for (let i = 0; i < 5; i++) {
        let nuevoCirculo = new Circulo({ borderColor: getRandomColor() }); // Definimos un parametro para el color del borde para que estos nuevos círculos sean diferentes del que creamos fuera del ciclo for.

        /*///// 4.1 Importante llamar a la función que está renderizando el objeto "circulo" en el canvas ///*/
        nuevoCirculo.draw();


        contadorDeCirculos += 1;
    }

    console.log("contadorDeCirculos", contadorDeCirculos);

    //ESTABLECER CONDICION
    if (contadorDeCirculos == limiteDeCirculos) {CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
        contadorDeCirculos = 0;
    }

    /*///// 5. Renderizamos nuestro círculo original que guardamos en la variable circulo1 ///*/
    //circulo1.draw();

    
    requestAnimationFrame(render);
}



/*///// 6. Ejecutar nuestro código ///*/
window.addEventListener("resize", updateCanvasSize);
requestAnimationFrame(render);




/* Happy Coding! 👾 */

// Documentacion sobre las clases:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

// Documentacion sobre los comandos de dibujo disponibles:
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D