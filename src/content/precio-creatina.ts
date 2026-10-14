// Guía de precio (transaccional): `/precio-creatina-argentina`.
//
// Ancla de la pieza: el **precio por gramo / por servicio** de FECA. La tabla
// se calcula desde `src/lib/products.ts` (fuente única): no se hardcodean
// precios acá. Ver `docs/plan-seo-pseo-agentes.md` (§11, ítem 14).
import type { Article } from "@/content/creatina/types";
import { products } from "@/lib/products";
import { formatARS } from "@/lib/format";

const pricePerKg = (price: number, grams: number) =>
  Math.round(price / (grams / 1000));

const pricePerServing = (price: number, servings: number) =>
  Math.round(price / servings);

/** Fila de la tabla de precios, derivada de la fuente única de productos. */
const priceRows = products.map((product) => [
  product.size,
  formatARS(product.price),
  formatARS(pricePerKg(product.price, product.grams)),
  formatARS(pricePerServing(product.price, product.servings)),
]);

export const priceGuidePath = "/precio-creatina-argentina";

export const priceGuide: Article = {
  slug: "precio-creatina-argentina",
  title: "Precio de la creatina en Argentina",
  metaTitle: "Precio de la creatina en Argentina",
  description:
    "Cuánto cuesta la creatina en Argentina y cómo comparar bien: precio por gramo y por servicio, qué encarece el producto y cómo verificarlo antes de comprar.",
  intro:
    "El precio de la creatina en Argentina depende de la presentación y, sobre todo, de cuánto pagás por gramo. El número del envase engaña: para comparar bien hay que mirar el precio por gramo (o por servicio) y si el producto trae una pureza verificable con certificado de análisis por lote.",
  updated: "2026-10-15",
  readingMinutes: 4,
  intent: "precio / comparación de costo",
  related: [],
  blocks: [
    { type: "h2", text: "Cómo comparar precios sin equivocarte" },
    {
      type: "p",
      text: "Dos envases pueden costar parecido y rendir muy distinto. La forma correcta de comparar no es por envase, sino por gramo o por servicio. Dividí el precio por los gramos del envase (o por la cantidad de porciones de 5 g) y compará ese número: es el único que permite enfrentar formatos de distinto tamaño.",
    },
    {
      type: "callout",
      tone: "info",
      title: "Regla rápida",
      text: "Precio ÷ gramos = precio por gramo. Si además dividís por 5 g, obtenés el precio por servicio: cuánto te cuesta cada día de creatina.",
    },
    { type: "h2", text: "Precio por gramo de FECA" },
    {
      type: "p",
      text: "Estos son los precios de lista de nuestras presentaciones, con su equivalente por kilogramo y por servicio (a 5 g por día). Los formatos más grandes bajan el precio por gramo.",
    },
    {
      type: "table",
      caption:
        "Precios de lista de FECA en pesos argentinos (ARS). Por servicio calculado a 5 g por día.",
      head: ["Presentación", "Precio", "Por kilo", "Por servicio (5 g)"],
      rows: priceRows,
    },
    {
      type: "p",
      text: "Por eso, si tomás todos los días, el envase de 1 kg suele ser el más conveniente: mismo producto, menor costo por gramo. El de 300 g es el más práctico para probar o para consumos esporádicos.",
    },
    { type: "h2", text: "Qué hace que una creatina cueste más (o menos)" },
    {
      type: "ul",
      items: [
        "Pureza y su verificación: cuanto más alta y mejor documentada, más cuesta producirla.",
        "Certificado de análisis público por lote: agrega control de calidad real, no marketing.",
        "Forma y granulometría: el monohidrato 200 mesh se disuelve mejor y es más caro de moler.",
        "Aditivos: saborizantes, colorantes y rellenos abaratan la fórmula, pero no la mejoran.",
        "Origen de la materia prima y envasado: cambian el costo de importación y fraccionado.",
      ],
    },
    { type: "h2", text: "Señales de una creatina demasiado barata" },
    {
      type: "p",
      text: "Un precio muy por debajo del promedio no es una ganga automática. Antes de comprar, revisá que:",
    },
    {
      type: "ul",
      items: [
        "La etiqueta informe la pureza (por ejemplo, ≥ 99,5 % por HPLC) y no solo “creatina”.",
        "El producto tenga número de lote y un certificado de análisis consultable.",
        "No sea un “blend” con otros ingredientes sin detallar cantidades.",
        "No prometa resultados exagerados (“resultados en días”, “sin entrenar”).",
      ],
    },
    { type: "h2", text: "Cómo verificar antes de comprar" },
    {
      type: "ol",
      items: [
        "Buscá la pureza y la forma (monohidrato) en la etiqueta o en el sitio de la marca.",
        "Consultá el certificado de análisis del lote que te ofrecen.",
        "Compará el precio por gramo entre presentaciones, no el precio del envase.",
        "Sumá el costo de envío: puede cambiar cuál conviene.",
      ],
    },
    {
      type: "p",
      text: "En FECA podés revisar las especificaciones completas en la ficha técnica y verificar el certificado del lote de tu envase en la sección Calidad, sin costo y sin registro.",
    },
    {
      type: "callout",
      tone: "info",
      title: "Sobre salud",
      text: "La creatina es un suplemento, no un medicamento. Si tenés una condición médica o tomás medicación, consultá a un profesional antes de suplementar.",
    },
  ],
  faqs: [
    {
      question: "¿Cuánto dura un envase de creatina?",
      answer:
        "A 5 g por día, un envase de 300 g rinde unos 60 servicios (casi dos meses), el de 500 g unos 100 (alrededor de tres meses) y el de 1 kg unos 200 (más de seis meses).",
    },
    {
      question: "¿Por qué la misma creatina tiene precios tan distintos?",
      answer:
        "Por la pureza y cómo se verifica, la forma (200 mesh o micronizada), los aditivos, el origen de la materia prima y el costo del envío. El envase más barato no siempre es el más conveniente por gramo.",
    },
    {
      question: "¿La creatina más cara es mejor?",
      answer:
        "No necesariamente. Lo importante es que sea monohidrato y que la pureza sea verificable con un certificado por lote. Pagar más no garantiza mejor efecto.",
    },
    {
      question: "¿Cuál es la presentación más conveniente?",
      answer:
        "Por precio por gramo, el envase de 1 kg es el más conveniente de la línea. El de 300 g es el más práctico para probar o para consumos esporádicos.",
    },
  ],
};
