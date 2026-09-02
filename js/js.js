const API_URL = "https://mnor.pp.ua";

const tips = [
    "Если навестись на любой объект и нажать ALT + E, Вы сможете на него сесть",
    "Наш сайт - mnor.pp.ua",
    "Следите за новостями сервера в нашем Discord",
    "Соблюдайте правила сервера — они помогают всем играть комфортно",
    "Вы можете пожаловаться на нарушителя через раздел «Жалоба» на сайте",
    "В игровом магазине можно приобрести уникальные привилегии",
    "Не уверены в правилах? Загляните в раздел «Правила» на сайте",
    "Проблемы с покупкой? Обратитесь в поддержку через сайт"
];

let shuffledTips = [];
let currentTipIndex = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function prepareTips(previousLastTip) {
    shuffledTips = [...tips];
    shuffleArray(shuffledTips);

    if (previousLastTip && shuffledTips[0] === previousLastTip && shuffledTips.length > 1) {
        [shuffledTips[0], shuffledTips[1]] = [shuffledTips[1], shuffledTips[0]];
    }

    currentTipIndex = 0;
}

function showTip() {
    const tipMessage = document.getElementById("tipMessage");
    if (!tipMessage) return;

    if (currentTipIndex >= shuffledTips.length) {
        prepareTips(shuffledTips[shuffledTips.length - 1]);
    }

    tipMessage.style.opacity = 0;

    setTimeout(() => {
        tipMessage.textContent = shuffledTips[currentTipIndex];
        tipMessage.style.opacity = 1;
        currentTipIndex++;
    }, 300);
}

async function fetchServerStatus() {
    try {
        const response = await fetch(`${API_URL}/api/monitoring`);
        if (!response.ok) return;

        const data = await response.json();
        renderServerStatus(data);
    } catch (err) { }
}

function renderServerStatus(data) {
    const currentOnline = document.getElementById("currentOnline");
    const maxOnline = document.getElementById("maxOnline");
    const mapName = document.getElementById("mapName");
    const serverNameDisplay = document.getElementById("serverNameDisplay");

    if (currentOnline) currentOnline.textContent = data.online ? data.players : "-";
    if (maxOnline) maxOnline.textContent = data.online ? data.maxPlayers : "-";
    if (mapName) mapName.textContent = data.online ? data.map : "-";
    if (serverNameDisplay && data.online && data.serverName) {
        serverNameDisplay.textContent = data.serverName;
    }
}

let totalFiles = 0;
let neededFiles = 0;

function setStatus(text) {
    const statusEl = document.getElementById("loadStatus");
    if (statusEl) statusEl.textContent = text;
}

function setProgress(percent) {
    const fillEl = document.getElementById("loadProgressFill");
    if (fillEl) fillEl.style.width = `${percent}%`;
}

function refreshProgress() {
    if (totalFiles <= 0) return;
    const downloaded = totalFiles - neededFiles;
    const percent = Math.min(100, Math.max(0, Math.round((downloaded / totalFiles) * 100)));
    setProgress(percent);
}

window.SetFilesTotal = function (total) {
    totalFiles = total;
    refreshProgress();
};

window.SetFilesNeeded = function (needed) {
    neededFiles = needed;
    refreshProgress();
};

window.DownloadingFile = function (fileName) {
    setStatus(`Загрузка: ${fileName}`);
};

window.SetStatusChanged = function (status) {
    setStatus(status);

    if (status === "Workshop Complete") {
        setProgress(50);
    } else if (status === "Client info sent!") {
        setProgress(80);
    } else if (status === "Sending Client Info" || status === "Starting Lua...") {
        setProgress(100);
        setStatus("Инициализация завершена");
    }
};

document.addEventListener("DOMContentLoaded", () => {
    prepareTips();
    showTip();
    setInterval(showTip, 5000);

    fetchServerStatus();
    setInterval(fetchServerStatus, 5000);
});