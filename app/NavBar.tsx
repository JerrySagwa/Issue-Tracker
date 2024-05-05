'use client'
import { BsFillBugFill } from 'react-icons/bs';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classnames from 'classnames'

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

  return (
    <div className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <Link href='/'>
        <BsFillBugFill />
      </Link>
      <div className='flex space-x-6'>
        {links.map((l, index) => (
          <div key={index} className={
            classnames({
              'text-zinc-900': currentPath === l.href,
              'text-zinc-500': currentPath !== l.href,
              'hover:text-zinc-900 transition-colors': true
            })
          }>
            <Link href={l.href}>{l.label}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
