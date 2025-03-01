import { Box, Text } from '@radix-ui/themes';
import Link from 'next/link';
import CreateItemDialog from './components/Home/CreateItem/CreateItemDialog';

const NavBar = () => (
  <div className='p-2'>
    <div className='flex items justify-between'>
      <Link href="/" className='text-white no-underline text-3xl'>
        {"Carbonfact"}
      </Link>
      <CreateItemDialog />
    </div>
  </div>
);

export default NavBar;
