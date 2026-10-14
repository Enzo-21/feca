# Documentación de FECA

Esta carpeta reúne la documentación técnica del sitio. El objetivo es que
cualquier persona (o agente) pueda entender **cómo se generan los documentos
de marca** y **cómo se estructura la información de calidad** sin depender del
conocimiento de quien lo implementó.

## Índice

| Documento | Qué contiene |
| --- | --- |
| [`brand-pdf-system.md`](./brand-pdf-system.md) | Sistema de diseño compartido para **todos** los PDF de marca (colores, tipografías, logo, reglas de layout y de una página). Fuente de verdad de la identidad en documentos. Incluye el módulo de referencia `scripts/lib/brand-pdf.mjs`. |
| [`certificados-por-lote.md`](./certificados-por-lote.md) | **Operación** del pipeline de certificados: estructura de `data/lotes/`, formato del JSON del proveedor, flag `demo`, runbook paso a paso, comandos de verificación, reglas de armado (una página + merge) y limitaciones. |
| [`ficha-tecnica-pdf.md`](./ficha-tecnica-pdf.md) | Cómo se genera **hoy** la Ficha Técnica (PDF de una página) del producto: datos, script, toolchain, cómo regenerarla y cómo verificarla. Historial de la implementación. |
| [`plan-certificados-por-lote.md`](./plan-certificados-por-lote.md) | **Plan (historial)**: la arquitectura elegida —una carpeta por lote con el PDF de materia prima + JSON, generación automática del PDF de marca en el `prebuild`, e integración en la web—. Incluye fases, etapas, contrato de datos, riesgos y la investigación de build/Vercel. Estado: implementado. |

## Convenciones

- Los planes usan el prefijo `plan-*.md` (ver `AGENTS.md`).
- Todo se escribe en español (es-AR), salvo nombres de archivos/código.
- Los documentos de calidad muestran la información técnica **verbatim** (los
  nombres de parámetros quedan en inglés tal como vienen en la ficha de
  materia prima); solo el "chrome" del documento (títulos, encabezados,
  etiquetas, pie) está en español.

## Estado actual (resumen)

- La **Ficha Técnica** y el **CoA de marca por lote** se generan en build con el
  mismo toolkit (`@react-pdf/renderer`, JS puro → corre en Vercel). Los PDFs
  están **gitignored**; se recrean con `prebuild`/`predev` o con
  `npm run documentos`.
- Los lotes viven en `data/lotes/<LOT>/<LOT>.json` (fuente de verdad commiteada);
  si existe `<LOT>.pdf`, se mergea como página 2 del CoA. La web lee un índice
  generado (`src/lib/certificates.generated.ts`) — **no hay** lista hardcodeada.
- Los 12 lotes `FECA-2026-001..012` quedaron como **ejemplos** (`"demo": true`).
  El único lote real es `202604-013` (creatina monohidrato 200 mesh).
- Para operar el sistema, ver [`certificados-por-lote.md`](./certificados-por-lote.md);
  para el historial de la decisión, [`plan-certificados-por-lote.md`](./plan-certificados-por-lote.md).
