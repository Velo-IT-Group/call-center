import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const baseHeaders = new Headers();
baseHeaders.set('clientId', process.env.CONNECT_WISE_CLIENT_ID!);
baseHeaders.set(
	'Authorization',
	'Basic ' + btoa(process.env.CONNECT_WISE_USERNAME! + ':' + process.env.CONNECT_WISE_PASSWORD!)
);
baseHeaders.set('Content-Type', 'application/json');
