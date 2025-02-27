'use client';

import React, { createContext, ReactNode } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchAbilities } from '@/actions';
import { AsyncContainer } from '@/lib/misc/AsyncContainer';

type AbilityType = Record<string, string[]>;

type AbilitiesContextType = {
    abilities: AbilityType;
    cancan: (action: string, resource: string) => boolean;
    refreshAbilities: () => Promise<void>;
};

export const AbilitiesContext = createContext<AbilitiesContextType | undefined>(undefined);

type AbilitiesProviderProps = {
    children: ReactNode;
};

export const AbilitiesProvider = ({ children }: AbilitiesProviderProps) => {
    const queryClient = useQueryClient();

    const { data: abilities, isLoading } = useQuery({
        queryKey: ['abilities'],
        queryFn: () => fetchAbilities(),
    });

    // Utility function to refresh abilities
    const refreshAbilities = async () => {
        await queryClient.invalidateQueries({ queryKey: ['abilities'] });
    };

    // Utility function to check abilities
    const cancan = (action: string, target: string): boolean => {
        const superAction = abilities?.data['manage'] || [];

        if (superAction?.includes(target) || superAction?.includes('all')) {
            return true;
        }

        const resources = abilities?.data[action] || [];

        return resources.includes(target) || resources.includes('all');
    };

    return (
        <AbilitiesContext.Provider value={{ abilities: abilities?.data, cancan, refreshAbilities }}>
            <AsyncContainer disableAutoLogout={true} error={abilities?.error} loading={isLoading}>
                {children}
            </AsyncContainer>
        </AbilitiesContext.Provider>
    );
};
