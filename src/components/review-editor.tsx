'use client';

import style from './review-editor.module.css';

import { createReviewAction } from '@/actions/create-review.action';
import { useActionState, useEffect } from 'react';

export default function ReviewEditor({ bookId }: { bookId: string }) {
  // 새로운 리액트 훅
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null,
  );

  console.log(state, isPending);
  // { status: true, error: '' } -> state 값으로 반환하게 설정함.

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <section>
      <form className={style.form_container} action={formAction}>
        <input required name="bookId" defaultValue={bookId} hidden />
        <textarea
          disabled={isPending}
          required
          name="content"
          placeholder="리뷰 내용"
        />
        <div className={style.submit_container}>
          <input
            disabled={isPending}
            required
            name="author"
            placeholder="작성자"
          />
          <button disabled={isPending} type="submit">
            {isPending ? '...' : '작성하기'}
          </button>
        </div>
      </form>
    </section>
  );
}
