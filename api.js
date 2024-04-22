window.addEventListener('load', () => {
    let lon;
    let lat;
  
    let temperaturaValor = document.querySelector('.numgran'); // Seleccionamos el elemento que contiene el valor de temperatura
    let precipitacionValor = document.querySelector('.precipitacion'); // Seleccionamos el elemento que contiene el valor de precipitación
    let humedadValor = document.querySelector('.humedad'); // Seleccionamos el elemento que contiene el valor de humedad
    let vientoValor = document.querySelector('.viento'); // Seleccionamos el elemento que contiene el valor de la velocidad del viento
    let diaHoraValor = document.querySelector('.dia-hora'); // Seleccionamos el elemento que contiene el día y la hora
    let estadoClimaValor = document.querySelector('.estado-clima'); // Seleccionamos el elemento que contiene el estado del clima
    let imagenPrincipal = document.getElementById('imagen-clima'); // Seleccionamos la imagen principal por su ID
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(posicion => {
        lon = posicion.coords.longitude;
        lat = posicion.coords.latitude;
  
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=b1a519fdb6566e96051641bd9720b887`;
  
        fetch(url)
          .then(response => response.json())
          .then(data => {
            let temp = Math.round(data.main.temp);
            temperaturaValor.textContent = temp; // Reemplazamos el contenido del elemento con el valor de temperatura obtenido de la API
            let precipitacion = data.clouds.all;
            precipitacionValor.textContent = `Precipitation: ${precipitacion}%`; // Reemplazamos el contenido del elemento con el valor de precipitación obtenido de la API
            let humedad = data.main.humidity;
            humedadValor.textContent = `Humidity: ${humedad}%`; // Reemplazamos el contenido del elemento con el valor de humedad obtenido de la API
            let viento = data.wind.speed;
            vientoValor.textContent = `Wind: ${viento} km/h`; // Reemplazamos el contenido del elemento con el valor de velocidad del viento obtenido de la API
            let diaHora = new Date(data.dt * 1000); // Convertimos la fecha de Unix a JavaScript Date
            let dia = diaHora.toLocaleDateString('en-US', { weekday: 'long' }); // Obtenemos el nombre del día de la semana
            let hora = diaHora.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); // Obtenemos la hora en formato AM/PM
            diaHoraValor.textContent = `${dia} ${hora}`; // Actualizamos el contenido del elemento con el día y la hora obtenidos de la API
            let estadoClima = data.weather[0].main;
            estadoClimaValor.textContent = estadoClima; // Reemplazamos el contenido del elemento con el estado del clima obtenido de la API
            
            // Cambiar la imagen principal según el estado del clima
            switch (estadoClima.toLowerCase()) {
              case 'thunderstorm':
              case 'drizzle':
              case 'rain':
                imagenPrincipal.src = 'imagenes/lluvia.png';
                break;
              case 'snow':
                imagenPrincipal.src = 'animated/snowy-6.svg';
                break;
              case 'clear':
                imagenPrincipal.src = 'imagenes/soleado.png';
                break;
              case 'clouds':
                imagenPrincipal.src = 'imagenes/nublado.png';
                break;
              default:
                imagenPrincipal.src = 'animated/cloudy-day-1.svg';
            }
          })
          .catch(error => {
            console.log(error);
          });
      });
    }
});

  
  
  
