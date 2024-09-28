import { ReactNode, Suspense } from 'react';
import Searchbar from '../../components/searchbar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* useSearchParams를 무조건 클라이언트에서만 호출되게함 */}
      {/* 사전 렌더링 과정에서 배제 */}
      {/* suspense 미결 -> 미완성 */}
      {/* Suspense로 묶여있 컴포넌트들은, 일단 미완성 상태로 남겨지게 됨. */}
      {/* 곧바로 렌더링 되지 않게 됨. 렌더링 결과 대신에 Fallback이 LoadingUI로 실행 */}
      {/* 언제까지 미완성? 이 컴포넌트의 비동기가 끝날 떄 까지 */}
      {/* SearchBar는 어떤 비동기? */}
      {/* 쿼리스트링을 불러오기 위해, useSearchParams 훅과같은 비동기 훅 쿼리스트링 불러올떄 종료됨 */}
      <Suspense fallback={<div>Loading...</div>}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
