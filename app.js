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
        { id: 1, title: "Fuga de agua baño", priority: "Alta", status: "Abierto", resident: "Roberto Gomez", date: "2023-11-01", unit: "101-A", category: "Plomería" },
        { id: 2, title: "Luz de pasillo fundida", priority: "Baja", status: "Cerrado", resident: "Carla Luna", date: "2023-10-29", unit: "205-B", category: "Eléctrico" },
        { id: 3, title: "Puerta no cierra bien", priority: "Media", status: "En Progreso", resident: "Ana Lora", date: "2023-11-03", unit: "303-C", category: "Carpintería" },
        { id: 4, title: "Aire acondicionado no enfría", priority: "Alta", status: "Abierto", resident: "Roberto Gomez", date: "2023-11-05", unit: "101-A", category: "Climatización" }
    ],

    staff: [
        { id: 1, name: "Admin Principal", role: "Owner", email: "admin@state360.pe" },
        { id: 2, name: "Rosa Melendez", role: "Comercial", email: "rosa@state360.pe" },
        { id: 3, name: "Kevin Torres", role: "Operaciones", email: "kevin@state360.pe" }
    ],

    delinquents: [
        { id: 1, tenant: "Carlos Morales", unit: "202-A", daysLate: 45, amountDue: 7500, phone: "987123456", lastPayment: "2023-09-05" },
        { id: 2, tenant: "Sofia Vargas", unit: "404-B", daysLate: 12, amountDue: 1800, phone: "991234567", lastPayment: "2023-10-20" },
        { id: 3, tenant: "Empresa Textil SAC", unit: "Local 03", daysLate: 8, amountDue: 3200, phone: "999888777", lastPayment: "2023-10-25" }
    ],

    payments: [
        { id: 1, tenant: "Roberto Gomez", unit: "101-A", amount: 2500, date: "2023-11-05", method: "Transferencia", status: "Completado" },
        { id: 2, tenant: "Ana Lora", unit: "303-C", amount: 2100, date: "2023-11-01", method: "Yape", status: "Completado" },
        { id: 3, tenant: "Pedro Castillo", unit: "505-A", amount: 2800, date: "2023-11-03", method: "Tarjeta", status: "Completado" },
        { id: 4, tenant: "Maria Torres", unit: "102-B", amount: 1800, date: "2023-11-07", method: "Efectivo", status: "Completado" },
        { id: 5, tenant: "Sofia Vargas", unit: "404-B", amount: 1800, date: "2023-11-08", method: "Pendiente", status: "Pendiente" }
    ],

    inspections: [
        { id: 1, unit: "101-A", type: "Move-In", date: "2023-01-01", inspector: "Kevin Torres", tenant: "Roberto Gomez", status: "Completado", score: 95 },
        { id: 2, unit: "303-C", type: "Move-In", date: "2023-05-15", inspector: "Rosa Melendez", tenant: "Ana Lora", status: "Completado", score: 88 },
        { id: 3, unit: "205-B", type: "Rutinaria", date: "2023-10-20", inspector: "Kevin Torres", tenant: "Carlos Ruiz", status: "Completado", score: 78 },
        { id: 4, unit: "102-A", type: "Move-Out", date: "2023-10-28", inspector: "Kevin Torres", tenant: "N/A", status: "Pendiente", score: null }
    ],

    organization: {
        name: "Hommie Admin",
        ruc: "20123456789",
        address: "Av. Benavides 450, Miraflores",
        phone: "01-234-5678",
        email: "contacto@hommie.pe",
        plan: "Premium",
        billingDay: 1
    },

    kpiHistory: {
        occupancy: [88, 90, 91, 89, 93, 94],
        revenue: [120, 125, 130, 128, 138, 142],
        months: ['May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct'],
        ticketTimes: [4.5, 3.8, 5.2, 4.1, 3.2],
        satisfaction: 8.4
    },

    amenities: [
        { id: 1, name: "Piscina", icon: "🏊", capacity: 20, hours: "6:00 AM - 10:00 PM", rules: "Obligatorio gorro y ducha previa", status: "Disponible" },
        { id: 2, name: "Gimnasio", icon: "🏋️", capacity: 15, hours: "5:00 AM - 11:00 PM", rules: "Uso de toalla obligatorio", status: "Disponible" },
        { id: 3, name: "Sala de Fiestas", icon: "🎉", capacity: 50, hours: "10:00 AM - 12:00 AM", rules: "Reservar con 48h de anticipación. Depósito S/ 200", status: "Disponible" },
        { id: 4, name: "Parrilla / BBQ", icon: "🔥", capacity: 12, hours: "11:00 AM - 10:00 PM", rules: "Limpiar el área después de usar", status: "Disponible" },
        { id: 5, name: "Coworking", icon: "💻", capacity: 10, hours: "7:00 AM - 10:00 PM", rules: "Silencio obligatorio", status: "Mantenimiento" },
        { id: 6, name: "Zona de Niños", icon: "🧒", capacity: 8, hours: "8:00 AM - 8:00 PM", rules: "Menores acompañados por un adulto", status: "Disponible" }
    ],

    reservations: [
        { id: 1, amenity: "Piscina", resident: "Roberto Gomez", unit: "101-A", date: "2026-02-10", timeSlot: "10:00 - 12:00", status: "Confirmada", guests: 3 },
        { id: 2, amenity: "Sala de Fiestas", resident: "Ana Lora", unit: "303-C", date: "2026-02-14", timeSlot: "18:00 - 23:00", status: "Confirmada", guests: 30 },
        { id: 3, amenity: "Gimnasio", resident: "Roberto Gomez", unit: "101-A", date: "2026-02-08", timeSlot: "06:00 - 07:00", status: "Confirmada", guests: 0 },
        { id: 4, amenity: "Parrilla / BBQ", resident: "Pedro Castillo", unit: "505-A", date: "2026-02-15", timeSlot: "13:00 - 17:00", status: "Pendiente", guests: 8 },
        { id: 5, amenity: "Piscina", resident: "Maria Torres", unit: "102-B", date: "2026-02-09", timeSlot: "14:00 - 16:00", status: "Confirmada", guests: 2 },
        { id: 6, amenity: "Coworking", resident: "Ana Lora", unit: "303-C", date: "2026-02-11", timeSlot: "09:00 - 13:00", status: "Cancelada", guests: 0 },
        { id: 7, amenity: "Sala de Fiestas", resident: "Carlos Morales", unit: "202-A", date: "2026-02-22", timeSlot: "15:00 - 21:00", status: "Confirmada", guests: 25 },
        { id: 8, amenity: "Gimnasio", resident: "Sofia Vargas", unit: "404-B", date: "2026-02-08", timeSlot: "17:00 - 18:00", status: "Confirmada", guests: 0 },
        { id: 9, amenity: "Zona de Niños", resident: "Maria Torres", unit: "102-B", date: "2026-02-12", timeSlot: "10:00 - 12:00", status: "Confirmada", guests: 3 },
        { id: 10, amenity: "Piscina", resident: "Roberto Gomez", unit: "101-A", date: "2026-02-16", timeSlot: "08:00 - 10:00", status: "Pendiente", guests: 1 }
    ],

    comunicados: [
        { id: 1, title: "Mantenimiento del ascensor", body: "El ascensor B estará en mantenimiento el 12 de febrero de 8AM a 2PM.", date: "2026-02-06", type: "Mantenimiento", priority: "Alta" },
        { id: 2, title: "Fumigación programada", body: "Se realizará fumigación general el 15 de febrero. Favor cerrar ventanas.", date: "2026-02-05", type: "Aviso", priority: "Media" },
        { id: 3, title: "Nueva tarifa de estacionamiento", body: "A partir de marzo 2026, la tarifa de estacionamiento visitantes será S/ 5/hora.", date: "2026-02-03", type: "Informativo", priority: "Baja" },
        { id: 4, title: "Corte de agua programado", body: "SEDAPAL informa corte de agua el 20 de febrero de 9AM a 5PM.", date: "2026-02-07", type: "Urgente", priority: "Alta" },
        { id: 5, title: "Junta de propietarios", body: "Se convoca a junta ordinaria el 25 de febrero a las 7PM en la Sala de Fiestas.", date: "2026-02-04", type: "Informativo", priority: "Media" }
    ],

    resident: {
        name: "Roberto Gomez",
        unit: "101-A",
        property: "Torre Miraflores",
        floor: "Piso 1",
        contract: { start: "2023-01-01", end: "2024-01-01", rent: 2500, day: 5 },
        payments: [
            { id: 1, month: "Febrero 2026", amount: 2500, date: "2026-02-05", method: "Transferencia", status: "Completado" },
            { id: 2, month: "Enero 2026", amount: 2500, date: "2026-01-05", method: "Yape", status: "Completado" },
            { id: 3, month: "Diciembre 2025", amount: 2500, date: "2025-12-06", method: "Transferencia", status: "Completado" },
            { id: 4, month: "Noviembre 2025", amount: 2500, date: "2025-11-05", method: "Transferencia", status: "Completado" },
            { id: 5, month: "Octubre 2025", amount: 2500, date: "2025-10-05", method: "Yape", status: "Completado" },
            { id: 6, month: "Marzo 2026", amount: 2500, date: null, method: "-", status: "Pendiente" }
        ]
    }
};

// --- HELPERS ---

const Icon = (name) => {
    const icons = {
        home: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>`,
        users: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`,
        building: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>`,
        billing: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>`,
        settings: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`,
        community: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>`,
        chart: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>`,
        inspection: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
        calendar: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>`,
        megaphone: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg>`
    };
    return icons[name] || '';
};

const Badge = (text, type = 'gray') => {
    const colors = { blue: 'bg-blue-100 text-blue-700', green: 'bg-emerald-100 text-emerald-700', red: 'bg-rose-100 text-rose-700', yellow: 'bg-amber-100 text-amber-700', gray: 'bg-slate-100 text-slate-700' };
    return `<span class="px-2.5 py-0.5 rounded-full text-xs font-semibold ${colors[type] || colors.gray}">${text}</span>`;
};

// --- ROUTER ---

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

// --- PUBLIC PAGES ---

function renderLanding() {
    document.getElementById('main-content').innerHTML = `
        <nav class="bg-white border-b px-4 md:px-6 py-3 md:py-4 flex justify-between items-center sticky top-0 z-40 shadow-sm glass-header">
            <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold italic shadow-lg">S</div>
                <span class="text-lg md:text-xl font-bold tracking-tight">State 360</span>
            </div>
            <div class="flex items-center space-x-3 md:space-x-6">
                <button onclick="Router.navigate('#/login')" class="hidden sm:inline-block px-4 py-2 text-slate-600 font-semibold hover:text-blue-600 transition">Iniciar sesión</button>
                <button onclick="Router.navigate('#/login')" class="px-4 md:px-6 py-2 md:py-2.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100 transition text-sm md:text-base">Empezar ahora</button>
            </div>
        </nav>
        <main class="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-24 text-center">
            <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6 md:mb-8 leading-tight">Software Multifamily <br/><span class="text-blue-600">para el Perú.</span></h1>
            <p class="text-base md:text-xl text-slate-500 mb-8 md:mb-12 max-w-3xl mx-auto">La solución líder para la gestión profesional de arriendos.</p>
            <button onclick="Router.navigate('#/login')" class="px-8 md:px-10 py-4 md:py-5 bg-slate-900 text-white rounded-2xl font-bold shadow-2xl hover:bg-black transition text-sm md:text-base">Probar Prototipo Interactivo</button>
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
function toggleRole() { DATA.userRole = DATA.userRole === "STAFF" ? "RESIDENTE" : "STAFF"; notify('Rol: ' + DATA.userRole); renderLogin(); }

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

// --- APP LAYOUT ---

function renderAppLayout(subview) {
    const isResident = DATA.userRole === "RESIDENTE";
    const sidebarNav = isResident ? `
        <div class="text-[10px] font-bold text-slate-400 uppercase mt-4 mb-2 px-4 tracking-widest">Mi Departamento</div>
        ${navItem('Inicio', 'dashboard', 'home', subview)}
        ${navItem('Mis Pagos', 'billing', 'billing', subview)}
        ${navItem('Comunicados', 'comunicados', 'megaphone', subview)}
        <div class="text-[10px] font-bold text-slate-400 uppercase mt-6 mb-2 px-4 tracking-widest">Servicios</div>
        ${navItem('Reservas', 'reservations', 'calendar', subview)}
        ${navItem('Soporte', 'community', 'community', subview)}
    ` : `
        ${navItem('Resumen', 'dashboard', 'home', subview)}
        <div class="text-[10px] font-bold text-slate-400 uppercase mt-6 mb-2 px-4 tracking-widest">Estrategia</div>
        ${navItem('Análisis / KPIs', 'analytics', 'chart', subview)}
        <div class="text-[10px] font-bold text-slate-400 uppercase mt-6 mb-2 px-4 tracking-widest">Módulos</div>
        ${navItem('Leads', 'leasing', 'users', subview)}
        ${navItem('Propiedades', 'properties', 'building', subview)}
        ${navItem('Contratos', 'leases', 'billing', subview)}
        ${navItem('Cobranza', 'billing', 'billing', subview)}
        <div class="text-[10px] font-bold text-slate-400 uppercase mt-6 mb-2 px-4 tracking-widest">Operación</div>
        ${navItem('Comunidad', 'community', 'community', subview)}
        ${navItem('Reservaciones', 'reservations', 'calendar', subview)}
        ${navItem('Inspecciones', 'inspections', 'inspection', subview)}
        <div class="text-[10px] font-bold text-slate-400 uppercase mt-6 mb-2 px-4 tracking-widest">Sistema</div>
        ${navItem('Configuración', 'settings', 'settings', subview)}
    `;

    const sidebarContent = `
        <div class="p-5 flex items-center justify-between border-b">
            <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold italic">S</div>
                <span class="text-xl font-black">State 360</span>
            </div>
            <button onclick="toggleSidebar()" class="md:hidden p-1 text-slate-400 hover:text-slate-600">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>
        <nav class="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
            ${sidebarNav}
        </nav>
        <div class="p-4 border-t">
            <button onclick="DATA.isLoggedIn=false; Router.navigate('#/login')" class="w-full text-left px-4 py-3 text-slate-400 text-sm font-bold hover:text-slate-600 transition flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                Cerrar Sesión
            </button>
        </div>
    `;

    document.getElementById('main-content').innerHTML = `
        <div class="flex h-screen overflow-hidden">
            <!-- Overlay mobile -->
            <div id="sidebar-overlay" class="fixed inset-0 bg-black/50 z-40 sidebar-overlay md:hidden" onclick="toggleSidebar()"></div>

            <!-- Sidebar desktop -->
            <aside class="hidden md:flex w-64 bg-white border-r flex-col flex-shrink-0">
                ${sidebarContent}
            </aside>

            <!-- Sidebar mobile -->
            <aside id="mobile-sidebar" class="fixed inset-y-0 left-0 z-50 w-72 bg-white border-r flex flex-col sidebar-mobile md:hidden">
                ${sidebarContent}
            </aside>

            <main class="flex-1 flex flex-col bg-slate-50 overflow-hidden w-full">
                <header class="h-14 md:h-16 bg-white border-b px-4 md:px-8 flex items-center justify-between glass-header flex-shrink-0">
                    <div class="flex items-center space-x-3">
                        <button onclick="toggleSidebar()" class="md:hidden p-1.5 rounded-lg hover:bg-slate-100 text-slate-600">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </button>
                        <span class="font-bold text-slate-600 uppercase text-[10px] md:text-xs tracking-widest truncate">${DATA.currentOrg.name}</span>
                    </div>
                    <div class="flex items-center space-x-2 md:space-x-4">
                        ${Badge(DATA.userRole, 'blue')}
                        <div class="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm md:text-base">JD</div>
                    </div>
                </header>
                <div class="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
                    ${renderSubViewContent(subview)}
                </div>
            </main>
        </div>
    `;
}

function navItem(label, key, icon, current) {
    const active = key === current;
    return `
        <a href="#/app/${key}" onclick="closeSidebar()" class="flex items-center px-4 py-3 rounded-xl font-bold text-sm transition group ${active ? 'sidebar-item-active' : 'text-slate-600 hover:bg-slate-50'}">
            <span class="mr-4 ${active ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-600'}">${Icon(icon)}</span> ${label}
        </a>
    `;
}

function renderSubViewContent(view) {
    const isResident = DATA.userRole === "RESIDENTE";
    switch (view) {
        case 'dashboard': return isResident ? renderResidentDashboard() : renderDashboard();
        case 'analytics': return renderKPIs();
        case 'leasing': return renderLeasing();
        case 'properties': return renderProperties();
        case 'units': return renderUnits();
        case 'leases': return renderLeases();
        case 'billing': return isResident ? renderResidentBilling() : renderBilling();
        case 'community': return isResident ? renderResidentCommunity() : renderCommunity();
        case 'comunicados': return renderResidentComunicados();
        case 'reservations': return isResident ? renderResidentReservations() : renderAdminReservations();
        case 'inspections': return renderInspections();
        case 'settings': return renderSettings();
        default: return '<h2 class="text-2xl font-bold">Módulo en construcción</h2>';
    }
}

// --- DASHBOARD ---

function renderDashboard() {
    return `
        <div class="mb-6 md:mb-10"><h1 class="text-2xl md:text-3xl font-black text-slate-900">Resumen Operativo</h1></div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-10">
            ${kpiCard('Ocupación', '94.2%', 'blue', 'En meta')}
            ${kpiCard('Morosidad', '3.1%', 'red', 'Crítico: 2')}
            ${kpiCard('Recaudación', 'S/ 142.5k', 'green', '92% recaudado')}
            ${kpiCard('Unidades', DATA.currentOrg.units, 'gray', 'Total org')}
        </div>
        <div class="bg-white rounded-2xl md:rounded-3xl border p-4 md:p-8">
            <h3 class="font-bold text-lg md:text-xl mb-4 md:mb-6">Actividad Reciente</h3>
            <div class="divide-y">
                ${DATA.leads.slice(0, 3).map(l => `<div class="py-3 md:py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1"><div class="font-bold text-slate-800 text-sm md:text-base">${l.name} <span class="text-slate-400 font-medium text-xs ml-1 md:ml-2">Interesado en ${l.unit}</span></div> ${Badge(l.stage, 'yellow')}</div>`).join('')}
            </div>
        </div>
    `;
}

function kpiCard(title, val, color, sub) {
    const colors = { blue: 'text-blue-600 bg-blue-50', red: 'text-rose-600 bg-rose-50', green: 'text-emerald-600 bg-emerald-50', gray: 'text-slate-600 bg-slate-50' };
    return `
        <div class="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl border shadow-sm">
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 md:mb-4">${title}</p>
            <h2 class="text-xl md:text-3xl font-black text-slate-900 mb-1 md:mb-2">${val}</h2>
            <span class="text-[10px] md:text-xs font-bold ${colors[color]} px-2 py-1 rounded-lg">${sub}</span>
        </div>
    `;
}

// --- KPIs / ANALYTICS ---

function renderKPIs() {
    return `
        <div class="mb-6 md:mb-10 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
                <h1 class="text-2xl md:text-3xl font-black text-slate-900">Análisis Operativo (KPIs)</h1>
                <p class="text-slate-500 font-medium text-sm md:text-base">Métricas clave de rendimiento Multifamily</p>
            </div>
            <div class="bg-white border rounded-xl p-1 flex self-start">
                <button class="px-3 md:px-4 py-1.5 bg-slate-100 rounded-lg text-xs font-bold text-slate-800">Mensual</button>
                <button class="px-3 md:px-4 py-1.5 text-xs font-bold text-slate-400">Trimestral</button>
                <button class="px-3 md:px-4 py-1.5 text-xs font-bold text-slate-400">Anual</button>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 mb-6 md:mb-10">
            <div class="lg:col-span-2 bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl border shadow-sm">
                <div class="flex justify-between items-center mb-6 md:mb-10">
                    <h3 class="font-bold text-base md:text-xl">Ocupación Histórica (%)</h3>
                    <span class="text-emerald-500 font-black text-xs md:text-sm">+6.8% vs Mayo</span>
                </div>
                <div class="flex items-end justify-between h-36 md:h-48 space-x-2 md:space-x-4">
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

            <div class="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl border shadow-sm flex flex-col justify-between">
                <div>
                    <h3 class="font-bold text-base md:text-xl mb-2">Tenant Health Score</h3>
                    <p class="text-slate-400 text-xs md:text-sm font-medium mb-4 md:mb-8">Basado en NPS y puntualidad de pago</p>
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

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            <div class="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl border shadow-sm">
                <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 md:mb-6">Eficiencia de Mantenimiento</h4>
                <div class="flex items-center justify-between mb-4">
                    <span class="text-sm font-bold text-slate-700">Tiempo de cierre (TTR)</span>
                    <span class="text-xl font-black">3.2 días</span>
                </div>
                <p class="text-xs text-emerald-500 font-bold mb-6">↓ 0.9 días menos que Set.</p>
                <div class="space-y-3">
                    <div class="flex justify-between text-[10px] font-black text-slate-400"><span>ALTA PRIORIDAD</span> <span>98% &lt; 24H</span></div>
                    <div class="w-full bg-slate-100 h-1 rounded-full"><div class="bg-blue-600 h-full rounded-full" style="width: 98%"></div></div>
                </div>
            </div>

            <div class="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl border shadow-sm">
                <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 md:mb-6">Morosidad Crítica</h4>
                <div class="flex items-center justify-between mb-4">
                    <span class="text-sm font-bold text-slate-700">Total Adeudado</span>
                    <span class="text-xl font-black text-rose-600">S/ ${DATA.delinquents.reduce((sum, d) => sum + d.amountDue, 0).toLocaleString()}</span>
                </div>
                <p class="text-xs text-slate-400 font-medium mb-6">${DATA.delinquents.length} inquilinos morosos</p>
                <div class="space-y-3">
                    ${DATA.delinquents.map(d => `
                        <div class="flex justify-between items-center text-xs">
                            <span class="font-bold text-slate-600">${d.tenant} (${d.unit})</span>
                            <span class="font-black ${d.daysLate > 30 ? 'text-rose-600' : 'text-amber-600'}">${d.daysLate}d - S/${d.amountDue}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl border shadow-sm">
                <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 md:mb-6">Churn Rate (Rotación)</h4>
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

            <div class="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl border shadow-sm">
                <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 md:mb-6">Leasing Pipeline Velocity</h4>
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

// --- LEADS / CRM ---

function renderLeasing() {
    const stages = ['Nuevo', 'Visita', 'Aplicación', 'Aprobado'];
    const leadsByStage = {
        'Nuevo': DATA.leads.filter(l => l.stage === 'Nuevo'),
        'Visita': DATA.leads.filter(l => l.stage === 'Visita'),
        'Aplicación': DATA.leads.filter(l => l.stage === 'Aplicación'),
        'Aprobado': DATA.leads.filter(l => l.stage === 'Aprobado')
    };
    const stageColors = {
        'Nuevo': 'border-blue-200 bg-blue-50',
        'Visita': 'border-amber-200 bg-amber-50',
        'Aplicación': 'border-purple-200 bg-purple-50',
        'Aprobado': 'border-emerald-200 bg-emerald-50'
    };

    return `
        <div class="mb-6 md:mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div>
                <h1 class="text-2xl md:text-3xl font-black text-slate-900">Leads</h1>
                <p class="text-slate-500 font-medium text-sm md:text-base">${DATA.leads.length} leads activos en el pipeline</p>
            </div>
            <button onclick="openModal('lead')" class="self-start px-5 md:px-6 py-2.5 md:py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition text-sm md:text-base">✨ Nuevo Lead</button>
        </div>

        <div class="flex gap-6 overflow-x-auto pb-4 custom-scrollbar">
            ${stages.map(stage => `
                <div class="kanban-column flex-shrink-0" data-stage="${stage}" ondrop="handleDrop(event)" ondragover="handleDragOver(event)" ondragleave="handleDragLeave(event)">
                    <div class="bg-white rounded-2xl border-2 ${stageColors[stage]} overflow-hidden">
                        <div class="p-4 border-b">
                            <h3 class="font-black text-sm uppercase tracking-wider text-slate-700">${stage}</h3>
                            <span class="text-xs text-slate-500 font-bold">${leadsByStage[stage].length} leads</span>
                        </div>
                        <div class="p-3 space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
                            ${leadsByStage[stage].length === 0 ? `
                                <div class="text-center py-8 text-slate-300 text-sm font-medium">Arrastra leads aquí</div>
                            ` : leadsByStage[stage].map(lead => `
                                <div class="bg-white p-4 rounded-xl border border-slate-200 hover:shadow-lg transition cursor-move" 
                                     draggable="true" 
                                     data-lead-id="${lead.id}" 
                                     ondragstart="handleDragStart(event)" 
                                     ondragend="handleDragEnd(event)">
                                    <div class="flex items-start justify-between mb-3">
                                        <h4 class="font-bold text-slate-900 text-sm">${lead.name}</h4>
                                        <span class="text-[10px] font-black text-slate-400">#${lead.id}</span>
                                    </div>
                                    <div class="space-y-2 text-xs text-slate-600">
                                        <div class="flex items-center">
                                            <svg class="w-3 h-3 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                                            <span class="font-semibold">${lead.unit}</span>
                                        </div>
                                        <div class="flex items-center">
                                            <svg class="w-3 h-3 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                            <span>${lead.phone}</span>
                                        </div>
                                        <div class="flex items-center">
                                            <svg class="w-3 h-3 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                            <span>${lead.date}</span>
                                        </div>
                                    </div>
                                    <div class="mt-3 pt-3 border-t border-slate-100">
                                        <span class="text-[10px] font-black text-slate-400 uppercase">Email</span>
                                        <p class="text-xs font-semibold text-slate-600 truncate">${lead.email}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="mt-6 md:mt-8 bg-white rounded-2xl border p-4 md:p-6">
            <h3 class="font-bold text-base md:text-lg mb-4">Métricas del Pipeline</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div class="text-center">
                    <p class="text-2xl font-black text-blue-600">${DATA.leads.length}</p>
                    <p class="text-xs font-bold text-slate-500 uppercase mt-1">Total Leads</p>
                </div>
                <div class="text-center">
                    <p class="text-2xl font-black text-emerald-600">${leadsByStage['Aprobado'].length}</p>
                    <p class="text-xs font-bold text-slate-500 uppercase mt-1">Aprobados</p>
                </div>
                <div class="text-center">
                    <p class="text-2xl font-black text-purple-600">${Math.round((leadsByStage['Aprobado'].length / DATA.leads.length) * 100)}%</p>
                    <p class="text-xs font-bold text-slate-500 uppercase mt-1">Tasa Conversión</p>
                </div>
                <div class="text-center">
                    <p class="text-2xl font-black text-amber-600">S/ 420</p>
                    <p class="text-xs font-bold text-slate-500 uppercase mt-1">CAC Promedio</p>
                </div>
            </div>
        </div>
    `;
}

// --- PROPERTIES ---

function renderProperties() {
    return `
        <div class="mb-6 md:mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div>
                <h2 class="text-2xl md:text-3xl font-black text-slate-900">Propiedades</h2>
                <p class="text-slate-500 font-medium text-sm md:text-base">${DATA.properties.length} propiedades registradas</p>
            </div>
            <button onclick="openModal('property')" class="self-start px-5 md:px-6 py-2.5 md:py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition text-sm md:text-base">🏢 Nueva Propiedad</button>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
            ${DATA.properties.map(p => `
                <div class="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl border shadow-sm hover:shadow-lg transition cursor-pointer" onclick="notify('Ver detalle de ${p.name}')">
                    <img src="${p.img}" class="h-32 w-full object-cover rounded-xl md:rounded-2xl mb-4">
                    <h3 class="font-bold text-lg md:text-xl">${p.name}</h3>
                    <p class="text-slate-500 font-medium text-sm md:text-base">${p.address}</p>
                    <p class="text-xs text-slate-400 mt-2">${p.unitsCount} unidades</p>
                </div>
            `).join('')}
        </div>
    `;
}

// --- UNITS ---

function renderUnits() {
    return `
        <div class="mb-6 md:mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div>
                <h1 class="text-2xl md:text-3xl font-black text-slate-900">Unidades</h1>
                <p class="text-slate-500 font-medium text-sm md:text-base">${DATA.units.length} unidades en total</p>
            </div>
            <div class="flex gap-2 md:gap-3 flex-wrap">
                <button onclick="openModal('unit')" class="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition text-sm">🏠 Nueva Unidad</button>
                ${Badge(DATA.units.filter(u => u.status === 'Ocupada').length + ' Ocupadas', 'green')}
                ${Badge(DATA.units.filter(u => u.status === 'Disponible').length + ' Disponibles', 'blue')}
                ${Badge(DATA.units.filter(u => u.status === 'Mantenimiento').length + ' Mantenimiento', 'yellow')}
            </div>
        </div>
        <div class="bg-white rounded-2xl md:rounded-3xl border overflow-hidden table-responsive">
            <table class="w-full text-left text-sm">
                <thead class="bg-slate-50 border-b">
                    <tr>
                        <th class="p-6 font-black text-xs uppercase text-slate-600">Código</th>
                        <th class="p-6 font-black text-xs uppercase text-slate-600">Tipo</th>
                        <th class="p-6 font-black text-xs uppercase text-slate-600">Propiedad</th>
                        <th class="p-6 font-black text-xs uppercase text-slate-600">Renta</th>
                        <th class="p-6 font-black text-xs uppercase text-slate-600">Estado</th>
                        <th class="p-6 font-black text-xs uppercase text-slate-600">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${DATA.units.map(u => `
                        <tr class="border-b hover:bg-slate-50 transition">
                            <td class="p-6 font-bold text-slate-900">${u.code}</td>
                            <td class="p-6 text-slate-600">${u.type}</td>
                            <td class="p-6 text-slate-600">${u.property}</td>
                            <td class="p-6 font-bold text-slate-900">S/ ${u.rent.toLocaleString()}</td>
                            <td class="p-6">${Badge(u.status, u.status === 'Ocupada' ? 'green' : u.status === 'Disponible' ? 'blue' : 'yellow')}</td>
                            <td class="p-6">
                                <button onclick="notify('Ver detalle de ${u.code}')" class="text-blue-600 font-bold text-xs hover:text-blue-700">Ver Detalle →</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// --- LEASES ---

function renderLeases() {
    return `
        <div class="mb-6 md:mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div>
                <h1 class="text-2xl md:text-3xl font-black text-slate-900 mb-2">Contratos de Arrendamiento</h1>
                <p class="text-slate-500 font-medium text-sm md:text-base">${DATA.leases.length} contratos activos</p>
            </div>
            <button onclick="openModal('lease')" class="self-start px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition text-sm">📝 Nuevo Contrato</button>
        </div>
        <div class="grid grid-cols-1 gap-4 md:gap-6">
            ${DATA.leases.map(lease => `
                <div class="bg-white rounded-2xl md:rounded-3xl border p-4 md:p-8 hover:shadow-lg transition">
                    <div class="flex justify-between items-start mb-4 md:mb-6">
                        <div>
                            <h3 class="text-lg md:text-xl font-black text-slate-900 mb-1 md:mb-2">${lease.tenant}</h3>
                            <p class="text-slate-500 font-medium text-sm">Unidad: <span class="font-bold text-slate-700">${lease.unit}</span></p>
                        </div>
                        ${Badge(lease.status, lease.status === 'Activo' ? 'green' : 'yellow')}
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-4 md:mb-6">
                        <div>
                            <p class="text-[10px] font-black text-slate-400 uppercase mb-2">Fecha Inicio</p>
                            <p class="font-bold text-slate-900">${lease.start}</p>
                        </div>
                        <div>
                            <p class="text-[10px] font-black text-slate-400 uppercase mb-2">Fecha Fin</p>
                            <p class="font-bold text-slate-900">${lease.end}</p>
                        </div>
                        <div>
                            <p class="text-[10px] font-black text-slate-400 uppercase mb-2">Renta Mensual</p>
                            <p class="font-bold text-emerald-600">S/ ${lease.rent.toLocaleString()}</p>
                        </div>
                        <div>
                            <p class="text-[10px] font-black text-slate-400 uppercase mb-2">Día de Pago</p>
                            <p class="font-bold text-slate-900">Día ${lease.day}</p>
                        </div>
                    </div>
                    <div class="flex flex-wrap gap-2 md:gap-3">
                        <button onclick="notify('Ver contrato PDF')" class="px-3 md:px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-bold text-xs md:text-sm hover:bg-blue-100 transition">Ver Contrato</button>
                        <button onclick="notify('Renovar contrato')" class="px-3 md:px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg font-bold text-xs md:text-sm hover:bg-emerald-100 transition">Renovar</button>
                        <button onclick="notify('Terminar contrato')" class="px-3 md:px-4 py-2 bg-rose-50 text-rose-600 rounded-lg font-bold text-xs md:text-sm hover:bg-rose-100 transition">Terminar</button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// --- BILLING ---

function renderBilling() {
    const totalCollected = DATA.payments.filter(p => p.status === 'Completado').reduce((sum, p) => sum + p.amount, 0);
    const totalPending = DATA.payments.filter(p => p.status === 'Pendiente').reduce((sum, p) => sum + p.amount, 0);
    const totalDelinquent = DATA.delinquents.reduce((sum, d) => sum + d.amountDue, 0);

    return `
        <div class="mb-6 md:mb-8">
            <h1 class="text-2xl md:text-3xl font-black text-slate-900 mb-2">Cobranza y Facturación</h1>
            <p class="text-slate-500 font-medium text-sm md:text-base">Gestión de pagos y estado de cuentas</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <div class="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl border shadow-sm">
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 md:mb-4">Recaudado este mes</p>
                <h2 class="text-2xl md:text-3xl font-black text-emerald-600 mb-2">S/ ${totalCollected.toLocaleString()}</h2>
                <p class="text-xs font-bold text-slate-500">${DATA.payments.filter(p => p.status === 'Completado').length} pagos completados</p>
            </div>
            <div class="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl border shadow-sm">
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 md:mb-4">Pendiente</p>
                <h2 class="text-2xl md:text-3xl font-black text-amber-600 mb-2">S/ ${totalPending.toLocaleString()}</h2>
                <p class="text-xs font-bold text-slate-500">${DATA.payments.filter(p => p.status === 'Pendiente').length} pagos pendientes</p>
            </div>
            <div class="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl border shadow-sm">
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 md:mb-4">Morosidad</p>
                <h2 class="text-2xl md:text-3xl font-black text-rose-600 mb-2">S/ ${totalDelinquent.toLocaleString()}</h2>
                <p class="text-xs font-bold text-slate-500">${DATA.delinquents.length} inquilinos morosos</p>
            </div>
        </div>
        <div class="bg-white rounded-2xl md:rounded-3xl border overflow-hidden mb-6 md:mb-8">
            <div class="p-4 md:p-6 border-b bg-slate-50">
                <h3 class="font-black text-base md:text-lg">Pagos Recientes</h3>
            </div>
            <div class="table-responsive">
            <table class="w-full text-left text-sm min-w-[600px]">
                <thead class="bg-slate-50 border-b">
                    <tr>
                        <th class="p-6 font-black text-xs uppercase text-slate-600">Fecha</th>
                        <th class="p-6 font-black text-xs uppercase text-slate-600">Inquilino</th>
                        <th class="p-6 font-black text-xs uppercase text-slate-600">Unidad</th>
                        <th class="p-6 font-black text-xs uppercase text-slate-600">Monto</th>
                        <th class="p-6 font-black text-xs uppercase text-slate-600">Método</th>
                        <th class="p-6 font-black text-xs uppercase text-slate-600">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    ${DATA.payments.map(p => `
                        <tr class="border-b hover:bg-slate-50 transition">
                            <td class="p-6 text-slate-600">${p.date}</td>
                            <td class="p-6 font-bold text-slate-900">${p.tenant}</td>
                            <td class="p-6 text-slate-600">${p.unit}</td>
                            <td class="p-6 font-bold text-slate-900">S/ ${p.amount.toLocaleString()}</td>
                            <td class="p-6 text-slate-600">${p.method}</td>
                            <td class="p-6">${Badge(p.status, p.status === 'Completado' ? 'green' : 'yellow')}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            </div>
        </div>
        <div class="bg-rose-50 border-2 border-rose-200 rounded-2xl md:rounded-3xl p-4 md:p-8">
            <h3 class="font-black text-base md:text-lg text-rose-900 mb-4">⚠️ Inquilinos Morosos</h3>
            <div class="space-y-3 md:space-y-4">
                ${DATA.delinquents.map(d => `
                    <div class="bg-white rounded-xl p-4 md:p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                        <div>
                            <h4 class="font-bold text-slate-900">${d.tenant}</h4>
                            <p class="text-sm text-slate-600">Unidad ${d.unit} • ${d.daysLate} días de retraso</p>
                            <p class="text-xs text-slate-500 mt-1">Último pago: ${d.lastPayment}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-2xl font-black text-rose-600">S/ ${d.amountDue.toLocaleString()}</p>
                            <button onclick="notify('Enviar recordatorio a ${d.tenant}')" class="mt-2 px-4 py-2 bg-rose-600 text-white rounded-lg font-bold text-xs hover:bg-rose-700 transition">Enviar Recordatorio</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// --- COMMUNITY ---

function renderCommunity() {
    const openTickets = DATA.tickets.filter(t => t.status === 'Abierto' || t.status === 'En Progreso');

    return `
        <div class="mb-6 md:mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div>
                <h1 class="text-2xl md:text-3xl font-black text-slate-900 mb-2">Comunidad y Soporte</h1>
                <p class="text-slate-500 font-medium text-sm md:text-base">${DATA.tickets.length} tickets en total • ${openTickets.length} abiertos</p>
            </div>
            <button onclick="openModal('ticket')" class="self-start px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition text-sm">🎫 Nuevo Ticket</button>
        </div>
        <div class="grid grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8">
            <div class="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl border shadow-sm">
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 md:mb-4">Tickets Abiertos</p>
                <h2 class="text-2xl md:text-4xl font-black text-amber-600 mb-2">${openTickets.length}</h2>
            </div>
            <div class="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl border shadow-sm">
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 md:mb-4">Tiempo Promedio</p>
                <h2 class="text-2xl md:text-4xl font-black text-blue-600 mb-2">3.2<span class="text-sm md:text-lg">días</span></h2>
            </div>
            <div class="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl border shadow-sm">
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 md:mb-4">Satisfacción</p>
                <h2 class="text-2xl md:text-4xl font-black text-emerald-600 mb-2">4.8<span class="text-sm md:text-lg">/5</span></h2>
            </div>
        </div>
        <div class="space-y-3 md:space-y-4">
            ${DATA.tickets.map(t => `
                <div class="p-4 md:p-6 bg-white border-2 rounded-xl md:rounded-2xl hover:shadow-lg transition">
                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3 md:mb-4">
                        <div class="flex-1">
                            <div class="flex items-center gap-2 md:gap-3 mb-2 flex-wrap">
                                <h3 class="font-bold text-base md:text-lg text-slate-900">${t.title}</h3>
                                ${Badge(t.priority, t.priority === 'Alta' ? 'red' : t.priority === 'Media' ? 'yellow' : 'gray')}
                            </div>
                            <p class="text-sm text-slate-600">
                                <span class="font-bold">${t.resident}</span> • Unidad ${t.unit} • ${t.category}
                            </p>
                        </div>
                        <div class="text-right">
                            ${Badge(t.status, t.status === 'Cerrado' ? 'green' : t.status === 'En Progreso' ? 'blue' : 'yellow')}
                            <p class="text-xs text-slate-500 mt-2">${t.date}</p>
                        </div>
                    </div>
                    <div class="flex gap-2">
                        <button onclick="notify('Ver detalle del ticket')" class="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-bold text-sm hover:bg-blue-100 transition">Ver Detalle</button>
                        ${t.status !== 'Cerrado' ? '<button onclick="notify(\'Asignar a proveedor\')" class="px-4 py-2 bg-slate-50 text-slate-600 rounded-lg font-bold text-sm hover:bg-slate-100 transition">Asignar</button>' : ''}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// --- INSPECTIONS ---

function renderInspections() {
    const completedInspections = DATA.inspections.filter(i => i.score);
    const avgScore = completedInspections.length > 0 ? Math.round(completedInspections.reduce((sum, i) => sum + i.score, 0) / completedInspections.length) : 0;

    return `
        <div class="mb-6 md:mb-8">
            <h1 class="text-2xl md:text-3xl font-black text-slate-900 mb-2">Inspecciones</h1>
            <p class="text-slate-500 font-medium text-sm md:text-base">Check-in, check-out y inspecciones rutinarias</p>
        </div>
        <div class="grid grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8">
            <div class="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl border shadow-sm">
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 md:mb-4">Completadas</p>
                <h2 class="text-2xl md:text-4xl font-black text-emerald-600 mb-2">${DATA.inspections.filter(i => i.status === 'Completado').length}</h2>
            </div>
            <div class="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl border shadow-sm">
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 md:mb-4">Pendientes</p>
                <h2 class="text-2xl md:text-4xl font-black text-amber-600 mb-2">${DATA.inspections.filter(i => i.status === 'Pendiente').length}</h2>
            </div>
            <div class="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl border shadow-sm">
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 md:mb-4">Score Promedio</p>
                <h2 class="text-2xl md:text-4xl font-black text-blue-600 mb-2">${avgScore}</h2>
            </div>
        </div>
        <div class="bg-white rounded-2xl md:rounded-3xl border overflow-hidden">
            <div class="p-4 md:p-6 border-b bg-slate-50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <h3 class="font-black text-base md:text-lg">Historial de Inspecciones</h3>
                <button onclick="notify('Nueva inspección')" class="self-start px-4 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition">+ Nueva Inspección</button>
            </div>
            <div class="table-responsive">
            <table class="w-full text-left text-sm min-w-[700px]">
                <thead class="bg-slate-50 border-b">
                    <tr>
                        <th class="p-6 font-black text-xs uppercase text-slate-600">Unidad</th>
                        <th class="p-6 font-black text-xs uppercase text-slate-600">Tipo</th>
                        <th class="p-6 font-black text-xs uppercase text-slate-600">Fecha</th>
                        <th class="p-6 font-black text-xs uppercase text-slate-600">Inspector</th>
                        <th class="p-6 font-black text-xs uppercase text-slate-600">Inquilino</th>
                        <th class="p-6 font-black text-xs uppercase text-slate-600">Score</th>
                        <th class="p-6 font-black text-xs uppercase text-slate-600">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    ${DATA.inspections.map(i => `
                        <tr class="border-b hover:bg-slate-50 transition">
                            <td class="p-6 font-bold text-slate-900">${i.unit}</td>
                            <td class="p-6">${Badge(i.type, i.type === 'Move-In' ? 'blue' : i.type === 'Move-Out' ? 'red' : 'gray')}</td>
                            <td class="p-6 text-slate-600">${i.date}</td>
                            <td class="p-6 text-slate-600">${i.inspector}</td>
                            <td class="p-6 text-slate-600">${i.tenant}</td>
                            <td class="p-6">
                                ${i.score ? '<span class="font-black ' + (i.score >= 90 ? 'text-emerald-600' : i.score >= 75 ? 'text-blue-600' : 'text-amber-600') + '">' + i.score + '/100</span>' : '<span class="text-slate-400">-</span>'}
                            </td>
                            <td class="p-6">${Badge(i.status, i.status === 'Completado' ? 'green' : 'yellow')}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            </div>
        </div>
    `;
}

// --- SETTINGS ---

function renderSettings() {
    return `
        <div class="mb-6 md:mb-8">
            <h1 class="text-2xl md:text-3xl font-black text-slate-900 mb-2">Configuración</h1>
            <p class="text-slate-500 font-medium text-sm md:text-base">Gestión de organización y suscripción</p>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 mb-6 md:mb-8">
            <div class="lg:col-span-2 bg-white rounded-2xl md:rounded-3xl border p-4 md:p-8">
                <h3 class="font-black text-base md:text-lg mb-4 md:mb-6">Información de la Organización</h3>
                <div class="space-y-6">
                    <div>
                        <label class="text-xs font-black text-slate-400 uppercase">Nombre</label>
                        <input type="text" value="${DATA.organization.name}" class="w-full mt-2 px-4 py-3 border rounded-xl font-bold" readonly>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="text-xs font-black text-slate-400 uppercase">RUC</label>
                            <input type="text" value="${DATA.organization.ruc}" class="w-full mt-2 px-4 py-3 border rounded-xl font-bold" readonly>
                        </div>
                        <div>
                            <label class="text-xs font-black text-slate-400 uppercase">Teléfono</label>
                            <input type="text" value="${DATA.organization.phone}" class="w-full mt-2 px-4 py-3 border rounded-xl" readonly>
                        </div>
                    </div>
                    <div>
                        <label class="text-xs font-black text-slate-400 uppercase">Dirección</label>
                        <input type="text" value="${DATA.organization.address}" class="w-full mt-2 px-4 py-3 border rounded-xl" readonly>
                    </div>
                    <div>
                        <label class="text-xs font-black text-slate-400 uppercase">Email</label>
                        <input type="email" value="${DATA.organization.email}" class="w-full mt-2 px-4 py-3 border rounded-xl" readonly>
                    </div>
                </div>
            </div>
            <div class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl md:rounded-3xl border-2 border-blue-200 p-4 md:p-8">
                <div class="text-center mb-6">
                    <div class="inline-block px-4 py-1 bg-blue-600 text-white rounded-full text-xs font-black mb-4">PLAN ${DATA.organization.plan.toUpperCase()}</div>
                    <h3 class="text-4xl font-black text-slate-900 mb-2">$299<span class="text-lg text-slate-500">/mes</span></h3>
                    <p class="text-sm text-slate-600 font-medium">Facturado mensualmente</p>
                </div>
                <div class="space-y-3 mb-6">
                    <div class="flex items-center text-sm">
                        <svg class="w-5 h-5 mr-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        <span class="font-medium">Hasta 100 unidades</span>
                    </div>
                    <div class="flex items-center text-sm">
                        <svg class="w-5 h-5 mr-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        <span class="font-medium">5 usuarios</span>
                    </div>
                    <div class="flex items-center text-sm">
                        <svg class="w-5 h-5 mr-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        <span class="font-medium">Analytics avanzado</span>
                    </div>
                    <div class="flex items-center text-sm">
                        <svg class="w-5 h-5 mr-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        <span class="font-medium">Soporte prioritario</span>
                    </div>
                </div>
                <button onclick="notify('Gestión de suscripción próximamente')" class="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition">Actualizar Plan</button>
            </div>
        </div>
        <div class="bg-white rounded-2xl md:rounded-3xl border p-4 md:p-8">
            <h3 class="font-black text-base md:text-lg mb-4 md:mb-6">Equipo</h3>
            <div class="space-y-4">
                ${DATA.staff.map(s => `
                    <div class="flex items-center justify-between p-4 border rounded-xl hover:bg-slate-50 transition">
                        <div class="flex items-center">
                            <div class="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold mr-4">
                                ${s.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                                <p class="font-bold text-slate-900">${s.name}</p>
                                <p class="text-sm text-slate-500">${s.email}</p>
                            </div>
                        </div>
                        ${Badge(s.role, 'blue')}
                    </div>
                `).join('')}
            </div>
            <button onclick="notify('Invitar miembro próximamente')" class="mt-6 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition">+ Invitar Miembro</button>
        </div>
    `;
}

// --- RESIDENT VIEWS ---

function renderResidentDashboard() {
    const r = DATA.resident;
    const nextPayment = r.payments.find(p => p.status === 'Pendiente');
    const myTickets = DATA.tickets.filter(t => t.resident === r.name);
    const openTickets = myTickets.filter(t => t.status !== 'Cerrado');
    const myReservations = DATA.reservations.filter(res => res.resident === r.name && res.status !== 'Cancelada');
    const upcomingRes = myReservations.filter(res => res.date >= '2026-02-08').sort((a, b) => a.date.localeCompare(b.date));
    const recentComunicados = DATA.comunicados.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

    return `
        <div class="mb-6 md:mb-8">
            <h1 class="text-2xl md:text-3xl font-black text-slate-900">Hola, ${r.name.split(' ')[0]} 👋</h1>
            <p class="text-slate-500 font-medium text-sm md:text-base">Unidad ${r.unit} • ${r.property} • ${r.floor}</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
            ${kpiCard('Próximo Pago', nextPayment ? 'S/ ' + nextPayment.amount.toLocaleString() : 'Al día', 'blue', nextPayment ? nextPayment.month : '✅ Todo pagado')}
            ${kpiCard('Día de Pago', 'Día ' + r.contract.day, 'gray', 'Cada mes')}
            ${kpiCard('Tickets', openTickets.length, openTickets.length > 0 ? 'red' : 'green', openTickets.length > 0 ? openTickets.length + ' abiertos' : 'Sin pendientes')}
            ${kpiCard('Reservas', upcomingRes.length, 'blue', upcomingRes.length > 0 ? 'Próximas' : 'Sin reservas')}
        </div>

        <!-- Próximas reservas -->
        ${upcomingRes.length > 0 ? `
        <div class="bg-white rounded-2xl md:rounded-3xl border p-4 md:p-8 mb-6 md:mb-8">
            <div class="flex justify-between items-center mb-4">
                <h3 class="font-bold text-base md:text-lg">🗓 Mis Próximas Reservas</h3>
                <a href="#/app/reservations" class="text-blue-600 font-bold text-sm hover:text-blue-700">Ver todas →</a>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                ${upcomingRes.slice(0, 3).map(res => {
                    const amenity = DATA.amenities.find(a => a.name === res.amenity);
                    return `
                    <div class="border-2 rounded-xl p-4 hover:shadow-md transition">
                        <div class="text-2xl mb-2">${amenity ? amenity.icon : '📌'}</div>
                        <h4 class="font-bold text-slate-900">${res.amenity}</h4>
                        <p class="text-sm text-slate-500 mt-1">${res.date} • ${res.timeSlot}</p>
                        <div class="mt-2">${Badge(res.status, res.status === 'Confirmada' ? 'green' : 'yellow')}</div>
                    </div>
                `}).join('')}
            </div>
        </div>
        ` : ''}

        <!-- Comunicados recientes -->
        <div class="bg-white rounded-2xl md:rounded-3xl border p-4 md:p-8 mb-6 md:mb-8">
            <div class="flex justify-between items-center mb-4">
                <h3 class="font-bold text-base md:text-lg">📢 Comunicados Recientes</h3>
                <a href="#/app/comunicados" class="text-blue-600 font-bold text-sm hover:text-blue-700">Ver todos →</a>
            </div>
            <div class="space-y-3">
                ${recentComunicados.map(c => `
                    <div class="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition">
                        <div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${
                            c.priority === 'Alta' ? 'bg-rose-100' : c.priority === 'Media' ? 'bg-amber-100' : 'bg-blue-100'
                        }">${c.type === 'Urgente' ? '🚨' : c.type === 'Mantenimiento' ? '🔧' : c.type === 'Aviso' ? '📋' : 'ℹ️'}</div>
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-2 flex-wrap">
                                <h4 class="font-bold text-sm text-slate-900">${c.title}</h4>
                                ${Badge(c.priority, c.priority === 'Alta' ? 'red' : c.priority === 'Media' ? 'yellow' : 'gray')}
                            </div>
                            <p class="text-xs text-slate-500 mt-0.5">${c.date}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Tickets abiertos -->
        ${openTickets.length > 0 ? `
        <div class="bg-white rounded-2xl md:rounded-3xl border p-4 md:p-8">
            <h3 class="font-bold text-base md:text-lg mb-4">🔧 Mis Tickets Abiertos</h3>
            <div class="space-y-3">
                ${openTickets.map(t => `
                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 p-3 border rounded-xl">
                        <div>
                            <h4 class="font-bold text-slate-900 text-sm">${t.title}</h4>
                            <p class="text-xs text-slate-500">${t.category} • ${t.date}</p>
                        </div>
                        <div class="flex gap-2">
                            ${Badge(t.priority, t.priority === 'Alta' ? 'red' : 'yellow')}
                            ${Badge(t.status, t.status === 'En Progreso' ? 'blue' : 'yellow')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        ` : ''}
    `;
}

function renderResidentBilling() {
    const r = DATA.resident;
    const completed = r.payments.filter(p => p.status === 'Completado');
    const pending = r.payments.filter(p => p.status === 'Pendiente');
    const totalPaid = completed.reduce((sum, p) => sum + p.amount, 0);

    return `
        <div class="mb-6 md:mb-8">
            <h1 class="text-2xl md:text-3xl font-black text-slate-900 mb-2">Mis Pagos</h1>
            <p class="text-slate-500 font-medium text-sm md:text-base">Unidad ${r.unit} • Renta S/ ${r.contract.rent.toLocaleString()} • Día ${r.contract.day} de cada mes</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <div class="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl border shadow-sm">
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 md:mb-4">Total Pagado</p>
                <h2 class="text-2xl md:text-3xl font-black text-emerald-600 mb-2">S/ ${totalPaid.toLocaleString()}</h2>
                <p class="text-xs font-bold text-slate-500">${completed.length} pagos realizados</p>
            </div>
            <div class="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl border shadow-sm">
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 md:mb-4">Próximo Pago</p>
                <h2 class="text-2xl md:text-3xl font-black text-blue-600 mb-2">${pending.length > 0 ? 'S/ ' + pending[0].amount.toLocaleString() : 'Al día'}</h2>
                <p class="text-xs font-bold text-slate-500">${pending.length > 0 ? pending[0].month : 'No hay pendientes'}</p>
            </div>
            <div class="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl border shadow-sm">
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 md:mb-4">Estado de Cuenta</p>
                <h2 class="text-2xl md:text-3xl font-black ${pending.length > 0 ? 'text-amber-600' : 'text-emerald-600'} mb-2">${pending.length > 0 ? 'Pendiente' : 'Al día ✅'}</h2>
                <p class="text-xs font-bold text-slate-500">Contrato ${r.contract.start} → ${r.contract.end}</p>
            </div>
        </div>

        ${pending.length > 0 ? `
        <div class="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 md:p-6 mb-6 md:mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div>
                <h3 class="font-bold text-blue-900">💳 Pago pendiente: ${pending[0].month}</h3>
                <p class="text-sm text-blue-700 mt-1">Monto: S/ ${pending[0].amount.toLocaleString()} • Vence el día ${r.contract.day}</p>
            </div>
            <button onclick="notify('Redirigiendo a pasarela de pago...')" class="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition">Pagar Ahora</button>
        </div>
        ` : ''}

        <div class="bg-white rounded-2xl md:rounded-3xl border overflow-hidden">
            <div class="p-4 md:p-6 border-b bg-slate-50">
                <h3 class="font-black text-base md:text-lg">Historial de Pagos</h3>
            </div>
            <div class="table-responsive">
            <table class="w-full text-left text-sm min-w-[500px]">
                <thead class="bg-slate-50 border-b">
                    <tr>
                        <th class="p-4 md:p-6 font-black text-xs uppercase text-slate-600">Mes</th>
                        <th class="p-4 md:p-6 font-black text-xs uppercase text-slate-600">Monto</th>
                        <th class="p-4 md:p-6 font-black text-xs uppercase text-slate-600">Fecha Pago</th>
                        <th class="p-4 md:p-6 font-black text-xs uppercase text-slate-600">Método</th>
                        <th class="p-4 md:p-6 font-black text-xs uppercase text-slate-600">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    ${r.payments.map(p => `
                        <tr class="border-b hover:bg-slate-50 transition">
                            <td class="p-4 md:p-6 font-bold text-slate-900">${p.month}</td>
                            <td class="p-4 md:p-6 font-bold text-slate-900">S/ ${p.amount.toLocaleString()}</td>
                            <td class="p-4 md:p-6 text-slate-600">${p.date || '-'}</td>
                            <td class="p-4 md:p-6 text-slate-600">${p.method}</td>
                            <td class="p-4 md:p-6">${Badge(p.status, p.status === 'Completado' ? 'green' : 'yellow')}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            </div>
        </div>
    `;
}

function renderResidentComunicados() {
    const comunicados = DATA.comunicados.sort((a, b) => b.date.localeCompare(a.date));
    return `
        <div class="mb-6 md:mb-8">
            <h1 class="text-2xl md:text-3xl font-black text-slate-900 mb-2">📢 Comunicados</h1>
            <p class="text-slate-500 font-medium text-sm md:text-base">Avisos y noticias del edificio</p>
        </div>
        <div class="space-y-4">
            ${comunicados.map(c => `
                <div class="bg-white rounded-2xl border-2 ${
                    c.priority === 'Alta' ? 'border-rose-200' : c.priority === 'Media' ? 'border-amber-200' : 'border-slate-200'
                } p-4 md:p-6 hover:shadow-lg transition">
                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                        <div class="flex items-start gap-3">
                            <div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${
                                c.priority === 'Alta' ? 'bg-rose-100' : c.priority === 'Media' ? 'bg-amber-100' : 'bg-blue-100'
                            }">${c.type === 'Urgente' ? '🚨' : c.type === 'Mantenimiento' ? '🔧' : c.type === 'Aviso' ? '📋' : 'ℹ️'}</div>
                            <div>
                                <h3 class="font-bold text-lg text-slate-900">${c.title}</h3>
                                <p class="text-sm text-slate-500 mt-0.5">${c.date} • ${c.type}</p>
                            </div>
                        </div>
                        <div class="flex gap-2">
                            ${Badge(c.priority, c.priority === 'Alta' ? 'red' : c.priority === 'Media' ? 'yellow' : 'gray')}
                            ${Badge(c.type, c.type === 'Urgente' ? 'red' : 'blue')}
                        </div>
                    </div>
                    <p class="text-slate-600 text-sm leading-relaxed ml-0 sm:ml-13">${c.body}</p>
                </div>
            `).join('')}
        </div>
    `;
}

function renderResidentCommunity() {
    const r = DATA.resident;
    const myTickets = DATA.tickets.filter(t => t.resident === r.name);
    const openTickets = myTickets.filter(t => t.status !== 'Cerrado');

    return `
        <div class="mb-6 md:mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div>
                <h1 class="text-2xl md:text-3xl font-black text-slate-900 mb-2">Soporte</h1>
                <p class="text-slate-500 font-medium text-sm md:text-base">Mis tickets y solicitudes de mantenimiento</p>
            </div>
            <button onclick="openModal('ticket')" class="self-start px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition text-sm">🎫 Nuevo Ticket</button>
        </div>

        <div class="grid grid-cols-2 gap-3 md:gap-6 mb-6 md:mb-8">
            ${kpiCard('Abiertos', openTickets.length, openTickets.length > 0 ? 'red' : 'green', openTickets.length > 0 ? 'Pendientes' : 'Todo resuelto')}
            ${kpiCard('Total', myTickets.length, 'gray', 'Historial completo')}
        </div>

        <div class="space-y-3">
            ${myTickets.length > 0 ? myTickets.map(t => `
                <div class="p-4 md:p-6 bg-white border-2 rounded-xl md:rounded-2xl hover:shadow-lg transition">
                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                        <div>
                            <div class="flex items-center gap-2 flex-wrap mb-1">
                                <h3 class="font-bold text-base text-slate-900">${t.title}</h3>
                                ${Badge(t.priority, t.priority === 'Alta' ? 'red' : t.priority === 'Media' ? 'yellow' : 'gray')}
                            </div>
                            <p class="text-sm text-slate-500">${t.category} • Unidad ${t.unit} • ${t.date}</p>
                        </div>
                        ${Badge(t.status, t.status === 'Cerrado' ? 'green' : t.status === 'En Progreso' ? 'blue' : 'yellow')}
                    </div>
                </div>
            `).join('') : '<div class="text-center py-12 text-slate-400"><p class="text-4xl mb-4">🎉</p><p class="font-bold">No tienes tickets. ¡Todo bien!</p></div>'}
        </div>
    `;
}

function renderResidentReservations() {
    const r = DATA.resident;
    const myReservations = DATA.reservations.filter(res => res.resident === r.name);
    const upcoming = myReservations.filter(res => res.date >= '2026-02-08' && res.status !== 'Cancelada').sort((a, b) => a.date.localeCompare(b.date));
    const past = myReservations.filter(res => res.date < '2026-02-08' || res.status === 'Cancelada');
    const availableAmenities = DATA.amenities.filter(a => a.status === 'Disponible');

    // Generar mini calendario de febrero 2026
    const daysInFeb = 28;
    const firstDay = 0; // Feb 1, 2026 = Sunday
    const today = 8;
    const reservedDays = myReservations.filter(res => res.date.startsWith('2026-02') && res.status !== 'Cancelada').map(res => parseInt(res.date.split('-')[2]));
    let calendarHTML = '';
    const dayNames = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];
    calendarHTML += dayNames.map(d => `<div class="text-center text-[10px] font-black text-slate-400 uppercase py-2">${d}</div>`).join('');
    for (let i = 0; i < firstDay; i++) calendarHTML += '<div></div>';
    for (let d = 1; d <= daysInFeb; d++) {
        const isToday = d === today;
        const isReserved = reservedDays.includes(d);
        const isPast = d < today;
        calendarHTML += `<div class="text-center py-1.5 text-sm font-bold rounded-lg cursor-pointer transition ${
            isToday ? 'bg-blue-600 text-white' :
            isReserved ? 'bg-emerald-100 text-emerald-700' :
            isPast ? 'text-slate-300' :
            'text-slate-700 hover:bg-blue-50'
        }">${d}</div>`;
    }

    return `
        <div class="mb-6 md:mb-8">
            <h1 class="text-2xl md:text-3xl font-black text-slate-900 mb-2">🗓 Mis Reservas</h1>
            <p class="text-slate-500 font-medium text-sm md:text-base">Reserva las áreas comunes de tu edificio</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 mb-6 md:mb-8">
            <!-- Calendario -->
            <div class="bg-white rounded-2xl md:rounded-3xl border p-4 md:p-6">
                <h3 class="font-bold text-base md:text-lg mb-4">Febrero 2026</h3>
                <div class="grid grid-cols-7 gap-1">
                    ${calendarHTML}
                </div>
                <div class="mt-4 flex flex-wrap gap-3 text-xs">
                    <div class="flex items-center gap-1"><div class="w-3 h-3 rounded bg-blue-600"></div> Hoy</div>
                    <div class="flex items-center gap-1"><div class="w-3 h-3 rounded bg-emerald-100 border border-emerald-300"></div> Con reserva</div>
                </div>
            </div>

            <!-- Amenidades disponibles -->
            <div class="lg:col-span-2 bg-white rounded-2xl md:rounded-3xl border p-4 md:p-6">
                <h3 class="font-bold text-base md:text-lg mb-4">Áreas Comunes Disponibles</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    ${availableAmenities.map(a => `
                        <div class="border-2 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition cursor-pointer" onclick="notify('Reservar ${a.name} próximamente')">
                            <div class="flex items-center gap-3 mb-2">
                                <span class="text-2xl">${a.icon}</span>
                                <div>
                                    <h4 class="font-bold text-slate-900">${a.name}</h4>
                                    <p class="text-xs text-slate-500">Capacidad: ${a.capacity} personas</p>
                                </div>
                            </div>
                            <p class="text-xs text-slate-500 mb-2">🕐 ${a.hours}</p>
                            <p class="text-[10px] text-slate-400 italic">${a.rules}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>

        <!-- Próximas reservas -->
        ${upcoming.length > 0 ? `
        <div class="bg-white rounded-2xl md:rounded-3xl border p-4 md:p-6 mb-6 md:mb-8">
            <h3 class="font-bold text-base md:text-lg mb-4">📅 Próximas Reservas</h3>
            <div class="space-y-3">
                ${upcoming.map(res => {
                    const amenity = DATA.amenities.find(a => a.name === res.amenity);
                    return `
                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 p-4 border rounded-xl hover:bg-slate-50 transition">
                        <div class="flex items-center gap-3">
                            <span class="text-2xl">${amenity ? amenity.icon : '📌'}</span>
                            <div>
                                <h4 class="font-bold text-slate-900">${res.amenity}</h4>
                                <p class="text-sm text-slate-500">${res.date} • ${res.timeSlot}${res.guests > 0 ? ' • ' + res.guests + ' invitados' : ''}</p>
                            </div>
                        </div>
                        <div class="flex gap-2 items-center">
                            ${Badge(res.status, res.status === 'Confirmada' ? 'green' : 'yellow')}
                            <button onclick="notify('Cancelar reserva #${res.id}')" class="px-3 py-1.5 bg-rose-50 text-rose-600 rounded-lg font-bold text-xs hover:bg-rose-100 transition">Cancelar</button>
                        </div>
                    </div>
                `}).join('')}
            </div>
        </div>
        ` : ''}

        <!-- Historial -->
        ${past.length > 0 ? `
        <div class="bg-white rounded-2xl md:rounded-3xl border p-4 md:p-6">
            <h3 class="font-bold text-base md:text-lg mb-4 text-slate-400">Historial</h3>
            <div class="space-y-2">
                ${past.map(res => {
                    const amenity = DATA.amenities.find(a => a.name === res.amenity);
                    return `
                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 p-3 rounded-xl text-slate-400">
                        <div class="flex items-center gap-3">
                            <span class="text-lg">${amenity ? amenity.icon : '📌'}</span>
                            <div>
                                <h4 class="font-medium">${res.amenity}</h4>
                                <p class="text-xs">${res.date} • ${res.timeSlot}</p>
                            </div>
                        </div>
                        ${Badge(res.status, res.status === 'Cancelada' ? 'red' : 'gray')}
                    </div>
                `}).join('')}
            </div>
        </div>
        ` : ''}
    `;
}

// --- ADMIN RESERVATIONS ---

function renderAdminReservations() {
    const allRes = DATA.reservations;
    const confirmed = allRes.filter(r => r.status === 'Confirmada');
    const pending = allRes.filter(r => r.status === 'Pendiente');
    const cancelled = allRes.filter(r => r.status === 'Cancelada');

    // Uso por amenidad
    const amenityUsage = {};
    DATA.amenities.forEach(a => {
        amenityUsage[a.name] = allRes.filter(r => r.amenity === a.name && r.status !== 'Cancelada').length;
    });
    const maxUsage = Math.max(...Object.values(amenityUsage), 1);

    return `
        <div class="mb-6 md:mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div>
                <h1 class="text-2xl md:text-3xl font-black text-slate-900 mb-2">Reservaciones</h1>
                <p class="text-slate-500 font-medium text-sm md:text-base">Gestión de áreas comunes y reservas de residentes</p>
            </div>
            <button onclick="notify('Crear reserva manual próximamente')" class="self-start px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition text-sm">+ Nueva Reserva</button>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
            ${kpiCard('Total Reservas', allRes.length, 'blue', 'Este mes')}
            ${kpiCard('Confirmadas', confirmed.length, 'green', Math.round(confirmed.length / allRes.length * 100) + '%')}
            ${kpiCard('Pendientes', pending.length, 'red', 'Por aprobar')}
            ${kpiCard('Canceladas', cancelled.length, 'gray', 'Este mes')}
        </div>

        <!-- Amenidades y uso -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-8">
            <div class="bg-white rounded-2xl md:rounded-3xl border p-4 md:p-6">
                <h3 class="font-bold text-base md:text-lg mb-4">📊 Uso por Amenidad</h3>
                <div class="space-y-3">
                    ${DATA.amenities.map(a => {
                        const usage = amenityUsage[a.name] || 0;
                        const pct = Math.round(usage / maxUsage * 100);
                        return `
                        <div>
                            <div class="flex justify-between items-center mb-1">
                                <span class="text-sm font-bold text-slate-700">${a.icon} ${a.name}</span>
                                <span class="text-sm font-black text-slate-900">${usage} reservas</span>
                            </div>
                            <div class="w-full bg-slate-100 h-2 rounded-full"><div class="bg-blue-600 h-full rounded-full transition-all" style="width: ${pct}%"></div></div>
                        </div>
                    `}).join('')}
                </div>
            </div>

            <div class="bg-white rounded-2xl md:rounded-3xl border p-4 md:p-6">
                <h3 class="font-bold text-base md:text-lg mb-4">🏢 Estado de Amenidades</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    ${DATA.amenities.map(a => `
                        <div class="border rounded-xl p-4 flex items-center gap-3">
                            <span class="text-2xl">${a.icon}</span>
                            <div class="flex-1 min-w-0">
                                <h4 class="font-bold text-sm text-slate-900 truncate">${a.name}</h4>
                                <p class="text-xs text-slate-500">${a.hours}</p>
                            </div>
                            ${Badge(a.status, a.status === 'Disponible' ? 'green' : 'yellow')}
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>

        <!-- Tabla de reservaciones -->
        <div class="bg-white rounded-2xl md:rounded-3xl border overflow-hidden">
            <div class="p-4 md:p-6 border-b bg-slate-50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <h3 class="font-black text-base md:text-lg">Todas las Reservaciones</h3>
                <div class="flex gap-2 flex-wrap">
                    ${Badge(confirmed.length + ' Confirmadas', 'green')}
                    ${Badge(pending.length + ' Pendientes', 'yellow')}
                    ${Badge(cancelled.length + ' Canceladas', 'red')}
                </div>
            </div>
            <div class="table-responsive">
            <table class="w-full text-left text-sm min-w-[700px]">
                <thead class="bg-slate-50 border-b">
                    <tr>
                        <th class="p-4 md:p-6 font-black text-xs uppercase text-slate-600">Amenidad</th>
                        <th class="p-4 md:p-6 font-black text-xs uppercase text-slate-600">Residente</th>
                        <th class="p-4 md:p-6 font-black text-xs uppercase text-slate-600">Unidad</th>
                        <th class="p-4 md:p-6 font-black text-xs uppercase text-slate-600">Fecha</th>
                        <th class="p-4 md:p-6 font-black text-xs uppercase text-slate-600">Horario</th>
                        <th class="p-4 md:p-6 font-black text-xs uppercase text-slate-600">Invitados</th>
                        <th class="p-4 md:p-6 font-black text-xs uppercase text-slate-600">Estado</th>
                        <th class="p-4 md:p-6 font-black text-xs uppercase text-slate-600">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${allRes.sort((a, b) => a.date.localeCompare(b.date)).map(r => {
                        const amenity = DATA.amenities.find(a => a.name === r.amenity);
                        return `
                        <tr class="border-b hover:bg-slate-50 transition">
                            <td class="p-4 md:p-6 font-bold text-slate-900">${amenity ? amenity.icon : ''} ${r.amenity}</td>
                            <td class="p-4 md:p-6 text-slate-700 font-medium">${r.resident}</td>
                            <td class="p-4 md:p-6 text-slate-600">${r.unit}</td>
                            <td class="p-4 md:p-6 text-slate-600">${r.date}</td>
                            <td class="p-4 md:p-6 text-slate-600">${r.timeSlot}</td>
                            <td class="p-4 md:p-6 text-slate-600">${r.guests}</td>
                            <td class="p-4 md:p-6">${Badge(r.status, r.status === 'Confirmada' ? 'green' : r.status === 'Pendiente' ? 'yellow' : 'red')}</td>
                            <td class="p-4 md:p-6">
                                ${r.status === 'Pendiente' ? `
                                    <button onclick="notify('Aprobar reserva #${r.id}')" class="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg font-bold text-xs hover:bg-emerald-100 transition mr-1">Aprobar</button>
                                    <button onclick="notify('Rechazar reserva #${r.id}')" class="px-3 py-1 bg-rose-50 text-rose-600 rounded-lg font-bold text-xs hover:bg-rose-100 transition">Rechazar</button>
                                ` : r.status === 'Confirmada' ? `
                                    <button onclick="notify('Cancelar reserva #${r.id}')" class="px-3 py-1 bg-rose-50 text-rose-600 rounded-lg font-bold text-xs hover:bg-rose-100 transition">Cancelar</button>
                                ` : '<span class="text-slate-400 text-xs">-</span>'}
                            </td>
                        </tr>
                    `}).join('')}
                </tbody>
            </table>
            </div>
        </div>
    `;
}

// --- DRAG & DROP ---

let draggedLeadId = null;

function handleDragStart(event) {
    draggedLeadId = event.target.dataset.leadId;
    event.target.classList.add('dragging');
    event.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(event) {
    event.target.classList.remove('dragging');
}

function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    const column = event.target.closest('.kanban-column');
    if (column) column.classList.add('drag-over');
}

function handleDragLeave(event) {
    const column = event.target.closest('.kanban-column');
    if (column && !column.contains(event.relatedTarget)) {
        column.classList.remove('drag-over');
    }
}

function handleDrop(event) {
    event.preventDefault();
    const column = event.target.closest('.kanban-column');
    if (!column) return;
    
    column.classList.remove('drag-over');
    const newStage = column.dataset.stage;
    
    // Actualizar el stage del lead en DATA
    const lead = DATA.leads.find(l => l.id === parseInt(draggedLeadId));
    if (lead && lead.stage !== newStage) {
        lead.stage = newStage;
        notify(`Lead movido a: ${newStage}`);
        // Re-renderizar la vista
        const hash = window.location.hash;
        Router.handleRoute();
    }
}

// --- MODAL SYSTEM ---

function openModal(type, data = {}) {
    const forms = {
        lead: {
            title: '✨ Nuevo Lead',
            icon: '👤',
            fields: [
                { name: 'name', label: 'Nombre Completo', type: 'text', placeholder: 'Ej: Juan Pérez Rodriguez', required: true },
                { name: 'email', label: 'Email', type: 'email', placeholder: 'ejemplo@mail.com', required: true },
                { name: 'phone', label: 'Teléfono', type: 'tel', placeholder: '987 654 321', required: true },
                { name: 'unit', label: 'Unidad de Interés', type: 'select', options: DATA.units.map(u => u.code), required: true },
                { name: 'stage', label: 'Etapa Inicial', type: 'select', options: ['Nuevo', 'Visita', 'Aplicación', 'Aprobado'], required: true },
                { name: 'notes', label: 'Notas', type: 'textarea', placeholder: 'Información adicional del lead...' }
            ],
            submitText: 'Crear Lead',
            onSubmit: 'handleLeadSubmit'
        },
        property: {
            title: '🏢 Nueva Propiedad',
            icon: '🏛️',
            fields: [
                { name: 'name', label: 'Nombre de la Propiedad', type: 'text', placeholder: 'Ej: Torre Miraflores', required: true },
                { name: 'address', label: 'Dirección', type: 'text', placeholder: 'Av. Larco 123', required: true },
                { name: 'district', label: 'Distrito', type: 'text', placeholder: 'Miraflores', required: true },
                { name: 'unitsCount', label: 'Número de Unidades', type: 'number', placeholder: '50', required: true },
                { name: 'img', label: 'URL Imagen', type: 'text', placeholder: 'https://...', required: false }
            ],
            submitText: 'Crear Propiedad',
            onSubmit: 'handlePropertySubmit'
        },
        unit: {
            title: '🏠 Nueva Unidad',
            icon: '🚪',
            fields: [
                { name: 'code', label: 'Código de Unidad', type: 'text', placeholder: 'Ej: 101-A', required: true },
                { name: 'type', label: 'Tipo', type: 'select', options: ['Studio', '1B/1B', '2B/2B', '3B/2B', '3B/3B', 'Local Comercial'], required: true },
                { name: 'property', label: 'Propiedad', type: 'select', options: DATA.properties.map(p => p.name), required: true },
                { name: 'rent', label: 'Renta Mensual (S/)', type: 'number', placeholder: '2500', required: true },
                { name: 'status', label: 'Estado', type: 'select', options: ['Disponible', 'Ocupada', 'Mantenimiento'], required: true }
            ],
            submitText: 'Crear Unidad',
            onSubmit: 'handleUnitSubmit'
        },
        lease: {
            title: '📝 Nuevo Contrato',
            icon: '📜',
            fields: [
                { name: 'tenant', label: 'Nombre del Inquilino', type: 'text', placeholder: 'Roberto Gomez', required: true },
                { name: 'unit', label: 'Unidad', type: 'select', options: DATA.units.filter(u => u.status === 'Disponible').map(u => u.code), required: true },
                { name: 'start', label: 'Fecha Inicio', type: 'date', required: true },
                { name: 'end', label: 'Fecha Fin', type: 'date', required: true },
                { name: 'rent', label: 'Renta Mensual (S/)', type: 'number', placeholder: '2500', required: true },
                { name: 'day', label: 'Día de Pago', type: 'number', placeholder: '5', min: '1', max: '28', required: true },
                { name: 'status', label: 'Estado', type: 'select', options: ['Activo', 'Por Firmar', 'Finalizado'], required: true }
            ],
            submitText: 'Crear Contrato',
            onSubmit: 'handleLeaseSubmit'
        },
        ticket: {
            title: '🎫 Nuevo Ticket de Soporte',
            icon: '🔧',
            fields: [
                { name: 'title', label: 'Título del Problema', type: 'text', placeholder: 'Ej: Fuga de agua baño', required: true },
                { name: 'category', label: 'Categoría', type: 'select', options: ['Plomería', 'Eléctrico', 'Carpintería', 'Climatización', 'Limpieza', 'Seguridad', 'Otro'], required: true },
                { name: 'priority', label: 'Prioridad', type: 'select', options: ['Baja', 'Media', 'Alta'], required: true },
                { name: 'unit', label: 'Unidad', type: DATA.userRole === 'RESIDENTE' ? 'text' : 'select', options: DATA.userRole === 'STAFF' ? DATA.units.map(u => u.code) : [], value: DATA.userRole === 'RESIDENTE' ? DATA.resident.unit : '', required: true, readonly: DATA.userRole === 'RESIDENTE' },
                { name: 'description', label: 'Descripción Detallada', type: 'textarea', placeholder: 'Describe el problema con el mayor detalle posible...', required: true }
            ],
            submitText: 'Crear Ticket',
            onSubmit: 'handleTicketSubmit'
        }
    };

    const form = forms[type];
    if (!form) return;

    const modalHTML = `
        <div class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fadeIn" onclick="if(event.target === this) closeModal()">
            <div class="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-slideUp">
                <!-- Header -->
                <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white relative">
                    <button onclick="closeModal()" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">${form.icon}</div>
                        <div>
                            <h2 class="text-2xl font-black">${form.title}</h2>
                            <p class="text-white/80 text-sm">Completa los campos requeridos</p>
                        </div>
                    </div>
                </div>

                <!-- Form -->
                <form id="dynamicForm" onsubmit="${form.onSubmit}(event); return false;" class="p-6 overflow-y-auto" style="max-height: calc(90vh - 180px);">
                    <div class="space-y-5">
                        ${form.fields.map(field => {
                            if (field.type === 'textarea') {
                                return `
                                    <div class="form-group">
                                        <label class="block text-sm font-black text-slate-700 mb-2">
                                            ${field.label} ${field.required ? '<span class="text-rose-500">*</span>' : ''}
                                        </label>
                                        <textarea 
                                            name="${field.name}" 
                                            placeholder="${field.placeholder || ''}" 
                                            ${field.required ? 'required' : ''}
                                            rows="4"
                                            class="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition font-medium text-slate-900 placeholder-slate-400"
                                        ></textarea>
                                    </div>
                                `;
                            } else if (field.type === 'select') {
                                return `
                                    <div class="form-group">
                                        <label class="block text-sm font-black text-slate-700 mb-2">
                                            ${field.label} ${field.required ? '<span class="text-rose-500">*</span>' : ''}
                                        </label>
                                        <select 
                                            name="${field.name}" 
                                            ${field.required ? 'required' : ''}
                                            class="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition font-bold text-slate-900 bg-white"
                                        >
                                            <option value="">Seleccionar...</option>
                                            ${field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                                        </select>
                                    </div>
                                `;
                            } else {
                                return `
                                    <div class="form-group">
                                        <label class="block text-sm font-black text-slate-700 mb-2">
                                            ${field.label} ${field.required ? '<span class="text-rose-500">*</span>' : ''}
                                        </label>
                                        <input 
                                            type="${field.type}" 
                                            name="${field.name}" 
                                            placeholder="${field.placeholder || ''}" 
                                            ${field.required ? 'required' : ''}
                                            ${field.value ? `value="${field.value}"` : ''}
                                            ${field.readonly ? 'readonly' : ''}
                                            ${field.min ? `min="${field.min}"` : ''}
                                            ${field.max ? `max="${field.max}"` : ''}
                                            class="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition font-bold text-slate-900 placeholder-slate-400 ${field.readonly ? 'bg-slate-50' : ''}"
                                        />
                                    </div>
                                `;
                            }
                        }).join('')}
                    </div>

                    <!-- Actions -->
                    <div class="flex gap-3 mt-8 pt-6 border-t">
                        <button type="button" onclick="closeModal()" class="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition">
                            Cancelar
                        </button>
                        <button type="submit" class="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition">
                            ${form.submitText}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;

    document.getElementById('modal-container').innerHTML = modalHTML;
}

function closeModal() {
    document.getElementById('modal-container').innerHTML = '';
}

// --- FORM HANDLERS ---

function handleLeadSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newLead = {
        id: Math.max(...DATA.leads.map(l => l.id)) + 1,
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        unit: formData.get('unit'),
        stage: formData.get('stage'),
        date: new Date().toISOString().split('T')[0]
    };
    DATA.leads.push(newLead);
    closeModal();
    notify(`✅ Lead "${newLead.name}" creado exitosamente`);
    Router.handleRoute();
}

function handlePropertySubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newProperty = {
        id: Math.max(...DATA.properties.map(p => p.id)) + 1,
        name: formData.get('name'),
        address: formData.get('address'),
        district: formData.get('district'),
        unitsCount: parseInt(formData.get('unitsCount')),
        img: formData.get('img') || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400'
    };
    DATA.properties.push(newProperty);
    closeModal();
    notify(`✅ Propiedad "${newProperty.name}" creada exitosamente`);
    Router.handleRoute();
}

function handleUnitSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newUnit = {
        id: Math.max(...DATA.units.map(u => u.id)) + 1,
        code: formData.get('code'),
        type: formData.get('type'),
        property: formData.get('property'),
        rent: parseInt(formData.get('rent')),
        status: formData.get('status')
    };
    DATA.units.push(newUnit);
    closeModal();
    notify(`✅ Unidad "${newUnit.code}" creada exitosamente`);
    Router.handleRoute();
}

function handleLeaseSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newLease = {
        id: Math.max(...DATA.leases.map(l => l.id)) + 1,
        tenant: formData.get('tenant'),
        unit: formData.get('unit'),
        start: formData.get('start'),
        end: formData.get('end'),
        rent: parseInt(formData.get('rent')),
        day: parseInt(formData.get('day')),
        status: formData.get('status')
    };
    DATA.leases.push(newLease);
    // Actualizar status de la unidad
    const unit = DATA.units.find(u => u.code === newLease.unit);
    if (unit) unit.status = 'Ocupada';
    closeModal();
    notify(`✅ Contrato para "${newLease.tenant}" creado exitosamente`);
    Router.handleRoute();
}

function handleTicketSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newTicket = {
        id: Math.max(...DATA.tickets.map(t => t.id)) + 1,
        title: formData.get('title'),
        category: formData.get('category'),
        priority: formData.get('priority'),
        unit: formData.get('unit'),
        resident: DATA.userRole === 'RESIDENTE' ? DATA.resident.name : 'Inquilino',
        status: 'Abierto',
        date: new Date().toISOString().split('T')[0]
    };
    DATA.tickets.push(newTicket);
    closeModal();
    notify(`✅ Ticket "${newTicket.title}" creado exitosamente`);
    Router.handleRoute();
}

// --- GLOBAL UTILS ---

function toggleSidebar() {
    const sidebar = document.getElementById('mobile-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar && overlay) {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('open');
    }
}

function closeSidebar() {
    const sidebar = document.getElementById('mobile-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar && overlay) {
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
    }
}

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
