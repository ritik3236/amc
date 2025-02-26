import { useMemo } from 'react';
import { clsx, dataAttr } from '@heroui/shared-utils';
import { HTMLHeroUIProps } from '@heroui/system';

import { ValueTypes } from './use-input-otp';

interface InputOtpSegmentProps extends HTMLHeroUIProps<'div'> {
    otplength: number;
    accessorIndex: number;
    value: string;
    isInputFocused: boolean;
    className?: string;
    classNames?: ValueTypes['classNames'];
    slots: ValueTypes['slots'];
}

export const InputOtpSegment = ({
    otplength,
    accessorIndex,
    value,
    isInputFocused,
    className,
    classNames,
    slots,
}: InputOtpSegmentProps) => {
    const isActive = useMemo(
        () =>
            (value.length == accessorIndex ||
                (value.length == otplength && accessorIndex == otplength - 1)) &&
            isInputFocused,
        [value, isInputFocused]
    );
    const hasValue = useMemo(() => value.length > accessorIndex, [value, accessorIndex]);

    const segmentStyles = clsx(className, classNames?.segment);
    const caretStyles = clsx(className, classNames?.caret);

    const displayValue = useMemo(() => {
        if (hasValue) {
            return value[accessorIndex];
        }
        if (isActive) {
            return <div className={clsx(slots.caret?.({ class: caretStyles }))}/>;
        }

        return null;
    }, [hasValue, value, isActive]);

    return (
        <div
            className={clsx(slots.segment?.({ class: segmentStyles }))}
            data-active={dataAttr(isActive)}
            data-has-value={dataAttr(hasValue)}
            data-slot="segment"
        >
            {displayValue}
        </div>
    );
};
