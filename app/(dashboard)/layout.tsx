import type { Metadata } from 'next';
import Sidebar from '@/components/layout/sidebar';
import './globals.css';

export const metadata: Metadata = {
  title: 'Strand Admin Dashboard',
  description: 'A reusable full-stack admin dashboard starter kit',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="min-h-screen">
        <Sidebar>{children}</Sidebar>
      </body>
    </html>
  );
}
