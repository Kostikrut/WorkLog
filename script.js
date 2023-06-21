"use strict";

const addBtn = document.querySelector(".add-note-btn");
const editBtn = document.querySelector(".edit-note-btn");
const deleteBtn = document.querySelector(".delete-note-btn");
const inputField = document.querySelector(".input");
const noteList = document.querySelector(".note-list");

const notesArr = [];

const getCurrentdate = function () {
  const monthArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const now = new Date();
  const day = weekday[now.getDay()];
  const month = monthArr.at(now.getMonth());
  const date = now.getDate();
  const year = now.getFullYear();
  const hour = now.getHours();
  const minutes = now.getMinutes();

  const curDate = `${day} ${month} ${date} ${year} - ${hour}:${minutes}`;
  return curDate;
};

// Render the note list
const renderNotes = function () {
  noteList.textContent = "";
  let noteIndex = 0;

  notesArr.forEach((note) => {
    const date = getCurrentdate();
    console.log(date);

    const html = `

      <li class="note" id="note-${noteIndex}"><span class="date">${date}</span>
      ${note}</li>
    `;
    noteIndex++;
    noteList.insertAdjacentHTML("afterbegin", html);
  });
};

// Add new Note
addBtn.addEventListener("click", function () {
  if (inputField.value) {
    notesArr.push(inputField.value);
    renderNotes();
    inputField.value = "";
  }
});

// Selecting Notes
let selectedNotes = 0;

noteList.addEventListener("click", function (e) {
  const element = e.target;

  // Preventing parent element selection
  if (element.classList.contains("note-list")) return;
  if (element.classList.contains("date")) return;

  element.classList.toggle("selected");

  if (element.classList.contains("selected")) {
    element.style.backgroundColor = "rgba(179, 251, 140, 0.769)";
    deleteBtn.classList.remove("hidden");
    selectedNotes++;
  } else {
    element.removeAttribute("style");
    selectedNotes--;
  }

  // Delete-button opacity toggle
  selectedNotes === 0 && deleteBtn.classList.add("hidden");

  // Edit-button opacity toggle
  selectedNotes === 1
    ? editBtn.classList.remove("hidden")
    : editBtn.classList.add("hidden");
});

// Get indexes of selected notes
const getSelectedIndexes = function () {
  const indexesArr = [];
  const notes = document.getElementsByClassName("note");

  for (let i = 0; i < notes.length; i++) {
    const noteId = notes[i].getAttribute("id");

    notes[i].classList.contains("selected") &&
      indexesArr.push(+noteId.slice(5));
  }

  return indexesArr;
};

// Delete selected notes
deleteBtn.addEventListener("click", function () {
  // When there are no selected notes
  if (deleteBtn.classList.contains("hidden")) return;

  const indexes = getSelectedIndexes();

  indexes.forEach((i) => {
    notesArr.splice(i, 1);
    renderNotes();
    deleteBtn.classList.add("hidden");
  });
});

// Edit button
const editFn = function () {
  const [index] = getSelectedIndexes();

  inputField.value = notesArr[index];
  notesArr.splice(index, 1);
  selectedNotes = 0;
  renderNotes();

  editBtn.removeEventListener("click", editFn);
  editBtn.classList.add("hidden");
  activateEdit();
};

const activateEdit = function () {
  if (editBtn.classList.contains("hidden")) {
    editBtn.addEventListener("click", editFn);
  }
};
activateEdit();
