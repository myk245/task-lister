const form = document.querySelector('#task-form'); 
const taskList = document.querySelector('.collection');
const clearButton = document.querySelector('.clear-tasks'); 
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task'); 

// load all event listeners
loadEventListeners = () => {
   // DOM Load event 
   document.addEventListener('DOMContentLoaded', getTasks); 
   // add task event
   form.addEventListener('submit', addTask);
   // remove task event
   taskList.addEventListener('click', removeTask);
   // clear tasks event
   clearButton.addEventListener('click', clearTasks);
   // filter tasks event
   filter.addEventListener('keyup', filterTasks); 
}

getTasks = () => {
   let tasks;
   if (localStorage.getItem('tasks') === null) {
      tasks = [];
   } else {
      // local storage can only store strings
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }

   tasks.forEach(task => {
      const li = document.createElement('li');
      li.className = 'collection-item';
      li.appendChild(document.createTextNode(task));

      const link = document.createElement('a');
      link.className = 'delete-item secondary-content';
      // x icon for delete button
      link.innerHTML = '<i class="fa fa-remove"></i>';

      li.appendChild(link);
      taskList.appendChild(li);
   })
}

addTask = (event) => {
   if (taskInput === '') {
      alert('Add a task!')
   }

   const li = document.createElement('li');
   li.className = 'collection-item';
   li.appendChild(document.createTextNode(taskInput.value)); 

   const link = document.createElement('a');
   link.className = 'delete-item secondary-content'; 
   // x icon for delete button
   link.innerHTML = '<i class="fa fa-remove"></i>';

   li.appendChild(link);
   taskList.appendChild(li);

   // store in local storage
   storeTasks(taskInput.value); 

   // clear input field 
   taskInput.value = '';

   event.preventDefault(); 
}

storeTasks = (task) => {
   let tasks; 
   if (localStorage.getItem('tasks') === null) {
      tasks = [];
   } else {
      // local storage can only store strings
      tasks = JSON.parse(localStorage.getItem('tasks')); 
   }
   tasks.push(task); 
   localStorage.setItem('tasks', JSON.stringify(tasks));
}

removeTask = (event) => {
   if (event.target.parentElement.classList.contains('delete-item')) {
      if (confirm('Are you sure?')) {
         event.target.parentElement.parentElement.remove();   
      
      // remove task from local storage
         removeTaskFromLocalStorage(event.target.parentElement.parentElement);
      }
   }
}

// remove from local storage
removeTaskFromLocalStorage = (taskItem) => {
   let tasks;
   if (localStorage.getItem('tasks') === null) {
      tasks = [];
   } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }

   // loop through tasks stored in local storage and if a task 
   // item matches the task we want to delete, we remove it from 
   // the array of tasks in local storage
   tasks.forEach((task, index) => {
      if (taskItem.textContent === task) {
         tasks.splice(index, 1)
      }
   })

   localStorage.setItem('tasks', JSON.stringify(tasks));
}

clearTasks = () => {
   // while there is still a first child element, remove it
   while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild)
   }

   // clear from local storage
   clearTasksFromLocalStorage();
}

clearTasksFromLocalStorage = () => {
   localStorage.clear(); 
}

filterTasks = (event) => {
   const text = event.target.value.toLowerCase(); 
   document.querySelectorAll('.collection-item').forEach(function (task) {
      const item = task.firstChild.textContent; 
      // if there is no match, the index of text will equal -1
      if (item.toLowerCase().indexOf(text) != -1) {
         task.style.display = 'block'; 
      } else {
         task.style.display = 'none'; 
      }
   });
}

// call function to load all event listeners 
loadEventListeners(); 
