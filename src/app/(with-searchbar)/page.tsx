import BookItem from '@/components/book-item';
import style from './page.module.css';
import { BookData } from '@/types';
import { delay } from '@/util/delay';
import { Suspense } from 'react';
import BookListSkeleton from '@/components/skeleton/book-list-skeleton';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '한입 북스',
  description: '한입 북스에 등록된 도서를 만나보세요.',
  openGraph: {
    title: '한입 북스',
    description: '한입 북스에 등록된 도서를 만나보세요',
    images: ['/thumbnail.png'],
  },
};
// export const dynamic = 'force-dynamic';
// 전부 Dynamic Page
async function AllBooks() {
  await delay(3000);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    //  캐싱되지 않은 요청
    { cache: 'force-cache' },
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다....</div>;
  }
  const allBooks: BookData[] = await response.json();

  return (
    <div>
      {allBooks.map((book) => (
        <BookItem {...book} key={book.id} />
      ))}
    </div>
  );
}

async function RecoBooks() {
  await delay(5000);
  // 아무런 옵션을 넣지 않으면, cache: no-store와 동일하게 동작.
  // next-14는 무조건, 캐싱하도록 함 (no-store).
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    // revalidate 옵션 자체는, 페이지를 다이나믹하게 하는 요청은 아님.
    { next: { revalidate: 3 } },
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>;
  }

  const recoBooks: BookData[] = await response.json();

  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem {...book} key={book.id} />
      ))}
    </div>
  );
}

// Static Page는 어짜피, 빌드 타임에 모든, 비동기 작업을 끝내기 떄문에
// 스트리밍을 작업해봤자  빌드타임에 다 끝내기 떄문이다.
// 다이나믹 페이지로 바꾸자. (라우트 세그먼트 활용 -> 매우 쉬움)
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <Suspense fallback={<BookListSkeleton count={3} />}>
          <RecoBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<BookListSkeleton count={5} />}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
