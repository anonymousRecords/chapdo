import { MenuList } from '@/components/menu/menu-list';
import { SNS_LIST, SNSList } from '@/components/menu/sns-list';

export default function MenuPage() {
  return (
    <div>
      <MenuList />
      <SNSList list={SNS_LIST} />
    </div>
  );
}
