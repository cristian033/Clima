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

            const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=b1a519fdb6566e96051641bd9720b887`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    // Obtener datos para tres días después del actual
                    let futureDate = new Date();
                    futureDate.setDate(futureDate.getDate() + 2); // Ajustar la fecha para tres días después
                    let futureData = data.list.find(entry => {
                        let entryDate = new Date(entry.dt * 1000);
                        return entryDate.getDate() === futureDate.getDate();
                    });

                    if (futureData) {
                        let temp = Math.round(futureData.main.temp);
                        temperaturaValor.textContent = temp;
                        let precipitacion = futureData.clouds.all;
                        precipitacionValor.textContent = `Precipitación: ${precipitacion}%`;
                        let humedad = futureData.main.humidity;
                        humedadValor.textContent = `Humedad: ${humedad}%`;
                        let viento = futureData.wind.speed;
                        vientoValor.textContent = `Viento: ${viento} km/h`;
                        let diaHora = new Date(futureData.dt * 1000);
                        let diaActual = traducciones[diaHora.toLocaleDateString('en-US', { weekday: 'long' })];
                        diaHoraValor.textContent = `${diaActual.slice(0, 3)}`;
                        let estadoClima = traducciones[futureData.weather[0].main].slice(0, 3);
                        estadoClimaValor.textContent = estadoClima;

                        // Obtener el día dos días antes del actual
                        let dosDiasAntes = new Date(diaHora);
                        dosDiasAntes.setDate(diaHora.getDate() - 2);
                        let dosDiasAntesValor = traducciones[dosDiasAntes.toLocaleDateString('en-US', { weekday: 'long' })];

                        // Reemplazar el texto del primer div con las 3 primeras letras del día dos días antes del actual
                        document.querySelectorAll('.botons')[0].textContent = dosDiasAntesValor.slice(0, 3);

                        // Obtener el día antes del actual
                        let diaAntes = new Date(diaHora);
                        diaAntes.setDate(diaHora.getDate() - 1);
                        let diaAntesValor = traducciones[diaAntes.toLocaleDateString('en-US', { weekday: 'long' })];

                        // Reemplazar el texto del segundo div con las 3 primeras letras del día antes del actual
                        document.querySelectorAll('.botons')[1].textContent = diaAntesValor.slice(0, 3);

                        // Obtener el día actual
                        let diaActualValor = traducciones[diaHora.toLocaleDateString('en-US', { weekday: 'long' })];

                        // Reemplazar el texto del tercer div con las 3 primeras letras del día actual
                        document.querySelectorAll('.botons')[2].textContent = diaActualValor.slice(0, 3);

                        // Obtener el día siguiente al actual
                        let diaSiguiente = new Date(diaHora);
                        diaSiguiente.setDate(diaHora.getDate() + 1);
                        let diaSiguienteValor = traducciones[diaSiguiente.toLocaleDateString('en-US', { weekday: 'long' })];

                        // Reemplazar el texto del cuarto div con las 3 primeras letras del día siguiente al actual
                        document.querySelectorAll('.botons')[3].textContent = diaSiguienteValor.slice(0, 3);

                        // Obtener el día dos días después del actual
                        let dosDiasDespues = new Date(diaHora);
                        dosDiasDespues.setDate(diaHora.getDate() + 2);
                        let dosDiasDespuesValor = traducciones[dosDiasDespues.toLocaleDateString('en-US', { weekday: 'long' })];

                        // Reemplazar el texto del quinto div con las 3 primeras letras del día dos días después del actual
                        document.querySelectorAll('.botons')[4].textContent = dosDiasDespuesValor.slice(0, 3);

                        // Obtener el día tres días después del actual
                        let tresDiasDespues = new Date(diaHora);
                        tresDiasDespues.setDate(diaHora.getDate() + 3);
                        let tresDiasDespuesValor = traducciones[tresDiasDespues.toLocaleDateString('en-US', { weekday: 'long' })];

                        // Reemplazar el texto del sexto div con las 3 primeras letras del día tres días después del actual
                        document.querySelectorAll('.botons')[5].textContent = tresDiasDespuesValor.slice(0, 3);




                        switch (estadoClima.toLowerCase()) {
                            case 'tor':
                            case 'llo':
                            case 'llu':
                                imagenPrincipal.src = '../imagenes/lluvia.png';
                                break;
                            case 'nie':
                                imagenPrincipal.src = '../animated/snowy-6.svg';
                                break;
                            case 'des':
                                imagenPrincipal.src = '../imagenes/soleado.png';
                                break;
                            case 'nub':
                                imagenPrincipal.src = '../imagenes/nublado.png';
                                break;
                            default:
                                imagenPrincipal.src = 'animated/cloudy-day-1.svg';
                        }
                    } else {
                        console.log("No se encontraron datos para tres días después del actual.");
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        });
    }

    // Agregar controlador de eventos a los botones para resaltar el botón presionado
    document.querySelectorAll('.botons').forEach(button => {
        button.addEventListener('click', function () {
            // Elimina la clase 'active' de todos los botones
            document.querySelectorAll('.botons').forEach(btn => {
                btn.classList.remove('active');
            });

            // Agrega la clase 'active' solo al botón que se ha presionado
            this.classList.add('active');
        });
    });
});
