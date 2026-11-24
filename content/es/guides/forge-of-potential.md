# Forja del Potencial

**¿Puedo mejorar mi equipo más allá de su último nivel?** Sí, en la Forja del Potencial: un intento sube un objeto un nivel o lo destruye, lo decide el nombre de tu personaje, y el nombre correcto nunca lo destruye.

## ¿Dónde está la Forja del Potencial?

En una Montaña, una forja por mundo, pero no en un lugar fijo: el mundo tiene varios lugares donde puede estar, y el primero al que te acercas se convierte en la forja, mientras que los demás desaparecen para siempre. El más cercano de esos lugares está, por lo general, a {{homeForgeM}} m de tu hogar, {{homeForgeMLow}}–{{homeForgeMHigh}} m en la mitad central de las semillas, así que es un viaje que planeas, no uno por el que pasas de camino. El [mapa de semillas](/tools/map) marca cada lugar donde puede estar; ve al más cercano, y allí la encontrarás.

## ¿Qué puedo mejorar allí?

Cada arma, pieza de armadura, escudo, capa y herramienta que tiene más de un nivel: la forja acepta cualquier objeto cuya receta pide un ídolo, y todos lo piden salvo uno. El [Yelmo del Protector](/bugs#the-helmet-of-the-protector-never-reaches-the-forge-of-potential) no pide ninguno, así que nunca llega a la forja. Lo que tiene un solo nivel se queda como está: abalorios, bombas, la Luz de Wisp, jarras, el Gancho de agarre.

Sube primero el objeto a su último nivel en su propio Banco de trabajo o forja, con los materiales de siempre. La Forja del Potencial acepta un objeto en cualquier nivel, pero cada intento allí es una tirada, incluso uno que el Banco de trabajo habría hecho con seguridad.

## ¿Qué pide un intento?

Un ídolo del nivel del objeto y nada más: un ídolo de batalla para un arma o una herramienta, un ídolo de protección para una armadura, un escudo o una capa. El nivel sigue al bioma al que pertenece el objeto, desde los ídolos de Madera de las Praderas hasta los ídolos de Oro sanguino del Norte profundo. Los ídolos están en cofres de los lugares de su bioma: las casas abandonadas de las Praderas, las ruinas del Bosque negro y las cabañas del Pantano, las cuevas y cabañas de la Montaña, las cabañas de las Llanuras, las torres de las Tierras Nubladas, las fortalezas y ruinas de la Tierra de Ceniza, y los naufragios del Norte profundo y las salas de Mörkhalla; [Cuevas y mazmorras](/catalog/dungeons) recoge lo que guarda cada lugar.

## ¿Cuáles son las probabilidades?

Un intento sube el objeto un nivel el {{success}} % de las veces y lo destruye el {{shatter}} %; no hay nada intermedio.

## ¿Qué recupero cuando se rompe?

Mucho menos de lo que pusiste. De cada material, el juego suma lo que pidió el primer nivel del objeto a lo que pide su nivel actual, y te devuelve el {{returned}} % de esa suma, redondeado hacia arriba. Todos los niveles intermedios se pierden, y también el objeto y su ídolo.

Lo que un nivel «pide» no se duplica cada vez. Una receta indica, para cada material, una cantidad para fabricar y una cantidad por nivel; una mejora cuesta la cantidad por nivel multiplicada por un paso, y el paso es el nivel menos uno hasta el nivel 3, luego 4 en el nivel 4, y medio paso más por cada nivel después. Así que el coste se duplica del nivel 3 al nivel 4 y luego crece solo medio paso por nivel. La tabla de la Espada de hierro muestra cada nivel, su paso y su coste, y luego lo que se recupera.

Figure: breakReturn

Así que una rotura cuesta más cuanto más alto está el objeto: cada nivel entre el primero y el último se pierde entero. Esa es la pérdida que te ahorra el nombre correcto.

## ¿Es suerte?

No. El juego saca el resultado de tu primer intento con un objeto en un nivel a partir de tres cosas: el nombre de tu personaje, el objeto y el nivel al que apuntas. Nada más entra en juego: ni tu habilidad, ni el mundo, ni la hora. Tras cada intento, el juego pasa ese objeto y ese nivel a su siguiente tirada y lo guarda con el personaje, así que recargar el mundo no cambia nada, y otro personaje, con otro nombre, obtiene otras respuestas para el mismo objeto.

Así que el primer intento se conoce antes de pulsar el botón, si conoces el nombre. Nosotros lo conocemos: la herramienta [Nidavellir](/tools/nidavellir) toma un objeto y un paso, hasta el nivel {{top}}, y da los nombres cuyo primer intento lo sube.

## ¿Cómo subo un objeto sin romperlo?

Un paso cada vez, cada uno con un personaje nuevo propio. Tu personaje principal recolecta; los nuevos solo llevan el objeto a la forja.

1. Sube el objeto a su último nivel de la forma habitual, con tu personaje principal.
2. Llena un cofre en tu base para el nuevo: el objeto, un ídolo de su nivel, un juego de los ingredientes de la receta y ropa lo bastante abrigada para la Montaña.
3. En la herramienta [Nidavellir](/tools/nidavellir), elige el objeto y el siguiente paso, y crea un personaje nuevo con uno de los nombres que da, escrito exactamente, mayúsculas incluidas.
4. Entra con él en tu mundo, vacía el cofre y pasa junto a la estación de trabajo que fabrica el objeto, la del nivel que pide su receta.
5. Ve a la forja y pulsa el botón una vez.
6. Devuelve todo al cofre. Para el siguiente nivel, vuelve a preguntar a la herramienta y crea el siguiente personaje.

Un nombre vale para el primer intento de cada objeto en cada nivel, y los intentos de un nivel nunca tocan los de otro; pero un nombre que sube un paso rara vez sube el siguiente, así que la herramienta da un nombre por paso. Un segundo intento del mismo objeto en el mismo nivel es una tirada nueva, y la herramienta ya no la conoce.

Así que un personaje nunca aprende el camino hacia arriba. Cada nivel lleva su propia cuenta de intentos: una segunda copia del mismo objeto llega a cada nivel en su segundo intento, y puede romperse en un nivel que la primera copia superó. Un nombre que llevó una copia hasta el nivel {{top}} puede destruir la siguiente en el primer paso. Cada copia sube con personajes nuevos, uno por paso. Borra el personaje y créalo de nuevo con el mismo nombre, y sus intentos empiezan de cero: el primer intento es el mismo que antes.

## ¿Por qué el personaje nuevo necesita los ingredientes?

La forja muestra solo las recetas que un personaje conoce, y un personaje nuevo no conoce ninguna. El juego enseña una receta por sí solo cuando se cumplen dos cosas: cada uno de sus ingredientes, el ídolo incluido, ha estado en manos del personaje, y el personaje ha estado junto a la estación de trabajo que la fabrica, en el nivel que pide la receta. Sacar los ingredientes del cofre y pasar junto a tu propia forja o Banco de trabajo hace las dos cosas; no hay que fabricar nada, y ninguna habilidad cuenta en la Forja del Potencial.

## ¿Cómo le paso un objeto a otro personaje?

A través del mundo, no del personaje: lo que lleva un personaje va adonde vaya ese personaje, así que el objeto tiene que quedarse en el mundo para que el siguiente lo recoja. Pon el objeto y lo que va con él en un cofre, sal al menú principal, elige el otro personaje, entra en el mismo mundo y sácalos. Un objeto conserva su nivel en el cofre, y cualquiera de tus personajes puede entrar en cualquiera de tus mundos.

## ¿Qué objeto debería traer?

El equipo de tu último bioma es el que vale la pena subir: cualquier cosa más vieja la guardarás antes de que sus niveles de más compensen. Con un nombre de la herramienta, el intento en sí no cuesta nada salvo el ídolo, así que el viaje se planea en torno a los ídolos, uno por cada paso.

Lo que añade un nivel a cada objeto está en su fila, bajo Cada mejora, en [Armas](/catalog/weapons), [Báculos](/catalog/staffs) y [Armaduras](/catalog/armour).
