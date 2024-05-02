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
                    // Obtener datos para cuatro días después del actual
                    let futureDate = new Date();
                    futureDate.setDate(futureDate.getDate() + 4); // Ajustar la fecha para cuatro días después
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

                        // Obtener el día cuarto antes del actual
                        let cuartoDiaAntes = new Date(diaHora);
                        cuartoDiaAntes.setDate(diaHora.getDate() - 4);
                        let cuartoDiaAntesValor = traducciones[cuartoDiaAntes.toLocaleDateString('en-US', { weekday: 'long' })];

                        // Reemplazar el texto del primer div con las 3 primeras letras del cuarto día antes del actual
                        document.querySelectorAll('.botons')[0].textContent = cuartoDiaAntesValor.slice(0, 3);

                        // Obtener el día tres días antes del actual
                        let tercerDiaAntes = new Date(diaHora);
                        tercerDiaAntes.setDate(diaHora.getDate() - 3);
                        let tercerDiaAntesValor = traducciones[tercerDiaAntes.toLocaleDateString('en-US', { weekday: 'long' })];

                        // Reemplazar el texto del segundo div con las 3 primeras letras del tercer día antes del actual
                        document.querySelectorAll('.botons')[1].textContent = tercerDiaAntesValor.slice(0, 3);

                        // Obtener el día dos días antes del actual
                        let dosDiasAntes = new Date(diaHora);
                        dosDiasAntes.setDate(diaHora.getDate() - 2);
                        let dosDiasAntesValor = traducciones[dosDiasAntes.toLocaleDateString('en-US', { weekday: 'long' })];

                        // Reemplazar el texto del tercer div con las 3 primeras letras del día dos días antes del actual
                        document.querySelectorAll('.botons')[2].textContent = dosDiasAntesValor.slice(0, 3);

                        // Obtener el día un día antes del actual
                        let diaAnterior = new Date(diaHora);
                        diaAnterior.setDate(diaHora.getDate() - 1);
                        let diaAnteriorValor = traducciones[diaAnterior.toLocaleDateString('en-US', { weekday: 'long' })];

                        // Reemplazar el texto del cuarto div con las 3 primeras letras del día anterior al actual
                        document.querySelectorAll('.botons')[3].textContent = diaAnteriorValor.slice(0, 3);

                        // Obtener el día actual
                        let diaActualValor = traducciones[diaHora.toLocaleDateString('en-US', { weekday: 'long' })];

                        // Reemplazar el texto del quinto div con las 3 primeras letras del día actual
                        document.querySelectorAll('.botons')[4].textContent = diaActualValor.slice(0, 3);

                        // Obtener el día siguiente al actual
                        let diaSiguiente = new Date(diaHora);
                        diaSiguiente.setDate(diaHora.getDate() + 1);
                        let diaSiguienteValor = traducciones[diaSiguiente.toLocaleDateString('en-US', { weekday: 'long' })];

                        // Reemplazar el texto del sexto div con las 3 primeras letras del día siguiente al actual
                        document.querySelectorAll('.botons')[5].textContent = diaSiguienteValor.slice(0, 3);



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
                        console.log("No se encontraron datos para cuatro días después del actual.");
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        });
    }
});
