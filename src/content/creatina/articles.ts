import type { Article } from "@/content/creatina/types";

export const articles: Article[] = [
  {
    slug: "que-es",
    title: "¿Qué es la creatina y cómo funciona?",
    metaTitle: "Qué es la creatina",
    description:
      "Qué es la creatina, cómo la usa el cuerpo y por qué el monohidrato es la forma de referencia. Una guía clara, basada en evidencia y sin promesas de resultados.",
    intro:
      "La creatina es un compuesto que tu cuerpo produce y que también obtenés de alimentos como la carne y el pescado. Se almacena en el músculo como fosfocreatina y ayuda a regenerar energía en esfuerzos cortos e intensos. Suplementar satura esos depósitos y, según la evidencia, contribuye a la fuerza y la potencia.",
    updated: "2026-10-15",
    readingMinutes: 5,
    intent: "definición y mecanismo",
    blocks: [
      {
        type: "p",
        text: "La creatina es una molécula que tu organismo produce a partir de tres aminoácidos y que también incorporás a través de alimentos como la carne roja y el pescado. La mayor parte se guarda en el músculo, en una forma llamada fosfocreatina, lista para usarse.",
      },
      { type: "h2", text: "Cómo usa el cuerpo la creatina" },
      {
        type: "p",
        text: "Cuando hacés un esfuerzo breve e intenso —levantar una serie pesada, arrancar un sprint— tu músculo necesita energía muy rápido. La fosfocreatina ayuda a regenerar ATP, la moneda energética de la célula, para esos pocos segundos de máxima exigencia.",
      },
      {
        type: "p",
        text: "Los depósitos musculares de creatina son limitados y suelen estar parcialmente llenos. Al suplementar, esos depósitos se saturan y el músculo tiene más disponibilidad de fosfocreatina para los esfuerzos cortos e intensos.",
      },
      { type: "h2", text: "Qué dice la evidencia" },
      {
        type: "p",
        text: "La creatina es uno de los suplementos más estudiados del mundo. La forma monohidrato es la usada en la mayoría de los estudios y la postura oficial del International Society of Sports Nutrition (ISSN) la respalda. Los beneficios que mejor se sostienen son fuerza, potencia, rendimiento en esfuerzos cortos e intensos y apoyo a la recuperación.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Sin atajos ni promesas",
        text: "La creatina no reemplaza el entrenamiento ni la alimentación. Ayuda a rendir mejor en un tipo de esfuerzo concreto; no hace el trabajo por vos.",
      },
      {
        type: "p",
        text: "En Argentina la encontrás como suplemento en polvo. En FECA la materia prima es de origen chino, con pureza de referencia de ≥ 99,5 % y monohidrato de 200 mesh, y cada lote tiene un certificado de análisis verificable en la página Calidad del sitio.",
      },
      {
        type: "p",
        text: "Antes de suplementar, si tenés alguna condición médica o tomás medicación, consultá a un profesional de la salud.",
      },
    ],
    faqs: [
      {
        question: "¿La creatina es natural?",
        answer:
          "Sí. Tu cuerpo la produce y también la obtenés de alimentos como la carne y el pescado. El suplemento es la misma molécula en forma de polvo.",
      },
      {
        question: "¿La creatina es un esteroide?",
        answer:
          "No. Es un compuesto que participa del metabolismo energético del músculo y no tiene relación con los esteroides anabólicos.",
      },
      {
        question: "¿Funciona igual en todas las personas?",
        answer:
          "La respuesta varía. Quienes arrancan con depósitos más bajos de creatina suelen notar más la suplementación que quienes ya tienen niveles altos.",
      },
    ],
    related: ["cuanta-tomar", "beneficios", "creatina-monohidrato"],
  },
  {
    slug: "cuanta-tomar",
    title: "¿Cuánta creatina tomar por día?",
    metaTitle: "Cuánta creatina tomar por día",
    description:
      "Cuánta creatina tomar por día: la dosis de mantenimiento es de 3 a 5 g, cómo repartirla y cuándo conviene una fase de carga. Guía práctica y prudente.",
    intro:
      "La dosis de mantenimiento para la mayoría de las personas es de 3 a 5 gramos de creatina monohidrato por día, todos los días. Si querés saturar los depósitos más rápido, podés hacer una fase de carga de unos 20 g diarios durante 5 a 7 días, repartidos en 4 tomas.",
    updated: "2026-10-15",
    readingMinutes: 4,
    intent: "dosis diaria",
    blocks: [
      {
        type: "p",
        text: "La pregunta más común es cuánta creatina tomar. Para la mayoría de las personas sanas, la dosis de mantenimiento es de 3 a 5 gramos diarios de creatina monohidrato, sin necesidad de ciclos ni descargas.",
      },
      { type: "h2", text: "Dosis de mantenimiento: 3 a 5 g por día" },
      {
        type: "p",
        text: "Con 3 a 5 gramos por día alcanza para mantener los depósitos musculares saturados. Lo importante es la constancia: tomarla todos los días, entrenes o no, porque los depósitos bajan si dejás de tomarla.",
      },
      {
        type: "table",
        caption: "Dosis de mantenimiento orientativa según peso corporal",
        head: ["Peso corporal", "Dosis diaria orientativa"],
        rows: [
          ["Hasta 60 kg", "3 g"],
          ["60–80 kg", "3 a 5 g"],
          ["Más de 80 kg", "5 g"],
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "La dosis no tiene que ser exacta",
        text: "No pasa nada si un día tomás 4 g y otro 5 g. Lo que importa es sostener el hábito en el tiempo.",
      },
      { type: "h2", text: "Fase de carga (opcional)" },
      {
        type: "p",
        text: "Si querés saturar los depósitos más rápido, existe la opción de una fase de carga: alrededor de 20 g por día durante 5 a 7 días, repartidos en 4 tomas. No es obligatoria; con la dosis de mantenimiento llegás al mismo lugar, solo que más despacio.",
      },
      {
        type: "p",
        text: "Dosis altas de una sola vez pueden causar molestias digestivas, por eso conviene repartirlas o quedarse con la dosis de mantenimiento si te sienta mal.",
      },
      {
        type: "p",
        text: "Si tenés una enfermedad renal o alguna condición médica, consultá con un profesional antes de suplementar, porque la dosis adecuada puede ser distinta.",
      },
    ],
    faqs: [
      {
        question: "¿Puedo tomar más de 5 g por día?",
        answer:
          "Tomar más no aporta beneficios extra una vez que los depósitos están saturados. La dosis de mantenimiento de 3 a 5 g es suficiente para la mayoría.",
      },
      {
        question: "¿Cuánta creatina hay en una cucharada?",
        answer:
          "Depende de la cucharada. Lo más confiable es usar el dosificador que trae el envase y, si no lo tenés, una balanza de cocina.",
      },
      {
        question: "¿La dosis cambia si no entreno?",
        answer:
          "No. Los depósitos se mantienen tomando todos los días; si suspendés, vuelven a bajar con el tiempo.",
      },
    ],
    related: ["como-tomar", "fase-de-carga", "tomar-todos-los-dias"],
  },
  {
    slug: "como-tomar",
    title: "¿Cómo tomar creatina?",
    metaTitle: "Cómo tomar creatina",
    description:
      "Cómo tomar creatina monohidrato: con agua, en cualquier horario, todos los días. Qué hacer si te cae mal y qué mitos sobre el momento de la toma podés ignorar.",
    intro:
      "La creatina se toma por vía oral, disuelta en agua o en la bebida que prefieras, en cualquier momento del día. Lo importante no es el horario ni la bebida, sino tomarla todos los días y sostener 3 a 5 gramos diarios. Si te cae mal, dividí la toma.",
    updated: "2026-10-15",
    readingMinutes: 4,
    intent: "modo de uso",
    blocks: [
      {
        type: "p",
        text: "Tomar creatina es simple: se disuelve en agua o en tu bebida preferida y se toma por boca. No hay un horario mágico ni una bebida obligatoria; lo que sí importa es la constancia diaria.",
      },
      { type: "h2", text: "Cómo prepararla" },
      {
        type: "ol",
        items: [
          "Medí una porción de 3 a 5 g con el dosificador del envase.",
          "Disolvé el polvo en un vaso de agua o tu bebida preferida.",
          "Revolvé hasta que no queden grumos y tomá.",
        ],
      },
      {
        type: "p",
        text: "La creatina no se disuelve del todo y es normal que quede algo de polvo en el fondo. Eso no afecta su efecto. Las versiones micronizadas, de partículas más chicas, suelen facilitar la disolución.",
      },
      { type: "h2", text: "¿Importa el momento del día?" },
      {
        type: "p",
        text: "La evidencia no muestra una diferencia relevante entre tomarla antes o después de entrenar, con jugo o con agua. Elegí el momento que te resulte más fácil de recordar y cumplí con la dosis diaria.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Si te cae mal",
        text: "Dosis altas de una sola vez pueden dar molestias digestivas. Probá dividir la toma en dos veces al día o tomarla con comida.",
      },
      {
        type: "table",
        caption: "Servicios por presentación (a 5 g por día)",
        head: ["Presentación", "Servicios aproximados"],
        rows: [
          ["300 g", "60"],
          ["500 g", "100"],
          ["1 kg", "200"],
        ],
      },
      {
        type: "p",
        text: "¿Con qué no mezclarla? No hay una combinación peligrosa conocida con alimentos o bebidas comunes. Si tomás medicación o tenés una condición médica, consultá a un profesional.",
      },
    ],
    faqs: [
      {
        question: "¿Se puede tomar creatina en ayunas?",
        answer:
          "Sí. El horario y el estado del estómago no cambian de forma relevante el efecto. Si en ayunas te cae mal, tomala con comida.",
      },
      {
        question: "¿Se puede mezclar con café o con jugo?",
        answer:
          "Sí. Se puede mezclar con agua, jugo o café. Lo que importa es la dosis diaria, no la bebida.",
      },
      {
        question: "¿Puedo tomar creatina con la proteína?",
        answer:
          "Sí. Son suplementos distintos con funciones distintas y se pueden tomar juntos sin problema.",
      },
    ],
    related: ["cuanta-tomar", "creatina-micronizada", "tomar-todos-los-dias"],
  },
  {
    slug: "beneficios",
    title: "Beneficios de la creatina",
    metaTitle: "Beneficios de la creatina",
    description:
      "Beneficios de la creatina según la evidencia: fuerza, potencia, rendimiento en esfuerzos cortos e intensos y recuperación. Qué esperar y qué no prometer.",
    intro:
      "Según la evidencia disponible, la creatina ayuda a mejorar la fuerza, la potencia y el rendimiento en esfuerzos cortos e intensos, y contribuye a la recuperación. Es uno de los suplementos más estudiados del mundo. No es un medicamento: no cura ni previene enfermedades.",
    updated: "2026-10-15",
    readingMinutes: 5,
    intent: "beneficios y para qué sirve",
    blocks: [
      {
        type: "p",
        text: "La creatina es uno de los suplementos más estudiados. Sus beneficios mejor respaldados tienen que ver con el rendimiento físico en esfuerzos breves e intensos.",
      },
      { type: "h2", text: "Para qué se usa" },
      {
        type: "ul",
        items: [
          "Fuerza: ayuda a mover más peso en series cortas.",
          "Potencia: contribuye a esfuerzos explosivos, como saltos o sprints.",
          "Rendimiento en esfuerzos cortos e intensos: series pesadas e intervalos.",
          "Recuperación: puede apoyar la recuperación entre sesiones exigentes.",
        ],
      },
      { type: "h2", text: "Cómo actúa" },
      {
        type: "p",
        text: "El músculo usa fosfocreatina para regenerar energía muy rápido. Al saturar los depósitos con la suplementación, hay más disponibilidad de esa energía para los primeros segundos de esfuerzo intenso.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Sin promesas garantizadas",
        text: "Los resultados varían según la persona, el entrenamiento y la alimentación. La creatina ayuda, pero no hace el trabajo por vos ni garantiza un resultado.",
      },
      { type: "h2", text: "Qué no es" },
      {
        type: "p",
        text: "La creatina no es un medicamento y no sirve para curar, tratar ni prevenir enfermedades. Tampoco reemplaza una dieta adecuada ni el entrenamiento.",
      },
      {
        type: "p",
        text: "Si tenés una condición médica, consultá a un profesional antes de sumarla a tu rutina.",
      },
    ],
    faqs: [
      {
        question: "¿La creatina sirve para perder grasa?",
        answer:
          "No es un quemador de grasa. Puede aumentar el agua dentro del músculo, que no es grasa, y ayudar a rendir mejor en el entrenamiento.",
      },
      {
        question: "¿Cuánto tarda en hacer efecto?",
        answer:
          "Con la dosis de mantenimiento, los depósitos suelen saturarse en unas semanas. Con una fase de carga es más rápido, pero el punto de llegada es el mismo.",
      },
      {
        question: "¿Sirve si no entreno?",
        answer:
          "Sus beneficios principales son sobre el rendimiento físico. Sin entrenamiento, el efecto sobre fuerza y potencia pierde sentido.",
      },
    ],
    related: ["que-es", "cuanta-tomar", "creatina-vs-proteina"],
  },
  {
    slug: "efectos-secundarios",
    title: "Creatina y efectos secundarios",
    metaTitle: "Efectos secundarios de la creatina",
    description:
      "Efectos secundarios de la creatina: tolerancia en personas sanas, molestias digestivas, retención de agua intracelular y cuándo consultar a un profesional.",
    intro:
      "En personas sanas la creatina es bien tolerada. Las molestias más comunes son digestivas y aparecen sobre todo con dosis altas de una sola vez; dividir la toma suele resolverlo. Puede aumentar el agua dentro del músculo, algo que no es grasa. Ante enfermedad renal o embarazo, consultá a un profesional.",
    updated: "2026-10-15",
    readingMinutes: 5,
    intent: "seguridad y efectos adversos",
    blocks: [
      {
        type: "p",
        text: "La pregunta por los efectos secundarios es razonable. En personas sanas, la creatina monohidrato es uno de los suplementos mejor tolerados y uno de los más estudiados.",
      },
      { type: "h2", text: "Molestias digestivas" },
      {
        type: "p",
        text: "La molestia más reportada son la hinchazón o las ganas de ir al baño, sobre todo cuando se toman dosis altas de una sola vez, como en una fase de carga. Dividir la toma en varias veces al día o bajar a la dosis de mantenimiento suele resolverlo.",
      },
      { type: "h2", text: "Retención de agua: no es grasa" },
      {
        type: "p",
        text: "La creatina puede aumentar el agua dentro de la célula muscular. Eso puede reflejarse en unos kilos en la balanza al principio, pero es agua intracelular, no grasa. No significa que estés engordando.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Cuándo consultar",
        text: "Si tenés una enfermedad renal, tomás medicación o estás embarazada o amamantando, consultá a un profesional antes de suplementar. La seguridad en estos casos requiere una evaluación individual.",
      },
      { type: "h2", text: "Mitos frecuentes" },
      {
        type: "ul",
        items: [
          "\"Daña los riñones\": en personas sanas, la evidencia no respalda ese temor a las dosis habituales.",
          "\"Hay que ciclarla\": la evidencia no muestra que el monohidrato necesite ciclos ni que deje de funcionar.",
          "\"Es un esteroide\": no tiene ninguna relación con los esteroides anabólicos.",
        ],
      },
      {
        type: "p",
        text: "No es necesaria una descarga ni hacer ciclos. Mantener una dosis diaria de 3 a 5 g es lo habitual.",
      },
    ],
    faqs: [
      {
        question: "¿La creatina daña los riñones en personas sanas?",
        answer:
          "La evidencia disponible no muestra daño renal en personas sanas con las dosis habituales. Si tenés enfermedad renal, consultá antes de tomarla.",
      },
      {
        question: "¿La creatina engorda?",
        answer:
          "No aporta grasa. El aumento de peso inicial suele ser agua dentro del músculo, no grasa.",
      },
      {
        question: "¿Es necesario ciclar la creatina?",
        answer:
          "No. La evidencia no muestra que el monohidrato necesite ciclarse ni que deje de funcionar con el uso continuo.",
      },
    ],
    related: ["cuanta-tomar", "como-tomar", "tomar-todos-los-dias"],
  },
  {
    slug: "fase-de-carga",
    title: "¿Conviene hacer una fase de carga de creatina?",
    metaTitle: "Fase de carga de creatina",
    description:
      "Fase de carga de creatina: en qué consiste, si conviene hacerla y en qué se diferencia de la dosis de mantenimiento de 3 a 5 g por día. Guía práctica y clara.",
    intro:
      "La fase de carga es opcional. Consiste en unos 20 g de creatina por día durante 5 a 7 días, repartidos en 4 tomas, para saturar los depósitos más rápido. Si preferís no hacerla, con 3 a 5 g diarios llegás al mismo resultado, solo que en más semanas.",
    updated: "2026-10-15",
    readingMinutes: 5,
    intent: "protocolo de carga",
    blocks: [
      {
        type: "p",
        text: "La fase de carga acelera la saturación de los depósitos musculares de creatina. No es un requisito: es una forma de llegar antes al mismo punto.",
      },
      { type: "h2", text: "Qué es y cómo se hace" },
      {
        type: "p",
        text: "Consiste en tomar alrededor de 20 g por día durante 5 a 7 días, repartidos en 4 tomas de unos 5 g. Después se baja a la dosis de mantenimiento de 3 a 5 g diarios.",
      },
      { type: "h2", text: "¿Conviene hacerla?" },
      {
        type: "ul",
        items: [
          "A favor: los depósitos se saturan en pocos días en lugar de semanas.",
          "En contra: son más tomas por día y más probabilidad de molestias digestivas.",
          "Con la dosis de mantenimiento llegás al mismo punto, solo que más despacio.",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "No es obligatoria",
        text: "Si te genera molestias o te resulta incómodo tomar 4 veces por día, salteala. La dosis de mantenimiento sola alcanza.",
      },
      {
        type: "table",
        caption: "Carga vs. mantenimiento",
        head: ["", "Fase de carga", "Mantenimiento"],
        rows: [
          ["Dosis diaria", "~20 g", "3 a 5 g"],
          ["Reparto", "4 tomas", "1 o 2 tomas"],
          ["Duración", "5 a 7 días", "Continuo"],
          ["Obligatoria", "No", "Sí"],
        ],
      },
      {
        type: "p",
        text: "En cualquier caso, si tenés una condición médica, consultá a un profesional antes de arrancar.",
      },
    ],
    faqs: [
      {
        question: "¿Puedo saltear la fase de carga?",
        answer:
          "Sí. Con 3 a 5 g diarios llegás al mismo nivel de saturación, solo que en unas semanas en lugar de días.",
      },
      {
        question: "¿Qué pasa si me salteo una toma de la carga?",
        answer:
          "No es grave. Retomá normalmente; lo importante es la constancia a lo largo de los días.",
      },
      {
        question: "¿La carga sirve menos con el tiempo?",
        answer:
          "No. La evidencia no muestra que la respuesta a la creatina se agote con el uso continuo.",
      },
    ],
    related: ["cuanta-tomar", "como-tomar", "que-es"],
  },
  {
    slug: "creatina-monohidrato",
    title: "Creatina monohidrato: por qué es la forma de referencia",
    metaTitle: "Creatina monohidrato",
    description:
      "Por qué la creatina monohidrato es la forma de referencia: la más estudiada, respaldada por el ISSN y con purezas verificables, como las que informa FECA.",
    intro:
      "La creatina monohidrato es la forma de referencia porque es la más estudiada y la que respalda el International Society of Sports Nutrition (ISSN). Las demás formas no demostraron ser superiores. Si buscás creatina, el monohidrato es la opción con más evidencia y mejor relación entre calidad y precio.",
    updated: "2026-10-15",
    readingMinutes: 5,
    intent: "elección de forma",
    blocks: [
      {
        type: "p",
        text: "Existen varias formas de creatina en el mercado, pero el monohidrato es la que se usa en la mayoría de los estudios y la que respalda la postura oficial del International Society of Sports Nutrition (ISSN).",
      },
      { type: "h2", text: "Por qué es la de referencia" },
      {
        type: "ul",
        items: [
          "Es la forma con más evidencia científica acumulada.",
          "Es la que se estudió en la mayoría de las investigaciones sobre fuerza y potencia.",
          "Otras formas, como la HCL, no demostraron ser superiores.",
          "Suele tener una buena relación entre calidad y precio.",
        ],
      },
      { type: "h2", text: "Pureza y malla" },
      {
        type: "p",
        text: "En FECA la pureza de referencia es de ≥ 99,5 % de monohidrato. El lote real 202604-013 dio 99,80 % por HPLC. La malla es de 200 mesh, un tamaño de partícula estándar para esta forma.",
      },
      {
        type: "p",
        text: "La materia prima es de origen chino y cada lote tiene un certificado de análisis verificable en la página Calidad del sitio, así podés ver la pureza de tu lote concreto.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Forma vs. calidad de lote",
        text: "No alcanza con que sea monohidrato: importa la pureza del lote. Un monohidrato con buena pureza es preferible a una forma \"premium\" sin datos que la respalden.",
      },
      { type: "h2", text: "Cómo la reconozco en la etiqueta" },
      {
        type: "p",
        text: "Buscá que diga \"creatina monohidrato\" (a veces con el agregado \"monohidrato de creatina\") y que el envase informe la pureza o remita a un certificado de análisis del lote.",
      },
    ],
    faqs: [
      {
        question: "¿El monohidrato es mejor que otras formas?",
        answer:
          "La evidencia no muestra que otras formas sean superiores. El monohidrato es la referencia por su respaldo científico.",
      },
      {
        question: "¿Qué pureza conviene buscar?",
        answer:
          "Una pureza de referencia de ≥ 99,5 % es un buen piso. En FECA el lote real 202604-013 dio 99,80 % por HPLC.",
      },
      {
        question: "¿El monohidrato retiene líquido?",
        answer:
          "Puede aumentar el agua dentro del músculo, que no es grasa. Es parte de cómo actúa la creatina.",
      },
    ],
    related: ["que-es", "creatina-micronizada", "como-elegir-creatina"],
  },
  {
    slug: "creatina-micronizada",
    title: "Creatina micronizada: qué es y en qué se diferencia",
    metaTitle: "Creatina micronizada",
    description:
      "Qué es la creatina micronizada, en qué se diferencia del monohidrato común y si cambia su efecto. La micronización mejora la disolución, no la potencia.",
    intro:
      "La creatina micronizada es monohidrato con partículas más chicas. La micronización no cambia el efecto de la creatina, pero puede facilitar la disolución y la textura al mezclarla. Si te resulta más cómoda de tomar, es una opción válida; si no, el monohidrato común funciona igual.",
    updated: "2026-10-15",
    readingMinutes: 4,
    intent: "diferencia entre formas",
    blocks: [
      {
        type: "p",
        text: "La creatina micronizada es creatina monohidrato cuyas partículas se reducen de tamaño. El principio activo es el mismo; lo que cambia es la forma física del polvo.",
      },
      { type: "h2", text: "Qué cambia la micronización" },
      {
        type: "ul",
        items: [
          "Partículas más chicas.",
          "Suele disolverse más fácil en agua.",
          "Textura más fina al mezclar.",
        ],
      },
      { type: "h2", text: "Qué NO cambia" },
      {
        type: "p",
        text: "La micronización no cambia la dosis, el efecto ni la forma de la molécula. La evidencia no muestra que la creatina micronizada sea más potente que el monohidrato común.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Forma física, no superioridad",
        text: "Que se disuelva mejor no significa que funcione mejor. Si el monohidrato común no te molesta, no hay necesidad de cambiar.",
      },
      {
        type: "p",
        text: "La disolución es sobre todo una cuestión de comodidad. La creatina no se disuelve del todo en agua y siempre puede quedar algo de polvo en el fondo, micronizada o no.",
      },
      {
        type: "table",
        caption: "Monohidrato vs. micronizada",
        head: ["", "Monohidrato", "Micronizada"],
        rows: [
          ["Principio activo", "Creatina monohidrato", "Creatina monohidrato"],
          ["Tamaño de partícula", "Estándar", "Más chico"],
          ["Disolución", "Buena", "Puede ser más fácil"],
          ["Efecto", "Referencia", "Igual al monohidrato"],
        ],
      },
      {
        type: "p",
        text: "Como siempre, si tenés una condición médica, consultá a un profesional antes de suplementar.",
      },
    ],
    faqs: [
      {
        question: "¿La micronizada es más potente?",
        answer:
          "No. La evidencia no muestra que funcione mejor que el monohidrato común. La diferencia está en la disolución.",
      },
      {
        question: "¿Vale la pena la micronizada?",
        answer:
          "Si notás una diferencia al mezclarla, sí. Si no, el monohidrato común es igual de efectivo.",
      },
      {
        question: "¿Puedo tomar micronizada igual que la común?",
        answer:
          "Sí. La dosis y la forma de uso son las mismas: 3 a 5 g por día.",
      },
    ],
    related: ["creatina-monohidrato", "como-tomar", "como-elegir-creatina"],
  },
  {
    slug: "creatina-vs-proteina",
    title: "Creatina vs. proteína: qué son y cuándo tomar cada una",
    metaTitle: "Creatina vs proteína",
    description:
      "Creatina vs. proteína: qué aporta cada una, por qué no se reemplazan y cómo combinarlas según tu objetivo. Una guía práctica para decidir qué tomar y cuándo.",
    intro:
      "No compiten: la proteína aporta aminoácidos para reparar y construir músculo, y la creatina aporta energía para esfuerzos cortos e intensos. Se pueden tomar juntas sin problema. Si tu dieta ya cubre la proteína, la creatina igual puede sumar para el rendimiento.",
    updated: "2026-10-15",
    readingMinutes: 5,
    intent: "comparación",
    blocks: [
      {
        type: "p",
        text: "Creatina y proteína suelen compararse, pero cumplen funciones distintas. No son alternativas: se complementan.",
      },
      { type: "h2", text: "Qué aporta la proteína" },
      {
        type: "p",
        text: "La proteína aporta aminoácidos, los bloques con los que el cuerpo repara y construye tejido muscular. Se obtiene sobre todo de la alimentación: carne, huevos, lácteos, legumbres. Un suplemento de proteína ayuda a llegar al total diario cuando la dieta no alcanza.",
      },
      { type: "h2", text: "Qué aporta la creatina" },
      {
        type: "p",
        text: "La creatina no aporta aminoácidos para construir músculo. Su función es energética: ayuda a regenerar energía en esfuerzos cortos e intensos saturando la fosfocreatina muscular.",
      },
      {
        type: "table",
        caption: "Dos suplementos, dos funciones",
        head: ["", "Proteína", "Creatina"],
        rows: [
          ["Aporta", "Aminoácidos", "Energía para esfuerzos intensos"],
          ["Función principal", "Reparar y construir músculo", "Rendimiento y recuperación"],
          ["Dosis diaria", "Según tu dieta", "3 a 5 g"],
          ["¿Se reemplazan?", "No", "No"],
        ],
      },
      { type: "h2", text: "¿Se pueden tomar juntas?" },
      {
        type: "p",
        text: "Sí, no hay problema en combinarlas, incluso en la misma bebida. No compiten ni se anulan.",
      },
      {
        type: "p",
        text: "Cuál priorizar depende de tu objetivo y de tu dieta. Si tu alimentación ya cubre la proteína, la creatina suele ser el agregado con más impacto directo en el rendimiento.",
      },
      {
        type: "p",
        text: "Si tenés una condición médica o seguís una dieta específica, consultá a un profesional.",
      },
    ],
    faqs: [
      {
        question: "¿La proteína reemplaza a la creatina?",
        answer:
          "No. Aportan cosas distintas: la proteína da aminoácidos para el músculo y la creatina, energía para esfuerzos intensos.",
      },
      {
        question: "¿Puedo tomarlas juntas?",
        answer: "Sí, se pueden mezclar sin problema. No compiten entre sí.",
      },
      {
        question: "¿Cuál tomo si solo puedo elegir una?",
        answer:
          "Depende de tu dieta y tu objetivo. Si ya comés suficiente proteína, la creatina suele aportar más al rendimiento.",
      },
    ],
    related: ["beneficios", "que-es", "como-tomar"],
  },
  {
    slug: "tomar-todos-los-dias",
    title: "¿Hay que tomar creatina todos los días?",
    metaTitle: "¿Tomar creatina todos los días?",
    description:
      "¿Hay que tomar creatina todos los días? Sí: el efecto depende de mantener los depósitos saturados, entrenes o no. Por qué no conviene saltear varios días.",
    intro:
      "Sí. La creatina se toma todos los días, entrenes o no. Su efecto depende de mantener los depósitos musculares saturados, y esos depósitos bajan cuando dejás de tomarla. Mejor 3 a 5 g diarios de forma constante que dosis grandes solo los días de entrenamiento.",
    updated: "2026-10-15",
    readingMinutes: 4,
    intent: "frecuencia de consumo",
    blocks: [
      {
        type: "p",
        text: "Sí, la creatina se toma todos los días. Es una de las dudas más frecuentes y la respuesta es simple: el efecto no depende de tomarla justo antes de entrenar, sino de mantener los depósitos musculares saturados.",
      },
      { type: "h2", text: "Por qué todos los días" },
      {
        type: "p",
        text: "La creatina se acumula en el músculo. Si la tomás de forma diaria, esos depósitos se mantienen llenos. Si la tomás solo los días de entrenamiento, los niveles bajan en los días intermedios y el sistema nunca termina de saturarse del todo.",
      },
      {
        type: "ul",
        items: [
          "Los depósitos musculares tardan en vaciarse, pero bajan si dejás de tomar.",
          "La constancia diaria es más importante que el horario de la toma.",
          "Tomarla solo cuando entrenás es más irregular y menos eficiente.",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "Entrenes o no",
        text: "No hace falta entrenar ese día para tomarla. Los depósitos se mantienen con la dosis diaria, incluso en los días de descanso.",
      },
      { type: "h2", text: "¿Y si me olvido un día?" },
      {
        type: "p",
        text: "No pasa nada. Retomá al día siguiente con la dosis habitual; no hace falta duplicarla para \"compensar\".",
      },
      {
        type: "p",
        text: "Si vas a suspenderla, tené en cuenta que los niveles musculares vuelven a bajar con el tiempo. No es peligroso, simplemente se pierde la saturación.",
      },
      {
        type: "p",
        text: "Si tenés una condición médica, consultá a un profesional antes de suplementar de forma continua.",
      },
    ],
    faqs: [
      {
        question: "¿Puedo tomarla solo los días que entreno?",
        answer:
          "No es lo ideal. El efecto depende de mantener los depósitos saturados, y eso se logra con una dosis diaria.",
      },
      {
        question: "¿Qué pasa si me olvido un día?",
        answer:
          "Nada grave. Retomá al día siguiente con la dosis habitual, sin duplicar.",
      },
      {
        question: "¿Tengo que tomarla para siempre?",
        answer:
          "Mientras quieras mantener el efecto, sí. Si la suspendés, los niveles vuelven a bajar con el tiempo.",
      },
    ],
    related: ["cuanta-tomar", "como-tomar", "efectos-secundarios"],
  },
  {
    slug: "como-elegir-creatina",
    title: "Cómo elegir una buena creatina",
    metaTitle: "Cómo elegir creatina",
    description:
      "Cómo elegir una buena creatina: monohidrato, pureza verificable del lote y certificado de análisis. Qué mirar en la etiqueta y qué señales conviene evitar.",
    intro:
      "Para elegir una buena creatina, priorizá el monohidrato, revisá la pureza del lote y pedí el certificado de análisis. La forma física importa menos que la calidad y la transparencia del proveedor. No te guíes solo por el nombre de la forma ni por la etiqueta más llamativa.",
    updated: "2026-10-15",
    readingMinutes: 5,
    intent: "criterios de compra",
    blocks: [
      {
        type: "p",
        text: "Elegir creatina puede ser confuso por la cantidad de formas y nombres. En la práctica, hay pocos criterios que realmente importan y conviene ordenarlos por prioridad.",
      },
      { type: "h2", text: "Qué mirar, en orden" },
      {
        type: "ol",
        items: [
          "Que sea creatina monohidrato, la forma de referencia.",
          "Que informe la pureza o remita a un certificado de análisis del lote.",
          "Que la marca publique datos verificables del lote, no solo promesas de etiqueta.",
          "Que traiga un dosificador para medir la dosis de forma práctica.",
        ],
      },
      { type: "h2", text: "Pureza: el dato que importa" },
      {
        type: "p",
        text: "La pureza es más informativa que el nombre comercial de la forma. En FECA la pureza de referencia es de ≥ 99,5 % de monohidrato, con malla de 200 mesh, y el lote real 202604-013 dio 99,80 % por HPLC.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Desconfiá de las promesas",
        text: "Las etiquetas con claims exagerados o formas \"premium\" sin datos que las respalden no son una garantía. La evidencia y los certificados valen más que el marketing.",
      },
      { type: "h2", text: "Origen y trazabilidad" },
      {
        type: "p",
        text: "En FECA la materia prima es de origen chino y cada lote tiene un certificado de análisis verificable en la página Calidad del sitio. Poder ver el lote concreto es una señal de transparencia.",
      },
      {
        type: "table",
        caption: "Presentaciones y servicios (a 5 g por día)",
        head: ["Presentación", "Servicios aproximados"],
        rows: [
          ["300 g", "60"],
          ["500 g", "100"],
          ["1 kg", "200"],
        ],
      },
      {
        type: "p",
        text: "Si tenés una condición médica, consultá a un profesional antes de suplementar, independientemente de la marca que elijas.",
      },
    ],
    faqs: [
      {
        question: "¿Qué forma de creatina conviene comprar?",
        answer:
          "En general, monohidrato. Es la forma con más evidencia y la que usan la mayoría de los estudios.",
      },
      {
        question: "¿Cómo sé si la pureza es buena?",
        answer:
          "Buscá que el envase informe la pureza o remita a un certificado de análisis del lote. Una referencia de ≥ 99,5 % es un buen piso.",
      },
      {
        question: "¿Importa la malla de la creatina?",
        answer:
          "Indica el tamaño de partícula. La de 200 mesh es un estándar habitual; influye en la disolución, no en el efecto.",
      },
    ],
    related: ["creatina-monohidrato", "creatina-micronizada", "creatina-vencida"],
  },
  {
    slug: "creatina-vencida",
    title: "¿La creatina vence?",
    metaTitle: "¿La creatina vence?",
    description:
      "¿La creatina vence? Sí, tiene fecha de vencimiento. Cómo guardarla para que dure, cómo notar que se deterioró y cuándo conviene reemplazarla. Guía práctica.",
    intro:
      "Sí, la creatina tiene una fecha de vencimiento, aunque suele mantenerse estable durante bastante tiempo si se guarda bien, seca y cerrada. Si está vencida hace mucho, cambió de color o huele raro, conviene no usarla. Ante la duda, reemplazala por una nueva.",
    updated: "2026-10-15",
    readingMinutes: 4,
    intent: "vencimiento y conservación",
    blocks: [
      {
        type: "p",
        text: "La creatina no es un producto eterno. Tiene fecha de vencimiento y, con el tiempo y una mala conservación, puede perder calidad.",
      },
      { type: "h2", text: "Cómo se deteriora" },
      {
        type: "ul",
        items: [
          "La humedad es el principal enemigo: puede formar grumos.",
          "El calor y la luz aceleran el deterioro.",
          "Con el tiempo puede perder algo de efectividad.",
        ],
      },
      {
        type: "p",
        text: "Una creatina bien guardada, seca y cerrada, suele mantenerse estable cerca de su fecha de vencimiento. No es un producto que se eche a perder de un día para el otro.",
      },
      { type: "h2", text: "Cómo guardarla" },
      {
        type: "ul",
        items: [
          "Mantené el envase bien cerrado.",
          "Guardala en un lugar fresco y seco, lejos de la luz.",
          "Usá el dosificador seco para que no entre humedad.",
        ],
      },
      { type: "h2", text: "Señales de que conviene reemplazarla" },
      {
        type: "p",
        text: "Si la creatina está muy pasada de fecha, cambió de color, huele raro o está apelmazada de forma notoria, lo más prudente es reemplazarla. En FECA cada lote tiene un certificado de análisis verificable, así podés identificar el tuyo.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Ante la duda, no la uses",
        text: "Ningún suplemento vale la pena si dudás de su estado. Si tenés dudas sobre una creatina vencida o mal conservada, lo más simple es comprar una nueva.",
      },
      {
        type: "p",
        text: "Guardá siempre el lote a mano: si tenés el certificado de análisis, podés verificar las condiciones de tu partida.",
      },
    ],
    faqs: [
      {
        question: "¿Puedo tomar creatina vencida?",
        answer:
          "Si está un poco pasada de fecha y se guardó bien, puede estar en condiciones. Si está muy vencida o se ve y huele mal, no la uses.",
      },
      {
        question: "¿Cómo sé si la creatina se echó a perder?",
        answer:
          "Grumos notorios, cambio de color u olor extraño son señales de que conviene reemplazarla.",
      },
      {
        question: "¿Cuánto dura la creatina?",
        answer:
          "Depende de la conservación. Guardada seca, cerrada y lejos del calor, suele mantenerse estable cerca de su fecha de vencimiento.",
      },
    ],
    related: ["como-elegir-creatina", "creatina-monohidrato"],
  },
  {
    slug: "creatina-para-mujeres",
    title: "¿La creatina es distinta para mujeres?",
    metaTitle: "Creatina para mujeres",
    description:
      "La creatina no es distinta para mujeres: misma dosis y seguridad. Los mitos sobre hinchazón y peso, y qué hacer durante el embarazo o la lactancia.",
    intro:
      "No, la creatina no actúa distinto en mujeres: la dosis y la seguridad son las mismas que en hombres. Los depósitos musculares y el mecanismo energético no cambian por sexo. Sí conviene derribar algunos mitos sobre hinchazón y peso, y durante el embarazo o la lactancia consultar a un profesional.",
    updated: "2026-10-15",
    readingMinutes: 5,
    intent: "mitos y seguridad en mujeres",
    blocks: [
      {
        type: "p",
        text: "La creatina es la misma molécula y el mismo mecanismo en mujeres y en hombres. No hay una versión distinta por sexo; lo que cambia es que circulan mitos sobre hinchazón y peso, y que en etapas como el embarazo conviene otra prudencia.",
      },
      { type: "h2", text: "Dosis y seguridad: iguales" },
      {
        type: "p",
        text: "La dosis de mantenimiento es la misma para todas las personas: 3 a 5 gramos de creatina monohidrato por día, todos los días. El mecanismo energético del músculo no distingue por sexo, así que no hace falta una dosis especial.",
      },
      {
        type: "table",
        caption: "Puntos clave en mujeres",
        head: ["Aspecto", "Qué sabemos"],
        rows: [
          ["Dosis diaria", "3 a 5 g, igual que en hombres"],
          ["Mecanismo", "El mismo: energía para esfuerzos intensos"],
          ["Tolerancia", "Buena en personas sanas"],
          ["Embarazo o lactancia", "Consultar a un profesional"],
        ],
      },
      { type: "h2", text: "Mitos sobre hinchazón y peso" },
      {
        type: "ul",
        items: [
          "El aumento de peso inicial suele ser agua dentro del músculo, no grasa.",
          "La creatina no es un esteroide ni tiene efecto masculinizante.",
          "No es exclusiva de hombres ni de quienes buscan músculo grande.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Embarazo y lactancia",
        text: "Si estás embarazada o amamantando, consultá a un profesional antes de suplementar. La seguridad en estas etapas requiere una evaluación individual y no conviene guiarse por recomendaciones generales.",
      },
      {
        type: "p",
        text: "Según la evidencia, los beneficios sobre fuerza y rendimiento no dependen del sexo. La respuesta individual varía, y quienes arrancan con depósitos más bajos suelen notar más la suplementación. En FECA la creatina es monohidrato de 200 mesh con pureza de referencia ≥ 99,5 % y certificado de análisis por lote.",
      },
    ],
    faqs: [
      {
        question: "¿La creatina funciona distinto en mujeres?",
        answer:
          "No. El mecanismo y la dosis son los mismos. La respuesta individual puede variar, pero no por el sexo.",
      },
      {
        question: "¿La creatina engorda a las mujeres?",
        answer:
          "No aporta grasa. Puede aumentar el agua dentro del músculo, que no es grasa y suele reflejarse en poco peso en la balanza.",
      },
      {
        question: "¿La creatina afecta las hormonas?",
        answer:
          "No. No es una hormona ni un esteroide; participa del metabolismo energético del músculo y no tiene relación con los esteroides anabólicos.",
      },
      {
        question: "¿Puedo tomarla si estoy embarazada?",
        answer:
          "Consultá primero con un profesional. En el embarazo y la lactancia la decisión requiere una evaluación individual.",
      },
    ],
    related: ["que-es", "efectos-secundarios", "creatina-engorda"],
  },
  {
    slug: "creatina-engorda",
    title: "¿La creatina engorda o retiene líquido?",
    metaTitle: "¿La creatina engorda?",
    description:
      "¿La creatina engorda? No. El aumento de peso inicial es agua dentro del músculo, no grasa. Qué esperar en la balanza y por qué no afecta la grasa corporal.",
    intro:
      "La creatina no engorda. Puede aumentar el agua dentro de la célula muscular, un efecto que puede reflejarse como uno o dos kilos en la balanza al principio, pero no es grasa. Ese peso es intracelular y no implica un aumento de la grasa corporal.",
    updated: "2026-10-15",
    readingMinutes: 5,
    intent: "mito / retención de líquido",
    blocks: [
      {
        type: "p",
        text: "La duda es razonable: al empezar con creatina, la balanza puede subir. Pero ese cambio no viene de la grasa, sino del agua que la creatina atrae hacia el interior de la célula muscular.",
      },
      { type: "h2", text: "Agua intracelular, no grasa" },
      {
        type: "p",
        text: "La creatina se acumula en el músculo y con ella entra agua. Ese líquido queda dentro de la célula muscular —agua intracelular— y no se distribuye como hinchazón general ni se convierte en grasa. Es parte de cómo actúa la creatina.",
      },
      {
        type: "table",
        caption: "Qué cambia y qué no",
        head: ["Aspecto", "Con creatina"],
        rows: [
          ["Grasa corporal", "No cambia"],
          ["Agua dentro del músculo", "Puede aumentar"],
          ["Peso en la balanza", "Puede subir al principio"],
          ["Fuerza y potencia", "Puede mejorar"],
        ],
      },
      { type: "h2", text: "Qué esperar en la balanza" },
      {
        type: "p",
        text: "El aumento suele ser de uno o dos kilos y aparece en las primeras semanas, cuando los depósitos se están llenando. Después tiende a estabilizarse: la creatina no hace subir el peso de forma indefinida.",
      },
      {
        type: "callout",
        tone: "info",
        title: "No es un aumento de grasa",
        text: "Si la balanza sube y la ropa te queda igual, es probable que sea agua intracelular. La creatina no aporta grasa de forma significativa.",
      },
      {
        type: "p",
        text: "Si dejás de tomar creatina, ese líquido intracelular vuelve a bajar con el tiempo. No es grasa acumulada. En FECA la pureza de referencia es ≥ 99,5 % y cada lote tiene certificado de análisis verificable en la sección Calidad.",
      },
      {
        type: "p",
        text: "Si te preocupa la retención de líquido por una condición médica, como problemas renales o cardíacos, consultá a un profesional antes de suplementar.",
      },
    ],
    faqs: [
      {
        question: "¿La creatina engorda?",
        answer:
          "No. Puede aumentar el agua dentro del músculo, que no es grasa ni implica un aumento de la grasa corporal.",
      },
      {
        question: "¿Cuántos kilos subo con creatina?",
        answer:
          "Puede ser uno o dos kilos al principio, por agua intracelular. Varía según la persona y suele estabilizarse.",
      },
      {
        question: "¿Esa retención se va?",
        answer:
          "Si dejás de tomar creatina, el agua intracelular vuelve a bajar con el tiempo. No es grasa acumulada.",
      },
      {
        question: "¿Retiene líquido en todo el cuerpo?",
        answer:
          "El agua que aumenta está principalmente dentro de la célula muscular, no como una hinchazón general.",
      },
    ],
    related: ["efectos-secundarios", "como-elegir-creatina", "creatina-para-mujeres"],
  },
  {
    slug: "creatina-y-cafeina",
    title: "¿Se puede mezclar creatina con café o cafeína?",
    metaTitle: "Creatina y cafeína",
    description:
      "¿Se puede mezclar creatina con café o cafeína? Sí. No hay una interacción relevante conocida y no se anulan entre sí. Qué dice la evidencia y cómo tomarlas.",
    intro:
      "Sí, se puede mezclar creatina con café o con cualquier bebida con cafeína. No hay una interacción relevante conocida entre ambas a las dosis habituales y no se anulan entre sí. Lo que importa sigue siendo la dosis diaria de 3 a 5 gramos.",
    updated: "2026-10-15",
    readingMinutes: 4,
    intent: "interacción con cafeína",
    blocks: [
      {
        type: "p",
        text: "Es una de las dudas más frecuentes: si el café interfiere con la creatina. La respuesta corta es que se pueden combinar sin problema; no hay una interacción relevante conocida a las dosis habituales.",
      },
      { type: "h2", text: "Se pueden tomar juntas" },
      {
        type: "p",
        text: "Podés disolver la creatina en café, en una bebida con cafeína o tomarlas por separado. La cafeína no degrada de forma relevante a la creatina y no la vuelve inútil. Elegí la forma que te resulte más práctica.",
      },
      {
        type: "table",
        caption: "Combinar creatina y cafeína",
        head: ["Forma", "¿Se puede?"],
        rows: [
          ["Creatina disuelta en café", "Sí"],
          ["Una antes y otra después", "Sí"],
          ["Juntas en un batido", "Sí"],
          ["Se anulan entre sí", "No"],
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "Hidratación",
        text: "La cafeína puede tener un efecto diurético leve. Si tomás bastante café y además entrenás, cubrí bien tu hidratación a lo largo del día.",
      },
      { type: "h2", text: "Qué dice la evidencia" },
      {
        type: "p",
        text: "Circuló la idea de que la cafeína contrarresta la creatina, a partir de estudios puntuales y con resultados poco consistentes. La postura del International Society of Sports Nutrition (ISSN) no plantea una interacción problemática entre ambas a las dosis habituales.",
      },
      {
        type: "p",
        text: "Podés tomarlas juntas, en el mismo momento del día, o separadas; no hay una diferencia relevante para el efecto. En FECA la creatina es monohidrato de 200 mesh con certificado de análisis por lote verificable.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Si tomás medicación",
        text: "Si tenés alguna condición cardíaca o tomás medicación, consultá a un profesional antes de combinar cafeína y creatina de forma habitual.",
      },
    ],
    faqs: [
      {
        question: "¿El café mata la creatina?",
        answer:
          "No. No hay evidencia de que la cafeína anule el efecto de la creatina a las dosis habituales.",
      },
      {
        question: "¿Puedo tomar creatina con café todos los días?",
        answer:
          "Sí, sin problema. Lo importante es sostener la dosis diaria de 3 a 5 g, no la bebida con la que la tomes.",
      },
      {
        question: "¿Conviene separarlas?",
        answer:
          "No es necesario. Podés tomarlas juntas o separadas; no hay una diferencia relevante.",
      },
      {
        question: "¿Y con bebidas energizantes?",
        answer:
          "Se pueden combinar, pero ojo con el total de cafeína y azúcares del día. La creatina no cambia por la bebida.",
      },
    ],
    related: ["como-tomar", "que-es", "tomar-todos-los-dias"],
  },
  {
    slug: "creatina-veganos",
    title: "¿La creatina es más importante si sos vegano o vegetariano?",
    metaTitle: "Creatina y veganismo",
    description:
      "En veganos y vegetarianos los depósitos de creatina suelen ser más bajos, por eso la suplementación puede notarse más. Dosis, fuentes y qué tener en cuenta.",
    intro:
      "En veganos y vegetarianos los depósitos musculares de creatina suelen ser más bajos, porque la dieta aporta menos de esta molécula. Por eso la suplementación puede notarse más en fuerza y rendimiento. La dosis es la misma: 3 a 5 gramos diarios de monohidrato.",
    updated: "2026-10-15",
    readingMinutes: 5,
    intent: "dietas vegetarianas y veganas",
    blocks: [
      {
        type: "p",
        text: "La creatina que el cuerpo usa llega en parte de la alimentación, sobre todo de la carne y el pescado. Por eso quienes siguen dietas vegetarianas o veganas suelen partir de depósitos musculares más bajos, y la suplementación puede notarse más.",
      },
      { type: "h2", text: "Por qué los depósitos son más bajos" },
      {
        type: "p",
        text: "La principal fuente dietaria de creatina son los alimentos de origen animal. En una dieta sin carne el aporte baja y los depósitos musculares tienden a ser más chicos. No es una deficiencia ni algo peligroso: es un punto de partida más bajo.",
      },
      { type: "h2", text: "Qué puede cambiar con la suplementación" },
      {
        type: "ul",
        items: [
          "Al partir de depósitos más bajos, la saturación puede representar un cambio mayor.",
          "Los efectos sobre fuerza y rendimiento pueden notarse más que en quien ya tiene depósitos altos.",
          "La dosis es la misma: 3 a 5 g diarios de monohidrato.",
        ],
      },
      {
        type: "table",
        caption: "Fuentes de creatina",
        head: ["Fuente", "Aporte"],
        rows: [
          ["Carne y pescado", "Fuente dietaria principal"],
          ["Vegetales y legumbres", "Aporte muy bajo"],
          ["Suplemento", "Aporta una dosis medible y diaria"],
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "El suplemento no es de origen animal",
        text: "La creatina monohidrato del suplemento se produce por síntesis, no se extrae de animales. En FECA la materia prima es de origen chino, con certificado de análisis verificable por lote en la sección Calidad.",
      },
      {
        type: "p",
        text: "Según la evidencia, la respuesta a la creatina es mayor en quienes tienen depósitos más bajos, algo frecuente en dietas vegetarianas y veganas. Además, la creatina monohidrato es apta para estas dietas porque su producción no depende de animales.",
      },
      {
        type: "p",
        text: "Si seguís una dieta específica o tenés una condición médica, consultá a un profesional antes de suplementar.",
      },
    ],
    faqs: [
      {
        question: "¿Los vegetarianos necesitan creatina?",
        answer:
          "No es una necesidad, pero como suelen partir de depósitos más bajos, la suplementación puede notarse más en fuerza y rendimiento.",
      },
      {
        question: "¿La creatina del suplemento es animal?",
        answer:
          "No. La creatina monohidrato se produce por síntesis; no se extrae de animales.",
      },
      {
        question: "¿Qué alimentos tienen creatina?",
        answer:
          "Sobre todo la carne y el pescado. Los vegetales y las legumbres aportan cantidades muy bajas.",
      },
      {
        question: "¿Sirve igual si soy vegano?",
        answer:
          "Sí, el mecanismo es el mismo. Puede que notes más el efecto por arrancar con depósitos más bajos.",
      },
    ],
    related: ["que-es", "beneficios", "como-elegir-creatina"],
  },
  {
    slug: "creatina-adultos-mayores",
    title: "Creatina en adultos mayores: fuerza y masa muscular",
    metaTitle: "Creatina en adultos mayores",
    description:
      "Creatina en adultos mayores: puede ayudar a la fuerza y la masa muscular según la evidencia. Dosis, qué esperar y cuándo consultar a un profesional.",
    intro:
      "Según la evidencia, la creatina puede ayudar a la fuerza y la masa muscular en adultos mayores, un aspecto relevante por la pérdida de músculo con la edad. La dosis de mantenimiento es la misma, pero conviene consultar a un profesional por las condiciones y la medicación de cada persona.",
    updated: "2026-10-15",
    readingMinutes: 5,
    intent: "adultos mayores y función muscular",
    blocks: [
      {
        type: "p",
        text: "Con la edad es normal perder masa y fuerza muscular. La creatina es uno de los suplementos que se estudian en ese contexto, porque su mecanismo está ligado a la energía del músculo y a la función física.",
      },
      { type: "h2", text: "Qué dice la evidencia" },
      {
        type: "p",
        text: "Según la evidencia disponible, la creatina puede ayudar a mejorar la fuerza y la masa muscular en adultos mayores, sobre todo cuando se combina con entrenamiento de fuerza. Se asocia con una mejor función física en quienes entrenan. No es un medicamento y no cura ni previene enfermedades.",
      },
      {
        type: "ul",
        items: [
          "Puede ayudar a la fuerza cuando se combina con entrenamiento de resistencia.",
          "Se asocia con mejoras en la masa muscular en adultos mayores que entrenan.",
          "Los resultados varían según la persona, el entrenamiento y la alimentación.",
        ],
      },
      {
        type: "table",
        caption: "Aspectos a tener en cuenta",
        head: ["Aspecto", "Consideración"],
        rows: [
          ["Dosis", "3 a 5 g diarios"],
          ["Lo más estudiado", "Junto con entrenamiento de fuerza"],
          ["Seguridad", "Debe evaluarse caso por caso"],
          ["Medicación o enfermedad", "Consultar a un profesional"],
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Consultá antes de empezar",
        text: "En adultos mayores es más común la enfermedad renal, la medicación o varias condiciones a la vez. Antes de suplementar, consultá con un profesional que evalúe tu caso.",
      },
      { type: "h2", text: "Qué esperar" },
      {
        type: "p",
        text: "La creatina no reemplaza el entrenamiento ni la alimentación: los beneficios mejor respaldados aparecen cuando acompaña a un trabajo de fuerza. Sin entrenamiento, el efecto sobre fuerza y masa muscular pierde sentido. En FECA la creatina es monohidrato de 200 mesh con pureza de referencia ≥ 99,5 %.",
      },
      {
        type: "p",
        text: "Si tenés una enfermedad renal, tomás medicación o tenés alguna condición médica, consultá a un profesional antes de sumarla a tu rutina.",
      },
    ],
    faqs: [
      {
        question: "¿La creatina sirve para adultos mayores?",
        answer:
          "Según la evidencia, puede ayudar a la fuerza y la masa muscular, sobre todo combinada con entrenamiento de fuerza.",
      },
      {
        question: "¿A partir de qué edad conviene?",
        answer:
          "No hay una edad fija. Lo relevante es la situación de cada persona y, ante enfermedad o medicación, la consulta con un profesional.",
      },
      {
        question: "¿Es segura en adultos mayores?",
        answer:
          "En personas sanas suele tolerarse bien, pero en adultos mayores conviene una evaluación individual por la medicación y las condiciones previas.",
      },
      {
        question: "¿Reemplaza al entrenamiento?",
        answer:
          "No. Los mejores resultados se ven cuando la creatina acompaña a un plan de fuerza, no cuando lo reemplaza.",
      },
    ],
    related: ["beneficios", "cuanta-tomar", "efectos-secundarios"],
  },
  {
    slug: "desarrollo-muscular",
    title: "Creatina y desarrollo muscular",
    metaTitle: "Creatina para el desarrollo muscular",
    description:
      "Qué dice la evidencia sobre la creatina y el desarrollo muscular: cómo acompaña al entrenamiento de fuerza, qué esperar y qué no promete.",
    intro:
      "La creatina no construye músculo por sí sola: acompaña al entrenamiento de fuerza, que es el estímulo que impulsa el desarrollo muscular. Según la evidencia, ayuda a rendir más en esfuerzos cortos e intensos, y con constancia ese mayor rendimiento puede traducirse en más fuerza y más masa muscular.",
    updated: "2026-10-16",
    readingMinutes: 5,
    intent: "desarrollo muscular e hipertrofia",
    blocks: [
      {
        type: "p",
        text: "El desarrollo muscular depende sobre todo del entrenamiento de fuerza, de una alimentación con suficiente proteína y de un buen descanso. La creatina no reemplaza nada de eso: actúa sobre la energía disponible para entrenar más y mejor.",
      },
      { type: "h2", text: "Cómo acompaña al desarrollo muscular" },
      {
        type: "p",
        text: "La creatina se almacena en el músculo como fosfocreatina y ayuda a regenerar energía en esfuerzos cortos e intensos. Al saturar esos depósitos, tenés más disponibilidad para completar series exigentes, lo que a su vez genera un estímulo mayor para el músculo.",
      },
      {
        type: "ul",
        items: [
          "Permite sostener más volumen o intensidad en el entrenamiento de fuerza.",
          "Ayuda a rendir en los primeros segundos de esfuerzos explosivos.",
          "Su efecto se expresa mejor con un plan de fuerza y una dieta adecuada.",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "No hace el trabajo por vos",
        text: "La creatina no genera músculo en reposo ni sin entrenamiento. Los resultados mejor respaldados aparecen cuando acompaña a un trabajo de fuerza constante.",
      },
      { type: "h2", text: "Qué dice la evidencia" },
      {
        type: "p",
        text: "La creatina es uno de los suplementos más estudiados del mundo. La evidencia respalda mejoras en fuerza y potencia y en el rendimiento en esfuerzos cortos e intensos. Ese mayor estímulo, sostenido en el tiempo, es lo que se asocia con el desarrollo de masa muscular. No es un medicamento ni un esteroide.",
      },
      {
        type: "table",
        caption: "Aspectos a tener en cuenta",
        head: ["Aspecto", "Consideración"],
        rows: [
          ["Dosis", "3 a 5 g diarios, todos los días"],
          ["Lo más importante", "Entrenamiento de fuerza constante"],
          ["Junto con", "Proteína y energía suficientes"],
          ["Forma recomendada", "Monohidrato, la más estudiada"],
        ],
      },
      { type: "h2", text: "Qué esperar" },
      {
        type: "p",
        text: "Las mejoras de fuerza suelen aparecer en semanas de entrenamiento constante; los cambios visibles de masa muscular toman más tiempo y dependen de cada persona. En FECA la creatina es monohidrato de 200 mesh con pureza de referencia ≥ 99,5 %, con certificado por lote.",
      },
      {
        type: "p",
        text: "Si tenés una condición médica o tomás medicación, consultá a un profesional antes de sumarla a tu rutina.",
      },
    ],
    faqs: [
      {
        question: "¿La creatina hace crecer el músculo sola?",
        answer:
          "No. El estímulo para el desarrollo muscular es el entrenamiento de fuerza. La creatina ayuda a rendir mejor, pero no genera músculo por sí sola.",
      },
      {
        question: "¿Cuánto tarda en notarse?",
        answer:
          "La fuerza suele mejorar en semanas de entrenamiento constante. Los cambios visibles de masa muscular toman más tiempo y varían según la persona.",
      },
      {
        question: "¿Sirve para aumentar masa muscular sin entrenar?",
        answer:
          "No. Sin entrenamiento, el efecto sobre fuerza y masa muscular pierde sentido. La creatina acompaña a la rutina, no la reemplaza.",
      },
      {
        question: "¿La creatina es un esteroide?",
        answer:
          "No. Participa del metabolismo energético del músculo y no tiene relación con los esteroides anabólicos.",
      },
    ],
    related: ["beneficios", "creatina-vs-proteina", "creatina-adultos-mayores"],
  },
  {
    slug: "fuerza-y-potencia",
    title: "Creatina para fuerza y potencia",
    metaTitle: "Creatina, fuerza y potencia",
    description:
      "Cómo la creatina ayuda a la fuerza y la potencia según la evidencia: el mecanismo, la dosis y qué esperar en esfuerzos cortos e intensos.",
    intro:
      "La fuerza y la potencia son dos de los efectos mejor respaldados de la creatina. Al saturar la fosfocreatina del músculo, mejora la energía disponible para esfuerzos cortos e intensos, como una serie pesada o un sprint. La dosis de mantenimiento es de 3 a 5 g diarios.",
    updated: "2026-10-16",
    readingMinutes: 5,
    intent: "fuerza, potencia y esfuerzos intensos",
    blocks: [
      {
        type: "p",
        text: "Fuerza y potencia se apoyan en la energía que tu músculo puede liberar muy rápido. La creatina, en forma de fosfocreatina, participa justo en esa vía: regenerar energía para los primeros segundos de un esfuerzo máximo.",
      },
      { type: "h2", text: "Qué significan fuerza y potencia" },
      {
        type: "ul",
        items: [
          "Fuerza: la capacidad de mover una carga, como una serie pesada.",
          "Potencia: la capacidad de aplicar esa fuerza rápido, como un salto o un sprint.",
          "Ambas dependen de esfuerzos breves, intensos y de alta demanda energética.",
        ],
      },
      { type: "h2", text: "Cómo ayuda la creatina" },
      {
        type: "p",
        text: "Los depósitos musculares de creatina suelen estar parcialmente llenos. Al suplementar se saturan, y el músculo tiene más disponibilidad de fosfocreatina para los esfuerzos cortos e intensos. Por eso la evidencia respalda mejoras en fuerza y potencia.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Sin promesas garantizadas",
        text: "La respuesta varía según la persona, el entrenamiento y la alimentación. La creatina ayuda a rendir mejor, pero no garantiza un resultado ni reemplaza el trabajo.",
      },
      {
        type: "table",
        caption: "Aspectos a tener en cuenta",
        head: ["Aspecto", "Consideración"],
        rows: [
          ["Dosis", "3 a 5 g diarios"],
          ["Momento del día", "No es determinante; importa la constancia"],
          ["Forma recomendada", "Monohidrato, la más estudiada"],
          ["Con entrenamiento de fuerza", "Donde mejor se expresa"],
        ],
      },
      { type: "h2", text: "Qué esperar" },
      {
        type: "p",
        text: "Las mejoras en esfuerzos cortos e intensos suelen notarse con días o semanas de uso constante. En FECA la creatina es monohidrato de 200 mesh con pureza de referencia ≥ 99,5 %, con certificado por lote.",
      },
      {
        type: "p",
        text: "Si tenés una condición médica o tomás medicación, consultá a un profesional antes de sumarla a tu rutina.",
      },
    ],
    faqs: [
      {
        question: "¿La creatina sirve para la fuerza y la potencia?",
        answer:
          "Sí. Son dos de sus efectos mejor respaldados por la evidencia, sobre todo en esfuerzos cortos e intensos.",
      },
      {
        question: "¿Cuándo noto el efecto?",
        answer:
          "Con la dosis de mantenimiento, los depósitos suelen saturarse en unas semanas. Una fase de carga llega al mismo punto más rápido.",
      },
      {
        question: "¿Importa cuándo la tomo?",
        answer:
          "No de forma decisiva. El efecto depende de mantener los depósitos saturados, así que lo importante es la constancia diaria.",
      },
      {
        question: "¿Sirve si no entreno?",
        answer:
          "Sus beneficios principales son sobre el rendimiento físico. Sin entrenamiento, el efecto sobre fuerza y potencia pierde sentido.",
      },
    ],
    related: ["beneficios", "que-es", "cuanta-tomar"],
  },
  {
    slug: "resistencia",
    title: "Creatina para resistencia",
    metaTitle: "Creatina y resistencia",
    description:
      "Qué dice la evidencia sobre la creatina y el rendimiento en resistencia: dónde ayuda, dónde no, y por qué puede sumar a tu entrenamiento.",
    intro:
      "La creatina es conocida por su efecto en esfuerzos cortos e intensos, pero también puede sumar en deportes de resistencia. Su rol en la producción de energía aporta en los tramos más exigentes y en la repetición de esfuerzos. La dosis es la misma: 3 a 5 g diarios.",
    updated: "2026-10-16",
    readingMinutes: 5,
    intent: "rendimiento en deportes de resistencia",
    blocks: [
      {
        type: "p",
        text: "El rendimiento en resistencia depende de muchos factores: entrenamiento aeróbico, alimentación, descanso y estrategia de la sesión o la carrera. La creatina no es un sustituto de eso, pero tiene un papel en la producción de energía que puede sumar.",
      },
      { type: "h2", text: "Dónde puede ayudar" },
      {
        type: "p",
        text: "Aunque su efecto mejor respaldado está en esfuerzos cortos e intensos, la creatina interviene en el metabolismo energético del músculo. En deportes de resistencia puede aportar en los tramos de mayor intensidad, en los cambios de ritmo y en la repetición de esfuerzos.",
      },
      {
        type: "ul",
        items: [
          "Aporta en los picos de intensidad dentro de un esfuerzo largo.",
          "Puede ayudar en deportes con esfuerzos repetidos o intermitentes.",
          "Ayuda a sostener la calidad del entrenamiento cuando aparece la fatiga.",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "Sin exagerar",
        text: "La evidencia en resistencia es más moderada que en fuerza y potencia. La creatina suma; la base sigue siendo el entrenamiento aeróbico y una buena alimentación.",
      },
      { type: "h2", text: "Cómo se toma" },
      {
        type: "p",
        text: "La dosis de mantenimiento es de 3 a 5 g diarios, todos los días, entrenes o no. No hace falta tomarla justo antes de la sesión: lo que importa es mantener los depósitos saturados.",
      },
      {
        type: "table",
        caption: "Aspectos a tener en cuenta",
        head: ["Aspecto", "Consideración"],
        rows: [
          ["Dosis", "3 a 5 g diarios"],
          ["Constancia", "Más importante que el momento"],
          ["Hidratación", "Conviene mantener una buena ingesta de agua"],
          ["Forma recomendada", "Monohidrato, la más estudiada"],
        ],
      },
      { type: "h2", text: "Qué esperar" },
      {
        type: "p",
        text: "Puede notarse como una mejor capacidad para sostener esfuerzos intensos o repetidos dentro de tu disciplina. En FECA la creatina es monohidrato de 200 mesh con pureza de referencia ≥ 99,5 %, con certificado por lote.",
      },
      {
        type: "p",
        text: "Si tenés una condición médica o tomás medicación, consultá a un profesional antes de sumarla a tu rutina.",
      },
    ],
    faqs: [
      {
        question: "¿La creatina sirve para la resistencia?",
        answer:
          "Puede sumar, sobre todo en los tramos de mayor intensidad y en esfuerzos repetidos. La evidencia es más moderada que en fuerza y potencia.",
      },
      {
        question: "¿Reemplaza al entrenamiento aeróbico?",
        answer:
          "No. La base de la resistencia es el entrenamiento y la alimentación. La creatina es un complemento, no un atajo.",
      },
      {
        question: "¿Hay que tomarla antes de correr?",
        answer:
          "No es necesario. El efecto depende de mantener los depósitos saturados, así que importa tomarla todos los días.",
      },
      {
        question: "¿Necesito tomar más agua?",
        answer:
          "La creatina atrae agua hacia el músculo. Conviene mantener una buena hidratación general, sin excesos.",
      },
    ],
    related: ["beneficios", "como-tomar", "tomar-todos-los-dias"],
  },
  {
    slug: "recuperacion",
    title: "Creatina y recuperación",
    metaTitle: "Creatina para la recuperación",
    description:
      "Cómo la creatina puede apoyar la recuperación tras entrenamientos exigentes: qué dice la evidencia, cómo se toma y qué esperar.",
    intro:
      "La recuperación es uno de los efectos que la evidencia asocia a la creatina. Al reponer más rápido las reservas de energía del músculo, puede apoyar la recuperación entre sesiones intensas. La dosis de mantenimiento es de 3 a 5 g diarios.",
    updated: "2026-10-16",
    readingMinutes: 5,
    intent: "recuperación entre sesiones",
    blocks: [
      {
        type: "p",
        text: "Recuperarse bien significa volver a estar listo para la próxima sesión. Depende del descanso, la alimentación, la hidratación y el manejo de la carga. La creatina puede sumar en un aspecto concreto: la energía del músculo.",
      },
      { type: "h2", text: "Cómo puede ayudar" },
      {
        type: "p",
        text: "Al saturar la fosfocreatina del músculo, la creatina ayuda a regenerar energía en esfuerzos cortos e intensos. Eso puede traducirse en una mejor recuperación entre series, entre sesiones exigentes o en deportes con esfuerzos repetidos.",
      },
      {
        type: "ul",
        items: [
          "Puede apoyar la recuperación entre series intensas.",
          "Ayuda a sostener la calidad del entrenamiento cuando acumulás fatiga.",
          "Suma cuando acompaña a un buen descanso y una alimentación adecuada.",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "La base es el descanso",
        text: "La creatina acompaña la recuperación, no la reemplaza. Dormir bien, comer suficiente y dosificar la carga siguen siendo lo más importante.",
      },
      { type: "h2", text: "Cómo se toma" },
      {
        type: "p",
        text: "3 a 5 g diarios, todos los días, entrenes o no. La constancia es lo que mantiene los depósitos saturados y el efecto disponible cuando lo necesitás.",
      },
      {
        type: "table",
        caption: "Aspectos a tener en cuenta",
        head: ["Aspecto", "Consideración"],
        rows: [
          ["Dosis", "3 a 5 g diarios"],
          ["Frecuencia", "Todos los días"],
          ["Junto con", "Descanso y alimentación"],
          ["Forma recomendada", "Monohidrato, la más estudiada"],
        ],
      },
      { type: "h2", text: "Qué esperar" },
      {
        type: "p",
        text: "Puede notarse como una mejor sensación entre sesiones o una menor caída de rendimiento cuando acumulás esfuerzos. En FECA la creatina es monohidrato de 200 mesh con pureza de referencia ≥ 99,5 %, con certificado por lote.",
      },
      {
        type: "p",
        text: "Si tenés una condición médica o tomás medicación, consultá a un profesional antes de sumarla a tu rutina.",
      },
    ],
    faqs: [
      {
        question: "¿La creatina ayuda a recuperarse?",
        answer:
          "Puede apoyar la recuperación tras esfuerzos intensos al reponer más rápido las reservas de energía del músculo. No reemplaza el descanso.",
      },
      {
        question: "¿Sirve para las agujetas?",
        answer:
          "No hay evidencia sólida de que elimine las agujetas. Su aporte está en la energía del músculo y la recuperación entre esfuerzos.",
      },
      {
        question: "¿Hay que tomarla después de entrenar?",
        answer:
          "No es necesario. Lo importante es tomarla todos los días para mantener los depósitos saturados.",
      },
      {
        question: "¿Puedo tomarla los días que descanso?",
        answer:
          "Sí. De hecho, conviene tomarla todos los días, entrenes o no.",
      },
    ],
    related: ["beneficios", "tomar-todos-los-dias", "como-tomar"],
  },
];
