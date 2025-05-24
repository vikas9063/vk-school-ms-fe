import React, { useEffect, useState } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'flowbite-react';
import { HiHome } from 'react-icons/hi';
import { useLocation, Link } from 'react-router';

export default function HeadingBar() {
    const { pathname } = useLocation();
    const [paths, setPaths] = useState([]);

    useEffect(() => {
        const segments = pathname.split('/').filter(p => p && p !== 'auth');
        setPaths(segments);
    }, [pathname]);

    return (
        <Breadcrumb aria-label="Breadcrumb navigation" className="my-4 px-1">
            <BreadcrumbItem icon={HiHome}>
                <Link to="/auth/dashboard" className="font-medium text-gray-600 hover:text-violet-600 transition-colors duration-200">Dashboard</Link>
            </BreadcrumbItem>

            {paths.map((segment, index) => {
                const fullPath = '/auth/' + paths.slice(0, index + 1).join('/');
                const label = segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                const isLast = index === paths.length - 1;

                return (
                    <BreadcrumbItem key={index}>
                        <Link
                            to={isLast ? '#' : fullPath}
                            className={`transition-colors duration-200 ${isLast ? 'text-violet-700 font-medium pointer-events-none' : 'text-gray-600 hover:text-violet-600'}`}
                        >
                            {label}
                        </Link>
                    </BreadcrumbItem>
                );
            })}
        </Breadcrumb>
    );
}
