import { Fragment, ReactElement } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';
import { Popover, Transition } from '@headlessui/react';
import { RiArrowDropUpLine, RiLock2Line } from 'react-icons/ri';

import AppLayout from '../../../layouts/app';
import { NextPageWithLayout } from '../../_app';

import { Product } from '../../../model';

import api from '../../../services/api';

interface OrderProps {
	product: Product;
}

const Order: NextPageWithLayout<OrderProps> = ({ product }) => {
	return (
		<>
			<Head>
				<title>Checkout – Code Bank Store</title>
			</Head>

			<div>
				<div className='relative grid grid-cols-1 gap-x-16 max-w-7xl mx-auto lg:px-8 lg:grid-cols-2 xl:gap-x-48'>
					<h1 className='sr-only'>Informações do pedido</h1>

					<section
						aria-labelledby='summary-heading'
						className='bg-gray-50 pt-16 pb-10 px-4 sm:px-6 lg:px-0 lg:pb-16 lg:bg-transparent lg:row-start-1 lg:col-start-2'
					>
						<div className='max-w-lg mx-auto lg:max-w-none'>
							<h2
								id='summary-heading'
								className='text-lg font-medium text-gray-900'
							>
								Resumo do pedido
							</h2>

							<ul
								role='list'
								className='text-sm font-medium text-gray-900 divide-y divide-gray-200'
							>
								<li
									key={product.id}
									className='flex items-start py-6 space-x-4'
								>
									<div className='flex-none w-20 h-20'>
										<Image
											src={product.image}
											alt={product.name}
											layout='responsive'
											width={1}
											height={1}
											className='rounded-md object-center object-cover'
										/>
									</div>
									<div className='flex-auto space-y-1'>
										<h3>{product.name}</h3>
									</div>
									<p className='flex-none text-base font-medium'>
										R$ {product.price}
									</p>
								</li>
							</ul>

							<dl className='hidden text-sm font-medium text-gray-900 space-y-6 border-t border-gray-200 pt-6 lg:block'>
								<div className='flex items-center justify-between'>
									<dt className='text-gray-600'>Subtotal</dt>
									<dd>R$ {product.price}</dd>
								</div>

								<div className='flex items-center justify-between'>
									<dt className='text-gray-600'>Frete</dt>
									<dd>R$ 0,00</dd>
								</div>

								<div className='flex items-center justify-between border-t border-gray-200 pt-6'>
									<dt className='text-base'>Total</dt>
									<dd className='text-base'>R$ {product.price}</dd>
								</div>
							</dl>

							<Popover className='fixed bottom-0 inset-x-0 flex flex-col-reverse text-sm font-medium text-gray-900 lg:hidden'>
								<div className='relative z-10 bg-white border-t border-gray-200 px-4 sm:px-6'>
									<div className='max-w-lg mx-auto'>
										<Popover.Button className='w-full flex items-center py-6 font-medium'>
											<span className='text-base mr-auto'>Total</span>
											<span className='text-base mr-2'>R$ {product.price}</span>
											<RiArrowDropUpLine
												className='w-5 h-5 text-gray-500'
												aria-hidden='true'
											/>
										</Popover.Button>
									</div>
								</div>

								<Transition.Root as={Fragment}>
									<div>
										<Transition.Child
											as={Fragment}
											enter='transition-opacity ease-linear duration-300'
											enterFrom='opacity-0'
											enterTo='opacity-100'
											leave='transition-opacity ease-linear duration-300'
											leaveFrom='opacity-100'
											leaveTo='opacity-0'
										>
											<Popover.Overlay className='fixed inset-0 bg-black bg-opacity-25' />
										</Transition.Child>

										<Transition.Child
											as={Fragment}
											enter='transition ease-in-out duration-300 transform'
											enterFrom='translate-y-full'
											enterTo='translate-y-0'
											leave='transition ease-in-out duration-300 transform'
											leaveFrom='translate-y-0'
											leaveTo='translate-y-full'
										>
											<Popover.Panel className='relative bg-white px-4 py-6 sm:px-6'>
												<dl className='max-w-lg mx-auto space-y-6'>
													<div className='flex items-center justify-between'>
														<dt className='text-gray-600'>Subtotal</dt>
														<dd>R$ {product.price}</dd>
													</div>

													<div className='flex items-center justify-between'>
														<dt className='text-gray-600'>Frete</dt>
														<dd>R$ 0,00</dd>
													</div>
												</dl>
											</Popover.Panel>
										</Transition.Child>
									</div>
								</Transition.Root>
							</Popover>
						</div>
					</section>

					<form className='pt-2 pb-36 px-4 sm:px-6 lg:pb-16 lg:px-0 lg:row-start-1 lg:col-start-1'>
						<div className='max-w-lg mx-auto lg:max-w-none'>
							<section aria-labelledby='payment-heading' className='mt-10'>
								<h2
									id='payment-heading'
									className='text-lg font-medium text-gray-900'
								>
									Detalhes do pagamento
								</h2>

								<div className='mt-6 grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-4'>
									<div className='col-span-3 sm:col-span-4'>
										<label
											htmlFor='name-on-card'
											className='block text-sm font-medium text-gray-700'
										>
											Nome no cartão
										</label>
										<div className='mt-1'>
											<input
												type='text'
												id='name-on-card'
												name='name-on-card'
												autoComplete='cc-name'
												className='default-input'
												required
											/>
										</div>
									</div>

									<div className='col-span-3 sm:col-span-4'>
										<label
											htmlFor='card-number'
											className='block text-sm font-medium text-gray-700'
										>
											Número do cartão
										</label>
										<div className='mt-1'>
											<input
												type='text'
												id='card-number'
												name='card-number'
												autoComplete='cc-number'
												className='default-input'
												placeholder='•••• •••• •••• ••••'
												maxLength={14}
												required
											/>
										</div>
									</div>

									<div className='col-start-1'>
										<label
											htmlFor='exp_month'
											className='block text-sm font-medium text-gray-700'
										>
											Mês
										</label>
										<div className='mt-1'>
											<input
												type='text'
												name='exp_month'
												id='exp_month'
												autoComplete='exp_month'
												className='default-input'
												placeholder='MM'
												maxLength={2}
												required
											/>
										</div>
									</div>

									<div>
										<label
											htmlFor='exp_year'
											className='block text-sm font-medium text-gray-700'
										>
											Ano
										</label>
										<div className='mt-1'>
											<input
												type='text'
												name='exp_year'
												id='exp_year'
												autoComplete='exp_year'
												className='default-input'
												placeholder='AA'
												maxLength={2}
												required
											/>
										</div>
									</div>

									<div className='lg:col-end-5'>
										<label
											htmlFor='cvc'
											className='block text-sm font-medium text-gray-700'
										>
											CVV
										</label>
										<div className='mt-1'>
											<input
												type='text'
												name='cvc'
												id='cvc'
												autoComplete='cvc'
												className='default-input'
												placeholder='CVV'
												maxLength={4}
												required
											/>
										</div>
									</div>
								</div>
							</section>

							<div className='mt-10 pt-6 border-t border-gray-200 sm:flex sm:items-center sm:justify-between'>
								<button
									type='submit'
									className='w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:ml-6 sm:order-last sm:w-auto'
								>
									Pagar
								</button>

								<p className='flex justify-center items-center text-sm font-medium text-gray-500 pt-8 sm:pt-0'>
									<RiLock2Line
										className='w-5 h-5 text-gray-400 mr-1.5'
										aria-hidden='true'
									/>
									Suas informações estão seguras
								</p>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

Order.getLayout = function getLayout(page: ReactElement) {
	return <AppLayout>{page}</AppLayout>;
};

export default Order;

export const getServerSideProps: GetServerSideProps<OrderProps> = async (
	context,
) => {
	try {
		const { slug } = context.params!;

		const { data: product } = await api.get(`products/${slug}`);

		return {
			props: {
				product,
			},
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
