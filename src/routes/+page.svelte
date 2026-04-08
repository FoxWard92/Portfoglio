<script>
    import { base } from '$app/paths';
    import { fade, fly } from 'svelte/transition';

    // Funzione Action per lo scroll (stessa logica del file precedente)
    function reveal(node, { type = 'fade-up', delay = 0 } = {}) {
        node.classList.add('reveal-hidden', type);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    node.style.transitionDelay = `${delay}ms`;
                    node.classList.add('reveal-visible');
                } else {
                    node.style.transitionDelay = '0ms';
                    node.classList.remove('reveal-visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -10% 0px"
        });

        observer.observe(node);
        return {
            destroy() { observer.disconnect(); }
        };
    }
</script>

<section>
    <div class="hero">
        <div class="profile-header">
            <div class="profile-circle" in:fly={{ y: -50, duration: 1000, delay: 200 }}>
                <img src="{base}/asset/cert/profile_icon.jpeg" alt="Nickolas Trovato" />
            </div>
            
            <h1 in:fly={{ y: 50, duration: 1000, delay: 400 }}>Nickolas Trovato</h1>
            <p class="tagline" in:fade={{ duration: 1000, delay: 800 }}>Informatica & Telecomunicazioni</p>
        </div>
        
        <div class="scroll-indicator" in:fade={{ duration: 1000, delay: 1200 }}>
            <span>Chi sono</span>
            <div class="line"></div>
        </div>
    </div>

    <article>
        <span class="label" use:reveal={{ type: 'slide-left', delay: 0 }}>01 // Introduzione e Obiettivi</span>
        <p class="big-text" use:reveal={{ type: 'slide-left', delay: 200 }}>
            Sono uno studente del triennio specializzato in Informatica e Telecomunicazioni presso l’Istituto Tecnico Tecnologico Agnelli di Torino.
        </p>
        <p class="description" use:reveal={{ type: 'fade-up', delay: 400 }}>
            Sono profondamente appassionato di sistemi informatici, programmazione e sviluppo web. Il mio percorso scolastico e i progetti pratici svolti in laboratorio mi hanno permesso di acquisire solide basi tecniche, che sono motivato ad applicare in contesti reali.
        </p>
    </article>

    <article>
        <span class="label" use:reveal={{ type: 'slide-left' }}>02 // Formazione e Competenze Tecniche</span>
        <div class="grid-skills">
            <div use:reveal={{ type: 'fade-up', delay: 100 }}>
                <h3>Sistemi e Reti</h3>
                <p>Gestione di sistemi di elaborazione dati, sistemi operativi e reti locali.</p>
            </div>
            <div use:reveal={{ type: 'fade-up', delay: 200 }}>
                <h3>Progettazione Informatica</h3>
                <p>Sviluppo di software client-server e progettazione di protocolli di comunicazione.</p>
            </div>
            <div use:reveal={{ type: 'fade-up', delay: 300 }}>
                <h3>Programmazione</h3>
                <p>Padronanza dei linguaggi C, C++, Java e JavaScript, orientata alla creazione di algoritmi, interfacce utente e applicazioni web.</p>
            </div>
            <div use:reveal={{ type: 'fade-up', delay: 400 }}>
                <h3>Telecomunicazioni</h3>
                <p>Analisi dei parametri di sistema e delle reti di trasmissione.</p>
            </div>
            <div use:reveal={{ type: 'fade-up', delay: 500 }}>
                <h3>Hardware e Microcontrollori</h3>
                <p>Esperienza pratica nell'uso di schede Arduino e Raspberry Pi, inclusa la creazione di progetti domotici.</p>
            </div>
        </div>
    </article>
</section>

<style>
    section {
        width: 100%;
        color: #ffffff;
        padding-bottom: 10vh;
        font-family: 'Inter', sans-serif;
        overflow-x: hidden; /* Evita glitch con le animazioni laterali */
    }

    /* --- CLASSI PER ANIMAZIONI SCROLL --- */
    :global(.reveal-hidden) {
        opacity: 0;
        transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        will-change: opacity, transform;
    }

    :global(.reveal-hidden.fade-up) {
        transform: translateY(40px);
    }

    :global(.reveal-hidden.slide-left) {
        transform: translateX(-50px);
    }

    :global(.reveal-visible) {
        opacity: 1 !important;
        transform: translate(0, 0) !important;
    }
    /* ------------------------------------ */

    .hero {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        position: relative;
    }

    .profile-circle {
        width: 220px;
        height: 220px;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 auto 2rem;
        border: 2px solid rgba(111, 211, 255, 0.5);
        padding: 5px;
        background: rgba(255, 255, 255, 0.05);
    }

    .profile-circle img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: 0px 0px;
        border-radius: 50%;
    }

    h1 {
        font-size: clamp(3rem, 8vw, 6rem);
        font-weight: 700;
        margin: 0;
        letter-spacing: -2px;
        line-height: 0.9;
    }

    .tagline {
        font-size: 1.2rem;
        text-transform: uppercase;
        letter-spacing: 5px;
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
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 2px;
        opacity: 0.5;
    }

    .scroll-indicator .line {
        width: 1px;
        height: 60px;
        background: linear-gradient(to bottom, #6fd3ff, transparent);
    }

    article {
        max-width: 1200px;
        margin: 0 auto;
        padding: 10vh 2rem;
    }

    .label {
        display: inline-block; /* Importante per l'animazione */
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 3px;
        color: #6fd3ff;
        margin-bottom: 3rem;
    }

    .big-text {
        font-size: clamp(1.5rem, 4vw, 3rem);
        line-height: 1.2;
        max-width: 900px;
        font-weight: 300;
        margin-bottom: 2rem;
    }

    .description {
        font-size: 1.2rem;
        color: rgba(255, 255, 255, 0.6);
        max-width: 800px;
        line-height: 1.6;
    }

    h3 {
        font-size: 1.2rem;
        text-transform: uppercase;
        letter-spacing: 2px;
        color: #6fd3ff;
        margin-bottom: 1rem;
    }

    .grid-skills {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 3rem;
    }

    @media (max-width: 768px) {
        article {
            padding: 10vh 2rem;
        }
    }
</style>