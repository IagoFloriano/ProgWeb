const MAX_DIST = 20;

let linhas = [];
let idxLinhaSelecionada = -1;

function geraRGBAleatorio() {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}

function criaPoligono(numLados, { x, y }, r) {
    for (let i = 0; i < numLados; i++) {
        const angle = (2 * Math.PI * i) / numLados;
        const x1 = x + r * Math.cos(angle);
        const y1 = y + r * Math.sin(angle);
        const x2 = x + r * Math.cos(angle + (2 * Math.PI) / numLados);
        const y2 = y + r * Math.sin(angle + (2 * Math.PI) / numLados);
        linhas.push({ x1, y1, x2, y2, rgb: geraRGBAleatorio() });
    }
};

function desenhaLinhas(linhas, ctx) {
    linhas.forEach(({ rgb, x1, y1, x2, y2 }) => {
        ctx.strokeStyle = rgb;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    });
}

function encontraIdxLinha(x, y) {
    let idxPerto = -1;
    let menorDistancia = Infinity;

    linhas.forEach(({ x1, y1, x2, y2 }, idx) => {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy);
        let distancia;

        if (t >= 0 && t <= 1) {
            const xPerto = x1 + t * dx;
            const yPerto = y1 + t * dy;
            distancia = Math.sqrt((xPerto - x) ** 2 + (yPerto - y) ** 2);
        } else { // Se ponto mais próximo está fora da linha, calcular a distância pro ponto mais perto
            distancia = Math.min(
                Math.sqrt((x - x1) ** 2 + (y - y1) ** 2),
                Math.sqrt((x - x2) ** 2 + (y - y2) ** 2)
            );
        }

        if (distancia < menorDistancia && distancia < MAX_DIST) {
            idxPerto = idx;
            menorDistancia = distancia;
        }
    });

    // console.log(`Encontrado idx da linha: ${idxPerto} (${menorDistancia} unidades)`);
    return idxPerto;
}

function moveLinhas({x, y}, ctx) {
    linhas.forEach(({ x1, y1, x2, y2 }, index) => {
        if (Math.abs(x - x1) < MAX_DIST && Math.abs(y - y1) < MAX_DIST) {
            linhas[index].x1 = x;
            linhas[index].y1 = y;
        } else if (Math.abs(x - x2) < MAX_DIST && Math.abs(y - y2) < MAX_DIST) {
            linhas[index].x2 = x;
            linhas[index].y2 = y;
        } else if (index === idxLinhaSelecionada) {
            const dx = x - (x1 + x2) / 2;
            const dy = y - (y1 + y2) / 2;
            linhas[index].x1 += dx;
            linhas[index].y1 += dy;
            linhas[index].x2 += dx;
            linhas[index].y2 += dy;
        }
    });

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    desenhaLinhas(linhas, ctx);
}

function cortaLinha({x, y}, ctx) {
    idxLinhaSelecionada = encontraIdxLinha(x, y);
    const { x1, x2, y1, y2, rgb } = linhas[idxLinhaSelecionada];

    linhas.splice(idxLinhaSelecionada, 1, { x1, y1, x2: x, y2: y, rgb });
    linhas.splice(idxLinhaSelecionada + 1, 0, { x1: x, y1: y, x2, y2, rgb: geraRGBAleatorio() });

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    desenhaLinhas(linhas, ctx);
}

$(document).ready(() => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    focus();
    let numLados = prompt("Digite um número para ser o número de lados do polígono (deve ser um número de 3 a 8)", "3");
    numLados = Math.max(3, Math.min(8, parseInt(numLados)));

    criaPoligono(numLados, { x: 400, y: 300 }, 200);
    desenhaLinhas(linhas, ctx);

    canvas.addEventListener('mousedown', ({ clientX, clientY }) => {
        const { left, top } = canvas.getBoundingClientRect();
        const x = clientX - left;
        const y = clientY - top;

        idxLinhaSelecionada = encontraIdxLinha(x, y);
    });

    canvas.addEventListener('mouseup', () => {
        idxLinhaSelecionada = -1;
    });

    canvas.addEventListener('mousemove', ({ clientX, clientY }) => {
        if (idxLinhaSelecionada === -1) return;
        const { left, top } = canvas.getBoundingClientRect();
        moveLinhas({x: clientX-left, y: clientY-top}, ctx);
    });

    canvas.addEventListener('contextmenu', e => {
        e.preventDefault();
        const { left, top } = canvas.getBoundingClientRect();
        cortaLinha({x: e.clientX-left, y: e.clientY-top}, ctx);

        return false;
    });
});
