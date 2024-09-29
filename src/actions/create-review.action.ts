'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

export async function createReviewAction(state: any, formData: FormData) {
  console.log(state, '상태');
  // 이 값이 있을 때에만 문자열로 확정
  // 기본 form-data 타입이 FormDataEntryValue | null 이기 떄문.
  const content = formData.get('content')?.toString();
  const author = formData.get('author')?.toString();

  // bookId도 받을 수 있게
  const bookId = formData.get('bookId')?.toString();

  // 예외처리 (값 X -> 서버액션 종료)
  if (!content || !author || !bookId) {
    return {
      status: false,
      error: '리뷰 내용과 작성자를 입력해주세요.',
    };
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

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // 5. 태그 값을 기준으로 재검증s
    revalidateTag(`review-${bookId}`);

    return {
      status: true,
      error: '',
    };
  } catch (error) {
    return {
      status: false,
      error: `리뷰 저장에 실패했습니다 : ${error}`,
    };
  }
}
