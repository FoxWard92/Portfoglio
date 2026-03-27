<script>
    import { fade } from 'svelte/transition';

    // Struttura dati adattata per le esperienze extra-curriculari e PCTO
    const timeline = [
        {
            yearTitle: "Certificazioni e Formazione",
            yearDesc: "Corsi e attestati ottenuti parallelamente al percorso di studi.",
            projects: [
                {
                    title: "Certificazioni Hackergen",
                    meta: "IT & Sviluppo // 2023",
                    desc: "Ottenimento delle certificazioni in HTML/CSS, Introduzione all'Intelligenza Artificiale e versioning del codice tramite Git & GitHub.",
                    imgAlt: "Certificati Hackergen"
                },
                {
                    title: "Sicurezza sul Lavoro",
                    meta: "Formazione // 2023",
                    desc: "Corso completo sulla sicurezza negli ambienti di lavoro, propedeutico per lo svolgimento in sicurezza dei percorsi PCTO.",
                    imgAlt: "Attestato Sicurezza"
                }
            ]
        },
        {
            yearTitle: "Competizioni e Hackathon",
            yearDesc: "Partecipazione attiva a sfide di robotica e sicurezza informatica.",
            projects: [
                {
                    title: "Reply Cyber Security Challenge",
                    meta: "Cybersecurity // Edizioni 2023, 2024, 2025",
                    desc: "Partecipazione a molteplici edizioni della competizione internazionale a squadre incentrata sulla sicurezza informatica, crittografia e problem solving (CTF).",
                    imgAlt: "Reply Cyber Security Challenge"
                },
                {
                    title: "First Lego League",
                    meta: "Robotica // Milano, 2022",
                    desc: "Partecipazione alla competizione mondiale di robotica, con progettazione e programmazione di robot autonomi per la risoluzione di missioni tematiche.",
                    imgAlt: "First Lego League"
                }
            ]
        },
        {
            yearTitle: "Open Day e Laboratori",
            yearDesc: "Progettazione e presentazione al pubblico di sistemi hardware e software.",
            projects: [
                {
                    title: "Casa Domotica con Arduino",
                    meta: "Hardware & IoT // Espositore",
                    desc: "Progettazione e realizzazione di un prototipo interattivo di casa domotica automatizzata utilizzando microcontrollori Arduino, dimostrando ottime capacità di comunicazione tecnica al pubblico.",
                    imgAlt: "Progetto Domotica Arduino"
                },
                {
                    title: "Sviluppo Software e Videogiochi",
                    meta: "Programmazione // Espositore",
                    desc: "Sviluppo e presentazione di vari applicativi software originali, tra cui il programma Data Show, il videogioco Dino Crisis_2D e gallerie interattive a tema Minecraft.",
                    imgAlt: "Progetti Software e Gaming"
                }
            ]
        },
        {
            yearTitle: "Collaborazioni Professionali (PCTO)",
            yearDesc: "Esperienze dirette nel mondo del lavoro e con la Pubblica Amministrazione.",
            projects: [
                {
                    title: "Sito Web Stellantis",
                    meta: "Sviluppo Web // PCTO",
                    desc: "Realizzazione di un sito web vetrina dedicato alla presentazione ufficiale di un progetto in collaborazione con il gruppo automobilistico Stellantis.",
                    imgAlt: "Sito Web Stellantis"
                },
                {
                    title: "Servizi Digitali CSI Piemonte",
                    meta: "IT & PA // PCTO",
                    desc: "Attività pratica svolta presso il CSI Piemonte, affiancando i team tecnici nell'ambito della gestione e dello sviluppo di servizi digitali per la Pubblica Amministrazione.",
                    imgAlt: "CSI Piemonte"
                }
            ]
        }
    ];

    // Array reattivo per tenere traccia della slide attiva
    let activeSlides = timeline.map(() => 0);

    // Funzioni di navigazione
    function nextSlide(yearIndex) {
        const totalProjects = timeline[yearIndex].projects.length;
        activeSlides[yearIndex] = (activeSlides[yearIndex] + 1) % totalProjects;
    }

    function prevSlide(yearIndex) {
        const totalProjects = timeline[yearIndex].projects.length;
        activeSlides[yearIndex] = (activeSlides[yearIndex] - 1 + totalProjects) % totalProjects;
    }

    function goToSlide(yearIndex, projectIndex) {
        activeSlides[yearIndex] = projectIndex;
    }
</script>

<section>
    <div class="hero">
        <div class="profile-header">
            <h1>Progetti Extra</h1>
            <p class="tagline">Esperienze Pratiche // 2022 — 2026</p>
        </div>
        
        <div class="scroll-indicator">
            <span>Esplora i progetti</span>
            <div class="line"></div>
        </div>
    </div>

    {#each timeline as sectionInfo, sectionIndex}
        <article class="year-section">
            <div class="year-header">
                <span class="label">Categoria // 0{sectionIndex + 1}</span>
                <h2>{sectionInfo.yearTitle}</h2>
                <p class="description">{sectionInfo.yearDesc}</p>
            </div>

            <div class="carousel-container">
                {#key activeSlides[sectionIndex]}
                    <div class="split" in:fade={{ duration: 400 }}>
                        <div class="project-content">
                            <h3>{sectionInfo.projects[activeSlides[sectionIndex]].title}</h3>
                            <p class="meta">{sectionInfo.projects[activeSlides[sectionIndex]].meta}</p>
                            <p>{sectionInfo.projects[activeSlides[sectionIndex]].desc}</p>
                        </div>
                        <aside>
                            <div class="placeholder-box">
                                {sectionInfo.projects[activeSlides[sectionIndex]].imgAlt}
                            </div>
                        </aside>
                    </div>
                {/key}

                {#if sectionInfo.projects.length > 1}
                    <div class="gallery-controls">
                        <button class="arrow-btn" on:click={() => prevSlide(sectionIndex)}>&#10094;</button>
                        
                        <div class="dots">
                            {#each sectionInfo.projects as _, projectIndex}
                                <button 
                                    class="dot {activeSlides[sectionIndex] === projectIndex ? 'active' : ''}" 
                                    on:click={() => goToSlide(sectionIndex, projectIndex)}
                                    aria-label="Vai al progetto {projectIndex + 1}"
                                ></button>
                            {/each}
                        </div>

                        <button class="arrow-btn" on:click={() => nextSlide(sectionIndex)}>&#10095;</button>
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
        font-family: 'Inter', sans-serif;
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

    /* STRUTTURA SEZIONI */
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
        transition: color 0.3s, transform 0.3s;
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