<slot />

<nav>
    <ul>
        <li><a href="/imperative">Imperative</a></li>
        <li><a href="/">Simple</a></li>
        <li><a href="/debug">Simple Debug</a></li>
        <li><a href="/multiengine">Multiple Engines</a></li>
    </ul>
</nav>

<style>
    nav {
        position: absolute;
        display: block;
        width: 25px;
        height: 100%;
        top: 0;
        left: 0;
        background-color: black;
        color: white;
        padding: 5px;
        overflow: hidden;
        transition: width 1s;
    }

    nav > * {
        display: none;
    }

    nav:hover {
        width: 200px;
    }

    nav:hover > * {
        width: auto;
        display: block;
    }

    ul {
        list-style-type: none;
    }

    li {
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    a {
        display: block;
        text-decoration: none;
        color: inherit;
    }

    a:visited {
        color: white;
    }

    li:hover {
        background-color: rgb(145, 145, 145);
        color: hsl(240, 60%, 54%);
    }
</style>
