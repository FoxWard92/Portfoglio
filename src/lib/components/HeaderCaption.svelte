<script>
    export let url1 = null;
    export let url2 = null;
    export let url3 = null;
    export let title = "";
    export let subtitle = "";
    export let logo = null;

    $: images = [url1, url2, url3].filter(Boolean);
</script>

<section class="img" style="background-image: {images.length === 1 ? `url('${images[0]}')`: 'none'};">
    <div id="header">
        <div id="logo-container">
            {#if logo}
                <img src={logo} alt="" />
            {/if}
        </div>

        <div id="title-container">
            {#if title}
                <h1>{title}</h1>
            {/if}
        </div>

        <div id="subtitle-container">
            {#if subtitle}
                <h2>{subtitle}</h2>
            {/if}
        </div>
    </div>

    {#if images.length !== 1}
        {#each images as url}
            <div class="multi img" style="background-image: url('{url}')">
            </div>
        {/each}
    {/if}
</section>

<style>
    section {
        width: 95%;
        height: 95%;
        margin: 2.5%;
        display: flex;
        justify-content: center;
        border-radius: 20px;
        flex-wrap: wrap;
        overflow: hidden;
    }

    #header {
        width: 100%;
        height: 10%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    #title-container {
        flex: 0 0 50%;
    }

    #subtitle-container,
    #logo-container {
        flex: 0 0 20%;
    }

    #logo-container,
    #subtitle-container,
    #title-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: 2px solid #ffffff7c;
    }

    h1 {
        font-size: 3rem;
        padding: 1% 10%;
        border-bottom: 2px solid #ffffff5d;
    }

    h2 {
        font-size: 1rem;
    }

    h2,
    h1 {
        margin: 0%;
        text-transform: capitalize;
        color: var(--color-text-h1);
    }

    .img {
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }

    .multi {
        width: 30%;
        height: 80%;
        display: flex;
        justify-content: center;
        align-items: center;
        clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
    }

    @media (max-width: 768px) {
        .multi {
            width: 90%;
            height: 30vh;
            clip-path: none;
            border-radius: 10px;
        }
    }
</style>
