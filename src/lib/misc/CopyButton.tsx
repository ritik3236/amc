'use client';

import React from 'react';
import { Snippet } from '@heroui/snippet';

interface OwnProps {
    text: string;
}

export const YukiCopyButton: React.FC<OwnProps> = (props) => {
    return (
        <Snippet
            hideSymbol
            classNames={{ pre: 'pl-1 break-all whitespace-normal' }}
            size="sm"
        >
            {window.location.origin + '/pay/' + props.text}
        </Snippet>
    );

};
