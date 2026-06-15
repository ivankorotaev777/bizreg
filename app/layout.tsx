// Корневой layout — проходной. <html>/<body> и lang задаются в [locale]/layout.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
