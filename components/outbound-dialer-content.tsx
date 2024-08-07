'use client';
import React, { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { PopoverContent } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LabeledInput from './ui/labeled-input';
import WorkerSelect from './worker-select';
import { PhoneInput } from './phone-input';
import { useWorker } from '@/providers/worker-provider';

type Props = {
	numbers: { phoneNumber: string; friendlyName: string }[];
};

const OutboundDialerContent = ({ numbers }: Props) => {
	const { worker } = useWorker();

	return (
		<PopoverContent align='end'>
			<form
				// action={makeOutboundCall}
				onSubmit={async (e) => {
					e.preventDefault();
					var data = new FormData(e.currentTarget);

					console.log(data);

					if (!worker) return;
					const to = data.get('phoneNumber') as string;
					const from = data.get('from') as string;
					const workflowSid = data.get('from') as string;
					const taskQueueSid = data.get('from') as string;
					console.log(data);
					await worker.createTask(
						'+19015988651',
						'+18449402678',
						'WW497b90bc1703176f6845c09c8bf4fa8a',
						'WQee659e96340b3899ad1fad7578fe6515',
						{
							attributes: {
								direction: 'outboundDial',
							},
						}
					);
				}}
				className='space-y-3'
			>
				<PhoneInput name='phoneNumber' />

				<Separator />

				<LabeledInput
					label='Caller ID'
					name='from'
					id='from'
				>
					<Select
						name='from'
						defaultValue={numbers.length ? numbers[0].phoneNumber : undefined}
					>
						<SelectTrigger>
							<SelectValue placeholder='Select caller id...' />
						</SelectTrigger>

						<SelectContent>
							{numbers?.map((number) => (
								<SelectItem
									key={number.phoneNumber}
									value={number.phoneNumber}
								>
									{number.friendlyName}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</LabeledInput>

				<Separator />

				<LabeledInput label='Agent'>
					<Suspense>
						<WorkerSelect />
					</Suspense>
				</LabeledInput>

				<Button className='w-full space-x-1.5'>
					<Phone className='w-3.5 h-3.5' /> <span>Call</span>
				</Button>
			</form>
		</PopoverContent>
	);
};

export default OutboundDialerContent;
