// Render de datos estructurados (JSON-LD) en el HTML inicial.
//
// Se usa un `<script>` nativo (no `next/script`): JSON-LD es data, no código
// ejecutable. El escape de "<" evita inyección de HTML — recomendación oficial
// de Next.js (ver docs/app/guides/json-ld).
export type JsonLdData = Record<string, unknown>;

type JsonLdProps = {
  data: JsonLdData | JsonLdData[];
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        // Escapamos `<`, `>` y `&` para que ningún valor pueda cerrar el
        // `<script>` ni inyectar HTML (defensa en profundidad; los datos son
        // internos, pero la barandilla no cuesta nada).
        __html: JSON.stringify(data)
          .replace(/</g, "\\u003c")
          .replace(/>/g, "\\u003e")
          .replace(/&/g, "\\u0026"),
      }}
    />
  );
}

export default JsonLd;
