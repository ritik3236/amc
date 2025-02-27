'use client';

import React, { memo, ReactNode, useCallback } from 'react';

import { Chip } from '@heroui/chip';

import { Icons } from '@/components/icons';
import { luxon } from '@/lib/localeDate';

interface CsvHeader {
    key: string;
    label: string;
    formatter?: (value: any) => string;
}

interface OwnProps {
    data: any[];
    headers?: CsvHeader[];
    filename?: string;
    filenameWithoutDate?: boolean;
    children?: ReactNode;
    className?: string;
    separator?: string;
    enclosingCharacter?: string;
    skipHeader?: boolean;
}

const escapeValue = (value: unknown, enclosingCharacter: string): string => {
    if (value === null || value === undefined) return '';

    const stringValue = String(value);
    const escaped = stringValue.replace(
        new RegExp(enclosingCharacter, 'g'),
        `${enclosingCharacter}${enclosingCharacter}`
    );

    return `${enclosingCharacter}${escaped}${enclosingCharacter}`;
};

const getHeaders = (data: any[], headers?: CsvHeader[]): CsvHeader[] => {
    if (headers) return headers;
    if (data.length === 0) return [];

    return Object.keys(data[0]).map((key) => ({
        key: key,
        label: key,
    }));
};

const getFileName = (fileName = 'export', withDate = true): string => {
    if (withDate) {
        return `${fileName}_${luxon.now().toFormat('yyyyMMdd-HHmmss')}.csv`;
    }

    return `${fileName}.csv`;
};

export const CsvExporter: React.FC<OwnProps> = memo((props: OwnProps) => {
    const {
        data,
        headers,
        filename,
        children,
        filenameWithoutDate,
        className = '',
        separator = ',',
        enclosingCharacter = '"',
        skipHeader = false,
    } = props;

    const convertToCSV = useCallback(() => {
        if (data.length === 0) return 'no data';

        const effectiveHeaders = getHeaders(data, headers);
        const csvRows: string[] = [];

        // Add header row
        if (!skipHeader) {
            const headerRow = effectiveHeaders
                .map((header) => escapeValue(header.label, enclosingCharacter))
                .join(separator);

            csvRows.push(headerRow);
        }

        // Add data rows
        data.forEach((item) => {
            const row = effectiveHeaders
                .map((header) => {
                    const value = item[header.key];

                    return escapeValue(header.formatter ? header.formatter(value) : value, enclosingCharacter);
                })
                .join(separator);

            csvRows.push(row);
        });

        return csvRows.join('\n');
    }, [data, headers, skipHeader, separator, enclosingCharacter]);

    const handleDownload = useCallback(() => {
        const csvContent = convertToCSV();
        const name = getFileName(filename, !filenameWithoutDate);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.href = url;
        link.setAttribute('download', name);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, [convertToCSV, filename, filenameWithoutDate]);

    return (
        <button className={className} type="button" onClick={handleDownload}>
            {children || <Chip endContent={<Icons.download/>} radius="sm" size="sm" variant="flat">
                Export
            </Chip>}
        </button>
    );
});
