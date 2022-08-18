import { ReactElement } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next/types';

import AppLayout from '../layouts/app';
import { NextPageWithLayout } from './_app';

import api from '../services/api';
import { Product } from '../model';

import ProductCard from '../components/ProductCard';

interface Props {
	products: Product[];
}

const Home: NextPageWithLayout<Props> = ({ products }) => {
	return (
		<>
			<Head>
				<title>Code Bank Store</title>
			</Head>

			<div className='bg-white'>
				<div className='max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
					<h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>
						Mais vendidos
					</h2>

					<div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
						{products.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
				</div>
			</div>
		</>
	);
};

Home.getLayout = function getLayout(page: ReactElement) {
	return <AppLayout>{page}</AppLayout>;
};

export default Home;

export const getServerSideProps: GetServerSideProps<Props> = async (
	context,
) => {
	const { data: products } = await api.get('products');

	return {
		props: {
			products,
		},
	};
};
