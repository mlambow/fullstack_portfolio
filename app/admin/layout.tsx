'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import AdminLayoutShell from '@/components/admin/AdminLayoutShell';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // If the user is viewing the login page, render it raw without the navigation sidebar shell
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    // Otherwise, wrap the page components safely with our SaaS interface container
    return <AdminLayoutShell>{children}</AdminLayoutShell>;
}