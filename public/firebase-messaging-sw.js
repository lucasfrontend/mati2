importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

self.onnotificationclick = function(event) {
  let url = null;
  if(event.notification != undefined){
    if(event.notification.data.FCM_MSG.data != undefined){
      url = event.notification.data.FCM_MSG.data.link;
    }
  }
  /*El código comprueba si la notificación tiene algún dato en el campo "data" que se proporcionó cuando se envió la notificación push. Si existe un campo "data" en la notificación, el código obtiene la URL que se proporcionó en el campo "link" y la almacena en la variable "url". Finalmente, la notificación se cierra usando la función "event.notification.close()".*/
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(clients.matchAll({
      type: "window"
  }).then(function(clientList) {
      if (clients.openWindow)
          return clients.openWindow(url);
  }));
};
/*Este código se encarga de verificar si la aplicación ya está abierta en una pestaña del navegador y la enfoca si es así. Primero busca todas las pestañas abiertas con el tipo "window". Si encuentra una pestaña abierta, enfoca esa pestaña en lugar de abrir una nueva pestaña con la URL especificada. El uso de la función event.waitUntil asegura que la promesa devuelta por clients.matchAll se resuelva antes de que la notificación se cierre.*/




firebase.initializeApp(
    {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  });

  /*Este código es una configuración de Firebase Cloud Messaging (FCM) para una Progressive Web App (PWA).

Primero, se inicializa la aplicación de Firebase con una serie de credenciales (apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, y measurementId).

Luego, se obtiene una instancia del objeto messaging de Firebase.

A continuación, se define un evento para recibir mensajes en segundo plano desde FCM. Cuando se recibe un mensaje en segundo plano, se muestra un mensaje de registro en la consola y se envía una respuesta al cliente que ha enviado el mensaje.

La respuesta incluye el payload del mensaje recibido y se envía a todas las ventanas de clientes abiertas y sin controlar que tienen permitido enviar y recibir mensajes.*/
  let messaging = firebase.messaging();

  messaging.onBackgroundMessage((payload) => {
    console.log('Received background message', payload);
    self.clients.matchAll({includeUncontrolled: true, type: 'window'}).then(function(clients) {
      console.log('entro', clients);
      clients.forEach(function(client) {
        client.postMessage(payload)
      });
    });
  });



/*La función isIos() es una función que comprueba si el usuario está navegando en un dispositivo iOS (iPhone, iPad o iPod).

La función utiliza el objeto navigator.userAgent para obtener información sobre el agente de usuario del navegador que el usuario está utilizando para acceder a la página web. Luego, comprueba si la cadena de texto contiene "iphone", "ipad" o "ipod" utilizando una expresión regular, y devuelve true si el usuario está en un dispositivo iOS, o false si no lo está.

Esta función puede ser útil para detectar si el usuario está en un dispositivo iOS y tomar decisiones en consecuencia, como mostrar ciertas funciones o elementos de la interfaz de usuario específicos de iOS.*/  
function isIos() {
  const userAgent = navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
}

/**
 * Service worker interepts requests for images
 * It puts retrieved images in cache for 10 minutes
 * If image not found responds with fallback
 */
var INVALIDATION_INTERVAL = 60 * 60 * 24 * 15;
var NS = "MAGE_"+self.location.hostname;
var SEPARATOR = "|";
var VERSION = Math.ceil(now() / INVALIDATION_INTERVAL);
/*En general, este fragmento de código se utiliza para configurar el caché de imágenes en el Service Worker, asegurando que las imágenes se almacenen en caché durante un cierto período de tiempo y se invaliden periódicamente para mantener actualizado el caché.*/
/**
 * Helper to get current timestamp
 * @returns {Number}
 */
function now() {
  var d = new Date();
  return d.getTime();
}

/*
 * Build cache storage key that includes namespace, url and record version
*/
async function buildKey(url) {
  /*if(request.method == "POST"){
    let tmpReq = request.clone();
    let json = await tmpReq.json();
    //body = JSON.stringify( json );
    console.log("json", json);
    for (const [key, value] of Object.entries(json)) {
      console.log(key, value);
    }
  }*/
  return NS + SEPARATOR + url + SEPARATOR + VERSION;
}

/**
 * The complete Triforce, or one or more components of the Triforce.
 * @typedef {Object} RecordKey
 * @property {String} ns - namespace
 * @property {String} url - request identifier
 * @property {String} ver - record varsion
 */

/**
 * Parse cache key
 * @param {String} key
 * @returns {RecordKey}
 */
function parseKey(key) {
  var parts = key.split(SEPARATOR);
  return {
    ns: parts[0],
    key: parts[1],
    ver: parseInt(parts[2], 10)
  };
}

/**
 * Invalidate records matchinf actual version
 *
 * @param {Cache} caches
 * @returns {Promise}
 */
function purgeExpiredRecords(caches) {
  console.log("Purging...");
  return caches.keys().then(function (keys) {
    return Promise.all(
      keys.map(function (key) {
        var record = parseKey(key);
        if (record.ns === NS && record.ver !== VERSION) {
          console.log("deleting", key);
          return caches.delete(key);
        }
      })
    );
  });
}

function purgeAll(caches) {
  console.log("deleting cache firts time");
  return caches.keys().then(function (keys) {
    return Promise.all(
      keys.map(function (key) {
          console.log("deleting", key);
          var record = parseKey(key);
          if (record.ns === NS && record.ver !== VERSION) {
            //console.log("deleting", key);
            return caches.delete(key);
          }
      })
    );
  });
}

/**
 * Proxy request using cache-first strategy
 *
 * @param {Cache} caches
 * @param {Request} request
 * @returns {Promise}
 */
function proxyRequest(caches, request) {
  var key = buildKey(request.url);
  // set namespace
  return caches.open(key).then(function (cache) {
    // check cache
    return cache.match(request).then(function (cachedResponse) {
      if (cachedResponse) {
        if (request.method == "GET"
            && (request.url.match(/\.(jpe?g|png|gif|svg|pdf|docx|xls|xls)$/)
            || request.url.includes('comment/file'))
        ) {
          //console.info("Take it from cache", request.url);
          return cachedResponse;
      }
      }
      // { mode: "no-cors" } gives opaque response
      // https://fetch.spec.whatwg.org/#concept-filtered-response-opaque
      // so we cannot get info about response status
      return fetch(request.clone())
        .then(function (networkResponse) {
          if (networkResponse.type !== "opaque" && networkResponse.ok === false) {
            throw new Error("Resource not available");
          }
          //console.info("Fetch it through Network", request.url, networkResponse.type);
          cache.put(request, networkResponse.clone());
          return networkResponse;
        }).catch(function () {
          //console.error("Failed to fetch", request.url);
          // Placeholder image for the fallback
          //return fetch("./placeholder.jpg", { mode: "no-cors" });
          if (cachedResponse) {
            //console.info("Take it from cache", request.url);
            return cachedResponse;
          }
        });
    });
  });
}

self.addEventListener("install", function (event) {
  //event.waitUntil(purgeAll(caches));
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", function (event) {
  //event.waitUntil(purgeExpiredRecords(caches));
});

self.addEventListener("fetch", function (event) {
  var request = event.request;

  //console.log("Detected request", request.url);
  //const body = await request.json();
  if (request.method !== "GET"//|| request.url.includes('FindByIdAsync')
    //||
    //!request.url.match(/\.(jpe?g|png|gif|svg|pdf|docx|xls|xls)$/) &&
    //!request.url.includes('comment/file')
    ) {
    //console.log("No se cacheara!!!", request.url);
    return;
  }

  //console.log("Accepted request", request.url);

  event.respondWith(
    proxyRequest(caches, request)
  );

});