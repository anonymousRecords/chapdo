import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Image src="/main.webp" alt="main" width={2000} height={200} />
    </main>
  );
}
