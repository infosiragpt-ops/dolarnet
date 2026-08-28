export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQ: FaqItem[] = [
  {
    question: "¿A qué países puedo enviar?",
    answer:
      "Los corredores de esta versión son Chile, Colombia, Ecuador, México y Perú. Cotizas en soles peruanos y el destinatario recibe en la moneda local del país elegido.",
  },
  {
    question: "¿Los tipos de cambio del calculador son en vivo?",
    answer:
      "No. Están marcados como tarifas de ejemplo y replican las cifras del calculador actual en WordPress para que el flujo se pueda probar. No son una cotización de mercado ni una oferta vinculante.",
  },
  {
    question: "¿Cómo funciona un envío?",
    answer:
      "En tres pasos: cotizas el monto y el destino, transfieres el total a una cuenta de Dolarnett, y el dinero se acredita en la cuenta destino. En esta demo el último paso no mueve fondos reales.",
  },
  {
    question: "¿Cuánto tarda?",
    answer:
      "Depende de que tu transferencia a Dolarnett se acredite y de los horarios del banco destino. No publicamos un plazo fijo inventado. Si una operación está en curso, escríbenos por WhatsApp.",
  },
  {
    question: "¿Qué bancos puedo usar?",
    answer:
      "Puedes enviar desde y hacia bancos de uso frecuente en la región, entre ellos BCP, BBVA, Banco de la Nación, Banco Pichincha, Scotiabank e Interbank. En cuentas destino también puedes registrar otro banco.",
  },
  {
    question: "¿Cómo inicio sesión?",
    answer:
      "Con Google (Continuar con Google). El correo carrerajorge874@gmail.com entra como administrador. Otras cuentas de Google quedan como usuarios. No hay usuario y contraseña locales.",
  },
  {
    question: "¿Necesito verificar mi cuenta?",
    answer:
      "Sí, el flujo pide celular y datos de documento (DNI o C.E.). Esa verificación es solo de interfaz: no hay un proveedor de KYC ni se almacenan documentos en un servidor.",
  },
  {
    question: "¿Esta web ya reemplazó a dolarnett.com?",
    answer:
      "Todavía no. El sitio en producción sigue en WordPress/Elementor. Este repositorio es el reemplazo en código propio para seguir programándolo y, más adelante, desplegarlo.",
  },
  {
    question: "¿Dolarnett está autorizado por la SBS?",
    answer:
      "Este sitio no afirma una autorización, licencia ni registro específico. Cuando el producto de producción tenga el marco legal correspondiente, se documentará con precisión. Hasta entonces, no uses esta demo como prueba de cumplimiento.",
  },
  {
    question: "¿Cómo los contacto?",
    answer:
      "El canal público del sitio actual es WhatsApp. El botón verde de la esquina abre una conversación con el mismo número publicado en dolarnett.com.",
  },
];
