<script>
    import { page } from '$app/stores';
    import { base } from '$app/paths';

    const anni = [
        { label: '2021 · 2022', slug: '2021_2022' },
        { label: '2022 · 2023', slug: '2022_2023' },
        { label: '2023 · 2024', slug: '2023_2024' },
        { label: '2024 · 2025', slug: '2024_2025' },
        { label: '2025 · 2026', slug: '2025_2026' },
    ];

    // Logica semplificata: calcoliamo il path di base una volta sola
    const basePath = `${base}/educazione_civica`;

    // Derivata reattiva per identificare l'anno attivo direttamente dal path
    $: currentSlug = $page.url.pathname.split('/').filter(Boolean).at(-1);
    $: isIndex = $page.url.pathname === basePath || $page.url.pathname === `${basePath}/`;
</script>

<header class="ec-hero">
    <p class="ec-eyebrow">Percorso Multidisciplinare // 2021 — 2026</p>
    <h1 class="ec-title">Educazione Civica</h1>

    <nav class="anni-nav" aria-label="Navigazione anni scolastici">
        <ul class="nav-list">
            <li>
                <a 
                    href={basePath} 
                    class="anno-link" 
                    class:active={isIndex}
                    aria-current={isIndex ? 'page' : undefined}
                >
                    <span class="anno-label">Panoramica</span>
                    <span class="anno-line"></span>
                </a>
            </li>

            {#each anni as { label, slug }, i}
                <li>
                    <a 
                        href="{basePath}/{slug}" 
                        class="anno-link" 
                        class:active={currentSlug === slug}
                        aria-current={currentSlug === slug ? 'page' : undefined}
                        style="--delay: {i * 50}ms"
                    >
                        <span class="anno-label">{label}</span>
                        <span class="anno-line"></span>
                    </a>
                </li>
            {/each}
        </ul>
    </nav>
</header>

<slot />

<style>
    :root {
        --accent: #6fd3ff;
        --text-dim: rgba(255, 255, 255, 0.45);
    }

    .ec-hero {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding-top: 4rem;
    }

    .ec-eyebrow {
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 4px;
        color: var(--accent);
        opacity: 0.7;
        margin-bottom: 1rem;
    }

    .ec-title {
        font-size: clamp(2.5rem, 7vw, 5.5rem);
        font-weight: 700;
        margin-bottom: 3rem;
        letter-spacing: -2px;
        color: #fff;
        line-height: 1;
    }

    /* BARRA ANNI - Ottimizzata con Flexbox e Liste */
    .anni-nav {
        width: 100%;
        max-width: 950px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .nav-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .anno-link {
        position: relative;
        display: block;
        padding: 1rem 1.4rem;
        color: var(--text-dim);
        text-decoration: none;
        font-size: 0.82rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 2px;
        transition: color 0.3s ease;
        
        /* Animazione in entrata fluida */
        animation: btnAppear 0.6s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0ms) both;
    }

    @keyframes btnAppear {
        from { opacity: 0; transform: translateY(10px); }
        to   { opacity: 1; transform: translateY(0); }
    }

    .anno-link:hover, .anno-link.active {
        color: var(--accent);
    }

    /* Indicatore sottostante */
    .anno-line {
        position: absolute;
        bottom: -1px;
        left: 1.4rem;
        right: 1.4rem;
        height: 2px;
        background: var(--accent);
        transform: scaleX(0);
        transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        box-shadow: 0 0 10px rgba(111, 211, 255, 0.4);
    }

    .anno-link:hover .anno-line,
    .anno-link.active .anno-line {
        transform: scaleX(1);
    }

    .anno-link:hover .anno-line {
        opacity: 0.5;
        box-shadow: none;
    }

    @media (max-width: 768px) {
        .ec-title { margin-bottom: 2rem; }
        .anno-link { font-size: 0.75rem; padding: 0.75rem 0.8rem; letter-spacing: 1px; }
    }
</style>