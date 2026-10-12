# DiarIA - Inteligencia diaria para tu vida

Blog con IA que reúne artículos, clima, noticias, cotizaciones y productos recomendados en una sola página.  
*Instalable como PWA.*

---

## 🚀 Incluye

- **Artículos** desde Google Sheets
- **Clima** en tiempo real
- **Cotizaciones** (Dólar / Euro)
- **Noticias** en carrusel
- **Enlaces de afiliado** Amazon
- **Buscador** y paginación
- **PWA** (manifest + service worker + soporte offline)

---

## 🌐 Tecnologías

- **Frontend:** HTML, CSS, JavaScript (Vanilla)
- **CMS / Base de Datos:** Google Sheets, Firebase
- **APIs:** `wttr.in`, `bluelytics`, `newsdata.io`, `ipapi.co`
- **Hosting / Deployment:** Cloudflare Pages

---

## 💻 Desarrollo Local

1. Instala Wrangler globalmente:
   ```bash
   npm install -g wrangler
   ```
2. Inicia el servidor de desarrollo local:
   ```bash
   npx wrangler pages dev .
   ```
3. Abre en tu navegador: [http://localhost:8788](http://localhost:8788)

---

## 🔑 Variables de Entorno

Crea un archivo `.dev.vars` en la raíz del proyecto:

```env
SHEET_CSV_URL=...
FIREBASE_URL=...
NEWSDATA_API_KEY=...
```

> **En Producción:** Configura estas variables en **Cloudflare → Settings → Environment variables**.

---

## 📦 Despliegue (Deploy)

1. Conecta tu repositorio a **Cloudflare Pages**.
2. Deja la configuración **sin comando de Build**.
3. Agrega las variables de entorno.
4. Ejecuta el **Deploy**.

---

## ⚠️ Aviso Legal

> Como afiliado de Amazon, puedo ganar comisiones por compras que cumplan los requisitos aplicables.

---

## 📄 Licencia

Uso personal y educativo.  
*Los contenidos de terceros pertenecen a sus respectivas fuentes.*