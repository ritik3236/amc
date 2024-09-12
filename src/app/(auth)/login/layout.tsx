import React from 'react';

export default function LoginLayout({ children }: { children: React.ReactNode; }) {
    return (
        <section
            className="relative z-20 col-span-4 flex h-[80vh] flex-1 translate-y-0 flex-col items-center overflow-hidden bg-transparent opacity-100 transition-all duration-1000">
            <div className="m-auto max-w-lg">
                {children}
            </div>
        </section>
    );
}
