'use client';
import { useEffect, useState } from 'react';
import { CardHeader, CardTitle } from '../ui/card';
import { Rocket, SquareArrowOutUpRight, X } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import WorkerSelector from '@/app/(user)/worker-selector';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { toast } from 'sonner';
import { useRecoilValue } from 'recoil';
import { callStateAtom } from '@/atoms/twilioStateAtom';

const ActiveCallHeader = ({ attributes }: { attributes: any }) => {
	const activeCall = useRecoilValue(callStateAtom);
	const [seconds, setSeconds] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [hours, setHours] = useState(0);
	const intialDate = new Date();

	useEffect(() => {
		const interval = setInterval(() => {
			const time = new Date().getTime() - intialDate.getTime();

			const m = Math.floor((time / 1000 / 60) % 60);
			const h = Math.floor((time / (1000 * 60 * 60)) % 24);
			const s = Math.floor((time / 1000) % 60);

			setHours(h);
			setMinutes(m);
			setSeconds(s);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<CardHeader className='flex-row items-center justify-between p-3 gap-3 border-b space-y-0'>
			<CardTitle className='space-x-1.5 flex items-center'>
				<Rocket className='inline-block text-yellow-400' />

				<span className='text-sm font-normal'>Customer support</span>

				<span className='text-xs text-muted-foreground tabular-nums'>
					{hours > 0 && `${String(hours).padStart(2, '0')}:`}
					{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
				</span>
			</CardTitle>

			<div className='flex items-center gap-1.5'>
				<Link href={`/conversations/attributes?.sid}`}>
					<Button
						variant='ghost'
						size='icon'
						className='p-0 w-8 h-8'
					>
						<SquareArrowOutUpRight className='text-muted-foreground' />
					</Button>
				</Link>

				<WorkerSelector />

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant='ghost'
							size='smIcon'
							className='p-0'
							onClick={() => toast.dismiss(attributes.conference)}
						>
							<X />
						</Button>
					</TooltipTrigger>

					<TooltipContent>Dismiss</TooltipContent>
				</Tooltip>
			</div>
		</CardHeader>
	);
};

export default ActiveCallHeader;
