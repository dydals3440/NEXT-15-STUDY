'use server';

import { revalidateTag } from 'next/cache';

export async function deleteReviewAction(_: any, formData: FormData) {
  const reviewId = formData.get('reviewId')?.toString();
  const bookId = formData.get('bookId')?.toString();

  if (!reviewId) {
    //  리뷰가 없으면, 클라이언트에게 아래 에러가 보내짐.
    return {
      status: false,
      error: '삭제할 리뷰가 없습니다.',
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/${reviewId}`,
      {
        method: 'DELETE',
      },
    );
    // 요청 종료시, 실패했다면
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // 데이터 캐시를 재검증
    revalidateTag(`review-${bookId}`);

    return {
      status: true,
      error: '',
    };
  } catch (error) {
    return {
      status: false,
      error: `리뷰 삭제에 실패했습니다: ${error}`,
    };
  }
}
