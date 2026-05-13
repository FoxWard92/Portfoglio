<script>
    import { base } from '$app/paths';

    // Dati ottimizzati: rimosso 'num' perché calcolabile dall'indice
    const anni = [
        { slug: '2021_2022', label: '2021 · 2022', titolo: 'Primo Anno', desc: 'Introduzione alla cittadinanza digitale e ai fondamenti della Costituzione.' },
        { slug: '2022_2023', label: '2022 · 2023', titolo: 'Secondo Anno', desc: 'Sostenibilità ambientale e l\'Agenda 2030.' },
        { slug: '2023_2024', label: '2023 · 2024', titolo: 'Terzo Anno', desc: 'Etica digitale e sicurezza informatica.' },
        { slug: '2024_2025', label: '2024 · 2025', titolo: 'Quarto Anno', desc: 'Lavoro, sicurezza e cittadinanza attiva.' },
        { slug: '2025_2026', label: '2025 · 2026', titolo: 'Quinto Anno', desc: 'Verso l\'esame di Stato e la vita professionale.' }
    ];

    // Action ottimizzata: smette di osservare una volta apparso (performance)
    function reveal(node, { type = 'fade-up', delay = 0 } = {}) {
        node.classList.add('reveal-hidden', type);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    node.style.transitionDelay = `${delay}ms`;
                    node.classList.add('reveal-visible');
                    // Opzionale: smetti di osservare se vuoi l'animazione solo "one-shot"
                    // observer.unobserve(node); 
                } else {
                    // Rimuovi questo blocco se non vuoi che l'animazione si ripeta scrollando su/giù
                    node.style.transitionDelay = '0ms';
                    node.classList.remove('reveal-visible');
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -5% 0px" });

        observer.observe(node);
        return { destroy() { observer.disconnect(); } };
    }
</script>

<header class="intro" use:reveal>
        <p>Seleziona un anno scolastico per esplorare i progetti e gli elaborati realizzati durante il percorso di Educazione Civica.</p>
    </header>

<section class="container">
    <ul class="grid">
        {#each anni as { slug, label, titolo, desc }, i}
            <li use:reveal={{ delay: i * 100 }}>
                <a href="{base}/educazione_civica/{slug}" class="card" aria-labelledby="title-{i}">
                    <span class="card-num" aria-hidden="true">
                        {(i + 1).toString().padStart(2, '0')}
                    </span>
                    
                    <div class="card-body">
                        <span class="card-year">{label}</span>
                        <h2 class="card-title" id="title-{i}">{titolo}</h2>
                        <p class="card-desc">{desc}</p>
                    </div>

                    <span class="card-arrow" aria-hidden="true">→</span>
                </a>
            </li>
        {/each}
    </ul>
</section>

<style>
    .container {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        color: #fff;
        font-family: 'Inter', sans-serif;
    }

    /* Reveal System */
    :global(.reveal-hidden) {
        opacity: 0;
        transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), 
                    transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        will-change: opacity, transform;
    }
    :global(.reveal-hidden.fade-up) { transform: translateY(30px); }
    :global(.reveal-visible) { opacity: 1 !important; transform: translate(0, 0) !important; }

    .intro {
        padding: 0px 20px 0px 20px;
        text-align: center;
        color: rgba(255,255,255,0.5);
        margin-bottom: 4rem;
        max-width: 600px;
        margin-inline: auto;
    }

    .grid {
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: column;
    }

    .card {
        display: flex;
        align-items: center;
        gap: 2rem;
        text-decoration: none; /* Reset per tag <a> */
        color: inherit;
        border-top: 1px solid rgba(255,255,255,0.1);
        padding: 2rem 1rem;
        transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    }

    li:last-child .card {
        border-bottom: 1px solid rgba(255,255,255,0.1);
    }

    .card:hover {
        background: rgba(111, 211, 255, 0.04);
        padding-left: 2.5rem;
    }

    .card:hover .card-title, 
    .card:hover .card-arrow {
        color: #6fd3ff;
    }

    .card:hover .card-arrow {
        opacity: 1;
        transform: translateX(0);
    }

    .card-num {
        font-size: 0.8rem;
        font-weight: 700;
        letter-spacing: 2px;
        color: rgba(111, 211, 255, 0.4);
        min-width: 2.5rem;
    }

    .card-body {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
    }

    .card-year {
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 2px;
        color: rgba(255,255,255,0.3);
    }

    .card-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0;
    }

    .card-desc {
        font-size: 0.95rem;
        color: rgba(255,255,255,0.5);
        margin: 0;
        line-height: 1.5;
    }

    .card-arrow {
        font-size: 1.5rem;
        color: rgba(255,255,255,0.2);
        opacity: 0;
        transform: translateX(-10px);
        transition: all 0.3s ease;
    }

    @media (max-width: 600px) {
        .card { gap: 1rem; padding: 1.5rem 0.5rem; }
        .card-title { font-size: 1.25rem; }
        .card-arrow { display: none; }
        .card-num { min-width: 1.5rem; }
    }
</style>