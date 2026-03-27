<script>
    import { fade } from "svelte/transition";
    import { base } from "$app/paths";

    // Struttura dati: facile da aggiornare senza toccare l'HTML
    const timeline = [
        {
            yearTitle: "Primo Anno",
            yearDesc:
                "Introduzione alla cittadinanza digitale e ai fondamenti della Costituzione.",
            projects: [
                {
                    title: "La Costituzione Italiana",
                    meta: "Materia: Diritto // A.S. 2021/2022",
                    desc: "Analisi dei principi fondamentali della nostra Carta Costituzionale, con particolare attenzione agli articoli riguardanti i diritti e i doveri del cittadino.",
                    imgAlt: "Documento Costituzione Italiana",
                },
                {
                    title: "La Costituzione Francese",
                    meta: "Materia: Diritto // A.S. 2021/2022",
                    desc: "Studio comparato sui principi fondamentali della costituzione francese e le differenze con l'ordinamento italiano.",
                    imgAlt: "Documento Costituzione Francese",
                },
            ],
        },
        {
            yearTitle: "Secondo Anno",
            yearDesc: "Sostenibilità ambientale e l'Agenda 2030.",
            projects: [
                {
                    title: "Sostenibilità e Risorse",
                    meta: "Materia: Scienze // A.S. 2022/2023",
                    desc: "Studio dell'impatto ambientale delle tecnologie moderne e analisi degli obiettivi dell'Agenda 2030 per lo sviluppo sostenibile del pianeta.",
                    imgAlt: "Progetto Sostenibilità",
                },
                {
                    title: "Sostenibilità e Risorse",
                    meta: "Materia: Scienze // A.S. 2022/2023",
                    desc: "Studio dell'impatto ambientale delle tecnologie moderne e analisi degli obiettivi dell'Agenda 2030 per lo sviluppo sostenibile del pianeta.",
                    imgAlt: "Progetto Sostenibilità",
                },
            ],
        },
        {
            yearTitle: "Terzo Anno",
            yearDesc: "Etica digitale e sicurezza informatica.",
            projects: [
                {
                    title: "Cyberbullismo e Netiquette",
                    meta: "Materia: Informatica // A.S. 2023/2024",
                    desc: "Approfondimento sulle dinamiche della rete, la protezione dei dati personali e le responsabilità legali e morali nell'uso dei social network.",
                    imgAlt: "Presentazione Cyberbullismo",
                },
            ],
        },
        {
            yearTitle: "Quarto Anno",
            yearDesc: "Lavoro, sicurezza e cittadinanza attiva.",
            projects: [
                {
                    title: "Sicurezza sul Lavoro",
                    meta: "Materia: Sistemi e Reti // A.S. 2024/2025",
                    desc: "Corso di formazione specifica sulla sicurezza negli ambienti di lavoro, fondamentale per l'integrazione nei percorsi di PCTO.",
                    imgAlt: "Attestato Sicurezza",
                },
            ],
        },
        {
            yearTitle: "Quinto Anno",
            yearDesc: "Verso l'esame di Stato e la vita professionale.",
            projects: [
                {
                    title: "Cittadinanza e Innovazione",
                    meta: "Materia: Telecomunicazioni // A.S. 2025/2026",
                    desc: "Riflessione sul ruolo dell'ingegneria e della tecnologia nella società moderna e l'importanza dell'etica professionale nel settore IT.",
                    imgAlt: "Progetto Innovazione",
                },
            ],
        },
    ];

    // Array reattivo per tenere traccia della slide attiva per ogni anno
    // Inizializza tutto a 0 (prima slide)
    let activeSlides = timeline.map(() => 0);

    // Funzioni di navigazione
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
</script>

<section>
    <div class="hero">
        <div class="profile-header">
            <h1>Educazione Civica</h1>
            <p class="tagline">Percorso Multidisciplinare // 2021 — 2026</p>
        </div>

        <div class="scroll-indicator">
            <span>Esplora i progetti</span>
            <div class="line"></div>
        </div>
    </div>

    {#each timeline as year, yearIndex}
        <article class="year-section">
            <div class="year-header">
                <span class="label">Timeline // 0{yearIndex + 1}</span>
                <h2>{year.yearTitle}</h2>
                <p class="description">{year.yearDesc}</p>
            </div>

            <div class="carousel-container">
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
                        <aside>
                            <div class="placeholder-box">
                                {year.projects[activeSlides[yearIndex]].imgAlt}
                            </div>
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
    }

    /* HERO */
    .hero {
        height: 100vh;
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
        /* Sostituisce l'HR: crea uno stacco naturale con lo spazio */
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
    }

    .description {
        font-size: 1.2rem;
        color: rgba(255, 255, 255, 0.5);
        font-style: italic;
    }

    /* PROGETTO E CAROUSEL */
    .carousel-container {
        position: relative;
        min-height: 350px; /* Previene salti di layout durante la transizione */
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

    .placeholder-box {
        width: 100%;
        aspect-ratio: 16/9;
        background: rgba(255, 255, 255, 0.03);
        border: 1px dashed rgba(111, 211, 255, 0.3);
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgba(255, 255, 255, 0.2);
        font-size: 0.8rem;
        text-transform: uppercase;
        text-align: center;
        padding: 1rem;
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
