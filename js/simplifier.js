
// Turn on Simplifier Led
document.addEventListener("click", function(){
  document.getElementById("simplifier__guitar--on").style.opacity = '1';
});


// Switchs
window.onload = function(){

  let images = []
  function preload() {
    for (i = 0; i < preload.arguments.length; i++) {
      images[i] = new Image()
      images[i].src = preload.arguments[i]
    }
  }
  preload(
    "assets/switchCenter.png",
    "assets/switchLeft.png",
    "assets/switchRight.png",
    "assets/switchUp.png",
    "assets/switchDown.png"
  )
      
  let toggles = document.getElementsByClassName('toggle');
  for (let i = 0; i < toggles.length; i++) {

    let actualDivID = toggles[i].id;
    let cantStatus = 3;
 
    toggles[i].innerHTML =  '<div class="clicker">' +
                            '<div class="pos pos1" id="'+toggles[i].id+'_pos1"></div>' +
                            '<div class="pos pos2" id="'+toggles[i].id+'_pos2"></div>' +
                            '<div class="pos pos3" id="'+toggles[i].id+'_pos3"></div>' +
                            '</div>';
    toggles[i].style.backgroundImage = "url('assets/switchCenter.png')";
    toggles[i].style.backgroundSize = "100% 100%";

    let currentPosClassName = toggles[i].className;

    for(let status = 1; status <= cantStatus; status++) {

      document.getElementById(actualDivID+'_pos'+status).addEventListener('click', function(){

        if (currentPosClassName.includes('toggleH')) {
            pngStatus = [, "url('assets/switchLeft.png')", "url('assets/switchCenter.png')", "url('assets/switchRight.png')"]
        }
        else if (currentPosClassName.includes('toggleV')) {
            pngStatus = [, "url('assets/switchUp.png')", "url('assets/switchCenter.png')", "url('assets/switchDown.png')"]
        }

        toggles[i].style.backgroundImage = pngStatus[status];

      })
    }

  }
}


// Captura
//Definimos el botón para escuchar su click
const $boton = document.querySelector("#btnCapturar"), // El botón que desencadena
  $objetivo = document.querySelector(".simplifier");  // A qué le tomamos la fotocanvas
// Nota: no necesitamos contenedor, pues vamos a descargarla

// Agregar el listener al botón
$boton.addEventListener("click", () => {

  let factor = getComputedStyle(document.documentElement).getPropertyValue('--factor');
  console.warn(factor)

  document.documentElement.style.setProperty('--factor', '1')
  document.getElementById('simplifier').style.width = "1500px";
  document.getElementById('simplifier').style.height = "981px";

  html2canvas($objetivo, {scale: 1}) // Llamar a html2canvas y pasarle el elemento
    .then(canvas => {
      // Cuando se resuelva la promesa traerá el canvas
      // Crear un elemento <a>
      let enlace = document.createElement('a');
      enlace.download = "mi_simplifier.png";
      // Convertir la imagen a Base64
      enlace.href = canvas.toDataURL();
      // Hacer click en él
      enlace.click();

      // volver a los valores 
      document.documentElement.style.setProperty('--factor', factor)
    });
    
});

