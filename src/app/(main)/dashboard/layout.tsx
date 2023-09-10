import { clsx } from "clsx";
import Nav from '@/components/Nav';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav/>
      {children}
    </>
  );
}
