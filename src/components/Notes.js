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
				<p>
					<i>{item.date}</i>
				</p>
				<p>{item.text.slice(0, 15)}</p>
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
		<input
			type="text"
			value={props.currentNoteId ? displaySelected.text : ""}
			onChange={(e) => props.updateNote(e.target.value)}
		></input>
	) : (
		<div className="placeholder">
			<p>Select your note</p>
		</div>
	);

	return (
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
		</div>
	);
}
