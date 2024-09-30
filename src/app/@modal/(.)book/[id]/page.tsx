import BookPage from '@/app/book/[id]/page';
import Modal from '@/components/modal';

export default function Page(props: any) {
  console.log(props);
  return (
    <Modal>
      <BookPage {...props} />
    </Modal>
  );
}
