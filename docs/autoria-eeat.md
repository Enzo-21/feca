# Autoría y E-E-A-T

Guía de estilo y proceso para la autoría, revisión y actualización del contenido
del hub **Aprender** (`/creatina/*`) y del resto de las páginas editoriales.

Complementa a `docs/seo-pseo-agentes.md` (posicionamiento y agentes) y a
`docs/plan-seo-pseo-agentes.md` (plan). El tema es **YMYL** (salud y
suplementación): Google aplica el estándar más estricto de E-E-A-T, así que la
honestidad de la autoría **no es opcional**.

## Regla cero: no inventar personas ni credenciales

Nunca se atribuye contenido a una persona, título, institución o credencial que
no exista. En particular, está **prohibido**:

- usar un nombre de fantasía con título profesional ("Dra. Gómez, nutricionista")
  para simular experiencia;
- inventar un `reviewedBy` (revisor profesional) que no haya revisado el texto;
- fabricar reseñas, calificaciones (`aggregateRating`), `awards`,
  `sameAs` a redes inexistentes, dirección física, CUIT o estudios;
- inventar una fecha de publicación o de revisión distinta a la real.

Mientras no haya una persona real que firme, el contenido se presenta como
**institucional**: autor y editor es **FECA** (la marca). Eso es honesto y ya se
refleja en el JSON-LD (ver más abajo).

## Roles

| Rol | Quién | Cómo se identifica |
| --- | --- | --- |
| Autor/editor | FECA (institucional) | `author`/`publisher` = `Organization: FECA` en el JSON-LD; no se muestra firma personal. |
| Revisor profesional | Persona real y calificada (p. ej. nutricionista o médico) | `Article.reviewedBy` + `reviewedBy` en el JSON-LD; se muestra "Revisado por …". |
| Fuente | Estudios y referencias citables | Se citan en el texto de forma prudente (sin sobreinterpretar). |

El revisor es **opcional**: si no existe, se omite por completo (ni se muestra ni
se declara). Es mejor no tener revisor que tener uno falso.

## Dónde vive esto en el código

- Tipo del artículo: `src/content/creatina/types.ts` → campos `published` y
  `reviewedBy` (ambos opcionales).
- JSON-LD: `src/lib/structured-data.ts` → `articleSchema()` emite
  `datePublished`, `dateModified` y `reviewedBy` **solo si están presentes**.
- Firma visible: `src/app/creatina/[slug]/page.tsx` → muestra "Publicado …" y
  "Revisado por …" **solo cuando esos campos existen**.

La firma visible y el `reviewedBy` del JSON-LD deben coincidir siempre (Google
exige que el marcado refleje contenido visible en la página).

## Cómo agregar un revisor real

1. Confirmá que la persona aceptó figurar como revisora y tiene la credencial que
   se le atribuye (no la infieras).
2. En el artículo (`src/content/creatina/articles.ts`) completá:
   ```ts
   published: "2026-04-13",
   reviewedBy: "Nombre Apellido, Nutricionista (MP 1234)", // credencial verificable
   updated: "2026-04-13",
   ```
3. Verificá que la firma aparece en la página y que el JSON-LD incluye
   `reviewedBy` (`npx playwright test e2e/seo.spec.ts`).
4. Actualizá `updated` a la fecha real de la revisión (no la muevas si no hubo
   cambios de fondo).

## Cómo agregar un autor real (opcional)

Por ahora la autoría es institucional (FECA). Si en el futuro hay autores con
nombre, el flujo es el mismo que para el revisor: dato real y verificable, y se
extiende `articleSchema()` para emitir `author: Person`. **No** se agrega hasta
tener la persona real.

## Claims: qué se puede y qué no

- Prohibido prometer efectos médicos: "cura", "trata", "previene", "revierte
  enfermedades". La creatina es un suplemento, no un medicamento.
- Usar lenguaje prudente: "la evidencia sugiere…", "puede ayudar a…", "en
  estudios con…".
- Derivar a un profesional en embarazo, lactancia, menores, personas con
  enfermedad renal/hepática o que toman medicación.
- No desaconsejar medicación ni indicar suspender tratamientos.
- Los disclaimers del sitio son el marco de seguridad; no los contradigas.

## Actualización y cadencia

- `updated` es la fecha real de la última revisión de fondo del texto. No se
  actualiza por cambios cosméticos.
- Revisar los artículos **al menos cada 6 meses** y ante noticias relevantes
  (nuevos consensos, cambios regulatorios).
- Al tocar un artículo, correr la verificación antes de commitear:
  `npm run lint && npx tsc --noEmit && npm run build && npm run test:e2e`.

## Checklist antes de publicar contenido

- [ ] No hay personas, credenciales, reseñas ni fechas inventadas.
- [ ] `author`/`publisher` = FECA (institucional) si no hay autor real.
- [ ] Si hay `reviewedBy`, es una persona real y la firma visible coincide con el
      JSON-LD.
- [ ] Sin claims médicos prohibidos (buscar `cur`, `trat`, `preven`).
- [ ] Hay disclaimer profesional donde corresponde (embarazo, medicación,
      adultos mayores, condiciones de salud).
- [ ] `updated` refleja la fecha real.
- [ ] Verificación completa en verde.

## Referencias

- Google Search Central — *Creating helpful, reliable, people-first content* y
  las *Search Quality Rater Guidelines* (concepto E-E-A-T, YMYL).
- `docs/seo-pseo-agentes.md` — reglas de metadatos, JSON-LD y agentes.
