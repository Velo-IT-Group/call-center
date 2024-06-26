import { DataItem, Overview } from './overview';
import { Call } from './history/page';
import { groupBy } from 'lodash';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableCell, TableHeader, TableRow } from '@/components/ui/table';

export default async function Home() {
	const myHeaders = new Headers();
	myHeaders.append(
		'Authorization',
		`Basic ${btoa(`${process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID}:${process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN}`)}`
	);

	const requestOptions: RequestInit = {
		method: 'GET',
		headers: myHeaders,
	};

	const inboundResponse = await fetch(
		`https://api.twilio.com/2010-04-01/Accounts/${process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID}/Calls.json?To=client:nblack_40velomethod_2Ecom&PageSize=10`,
		requestOptions
	);

	const { calls: inboundCalls }: { calls: Call[] } = await inboundResponse.json();

	const groupedMonths = groupBy(
		inboundCalls.sort((a, b) => new Date(a.date_created).getUTCSeconds() - new Date(b.date_created).getUTCSeconds()),
		({ date_created }) => new Date(date_created).getDay()
	);

	const data: DataItem[] = Object.entries(groupedMonths).map(([key, value]) => {
		const date = new Date(value[0].date_created);

		return {
			name: Intl.DateTimeFormat('en-US').format(date),
			value: value.length,
		};
	});

	return (
		<main className='grid grid-cols-3 gap-3 p-3'>
			<Card>
				<CardHeader>
					<CardTitle className='text-xs font-medium'>Horses</CardTitle>
				</CardHeader>

				<CardContent>
					<p className='text-xl'>12</p>
				</CardContent>
			</Card>

			<div className='bg-yellow-300 rounded-lg'></div>

			<div className='bg-yellow-300 rounded-lg'></div>

			<Card className='bg-secondary col-span-2'>
				<CardHeader className='justify-between items-center flex-row space-y-0'>
					<CardTitle>Calls</CardTitle>

					<Select defaultValue='lastYear'>
						<SelectTrigger>
							<SelectValue placeholder='Select range' />
						</SelectTrigger>

						<SelectContent>
							<SelectItem value='lastYear'>Last year</SelectItem>
						</SelectContent>
					</Select>
				</CardHeader>

				<CardContent className='bg-card rounded-lg'>
					<Overview data={data} />
				</CardContent>
			</Card>

			<div className='bg-yellow-300 rounded-lg'></div>

			<Card className='col-span-3'>
				<CardHeader className='p-3'>
					<CardTitle className='text-base'>Call History</CardTitle>
				</CardHeader>

				<CardContent className='px-3'>
					<Table>
						<TableHeader>
							<TableRow>
								<TableCell>
									<span>Hey</span>
								</TableCell>
							</TableRow>
						</TableHeader>
					</Table>
				</CardContent>
			</Card>
		</main>
	);
}
