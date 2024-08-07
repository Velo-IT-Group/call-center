'use client';

import { PlusCircle, X } from 'lucide-react';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from './view-options';

import { DataTableFacetedFilter } from './faceted-filter';
import { Suspense, useEffect, useState } from 'react';
import { getPriorities, getStatuses } from '@/lib/manage/read';
import { BoardStatus, Priority } from '@/types/manage';
import { Skeleton } from '../skeleton';
import AsyncSelector, { Identifiable } from '@/components/async-selector';

export interface FacetedFilter<TData> {
	accessoryKey: keyof TData;
	items: Identifiable[];
}
interface DataTableToolbarProps<TData> {
	table: Table<TData>;
	facetedFilters?: FacetedFilter<TData>[];
}

export function DataTableToolbar<TData>({ table, facetedFilters }: DataTableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0;

	return (
		<div className='flex items-center justify-between'>
			<div className='flex flex-1 items-center space-x-2'>
				{table.options?.meta?.filterKey && (
					<Input
						placeholder='Filter...'
						value={(table.getColumn(table.options?.meta?.filterKey as string)?.getFilterValue() as string) ?? ''}
						onChange={(event) =>
							table.getColumn(table.options?.meta?.filterKey as string)?.setFilterValue(event.target.value)
						}
						className='h-8 w-[150px] lg:w-[250px]'
					/>
				)}

				{facetedFilters?.map(({ accessoryKey, items }) => (
					<>
						{table.getColumn(accessoryKey as string) && (
							<DataTableFacetedFilter
								column={table.getColumn(accessoryKey as string)}
								title={accessoryKey.toString()}
								options={items.map(({ name, id }) => {
									return { label: name, value: String(id) };
								})}
							/>
						)}
					</>
				))}

				{isFiltered && (
					<Button
						variant='ghost'
						onClick={() => table.resetColumnFilters()}
						className='h-8 px-2 lg:px-3'
					>
						Reset
						<X className='ml-2 h-4 w-4' />
					</Button>
				)}
			</div>
			<DataTableViewOptions table={table} />
		</div>
	);
}
