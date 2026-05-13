<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { base } from "$app/paths";

    let scrolled = false;
    let ScreenContainerScroll = null;
    let videoElement = null;
    let SegmentActiveLink = "";
    let mounted = false;
    let ticking = false;
    let isExpanded = false;

    function scrollToTop() {
        if (ScreenContainerScroll) {
            ScreenContainerScroll.scrollTo({ top: 0, behavior: "smooth" });
        }
    }

    function handleScroll() {
        if (!ScreenContainerScroll) return;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollTop = ScreenContainerScroll.scrollTop;
                scrolled = scrollTop > 100;

                if (videoElement && !isNaN(videoElement.duration)) {
                    const maxScroll =
                        ScreenContainerScroll.scrollHeight -
                        ScreenContainerScroll.clientHeight;
                    if (maxScroll > 0) {
                        let targetTime =
                            videoElement.duration * (scrollTop / maxScroll);
                        videoElement.currentTime = Math.max(
                            0,
                            Math.min(targetTime, videoElement.duration),
                        );
                    }
                }
                ticking = false;
            });
            ticking = true;
        }
    }

    onMount(() => {
        const segments = window.location.pathname.split("/").filter(Boolean);
        SegmentActiveLink = segments.at(-1) ?? "Portfoglio";
        requestAnimationFrame(() => setTimeout(() => (mounted = true), 80));
        handleScroll();
    });
</script>

<section>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <header
        class:scrolled
        class:mounted
        class:expanded={isExpanded}
        on:mouseenter={() => (isExpanded = true)}
        on:mouseleave={() => (isExpanded = false)}
    >
        <div class="nav-logo">
            <span
                class="icon-menu"
                style="--icon-url: url('{base}/asset/menu.svg');"
            ></span>
        </div>

        <nav class="nav-links">
            <button
                class="nav-btn btn-home"
                class:scrolled
                class:clicked={SegmentActiveLink === "Portfoglio" ||
                    SegmentActiveLink === ""}
                class:mounted
                on:click={() => {
                    SegmentActiveLink = "Portfoglio";
                    goto(`${base}/`);
                }}
            >
                <span class="icon">🏠</span>
                <span class="label">Home</span>
            </button>

            <button
                class="nav-btn btn-edu"
                class:scrolled
                class:clicked={SegmentActiveLink === "educazione_civica"}
                class:mounted
                on:click={() => {
                    SegmentActiveLink = "educazione_civica";
                    goto(`${base}/educazione_civica`);
                }}
            >
                <span class="icon">📚</span>
                <span class="label">Edu Civica</span>
            </button>
        </nav>
    </header>

    <div id="main-container">
        <video
            bind:this={videoElement}
            src="{base}/asset/background/bg.mp4"
            muted
            playsinline
            preload="auto"
            class="bg-video"><track kind="captions" /></video
        >

        <div
            id="slot-container"
            bind:this={ScreenContainerScroll}
            on:scroll={handleScroll}
        >
            <div class="content-wrapper">
                <slot />
            </div>
        </div>

        <button
            class="back-to-top"
            class:visible={scrolled}
            on:click={scrollToTop}
            aria-label="Torna su"
        >
            <svg viewBox="0 0 24 24" width="24" height="24">
                <path
                    d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
                    fill="currentColor"
                />
            </svg>
        </button>
    </div>

    <footer class:scrolled>
        &copy; {new Date().getFullYear()} Portfolio Digitale — Codice, Creatività
        e Futuro.
    </footer>
</section>

<style>
    /* KEYFRAMES ORIGINALI */
    @keyframes dropBounce {
        0% {
            transform: translateY(-140px) rotate(12deg) skew(10deg);
            opacity: 0;
        }
        50% {
            transform: translateY(22px) rotate(-3deg) skew(7deg);
            opacity: 1;
        }
        68% {
            transform: translateY(-12px) rotate(1deg) skew(9deg);
        }
        80% {
            transform: translateY(7px) skew(10deg);
        }
        90% {
            transform: translateY(-4px) skew(10deg);
        }
        96% {
            transform: translateY(2px) skew(10deg);
        }
        100% {
            transform: translateY(0) skew(10deg);
            opacity: 1;
        }
    }
    @keyframes morphToPill {
        0% {
            transform: skew(10deg) scaleX(1);
            border-radius: 0;
        }
        100% {
            transform: skew(0deg) scaleX(1);
            border-radius: 40px;
        }
    }
    @keyframes slideInLeft {
        from {
            transform: translateX(-100px) translateY(-50%);
            opacity: 0;
        }
        to {
            transform: translateX(0) translateY(-50%);
            opacity: 1;
        }
    }
    @keyframes slideInUp {
        from {
            transform: translateY(100px) translateX(-50%);
            opacity: 0;
        }
        to {
            transform: translateY(0) translateX(-50%);
            opacity: 1;
        }
    }
    @keyframes glowPulse {
        0%,
        100% {
            box-shadow: 0 0 10px rgba(111, 211, 255, 0.3);
        }
        50% {
            box-shadow: 0 0 25px rgba(111, 211, 255, 0.6);
        }
    }

    :global(body) {
        margin: 0;
        background: #1a1a1a;
        overflow: hidden;
        font-family: sans-serif;
    }

    section {
        height: 100vh;
        width: 100%;
        display: flex;
        overflow: hidden;
    }

    /* VIDEO CON BLUR FISSO E BRIGHTNESS RIDOTTA */
    .bg-video {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: 0;
        filter: blur(10px) brightness(0.6); /* Blur fisso qui */
    }

    /* HEADER / SIDEBAR (DESKTOP) */
    header {
        position: fixed;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        width: 70px;
        height: auto;
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(15px);
        -webkit-backdrop-filter: blur(15px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 40px;
        z-index: 100;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 25px 5px;
        transition: width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }
    header.mounted {
        animation: slideInLeft 0.8s ease-out forwards;
    }
    .icon-menu {
        display: inline-block;
        width: 32px;
        height: 32px;
        background-color: currentColor;

        /* Usa la variabile definita nell'HTML */
        -webkit-mask-image: var(--icon-url);
        mask-image: var(--icon-url);

        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        mask-size: contain;
        mask-position: center;
    }

    .nav-logo {
        margin-bottom: 30px;
        color: #6fd3ff;
        display: block;
    }
    .nav-links {
        display: flex;
        flex-direction: column;
        gap: 15px;
        width: 100%;
    }

    .nav-btn {
        height: 50px;
        width: 100%;
        cursor: pointer;
        background: transparent;
        border: 1px solid transparent;
        border-radius: 25px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        white-space: nowrap;
        position: relative;
    }

    .nav-btn .icon {
        font-size: 1.4rem;
        min-width: 40px;
        display: flex;
        justify-content: center;
    }
    .nav-btn .label {
        opacity: 0;
        max-width: 0;
        overflow: hidden;
        transition: 0.3s;
        font-weight: 600;
    }
    header.expanded .nav-btn .label {
        opacity: 1;
        max-width: 150px;
        margin-left: 10px;
    }

    /* STATO CLICCATO - Effetto Bianco come nell'immagine */
    .nav-btn.clicked {
        background: #fff !important;
        color: #1a1a1a !important;
        animation: glowPulse 2s infinite;
    }

    /* --- EFFETTO HOVER SUI BOTTONI --- */
    .nav-btn:hover:not(.clicked) {
        background: rgba(
            255,
            255,
            255,
            0.15
        ); /* Sfondo leggermente più chiaro */
        border-color: rgba(111, 211, 255, 0.3); /* Bordino azzurro sottile */
        color: #6fd3ff; /* Testo e icona diventano azzurri */
    }

    .nav-btn:hover .icon {
        transform: scale(1.2); /* L'icona si ingrandisce leggermente */
        transition: transform 0.3s ease;
    }

    @media (min-width: 768px) {
        header.expanded {
            width: 200px;
            padding: 25px 15px;
            align-items: flex-start;
        }

    }


    /* RESPONSIVE (MOBILE) */
    @media (max-width: 768px) {
        header {
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            height: 70px;
            flex-direction: row;
            padding: 0 15px;
            border-radius: 35px;
            animation: slideInUp 0.8s ease-out forwards !important;
        }
        header.expanded {
            width: 90%;
        }
        .nav-logo {
            display: none;
        }
        .nav-links {
            flex-direction: row;
            justify-content: space-around;
            gap: 10px;
        }
        .nav-btn {
            flex: 1;
            height: 55px;
            flex-direction: column;
        }
        .nav-btn .label {
            opacity: 1;
            max-width: none;
            font-size: 0.65rem;
            margin: 0;
        }
        .nav-btn .icon {
            font-size: 1.2rem;
            min-width: auto;
        }

        .content-wrapper {
            padding-top: 100px;
        }
    }

    /* CONTENITORE PRINCIPALE */
    #main-container {
        flex: 1;
        position: relative;
        height: 100vh;
        width: 100%;
    }
    #slot-container {
        position: relative;
        z-index: 1;
        height: 100%;
        width: 100%;
        overflow-y: auto;
    }

    /* TORNA SU */
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background: rgba(111, 211, 255, 0.2);
        border: 1px solid rgba(111, 211, 255, 0.4);
        color: #6fd3ff;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 10;
        backdrop-filter: blur(10px);
        opacity: 0;
        pointer-events: none;
        transition: 0.4s;
    }
    .back-to-top.visible {
        opacity: 1;
        pointer-events: auto;
    }

    footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        color: #666;
        font-size: 0.75rem;
        transition: 0.5s;
        z-index: 5;
        opacity: 0;
    }
    footer.scrolled {
        opacity: 1;
        height: 40px;
    }

    /* SCROLLBAR PERSONALIZZATA */
    * {
        scrollbar-width: thin;
        scrollbar-color: #6fd3ff #081a33;
    }
    *::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }
    *::-webkit-scrollbar-track {
        background: #081a33;
        border-radius: 10px;
    }
    *::-webkit-scrollbar-thumb {
        background: #6fd3ff;
        border-radius: 10px;
        border: 2px solid #081a33;
    }
    *::-webkit-scrollbar-thumb:hover {
        background: #2a6cff;
    }
</style>
