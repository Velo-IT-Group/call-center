'use client';
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import { getStatuses } from '@/lib/manage/read';
import { ReferenceType } from '@/types/manage';
import { CircleDashed } from 'lucide-react';
import React, { useEffect, useState } from 'react';

type Props = {
	board?: ReferenceType;
	status?: ReferenceType;
};

const StatusSelector = ({ board, status }: Props) => {
	const [statuses, setStatuses] = useState<ReferenceType[] | undefined>();
	const [selectedStatus, setSelectedStatus] = useState<ReferenceType | undefined>(status);

	useEffect(() => {
		if (!board) return;
		getStatuses(board.id).then(setStatuses);
	}, [status]);

	return (
		<Combobox
			items={
				statuses?.map(({ id, name }) => {
					return { label: name, value: `${id}-${name}` };
				}) ?? []
			}
			value={`${selectedStatus?.id}-${selectedStatus?.name}`}
			setValue={(e) => {
				let id = Number(e.toString().split('-')[0]);
				let name = e.toString().split('-')[1];
				setSelectedStatus({ id, name });
			}}
			placeholder='Filter statuses...'
			side='left'
			align='start'
		>
			<Button
				size='sm'
				variant='ghost'
				className='flex'
			>
				<CircleDashed className='mr-1.5' />
				<span className='text-xs text-muted-foreground'>{selectedStatus?.name}</span>
			</Button>
		</Combobox>
	);
};

export default StatusSelector;
