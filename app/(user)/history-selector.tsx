'use client';
import { History, PhoneIncoming, PhoneOutgoing } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { CallInstance } from 'twilio/lib/rest/api/v2010/account/call';
import { groupBy } from 'lodash';

type Props = {
	calls: CallInstance[];
};

const HistorySelector = ({ calls }: Props) => {
	const groupedCalls = groupBy(calls, ({ dateCreated }) =>
		Intl.DateTimeFormat('en-US', { dateStyle: 'short' }).format(dateCreated)
	);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant='ghost'
					role='combobox'
					className='justify-between'
				>
					<History />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='min-w-52 p-0'>
				<Command>
					<CommandInput placeholder='Filter calls' />
					<CommandEmpty>No framework found.</CommandEmpty>
					<CommandList>
						{Object?.entries(groupedCalls).map(([key, calls], index) => (
							<div key={`${key}-separator`}>
								{index !== 0 && <CommandSeparator key={`${key}-seperator`} />}
								<CommandGroup
									key={key}
									heading={key}
								>
									{calls?.map((call) => (
										<CommandItem
											key={call.sid}
											value={call.sid}
											onSelect={(currentValue) => {
												// const call =
												// setValue(value && currentValue === value ? '' : currentValue);
												// setOpen(false);
											}}
										>
											{call.direction === 'outbound' ? (
												<PhoneOutgoing className='mr-1.5 text-red-500' />
											) : (
												<PhoneIncoming className='mr-1.5 text-green-500' />
											)}
											<span className='text-muted-foreground'>
												{call.direction === 'outbound' ? call.toFormatted : call.fromFormatted} (
												{Intl.DateTimeFormat('en-US', { timeStyle: 'short' }).format(new Date(call.dateCreated))})
											</span>
										</CommandItem>
									))}
								</CommandGroup>
							</div>
						))}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default HistorySelector;
