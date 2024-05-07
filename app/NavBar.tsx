'use client';
import { BsFillBugFill } from 'react-icons/bs';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import { Box, Button, DropdownMenu, Flex } from '@radix-ui/themes';
import { log } from 'console';
import { getServerSession } from 'next-auth';
import { authConfig } from './api/auth/auth';

type link = {
  href: string;
  label: string;
};

const NavBar = () => {
  const links: link[] = [
    { href: '/', label: 'Dashboard' },
    { href: '/issues', label: 'Issues' },
  ];

  // get path
  const currentPath = usePathname();
  const { status, data: session } = useSession();
  // const session = await getServerSession(authConfig);
  // console.log("session: " + session);
  console.log('status: ' + status);
  console.log('session: ' + session);

  return (
    <div className='flex justify-between border-b mb-5 pl-5 pr-8 h-14 items-center'>
      <Flex justify={'start'} gapX={'4'} align={'center'}>
        <Link href='/'>
          <BsFillBugFill />
        </Link>
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
      </Flex>

      <div className='flex gap-x-2'>
        {status === 'authenticated' && (
          <>
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
          </>
        )}
        {status === 'unauthenticated' && (
          <Link href='/api/auth/signin'>Log In</Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
