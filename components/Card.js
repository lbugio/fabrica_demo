import Image from "next/image";
import Link from "next/link";

export const Card = ({ name, href, img, description, priority }) => {
  return (
    <>
      <Link href={href}>
          <div className="shadow-lg rounded-xl flex flex-col justify-center items-center p-4 hover:border-4 hover:border-gray-800 hover:bg-gray-400/25  ">
            <Image
              src={img}
              alt={name}
              width={200}
              height={200}
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
