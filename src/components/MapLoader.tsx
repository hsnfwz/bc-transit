import Image from "next/image";

function MapLoader() {

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Image
        className="animate-spin"
        src="/loader-4-line.svg"
        alt="Loading"
        width={24}
        height={24}
        priority
      />
    </div>
  );
}

export default MapLoader;
