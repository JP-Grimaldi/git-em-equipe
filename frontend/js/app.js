const API_BASE = window.electronAPI?.apiBaseUrl || 'http://localhost:3000';

const form = document.getElementById('taskForm');
const taskId = document.getElementById('taskId');
const titulo = document.getElementById('titulo');
const descricao = document.getElementById('descricao');
const responsavel = document.getElementById('responsavel');
const prioridade = document.getElementById('prioridade');
const status = document.getElementById('status');
const mensagem = document.getElementById('mensagem');
const listaTarefas = document.getElementById('listaTarefas');
const contador = document.getElementById('contador');
const btnAtualizar = document.getElementById('btnAtualizar');
const btnCancelar = document.getElementById('btnCancelar');
const formTitulo = document.getElementById('formTitulo');

const STATUS_LABELS = {
  pendente: 'Pendente',
  entregue: 'Entregue',
  atrasado: 'Atrasado'
};

function mostrarMensagem(texto, erro = false) {
  mensagem.textContent = texto;
  mensagem.style.color = erro ? '#f87171' : '#38bdf8';
}

function limparMensagem() {
  mensagem.textContent = '';
}

function limparFormulario() {
  taskId.value = '';
  titulo.value = '';
  descricao.value = '';
  if (responsavel) responsavel.value = '';
  if (prioridade) prioridade.value = 'media';
  status.value = 'pendente';
  formTitulo.textContent = 'Cadastrar tarefa';
  btnCancelar.classList.add('oculto');
}

function criarBadgeStatus(valor) {
  return `<span class="badge">${STATUS_LABELS[valor] || valor}</span>`;
}

function escaparHtml(texto = '') {
  return String(texto)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatarData(valor) {
  if (!valor) return 'Sem data';
  const data = new Date(valor);
  if (Number.isNaN(data.getTime())) return 'Sem data';
  return data.toLocaleString('pt-BR');
}

function renderizarTarefas(tarefas) {
  contador.textContent = `${tarefas.length} ${tarefas.length === 1 ? 'tarefa' : 'tarefas'}`;

  if (!tarefas.length) {
    listaTarefas.innerHTML = '<div class="vazio">Nenhuma tarefa cadastrada.</div>';
    return;
  }

  listaTarefas.innerHTML = tarefas.map((tarefa) => `
    <article class="task-item">
      <div class="task-topo">
        <div>
          <h3>${escaparHtml(tarefa.name)}</h3>
          <p>${escaparHtml(tarefa.description)}</p>
        </div>
        ${criarBadgeStatus(tarefa.status)}
      </div>
      <div class="task-meta">
        <span class="badge">ID: ${tarefa.id}</span>
        <span class="badge">Criada em: ${formatarData(tarefa.created_at)}</span>
      </div>
      <div class="task-acoes">
        <button class="btn" data-editar="${tarefa.id}">Editar</button>
        <button class="btn btn-secundario" data-excluir="${tarefa.id}">Excluir</button>
      </div>
    </article>
  `).join('');
}

async function lerRespostaJson(resposta) {
  const texto = await resposta.text();

  if (!texto) {
    return {};
  }

  try {
    return JSON.parse(texto);
  } catch {
    throw new Error('O back-end respondeu fora do padrão JSON. Verifique se a API iniciou corretamente.');
  }
}

async function carregarTarefas() {
  limparMensagem();

  try {
    const resposta = await fetch(`${API_BASE}/trabalhos`);
    const dados = await lerRespostaJson(resposta);

    if (!resposta.ok) {
      throw new Error(dados.error || 'Erro ao carregar tarefas.');
    }

    renderizarTarefas(Array.isArray(dados.data) ? dados.data : []);
  } catch (error) {
    listaTarefas.innerHTML = '<div class="vazio">Não foi possível conectar ao back-end.</div>';
    mostrarMensagem(error.message || 'Erro ao carregar tarefas.', true);
  }
}

async function salvarTarefa(event) {
  event.preventDefault();
  limparMensagem();

  const payload = {
    name: titulo.value.trim(),
    description: descricao.value.trim(),
    status: status.value
  };

  if (!payload.name || !payload.description || !payload.status) {
    mostrarMensagem('Preencha título, descrição e status.', true);
    return;
  }

  const id = taskId.value;
  const url = id ? `${API_BASE}/trabalhos/${id}` : `${API_BASE}/trabalhos`;
  const method = id ? 'PUT' : 'POST';

  try {
    const resposta = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const dados = await lerRespostaJson(resposta);

    if (!resposta.ok) {
      throw new Error(dados.error || 'Erro ao salvar tarefa.');
    }

    mostrarMensagem(dados.message || 'Tarefa salva com sucesso.');
    limparFormulario();
    await carregarTarefas();
  } catch (error) {
    mostrarMensagem(error.message || 'Erro ao salvar tarefa.', true);
  }
}

function preencherFormulario(tarefa) {
  taskId.value = tarefa.id;
  titulo.value = tarefa.name || '';
  descricao.value = tarefa.description || '';
  if (responsavel) responsavel.value = '';
  if (prioridade) prioridade.value = 'media';
  status.value = tarefa.status || 'pendente';
  formTitulo.textContent = 'Editar tarefa';
  btnCancelar.classList.remove('oculto');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function buscarTarefaPorId(id) {
  try {
    const resposta = await fetch(`${API_BASE}/trabalhos`);
    const dados = await lerRespostaJson(resposta);
    if (!resposta.ok) {
      throw new Error(dados.error || 'Erro ao buscar tarefa.');
    }

    const tarefa = (dados.data || []).find((item) => String(item.id) === String(id));
    if (!tarefa) {
      throw new Error('Tarefa não encontrada para edição.');
    }

    preencherFormulario(tarefa);
  } catch (error) {
    mostrarMensagem(error.message || 'Erro ao buscar tarefa.', true);
  }
}

async function excluirTarefa(id) {
  if (!window.confirm('Deseja excluir esta tarefa?')) return;

  limparMensagem();

  try {
    const resposta = await fetch(`${API_BASE}/trabalhos/${id}`, {
      method: 'DELETE'
    });

    const dados = await lerRespostaJson(resposta);

    if (!resposta.ok) {
      throw new Error(dados.error || 'Erro ao excluir tarefa.');
    }

    mostrarMensagem(dados.message || 'Tarefa excluída com sucesso.');

    if (String(taskId.value) === String(id)) {
      limparFormulario();
    }

    await carregarTarefas();
  } catch (error) {
    mostrarMensagem(error.message || 'Erro ao excluir tarefa.', true);
  }
}

listaTarefas.addEventListener('click', (event) => {
  const botaoEditar = event.target.closest('[data-editar]');
  const botaoExcluir = event.target.closest('[data-excluir]');

  if (botaoEditar) {
    buscarTarefaPorId(botaoEditar.dataset.editar);
    return;
  }

  if (botaoExcluir) {
    excluirTarefa(botaoExcluir.dataset.excluir);
  }
});

form.addEventListener('submit', salvarTarefa);
btnCancelar.addEventListener('click', limparFormulario);
btnAtualizar.addEventListener('click', carregarTarefas);
window.addEventListener('DOMContentLoaded', carregarTarefas);
