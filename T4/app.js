$(document).ready(function () {
  // Carregar dados do XML
  $.ajax({
    url: "alunos.xml",
    dataType: "xml",
    success: function (data) {
      // Construir a grade curricular
      constroiGradeCurriculo(data);
      console.log("Success!");
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert("Erro ao carregar dados do XML.");
      console.error(`${jqXHR}\n${textStatus}\n${errorThrown}`);
    },
  });
});

function constroiGradeCurriculo(xmlData) {
  // Relaciona estudantes x disciplinas
  const disciplinas = {};
  const estudantes = {};
  $(xmlData)
    .find("ALUNO")
    .each(function () {
      const cod = $(this).find("COD_ATIV_CURRIC").text();
      const RA = $(this).find("MATR_ALUNO").text();

      if (!disciplinas[cod]) {
        const nome = $(this).find("NOME_ATIV_CURRIC").text();
        disciplinas[cod] = { nome };
      }

      const status = parseInt($(this).find("SITUACAO_ITEM").text());

      if (!estudantes[RA]) estudantes[RA] = { matriculado: {} };
      estudantes[RA].matriculado[cod] = getStatus(status);
    });

  // Constroi cabeçalho da tabela
  const gradeCurriculo = $("#grade-curriculo");
  const linhaCabecalho = $("<tr>").append("<td></td>");
  for (const [cod, { nome }] of Object.entries(disciplinas)) {
    linhaCabecalho.append(`<td>${cod}<br>${nome}</td>`);
  }
  gradeCurriculo.append(linhaCabecalho);

  // Adiciona uma linha para cada aluno
  for (const [RA, { matriculado }] of Object.entries(estudantes)) {
    const linha = $("<tr>").append(`<td>${RA}</td>`);
    for (const [cod] of Object.entries(disciplinas)) {
      linha.append($("<td>").addClass(matriculado[cod])); // adiciona cor a celular
    }
    gradeCurriculo.append(linha);
  }

  const getInfoCelula = (ctx) => {
    const RAaluno = $(ctx).closest("tr").find("td:first-child").text();
    const idxDisciplinaClicada = $(ctx).index() + 1;
    const codDisciplina = $("#grade-curriculo tr:first")
      .find(`td:nth-child(${idxDisciplinaClicada})`)
      .contents()
      .filter(function () {
        return this.nodeType === 3;
      })
      .first()
      .text();
    return { RAaluno, codDisciplina };
  };

  // Adicionar eventos de clique às células
  gradeCurriculo.on("click", "td", function (event) {
    event.preventDefault();

    if (event.which !== 1) return; // Não é clique com botão esquerdo

    const { RAaluno, codDisciplina } = getInfoCelula(this);

    const ultMatricula = getDadosMatricula(
      xmlData,
      RAaluno,
      codDisciplina
    );

    alert(
      ultMatricula
        ? `Disciplina: ${codDisciplina}\n` +
            `Última vez cursada: ${ultMatricula.ultCursada}\n` +
            `Nota: ${ultMatricula.nota}\n` +
            `Frequência: ${ultMatricula.frequencia}`
        : "Sem inscrição na disciplina"
    );
  });

  gradeCurriculo.on("contextmenu", "td", function (event) {
    event.preventDefault();

    const { RAaluno, codDisciplina } = getInfoCelula(this);
    const historico = getHistoricoMatricula(xmlData, RAaluno, codDisciplina);

    if (historico?.length > 0) {
      let mensagemHistorico = `Histórico para a disciplina ${codDisciplina}:\n`;

      for (let i = 0; i < historico.length; i++) {
        const { anoSemestre, nota, frequencia } = historico[i];

        mensagemHistorico +=
          `Ano/Semestre: ${anoSemestre}\n` +
          `Nota: ${nota}\n` +
          `Frequência: ${frequencia}\n\n`;
      }

      alert(mensagemHistorico);
    } else {
      alert("Sem história para a disciplina");
    }
  });
}

function getStatus(status) {
  //  aprovado       dispensa de disciplina (com nota)
  if (status == 1 || status == 4) {
    return "aprovado";
  }
  // reprovado nota  reprovado freq  cancelado  reprovado sem nota  trancamento total  trancamento administrativo
  if (status == 2 || status == 3 || status == 5 || status == 9 || status == 12 || status == 15) {
    return "reprovado";
  }
  // matricula
  if (status == 10) {
    return "matriculado";
  }
  // equivalencia
  if (status == 11) {
    return "equivalencia";
  }
  return "nao-cursado";
}

function getHistoricoMatricula(xmlData, RAaluno, codDisciplina) {
  const historicoMatricula = [];

  $(xmlData)
    .find("ALUNO")
    .each(function () {
      const RAatual = $(this).find("MATR_ALUNO").text();
      const codDisciplinaAtual = $(this).find("COD_ATIV_CURRIC").text();

      if (RAatual === RAaluno && codDisciplinaAtual === codDisciplina) {
        const anoSemestre = $(this).find("PERIODO").text();
        const nota = $(this).find("MEDIA_FINAL").text();
        const frequencia = $(this).find("FREQUENCIA").text();

        historicoMatricula.push({ anoSemestre, nota, frequencia });
      }
    });

  return historicoMatricula;
}

function getDadosMatricula(xmlData, RAaluno, codDisciplina) {
  const dadosMatricula = $(xmlData)
    .find("ALUNO")
    .filter(function () {
      const RAatual = $(this).find("MATR_ALUNO").text();
      const codDisciplinaAtual = $(this).find("COD_ATIV_CURRIC").text();
      return (
        RAatual === RAaluno && codDisciplinaAtual === codDisciplina
      );
    })
    .last();

  if (!dadosMatricula.length) return null;

  const ultCursada = dadosMatricula.find("PERIODO").text();
  const nota = dadosMatricula.find("MEDIA_FINAL").text();
  const frequencia = dadosMatricula.find("FREQUENCIA").text();

  return { ultCursada, nota, frequencia };
}
