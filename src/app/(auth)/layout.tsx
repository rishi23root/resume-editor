export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="m-auto fcc h-screen border border-green">{children}</div>;
}
