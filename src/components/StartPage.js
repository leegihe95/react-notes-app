export default function StartPage(props) {
	return (
		<div className={props.darkMode ? "start start--page--dark" : "start"}>
			<div className="start--main">
				<h3>You don't have any notes!</h3>
				<h1>Create new Note</h1>
				<button onClick={props.addNewNote}>+</button>
			</div>
		</div>
	);
}
