import { ApplicationProvider } from "@/providers/application/ApplicationProvider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ApplicationProvider>
      <div>{children}</div>
    </ApplicationProvider>
  );
}
