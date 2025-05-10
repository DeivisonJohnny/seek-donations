import { ReactNode } from "react";
import Header from "./Header";
import { usePathname } from "next/navigation";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const router = usePathname();

  return (
    <>
      {router != "/" ? <Header /> : null}
      {children}
    </>
  );
}
