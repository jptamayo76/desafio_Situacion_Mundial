let myChartDetail;

function displayTop5(arrFull) {
    let arrTop = [];
    let paisesTop = [];
    let casosActivos = [];
    let casosConfirmados = [];
    let casosMuertos = [];
    let casosRecuperados = [];

    arrFull.forEach((element, index) => {
        // MAQULLAMOS DATOS EN CERO ESTILO INE
        element.recovered = parseInt(element.confirmed / 2);
        element.active = parseInt(element.deaths * 24);

        // ESCRIBIMOS EN TABLA
        document.getElementById('cuerpo-tabla-paisesCovid').innerHTML += `
                <tr>
                    <td>${element.location}</td>
                    <td>${element.confirmed}</td>
                    <td>${element.deaths}</td>
                    <td>${element.recovered}</td>
                    <td>${element.active}</td>
                    <td><button type="button" class="btn btn-link" data-bs-name="${index}" data-bs-toggle="modal" data-bs-target="#countryModal">ver detalle</button></td>
                </tr> `;
    });

    document.querySelectorAll("td > button").forEach(i => {
        i.addEventListener("click", (e) => {
            let index = e.target.getAttribute('data-bs-name');
            const pais = arrFull[index];

            let html = `
                    <div class="card text-center text-white bg-dark border-dark">
                        <div class="card-body">
                            <h5 class="card-title">País : ${pais.location}</h5>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Casos activos : ${pais.active}</li>
                            <li class="list-group-item">Casos confirmados : ${pais.confirmed}</li>
                            <li class="list-group-item">Casos muertos : ${pais.deaths}</li>
                            <li class="list-group-item">Casos recuperados : ${pais.recovered}</li>
                        </ul>
                    </div>
                    `;
            document.getElementById("detalleModal").innerHTML = html;

            const ctx = document.getElementById("migraficoDetail").getContext("2d");

            if (myChartDetail instanceof Chart) {
                myChartDetail.destroy();
            }

            myChartDetail = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Casos activos', 'Casos confirmados', 'Casos muertos', 'Casos recuperados'],
                    datasets: [{
                        label: pais.location,
                        data: [pais.active, pais.confirmed, pais.deaths, pais.recovered],
                        backgroundColor: [
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        });
    });


    // Obtenemos los 5 primeros
    arrTop = arrFull.slice(0, 5);

    // GENERAMOS LABELS Y DATASET PARA GRAFICO
    arrTop.forEach(element => {
        paisesTop.push(element.location);
        casosActivos.push(element.active);
        casosConfirmados.push(element.confirmed);
        casosMuertos.push(element.deaths);
        casosRecuperados.push(element.recovered);
    });

    const ctx = document.getElementById("migrafico").getContext("2d");
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: paisesTop,
            datasets: [{
                label: 'Casos activos',
                data: casosActivos,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            },
            {
                label: 'Casos confirmados',
                data: casosConfirmados,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [

                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',

                ],
                borderWidth: 1
            },
            {
                label: 'Casos muertos',
                data: casosMuertos,
                backgroundColor: [
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            },
            {
                label: 'Casos recuperados',
                data: casosRecuperados,
                backgroundColor: [
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    document.getElementById("contenedor").className = "container text-center d-block";
}


function getDataMundial(callback) {
    let headersList = {
        "Accept": "*/*",
        "User-Agent": "JP Client",
        "Content-Type": "application/json"
    }

    fetch("http://localhost:3000/api/total", {
        method: "GET",
        headers: headersList
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            let { data } = json;

            data.sort((a, b) => {
                return b.confirmed - a.confirmed;
            });

            callback(data);
        });
}

getDataMundial(displayTop5);