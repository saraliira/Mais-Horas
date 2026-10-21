// ESTADO DA APLICAÇÃO
let state = JSON.parse(localStorage.getItem('horasup_state')) || {
  config: null,
  atividades: []
};

// ANUNCIADOR DINÂMICO PARA LEITORES DE TELA (aria-live)
function announce(message) {
  const announcer = document.getElementById('aria-announcer');
  announcer.textContent = message;
}

// ROTEAMENTO DA APLICAÇÃO (SPA)
function handleRouting() {
  const hash = window.location.hash || '#dashboard';
  
  if (!state.config && hash !== '#cadastro') {
    window.location.hash = '#cadastro';
    announce("Redirecionado para a tela de configuração do curso.");
    return;
  }

  document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
  document.querySelectorAll('nav a').forEach(a => a.removeAttribute('aria-current'));

  const targetView = document.querySelector(`.view-section${hash.replace('#', '#view-')}`);
  const targetNav = document.querySelector(`nav a[href="${hash}"]`);

  if (targetView) {
    targetView.classList.add('active');
    if (targetNav) targetNav.setAttribute('aria-current', 'page');
    document.getElementById('main-content').focus();
  }

  if (hash === '#dashboard') renderDashboard();
  if (hash === '#atividades') prepareAtividadesForm();
}

window.addEventListener('hashchange', handleRouting);
window.addEventListener('load', handleRouting);

// SALVAR CONFIGURAÇÃO DO CURSO
document.getElementById('form-cadastro').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const config = {
    curso: document.getElementById('curso-nome').value,
    periodos: parseInt(document.getElementById('qtd-periodos').value),
    metaExtensao: parseInt(document.getElementById('meta-extensao').value),
    metaExtracurricular: parseInt(document.getElementById('meta-extracurricular').value)
  };

  state.config = config;
  saveState();
  
  announce("Configurações do curso salvas com sucesso!");
  window.location.hash = '#dashboard';
});

// CÁLCULOS E RENDERIZAÇÃO DO DASHBOARD E DOS CARDS
function renderDashboard() {
  if (!state.config) return;

  const { curso, periodos, metaExtensao, metaExtracurricular } = state.config;
  
  const metaExtensaoTotal = metaExtensao * periodos;
  const metaExtraTotal = metaExtracurricular * periodos;
  const metaTotalCurso = metaExtensaoTotal + metaExtraTotal;

  const horasExtensao = state.atividades
    .filter(a => a.tipo === 'extensao')
    .reduce((acc, a) => acc + a.horas, 0);

  const horasExtra = state.atividades
    .filter(a => a.tipo === 'extracurricular')
    .reduce((acc, a) => acc + a.horas, 0);

  const horasConcluidas = horasExtensao + horasExtra;
  const horasRestantes = Math.max(0, metaTotalCurso - horasConcluidas);

  const pctExtensao = metaExtensaoTotal > 0 ? Math.min(100, Math.round((horasExtensao / metaExtensaoTotal) * 100)) : 0;
  const pctExtra = metaExtraTotal > 0 ? Math.min(100, Math.round((horasExtra / metaExtraTotal) * 100)) : 0;
  const pctGeral = metaTotalCurso > 0 ? Math.min(100, Math.round((horasConcluidas / metaTotalCurso) * 100)) : 0;

  // Atualização dos Cards
  document.getElementById('total-extensao-hrs').textContent = `${horasExtensao}h / ${metaExtensaoTotal}h`;
  document.getElementById('total-extensao-pct').textContent = `${pctExtensao}% Concluído`;

  document.getElementById('total-extra-hrs').textContent = `${horasExtra}h / ${metaExtraTotal}h`;
  document.getElementById('total-extra-pct').textContent = `${pctExtra}% Concluído`;

  // Atualização do Progresso Geral
  document.getElementById('info-curso').textContent = `Curso: ${curso} | Meta Total do Curso: ${metaTotalCurso}h`;
  
  const progressBar = document.getElementById('bar-progresso-total');
  progressBar.style.width = `${pctGeral}%`;
  progressBar.setAttribute('aria-valuenow', pctGeral);
  
  document.getElementById('percentual-texto').textContent = 
    `${pctGeral}% Concluído (${horasConcluidas}h registradas | Faltam ${horasRestantes}h no total)`;

  // Resumo por Bloco
  const resumoContainer = document.getElementById('resumo-blocos');
  resumoContainer.innerHTML = '';

  for (let i = 1; i <= periodos; i++) {
    const atvsBloco = state.atividades.filter(a => a.bloco === i);
    const hrsExtBloco = atvsBloco.filter(a => a.tipo === 'extensao').reduce((acc, a) => acc + a.horas, 0);
    const hrsExtraBloco = atvsBloco.filter(a => a.tipo === 'extracurricular').reduce((acc, a) => acc + a.horas, 0);
    
    const pctExtBloco = metaExtensao > 0 ? Math.min(100, Math.round((hrsExtBloco / metaExtensao) * 100)) : 0;
    const pctExtraBloco = metaExtracurricular > 0 ? Math.min(100, Math.round((hrsExtraBloco / metaExtracurricular) * 100)) : 0;

    const blockEl = document.createElement('div');
    blockEl.className = 'card';
    blockEl.innerHTML = `
      <h4>${i}º Período / Bloco</h4>
      
      <p style="margin-top: 0.5rem;"><strong>Extensão:</strong> ${hrsExtBloco}h de ${metaExtensao}h (${pctExtBloco}%)</p>
      <div class="progress-container">
        <div class="progress-bar-ext" style="width: ${pctExtBloco}%;" role="progressbar" aria-valuenow="${pctExtBloco}" aria-valuemin="0" aria-valuemax="100" aria-label="Extensão do ${i}º bloco"></div>
      </div>

      <p><strong>Extracurricular:</strong> ${hrsExtraBloco}h de ${metaExtraBloco}h (${pctExtraBloco}%)</p>
      <div class="progress-container">
        <div class="progress-bar-extra" style="width: ${pctExtraBloco}%;" role="progressbar" aria-valuenow="${pctExtraBloco}" aria-valuemin="0" aria-valuemax="100" aria-label="Extracurricular do ${i}º bloco"></div>
      </div>
    `;
    resumoContainer.appendChild(blockEl);
  }
}

// FORMULÁRIO E TABELA DE ATIVIDADES
function prepareAtividadesForm() {
  const selectBloco = document.getElementById('bloco-atividade');
  selectBloco.innerHTML = '';

  if (state.config) {
    for (let i = 1; i <= state.config.periodos; i++) {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = `${i}º Período/Bloco`;
      selectBloco.appendChild(opt);
    }
  }

  renderTabelaAtividades();
}

// CADASTRAR OU EDITAR ATIVIDADE
document.getElementById('form-atividade').addEventListener('submit', (e) => {
  e.preventDefault();

  const editId = document.getElementById('atividade-id-edit').value;
  const fileInput = document.getElementById('comprovante-file');
  const file = fileInput.files[0];

  const tipo = document.getElementById('tipo-atividade').value;
  const bloco = parseInt(document.getElementById('bloco-atividade').value);
  const nome = document.getElementById('nome-atividade').value;
  const horas = parseInt(document.getElementById('horas-atividade').value);

  if (editId) {
    // Modo Edição
    const index = state.atividades.findIndex(a => a.id === parseInt(editId));
    if (index !== -1) {
      state.atividades[index].tipo = tipo;
      state.atividades[index].bloco = bloco;
      state.atividades[index].nome = nome;
      state.atividades[index].horas = horas;

      if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
          state.atividades[index].fileName = file.name;
          state.atividades[index].fileData = evt.target.result;
          finalizarAtualizacaoAtividade(`Atividade "${nome}" editada com sucesso.`);
        };
        reader.readAsDataURL(file);
      } else {
        finalizarAtualizacaoAtividade(`Atividade "${nome}" editada com sucesso.`);
      }
    }
  } else {
    // Modo Cadastro
    const novaAtividade = {
      id: Date.now(),
      tipo,
      bloco,
      nome,
      horas,
      fileName: file ? file.name : null,
      fileData: null
    };

    if (file) {
      const reader = new FileReader();
      reader.onload = function(evt) {
        novaAtividade.fileData = evt.target.result;
        state.atividades.push(novaAtividade);
        finalizarAtualizacaoAtividade(`Atividade "${nome}" cadastrada com sucesso.`);
      };
      reader.readAsDataURL(file);
    } else {
      state.atividades.push(novaAtividade);
      finalizarAtualizacaoAtividade(`Atividade "${nome}" cadastrada com sucesso.`);
    }
  }
});

function finalizarAtualizacaoAtividade(mensagem) {
  saveState();
  announce(mensagem);
  resetFormAtividade();
  renderTabelaAtividades();
}

// CANCELAR EDIÇÃO
document.getElementById('btn-cancelar-edicao').addEventListener('click', () => {
  resetFormAtividade();
  announce("Edição cancelada.");
});

function resetFormAtividade() {
  document.getElementById('form-atividade').reset();
  document.getElementById('atividade-id-edit').value = '';
  document.getElementById('titulo-form-atividade').textContent = 'Registrar Atividade ou Projeto';
  document.getElementById('btn-salvar-atividade').textContent = 'Cadastrar Atividade';
  document.getElementById('btn-cancelar-edicao').style.display = 'none';
  document.getElementById('arquivo-atual-info').textContent = '';
}

// INICIAR EDIÇÃO
function editarAtividade(id) {
  const atv = state.atividades.find(a => a.id === id);
  if (!atv) return;

  document.getElementById('atividade-id-edit').value = atv.id;
  document.getElementById('tipo-atividade').value = atv.tipo;
  document.getElementById('bloco-atividade').value = atv.bloco;
  document.getElementById('nome-atividade').value = atv.nome;
  document.getElementById('horas-atividade').value = atv.horas;

  document.getElementById('titulo-form-atividade').textContent = 'Editar Atividade';
  document.getElementById('btn-salvar-atividade').textContent = 'Atualizar Atividade';
  document.getElementById('btn-cancelar-edicao').style.display = 'inline-block';

  const fileInfo = document.getElementById('arquivo-atual-info');
  fileInfo.textContent = atv.fileName ? `Comprovante atual: ${atv.fileName}` : 'Sem comprovante anexo.';

  document.getElementById('form-atividade').scrollIntoView({ behavior: 'smooth' });
  document.getElementById('nome-atividade').focus();
  announce(`Editando atividade ${atv.nome}. Os dados foram carregados no formulário.`);
}

// EXCLUIR ATIVIDADE
function excluirAtividade(id) {
  const atv = state.atividades.find(a => a.id === id);
  if (!atv) return;

  if (confirm(`Tem certeza que deseja excluir a atividade "${atv.nome}"?`)) {
    state.atividades = state.atividades.filter(a => a.id !== id);
    saveState();
    announce(`Atividade "${atv.nome}" foi excluída.`);
    renderTabelaAtividades();
    
    // Se estava editando a atividade que foi excluída, reseta o formulário
    if (document.getElementById('atividade-id-edit').value == id) {
      resetFormAtividade();
    }
  }
}

// RENDERIZAR TABELA COM ÍCONES DE AÇÃO
function renderTabelaAtividades() {
  const tbody = document.getElementById('tabela-corpo');
  tbody.innerHTML = '';

  if (state.atividades.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6">Nenhuma atividade registrada até o momento.</td></tr>';
    return;
  }

  state.atividades.forEach(atv => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${atv.bloco}º Bloco</td>
      <td>${atv.tipo === 'extensao' ? 'Extensão' : 'Extracurricular'}</td>
      <td>${atv.nome}</td>
      <td>${atv.horas}h</td>
      <td>
        ${atv.fileData 
          ? `<a href="${atv.fileData}" download="${atv.fileName}" aria-label="Baixar certificado da atividade ${atv.nome}">Baixar (${atv.fileName})</a>` 
          : 'Sem comprovante'}
      </td>
      <td>
        <div class="actions-cell">
          <button type="button" class="btn-action btn-action-edit" title="Editar atividade" aria-label="Editar atividade ${atv.nome}" onclick="editarAtividade(${atv.id})">
            ✏️
          </button>
          <button type="button" class="btn-action btn-action-delete" title="Excluir atividade" aria-label="Excluir atividade ${atv.nome}" onclick="excluirAtividade(${atv.id})">
            ✖
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function saveState() {
  localStorage.setItem('horasup_state', JSON.stringify(state));
}