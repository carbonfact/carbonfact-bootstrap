import ItemNavigationList from '../components/Home/ItemNavigationList/ItemNavigationList';

export default function ItemsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex'>
      <ItemNavigationList />
      {children}
    </div>
  );
}
