'use client';

import { useState } from 'react';
import { Button } from '@nextui-org/button';

export const Counter = () => {
    const [count, _setCount] = useState(0);

    const handleClick = async () => {
        try {
            const response = await fetch('/api/github');
            const data = await response.json();

            alert(`User data: ${JSON.stringify(data)}`);
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <Button radius="full" onPress={handleClick}>
            Count is {count}
        </Button>
    );
};
