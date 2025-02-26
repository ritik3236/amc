'use client';

import React, { useCallback, useMemo } from 'react';

import { Button } from '@heroui/button';
import { Chip } from '@heroui/chip';
import { Snippet } from '@heroui/snippet';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/table';
import { SlotsToClasses, TableSlots } from '@heroui/theme';

import { toast } from 'sonner';

import { Icons } from '@/components/icons';
import { getStatusLabelAndColor } from '@/lib/constant';
import { localeDate } from '@/lib/localeDate';
import { CanCan } from '@/lib/misc/CanCan';
import { CryptoIcon } from '@/lib/misc/CryptoIcon';
import { cn, fnCapitalize, numberFormatter, truncateText } from '@/lib/utils';

export const TableColumnTypeInterface = ['index', 'action', 'currency', 'date', 'datetime', 'email', 'address', 'id', 'link', 'number', 'side', 'status', 'text', 'cta'] as const;

export type TableColumnInterface<T = any> = {
    key: T | string;
    type: typeof TableColumnTypeInterface[number]
    label: string;
    options?: {
        capitalize?: boolean;
        copyable?: boolean;
        linked_column?: string;
        searchValue?: string;
        target?: string;
        uppercase?: boolean;
        withCurrency?: boolean;
        truncate?: { length: number, direction: 'end' | 'middle' }
    };
};

export interface OwnProps {
    columns: TableColumnInterface[];
    mainKey?: string;
    tableData: any[];
    topComponent?: React.ReactNode;
    bottomComponent?: React.ReactNode;
    asDataTable?: boolean;

    onCopyClick?: (data: any) => void;
    onEditClick?: (data: any) => void;
    onLinkClick?: (data: any) => void;
    onDeleteClick?: (data: any) => void;
    onTableRowClick?: (data: any) => void;
}

export const YukiTable: React.FC<OwnProps> = (props) => {
    const {
        mainKey = 'id',
        columns,
        tableData,
        topComponent,
        bottomComponent,

        asDataTable,

        onDeleteClick,
        onCopyClick,
        onLinkClick,
        onEditClick,
        onTableRowClick,
    } = props;

    const classNames: SlotsToClasses<TableSlots> = useMemo(() => ({
        base: 'overflow-auto bg-background',
        th: ['bg-default-100', 'text-default-500'],
        thead: 'backdrop-blur-lg [&>tr]:!shadow-none',
        tr: ['hover:bg-default-100', 'transition-colors'],
    }), []);

    const renderCell = useCallback((data: any, column: TableColumnInterface) => {
        const cellValue = data[column.key];
        const truncateOptions = column?.options?.truncate;
        const uppercase = column?.options?.uppercase;
        const target = column?.options?.target;
        const capitalize = column?.options?.capitalize;
        const linkedColumn = column?.options?.linked_column;
        const searchValue = column?.options?.searchValue;
        const truncatedText = truncateOptions ? truncateText(cellValue, truncateOptions.length, truncateOptions.direction) : cellValue;

        switch (column.type) {
            case 'index':
                return (
                    <div className="flex items-center gap-1">
                        <span className="font-medium">{cellValue}</span>
                    </div>
                );
            case 'id':
                return (
                    <div className="flex items-center gap-1">
                        <span className="font-medium">{cellValue}</span>
                        <Snippet
                            classNames={{
                                pre: 'hidden',
                                copyButton: 'text-medium text-default-400',
                                base: 'p-0 bg-transparent',
                            }}
                            codeString={cellValue}
                            disableTooltip={true}
                            hideSymbol={true}
                            size="sm"
                            variant="flat"
                            onCopy={() => toast.info('Copied to clipboard!')}
                        />
                    </div>
                );
            case 'number':
                return (
                    <span className="flex items-baseline gap-1">
                        {numberFormatter(cellValue)}
                        <span className="text-xs uppercase text-default-500">
                            {column.options?.withCurrency && data[linkedColumn]}
                        </span>
                    </span>
                );
            case 'currency':
                return (
                    <span className="flex items-center gap-2 uppercase">
                        <CryptoIcon code={cellValue as string} size={20}/> {cellValue}
                    </span>
                );
            case 'side':
                const [sideLabel, sideColor] = getStatusLabelAndColor(cellValue);

                return (
                    <Chip
                        color={sideColor}
                        size="sm"
                        variant="light"
                    >
                        <span className="font-semibold">{fnCapitalize(sideLabel)}</span>
                    </Chip>
                );
            case 'status':
                const [label, color] = getStatusLabelAndColor(cellValue);

                return (
                    <Chip
                        color={color}
                        size="sm"
                        variant="flat"
                    >
                        {fnCapitalize(label)}
                    </Chip>
                );
            case 'datetime':
                return (
                    <span className="whitespace-nowrap">{localeDate(cellValue, 'fullDate')}</span>
                );
            case 'text':
                return (
                    <span className={cn({ 'capitalize': capitalize, 'uppercase': uppercase })} title={cellValue}>
                        {truncatedText}
                    </span>
                );
            case 'address':
                if (!linkedColumn || !data[linkedColumn]) return truncatedText;

                const href = data[linkedColumn].replace(searchValue, cellValue);

                return (
                    <a className="text-primary underline" href={href} target="_blank" title={cellValue}>
                        {truncatedText}
                    </a>
                );

            case 'action':
                return (
                    <div className="flex items-center gap-2">
                        {onCopyClick && <Button
                            aria-label="Copy"
                            isIconOnly={true}
                            size="sm"
                            title="Copy"
                            variant="light"
                            onPress={() => onCopyClick(data)}
                        >
                            <Icons.clipboard className="text-default-500" size={16}/>
                        </Button>}
                        {onLinkClick && <Button
                            aria-label="Link"
                            isIconOnly={true}
                            size="sm"
                            variant="light"
                            onPress={() => onLinkClick(data)}
                        >
                            <Icons.link className="text-blue-500" size={16}/>
                        </Button>}
                        {onEditClick && <CanCan action="update" target={target}>
                            <Button
                                aria-label="Edit"
                                isIconOnly={true}
                                size="sm"
                                variant="light"
                                onPress={() => onEditClick(data)}
                            >
                                <Icons.plus className="text-default-500" size={16}/>
                            </Button>
                        </CanCan>}
                        {onDeleteClick && <CanCan action="delete" target={target}>
                            <Button
                                aria-label="Delete"
                                isIconOnly={true}
                                size="sm"
                                variant="light"
                                onPress={() => onDeleteClick(data)}
                            >
                                <Icons.trash className="text-danger" size={16}/>
                            </Button>
                        </CanCan>}
                    </div>
                );
            default:
                return cellValue;
        }
    }, [onCopyClick, onDeleteClick, onEditClick, onLinkClick]);

    if (asDataTable) {
        if (!tableData.length) {
            return null;
        }

        return (
            <section>
                {columns.map((columnKey) => (
                    <dl key={columnKey.label}
                        className="grid grid-cols-1 text-base/6 font-medium sm:grid-cols-6 sm:text-sm/6">
                        <dt className="col-span-2 border-b border-default-200 py-2.5 text-default-500">{columnKey.label}</dt>
                        <dd className="col-span-4 border-b border-default-200 py-2.5">
                            {!!columnKey.key && [null, undefined, ''].includes(tableData[0]?.[columnKey.key]) ? '-' : renderCell(tableData[0], columnKey)}
                        </dd>
                    </dl>
                ))}
            </section>
        );
    }

    return (
        <section aria-label="Payment List" className="flex size-full flex-col">
            {topComponent}
            <Table
                isHeaderSticky
                removeWrapper
                aria-label="Example static collection table"
                classNames={classNames}
                onRowAction={onTableRowClick}
            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.key}>
                            {column.label}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent="No rows to display." items={tableData}>
                    {(item) => (
                        <TableRow key={item[mainKey]} className={cn({ 'cursor-pointer': !!onTableRowClick })}>
                            {columns.map((columnKey) => (
                                <TableCell key={columnKey.key}>
                                    {!!columnKey.key && [null, undefined, ''].includes(item[columnKey.key]) ? '-' : renderCell(item, columnKey)}
                                </TableCell>
                            ))}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {bottomComponent}
        </section>
    );
};
