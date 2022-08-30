export default function Notes(props) {
	const list = props.notes.map((item) => (
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

	const displaySelected = props.notes.find(
		(note) => note.id === props.currentNoteId
	);

	const inputShow = displaySelected ? (
		<textarea
			name="editor--content"
			id="editor--content"
			cols="60"
			rows="23"
			value={props.currentNoteId ? displaySelected.text : ""}
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
					<div className="notes--sidebar--top">
						<div>Add Note</div>
						<button
							className="add--note--button"
							onClick={props.addNewNote}
						>
							+
						</button>
					</div>
					<div>{list}</div>
				</div>
				<div className="notes--editor">{inputShow}</div>
				{/* {inputShow} */}
			</div>
		</div>
	);
}
