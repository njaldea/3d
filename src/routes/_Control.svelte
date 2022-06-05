<script lang="ts">
    export let target: string;
    export let intensity: number;
    export let direction: [number, number, number];
    export let position: [number, number, number];
    export let rotation: [number, number, number];
    export let scaling: [number, number, number];
    export let color: [number, number, number];
    export let toggle: boolean;
    export let materialID: string;
</script>

<div class="top">
    <select bind:value={target}>
        {#each ['', 'box1', 'box2', 'box3', 'box4', 'group1'] as id}
            <option value={id}>
                {id}
            </option>
        {/each}
    </select>
    <button on:click={() => (toggle = !toggle)}>{toggle}</button>
    <select bind:value={materialID}>
        {#each ['standard', 'grid'] as id}
            <option value={id}>
                {id}
            </option>
        {/each}
    </select>
    <div>color</div>
    <input type="range" min="0" max="1" step="0.01" bind:value={color[0]} />
    <input type="range" min="0" max="1" step="0.01" bind:value={color[1]} />
    <input type="range" min="0" max="1" step="0.01" bind:value={color[2]} />
    <div>intensity</div>
    <input type="range" min="0" max="1" step="0.01" bind:value={intensity} />
    <div>direction</div>
    <input type="range" min="-10" max="10" step="0.01" bind:value={direction[0]} />
    <input type="range" min="-10" max="10" step="0.01" bind:value={direction[1]} />
    <input type="range" min="-10" max="10" step="0.01" bind:value={direction[2]} />
    <div>position</div>
    <input type="range" min="-10" max="10" step="0.01" bind:value={position[0]} />
    <input type="range" min="-10" max="10" step="0.01" bind:value={position[1]} />
    <input type="range" min="-10" max="10" step="0.01" bind:value={position[2]} />
    <div>rotation</div>
    <input type="range" min="-10" max="10" step="0.01" bind:value={rotation[0]} />
    <input type="range" min="-10" max="10" step="0.01" bind:value={rotation[1]} />
    <input type="range" min="-10" max="10" step="0.01" bind:value={rotation[2]} />
    <div>scaling</div>
    <input type="range" min="0.001" max="10" step="0.01" bind:value={scaling[0]} />
    <input type="range" min="0.001" max="10" step="0.01" bind:value={scaling[1]} />
    <input type="range" min="0.001" max="10" step="0.01" bind:value={scaling[2]} />
</div>

<style>
    .top {
        position: absolute;
        display: flex;
        flex-direction: column;
        top: 0;
        left: 0;
        margin-top: 10px;
        margin-left: 10px;
        background-color: rgb(179, 11, 11);
        color: white;
        padding: 5px;
        user-select: none;
    }
</style>
