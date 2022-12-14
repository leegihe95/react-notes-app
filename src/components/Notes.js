export default function Notes(props) {
	const notesHeader = (
		<div className="notes--sidebar--top">
			<h3>Add Note</h3>
			<button className="add--note--button" onClick={props.addNewNote}>
				+
			</button>
			<button className="reverse--button" onClick={props.toggleSort}>
				{props.oldFirst ? (
					<i class="fa-solid fa-arrow-down-wide-short"></i>
				) : (
					<i class="fa-solid fa-arrow-down-short-wide"></i>
				)}
			</button>
		</div>
	);

	const notesList = props.notes.map((item) => (
		<div
			className="list--item"
			key={item.id}
			onClick={() => props.setCurrentNote(item.id)}
		>
			<div
				className={
					item.id === props.currentNoteId
						? "list--item--main--selected"
						: "list--item--main"
				}
			>
				<p className="date--text">{item.date}</p>
				<p className="value--text">{item.text}</p>
				<button
					onClick={(event) => props.deleteNote(event, item.id)}
					className="delete--icon"
				>
					<i class="fa-solid fa-trash-can"></i>
				</button>
			</div>
			<hr />
		</div>
	));

	const selectedNote = props.notes.find(
		(note) => note.id === props.currentNoteId
	);

	const editorBody = selectedNote ? (
		<textarea
			name="editor--content"
			id="editor--content"
			cols="60"
			rows="23"
			autoFocus
			value={props.currentNoteId ? selectedNote.text : ""}
			onChange={(e) => props.updateNote(e.target.value)}
		></textarea>
	) : (
		<div className="placeholder">
			<p>Select your note</p>
		</div>
	);

	return (
		<div className={props.darkMode ? "body--dark" : "body--light"}>
			<div className={props.darkMode ? "notes notes--dark" : "notes"}>
				<div className="notes--sidebar">
					{notesHeader}
					<div>{notesList}</div>
				</div>
				<div className="notes--editor">{editorBody}</div>
			</div>
		</div>
	);
}
