const form = document.querySelector('#task-form'); 
const taskList = document.querySelector('.collection');
const clearButton = document.querySelector('.clear-tasks'); 
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task'); 

// load all event listeners
loadEventListeners = () => {
   // add task event
   form.addEventListener('submit', addTask);
   // remove task event
   taskList.addEventListener('click', removeTask);
   // clear tasks event
   clearButton.addEventListener('click', clearTasks);
   // filter tasks event
   filter.addEventListener('keyup', filterTasks); 
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

   // clear input field 
   taskInput.value = '';

   event.preventDefault(); 
}

removeTask = (event) => {
   if (event.target.parentElement.classList.contains('delete-item')) {
      if (confirm('Are you sure?')) {
         event.target.parentElement.parentElement.remove();   
      }
   }
}

clearTasks = () => {
   // while there is still a first child element, remove it
   while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild)
   }
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
