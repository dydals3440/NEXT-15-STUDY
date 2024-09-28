'use server';

import { revalidatePath } from 'next/cache';

export async function createReviewAction(formData: FormData) {
  // 이 값이 있을 때에만 문자열로 확정
  // 기본 form-data 타입이 FormDataEntryValue | null 이기 떄문.
  const content = formData.get('content')?.toString();
  const author = formData.get('author')?.toString();

  // bookId도 받을 수 있게
  const bookId = formData.get('bookId')?.toString();

  // 예외처리 (값 X -> 서버액션 종료)
  if (!content || !author) {
    return;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: 'POST',
        body: JSON.stringify({
          // 문자열 형태로 직렬화
          bookId,
          content,
          author,
        }),
      },
    );
    console.log(response.status);

    // 성공적으로 댓글 요청시 -> 리뷰 데이터를 최신화 (또는 book Page 자체를 다시 렌더링한다던가)
    revalidatePath(`/book/${bookId}`);
  } catch (error) {
    console.error(error);
    return;
  }
}
