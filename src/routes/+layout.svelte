<script>
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import { base } from "$app/paths";

	let scrolled = false;
	let ScreenContainerScroll = null;
	let videoElement = null;
	let SegmentActiveLink = "";

	function handleScroll() {
		if (!ScreenContainerScroll) return;

		const scrollTop = ScreenContainerScroll.scrollTop;

		// 1. Gestione Header/Footer (scrolled)
		scrolled = scrollTop > 100;

		// 2. Controllo Video (Scrubbing)
		if (videoElement && videoElement.duration) {
			const maxScroll =
				ScreenContainerScroll.scrollHeight -
				ScreenContainerScroll.clientHeight;
			const scrollFraction = scrollTop / maxScroll;

			// Imposta il tempo del video in base alla percentuale di scroll
			videoElement.currentTime = videoElement.duration * scrollFraction;
		}
	}

	onMount(() => {
		const path = window.location.pathname;
		const segments = path.split("/").filter(Boolean);
		if (segments.length > 0)
			SegmentActiveLink = segments[segments.length - 1] ?? "";

		handleScroll();
	});
</script>

<section>
	<header class:scrolled>
		<button
			class:scrolled
			class:clicked={SegmentActiveLink === "Portfoglio" ||
				SegmentActiveLink === ""}
			on:click={() => {
				SegmentActiveLink = "Portfoglio";
				goto(`${base}/`);
			}}>Home</button
		>
		<button
			class:scrolled
			class:clicked={SegmentActiveLink === "educazione_civica"}
			on:click={() => {
				SegmentActiveLink = "educazione_civica";
				goto(`${base}/educazione_civica`);
			}}>Educazione Civica</button
		>
	</header>

	<div id="main-container">
		<video
			bind:this={videoElement}
			src="{base}/asset/background/bg.mp4"
			muted
			playsinline
			preload="auto"
			class="bg-video"
		>
			<track kind="captions" />
		</video>

		<div
			id="slot-container"
			bind:this={ScreenContainerScroll}
			on:scroll={handleScroll}
		>
			<div class="content-wrapper">
				<slot></slot>
			</div>
		</div>
	</div>

	<footer class:scrolled>
		&copy; {new Date().getFullYear()} Portfolio Digitale — Codice, Creatività
		e Futuro.
	</footer>
</section>

<style>
	:global(body) {
		margin: 0;
		background: #1a1a1a;
	}

	#main-container {
		flex: 1;
		width: 100%;
		position: relative;
		overflow: hidden;
	}

	.bg-video {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover; /* Riempie lo schermo senza deformarsi */
		z-index: 0;
	}

	#slot-container {
		position: relative;
		z-index: 1; /* Sopra il video */
		height: 100%;
		width: 100%;
		overflow-y: auto;
		backdrop-filter: blur(
			10px
		); /* Opzionale: sfoca il video dietro il testo */
	}

	/* Wrapper per dare altezza e permettere lo scroll se lo slot è vuoto o corto */
	.content-wrapper {
		min-height: 200vh;
		width: 100%;
	}

	section {
		height: 100vh;
		width: 100%;
		margin: auto;
		max-width: 2500px;
		display: flex;
		justify-content: start;
		align-items: center;
		flex-direction: column;
		overflow: hidden;
	}

	header {
		height: 20%;
		width: 100%;
		max-width: 2500px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		overflow: hidden;
		position: absolute;
		top: 80%;
		z-index: 2;
	}

	header.scrolled {
		top: 0;
		background: rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(10px);
	}

	button.scrolled {
		transform: rotate(0deg) skew(0deg);
	}

	button {
		height: 25%;
		width: 20%;
		max-width: 250px;
		cursor: pointer;
		/* NORMAL: Azzurro bilanciato */
		background: linear-gradient(
			-135deg,
			rgba(100, 200, 255, 0.8),
			rgba(160, 210, 255, 0.7)
		);
		transform: rotate(0deg) skew(10deg);
		transition: all 0.5s ease;
		border: none;
		font-size: larger;
		color: #ffffff;
		font-weight: bolder;
		font-family: Arial, Helvetica, sans-serif;
		position: relative; /* Necessario per i pseudo-elementi */
	}

	button:before {
		content: "";
		position: absolute;
		top: 10px;
		left: -20px;
		width: 20px;
		height: 100%;
		/* Lato sinistro leggermente più scuro per profondità */
		background: linear-gradient(
			180deg,
			rgba(70, 170, 230, 0.8),
			rgba(130, 180, 220, 0.7)
		);
		transform: rotate(0deg) skewY(-45deg);
		transition: all 0.5s ease;
	}

	button:after {
		content: "";
		position: absolute;
		bottom: -20px;
		left: -10px;
		width: 100%;
		height: 20px;
		/* Lato inferiore ancora più scuro */
		background: linear-gradient(
			-90deg,
			rgba(50, 150, 210, 0.8),
			rgba(110, 160, 200, 0.7)
		);
		transform: rotate(0deg) skewX(-45deg);
		transition: all 0.5s ease;
	}

	button:hover,
	button.clicked {
		translate: 10px -10px;
		color: #003355; /* Testo blu scuro per contrasto su azzurro chiaro */
	}

	button:not(.clicked):hover {
		/* HOVER: Molto più vibrante e luminoso */
		background: linear-gradient(
			-135deg,
			rgba(0, 180, 255, 1),
			rgba(130, 220, 255, 0.9)
		);
	}

	button:not(.clicked):hover::before {
		background: rgba(0, 160, 230, 1);
	}

	button:not(.clicked):hover::after {
		background: rgba(0, 140, 210, 1);
	}

	button.clicked {
		background: linear-gradient(
			-135deg,
			rgb(165, 230, 255),
			rgba(171, 228, 255, 0.95)
		);
		box-shadow: -5px 5px 15px rgba(0, 150, 255, 0.3);
	}

	button.clicked::before {
		background: rgba(50, 150, 210, 0.8);
	}

	button.clicked::after {
		background: rgba(40, 130, 190, 0.8);
	}

	footer {
		height: 10px;
		width: 100%;
		opacity: 0;
		display: flex;
		background: linear-gradient(90deg, #1a1a1a, #333);
		justify-content: center;
		align-items: center;
		font-size: 0.85rem;
		color: #777;
		border-top: 2px solid #1a1a1a;
	}

	footer.scrolled {
		height: 100px;
		opacity: 1;
	}

	/* Firefox */
	* {
		scrollbar-width: thin;
		scrollbar-color: #6fd3ff #081a33;
	}

	/* Chrome, Edge, Safari */
	*::-webkit-scrollbar {
		width: 12px;
		height: 12px;
	}
	*::-webkit-scrollbar-track {
		background: #081a33;
		border-radius: 10px;
	}
	*::-webkit-scrollbar-thumb {
		background-color: #6fd3ff;
		border-radius: 10px;
		border: 3px solid #081a33;
	}
	*::-webkit-scrollbar-thumb:hover {
		background-color: #2a6cff;
	}
</style>
