document.addEventListener("DOMContentLoaded", function () {
    const noteForm = document.getElementById("noteForm");
    const titleInput = document.getElementById("title");
    const contentInput = document.getElementById("content");
    const editIndexInput = document.getElementById("editIndex");
    const notesList = document.getElementById("notesList");

    // Mostrar las notas al cargar
    renderNotes(); 
  
    // Evento del formulario
    noteForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const title = titleInput.value;
      const content = contentInput.value;
      const editIndex = editIndexInput.value;
  
      if (editIndex === "") {
        // Crear nueva nota
        const newNote = { title, content };
        const notes = getNotes();
        notes.push(newNote);
        saveNotes(notes);
      } else {
        // Editar nota existente
        const notes = getNotes();
        notes[editIndex] = { title, content };
        saveNotes(notes);
        editIndexInput.value = "";
      }
  
      noteForm.reset();
      renderNotes();
    });
  
    function getNotes() {
      return JSON.parse(localStorage.getItem("notes")) || [];
    }
  
    function saveNotes(notes) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  
    function deleteNote(index) {
      const notes = getNotes();
      notes.splice(index, 1);
      saveNotes(notes);
      renderNotes();
    }

  
    function editNote(index) {
      const notes = getNotes();
      const note = notes[index];
      titleInput.value = note.title;
      contentInput.value = note.content;
      editIndexInput.value = index;
    }

  
    function renderNotes() {
      notesList.innerHTML = "";
      const notes = getNotes();
  
      notes.forEach((note, index) => {
        const col = document.createElement("div");
        col.className = "col-md-4 mb-3";
        col.innerHTML = `
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">${note.title}</h5>
              <p class="card-text">${note.content}</p>
              <button class="btn btn-sm btn-warning me-2" onclick="editNote(${index})">Editar</button>
              <button class="btn btn-sm btn-danger" onclick="deleteNote(${index})">Eliminar</button>
            </div>
          </div>
        `;
        notesList.appendChild(col);
      });
    }
  });
  