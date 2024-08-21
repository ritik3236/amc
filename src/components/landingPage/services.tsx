'use client';

import React from 'react';
import { Tab, Tabs } from '@nextui-org/tabs';

export const Services: React.FC = () => {
    let tabs = [
        {
            id: 'photos',
            label: 'Photos',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
            id: 'music',
            label: 'Music',
            content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
        {
            id: 'videos',
            label: 'Videos',
            content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },  {
            id: 'photos2',
            label: 'Photos',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
            id: 'music2',
            label: 'Music',
            content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
        {
            id: 'videos2',
            label: 'Videos',
            content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },  {
            id: 'photos3',
            label: 'Photos',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
            id: 'music3',
            label: 'Music',
            content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
        {
            id: 'videos3',
            label: 'Videos',
            content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
    ];

    return (
        <div className="col-span-4 flex w-full flex-col">
            <Tabs
                aria-label="Dynamic tabs"
                classNames={{
                    tabList: 'grid md:flex grid-cols-2 flex-1',
                    // tabList: 'gap-6 w-full relative rounded-none p-0 border-b border-divider',
                    // cursor: 'w-full bg-[#22d3ee]',
                    tab: 'justify-start md:justify-center',
                    // tabContent: 'group-data-[selected=true]:text-[#06b6d4]',
                }}
                color="primary"
                // disableAnimation={true}
                items={tabs}
                variant="underlined"
            >
                {(item) => (
                    <Tab key={item.id} title={item.label}>
                        <p>{item.content}</p>
                    </Tab>
                )}
            </Tabs>
        </div>
    );
};
