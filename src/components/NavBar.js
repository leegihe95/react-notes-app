export default function NavBar(props) {
	return (
		<nav className={props.darkMode ? "navbar dark" : "navbar"}>
			<div onClick={props.toggleDarkMode}>
				<p>Light</p>
				<div className="toggle--slider">
					<div className="toggle--slider--circle"></div>
				</div>
				<p>Dark</p>
			</div>
		</nav>
	);
}
