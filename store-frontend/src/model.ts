import { StaticImageData } from 'next/image';

export interface Product {
	id: string;
	name: string;
	description: string;
	image: string | StaticImageData;
	slug: string;
	price: number;
	created_at: string;
}
