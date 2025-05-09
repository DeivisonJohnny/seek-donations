import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href={"/dashboard"}>Dashboard</Link>
      <Link href={"/news"}>news</Link>
      <Link href={"/locations-donations"}>locations-donations</Link>
    </div>
  );
}
