<script>
    export let reverse = false;
    export let url = null;
    export let txt = "";

    $: isSingle = !url;
</script>

<section class:is-single={isSingle}>
        {#if reverse}
            {#if txt}
                <div class="txt" style="border-left: 2px solid #ffffff5d;">
                    <p>{txt}</p>
                </div>
            {/if}

            {#if url}
                <div class="img" style="background-image: url({url})"></div>
            {/if}
        {:else}
            {#if url}
                <div class="img" style="background-image: url({url})"></div>
            {/if}

            {#if txt}
                <div class="txt" style="border-right: 2px solid #ffffff5d;">
                    <p>{txt}</p>
                </div>
            {/if}
        {/if}
</section>

<style>
    section {
        height: 40%;
        width: 95%;
        margin-left: 2.5%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }

    .txt {
        height: 80%;
        flex: 0 0 55%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: transparent;
    }

    .img {
        height: 90%;
        flex: 0 0 35%;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        border-radius: 10px;
        box-shadow: 0px 0px 10px 10px #66b9e95d;
    }

    section.is-single .txt {
        flex: 1 1 100%;
    }

    p {
        font-weight: bold;
        font-size: 1rem;
        color: var(--color-text-p);
    }
</style>
