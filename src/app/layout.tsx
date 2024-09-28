import './globals.css';
import Link from 'next/link';
import style from './layout.module.css';
import { BookData } from '@/types';

async function Footer() {
  // request memoization이 자동으로 동작함.
  const response = await fetch(
    `
  ${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    {
      cache: 'force-cache',
    },
  );

  if (!response.ok) {
    return <footer>제작 @Matthew</footer>;
  }

  const books: BookData[] = await response.json();
  const bookCount = books.length;

  return (
    <footer>
      <div>제작 @winterlood</div>
      <div>{bookCount}개의 도서가 등록되어 있습니다.</div>
    </footer>
  );
}

// index를 렌더링할려면 , RootLayout을 실행함.
// 어떠한 데이터 fetching X
// 자식으로 갖고있는 Footer의 내부에서, 데이터를 불러옴.
// 아무런 캐시 옵션이 설정되어 있지 않음 -> no-store 그래서, 다이나믹이 됨.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={'/'}>📚 ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
