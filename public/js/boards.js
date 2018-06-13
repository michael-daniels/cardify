document.getElementById('addBoardPlus').addEventListener('click', () => {
  document.getElementById('createBoardForm').style.display = "block";
  document.getElementById('addBoardPlus').style.display = "none";
})

function displayBoardNameEditInput(id) {
  document.getElementById('id').style.display = "block";
  document.getElementById('boardName').style.display = "none";
}
