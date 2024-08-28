import { Box, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { navBarStyle, titleStyle } from './NavBar.css';
import CreateItemDialog from './components/Home/CreateItem/CreateItemDialog';

const NavBar = () => (
  <div className={navBarStyle}>
    <Flex direction={'row'}>
      <Link href="/" className={titleStyle}>
        <Text size="4">Carbonfact</Text>
      </Link>
      <Box grow={'1'}>
        <CreateItemDialog />
      </Box>
    </Flex>
  </div>
);

export default NavBar;
