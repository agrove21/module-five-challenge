// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Todo: create a function to generate a unique task id
function generateTaskId() {
  return nextId++;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    return `
      <div class="card task-card mb-3" data-id="${task.id}">
        <div class="card-body">
          <h5 class="card-title">${task.title}</h5>
          <p class="card-text">${task.description}</p>
          <p class="card-text"><small class="text-muted">Due: ${dayjs(task.dueDate).format('MMM D, YYYY')}</small></p>
          <button class="btn btn-danger btn-sm delete-task">Delete</button>
        </div>
      </div>`;
  }

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const columns = {
      "To Do": $("#todo-cards"),
      "in-progress": $("#in-progress-cards"),
      "done": $("#done-cards")
    };
  
    columns["To Do"].empty();
    columns["in-progress"].empty();
    columns["done"].empty();
  
    taskList.forEach(task => {
      const taskCard = $(createTaskCard(task));
      columns[task.state].append(taskCard);
  
      if (dayjs().isAfter(dayjs(task.dueDate), 'day')) {
        taskCard.addClass("bg-danger text-white");
      } else if (dayjs().isAfter(dayjs(task.dueDate).subtract(2, 'day'))) {
        taskCard.addClass("bg-warning text-dark");
      }
  
      taskCard.draggable({
        revert: "invalid",
        stack: ".task-card",
        cursor: "move"
      });
    });
  
    $(".lane").droppable({
      accept: ".task-card",
      drop: handleDrop
    });
  }

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();

    const title = $("#task-title").val();
    const description = $("#task-description").val();
    const dueDate = $("#task-due-date").val();
  
    const newTask = {
      id: generateTaskId(),
      title,
      description,
      dueDate,
      state: "To Do"
    };

    taskList.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    localStorage.setItem("nextId", JSON.stringify(nextId));
    renderTaskList();
    $("#formModal").modal('hide');
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    const taskId = $(event.target).closest(".task-card").data("id");
    taskList = taskList.filter(task => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
  }

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const taskId = ui.draggable.data("id");
    const newState = $(this).closest(".lane").attr("id").replace("-cards", "");
    taskList = taskList.map(task => {
      if (task.id === taskId) task.state = newState;
      return task;
    });
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
  }

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();
  
    $("#add-task-form").on("submit", handleAddTask);
    $(document).on("click", ".delete-task", handleDeleteTask);
  
    $("#task-due-date").datepicker({
      dateFormat: "yy-mm-dd"
    });

    $("#formModal").on('show.bs.modal', function(e){
      $("#add-task-form")[0].reset();
    })
  });
