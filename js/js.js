let colors = ['#ffffff', '#f0f0f0', '#e6e6e6', '#f9f9f9'];
let snowflakeCount = 50;

for (let i = 0; i < snowflakeCount; i++) {
    let snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');

    let size = Math.random() * 5 + 2;
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;

    snowflake.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    snowflake.style.left = `${Math.random() * window.innerWidth}px`;

    let duration = Math.random() * 3 + 3;
    snowflake.style.animationDuration = `${duration}s`;

    let delay = Math.random() * 5;
    snowflake.style.animationDelay = `${delay}s`;

    let wind = (Math.random() - 0.5) * 100;
    snowflake.style.setProperty('--wind', `${wind}px`);

    document.body.appendChild(snowflake);
}