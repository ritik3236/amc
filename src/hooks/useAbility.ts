import { useContext } from 'react';

import { AbilitiesContext } from '@/lib/providers/abilityProvider';

export const useAbilities = () => {
    const context = useContext(AbilitiesContext);

    if (!context) {
        throw new Error('useAbilities must be used within an AbilitiesProvider');
    }

    return context;
};
