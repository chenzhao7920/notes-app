import "./globals.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="container flex flex-col h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
