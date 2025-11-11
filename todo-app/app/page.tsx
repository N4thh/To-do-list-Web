import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Hello welcome to my world</h1>
      <Link href="/login"> Go to login</Link> <br />
      <Link href ="/register">Go to register</Link> <br />
      <Link href ="/dashboard">Go to dashboard</Link>
    </main>
  );
}
