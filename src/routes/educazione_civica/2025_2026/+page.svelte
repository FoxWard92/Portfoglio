<script>
    import { fade, fly } from "svelte/transition";
    import { base } from "$app/paths";

    // --- DATI ---
    const timeline = [
        {
            yearTitle: "INFORMATICA",
            materiaDesc: "DEVELOPMENT & ETICA DIGITALE: DALLA LOGICA ALL'IMPATTO SOCIALE",
            projects: [
                {
                    title: "Progetto 1522",
                    meta: "DJANGO // WEB APP // A.S. 2025/2026",
                    desc: "Progettazione e realizzazione di una piattaforma web per il contrasto alla violenza di genere: un caso studio incentrato sull'accessibilità delle informazioni, la protezione della privacy dell'utente e l'efficacia comunicativa del software.",
                    imgAlt: "Progetto_1522",
                },
            ],
        },
        {
            yearTitle: "ITALIANO",
            materiaDesc: "SOCIETÀ, SICUREZZA & LETTERATURA CIVILE",
            projects: [
                {
                    title: "Prigione Domestica",
                    meta: "ELABORATO // A.S. 2025/2026",
                    desc: "Oltre il silenzio: uno studio sulla 'Prigione Domestica' che esamina la discrepanza tra abusi subiti e denunce effettive, riflettendo sulle responsabilità legali e la tutela della dignità umana.",
                    imgAlt: "Prigione_Domestica",
                },
            ],
        },
    ];

    let activeSlides = timeline.map(() => 0);

    function nextSlide(yearIndex) {
        const totalProjects = timeline[yearIndex].projects.length;
        activeSlides[yearIndex] = (activeSlides[yearIndex] + 1) % totalProjects;
    }

    function prevSlide(yearIndex) {
        const totalProjects = timeline[yearIndex].projects.length;
        activeSlides[yearIndex] =
            (activeSlides[yearIndex] - 1 + totalProjects) % totalProjects;
    }

    function goToSlide(yearIndex, projectIndex) {
        activeSlides[yearIndex] = projectIndex;
    }

    // --- SVELTE ACTION PER LO SCROLL ---
    // Questa funzione osserva l'elemento e aggiunge una classe quando entra nello schermo
    // --- SVELTE ACTION PER LO SCROLL CONTINUO ---
    function reveal(node, { type = "fade-up", delay = 0 } = {}) {
        node.classList.add("reveal-hidden", type);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Entra nello schermo: applica il ritardo e fa partire l'animazione
                        node.style.transitionDelay = `${delay}ms`;
                        node.classList.add("reveal-visible");
                    } else {
                        // Esce dallo schermo: rimuove il ritardo e nasconde l'elemento
                        // in modo che sia pronto a rianimarsi quando torni su/giù
                        node.style.transitionDelay = "0ms";
                        node.classList.remove("reveal-visible");
                    }
                });
            },
            {
                // threshold: 0.1 significa che basta che il 10% dell'elemento sia visibile
                threshold: 0.1,
                rootMargin: "0px 0px -10% 0px",
            },
        );

        observer.observe(node);

        return {
            destroy() {
                observer.disconnect();
            },
        };
    }
</script>

<section>

    {#each timeline as year, yearIndex}
        <article class="year-section">
            <div class="year-header">
                <span
                    class="label"
                    use:reveal={{ type: "slide-left", delay: 0 }}
                    >Timeline // 0{yearIndex + 1}</span
                >
                <h2 use:reveal={{ type: "slide-left", delay: 150 }}>
                    {year.yearTitle}
                </h2>
                <p
                    class="description"
                    use:reveal={{ type: "fade-up", delay: 300 }}
                >
                    {year.materiaDesc}
                </p>
            </div>

            <div
                class="carousel-container"
                use:reveal={{ type: "fade-up", delay: 400 }}
            >
                {#key activeSlides[yearIndex]}
                    <div class="split" in:fade={{ duration: 400 }}>
                        <div class="project-content">
                            <h3>
                                {year.projects[activeSlides[yearIndex]].title}
                            </h3>
                            <p class="meta">
                                {year.projects[activeSlides[yearIndex]].meta}
                            </p>
                            <p>{year.projects[activeSlides[yearIndex]].desc}</p>
                        </div>
                        <aside class="project-visual">
                            <a
                                href="{base}/asset/project_ed_civica/{year
                                    .projects[activeSlides[yearIndex]]
                                    .imgAlt}/file.zip"
                                class="project-card-link"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Scarica il materiale del progetto"
                            >
                                <div
                                    class="image-container"
                                    style="background-image: url({base}/asset/project_ed_civica/{year
                                        .projects[activeSlides[yearIndex]]
                                        .imgAlt}/image.png);"
                                ></div>

                                <div class="overlay">
                                    <span class="action-text"
                                        >Scarica Progetto</span
                                    >
                                    <svg
                                        class="download-icon"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                    >
                                        <path
                                            d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4M7 10l5 5 5-5M12 15V3"
                                        />
                                    </svg>
                                </div>
                            </a>
                        </aside>
                    </div>
                {/key}

                {#if year.projects.length > 1}
                    <div class="gallery-controls">
                        <button
                            class="arrow-btn"
                            on:click={() => prevSlide(yearIndex)}
                            >&#10094;</button
                        >

                        <div class="dots">
                            {#each year.projects as _, projectIndex}
                                <button
                                    class="dot {activeSlides[yearIndex] ===
                                    projectIndex
                                        ? 'active'
                                        : ''}"
                                    on:click={() =>
                                        goToSlide(yearIndex, projectIndex)}
                                    aria-label="Vai al progetto {projectIndex +
                                        1}"
                                ></button>
                            {/each}
                        </div>

                        <button
                            class="arrow-btn"
                            on:click={() => nextSlide(yearIndex)}
                            >&#10095;</button
                        >
                    </div>
                {/if}
            </div>
        </article>
    {/each}
</section>

<style>
    section {
        width: 100%;
        color: #ffffff;
        padding-bottom: 15vh;
        font-family: "Inter", sans-serif;
        /* Per evitare scroll orizzontale durante le animazioni slide-left/right */
        overflow-x: hidden;
    }

    /* --- CLASSI PER LE ANIMAZIONI ALLO SCROLL --- */
    :global(.reveal-hidden) {
        opacity: 0;
        transition:
            opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        will-change: opacity, transform;
    }

    :global(.reveal-hidden.fade-up) {
        transform: translateY(40px);
    }

    :global(.reveal-hidden.slide-left) {
        transform: translateX(-50px);
    }

    :global(.reveal-hidden.slide-right) {
        transform: translateX(50px);
    }

    :global(.reveal-visible) {
        opacity: 1 !important;
        transform: translate(0, 0) !important;
    }
    /* ------------------------------------------- */

    /* HERO */
    .hero {
        height: 20vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        position: relative;
    }

    h1 {
        font-size: clamp(2.5rem, 7vw, 5.5rem);
        font-weight: 700;
        margin: 0;
        letter-spacing: -2px;
    }

    .tagline {
        font-size: 1.1rem;
        text-transform: uppercase;
        letter-spacing: 4px;
        color: #6fd3ff;
        margin-top: 1rem;
        opacity: 0.8;
    }

    .scroll-indicator {
        position: absolute;
        bottom: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 2px;
        opacity: 0.5;
    }

    .scroll-indicator .line {
        width: 1px;
        height: 50px;
        background: linear-gradient(to bottom, #6fd3ff, transparent);
    }

    /* STRUTTURA ANNI */
    .year-section {
        max-width: 1200px;
        margin: 0 auto;
        padding: 10vh 2rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .year-section:last-child {
        border-bottom: none;
    }

    .year-header {
        margin-bottom: 4rem;
    }

    .year-header h2 {
        font-size: 3rem;
        margin: 0.5rem 0;
        font-weight: 300;
        color: #6fd3ff;
    }

    .label {
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 3px;
        color: rgba(255, 255, 255, 0.4);
        display: inline-block; /* Necessario per animare i transform sugli span */
    }

    .description {
        font-size: 1.2rem;
        color: rgba(255, 255, 255, 0.5);
        font-style: italic;
    }

    /* PROGETTO E CAROUSEL */
    .carousel-container {
        position: relative;
        min-height: 350px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .split {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 5rem;
        align-items: center;
        width: 100%;
    }

    .project-content h3 {
        font-size: 1.8rem;
        margin-bottom: 0.5rem;
    }

    .meta {
        font-size: 0.9rem;
        color: #6fd3ff;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 1.5rem;
        font-weight: 600;
    }

    .project-content p:not(.meta) {
        line-height: 1.8;
        color: rgba(255, 255, 255, 0.8);
        font-size: 1.1rem;
    }
    .project-card-link {
        display: block;
        position: relative;
        width: 100%;
        aspect-ratio: 16/9; /* FONDAMENTALE: l'altezza ora è comandata dal contenitore padre */
        text-decoration: none;
        border-radius: 20px;
        overflow: hidden;
        background: rgba(
            255,
            255,
            255,
            0.05
        ); /* Colore di fallback se l'immagine carica lentamente */
        border: 1px solid rgba(111, 211, 255, 0.15);
        transform: translateZ(0); /* Fix per i bordi su Safari */
    }

    .image-container {
        position: absolute; /* Si spalma perfettamente nel parent */
        inset: 0;
        width: 100%;
        height: 100%;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        z-index: 1;
    }

    .overlay {
        position: absolute;
        inset: 0; /* Si spalma perfettamente nel parent */
        z-index: 2;

        /* Reso più trasparente (0.4) così vedi i colori dell'immagine sotto */
        background: rgba(8, 26, 51, 0.4);

        /* Aumentato il blur e aggiunto supporto Webkit */
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 15px;
        opacity: 0;
        transition: opacity 0.4s ease;
    }

    .action-text {
        color: #fff;
        font-size: 0.9rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 2px;
        transform: translateY(10px);
        transition: transform 0.4s ease;
    }

    .download-icon {
        width: 32px;
        height: 32px;
        color: #6fd3ff;
        transform: translateY(10px);
        transition: transform 0.4s ease 0.1s;
    }

    /* --- AZIONI HOVER --- */

    .project-card-link:hover {
        border-color: rgba(111, 211, 255, 0.5);
        box-shadow:
            0 20px 40px rgba(0, 0, 0, 0.4),
            0 0 20px rgba(111, 211, 255, 0.1);
    }

    .project-card-link:hover .image-container {
        transform: scale(1.1);
    }

    .project-card-link:hover .overlay {
        opacity: 1;
    }

    .project-card-link:hover .action-text,
    .project-card-link:hover .download-icon {
        transform: translateY(0);
    }

    .project-card-link:active {
        transform: scale(0.98);
    }

    /* CONTROLLI GALLERIA */
    .gallery-controls {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        margin-top: 3rem;
    }

    .arrow-btn {
        background: none;
        border: none;
        color: rgba(255, 255, 255, 0.4);
        font-size: 1.5rem;
        cursor: pointer;
        padding: 10px;
        transition:
            color 0.3s,
            transform 0.3s;
    }

    .arrow-btn:hover {
        color: #6fd3ff;
        transform: scale(1.2);
    }

    .dots {
        display: flex;
        gap: 10px;
    }

    .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
        padding: 0;
    }

    .dot.active {
        background: #6fd3ff;
        transform: scale(1.3);
        box-shadow: 0 0 10px rgba(111, 211, 255, 0.5);
    }

    @media (max-width: 768px) {
        .split {
            grid-template-columns: 1fr;
            gap: 2rem;
        }
        .year-header h2 {
            font-size: 2rem;
        }
        .carousel-container {
            min-height: auto;
        }
    }
</style>