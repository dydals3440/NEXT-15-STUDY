'use client'; // directive (지시자)

import style from './modal.module.css';
import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';

export default function Modal({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      // 다이얼로그가 나타나자마자 맨 위로 스크롤되게 만듬.
      dialogRef.current?.scrollTo({
        top: 0,
      });
    }
  }, []);

  //  브라우저에 존재하는, modal-root 라는 돔 요소 아래에 <dialog>를 보여줌.
  // modal 이라는 것을 화면 전체 다 뒤집음.
  // 일반적인 컴포넌트로 다  감싸면, 렌더링 된 요소들은, 모달 컴포넌트를 포함하는 페이지 컴포넌트 안에 하위 요소로서 렌더링
  // 아무래도 어색함.
  // 특정 페이지 컴포넌트에
  return createPortal(
    <dialog
      // ESC 눌러도 꺼짐
      onClose={() => router.back()}
      onClick={(e) => {
        // 모달의 뒷 배경이 클릭된거면, 뒤로가기
        // 바깥 영역을 클릭했다는 것
        if ((e.target as any).nodeName === 'DIALOG') {
          router.back();
        }
      }}
      className={style.modal}
      ref={dialogRef}
    >
      {children}
    </dialog>,
    document.getElementById('modal-root') as HTMLElement,
  );
}
