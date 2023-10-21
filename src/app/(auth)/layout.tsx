export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="m-auto fcc">{children}</div>;
}
