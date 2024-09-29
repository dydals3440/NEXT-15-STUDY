'use client';

import { useActionState, useEffect, useRef } from 'react';
import { deleteReviewAction } from '@/actions/delete-review.action';

export default function ReviewItemDeleteButton({
  reviewId,
  bookId,
}: {
  reviewId: number;
  bookId: number;
}) {
  const [state, formAction, isPending] = useActionState(
    deleteReviewAction,
    null,
  );

  // Programmatic 하게, div태그를 버튼처럼 활용 (버튼이 아닌, div or a 태그를 통해 제출할 떄 -> 디자이너/기획 요구사항)
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <input name="reviewId" hidden defaultValue={reviewId} />
      <input name="bookId" hidden defaultValue={bookId} />
      {/* submit이 아닌, requestSubmit인 이유, submit method는 유효성검사나, 이벤트 핸들링을 다 무시 */}
      {/* requestSubmit은, 실제로 사용자가, submit 버튼을 클릭한 것과 똑같이 동작. */}
      {isPending ? (
        <div>...</div>
      ) : (
        <div onClick={() => formRef.current?.requestSubmit()}>삭제하기</div>
      )}
    </form>
  );
}
