import style from './page.module.css';
import { BookData, ReviewData } from '@/types';
import { notFound } from 'next/navigation';
import { createReviewAction } from '@/actions/create-review.action';
import ReviewItem from '@/components/review-item';
import ReviewEditor from '@/components/review-editor';

// 기본 값 true
// 1,2,3 이외에 404에러처리 false시.
// export const dynamicParams = false;

// page 컴포넌트 위에
// generateStaticParams 정적인 파라미터를 생성하는 함수이다.
export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

async function BookDetail({ bookId }: { bookId: string }) {
  // 무엇이든 올 수 있다, dynamic page라고 생각.(Id)가 달라질 수 있기에
  // 그러면 당연히 빌드타임에 next 서버가, 북페이지에 어떤 경로가 존재할 수 있는지 알려줘야함.
  // 북페이지에 어떠한 도서 데이터들이 빌드타임에 만들어져야 하는지 알려줄 수 있음.
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`,
  );

  if (!response.ok) {
    if (response.status === 404) {
      // next/navigation 404페이지
      notFound();
    }
    return <div>오류가 발생했습니다...</div>;
  }

  const book: BookData = await response.json();

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

async function ReviewList({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`,
  );

  if (!response.ok) {
    // 에러메세지와 함께 error.tsx 파일이 동작.
    throw new Error(`Review fetch failed: ${response.status}`);
  }

  const reviews: ReviewData[] = await response.json();

  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
      ))}
    </section>
  );
}

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <div className={style.container}>
      <BookDetail bookId={params.id} />
      <ReviewEditor bookId={params.id} />
      <ReviewList bookId={params.id} />
    </div>
  );
}
