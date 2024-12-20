document.addEventListener("DOMContentLoaded", () => {
    const taskform = document.getElementById("task-form");
    const tasknameinput = document.getElementById("task-name");
    const taskdateinput = document.getElementById("task-date");
    const taskpriorityinput = document.getElementById("task-priority");
  
    const todaytasks = document.getElementById("today-tasks");
    const futuretasks = document.getElementById("future-tasks");
    const completedtasks = document.getElementById("completed-tasks");
  
    const tasks = [];
  
    const addtask = (task) => {
      tasks.push(task);
      displaytasks();
    };
  
    const deletetask = (taskIndex) => {
      tasks.splice(taskIndex, 1);
      displaytasks();
    };
  
    const togglecompletion = (taskIndex) => {
      tasks[taskIndex].completed = !tasks[taskIndex].completed;
      displaytasks();
    };
  
    const displaytasks = () => {
      todaytasks.innerHTML = "";
      futuretasks.innerHTML = "";
      completedtasks.innerHTML = "";
  
      const today = new Date().toISOString().split("T")[0];
  
      tasks.forEach((task, index) => {
        const li = document.createElement("li");
  
        // Task details
        const taskdetails = document.createElement("div");
        taskdetails.classList.add("task-details");
        taskdetails.innerHTML = `
          <span><strong>Name:</strong> ${task.name}</span>
          <span><strong>Date:</strong> ${task.date}</span>
          <span><strong>Priority:</strong> ${task.priority}</span>
        `;
  
        // Task actions (buttons)
        const taskActions = document.createElement("div");
        taskActions.classList.add("task-actions");
  
        const completebtn = document.createElement("button");
        completebtn.textContent = task.completed ? "Undo" : "Complete";
        completebtn.classList.add("complete");
        completebtn.addEventListener("click", () => togglecompletion(index));
  
        const deletebtn = document.createElement("button");
        deletebtn.textContent = "Delete";
        deletebtn.classList.add("delete");
        deletebtn.addEventListener("click", () => deletetask(index));
  
        taskActions.appendChild(completebtn);
        taskActions.appendChild(deletebtn);
  
        li.appendChild(taskdetails);
        li.appendChild(taskActions);
  
        if (task.completed) {
          li.classList.add("completed");
          completedtasks.appendChild(li);
        } else if (task.date === today) {
          todaytasks.appendChild(li);
        } else {
          futuretasks.appendChild(li);
        }
      });
    };
  
    taskform.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const taskname = tasknameinput.value.trim();
      const taskdate = taskdateinput.value;
      const taskpriority = taskpriorityinput.value;
  
      if (!taskname || !taskdate) return alert("All fields are required!");
  
      const newtask = {
        name: taskname,
        date: taskdate,
        priority: taskpriority,
        completed: false,
      };
  
      addtask(newtask);
  
      // Reset the form
      tasknameinput.value = "";
      taskdateinput.value = "";
      taskpriorityinput.value = "high";
    });
  
    displaytasks();
  });
  