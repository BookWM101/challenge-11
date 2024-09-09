document.addEventListener('DOMContentLoaded', (event) => {
    const clearButton = document.getElementById('clear-form');
    const newNoteButton = document.getElementById('new-note-button');
    const noteForm = document.getElementById('note-form');

    if (clearButton) {
        clearButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent form submission
            noteForm.reset(); // Reset the form fields
        });
    }

    if (newNoteButton) {
        newNoteButton.addEventListener('click', (event) => {
            event.preventDefault();
            noteForm.reset();
            window.location.href = '/notes'; // Redirect to clear any note selection
        });
    }
});
