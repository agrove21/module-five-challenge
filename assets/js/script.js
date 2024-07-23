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
    <div class="card task-card mb-3" data id="${task.id}">
     <div class="card-body">
        <h5 class="card-title">${task.title}</h5>
        <p class="card-text">${task.description}</p>
        <p class="card-text"><small class="text-muted">Due: ${dayjs(task.dueDate).format("MMM D,YYYY")}</small></p>
        <button class="btn btn-danger btn-sm delete-task">Delete</button>
     </div>
    </div>`;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const columns = {
        "To Do": $("#todo-cards"),
        "In Progress": $("in-progress-cards"),
        "Done": $(#done-cards),
    };

    columns["To Do"].empty();
    columns["In Progress"].empty();
    columns["Done"].empty();

    taskList.forEach(task => {
        const taskCard = $(createTaskCard(task));
        columns[task.state].append(taskcard);

        if (dayjs().isAfter(dayjs(task.dueDate), 'day')){
            taskCard.addClass("bg-dange text-white");
        } else if (dayjs().isAfter(dayjs(task.dueDate).subtract(2, 'day')) {
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

    const title = $
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {});
