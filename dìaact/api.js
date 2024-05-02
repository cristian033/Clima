window.addEventListener('load', () => {
    let lon;
    let lat;

    let temperaturaValor = document.querySelector('.numgran');
    let precipitacionValor = document.querySelector('.precipitacion');
    let humedadValor = document.querySelector('.humedad');
    let vientoValor = document.querySelector('.viento');
    let diaHoraValor = document.querySelector('.dia');
    let estadoClimaValor = document.querySelector('.estado-clima');
    let imagenPrincipal = document.getElementById('imagen-clima');

        

    const traducciones = {
        'Monday': 'Lun',
        'Tuesday': 'Mar',
        'Wednesday': 'Mié',
        'Thursday': 'Jue',
        'Friday': 'Vie',
        'Saturday': 'Sáb',
        'Sunday': 'Dom',
        'Thunderstorm': 'Tormenta',
        'Drizzle': 'Llovizna',
        'Rain': 'Lluvia',
        'Snow': 'Nieve',
        'Clear': 'Despejado',
        'Clouds': 'Nublado'
    };

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(posicion => {
            lon = posicion.coords.longitude;
            lat = posicion.coords.latitude;

            

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=b1a519fdb6566e96051641bd9720b887`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    let temp = Math.round(data.main.temp);
                    temperaturaValor.textContent = temp;
                    let precipitacion = data.clouds.all;
                    precipitacionValor.textContent = `Precipitación: ${precipitacion}%`;
                    let humedad = data.main.humidity;
                    humedadValor.textContent = `Humedad: ${humedad}%`;
                    let viento = data.wind.speed;
                    vientoValor.textContent = `Viento: ${viento} km/h`;
                    let diaHora = new Date(data.dt * 1000);
                    let diaActual = traducciones[diaHora.toLocaleDateString('en-US', { weekday: 'long' })]; // Obtener el día actual
                    diaHoraValor.textContent = `${diaActual.slice(0, 3)}`; // Mostrar solo las 3 primeras letras del día actual
                    let estadoClima = traducciones[data.weather[0].main].slice(0, 3); // Modificación para mostrar solo las 3 primeras letras del estado del clima
                    estadoClimaValor.textContent = estadoClima;

                    // Reemplazar el texto del primer div con las 3 primeras letras del día actual
                    document.querySelector('.botons').textContent = diaActual.slice(0, 3);

                    // Obtener el día siguiente al actual
                    let diaSiguiente = new Date(diaHora);
                    diaSiguiente.setDate(diaHora.getDate() + 1);
                    let diaSiguienteValor = traducciones[diaSiguiente.toLocaleDateString('en-US', { weekday: 'long' })];

                    // Reemplazar el texto del segundo div con las 3 primeras letras del día siguiente
                    document.querySelectorAll('.botons')[1].textContent = diaSiguienteValor.slice(0, 3);

                    // Obtener el día dos días después del actual
                    let dosDiasDespues = new Date(diaHora);
                    dosDiasDespues.setDate(diaHora.getDate() + 2);
                    let dosDiasDespuesValor = traducciones[dosDiasDespues.toLocaleDateString('en-US', { weekday: 'long' })];

                    // Reemplazar el texto del tercer div con las 3 primeras letras del día dos días después del actual
                    document.querySelectorAll('.botons')[2].textContent = dosDiasDespuesValor.slice(0, 3);

                    // Obtener el día tres días después del actual
                    let tresDiasDespues = new Date(diaHora);
                    tresDiasDespues.setDate(diaHora.getDate() + 3);
                    let tresDiasDespuesValor = traducciones[tresDiasDespues.toLocaleDateString('en-US', { weekday: 'long' })];

                    // Reemplazar el texto del cuarto div con las 3 primeras letras del día tres días después del actual
                    document.querySelectorAll('.botons')[3].textContent = tresDiasDespuesValor.slice(0, 3);

                    // Obtener el día cuatro días después del actual
                    let cuatroDiasDespues = new Date(diaHora);
                    cuatroDiasDespues.setDate(diaHora.getDate() + 4);
                    let cuatroDiasDespuesValor = traducciones[cuatroDiasDespues.toLocaleDateString('en-US', { weekday: 'long' })];

                    // Reemplazar el texto del quinto div con las 3 primeras letras del día cuatro días después del actual
                    document.querySelectorAll('.botons')[4].textContent = cuatroDiasDespuesValor.slice(0, 3);

                    // Obtener el día cinco días después del actual
                    let cincoDiasDespues = new Date(diaHora);
                    cincoDiasDespues.setDate(diaHora.getDate() + 5);
                    let cincoDiasDespuesValor = traducciones[cincoDiasDespues.toLocaleDateString('en-US', { weekday: 'long' })];

                    // Reemplazar el texto del sexto div con las 3 primeras letras del día cinco días después del actual
                    document.querySelectorAll('.botons')[5].textContent = cincoDiasDespuesValor.slice(0, 3);



                    switch (estadoClima.toLowerCase()) {
                        case 'tor':
                        case 'llo':
                        case 'llu':
                            imagenPrincipal.src = 'imagenes/lluvia.png';
                            break;
                        case 'nie':
                            imagenPrincipal.src = 'animated/snowy-6.svg';
                            break;
                        case 'des':
                            imagenPrincipal.src = 'imagenes/soleado.png';
                            break;
                        case 'nub':
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

     // Agregar una función para actualizar la información basada en la selección del botón
     function actualizarInformacion(diaSeleccionado) {
        // Obtener el día actual
        let diaActual = new Date();
        let diaActualNombre = traducciones[diaActual.toLocaleDateString('en-US', { weekday: 'long' })];

        // Verificar si el día seleccionado coincide con el día actual
        if (diaSeleccionado === diaActualNombre.slice(0, 3)) {
            // Actualizar la información con los datos del día actual
            let temperaturaValor = document.querySelector('.numgran');
            let precipitacionValor = document.querySelector('.precipitacion');
            let humedadValor = document.querySelector('.humedad');
            let vientoValor = document.querySelector('.viento');
            let diaHoraValor = document.querySelector('.dia');
            let estadoClimaValor = document.querySelector('.estado-clima');
            let imagenPrincipal = document.getElementById('imagen-clima');

            // Aquí iría el código que actualiza la información con los datos del día actual obtenidos de la API
            // ...
        } else {
            // Aquí puedes manejar el caso en el que el día seleccionado no sea el actual
            // Por ejemplo, puedes mostrar un mensaje de error o simplemente no hacer nada
        }
    }   

    // Agregar controlador de eventos a los botones para resaltar el botón presionado
    document.querySelectorAll('.botons').forEach(button => {
        button.addEventListener('click', function() {
            // Elimina la clase 'active' de todos los botones
            document.querySelectorAll('.botons').forEach(btn => {
                btn.classList.remove('active');
            });

            // Agrega la clase 'active' solo al botón que se ha presionado
            this.classList.add('active');
        });
    });
});