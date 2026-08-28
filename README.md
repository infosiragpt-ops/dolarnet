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
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Qué incluye

- Portada con cotizador **Envías (soles) → Recibe** (Chile, Colombia, Ecuador, México, Perú)
- *Nosotros*, *Blog* y *Ayuda* con contenido real
- Registro en dos pasos (país de residencia primero) e inicio de sesión
- Panel: verificar cuenta, nueva transferencia, cuentas destino e historial
- Botón de WhatsApp (el mismo número publicado en el sitio actual)

La autenticación y los envíos son **estado local de demostración** (este navegador). No hay pagos reales ni un proveedor de KYC.

Cuenta de demo: `ana.demo@dolarnett.com` / `demo1234`

## Tarifas

El cotizador usa **tipos de cambio y comisión de ejemplo**, etiquetados en la interfaz. Reutilizan las cifras del calculador de WordPress para que el flujo se pueda probar. **No son datos de mercado en vivo ni una oferta vinculante.**

## Lo que no afirmamos

No inventamos autorización de la SBS, licencias, testimonios, recuentos de clientes ni reseñas. Si se habla de regulación, el texto es genérico y honesto.

## Stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS
- Estado de demo en `localStorage`
