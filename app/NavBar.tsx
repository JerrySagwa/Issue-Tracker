'use client';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Button, DropdownMenu, Flex } from '@radix-ui/themes';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BsFillBugFill } from 'react-icons/bs';

type link = {
  href: string;
  label: string;
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === 'loading') return <Skeleton width={'3rem'}/>;

  return (
    <div>
      {status === 'authenticated' && (
        <div className='flex gap-x-2 items-center'>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant='soft'>
                {session.user?.name}
                <DropdownMenu.TriggerIcon />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item>{session.user?.email}</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <Link href='/api/auth/signout'>Log Out </Link>
        </div>
      )}
      {status === 'unauthenticated' && (
        <Link href='/api/auth/signin'>Log In</Link>
      )}
    </div>
  );
};

const NavLinks = () => {
  const links: link[] = [
    { href: '/', label: 'Dashboard' },
    { href: '/issues', label: 'Issues' },
  ];

  // get path
  const currentPath = usePathname();

  return (
    <>
      {links.map((l, index) => (
        <div
          key={index}
          className={classnames({
            'text-zinc-900': currentPath === l.href,
            'text-zinc-500': currentPath !== l.href,
            'hover:text-zinc-900 transition-colors': true,
          })}
        >
          <Link href={l.href}>{l.label}</Link>
        </div>
      ))}
    </>
  );
};

const NavBar = () => {
  return (
    <div className='flex justify-between border-b mb-5 pl-5 pr-8 h-14 items-center'>
      <Flex justify={'start'} gapX={'4'} align={'center'}>
        <Link href='/'>
          <BsFillBugFill />
        </Link>
        <NavLinks/>
      </Flex>
      <AuthStatus />
    </div>
  );
};

export default NavBar;
