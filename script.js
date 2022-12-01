let todoInupt, infoError, addBtn, ulList, newTask
let popup, popupInfo, popupInput, todoToEdit
let popupApproveBtn, popupCancelBtn



const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
}

const prepareDOMElements = () => {
  todoInput = document.querySelector('.todo-input')
  infoError = document.querySelector('.info-error')
  addBtn = document.querySelector('.add-btn')
  ulList = document.querySelector('.todo-list ul')
  popup = document.querySelector('.popup')
  popupInfo = document.querySelector('.popup-info')
  popupInput = document.querySelector('.popup-input')
  popupApproveBtn = document.querySelector('.accept')
  popupCancelBtn = document.querySelector('.cancel')
}

const prepareDOMEvents = () => {
  addBtn.addEventListener('click', addNewTask)
  ulList.addEventListener('click', checkClick)
  popupCancelBtn.addEventListener('click', closePopup)
  popupApproveBtn.addEventListener('click', changeTodoText)
  todoInput.addEventListener('keyup', enterKeyCheck)
}

const addNewTask = () => {
  if (todoInput.value !== '') {
    newTask = document.createElement('li');
    newTask.textContent = todoInput.value;
    createTools();
    ulList.append(newTask); //dodajemy do naszej listy nowy task


    todoInput.value='';
    infoError.textContent = '';
  } else {
    infoError.textContent = 'Wpisz treść zadania!'
  }
}


const createTools = () => {
//tworzymy pasek narzędzi dla nowego taska
const newDiv = document.createElement('div');
newDiv.classList.add('tools')//dodajemy klasę z odpowienimi wymiarami dla paska narzędzi
newTask.append(newDiv); //dodajemy nowy div dla nowego taska

//tworzymy trzy przyciski do nowego diva (dla nowego taska)
const btnComplete = document.createElement('btn');
btnComplete.classList.add('complete')
btnComplete.classList.add('tBtn')
btnComplete.innerHTML = '<i class="fa-solid fa-check"></i>'

const btnEdit = document.createElement('btn');
btnEdit.classList.add('edit')
btnEdit.classList.add('tBtn')
btnEdit.textContent = 'EDIT'

const btnDelete = document.createElement('btn');
btnDelete.classList.add('delete')
btnDelete.classList.add('tBtn')
btnDelete.innerHTML = '<i class="fa-solid fa-xmark"></i>'

//dodajemy trzy przyciski do nowego diva (dla nowego taska)
newDiv.append(btnComplete, btnEdit, btnDelete)
}

const checkClick = e => {
  if (e.target.matches('.complete')) { //jak kliknę na check to wskaże na rodzica czyli li - czyli tekst
  e.target.closest('li').classList.toggle('completed');
  e.target.classList.toggle('completed');
} else if (e.target.matches('.edit')) {
    editTodo(e);
} else if (e.target.matches('.delete')) {
deleteTodo(e);
  }
}

const editTodo = e => {
  todoToEdit = e.target.closest('li'); //zwraca nam najblizsze li przycisku, który wywołał zdarzenie (najbliższym li jest tekst)
  popupInput.value = todoToEdit.firstChild.textContent;
  popup.style.display = 'flex';
}

const closePopup = () => {
    popup.style.display = 'none';
    popupInfo.textContent = '';
}

const changeTodoText = () => {
  if (popupInput.value !== '') {
todoToEdit.firstChild.textContent = popupInput.value
popup.style.display = 'none';
popupInfo.textContent = '';
} else {
popupInfo.textContent = 'Musisz podać treść zadania'
}
}

const deleteTodo = e => {
   e.target.closest('li').remove(); //zwraca nam najblizsze li przycisku, który wywołał zdarzenie (najbliższym li jest tekst)

const allTodos = ulList.querySelectorAll('li')

if (allTodos.length === 0) {
  infoError.textContent = 'Brak zadań na liście'
}
}

const enterKeyCheck = e => {
  if (e.key === 'Enter') {
    addNewTask();
  }
}

document.addEventListener('DOMContentLoaded', main)
