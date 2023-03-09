import { Card } from "components/Card";

const items = [
  {
    id: 1,
    name: "Telas",
    description: "Datos acerca de las telas.",
    href: "/produccion/telas",
    img: "/telas.svg",
    current: true,
    priority: true,
  },
  {
    id: 2,
    name: "Avíos",
    description: "Datos acerca de los avios.",
    href: "/produccion/avios",
    img: "/avios.svg",
  },
  {
    id: 3,
    name: "Talleres",
    description: "Datos acerca de los talleres.",
    href: "/produccion/talleres",
    img: "/talleres.svg",
    priority: true,
  },
  {
    id: 4,
    name: "Articulos",
    description: "Datos acerca de los articulos.",
    href: "/produccion/articulos",
    img: "/articulos.svg",
    priority: true,
  },
  {
    id: 5,
    name: "Diseños",
    description: "Datos acerca de los articulos.",
    href: "/produccion/disenos",
    img: "/articulos.svg",
    priority: true,
  },
  {
    id: 6,
    name: "Procesos",
    description: "Datos acerca de los procesos.",
    href: "/produccion/procesos",
    img: "/articulos.svg",
    priority: true,
  },
].map((item) => ({ ...item, priority: item.priority ?? false }));;

function generateCardList() {
  return items.map(({ id, name, href, img, description, priority }) => (
    <Card
      key={id}
      name={name}
      href={href}
      img={img}
      description={description}
      priority={priority}
    />
  ));
}

export default function HomePage() {
  return <>{generateCardList()}</>;
}
