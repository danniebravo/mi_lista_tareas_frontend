const form = document.getElementById('taskForm');
const input = document.getElementById('taskInput');
const list = document.getElementById('taskList');
const emptyMessage = document.getElementById('emptyMessage');
const totalCount = document.getElementById('totalCount');
const pendingCount = document.getElementById('pendingCount');
const doneCount = document.getElementById('doneCount');
const clearDoneButton = document.getElementById('clearDone');

let tasks = [];

document.getElementById('today').textContent = new Intl.DateTimeFormat('es-CO', {
  weekday: 'long', day: 'numeric', month: 'long'
}).format(new Date());

async function api(path, options = {}) {
  const response = await fetch(`/api${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `Error HTTP ${response.status}`);
  }
  if (response.status === 204) return null;
  return response.json();
}

function renderTasks() {
  list.innerHTML = '';
  tasks.forEach(task => {
    const item = document.createElement('li');
    item.className = `task-item${task.completed ? ' completed' : ''}`;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.setAttribute('aria-label', `Marcar ${task.name} como completada`);
    checkbox.addEventListener('change', async () => {
      try {
        await api(`/tasks/${task.id}`, {
          method: 'PATCH',
          body: JSON.stringify({ completed: checkbox.checked })
        });
        await loadTasks();
      } catch (error) { alert(error.message); }
    });

    const name = document.createElement('span');
    name.className = 'task-name';
    name.textContent = task.name;

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'delete-button';
    remove.textContent = 'Eliminar';
    remove.addEventListener('click', async () => {
      try {
        await api(`/tasks/${task.id}`, { method: 'DELETE' });
        await loadTasks();
      } catch (error) { alert(error.message); }
    });

    item.append(checkbox, name, remove);
    list.appendChild(item);
  });

  const completed = tasks.filter(task => task.completed).length;
  totalCount.textContent = tasks.length;
  pendingCount.textContent = tasks.length - completed;
  doneCount.textContent = completed;
  emptyMessage.hidden = tasks.length > 0;
  clearDoneButton.hidden = completed === 0;
}

async function loadTasks() {
  tasks = await api('/tasks');
  renderTasks();
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  const name = input.value.trim();
  if (!name) return;
  try {
    await api('/tasks', { method: 'POST', body: JSON.stringify({ name }) });
    form.reset();
    input.focus();
    await loadTasks();
  } catch (error) { alert(error.message); }
});

clearDoneButton.addEventListener('click', async () => {
  try {
    await api('/tasks/completed', { method: 'DELETE' });
    await loadTasks();
  } catch (error) { alert(error.message); }
});

loadTasks().catch(error => {
  emptyMessage.hidden = false;
  emptyMessage.textContent = `No se pudo conectar con el servidor: ${error.message}`;
});
