export default function NavBar(props) {
	return (
		<nav className={props.darkMode ? "navbar dark" : "navbar"}>
			<div className="nav--title">
				<h3>Welcome to your Notes!</h3>
			</div>
			<div className="toggle--wrapper" onClick={props.toggleDarkMode}>
				<p>Light</p>
				<div className="toggle--slider">
					<div className="toggle--slider--circle"></div>
				</div>
				<p>Dark</p>
			</div>
		</nav>
	);
}
