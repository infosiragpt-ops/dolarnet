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

Copia `.env.example` a `.env.local` (nunca subas secretos):

```bash
AUTH_SECRET=            # npx auth secret
# NEXTAUTH_SECRET=      # alias aceptado

AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
# GOOGLE_CLIENT_ID=     # alias aceptado
# GOOGLE_CLIENT_SECRET=

AUTH_URL=http://localhost:3000
# NEXTAUTH_URL=http://localhost:3000
```

En Google Cloud Console registra estos callback URIs:

- `http://localhost:3000/api/auth/callback/google`
- `https://dolarnett.com/api/auth/callback/google` (cuando despliegues)

La sesión es JWT. El correo `carrerajorge874@gmail.com` queda con `role=admin`. Cualquier otra cuenta de Google entra como usuario.

Rutas protegidas (redirigen a `/login` si no hay sesión): `/dashboard`, `/transferencia`, `/cuentas-destinos`, `/historial`, `/verificar-cuenta`. Si ya hay sesión, `/login` y `/registro` van al panel.

## Qué incluye

- Portada con cotizador **Envías (soles) → Recibe** (Chile, Colombia, Ecuador, México, Perú)
- *Nosotros*, *Blog* y *Ayuda* con contenido real
- Registro (país de residencia primero) e inicio de sesión con Google
- Panel: verificar cuenta, nueva transferencia, cuentas destino e historial
- Botón de WhatsApp (el mismo número publicado en el sitio actual)

Las cotizaciones y el flujo de envío siguen siendo de producto/demo (no liquidan pagos reales ni hay proveedor de KYC). La **sesión** sí es Auth.js.

## Tarifas

El cotizador usa **tipos de cambio y comisión de ejemplo**, etiquetados en la interfaz. Reutilizan las cifras del calculador de WordPress para que el flujo se pueda probar. **No son datos de mercado en vivo ni una oferta vinculante.**

## Lo que no afirmamos

No inventamos autorización de la SBS, licencias, testimonios, recuentos de clientes ni reseñas. Si se habla de regulación, el texto es genérico y honesto.

## Stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS
- Auth.js (NextAuth v5) + Google
- Datos de envío/cuentas del panel en `localStorage` por correo
