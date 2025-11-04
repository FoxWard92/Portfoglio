<script>
	let scrollContainer;
	let scrolled = false;
	let LinkList;
	let ActiveLink = 0;

</script>

<section>

	<main bind:this={scrollContainer} on:scroll={() => {scrolled = scrollContainer.scrollTop > 100}} class:scrolled>
		<slot />
	</main>

	<header class:scrolled>
		<ul class:scrolled bind:this={LinkList}>
			<li class:clicked={ActiveLink === 0}>
				<a href="/" on:click={() => {ActiveLink = 0}}>Home</a>
			</li>
			<li class:clicked={ActiveLink === 1}>
				<a href="/chi_sono" on:click={() => {ActiveLink = 1}}>Chi sono</a>
			</li>
			<li class:clicked={ActiveLink === 2}>
				<a href="/ed_civica" on:click={() => {ActiveLink = 2}}
					>Educazione Civica</a
				>
			</li>
			<li class:clicked={ActiveLink === 3}>
				<a href="/progetti_extra" on:click={() => {ActiveLink = 3}}>Progetti extra</a>
			</li>
			<li class:clicked={ActiveLink === 4}>
				<a href="/social" on:click={() => {ActiveLink = 4}}>Social</a>
			</li>
		</ul>
	</header>

	<footer class:scrolled>
		&copy; {new Date().getFullYear()} Portfolio Digitale — Codice, Creatività
		e Futuro.
	</footer>

</section>

<style>
	:global(body) {
		margin: 0;;
		display: flex;
		justify-content: center;
		font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
		background: linear-gradient(0deg,#0f2027 0%,#203a43 40%,#2c5364 100%);


	}

	:root {
		--max-screen-width: 3000px;
		--color-text-p: #d4d4d4;
		--color-text-h1: #ffffff;
	}

	section{
		height: 100vh;
		width: 100%;
		max-width: var(--max-screen-width);
	}

	header {
		height: 15%;
		width: 100%;
		max-width: var(--max-screen-width);
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		position: absolute;
		top: 80%;
	}

	header.scrolled {
		top: 0;
		background: rgba(255, 255, 255, 0.200);
		backdrop-filter: blur(10px);
	}

	ul {
		width: 90%;
		list-style: none;
		display: flex;
		justify-content: space-around;
		padding: 0;
		margin: 0;
	}

	ul li {
		background: linear-gradient(-135deg, #3a3a3a, #a3a3a3);
		transform: rotate(0deg) skew(10deg);
		box-shadow: -20px 20px 10px rgba(0, 0, 0, 0.5);
		width: clamp(8rem, 15vw, 15rem);
		height: clamp(3rem, 6vh, 5rem);
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: bolder;
		transition: all 0.3s ease;
	}

	ul.scrolled li {
		transform: rotate(0deg) skew(0deg);
	}

	ul li a {
		font-size: 1.4rem;
		color: #ffffff;
		text-decoration: none;
	}

	ul li a:before {
		content: "";
		position: absolute;
		top: 10px;
		left: -20px;
		width: 20px;
		height: 100%;
		background: linear-gradient(180deg, #3a3a3a, #a3a3a3);
		transform: rotate(0deg) skewY(-45deg);
	}

	ul li a:after {
		content: "";
		position: absolute;
		bottom: -20px;
		left: -10px;
		width: 100%;
		height: 20px;
		background: linear-gradient(-90deg, #3a3a3a, #a3a3a3);
		transform: rotate(0deg) skewX(-45deg);
	}

	ul li:hover,
	ul li.clicked {
		translate: 10px -10px;
		background: linear-gradient(-135deg, #004ca3, #3887ff);
	}

	ul li:hover ::before,
	ul li.clicked ::before {
		background: linear-gradient(180deg, #004ca3, #3887ff);
	}

	ul li:hover ::after,
	ul li.clicked ::after {
		background: linear-gradient(-90deg, #004ca3, #3887ff);
	}

	ul li:hover a,
	ul li.clicked a {
		color: #121212;
	}

	main {
		overflow-x: hidden;
		overflow-y: scroll;
		height: 100vh;
	}

	main.scrolled {
		height: 95vh;
	}

	footer {
		display: none;
		background: linear-gradient(90deg, #1a1a1a, #333);
		height: calc(5% - 2px);
		text-align: center;
		font-size: 0.85rem;
		color: #777;
		border-top: 2px solid #1a1a1a;
	}

	footer.scrolled {
		display: block;
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
