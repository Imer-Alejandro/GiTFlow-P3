document.addEventListener("DOMContentLoaded", function () {
    const noteForm = document.getElementById("noteForm");
    const titleInput = document.getElementById("title");
    const contentInput = document.getElementById("content");
    const editIndexInput = document.getElementById("editIndex");
    const notesList = document.getElementById("notesList");
  
    // Mostrar las notas al cargar
    renderNotes();
 
  
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
  