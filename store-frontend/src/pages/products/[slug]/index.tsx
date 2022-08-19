import { ReactElement } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';

import AppLayout from '../../../layouts/app';
import { NextPageWithLayout } from '../../_app';

import { Product } from '../../../model';

import api from '../../../services/api';

interface ProductDetailProps {
	product: Product;
}

const ProductDetail: NextPageWithLayout<ProductDetailProps> = ({ product }) => {
	const title = `${product.name} – Code Bank Store`;

	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>

			<div className='bg-white'>
				<div className='mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
					<div className='lg:grid lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16'>
						<div className='lg:row-end-1 lg:col-span-4'>
							<div className='rounded-lg bg-gray-100 overflow-hidden'>
								<Image
									src={product.image}
									alt={product.name}
									layout='responsive'
									width={1}
									height={1}
									className='object-center object-cover'
								/>
							</div>
						</div>

						<div className='max-w-2xl mx-auto mt-14 sm:mt-16 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3'>
							<div className='mt-4'>
								<h1 className='text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl'>
									{product.name}
								</h1>

								<h2 id='information-heading' className='sr-only'>
									Informações do produto
								</h2>
								<p className='text-sm text-gray-500 mt-2'>
									Código do produto: {product.id}
								</p>
							</div>

							<p className='text-gray-500 mt-6'>{product.description}</p>

							<div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2'>
								<Link href={`/products/${product.slug}/order`}>
									<a className='w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500'>
										Comprar por R$ {product.price}
									</a>
								</Link>
								<button
									type='button'
									disabled
									className='w-full bg-indigo-50 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 disabled:bg-indigo-50 disabled:text-indigo-700'
								>
									Adicionar ao carrinho
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

ProductDetail.getLayout = function getLayout(page: ReactElement) {
	return <AppLayout>{page}</AppLayout>;
};

export default ProductDetail;

export const getStaticProps: GetStaticProps<ProductDetailProps> = async (
	context,
) => {
	try {
		const { slug } = context.params!;

		const { data: product } = await api.get(`products/${slug}`);

		return {
			props: {
				product,
			},
			revalidate: 1 * 60 * 2,
		};
	} catch (error) {
		if (axios.isAxiosError(error) && error.response?.status === 404) {
			return {
				notFound: true,
			};
		}

		throw error;
	}
};

export const getStaticPaths: GetStaticPaths = async (context) => {
	const { data: products } = await api.get(`products`);

	const paths = products.map((product: Product) => ({
		params: {
			slug: product.slug,
		},
	}));

	return { paths, fallback: 'blocking' };
};
