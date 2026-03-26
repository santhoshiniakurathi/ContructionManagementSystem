function router(pageId) {
    document.querySelectorAll('section').forEach(sec => {
        sec.classList.remove('active-section');
    });
    document.querySelectorAll('nav button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active-section');
    const navBtn = document.getElementById('nav-' + pageId);
    if(navBtn) navBtn.classList.add('active');
    if(pageId === 'blueprint') loadBlueprint('living');
}
function calculateCost() {
    const area = parseFloat(document.getElementById("area").value);
    const rate = parseFloat(document.getElementById("quality").value);
    const resultBox = document.getElementById("result");
    if (!area || area <= 0) {
        alertUser("Please enter a valid area.");
        return;
    }
    const total = area * rate;
    const labor = total * 0.4;
    const materials = total * 0.6;
    document.getElementById("baseCost").innerText = "$" + materials.toLocaleString() + " (Materials)";
    document.getElementById("totalCost").innerText = "$" + total.toLocaleString();     
    resultBox.style.display = "block";
}
function clearResult() {
    document.getElementById("result").style.display = "none";
}
function loadBlueprint(type) {
    const svg = document.getElementById("blueprintCanvas");
    const buttons = document.querySelectorAll('.blueprint-controls button');
    buttons.forEach(btn => btn.classList.remove('active'));
    document.getElementById('btn-' + type).classList.add('active');
    let content = "";
    if (type === 'living') {
        content = `
            <rect x="50" y="50" width="300" height="200" class="wall" />
            <rect x="150" y="50" width="60" height="10" class="door" />
            <rect x="50" y="120" width="10" height="60" class="window" />
            <rect x="340" y="120" width="10" height="60" class="window" />
            <text x="200" y="150" class="room-label" text-anchor="middle">LIVING AREA</text>
            <line x1="50" y1="260" x2="350" y2="260" class="dimension" />
            <text x="200" y="280" class="dim-text" text-anchor="middle">20' - 0"</text>
            <line x1="40" y1="50" x2="40" y2="250" class="dimension" />
            <text x="30" y="150" class="dim-text" text-anchor="middle" transform="rotate(-90 30,150)">15' - 0"</text>`;
    } 
    else if (type === 'master') {
        content = `
            <rect x="50" y="50" width="300" height="200" class="wall" />
            <rect x="50" y="50" width="60" height="10" class="door" />
            <rect x="180" y="50" width="80" height="10" class="window" />
            <circle cx="280" cy="150" r="30" fill="rgba(255,255,255,0.1)" />
            <text x="200" y="150" class="room-label" text-anchor="middle">MASTER BEDROOM</text>
            <line x1="50" y1="260" x2="350" y2="260" class="dimension" />
            <text x="200" y="280" class="dim-text" text-anchor="middle">22' - 0"</text>`;
    } 
    else if (type === 'kitchen') {
        content = `
            <rect x="50" y="50" width="300" height="200" class="wall" />
            <path d="M50,50 V200 H150" class="wall" /> <!-- L shape counter -->
            <rect x="80" y="80" width="30" height="40" class="window" />
            <rect x="50" y="150" width="10" height="30" class="door" />
            <text x="220" y="150" class="room-label" text-anchor="middle">MODULAR KITCHEN</text>
            <rect x="160" y="50" width="40" height="40" class="window" />`;
    }
    svg.innerHTML = content;
}
function handleEnter(e) {
    if (e.key === 'Enter') sendMessage();
}
function sendMessage() {
    const input = document.getElementById("userMsg");
    const history = document.getElementById("chatHistory");
    const msg = input.value.trim().toLowerCase();
    if (msg === "") return;
    appendMessage(input.value, "user-msg");
    input.value = "";
    setTimeout(() => {
        const reply = getBotReply(msg);
        appendMessage(reply, "bot-msg");
    }, 600);
}
function appendMessage(text, className) {
    const history = document.getElementById("chatHistory");
    const div = document.createElement("div");
    div.className = `message ${className}`;
    div.innerText = text;
    history.appendChild(div);
    history.scrollTop = history.scrollHeight;
}
function getBotReply(msg) {
    if (msg.includes("cost") || msg.includes("price") || msg.includes("estimate")) {
        return "You can get a detailed cost estimate by navigating to the 'Estimate' tab in the menu.";
    }
    if (msg.includes("interior") || msg.includes("design")) {
        return "We offer a wide range of interior designs including modern living rooms, luxury bedrooms, and modular kitchens. Check the 'Interior' tab!";
    }
    if (msg.includes("blueprint") || msg.includes("plan")) {
        return "Our interactive Blueprint Viewer allows you to visualize 2D floor plans. Click the 'Blueprints' tab to try it.";
    }
    if (msg.includes("contact") || msg.includes("help")) {
        return "For direct support, please email us at support@constructionpro.com or call 555-0123.";
    }
    return "I'm not sure about that. Could you ask specifically about costs, interior designs, or blueprints?";
}
function alertUser(msg) {
    const div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.top = '20px';
    div.style.left = '50%';
    div.style.transform = 'translateX(-50%)';
    div.style.background = '#ff4757';
    div.style.color = 'white';
    div.style.padding = '10px 20px';
    div.style.borderRadius = '5px';
    div.style.zIndex = '2000';
    div.innerText = msg;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3000);
}
window.onload = function() {
    router('home'); 
};        