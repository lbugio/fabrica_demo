//import { useRouter } from "next/router";
import { Card } from "components/Card";

const items = [
  {
    name: "Telas",
    description: "Datos acerca de las telas.",
    href: "/produccion/telas",
    img: "/telas.svg" || "default.svg",
    current: true,
  },
  {
    name: "Avíos",
    description: "Datos acerca de los avios.",
    href: "/produccion/avios",
    img: "/avios.svg",
  },
  {
    name: "Talleres",
    description: "Datos acerca de los talleres.",
    href: "/produccion/talleres",
    img: "/talleres.svg"
  },
  {
    name: "Articulos",
    description: "Datos acerca de los articulos.",
    href: "/produccion/articulos",
    img: "/articulos.svg",
    priority:true
  },
];

export default function HomePage({tasks}) {
  //const router = useRouter();
  //if (tasks.length === 0) return <p>No Hay Datos</p>;

  return (
    <>
      {items.map((item) => (
        <Card
          key={item.name}
          name={item.name}
          href={item.href}
          img={item.img}
          description={item.description}
          priority={item.priority}
        />
      ))}
       {/* {tasks.map((task) => (
        <div
          className="max-w-sm rounded overflow-hidden shadow-lg"
          key={task._id}
        >
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{task.title}</div>
            <p className="text-gray-700 text-base">{task.description} </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <button
              onClick={() => router.push(`/${task._id}`)}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Ver
            </button>
            <button
              onClick={() => router.push(`/${task._id}/edit`)}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Editar
            </button>
          </div>
        </div>
      ))}  */}
    </>
  );
}

/* export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/tasks");
  const tasks = await res.json();

  return {
    props: {
      tasks,
    },
  };
}; */
