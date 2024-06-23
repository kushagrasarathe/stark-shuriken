import Link from "next/link";

export default function Header() {
  return (
    <div className="flex items-center justify-between px-24 pt-6">
      {/* <Image src={logo} alt="logo" className="w-20 h-20" /> */}
      <Link href={"/"} className="text-2xl font-bold tracking-wide">
        Stark Shuriken
      </Link>
      <div>
        <Link href={"/simulator"}>All Simulations</Link>
      </div>
    </div>
  );
}
