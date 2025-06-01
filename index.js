let tasks = [];

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text === "") return;

  const timestamp = new Date().toLocaleString();
  tasks.push({ text, timestamp, completed: false });
  input.value = "";
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task-item";
    if (task.completed) {
      li.classList.add("completed");
    }

    // Header: Text input + Actions
    const header = document.createElement("div");
    header.className = "task-header";

    const textInput = document.createElement("input");
    textInput.type = "text";
    textInput.value = task.text;
    textInput.disabled = true;

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.onclick = () => {
      if (textInput.disabled) {
        textInput.disabled = false;
        textInput.focus();
        editBtn.textContent = "💾";
      } else {
        const newText = textInput.value.trim();
        if (newText !== "") {
          tasks[index].text = newText;
        }
        textInput.disabled = true;
        editBtn.textContent = "✏️";
        renderTasks();
      }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      renderTasks();
    };

    const completeBtn = document.createElement("button");
    completeBtn.textContent = task.completed ? "↩️" : "✅";
    completeBtn.onclick = () => {
      tasks[index].completed = !task.completed;
      renderTasks();
    };

    actions.append(completeBtn, editBtn, deleteBtn);
    header.append(textInput, actions);

    // Footer: Timestamp
    const footer = document.createElement("div");
    footer.className = "task-footer";
    footer.textContent = `Added: ${task.timestamp}`;

    li.append(header, footer);
    list.appendChild(li);
  });
}
