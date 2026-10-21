import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Philosophy Atlas', description: 'An exploratory constellation of ideas. A clearly labeled demonstration dataset.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
