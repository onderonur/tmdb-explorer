import React from 'react';
import Link from 'next/link';

const NextLink = React.forwardRef(function NextLink(
  { href, as, children, className, shallow },
  ref,
) {
  return (
    <Link href={href} as={as} shallow={shallow}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a ref={ref} className={className}>
        {children}
      </a>
    </Link>
  );
});

export default NextLink;
