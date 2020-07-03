const form = document.querySelector('#task-form'); 
const taskList = document.querySelector('.collection');
const clearButton = document.querySelector('.clear-tasks'); 
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task'); 

// load all event listeners
loadEventListeners = () => {
   // add task event
   form.addEventListener('submit', addTask)
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

// call function to load all event listeners 
loadEventListeners(); 
