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

    // Funzione per tornare su con scroll fluido
    function scrollToTop() {
        if (ScreenContainerScroll) {
            ScreenContainerScroll.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
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

                        targetTime = Math.max(
                            0,
                            Math.min(targetTime, videoElement.duration),
                        );

                        videoElement.currentTime = targetTime;
                    }
                }
                ticking = false;
            });
            ticking = true;
        }
    }

    onMount(() => {
        const segments = window.location.pathname.split("/").filter(Boolean);
        SegmentActiveLink = segments.at(-1) ?? "";
        requestAnimationFrame(() => setTimeout(() => (mounted = true), 80));
        handleScroll();
    });
</script>

<section>
    <header class:scrolled class:mounted>
        <button
            class="nav-btn btn-home"
            class:scrolled
            class:clicked={SegmentActiveLink === "Portfoglio" || SegmentActiveLink === ""}
            class:mounted
            on:click={() => {
                SegmentActiveLink = "Portfoglio";
                goto(`${base}/`);
            }}>Home</button>

        <button
            class="nav-btn btn-edu"
            class:scrolled
            class:clicked={SegmentActiveLink === "educazione_civica"}
            class:mounted
            on:click={() => {
                SegmentActiveLink = "educazione_civica";
                goto(`${base}/educazione_civica`);
            }}>Educazione Civica</button>
    </header>

    <div id="main-container">
        <video
            bind:this={videoElement}
            src="{base}/asset/background/bg.mp4"
            muted
            playsinline
            preload="auto"
            class="bg-video"><track kind="captions" /></video>

        <div
            id="slot-container"
            bind:this={ScreenContainerScroll}
            on:scroll={handleScroll}
        >
            <div class="content-wrapper"><slot /></div>
        </div>

        <button 
            class="back-to-top" 
            class:visible={scrolled} 
            on:click={scrollToTop}
            aria-label="Torna su"
        >
            <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" fill="currentColor"/>
            </svg>
        </button>
    </div>

    <footer class:scrolled>
        &copy; {new Date().getFullYear()} Portfolio Digitale — Codice, Creatività e Futuro.
    </footer>
</section>

<style>
    /* ... (I tuoi keyframes e stili precedenti rimangono uguali) ... */
    @keyframes dropBounce { 0% { transform: translateY(-140px) rotate(12deg) skew(10deg); opacity: 0; } 50% { transform: translateY(22px) rotate(-3deg) skew(7deg); opacity: 1; } 68% { transform: translateY(-12px) rotate(1deg) skew(9deg); } 80% { transform: translateY(7px) skew(10deg); } 90% { transform: translateY(-4px) skew(10deg); } 96% { transform: translateY(2px) skew(10deg); } 100% { transform: translateY(0) skew(10deg); opacity: 1; } }
    @keyframes morphToPill { 0% { transform: skew(10deg) scaleX(1); border-radius: 0; } 30% { transform: skew(-2deg) scaleX(1.06); border-radius: 4px; } 55% { transform: skew(3deg) scaleX(0.97); border-radius: 8px; } 75% { transform: skew(-1deg) scaleX(1.01); border-radius: 14px; } 100% { transform: skew(0deg) scaleX(1); border-radius: 20px; } }
    @keyframes slideDownHeader { from { transform: translateY(-60px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes glowPulse { 0%, 100% { box-shadow: -5px 5px 15px rgba(0, 150, 255, 0.3); } 50% { box-shadow: -5px 5px 35px rgba(0, 200, 255, 0.7), 0 0 22px rgba(100, 220, 255, 0.35); } }

    :global(body) { margin: 0; background: #1a1a1a; }
    section { height: 100vh; width: 100%; max-width: 2500px; margin: auto; display: flex; flex-direction: column; align-items: center; overflow: hidden; }

    header { width: 100%; max-width: 2500px; height: 80px; display: flex; justify-content: space-around; align-items: center; overflow: visible; position: absolute; bottom: 5%; z-index: 2; opacity: 0; transition: bottom 0.72s cubic-bezier(0.4, 0, 0.2, 1); }
    header.mounted { animation: slideDownHeader 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.05s both; }
    header.scrolled { bottom: calc(100% - 80px); }

    .nav-btn { height: 44px; width: clamp(120px, 18%, 220px); cursor: pointer; background: linear-gradient(-135deg, rgba(100, 200, 255, 0.85), rgba(160, 210, 255, 0.75)); transform: skew(10deg); border: none; border-radius: 0; font-size: 1rem; font-weight: 700; font-family: Arial, Helvetica, sans-serif; color: #fff; position: relative; opacity: 0; transition: background 0.45s ease, color 0.35s ease, box-shadow 0.4s ease, border-radius 0.5s ease, translate 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
    .nav-btn::before { content: ""; position: absolute; top: 10px; left: -20px; width: 20px; height: 100%; background: linear-gradient(180deg, rgba(70, 170, 230, 0.8), rgba(130, 180, 220, 0.7)); transform: skewY(-45deg); transition: opacity 0.4s ease, background 0.4s ease; }
    .nav-btn::after { content: ""; position: absolute; bottom: -20px; left: -10px; width: 100%; height: 20px; background: linear-gradient(-90deg, rgba(50, 150, 210, 0.8), rgba(110, 160, 200, 0.7)); transform: skewX(-45deg); transition: opacity 0.4s ease, background 0.4s ease; }

    .btn-home.mounted { animation: dropBounce 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both; }
    .btn-edu.mounted { animation: dropBounce 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.38s both; }
    .btn-home.scrolled { animation: morphToPill 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0s both; background: rgba(255, 255, 255, 0.12); color: rgba(255, 255, 255, 0.85); border: 1px solid rgba(255, 255, 255, 0.25); backdrop-filter: blur(8px); }
    .btn-edu.scrolled { animation: morphToPill 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.14s both; background: rgba(255, 255, 255, 0.12); color: rgba(255, 255, 255, 0.85); border: 1px solid rgba(255, 255, 255, 0.25); backdrop-filter: blur(8px); }
    .nav-btn.scrolled::before, .nav-btn.scrolled::after { opacity: 0; pointer-events: none; }
    .nav-btn:hover, .nav-btn.clicked { translate: 10px -10px; color: #003355; }
    .nav-btn.scrolled:hover { background: rgba(255, 255, 255, 0.22); color: #fff; translate: 0 -3px; }
    .nav-btn.clicked:not(.scrolled) { background: linear-gradient(-135deg, rgb(165, 230, 255), rgba(171, 228, 255, 0.95)); animation: glowPulse 2.5s ease-in-out infinite !important; }

    /* ─── PULSANTE TORNA SU ──────────────────────────────────────── */
    .back-to-top {
        position: absolute;
        bottom: 70px; /* Sopra il footer */
        right: 30px;
        width: 50px;
        height: 50px;
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
        transform: translateY(20px);
        transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .back-to-top.visible {
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0);
    }

    .back-to-top:hover {
        background: rgba(111, 211, 255, 0.4);
        transform: scale(1.1);
        color: #fff;
    }

    /* ─── CONTENITORI ───────────────────────────────────────────── */
    #main-container { flex: 1; width: 100%; position: relative; overflow: hidden; }
    .bg-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; }
    #slot-container { position: relative; z-index: 1; height: 100%; width: 100%; overflow-y: auto; backdrop-filter: blur(10px); }
    .content-wrapper { min-height: 200vh; width: 100%; }

    footer { height: 0; width: 100%; overflow: hidden; opacity: 0; display: flex; justify-content: center; align-items: center; background: linear-gradient(90deg, #1a1a1a, #2a2a2a); font-size: 0.78rem; color: #666; border-top: 1px solid #2a2a2a; transform: translateY(20px); transition: height 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.08s, opacity 0.5s ease 0.18s, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.08s; }
    footer.scrolled { height: 48px; opacity: 1; transform: translateY(0); }

    * { scrollbar-width: thin; scrollbar-color: #6fd3ff #081a33; }
    *::-webkit-scrollbar { width: 10px; height: 10px; }
    *::-webkit-scrollbar-track { background: #081a33; border-radius: 10px; }
    *::-webkit-scrollbar-thumb { background: #6fd3ff; border-radius: 10px; border: 2px solid #081a33; }
    *::-webkit-scrollbar-thumb:hover { background: #2a6cff; }
</style>