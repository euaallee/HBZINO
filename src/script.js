const mostrarCalendario = document.querySelector('#calendario');

const serie = {
    episodios: [
        { ep1: { titulo: "Episódio 1: Dias Futuros", data: "2025-04-13" }},
        { ep2: { titulo: "Episódio 2: Título não revelado", data: "2025-04-20" }},
        { ep3: { titulo: "Episódio 3: Título não revelado", data: "2025-04-27" }},
        { ep4: { titulo: "Episódio 4: Título não revelado", data: "2025-05-04" }},
        { ep5: { titulo: "Episódio 5: Título não revelado", data: "2025-05-11" }},
        { ep6: { titulo: "Episódio 6: Título não revelado", data: "2025-05-18" }},
        { ep7: { titulo: "Episódio 7: Título não revelado", data: "2025-05-25" }},
    ]
};

function mostrar(a) {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    mostrarCalendario.innerHTML = "";

    a.episodios.forEach((epObj, index) => {
        const key = Object.keys(epObj)[0];
        const episodio = epObj[key];
        const dataEp = new Date(episodio.data + 'T12:00:00');
        const dataEp22h = new Date(episodio.data + 'T22:00:00');

        const div = document.createElement("div");
        const tempoDiv = document.createElement("div");
        tempoDiv.id = `contador-${index}`;
        tempoDiv.style.fontSize = "0.9em";
        tempoDiv.style.color = "gray";

        if (dataEp < hoje) {
            div.innerHTML = `<s>${formatarData(dataEp)} - ${episodio.titulo}</s>`;
            tempoDiv.innerText = "Encerrado ✅";
        } else {
            let linha = "";

            if (
                dataEp.getDate() === hoje.getDate() &&
                dataEp.getMonth() === hoje.getMonth() &&
                dataEp.getFullYear() === hoje.getFullYear()
            ) {
                linha = `<strong style="color: green">${formatarData(dataEp)} - ${episodio.titulo}</strong>`;
            } else {
                linha = `${formatarData(dataEp)} - ${episodio.titulo}`;
            }

            div.innerHTML = linha;

            div.appendChild(tempoDiv);
            mostrarCalendario.appendChild(div); // <-- Agora o tempoDiv está no DOM

            if (new Date() >= dataEp22h) {
                tempoDiv.innerText = "Encerrado ✅";
            } else {
                atualizarContador(index, dataEp22h);
                setInterval(() => atualizarContador(index, dataEp22h), 1000);
            }

            return; // já adicionou tudo
        }

        div.appendChild(tempoDiv);
        mostrarCalendario.appendChild(div);
    });
}

function formatarData(data) {
    return data.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });
}

function atualizarContador(index, fim) {
    const agora = new Date();
    const distancia = fim - agora;

    const el = document.querySelector(`#contador-${index}`);
    if (!el) return;

    if (distancia <= 0) {
        el.innerText = "Encerrado ✅";
        return;
    }

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    let texto = "";

    if (dias > 0) {
        texto = `Faltam ${dias} ${dias === 1 ? "dia" : "dias"}, ${horas
            .toString()
            .padStart(2, '0')}h ${minutos.toString().padStart(2, '0')}m ${segundos
            .toString()
            .padStart(2, '0')}s`;
    } else {
        texto = `Hoje às 22h - ${horas.toString().padStart(2, '0')}h ${minutos
            .toString()
            .padStart(2, '0')}m ${segundos.toString().padStart(2, '0')}s`;
    }

    el.innerText = texto;
}


mostrar(serie);
