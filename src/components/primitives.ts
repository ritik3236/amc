import { tv } from 'tailwind-variants';

export const title = tv({
    base: 'inline-block font-semibold !leading-tight tracking-tight',
    variants: {
        color: {
            violet: 'from-[#FF1CF7] to-[#b249f8]',
            yellow: 'from-[#FF705B] to-[#FFB457]',
            blue: 'from-[#5EA2EF] to-[#0072F5]',
            cyan: 'from-[#00b7fa] to-[#01cfea]',
            green: 'from-[#6FEE8D] to-[#17c964]',
            pink: 'from-[#FF72E1] to-[#F54C7A]',
            foreground: 'dark:from-[#FFFFFF] dark:to-[#4B4B4B]',
        },
        size: {
            xs: 'text-2xl lg:text-3xl',
            sm: 'text-3xl lg:text-4xl',
            md: 'text-[2.3rem] lg:text-5xl ',
            lg: 'text-4xl lg:text-6xl',
        },
        fullWidth: {
            true: 'block w-full',
        },
    },
    defaultVariants: {
        size: 'md',
    },
    compoundVariants: [
        {
            color: [
                'violet',
                'yellow',
                'blue',
                'cyan',
                'green',
                'pink',
                'foreground',
            ],
            class: 'bg-gradient-to-b bg-clip-text text-transparent',
        },
    ],
});

export const subtitle = tv({
    base: 'text-sm font-semibold text-default-900',
    variants: {
        size: {
            xs: 'text-sm',
            sm: 'text-sm lg:text-base',
            md: 'text-base lg:text-lg',
            lg: 'text-lg lg:text-xl',
            base: 'text-base',
        },
    },
    defaultVariants: {
        size: 'md',
    },
});

export const description = tv({
    base: 'my-2 block w-full text-default-500',
    variants: {
        size: {
            xs: 'text-sm',
            sm: 'text-sm lg:text-base',
            md: 'text-base lg:text-lg',
            lg: 'text-lg lg:text-xl',
        },
    },
    defaultVariants: {
        size: 'sm',
    },
});

export const link = tv({
    slots: {
        base: 'group relative inline-flex  items-center gap-2 text-medium outline-none transition-opacity hover:opacity-80 active:opacity-disabled',
        icon: 'transition-all group-hover:translate-x-1',
    },
    variants: {
        type: {
            solid: 'rounded-full px-6 py-3',
            outline: 'rounded-full border px-6 py-3',
            tab: 'border-b-2 border-transparent p-4 opacity-100 transition-none hover:border-default-800 hover:text-default-800',
        },
        color: {
            primary: 'text-primary',
            default: 'text-default-500',
        },
        size: {
            xs: 'text-sm',
            sm: 'text-sm lg:text-base',
            md: 'text-base lg:text-lg',
            lg: 'text-lg lg:text-xl',
            base: 'text-base',
        },
        active: {
            true: 'text-primary',
        },
    },
    compoundVariants: [
        {
            type: 'solid',
            color: 'primary',
            class: 'bg-primary text-white',
        },
        {
            type: 'outline',
            color: 'primary',
            class: 'border-primary text-primary',
        },
        {
            type: 'tab',
            active: true,
            class: 'border-primary hover:border-primary-600 hover:text-primary-600 hover:opacity-100',
        },
    ],
    defaultVariants: {
        color: 'primary',
    },
});
