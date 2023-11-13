import ItemNavigationList from '../components/Home/ItemNavigationList/ItemNavigationList';
import { itemsContainerStyle, navListContainerStyle } from './page.css';

export default function ItemsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={itemsContainerStyle}>
      <ItemNavigationList
        className={navListContainerStyle}
      ></ItemNavigationList>
      {children}
    </div>
  );
}
