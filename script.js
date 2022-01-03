const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

toggleSwitch.addEventListener('change', switchTheme, false);


function gridshow() {
    var styleEl = document.getElementById('css-layout-hack');
    if (styleEl) { styleEl.remove(); return; } styleEl = document.createElement('style'); styleEl.id = 'css-layout-hack'; styleEl.innerHTML = '* { background:#000!important;color:#0f0!important;outline:solid #f00 1px!important; background-color: rgba(255,0,0,.2) !important; }\     * * { background-color: rgba(0,255,0,.2) !important; }\     * * * { background-color: rgba(0,0,255,.2) !important; }\     * * * * { background-color: rgba(255,0,255,.2) !important; }\     * * * * * { background-color: rgba(0,255,255,.2) !important; }\     * * * * * * { background-color: rgba(255,255,0,.2) !important; }\     * * * * * * * { background-color: rgba(255,0,0,.2) !important; }\     * * * * * * * * { background-color: rgba(0,255,0,.2) !important; }\     * * * * * * * * * { background-color: rgba(0,0,255,.2) !important; }';
    document.body.append(styleEl);
}
