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
		JSON.parse(localStorage.getItem("notes"))
			? JSON.parse(localStorage.getItem("notes")).length
			: 0
	);
	const [oldFirst, setOldFirst] = useState(false);

	useEffect(() => {
		localStorage.setItem("notes", JSON.stringify(notes));
	}, [notes]);

	function toggleDarkMode() {
		setDarkMode((prevState) => !prevState);
	}

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

		if (oldFirst) {
			setNotes((prevNotes) => {
				const sortedArr = [];
				for (const note of prevNotes) {
					sortedArr.push(note);
				}
				sortedArr.push(newNote);
				return sortedArr;
			});
		} else {
			setNotes((prevState) => [newNote, ...prevState]);
		}

		setNotesCount((prevState) => prevState + 1);
		setCurrentNoteId(newNote.id);
	}

	function updateNote(text) {
		setNotes((prevNotes) => {
			let finalArr = [];
			let filteredArr = prevNotes.filter(
				(note) => note.id !== currentNoteId
			);
			let updatedItem = {};

			for (const note of prevNotes) {
				if (note.id === currentNoteId) {
					updatedItem = {
						...note,
						text: text,
						date: timeManagement(),
					};
				}
			}
			if (oldFirst) {
				finalArr = [...filteredArr, updatedItem];
			} else {
				finalArr = [updatedItem, ...filteredArr];
			}

			return finalArr;
		});
	}

	function deleteNote(event, id) {
		event.stopPropagation();
		setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
		setNotesCount((prevState) => prevState - 1);
	}

	function setCurrentNote(id) {
		setCurrentNoteId(id);
	}

	function toggleSort() {
		setOldFirst((prevState) => !prevState);

		const reversedArr = notes.reverse();
		setNotes(reversedArr);
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
					toggleSort={toggleSort}
					oldFirst={oldFirst}
				/>
			) : (
				<StartPage darkMode={darkMode} addNewNote={addNewNote} />
			)}
		</div>
	);
}

export default App;
