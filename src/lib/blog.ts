export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingMinutes: number;
  body: string[];
};

export const POSTS: BlogPost[] = [
  {
    slug: "como-leer-una-cotizacion",
    title: "Cómo leer una cotización: tipo de cambio, comisión y total",
    excerpt:
      "Tres cifras distintas aparecen en cada envío. Esta guía explica qué paga el remitente y qué llega a destino, y por qué el tipo de cambio es de referencia de mercado.",
    date: "2026-08-18",
    readingMinutes: 5,
    body: [
      "Una cotización de envío no es un solo número. En Dolarnett mostramos el tipo de cambio de referencia, la comisión (si hay) y el monto total que tendrías que transferir a nuestras cuentas.",
      "El tipo de cambio convierte soles peruanos a la moneda del corredor: CLP, COP, MXN o USD (Ecuador y Perú). Lo tomamos en vivo de ExchangeRate-API y lo etiquetamos como referencia de mercado, no como el monto exacto que un banco acreditará.",
      "La comisión es configurable (por defecto 0). El monto total es lo que enviarías a Dolarnett: el monto cotizado más esa comisión. El destinatario recibe el monto cotizado convertido.",
      "Antes de mover dinero, confirma la cotización vigente, el banco destino y el titular de la cuenta.",
    ],
  },
  {
    slug: "corredores-andinos-y-mexico",
    title: "Corredores que cubrimos: Ecuador, Chile, Colombia, México y Perú",
    excerpt:
      "Dolarnett está pensado para envíos entre estos cinco países. Aquí resumimos monedas, bancos frecuentes y lo que debes tener a mano.",
    date: "2026-08-10",
    readingMinutes: 6,
    body: [
      "Dolarnett nace en Perú y opera corredores hacia Ecuador, Chile, Colombia, México y el propio Perú. Recibes CLP en Chile, COP en Colombia, MXN en México y USD en Ecuador y Perú.",
      "El flujo es el mismo en todos los corredores. Primero cotizas en soles. Luego eliges o cargas una cuenta destino — banco, titular y número. Después transfieres el total a una cuenta de Dolarnett y esperas la acreditación en el país de destino.",
      "Los bancos que mostramos en la portada (BCP, BBVA, Banco de la Nación, Banco Pichincha, Scotiabank e Interbank) son los que el producto actual menciona como opciones frecuentes. No son una lista cerrada ni una alianza publicitada; en el panel puedes registrar otro banco si lo necesitas.",
      "No inventamos plazos de entrega universales. El tiempo depende de que la transferencia a Dolarnett se acredite y de los horarios del banco destino. Si tienes una operación en curso, el canal más directo hoy es WhatsApp.",
    ],
  },
  {
    slug: "que-preparar-antes-de-enviar",
    title: "Qué preparar antes de enviar: cuenta, titular y verificación",
    excerpt:
      "Nombre exacto del beneficiario, tipo de cuenta y un celular al que podamos escribirte. Una lista corta para no frenar el envío a mitad de camino.",
    date: "2026-07-28",
    readingMinutes: 4,
    body: [
      "La causa más común de un envío detenido no es el tipo de cambio: es un dato de cuenta que no coincide. Antes de cotizar, ten a la vista el nombre del titular tal como figura en el banco, el tipo de cuenta (ahorros o corriente) y el número o CCI.",
      "En esta versión puedes guardar varias cuentas destino y reutilizarlas. El historial y el dashboard usan esos registros para que el flujo de transferencia se sienta como un producto, no como un formulario suelto.",
      "La verificación de cuenta pide celular, un código de demostración y un documento (DNI o carné de extranjería). No hay un proveedor de KYC detrás: es la interfaz para seguir construyendo el cumplimiento real más adelante, sin fingir una autorización ni un sello regulatorio.",
      "Si ya tienes cuenta en el WordPress actual, este código todavía no la migra. El sitio en dolarnett.com sigue en WordPress hasta que despleguemos esta aplicación.",
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((post) => post.slug === slug);
}
