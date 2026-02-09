# State 360 - Documentación del MVP

## 📋 Índice
1. [Visión General](#visión-general)
2. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
3. [Módulos y Funcionalidades](#módulos-y-funcionalidades)
4. [Explicación Detallada por Vista](#explicación-detallada-por-vista)
5. [Roadmap y Mejoras](#roadmap-y-mejoras)
6. [Modelo de Negocio SaaS](#modelo-de-negocio-saas)

---

## 🎯 Visión General

**State 360** es un MVP (Producto Mínimo Viable) de software SaaS diseñado para la gestión integral de propiedades multifamily (edificios de departamentos, locales comerciales) en el mercado peruano.

### Propósito del MVP
- **Validar** la demanda del mercado peruano para software de gestión multifamily
- **Demostrar** capacidades core del producto a inversionistas y clientes piloto
- **Iterar rápidamente** basado en feedback de usuarios reales

### Diferenciadores Clave
- ✅ Adaptado específicamente para el mercado peruano (facturación electrónica, moneda local)
- ✅ Interfaz moderna tipo "Notion/Linear" con diseño limpio
- ✅ Modelo multi-tenant (múltiples organizaciones por usuario)
- ✅ Sistema de roles (STAFF vs RESIDENTE)
- ✅ Módulo de KPIs operativos para toma de decisiones data-driven

---

## 🏗️ Arquitectura del Proyecto

### Estructura de Archivos

```
MVP STATE 360/
├── index.html          # Estructura HTML y contenedores
├── styles.css          # Estilos personalizados y temas
├── app.js             # Lógica de negocio y renderizado
└── README.md          # Esta documentación
```

### Stack Tecnológico (MVP)

| Tecnología | Propósito | Justificación para MVP |
|------------|-----------|------------------------|
| **HTML5** | Estructura | Estándar, compatible, sin compilación |
| **TailwindCSS (CDN)** | Estilos | Desarrollo rápido, diseño consistente |
| **Vanilla JavaScript** | Lógica | Sin dependencias, deploy inmediato |
| **Hash Routing** | Navegación | SPA sin servidor backend |

### Patrón de Arquitectura

**Single Page Application (SPA)** con renderizado del lado del cliente:

```javascript
Router (Hash-based)
    ↓
View Renderers (renderDashboard, renderKPIs, etc.)
    ↓
Component Functions (Badge, Icon, kpiCard)
    ↓
Data Layer (DATA object - simula backend)
```

---

## 📦 Módulos y Funcionalidades

### Módulos Implementados en el MVP

#### 1. **Landing Page** (`#/landing`)
**Propósito:** Página pública de marketing y captación de leads.

**Elementos:**
- Hero section con value proposition
- CTA principal para probar el prototipo
- Navegación a login

**Para mejorar en versión completa:**
- [ ] Agregar sección de features con capturas de pantalla
- [ ] Testimonios de clientes piloto
- [ ] Pricing table
- [ ] Footer con links legales (T&C, Privacy Policy)
- [ ] Integración con analytics (Google Analytics/Mixpanel)

---

#### 2. **Login** (`#/login`)
**Propósito:** Autenticación de usuarios y demostración de roles.

**Elementos:**
- Email/password (credenciales hardcodeadas para demo)
- Toggle de rol: **STAFF** vs **RESIDENTE**

**Roles explicados:**

| Rol | Descripción | Casos de Uso |
|-----|-------------|--------------|
| **STAFF** | Empleado de la inmobiliaria (admin, comercial, operaciones) | Gestión completa de propiedades, contratos, leads |
| **RESIDENTE** | Inquilino/tenant que vive en una propiedad | Ver sus pagos, abrir tickets de soporte |

**Credenciales Demo:**
- Email: `demo@state360.pe`
- Password: `password123`

**Para mejorar:**
- [ ] Autenticación real con JWT/OAuth
- [ ] Recuperación de contraseña
- [ ] Registro de nuevos usuarios (self-signup)
- [ ] 2FA (autenticación de dos factores)
- [ ] SSO (Single Sign-On) para empresas grandes
- [ ] Auditoría de logins (fecha/hora, IP)

---

#### 3. **Organization Selector** (`#/org-selector`)
**Propósito:** Multi-tenancy - un usuario puede pertenecer a múltiples organizaciones.

**Flujo:**
1. Usuario se loguea
2. Se muestra lista de organizaciones a las que tiene acceso
3. Selecciona una organización
4. Entra al workspace de esa organización

**Datos mostrados por organización:**
- Nombre de la organización
- Cantidad de unidades gestionadas
- Plan (ej: Premium) - no implementado en MVP
- Estado (Active/Suspended) - no implementado en MVP

**Para mejorar:**
- [ ] Crear nueva organización desde aquí
- [ ] Invitar colaboradores a la organización
- [ ] Mostrar estado de suscripción (trial, activa, vencida)
- [ ] Favoritos/última organización accedida
- [ ] Búsqueda si hay muchas organizaciones

---

#### 4. **Dashboard / Resumen** (`#/app/dashboard`)
**Propósito:** Vista general de métricas operativas clave.

### Tarjetas KPI del Dashboard

#### 4.1 Tarjeta: **Ocupación**
```
Valor: 94.2%
Subtítulo: "En meta"
Color: Azul
```

**Qué significa:**
- **Ocupancy Rate** = (Unidades Ocupadas / Total Unidades) × 100
- **94.2%** indica que de 150 unidades (ejemplo), 141 están ocupadas
- **Meta típica:** 93-95% (por encima = excelente, por debajo = problema de comercialización)

**Por qué es importante:**
- Métrica #1 en real estate multifamily
- Impacta directamente revenue
- Indica efectividad del equipo comercial

**Para mejorar:**
- [ ] Gráfico de tendencia (últimos 6 meses)
- [ ] Comparación vs benchmark del mercado
- [ ] Desglose por propiedad
- [ ] Alertas si cae debajo de threshold

---

#### 4.2 Tarjeta: **Morosidad**
```
Valor: 3.1%
Subtítulo: "Crítico: 2"
Color: Rojo
```

**Qué significa:**
- **Delinquency Rate** = (Rentas no cobradas / Total esperado) × 100
- **3.1%** significa que ese % de rentas del mes no se han pagado
- **Crítico: 2** = 2 inquilinos con mora > 30 días (riesgo de desalojo)

**Por qué es importante:**
- Impacto directo en flujo de caja
- Indicador de tenant screening quality
- 3.1% está en rango aceptable (< 5% es OK, > 8% es crítico)

**Para mejorar:**
- [ ] Lista de inquilinos morosos con días de atraso
- [ ] Botón de acción: "Enviar recordatorio automático"
- [ ] Workflow de cobranza (días 5, 10, 15, 30)
- [ ] Integración con pasarelas de pago (Niubiz, Culqi)

---

#### 4.3 Tarjeta: **Recaudación**
```
Valor: S/ 142.5k
Subtítulo: "92% recaudado"
Color: Verde
```

**Qué significa:**
- **S/ 142.5k** = Monto total recaudado en el mes actual
- **92%** = Porcentaje recaudado vs lo proyectado (S/ 154.9k esperado)

**Cálculo:**
```
Recaudación esperada = Suma de todas las rentas del mes
Recaudado = Pagos efectivamente recibidos
% Recaudación = (Recaudado / Esperado) × 100
```

**Para mejorar:**
- [ ] Desglose por método de pago (transferencia, efectivo, tarjeta)
- [ ] Gráfico de tendencia mensual
- [ ] Predicción de cierre de mes (ML)
- [ ] Exportar a Excel/PDF para contabilidad

---

#### 4.4 Tarjeta: **Unidades**
```
Valor: 150
Subtítulo: "Total org"
Color: Gris
```

**Qué significa:**
- Total de unidades (departamentos, locales, oficinas) gestionadas por la organización

**Estados posibles de una unidad:**
- **Ocupada** (tenant activo con contrato)
- **Disponible** (lista para arrendar)
- **Mantenimiento** (en reparación, no arrendable)
- **Reservada** (aplicación en proceso)

**Para mejorar:**
- [ ] Breakdown por estado (50 ocupadas, 5 disponibles, etc.)
- [ ] Click para ir a detalle de unidades
- [ ] Filtros por tipo (studio, 1BR, 2BR)

---

#### 4.5 Actividad Reciente
**Propósito:** Feed de eventos importantes del sistema.

**Elementos mostrados:**
- Nombre del lead/inquilino
- Acción (ej: "Interesado en 101-A")
- Etapa del pipeline (Visita, Aplicación, etc.)

**Para mejorar:**
- [ ] Más tipos de eventos (contrato firmado, pago recibido, ticket cerrado)
- [ ] Paginación / infinite scroll
- [ ] Filtrar por tipo de evento
- [ ] Notificaciones en tiempo real (WebSockets)

---

#### 5. **Análisis / KPIs** (`#/app/analytics`)
**Propósito:** Módulo estratégico de Business Intelligence para gerentes/owners.

### 5.1 Gráfico: Ocupación Histórica

**Tipo:** Gráfico de barras interactivo

**Datos mostrados:**
```
Mayo:  88%
Junio: 90%
Julio: 91%
Ago:   89%
Set:   93%
Oct:   94%  ← Valor actual
```

**Interpretación:**
- **Tendencia ascendente** (+6.8% vs Mayo) = buena salud operativa
- **Caída en Agosto** podría ser estacional (verano/vacaciones)
- **Objetivo:** mantener > 93%

**Interactividad:**
- Hover sobre barra muestra % exacto
- Animación de barras al cargar

**Para mejorar:**
- [ ] Selector de rango de fechas
- [ ] Comparación año vs año (YoY)
- [ ] Desglose por propiedad
- [ ] Predicción de próximos 3 meses (ML)
- [ ] Exportar gráfico como imagen

---

### 5.2 Widget: Tenant Health Score

**Tipo:** Gráfico circular (gauge/donut chart)

**Valor actual: 8.4/10**

**Qué mide:**
Métrica compuesta que combina:
1. **NPS (Net Promoter Score)** - Satisfacción del inquilino
2. **Puntualidad de pago** - % de pagos a tiempo
3. **Antigüedad** - Tenants con > 1 año son más estables
4. **Tickets de soporte** - Menos tickets = menos problemas

**Fórmula simplificada:**
```javascript
TenantHealthScore = 
  (NPS_Normalizado * 0.3) +
  (PuntualidadPago * 0.4) +
  (Antigüedad * 0.2) +
  (InversoTickets * 0.1)
```

**Desglose mostrado:**
- **Promotores: 72%** (inquilinos felices, NPS 9-10)

**Por qué es importante:**
- Tenants felices = renovaciones
- Renovaciones = menor vacancy cost
- Menor vacancy = mejor NOI (Net Operating Income)

**Para mejorar:**
- [ ] Mostrar también % de Pasivos y Detractores
- [ ] Alertas de tenants con score < 5 (riesgo de churn)
- [ ] Acciones sugeridas (ej: "Enviar encuesta de satisfacción")
- [ ] Histórico del score

---

### 5.3 Tarjeta: Eficiencia de Mantenimiento

**Métrica principal: TTR (Time To Repair)**
```
Valor actual: 3.2 días
Tendencia: ↓ 0.9 días menos que septiembre
```

**Qué mide:**
- Tiempo promedio desde que se abre un ticket hasta que se cierra
- **3.2 días** es excelente (benchmark: 5-7 días)

**Desglose:**
- **Alta prioridad:** 98% resueltos en < 24h
  - Ejemplos: fugas de agua, problemas eléctricos, cerraduras
  
**Por qué es importante:**
- Mantenimiento rápido = tenant satisfaction alta
- Previene escalamiento de problemas pequeños
- Reduce costos (problema detectado temprano)

**Para mejorar:**
- [ ] Desglose por tipo de ticket (plomería, eléctrico, etc.)
- [ ] Lista de tickets abiertos actualmente
- [ ] Asignación automática a proveedores
- [ ] Tracking de costos de mantenimiento

---

### 5.4 Tarjeta: Churn Rate (Rotación)

**Valor: 1.8% mensual**

**Qué significa:**
- **Churn Rate** = % de tenants que NO renuevan contrato y se van
- **1.8%** = de 100 inquilinos, 1.8 se van cada mes
- Anualizado: ~21.6% (aceptable, ideal < 20%)

**Contexto:**
- ↑ 0.2% incremento estacional (esperado en ciertas épocas)
- **Renovaciones: 84% OK** (de contratos próximos a vencer, 84% ya renovaron)

**Por qué es importante:**
- Vacancy cost promedio = 2-3 meses de renta
- Incluye: make-ready, marketing, tenant screening, días vacíos

**Benchmark industria:**
- < 15% anual = Excelente
- 15-25% anual = Normal
- > 30% anual = Problemático

**Para mejorar:**
- [ ] Predicción de churn por tenant (ML)
- [ ] Programa de retención (incentivos por renovación anticipada)
- [ ] Exit interviews automáticas
- [ ] Análisis de motivos de salida

---

### 5.5 Tarjeta: Leasing Pipeline Velocity

**Métrica: Conversion Rate (Visita → Firma)**
```
Valor: 12.4%
```

**Qué mide:**
De 100 personas que hacen un tour/visita:
- 12.4 firman contrato
- 87.6 no convierten (se van a competencia, no califican, etc.)

**Métrica secundaria:**
- **CAC (Customer Acquisition Cost):** S/ 420.00
  - Costo de marketing + comisión + tiempo para adquirir 1 tenant

**Funnel típico multifamily:**
```
100 Leads web
 ↓ 40% agenda visita
40 Visitas agendadas
 ↓ 75% asiste
30 Tours realizados
 ↓ 50% aplica
15 Aplicaciones
 ↓ 80% aprueba
12 Aprobados
 ↓ ~100% firma
12 Contratos firmados

Conversión final: 12%
```

**Para mejorar:**
- [ ] Visualización del funnel completo
- [ ] Identificar dónde se pierden más leads
- [ ] A/B testing de precios
- [ ] Scripts de venta para equipo comercial
- [ ] CRM completo con seguimiento automatizado

---

#### 6. **Leads / CRM** (`#/app/leasing`)
**Estado actual:** Placeholder (stub)

**Propósito en versión completa:**
Gestión de pipeline de ventas (leasing pipeline) con tablero Kanban.

**Etapas del pipeline:**
1. **Nuevo** - Lead recién llegó (web, referido, walk-in)
2. **Contactado** - Primer contacto realizado
3. **Visita Agendada** - Tour programado
4. **Visita Realizada** - Tour completado
5. **Aplicación** - Llenó formulario + documentos
6. **Verificación** - Background check, credit check
7. **Aprobado** - Pasó verificación
8. **Firma** - Contrato firmado ✅

**Datos por lead:**
```javascript
{
  id: 101,
  name: "Juan Pérez",
  email: "juan@mail.com",
  phone: "987 654 321",
  stage: "Visita",              // Etapa actual
  unit: "101-A",                 // Unidad de interés
  date: "2023-10-25",           // Fecha de ingreso
  source: "Facebook Ads",        // Canal de adquisición
  budget: 2500,                  // Presupuesto mensual
  moveInDate: "2024-01-01"      // Cuándo quiere mudarse
}
```

**Features a implementar:**
- [ ] Drag & drop entre etapas
- [ ] Asignación a comercial específico
- [ ] Notas y actividad timeline
- [ ] Recordatorios automáticos
- [ ] SMS/WhatsApp automatizado
- [ ] Scoring de leads (hot/warm/cold)
- [ ] Integración con Zoho/Salesforce

---

#### 7. **Propiedades** (`#/app/properties`)
**Estado actual:** Vista de cuadrícula simple

**Propósito:** Gestión de edificios/complejos.

**Datos actuales por propiedad:**
```javascript
{
  id: 1,
  name: "Torre Miraflores",
  address: "Av. Larco 123",
  district: "Miraflores",
  unitsCount: 50,
  img: "https://..."
}
```

**Para versión completa agregar:**
```javascript
{
  // Datos financieros
  totalRevenue: 125000,          // Renta mensual total
  expenses: 35000,               // Gastos operativos
  noi: 90000,                    // Net Operating Income
  
  // Datos operativos
  occupancyRate: 0.94,
  avgRent: 2500,
  yearBuilt: 2018,
  
  // Amenities
  amenities: ["Gym", "Pool", "Security 24/7", "Parking"],
  
  // Legal
  propertyManager: "Rosa Melendez",
  sunatRegistration: "12345678901",
  insurancePolicy: "POL-2024-001"
}
```

**Features a implementar:**
- [ ] Vista de mapa (integración Google Maps)
- [ ] Galería de fotos profesionales
- [ ] Documentos adjuntos (escrituras, certificados)
- [ ] Historial de valor (apreciación)
- [ ] Gastos comunes breakdown
- [ ] P&L (Profit & Loss) por propiedad

---

#### 8. **Unidades** (`#/app/units`)
**Estado actual:** Tabla simple

**Propósito:** Inventario de unidades arrendables.

**Datos actuales:**
```javascript
{
  id: 1,
  code: "101-A",                // Número único
  type: "2B/2B",                // 2 bedrooms, 2 bathrooms
  status: "Ocupada",
  rent: 2500,
  property: "Torre Miraflores"
}
```

**Estados posibles:**
- **Ocupada** (tenant activo) → Verde
- **Disponible** (lista para arrendar) → Azul
- **Mantenimiento** (make-ready) → Amarillo
- **Reservada** (aplicación en proceso) → Morado

**Para versión completa agregar:**
```javascript
{
  // Detalles físicos
  sqMeters: 85,
  floor: 10,
  hasBalcony: true,
  view: "Mar",
  furnished: false,
  
  // Detalles financieros
  marketRent: 2600,             // Precio de mercado
  actualRent: 2500,             // Precio actual
  securityDeposit: 2500,        // Depósito (1 mes típicamente)
  
  // Estado
  lastRenovation: "2023-05-15",
  condition: "Excelente",
  
  // Media
  photos: ["url1", "url2", ...],
  floorPlan: "url",
  
  // Tenant actual (si ocupada)
  currentTenant: {
    name: "Roberto Gomez",
    leaseStart: "2023-01-01",
    leaseEnd: "2024-01-01"
  }
}
```

**Features a implementar:**
- [ ] Filtros avanzados (tipo, precio, piso, disponibilidad)
- [ ] Vista de calendario de disponibilidad
- [ ] Pricing dinámico (ajustar renta según demanda)
- [ ] Comparables de mercado
- [ ] Portal público para que prospectos vean disponibles
- [ ] Tours virtuales 360°

---

#### 9. **Contratos** (`#/app/leases`)
**Estado actual:** Placeholder

**Propósito:** Gestión de contratos de arrendamiento.

**Datos por contrato:**
```javascript
{
  id: 501,
  tenant: {
    name: "Roberto Gomez",
    dni: "12345678",
    email: "roberto@mail.com",
    phone: "987123456"
  },
  unit: "101-A",
  startDate: "2023-01-01",
  endDate: "2024-01-01",
  rentAmount: 2500,
  paymentDay: 5,                // Día de mes para pago
  status: "Activo",
  
  // Términos
  securityDeposit: 2500,
  lateFeePercentage: 5,         // % de recargo por mora
  gracePeriod: 3,               // Días de gracia
  
  // Documentos
  contractPDF: "url",
  signatureDate: "2022-12-28",
  witnesses: ["Juan Lopez", "Maria Garcia"]
}
```

**Estados de contrato:**
- **Por Firmar** - Generado pero no firmado
- **Activo** - En vigencia
- **Próximo a Vencer** - Quedan < 60 días
- **Vencido** - Pasó fecha fin
- **Cancelado** - Terminación anticipada

**Features a implementar:**
- [ ] Generación automática de PDF
- [ ] Firma digital (integración Docusign/HelloSign)
- [ ] Alertas de vencimiento
- [ ] Proceso de renovación automatizado
- [ ] Addendums (modificaciones al contrato)
- [ ] Terminación anticipada (early termination)
- [ ] Integración con SUNAT para facturación

---

#### 10. **Cobranza** (`#/app/billing`)
**Estado actual:** Placeholder para facturación electrónica

**Propósito:** Gestión de pagos y facturación SUNAT.

**Funcionalidades requeridas para Perú:**

##### a) Facturación Electrónica
- [ ] Integración SUNAT (OSE - Operador de Servicios Electrónicos)
- [ ] Generación de comprobantes (Boleta, Factura)
- [ ] XML firmado digitalmente
- [ ] CDR (Constancia de Recepción)
- [ ] Anulaciones y notas de crédito

##### b) Métodos de pago
```javascript
paymentMethods: [
  "Transferencia bancaria (BCP, Interbank, BBVA)",
  "Pago en agente (Kasnet, Western Union)",
  "Tarjeta de crédito/débito (Niubiz, Culqi)",
  "Yape / Plin",
  "Efectivo (caja oficina)"
]
```

##### c) Dashboard de cobranza
```javascript
{
  // Este mes
  collected: 142500,
  pending: 12400,
  overdue: 4800,
  
  // Por estado
  onTime: 87,                   // Inquilinos que pagaron a tiempo
  late1_7: 8,                   // Atrasados 1-7 días
  late8_30: 3,                  // Atrasados 8-30 días
  delinquent: 2,                // Mora > 30 días
  
  // Forecast
  expectedThisWeek: 15000,
  expectedThisMonth: 154900
}
```

##### d) Recordatorios automatizados
```javascript
reminderSchedule: [
  { day: -3, type: "email", message: "Tu renta vence en 3 días" },
  { day: 0, type: "email+sms", message: "Tu renta vence HOY" },
  { day: 3, type: "email+sms+call", message: "Tu pago está atrasado" },
  { day: 7, type: "email+sms", message: "Último aviso antes de recargo" },
  { day: 15, type: "formal_letter", message: "Carta notarial" }
]
```

**Features a implementar:**
- [ ] Portal de pago para inquilinos (self-service)
- [ ] Pasarela de pagos (Niubiz/Culqi/PayU)
- [ ] Recibos automáticos por email
- [ ] Reportes para contabilidad
- [ ] Conciliación bancaria automática
- [ ] Planes de pago para morosos

---

#### 11. **Comunidad** (`#/app/community`)
**Estado actual:** Lista simple de tickets

**Propósito:** Gestión de tickets de soporte y comunicación con residents.

**Datos actuales:**
```javascript
{
  id: 1,
  title: "Fuga de agua baño",
  priority: "Alta",
  status: "Abierto",
  resident: "Roberto Gomez",
  date: "2023-11-01"
}
```

**Para versión completa:**
```javascript
{
  // Básico
  id: 1,
  title: "Fuga de agua baño",
  description: "El inodoro pierde agua constantemente...",
  
  // Clasificación
  category: "Plomería",          // Plomería, Eléctrico, Pintura, etc.
  priority: "Alta",              // Alta, Media, Baja
  status: "En Progreso",         // Abierto, Asignado, En Progreso, Cerrado
  
  // Participantes
  reporter: {
    name: "Roberto Gomez",
    unit: "101-A",
    phone: "987123456"
  },
  assignedTo: {
    name: "Mario Plomero SAC",
    type: "Proveedor",
    phone: "991234567"
  },
  
  // Timeline
  createdAt: "2023-11-01 08:30",
  firstResponse: "2023-11-01 09:15",
  resolvedAt: "2023-11-01 14:20",
  
  // Tracking
  sla: {
    responseTime: 45,            // Minutos hasta primera respuesta
    resolutionTime: 350,         // Minutos hasta resolución
    target: 1440,                // SLA objetivo: 24 horas
    met: true
  },
  
  // Financiero
  estimatedCost: 150,
  actualCost: 180,
  approvedBy: "Rosa Melendez",
  
  // Media
  photos: ["antes.jpg", "despues.jpg"],
  
  // Satisfacción
  rating: 5,                     // 1-5 estrellas
  feedback: "Muy rápido y profesional"
}
```

**Tipos de tickets:**
1. **Mantenimiento** (reparaciones)
2. **Limpieza** (áreas comunes)
3. **Seguridad** (reportes de incidentes)
4. **Amenities** (problemas en gym, piscina, etc.)
5. **Administrativo** (consultas, solicitudes)

**Features a implementar:**
- [ ] Portal self-service para residents (mobile-first)
- [ ] Chat en vivo
- [ ] Sistema de votaciones (para mejoras en edificio)
- [ ] Anuncios/noticias del edificio
- [ ] Reserva de amenities (sala de reuniones, etc.)
- [ ] Directorio de residents
- [ ] Marketplace interno (compra/venta entre vecinos)

---

#### 12. **Inspecciones** (`#/app/inspections`)
**Estado actual:** Placeholder

**Propósito:** Check-in y check-out digital de unidades.

**Casos de uso:**

##### a) Move-In Inspection (Check-in)
Cuando tenant nuevo entra:
1. Inspector (o tenant) hace walkthrough de unidad
2. Documenta estado de:
   - Paredes (rayones, manchas, huecos)
   - Pisos (desgaste, manchas)
   - Electrodomésticos (funcionando, fotos de serial numbers)
   - Puertas/ventanas (funcionamiento)
   - Baños (grifería, cerámica)
   - Cocina (cocina, campana, lavadero)
3. Tenant firma conformidad
4. Se guarda como baseline

**Por qué es importante:**
- Protege al landlord de reclamos falsos
- Protege al tenant de perder depósito injustamente
- Documentación legal en caso de disputa

##### b) Move-Out Inspection (Check-out)
Cuando tenant se va:
1. Se compara estado actual vs move-in
2. Se identifican daños causados por tenant
3. Se calcula costo de reparación
4. Se descuenta del security deposit

**Datos de inspección:**
```javascript
{
  id: 1,
  type: "Move-In",
  unit: "101-A",
  date: "2023-01-01",
  inspector: "Kevin Torres",
  tenant: "Roberto Gomez",
  
  // Checklist
  rooms: [
    {
      name: "Sala",
      items: [
        {
          item: "Pared norte",
          condition: "Bueno",
          notes: "Pequeño rayón en esquina inferior",
          photos: ["img1.jpg"]
        },
        {
          item: "Piso laminado",
          condition: "Excelente",
          notes: "",
          photos: ["img2.jpg"]
        }
      ]
    },
    {
      name: "Baño principal",
      items: [
        {
          item: "Inodoro",
          condition: "Bueno",
          notes: "Funcionando correctamente",
          photos: ["img3.jpg"]
        }
      ]
    }
  ],
  
  // Firmas digitales
  signatures: {
    tenant: { name: "Roberto Gomez", timestamp: "2023-01-01 14:30" },
    inspector: { name: "Kevin Torres", timestamp: "2023-01-01 14:32" }
  },
  
  // PDF generado
  reportPDF: "url"
}
```

**Features a implementar:**
- [ ] App móvil para inspecciones (iOS/Android)
- [ ] Plantillas customizables por tipo de unidad
- [ ] Comparación lado a lado (move-in vs move-out)
- [ ] Integración con contabilidad (descuento automático de depósito)
- [ ] ML para estimar costo de reparación por foto

---

#### 13. **Configuración** (`#/app/settings`)
**Estado actual:** Placeholder

**Propósito:** Gestión de organización, usuarios y suscripción.

**Secciones necesarias:**

##### a) Organización
```javascript
{
  name: "Hommie Admin",
  ruc: "20123456789",
  address: "Av. Benavides 123, Miraflores",
  phone: "01-234-5678",
  email: "admin@hommie.pe",
  logo: "url"
}
```

##### b) Usuarios y Roles
```javascript
roles: [
  {
    name: "Owner",
    permissions: ["*"],          // Todo
    users: ["admin@state360.pe"]
  },
  {
    name: "Property Manager",
    permissions: [
      "view_all",
      "edit_properties",
      "edit_units",
      "view_reports",
      "manage_tickets"
    ],
    users: ["rosa@state360.pe"]
  },
  {
    name: "Leasing Agent",
    permissions: [
      "view_leads",
      "edit_leads",
      "view_units"
    ],
    users: ["kevin@state360.pe"]
  },
  {
    name: "Maintenance",
    permissions: [
      "view_tickets",
      "edit_tickets"
    ],
    users: []
  }
]
```

##### c) Suscripción y Billing
```javascript
subscription: {
  plan: "Premium",
  status: "Active",
  startDate: "2024-01-01",
  renewalDate: "2025-01-01",
  
  pricing: {
    baseFee: 199,                // USD/mes
    perUnitFee: 2,               // USD/unidad/mes
    totalUnits: 150,
    totalMonthly: 499            // 199 + (150 * 2)
  },
  
  seats: {
    included: 5,
    used: 3,
    additional: 0
  },
  
  features: [
    "Unlimited units",
    "Advanced analytics",
    "API access",
    "Priority support",
    "Custom branding"
  ]
}
```

##### d) Integraciones
```javascript
integrations: [
  {
    name: "QuickBooks",
    status: "Connected",
    lastSync: "2024-02-08 10:30"
  },
  {
    name: "WhatsApp Business",
    status: "Not Connected"
  },
  {
    name: "Google Calendar",
    status: "Connected"
  }
]
```

**Features a implementar:**
- [ ] Invite system (enviar invitaciones por email)
- [ ] Audit logs (quién hizo qué y cuándo)
- [ ] Custom fields (campos personalizados por org)
- [ ] Branding (logo, colores en portal de residents)
- [ ] Export data (compliance con GDPR)
- [ ] API tokens para integraciones custom

---

## 🚀 Roadmap y Mejoras

### Fase 1: MVP Actual ✅ (Completado)
- [x] Landing page
- [x] Login y autenticación básica
- [x] Multi-tenancy (org selector)
- [x] Dashboard con KPIs core
- [x] Módulo de Analytics avanzado
- [x] Navegación y routing
- [x] UI/UX moderna

### Fase 2: Beta Privada (2-3 meses)
**Objetivo:** Onboard 5 clientes piloto

**Features críticas:**
- [ ] Backend real (Node.js + PostgreSQL)
- [ ] Autenticación JWT
- [ ] CRUD completo de Leads
- [ ] CRUD completo de Unidades
- [ ] CRUD completo de Contratos
- [ ] Generación de PDFs (contratos)
- [ ] Portal básico para residents
- [ ] Facturación SUNAT (OSE)
- [ ] Integración pasarela de pagos (Niubiz)

**Mejoras técnicas:**
- [ ] Migrar de Vanilla JS a React/Vue
- [ ] State management (Redux/Pinia)
- [ ] Testing (Jest, Cypress)
- [ ] CI/CD pipeline
- [ ] Monitoring (Sentry, Datadog)

### Fase 3: Beta Pública (3-6 meses)
**Objetivo:** 50+ clientes, PMF (Product-Market Fit)

- [ ] App móvil (React Native)
- [ ] Firma digital integrada
- [ ] Inspecciones digitales
- [ ] Cobranza automatizada completa
- [ ] Reportería avanzada (exportar a Excel)
- [ ] API pública para integraciones
- [ ] Onboarding automatizado
- [ ] Live chat support
- [ ] Knowledge base (FAQs, tutoriales)

### Fase 4: Escala (6-12 meses)
**Objetivo:** 500+ clientes, expansión LATAM

- [ ] Multi-idioma (inglés, portugués)
- [ ] Multi-moneda
- [ ] Marketplace de proveedores (plomeros, pintores, etc.)
- [ ] ML para pricing dinámico
- [ ] Predicción de churn
- [ ] Smart matching (tenant ideal para unidad)
- [ ] Integración con Zillow/PROPIFY
- [ ] Expansión a otros países (Chile, Colombia, México)

---

## 💰 Modelo de Negocio SaaS

### Pricing Structure (propuesto)

#### Plan Starter
**$99/mes**
- Hasta 25 unidades
- 2 usuarios
- Features básicas (leads, contratos, cobranza)
- Support por email

#### Plan Professional (Target inicial)
**$299/mes**
- Hasta 100 unidades
- 5 usuarios
- Todo de Starter +
- Analytics avanzado
- Portal residents
- Integraciones básicas
- Support prioritario

#### Plan Enterprise
**Custom**
- Unidades ilimitadas
- Usuarios ilimitados
- Todo de Professional +
- API access
- Custom branding
- Dedicated success manager
- SLA garantizado
- On-premise option

### Unit Economics

**Por cliente promedio (50 unidades):**
```
MRR (Monthly Recurring Revenue): $299
CAC (Customer Acquisition Cost): $1,200
  - Marketing: $500
  - Sales: $400
  - Onboarding: $300

LTV (Lifetime Value): $10,764
  - Avg tenure: 36 meses
  - MRR: $299
  - LTV = 36 * $299 = $10,764

LTV/CAC Ratio: 8.97 ⭐ (excelente, > 3 es bueno)

Payback period: 4 meses
Churn rate target: < 5% anual
```

### Go-To-Market Strategy

**Target Customer Profile:**
1. **Administradoras de edificios** (20-200 unidades)
2. **Inmobiliarias con portfolio multifamily** (50-500 unidades)
3. **Inversionistas con múltiples propiedades** (5-50 unidades)

**Canales de adquisición:**
1. **LinkedIn Ads** (B2B targeting)
2. **Google Search** ("software gestión inmuebles perú")
3. **Partnerships** (con brokers, arquitectos)
4. **Content marketing** (blog sobre real estate)
5. **Referrals** (incentivos por referir)

**Sales Process:**
1. Lead web / demo request
2. Discovery call (15 min)
3. Product demo (30 min)
4. Trial gratuito (14 días)
5. Onboarding (asistido)
6. Upgrade a plan pagado

---

## 🔧 Consideraciones Técnicas para Producción

### 1. Backend/API
**Stack recomendado:**
- Node.js + Express (o NestJS)
- PostgreSQL (relacional para transacciones)
- Redis (cache, sessions)
- S3 (almacenamiento de archivos)

**Arquitectura:**
```
Frontend (React)
    ↓ HTTPS
API Gateway (Kong/AWS API Gateway)
    ↓
Microservicios (opcional, puede ser monolito inicialmente)
    ↓
PostgreSQL (master)
    ↓
PostgreSQL (read replicas)
```

### 2. Seguridad
- [ ] HTTPS obligatorio
- [ ] JWT con refresh tokens
- [ ] Rate limiting (prevenir abusos)
- [ ] SQL injection prevention (usar ORM)
- [ ] XSS protection
- [ ] CSRF tokens
- [ ] Encriptación de datos sensibles (DNI, cuentas bancarias)
- [ ] Compliance GDPR/CCPA (si se expande internacionalmente)
- [ ] Auditoría completa (logs de todas las acciones)

### 3. Performance
- [ ] CDN para assets estáticos (CloudFront)
- [ ] Lazy loading de imágenes
- [ ] Pagination en listados
- [ ] Query optimization (índices en BD)
- [ ] Caching agresivo (Redis)
- [ ] WebSockets para notificaciones real-time (Socket.io)

### 4. Escalabilidad
- [ ] Horizontal scaling (múltiples instancias de API)
- [ ] Database sharding (por organización)
- [ ] Queue system para tareas pesadas (Bull, RabbitMQ)
- [ ] Serverless functions para workflows (AWS Lambda)

### 5. Monitoring
- [ ] Uptime monitoring (Pingdom, UptimeRobot)
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring (New Relic, Datadog)
- [ ] Analytics (Mixpanel, Amplitude)
- [ ] User session replay (FullStory, LogRocket)

---

## 📊 Métricas de Éxito (KPIs del SaaS)

### Product Metrics
- **Activation Rate:** % usuarios que completan onboarding
- **WAU/MAU:** Weekly/Monthly Active Users
- **Feature adoption:** % que usa cada módulo
- **Time to value:** Días hasta que cliente ve ROI

### Business Metrics
- **MRR (Monthly Recurring Revenue):** Ingresos mensuales
- **ARR (Annual Recurring Revenue):** MRR × 12
- **Churn Rate:** % clientes que cancelan/mes
- **NPS (Net Promoter Score):** Satisfacción cliente
- **ARPU (Average Revenue Per User):** MRR / # clientes

### Financial Metrics
- **CAC:** Costo de adquirir cliente
- **LTV:** Valor de por vida del cliente
- **LTV/CAC:** Ratio (debe ser > 3)
- **Burn Rate:** Cuánto dinero se gasta/mes
- **Runway:** Meses antes de quedarse sin dinero

---

## 🎓 Aprendizajes Clave del MVP

### Lo que funcionó bien:
✅ UI moderna y limpia (feedback positivo)
✅ Módulo de KPIs diferenciador (competitors no lo tienen)
✅ Multi-tenancy desde día 1 (arquitectura correcta)
✅ Hash routing (deploy simple sin servidor)

### Lo que falta mejorar:
⚠️ Sin persistencia de datos (todo hardcoded)
⚠️ No hay backend (limitación mayor)
⚠️ Vanilla JS no escala (migrar a framework)
⚠️ No hay tests (QA manual)
⚠️ No hay mobile app (needed por residents)

### Riesgos del proyecto:
🚨 **Competencia:** Propiedades.com, Proppit (Perú) ya existen
🚨 **Regulatorio:** Facturación SUNAT es compleja
🚨 **Timing:** Mercado inmobiliario peruano es cíclico
🚨 **Churn:** Si cliente migra data a Excel, difícil volver

---

## 📚 Glosario de Términos Multifamily

| Término | Significado |
|---------|-------------|
| **Multifamily** | Propiedad con múltiples unidades habitacionales (edificio de deptos) |
| **Unit** | Departamento/local individual arrendable |
| **Tenant** | Inquilino/arrendatario |
| **Lease** | Contrato de arrendamiento |
| **Occupancy Rate** | % de unidades ocupadas |
| **Vacancy Rate** | % de unidades vacías (inverso de occupancy) |
| **NOI (Net Operating Income)** | Ingresos - gastos operativos |
| **CAP Rate** | NOI / Valor propiedad (métrica de retorno) |
| **Make-Ready** | Proceso de preparar unidad vacía para nuevo tenant |
| **Churn** | Tasa de tenants que no renuevan contrato |
| **Delinquency** | Morosidad/atraso en pagos |
| **Security Deposit** | Depósito de garantía (típicamente 1 mes de renta) |
| **Lease-Up** | Proceso de llenar edificio nuevo con tenants |
| **Amenities** | Facilidades compartidas (gym, pool, etc.) |
| **TTR (Time To Repair)** | Tiempo promedio de reparación de tickets |

---

## 🤝 Contribuciones y Feedback

Este MVP está en constante evolución. Si tienes feedback:

1. **Bugs:** Reportar en issues de GitHub
2. **Feature requests:** Abrir discussion
3. **Preguntas:** Contactar a luis@state360.pe

---

**Última actualización:** 8 de febrero de 2026
**Versión:** 1.0.0 (MVP)
**Autor:** State 360 Team
