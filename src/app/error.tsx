'use client';

import { startTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.error(error.message);
    console.log('hi');
  }, [error]);

  return (
    <div>
      <h3>오류가 발생했습니다.</h3>
      {/* 페이지를 강제로 새로고침 시킴: window.location.reload() */}
      {/* 이렇게하면, 브라우저의 보관한 state나, 데이터들이 날라가버림 게다가, 에러가 발생하지 않은
        레이아웃이나, 별도의 컴포넌트도 다시 렌더링을 함 (우아한 방법 X)
       */}
      <button
        onClick={() => {
          startTransition(() => {
            // 라우터 객체의 refresh는, 현재 페이지에 필요한 서버컴포넌트들을 다시 불러옴.
            // 현재 페이지에서 서버컴포넌트만 빠르게 재호출함.
            // next 서버측에 재요청
            router.refresh();
            // reset을 다시 하는 이유,
            // 에러 상태를 초기화하고, 컴포넌트들을 다시 렌더링.
            // 즉, router.refresh => 서버컴포넌트를 다시 불러온다해도, 클라이언트 컴포넌트인 에러 컴포넌트가 사라지지 않음 (에러 상태초기화 X)
            // 그래서, 에러의 상태를 초기화 해주는 reset을 추가로 호출해야, 서버 컴포넌트의 결과값도 다시 호출, 에러 상태도, 다시 초기화
            reset();
          });
        }}
        // 서버컴포넌트를 불러와서 (화면 렌더링)
        // 리셋 이 수행하는, 에러 초기화, 컴포넌트 다시 렌더링 하는 작업이 일괄적으로 동시에 처리.
      >
        다시 시도
      </button>
    </div>
  );
}
