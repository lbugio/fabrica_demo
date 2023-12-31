import Image from "next/image";
import Link from "next/link";

export const Card = ({ name, href, img,priority }) => {
  return (
    <>
      <Link href={href}>
          <div className="shadow-lg rounded-xl flex flex-col justify-center items-center p-4 border-4 border-gray-800 hover:bg-indigo-500  ">
            <Image
              src={img}
              alt={name}
              width={100}
              height={100}
              priority={priority}
              
            />
            <div className="px-6 py-4 text-center">
              <div className="font-bold text-xl p-4">{name.toUpperCase()}</div>
            </div>
          </div>
      </Link>
    </>
  );
};
