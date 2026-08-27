function relogio() {
    let agora = new Date();

    let hora = String(agora.getHours()).padStart(2, "0");
    let minuto = String(agora.getMinutes()).padStart(2, "0");
    let segundo = String(agora.getSeconds()).padStart(2, "0");

    document.getElementById("relogio").textContent =
        hora + ":" + minuto + ":" + segundo;
}

setInterval(relogio, 1000);
relogio();

async function buscarTemperatura() {
    let cidade = document.getElementById("cidade").value;

    try {
        let resposta = await fetch(
            "https://geocoding-api.open-meteo.com/v1/search?name=" +
            encodeURIComponent(cidade) +
            "&count=1&language=pt&format=json"
        );

        let dados = await resposta.json();

        if (!dados.results) {
            document.getElementById("temperatura").textContent =
                "Cidade não encontrada.";
            return;
        }

        let local = dados.results[0];

        let clima = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=" +
            local.latitude +
            "&longitude=" +
            local.longitude +
            "&current=temperature_2m&temperature_unit=celsius"
        );

        let dadosClima = await clima.json();

        document.getElementById("nomeCidade").textContent = local.name;

        document.getElementById("temperatura").textContent =
            "Temperatura: " + dadosClima.current.temperature_2m + " °C";

    } catch (erro) {
        document.getElementById("temperatura").textContent =
            "Erro ao buscar a temperatura.";
    }
}

buscarTemperatura();
