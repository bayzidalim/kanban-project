import './globals.css';

export const metadata = {
  title: 'Kanban App',
  description: 'A simple Kanban board using MERN and Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
