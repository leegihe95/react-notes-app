import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import NavBar from "./components/NavBar";
import Notes from "./components/Notes";
import StartPage from "./components/StartPage";

function App() {
	const [darkMode, setDarkMode] = useState(false);
	const [currentNoteId, setCurrentNoteId] = useState();
	const [notes, setNotes] = useState(
		() => JSON.parse(localStorage.getItem("notes")) || []
	);
	const [notesCount, setNotesCount] = useState(
		JSON.parse(localStorage.getItem("notes")).length
	);

	function toggleDarkMode() {
		setDarkMode((prevState) => !prevState);
	}

	function setCurrentNote(id) {
		setCurrentNoteId(id);
	}

	useEffect(() => {
		localStorage.setItem("notes", JSON.stringify(notes));
	}, [notes]);

	function timeManagement() {
		let d = new Date();

		return `${
			d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1
		}/${d.getDate() < 10 ? "0" + d.getDate() : d.getDate()}/${d
			.getFullYear()
			.toString()
			.substring(2)} ${
			d.getHours() < 10 ? "0" + d.getHours() : d.getHours()
		}:${d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()}`;
	}

	function addNewNote() {
		const newNote = {
			id: nanoid(),
			text: "Start your note",
			date: timeManagement(),
		};

		setNotes((prevState) => [newNote, ...prevState]);
		setNotesCount((prevState) => prevState + 1);
	}

	function updateNote(text) {
		setNotes((prevNotes) => {
			const newArr = [];
			for (let i = 0; i < prevNotes.length; i++) {
				if (prevNotes[i].id === currentNoteId) {
					newArr.unshift({
						...prevNotes[i],
						text: text,
						date: timeManagement(),
					});
				} else {
					newArr.push(prevNotes[i]);
				}
			}
			return newArr;
		});
	}

	function deleteNote(event, id) {
		event.stopPropagation();
		setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
		setNotesCount((prevState) => prevState - 1);
	}

	return (
		<div className="App">
			<NavBar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
			{notesCount > 0 ? (
				<Notes
					darkMode={darkMode}
					notes={notes}
					currentNoteId={currentNoteId}
					addNewNote={addNewNote}
					setCurrentNote={setCurrentNote}
					updateNote={updateNote}
					deleteNote={deleteNote}
				/>
			) : (
				<StartPage darkMode={darkMode} addNewNote={addNewNote} />
			)}
		</div>
	);
}

export default App;
