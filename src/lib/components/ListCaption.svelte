<script>
    export let info = "";
    export let titles = [];
    export let subtitle = "";

    export let matrix = [[]];

    let index = 0;
</script>

<section>
    <div id="header">
        <div class="subtitle-container">
            {#if info}
                <h2>{info}</h2>
            {/if}
        </div>

        <div id="title-container">
            {#if titles[index]}
                <h1>{titles[index]}</h1>
            {/if}
        </div>

        <div class="subtitle-container">
            {#if subtitle}
                <h2>{subtitle}</h2>
            {/if}
        </div>
    </div>

    <div id="article-list">
        {#if matrix.length > index}
            <ul>
                {#each matrix[index] as elem}
                    <li>
                        <a href={elem.pathlink}
                            ><img src={elem.pathimg} alt="" />
                            <p>{elem.name}</p>
                            <span></span>
                        </a>
                    </li>
                {/each}
            </ul>
        {/if}
    </div>

    <div id="buttons-list">
        {#each matrix as _, i}
                <button class:button-active = {index === i} on:click={() => {index = i} } >{i+1}</button>
            {/each}
    </div>
</section>

<style>
    section {
        height: 55%;
        width: 95%;
        margin-left: 2.5%;
        gap: 1rem;
    }

    #header {
        height: 20%;
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    #article-list {
        height: 70%;
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    #buttons-list {
        height: 10%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
    }

    #title-container {
        flex: 0 0 50%;
    }

    .subtitle-container {
        flex: 0 0 20%;
    }

    .button-active{
        background-color: #66b9e9;
    }

    h1 {
        margin: 0%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 3rem;
        padding: 0% 10%;
        color: var(--color-text-h1);
    }

    h2 {
        font-size: 1rem;
        color: rgb(192, 192, 192);
        text-align: center;
        text-transform: uppercase;
    }

    ul {
        height: 100%;
        width: 100%;
        margin: 0%;
        padding: 0%;
        display: flex;
        list-style: none;
        flex-direction: column;
        align-items: center;
        flex-wrap: wrap;
        gap: 1rem;
        overflow: scroll;
    }

    li {
        height: 30%;
        width: 30%;
        background-color: #283f5c;
        border-radius: 20px;
        overflow: hidden;
    }

    li a {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        width: 100%;
        text-decoration: none;
    }

    span {
        height: 100%;
        width: 10%;
        background-color: #bfc8d6b9;
        text-decoration: none;
        transition: all 1s ease;
    }

    a:hover > span {
        transform: scaleX(20);
    }

    p {
        font-size: 1.5rem;
        color: var(--color-text-p);
    }

    img {
        height: 100%;
        width: 40%;
    }

    button {
        height: 50%;
        width: 2%;
        background-color: #283f5c;
        border: none;
        border-radius: 10px;
        color: white;
        font-size: 1rem;
        cursor: pointer;
    }
</style>
