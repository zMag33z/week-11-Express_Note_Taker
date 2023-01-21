// hanging variables.  technically do not exist until retrieved from windowlocationpathname /notes.
let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;

// once created- target each classed element by name.
if (window.location.pathname === '/notes') {
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  saveNoteBtn = document.querySelector('.save-note');
  newNoteBtn = document.querySelector('.new-note');
  noteList = document.querySelectorAll('.list-container .list-group');
}

// Show or hide element passed from another function.
const show = (elem) => {
  elem.style.display = 'inline';
};

const hide = (elem) => {
  elem.style.display = 'none';
};

// the title and text area for saving is shared for viewing a saved note.
// when saved note selected this is called to equal the value and is displayed in the shared fields of title and text.
let activeNote = {};

// get method to api for response.
const getNotes = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

// post method to api for response.
const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // here the note is strung so it can be directly pushed into the database.
    body: JSON.stringify(note),
  });

// delete method to api for reponse to delete proper item through id response = new database.
const deleteNote = (noteId) =>
  fetch(`/api/notes/${noteId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

// Hides the save button and allows the textarea to only be readable and not allow change.
const renderActiveNote = () => {
  hide(saveNoteBtn);
  if (activeNote.id) {
    noteTitle.setAttribute('readonly', true);
    noteText.setAttribute('readonly', true);
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
  } else {
    noteTitle.removeAttribute('readonly');
    noteText.removeAttribute('readonly');
    noteTitle.value = '';
    noteText.value = '';
  }
};

// compiles the information to send through fetch then renders information received.
const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value,
  };
  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Event sent to capture specic delete button.
const handleNoteDelete = (e) => {
  e.stopPropagation();

// here the data is being parsed to target id.
  const note = e.target;  
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

// only clear active note data if these two are equal.
  if (activeNote.id === noteId) {
    activeNote = {};
  }

// parsed id sent to fetch then render new information
  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it by parsing it
const handleNoteView = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  renderActiveNote();
};

// Sets the activeNote to an empty object and allows the user to enter a new note
const handleNewNoteView = (e) => {
  activeNote = {};
  renderActiveNote();
};

// Displays save button only when both fields have value.
const handleRenderSaveBtn = () => {

  if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }
};

// Render the list of all notes by title.
const renderNoteList = async (notes) => {
  let jsonNotes = await notes.json();
  if (window.location.pathname === '/notes') {
    noteList.forEach((el) => (el.innerHTML = ''));
  }

// list to hold titles
  let noteListItems = [];

// start creating this element
  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');
    const spanEl = document.createElement('span');
    spanEl.classList.add('list-item-title');
    spanEl.innerText = text;
    liEl.append(spanEl);

// if delete button true, add these classes and event listeners
    if (delBtn) {
// added the eventlistener to view only when delete button true because technically you can't view no saved notes and it errors.
      spanEl.addEventListener('click', handleNoteView); 
      
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-note'
      );
      delBtnEl.addEventListener('click', handleNoteDelete);
      liEl.append(delBtnEl);
    }
    return liEl;
  };

// no saved notes available pass string to title and turn text and delbtn to false above.
  if (jsonNotes.length === 0) {
    noteListItems.push(createLi('No saved Notes', false));
  }

// create title list for above from database info fetched
  jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note);
    noteListItems.push(li);
  });

// **** first load in fetch get
  if (window.location.pathname === '/notes') {
    noteListItems.forEach((note) => noteList[0].append(note));
  }
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => getNotes().then(renderNoteList);

// add listeners to elements if retrieved from fetched get
if (window.location.pathname === '/notes') {
  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  noteTitle.addEventListener('keyup', handleRenderSaveBtn);
  noteText.addEventListener('keyup', handleRenderSaveBtn);
}

getAndRenderNotes();