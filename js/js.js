// let colors = ['#ffffff', '#f0f0f0', '#e6e6e6', '#f9f9f9'];
// let snowflakeCount = 50;

// for (let i = 0; i < snowflakeCount; i++) {
//     let snowflake = document.createElement('div');
//     snowflake.classList.add('snowflake');

//     let size = Math.random() * 5 + 2;
//     snowflake.style.width = `${size}px`;
//     snowflake.style.height = `${size}px`;

//     snowflake.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
//     snowflake.style.left = `${Math.random() * window.innerWidth}px`;

//     let duration = Math.random() * 3 + 3;
//     snowflake.style.animationDuration = `${duration}s`;

//     let delay = Math.random() * 5;
//     snowflake.style.animationDelay = `${delay}s`;

//     let wind = (Math.random() - 0.5) * 100;
//     snowflake.style.setProperty('--wind', `${wind}px`);

//     document.body.appendChild(snowflake);
// }

async function updatePlayerCount() {
    const playersEl = document.getElementById("players");
    const maxPlayersEl = document.querySelector(".maxPlayers");
    const mapEl = document.getElementById("mapName");

    try {
        const response = await fetch("http://192.168.0.111:8080/user_monitoring");
        const data = await response.json();

        if (data.status === "success") {
            if (playersEl) playersEl.textContent = data.players ?? "-";
            if (maxPlayersEl) maxPlayersEl.textContent = data.max_players ?? "-";
            if (mapEl) mapEl.textContent = data.map ?? "-";
        } else {
            if (playersEl) playersEl.textContent = "-";
            if (maxPlayersEl) maxPlayersEl.textContent = "-";
            if (mapEl) mapEl.textContent = "-";
        }
    } catch (error) {
        if (playersEl) playersEl.textContent = "-";
        if (maxPlayersEl) maxPlayersEl.textContent = "-";
        if (mapEl) mapEl.textContent = "-";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updatePlayerCount();
    setInterval(updatePlayerCount, 10000);
});