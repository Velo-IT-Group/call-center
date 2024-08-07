import React from 'react';
import Properties from './properties';
import { getTicket, getTicketNotes } from '@/lib/manage/read';
import { Separator } from '@/components/ui/separator';
import ActivityFeed from './activity-feed';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';

type Props = {
	params: { id: string };
};

export default async function Page({ params }: Props) {
	const [ticket, notes] = await Promise.all([getTicket(Number(params.id)), getTicketNotes(Number(params.id))]);

	const initalNote = notes.find((note) => note.detailDescriptionFlag);

	return (
		<main className='grid grid-cols-[1fr_280px] items-start gap-3 h-full bg-muted/15'>
			<ScrollArea className='grid min-h-0 h-full'>
				<div className='max-w-3xl w-full mx-auto py-10 grid items-start space-y-1.5'>
					<Textarea
						name='summary'
						defaultValue={ticket.summary}
						className='border-none text-2xl font-semibold focus-visible:ring-0 shadow-none resize-none'
					/>

					<Textarea
						placeholder='Add a comment...'
						className='border-none shadow-none resize-none'
						defaultValue={initalNote?.text}
						minRows={3}
					/>

					<Separator />

					<ActivityFeed id={Number(params.id)} />
				</div>
			</ScrollArea>

			<div className='border-l h-full'>
				<Properties ticket={ticket} />
			</div>
		</main>
	);
}
