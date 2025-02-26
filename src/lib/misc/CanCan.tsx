import React, { ReactNode } from 'react';

import { useAbilities } from '@/hooks/useAbility';

type CanCanProps = {
    action: 'read' | 'create' | 'update' | 'delete'; // The action to check, e.g., 'manage' or 'read'
    target: string; // The resource to check, e.g., 'User' or 'APIKey'
    children: ReactNode; // The content to render if permission is granted
};

export const CanCan: React.FC<CanCanProps> = ({ action, target, children }) => {
    const { cancan } = useAbilities();

    if (!cancan(action, target)) {
        return null;
    }

    return <>{children}</>;
};
