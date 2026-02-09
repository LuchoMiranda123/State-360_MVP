/**
 * STATE 360 - CORE LOGIC
 * Prototipo Multifamily con Módulo de KPIs
 */

const DATA = {
    userRole: "STAFF",
    currentOrg: null,
    isLoggedIn: false,
    billingStatus: "paid",
    
    orgs: [
        { id: 1, name: "Hommie Admin", plan: "Premium", units: 150, seats: 5, status: "Active" },
        { id: 2, name: "Edificios Miraflores", plan: "Premium", units: 45, seats: 3, status: "Active" }
    ],

    leads: [
        { id: 101, name: "Juan Pérez", email: "juan@mail.com", phone: "987 654 321", stage: "Visita", unit: "101-A", date: "2023-10-25" },
        { id: 102, name: "Maria Garcia", email: "m.garcia@mail.com", phone: "912 345 678", stage: "Aplicación", unit: "402-B", date: "2023-10-26" },
        { id: 103, name: "Carlos Ruiz", email: "cruiz@mail.com", phone: "945 678 123", stage: "Nuevo", unit: "205-A", date: "2023-10-27" },
        { id: 104, name: "Empresa Textil SAC", email: "admin@textil.pe", phone: "999 000 111", stage: "Aprobado", unit: "Local 01", date: "2023-10-28" }
    ],

    properties: [
        { id: 1, name: "Torre Miraflores", address: "Av. Larco 123", district: "Miraflores", unitsCount: 50, img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400" },
        { id: 2, name: "Edificio San Isidro", address: "Calle Los Pinos 456", district: "San Isidro", unitsCount: 35, img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400" }
    ],

    units: [
        { id: 1, code: "101-A", type: "2B/2B", status: "Ocupada", rent: 2500, property: "Torre Miraflores" },
        { id: 2, code: "102-A", type: "1B/1B", status: "Disponible", rent: 1800, property: "Torre Miraflores" },
        { id: 3, code: "205-B", type: "3B/2B", status: "Mantenimiento", rent: 3200, property: "Edificio San Isidro" },
        { id: 4, code: "303-C", type: "Studio", status: "Disponible", rent: 1500, property: "Torre Miraflores" }
    ],

    leases: [
        { id: 501, tenant: "Roberto Gomez", unit: "101-A", start: "2023-01-01", end: "2024-01-01", status: "Activo", rent: 2500, day: 5 },
        { id: 502, tenant: "Ana Lora", unit: "303-C", start: "2023-05-15", end: "2024-05-15", status: "Por Firmar", rent: 2100, day: 1 }
    ],

    tickets: [
        { id: 1, title: "Fuga de agua baño", priority: "Alta", status: "Abierto", resident: "Roberto Gomez", date: "2023-11-01" },
        { id: 2, title: "Luz de pasillo fundida", priority: "Baja", status: "Cerrado", resident: "Carla Luna", date: "2023-10-29" }
    ],

    staff: [
        { id: 1, name: "Admin Principal", role: "Owner", email: "admin@state360.pe" },
        { id: 2, name: "Rosa Melendez", role: "Comercial", email: "rosa@state360.pe" },
        { id: 3, name: "Kevin Torres", role: "Operaciones", email: "kevin@state360.pe" }
    ],

    // Datos específicos para KPIs
    kpiHistory: {
        occupancy: [88, 90, 91, 89, 93, 94],
        revenue: [120, 125, 130, 128, 138, 142],
        months: ['May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct'],
        ticketTimes: [4.5, 3.8, 5.2, 4.1, 3.2], // Días
        satisfaction: 8.4 // de 10
    }
};

const Icon = (name) => {
    const icons = {
        home: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>`,
        users: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`,
        building: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>`,
        billing: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>`,
        settings: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`,
        community: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>`,
        chart: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>`,
        inspection: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
    };
    return icons[name] || '';
};

const Badge = (text, type = 'gray') => {
    const colors = { blue: 'bg-blue-100 text-blue-700', green: 'bg-emerald-100 text-emerald-700', red: 'bg-rose-100 text-rose-700', yellow: 'bg-amber-100 text-amber-700', gray: 'bg-slate-100 text-slate-700' };
    return `<span class="px-2.5 py-0.5 rounded-full text-xs font-semibold ${colors[type] || colors.gray}">${text}</span>`;
};

const Router = {
    init() { window.addEventListener('hashchange', () => this.handleRoute()); this.handleRoute(); },
    handleRoute() {
        const hash = window.location.hash || '#/landing';
        const parts = hash.split('/');
        const view = parts[1];
        if (view === 'landing') renderLanding();
        else if (view === 'login') renderLogin();
        else if (view === 'org-selector') renderOrgSelector();
        else if (view === 'app') {
            if (!DATA.isLoggedIn) { window.location.hash = '#/login'; return; }
            renderAppLayout(parts[2] || 'dashboard');
        }
    },
    navigate(path) { window.location.hash = path; }
};

// --- RENDERERS ---

function renderLanding() {
    document.getElementById('main-content').innerHTML = `
        <nav class="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-40 shadow-sm glass-header">
            <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold italic shadow-lg">S</div>
                <span class="text-xl font-bold tracking-tight">State 360</span>
            </div>
            <div class="flex items-center space-x-6">
                <button onclick="Router.navigate('#/login')" class="px-4 py-2 text-slate-600 font-semibold hover:text-blue-600 transition">Iniciar sesión</button>
                <button onclick="Router.navigate('#/login')" class="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100 transition">Empezar ahora</button>
            </div>
        </nav>
        <main class="max-w-6xl mx-auto px-6 py-24 text-center">
            <h1 class="text-6xl md:text-7xl font-black text-slate-900 mb-8 leading-tight">Software Multifamily <br/><span class="text-blue-600">para el Perú.</span></h1>
            <p class="text-xl text-slate-500 mb-12 max-w-3xl mx-auto">La solución líder para la gestión profesional de arriendos.</p>
            <button onclick="Router.navigate('#/login')" class="px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold shadow-2xl hover:bg-black transition">Probar Prototipo Interactivo</button>
        </main>
    `;
}

function renderLogin() {
    document.getElementById('main-content').innerHTML = `
        <div class="min-h-screen flex items-center justify-center bg-slate-100 p-6">
            <div class="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border">
                <div class="text-center mb-10">
                    <div class="w-12 h-12 bg-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold italic shadow-lg">S</div>
                    <h2 class="text-3xl font-bold text-slate-900 mb-2">Bienvenido</h2>
                    <p class="text-slate-500">Gestión de Activos 360°</p>
                </div>
                <div class="space-y-5">
                    <input type="email" class="w-full px-5 py-4 rounded-xl border border-slate-200 outline-none" value="demo@state360.pe">
                    <input type="password" class="w-full px-5 py-4 rounded-xl border border-slate-200 outline-none" value="password123">
                    <button onclick="handleLogin()" class="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg transition">Ingresar</button>
                    <button onclick="toggleRole()" class="w-full py-3 bg-slate-50 text-slate-700 rounded-xl font-bold border hover:bg-white transition text-sm">
                        Alternar Rol: <span class="text-blue-600 font-black">${DATA.userRole}</span>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function handleLogin() { DATA.isLoggedIn = true; Router.navigate('#/org-selector'); }
function toggleRole() { DATA.userRole = DATA.userRole === "STAFF" ? "RESIDENTE" : "STAFF"; notify(`Rol: ${DATA.userRole}`); renderLogin(); }

function renderOrgSelector() {
    document.getElementById('main-content').innerHTML = `
        <div class="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-6 text-center">
            <h2 class="text-4xl font-black text-slate-900 mb-12">Mis Organizaciones</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
                ${DATA.orgs.map(org => `
                    <div onclick="selectOrg(${org.id})" class="bg-white p-8 rounded-3xl shadow-sm border-2 border-transparent hover:border-blue-500 hover:shadow-2xl cursor-pointer transition transform hover:-translate-y-2 text-left">
                        <div class="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 mb-6">${Icon('building')}</div>
                        <h3 class="text-2xl font-bold text-slate-900 mb-1">${org.name}</h3>
                        <p class="text-slate-500 font-medium">${org.units} unidades</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function selectOrg(id) { DATA.currentOrg = DATA.orgs.find(o => o.id === id); Router.navigate('#/app/dashboard'); }

function renderAppLayout(subview) {
    const isResident = DATA.userRole === "RESIDENTE";
    document.getElementById('main-content').innerHTML = `
        <div class="flex h-screen overflow-hidden">
            <aside class="w-64 bg-white border-r flex flex-col flex-shrink-0">
                <div class="p-6 flex items-center space-x-2 border-b">
                    <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold italic">S</div>
                    <span class="text-xl font-black">State 360</span>
                </div>
                <nav class="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
                    ${isResident ? `
                        <div class="text-[10px] font-bold text-slate-400 uppercase mt-4 mb-2 px-4 tracking-widest">Inquilino</div>
                        ${navItem('Dashboard', 'dashboard', 'home', subview)}
                        ${navItem('Mis Pagos', 'billing', 'billing', subview)}
                        ${navItem('Soporte', 'community', 'community', subview)}
                    ` : `
                        ${navItem('Resumen', 'dashboard', 'home', subview)}
                        <div class="text-[10px] font-bold text-slate-400 uppercase mt-6 mb-2 px-4 tracking-widest">Estrategia</div>
                        ${navItem('Análisis / KPIs', 'analytics', 'chart', subview)}
                        <div class="text-[10px] font-bold text-slate-400 uppercase mt-6 mb-2 px-4 tracking-widest">Módulos</div>
                        ${navItem('Leads / CRM', 'leasing', 'users', subview)}
                        ${navItem('Propiedades', 'properties', 'building', subview)}
                        ${navItem('Contratos', 'leases', 'billing', subview)}
                        ${navItem('Cobranza', 'billing', 'billing', subview)}
                        <div class="text-[10px] font-bold text-slate-400 uppercase mt-6 mb-2 px-4 tracking-widest">Operación</div>
                        ${navItem('Comunidad', 'community', 'community', subview)}
                        ${navItem('Inspecciones', 'inspections', 'inspection', subview)}
                        <div class="text-[10px] font-bold text-slate-400 uppercase mt-6 mb-2 px-4 tracking-widest">Sistema</div>
                        ${navItem('Configuración', 'settings', 'settings', subview)}
                    `}
                </nav>
                <div class="p-4 border-t"><button onclick="DATA.isLoggedIn=false; Router.navigate('#/login')" class="w-full text-left px-4 py-3 text-slate-400 text-sm font-bold">Cerrar Sesión</button></div>
            </aside>
            <main class="flex-1 flex flex-col bg-slate-50 overflow-hidden">
                <header class="h-16 bg-white border-b px-8 flex items-center justify-between glass-header">
                    <span class="font-bold text-slate-600 uppercase text-xs tracking-widest">${DATA.currentOrg.name}</span>
                    <div class="flex items-center space-x-4">
                        ${Badge(DATA.userRole, 'blue')}
                        <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">JD</div>
                    </div>
                </header>
                <div class="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    ${renderSubViewContent(subview)}
                </div>
            </main>
        </div>
    `;
}

function navItem(label, key, icon, current) {
    const active = key === current;
    return `
        <a href="#/app/${key}" class="flex items-center px-4 py-3 rounded-xl font-bold text-sm transition group ${active ? 'sidebar-item-active' : 'text-slate-600 hover:bg-slate-50'}">
            <span class="mr-4 ${active ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-600'}">${Icon(icon)}</span> ${label}
        </a>
    `;
}

function renderSubViewContent(view) {
    switch(view) {
        case 'dashboard': return renderDashboard();
        case 'analytics': return renderKPIs();
        case 'leasing': return renderLeasing();
        case 'properties': return renderProperties();
        case 'units': return renderUnits();
        case 'leases': return renderLeases();
        case 'billing': return renderBilling();
        case 'community': return renderCommunity();
        case 'inspections': return renderInspections();
        case 'settings': return renderSettings();
        default: return `<h2 class="text-2xl font-bold">Módulo en construcción</h2>`;
    }
}

// --- DASHBOARD / KPI VIEWS ---

function renderKPIs() {
    return `
        <div class="mb-10 flex justify-between items-center">
            <div>
                <h1 class="text-3xl font-black text-slate-900">Análisis Operativo (KPIs)</h1>
                <p class="text-slate-500 font-medium">Métricas clave de rendimiento Multifamily</p>
            </div>
            <div class="bg-white border rounded-xl p-1 flex">
                <button class="px-4 py-1.5 bg-slate-100 rounded-lg text-xs font-bold text-slate-800">Mensual</button>
                <button class="px-4 py-1.5 text-xs font-bold text-slate-400">Trimestral</button>
                <button class="px-4 py-1.5 text-xs font-bold text-slate-400">Anual</button>
            </div>
        </div>

        <!-- Gráfico de Ocupación Histórica -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            <div class="lg:col-span-2 bg-white p-8 rounded-3xl border shadow-sm">
                <div class="flex justify-between items-center mb-10">
                    <h3 class="font-bold text-xl">Ocupación Histórica (%)</h3>
                    <span class="text-emerald-500 font-black text-sm">+6.8% vs Mayo</span>
                </div>
                <div class="flex items-end justify-between h-48 space-x-4">
                    ${DATA.kpiHistory.occupancy.map((val, i) => `
                        <div class="flex-1 flex flex-col items-center group">
                            <div class="relative w-full bg-blue-50 rounded-t-lg chart-bar overflow-hidden" style="height: ${val}%">
                                <div class="absolute bottom-0 w-full bg-blue-600 group-hover:bg-blue-700 transition" style="height: 100%"></div>
                                <div class="absolute top-2 w-full text-center text-[10px] font-bold text-white opacity-0 group-hover:opacity-100">${val}%</div>
                            </div>
                            <span class="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">${DATA.kpiHistory.months[i]}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="bg-white p-8 rounded-3xl border shadow-sm flex flex-col justify-between">
                <div>
                    <h3 class="font-bold text-xl mb-2">Tenant Health Score</h3>
                    <p class="text-slate-400 text-sm font-medium mb-8">Basado en NPS y puntualidad de pago</p>
                    <div class="relative flex items-center justify-center mb-8">
                        <svg class="w-40 h-40 transform -rotate-90">
                            <circle cx="80" cy="80" r="70" stroke="currentColor" stroke-width="12" fill="transparent" class="text-slate-100" />
                            <circle cx="80" cy="80" r="70" stroke="currentColor" stroke-width="12" fill="transparent" stroke-dasharray="440" stroke-dashoffset="${440 - (440 * (DATA.kpiHistory.satisfaction / 10))}" class="text-blue-600" />
                        </svg>
                        <div class="absolute inset-0 flex flex-col items-center justify-center">
                            <span class="text-4xl font-black">${DATA.kpiHistory.satisfaction}</span>
                            <span class="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Promedio Org</span>
                        </div>
                    </div>
                </div>
                <div class="space-y-4">
                    <div class="flex justify-between items-center text-sm font-bold"><span class="text-slate-500">Promotores</span> <span class="text-emerald-500">72%</span></div>
                    <div class="w-full bg-slate-100 h-1.5 rounded-full"><div class="bg-emerald-500 h-full rounded-full" style="width: 72%"></div></div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white p-8 rounded-3xl border shadow-sm">
                <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Eficiencia de Mantenimiento</h4>
                <div class="flex items-center justify-between mb-4">
                    <span class="text-sm font-bold text-slate-700">Tiempo de cierre (TTR)</span>
                    <span class="text-xl font-black">3.2 días</span>
                </div>
                <p class="text-xs text-emerald-500 font-bold mb-6">↓ 0.9 días menos que Set.</p>
                <div class="space-y-3">
                    <div class="flex justify-between text-[10px] font-black text-slate-400"><span>ALTA PRIORIDAD</span> <span>98% < 24H</span></div>
                    <div class="w-full bg-slate-100 h-1 rounded-full"><div class="bg-blue-600 h-full rounded-full" style="width: 98%"></div></div>
                </div>
            </div>

            <div class="bg-white p-8 rounded-3xl border shadow-sm">
                <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Churn Rate (Rotación)</h4>
                <div class="flex items-center justify-between mb-4">
                    <span class="text-sm font-bold text-slate-700">Tasa Mensual</span>
                    <span class="text-xl font-black">1.8%</span>
                </div>
                <p class="text-xs text-rose-500 font-bold mb-6">↑ 0.2% incremento estacional</p>
                <div class="space-y-3">
                    <div class="flex justify-between text-[10px] font-black text-slate-400"><span>RENOVACIONES</span> <span>84% OK</span></div>
                    <div class="w-full bg-slate-100 h-1 rounded-full"><div class="bg-indigo-600 h-full rounded-full" style="width: 84%"></div></div>
                </div>
            </div>

            <div class="bg-white p-8 rounded-3xl border shadow-sm">
                <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Leasing Pipeline Velocity</h4>
                <div class="flex items-center justify-between mb-4">
                    <span class="text-sm font-bold text-slate-700">Conversión Final</span>
                    <span class="text-xl font-black">12.4%</span>
                </div>
                <p class="text-xs text-slate-400 font-medium mb-6">Visita a Firma de contrato</p>
                <div class="space-y-2">
                    <div class="bg-blue-50 p-3 rounded-xl flex justify-between items-center">
                        <span class="text-xs font-bold text-blue-700">CAC (Costo Adquisición)</span>
                        <span class="text-xs font-black text-blue-900">S/ 420.00</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderDashboard() {
    return `
        <div class="mb-10"><h1 class="text-3xl font-black text-slate-900">Resumen Operativo</h1></div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            ${kpiCard('Ocupación', '94.2%', 'blue', 'En meta')}
            ${kpiCard('Morosidad', '3.1%', 'red', 'Crítico: 2')}
            ${kpiCard('Recaudación', 'S/ 142.5k', 'green', '92% recaudado')}
            ${kpiCard('Unidades', DATA.currentOrg.units, 'gray', 'Total org')}
        </div>
        <div class="bg-white rounded-3xl border p-8">
            <h3 class="font-bold text-xl mb-6">Actividad Reciente</h3>
            <div class="divide-y">
                ${DATA.leads.slice(0, 3).map(l => `<div class="py-4 flex justify-between items-center"><div class="font-bold text-slate-800">${l.name} <span class="text-slate-400 font-medium text-xs ml-2">Interesado en ${l.unit}</span></div> ${Badge(l.stage, 'yellow')}</div>`).join('')}
            </div>
        </div>
    `;
}

function kpiCard(title, val, color, sub) {
    const colors = { blue: 'text-blue-600 bg-blue-50', red: 'text-rose-600 bg-rose-50', green: 'text-emerald-600 bg-emerald-50', gray: 'text-slate-600 bg-slate-50' };
    return `
        <div class="bg-white p-8 rounded-3xl border shadow-sm">
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">${title}</p>
            <h2 class="text-3xl font-black text-slate-900 mb-2">${val}</h2>
            <span class="text-xs font-bold ${colors[color]} px-2 py-1 rounded-lg">${sub}</span>
        </div>
    `;
}

// --- STUB MODULES ---
function renderLeasing() { return `<h2 class="text-2xl font-bold mb-4">Leads / CRM</h2><div class="p-20 text-center border-2 border-dashed rounded-3xl text-slate-300 font-bold uppercase tracking-widest">Tablero Kanban de Ventas</div>`; }
function renderProperties() { return `<h2 class="text-2xl font-bold mb-4">Propiedades</h2><div class="grid grid-cols-2 gap-8">${DATA.properties.map(p => `<div class="bg-white p-8 rounded-3xl border shadow-sm"><img src="${p.img}" class="h-32 w-full object-cover rounded-2xl mb-4"><h3 class="font-bold text-xl">${p.name}</h3><p class="text-slate-500 font-medium">${p.address}</p></div>`).join('')}</div>`; }
function renderUnits() { return `<h2 class="text-2xl font-bold mb-4">Unidades</h2><div class="bg-white rounded-3xl border overflow-hidden"><table class="w-full text-left text-sm">${DATA.units.map(u => `<tr class="border-b"><td class="p-6 font-bold">${u.code}</td><td class="p-6">${u.property}</td><td class="p-6">${Badge(u.status, 'blue')}</td></tr>`).join('')}</table></div>`; }
function renderLeases() { return `<h2 class="text-2xl font-bold mb-4">Contratos</h2><p class="text-slate-500">Gestión de firmas digitales y arriendos.</p>`; }
function renderBilling() { return `<h2 class="text-2xl font-bold mb-4">Cobranza</h2><div class="bg-white p-10 rounded-3xl border text-center font-black text-slate-300">MODULO DE FACTURACIÓN ELECTRÓNICA PERÚ</div>`; }
function renderCommunity() { return `<h2 class="text-2xl font-bold mb-4">Comunidad</h2><div class="space-y-4">${DATA.tickets.map(t => `<div class="p-4 bg-white border rounded-2xl flex justify-between"><div><p class="font-bold">${t.title}</p><p class="text-xs text-slate-400">${t.resident}</p></div>${Badge(t.status, 'yellow')}</div>`).join('')}</div>`; }
function renderInspections() { return `<h2 class="text-2xl font-bold mb-4">Inspecciones</h2><p class="text-slate-500">Check-in y Check-out digital.</p>`; }
function renderSettings() { return `<h2 class="text-2xl font-bold mb-4">Configuración</h2><p class="text-slate-500">Gestión de seats y suscripción.</p>`; }

// --- GLOBAL UTILS ---
function notify(msg) {
    const toast = document.getElementById('notification-toast');
    document.getElementById('notification-msg').innerText = msg;
    toast.classList.remove('translate-y-20', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
    setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
}

window.onload = () => Router.init();
