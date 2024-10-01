import BookItem from '@/components/book-item';
import { BookData } from '@/types';
import { delay } from '@/util/delay';
import { Suspense } from 'react';
import BookListSkeleton from '@/components/skeleton/book-list-skeleton';
import { Metadata } from 'next';

async function SearchResult({ q }: { q: string }) {
  await delay(1000);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: 'force-cache' },
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const books: BookData[] = await response.json();
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

type Props = {
  searchParams: {
    q?: string;
  };
};

// 페이지 컴포넌트에 전달받는 props를 사용할 수 있음.
export function generateMetadata({ searchParams }: Props): Metadata {
  return {
    title: `${searchParams.q}: 한입북스 검색`,
    description: `${searchParams.q} 검색 결과입니다.`,
    openGraph: {
      title: `${searchParams.q} : 한입북스 검색`,
      description: `${searchParams.q} 검색 결과입니다.`,
      images: ['/thumbnail.png'],
    },
  };
}

export default async function Page({ searchParams }: Props) {
  // 값이 없다면 빈 문자열
  return (
    <Suspense
      key={searchParams.q || ''}
      fallback={<BookListSkeleton count={3} />}
    >
      <SearchResult q={searchParams.q || ''} />
    </Suspense>
  );
}
