const setManifestPath = () => {
  const hostname = window.location.hostname;
  let cleanSubdomain = hostname
    .replace("-tv", "")
    .replace("dev-", "")
    .split(".")[0];

  // Cambiar este valor la empresa que se desee setear el manifest en desarrollo
  if (cleanSubdomain === "localhost") {
    cleanSubdomain = "Virtualmanifest";
  }

  //cleanSubdomain = "muni";



  /*Este es un archivo JSON que describe el manifest de una aplicación web progresiva (PWA). Un manifest es un archivo de configuración que le dice al navegador cómo se debe comportar la PWA. En este caso, describe las características de la PWA como su nombre, descripción, iconos, colores de fondo y tema, la URL de inicio, la orientación de la pantalla, el alcance y las capacidades de la aplicación. También incluye una lista de accesos directos que se pueden agregar a la pantalla de inicio del usuario para un acceso más rápido.*/
  const manifestPath = `./manifest.json`;

  //Valido que exista el manifest si no lo dejo por defecto al de sooft
/*  var file = new XMLHttpRequest();
  file.open("HEAD", manifestPath, false);
  file.send();
*/
  //if (file.status !== 404) {
  //  const element = document.getElementById("manifest");
  //  element.setAttribute("href", manifestPath);
  //}

  var link = document.createElement( "link" );
  link.href = manifestPath;
  link.rel = "manifest";
  //console.log("link", link)
  document.getElementsByTagName( "head" )[0].appendChild( link );

};

const getSubdomain = (real=false) => {
  const hostname = window.location.hostname;
  let cleanSubdomain = hostname
    .replace("-tv", "")
    .split(".")[0];

  if (cleanSubdomain === "localhost") {
    cleanSubdomain = "clubes";
  }
  //cleanSubdomain = "muni";

  if(real){
    cleanSubdomain = cleanSubdomain.replace('dev-','');
    //console.log(cleanSubdomain);
    return cleanSubdomain
  }

  return cleanSubdomain
};

function testIos(param)
{
    alert(param);
}