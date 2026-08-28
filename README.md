# Dolarnett

Aplicación web de **envíos internacionales de dinero** (Next.js).  
Dominio de producción: [https://dolarnett.com](https://dolarnett.com)

## Qué reemplaza

El sitio en vivo hoy es WordPress + Elementor y se ve incompleto (calculador a medias, *Nosotros* y *Ayuda* vacíos, blog con el post de bienvenida).

Este repositorio es el reemplazo en **código propio**: App Router, TypeScript y Tailwind. Recrea una estética de finanzas profesional (espacio limpio, tipografía editorial, confianza tipo tesorería) **sin instalar, copiar ni vender un tema comercial** — tampoco DoFi ni ningún tema nulled.

**El sitio público sigue en WordPress hasta que despleguemos esta app.** Publicar este código no cambia dolarnett.com por sí solo.

## Cómo correrlo

Necesitas Node.js 20 o superior.

```bash
cp .env.example .env.local
# Completa AUTH_SECRET y las credenciales de Google (ver abajo)
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

`npm run build` funciona aunque las variables de Google estén vacías: las páginas se generan y el botón de Google muestra un error claro. Sin credenciales no hay inicio de sesión real.

## Autenticación (Auth.js / NextAuth v5)

El acceso es **Google OAuth**. No hay usuario/contraseña local ni cuenta de demostración.

Copia `.env.example` a `.env.local` y rellena solo ahí (nunca subas secretos ni el Client Secret):

```
AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_URL=
```

Nombres que usa Auth.js (sin alias):

| Variable | Uso |
| --- | --- |
| `AUTH_SECRET` | Firma de sesión. Genera uno con `npx auth secret`. |
| `AUTH_GOOGLE_ID` | Client ID de Google (Web application). |
| `AUTH_GOOGLE_SECRET` | Client Secret. Solo en `.env.local` o el secret manager del host. |
| `AUTH_URL` | URL pública de la app. En local: `http://localhost:3000`. |

El cliente OAuth está en el proyecto de Google Cloud **SIRAGPT** (`gen-lang-client-0149080720`). Consentimiento: nombre de app **Dolarnett**, External / testing. Usuario de prueba: `carrerajorge874@gmail.com`.

Redirect y origen ya registrados para desarrollo:

- JavaScript origin: `http://localhost:3000`
- Redirect: `http://localhost:3000/api/auth/callback/google`

Al desplegar, agrega el origen y el callback de producción (`https://<host>/api/auth/callback/google`).

`npm run build` no requiere estas variables: Auth.js usa un placeholder interno solo para compilar. Sin `.env.local` completo no hay inicio de sesión real.

La sesión es JWT. El correo `carrerajorge874@gmail.com` queda con `role=admin`. Cualquier otra cuenta de Google entra como usuario.

Rutas protegidas (redirigen a `/login` si no hay sesión): `/dashboard`, `/transferencia`, `/cuentas-destinos`, `/historial`, `/verificar-cuenta`. Si ya hay sesión, `/login` y `/registro` van al panel.

## Qué incluye

- Portada con cotizador **Envías (soles) → Recibe** (Chile, Colombia, Ecuador, México, Perú)
- *Nosotros*, *Blog* y *Ayuda* con contenido real
- Registro (país de residencia primero) e inicio de sesión con Google
- Panel: verificar cuenta, nueva transferencia, cuentas destino e historial
- Botón de WhatsApp (el mismo número publicado en el sitio actual)

El cotizador usa **tipos de cambio en vivo** (referencia de mercado). Los envíos y la verificación se guardan por usuario; no hay liquidación bancaria automática ni un proveedor de KYC.

## Tipos de cambio

`GET /api/rates` pide `https://open.er-api.com/v6/latest/PEN` (ExchangeRate-API, sin clave). Si existe `EXCHANGE_RATE_API_KEY`, usa `https://v6.exchangerate-api.com/v6/${KEY}/latest/PEN`. La respuesta se cachea 12 minutos.

Corredores desde soles (PEN): Chile → CLP, Colombia → COP, México → MXN, Ecuador → USD, Perú → USD.

El cotizador muestra tipo de cambio, comisión (`COMMISSION_PEN`, por defecto 0), monto total y la hora de actualización del proveedor. Si el feed falla, se muestra error: **no se inventan cifras**. El tipo de cambio es de **referencia de mercado**, no una liquidación bancaria garantizada.

## Lo que no afirmamos

No inventamos autorización de la SBS, licencias, testimonios, recuentos de clientes ni reseñas. Si se habla de regulación, el texto es genérico y honesto.

## Stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS
- Auth.js (NextAuth v5) + Google
- Datos de envío/cuentas del panel en `localStorage` por correo
