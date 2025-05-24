import React, { useEffect, useState } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'flowbite-react';
import { HiHome } from 'react-icons/hi';
import { useLocation, Link } from 'react-router';

export default function HeadingBar() {
    const { pathname } = useLocation();
    const [paths, setPaths] = useState([]);

    useEffect(() => {
        const segments = pathname
            .split('/')
            .filter(p => {
                if (p !== 'auth')
                    return p;
            }); // remove empty strings
        setPaths(segments);
    }, [pathname]);

    return (
        <Breadcrumb aria-label="Breadcrumb navigation" className="my-3">
            <BreadcrumbItem icon={HiHome}>
                <Link to="#" className='font-medium'>Home</Link>
            </BreadcrumbItem>

            {paths.map((segment, index) => {
                const fullPath = '/' + paths.slice(0, index + 1).join('/');
                const label = segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                const isLast = index === paths.length - 1;

                return (
                    <BreadcrumbItem key={index}>
                        <Link
                            to="#"
                            className={isLast ? 'text-violet-700 font-medium' : 'text-gray-600'}
                        >
                            {label}
                        </Link>
                    </BreadcrumbItem>
                );
            })}
        </Breadcrumb>
    );
}
