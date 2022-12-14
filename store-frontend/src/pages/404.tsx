import Link from 'next/link';

const Page404 = () => {
	return (
		<div className='min-h-full pt-16 pb-12 flex flex-col bg-white h-screen'>
			<main className='flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='py-16'>
					<div className='text-center'>
						<p className='text-sm font-semibold text-indigo-600 uppercase tracking-wide'>
							erro 404
						</p>
						<h1 className='mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl'>
							Página não encontrada
						</h1>
						<p className='mt-2 text-base text-gray-500'>
							A página que você está procurando não existe ou não está
							disponível no momento.
						</p>
						<div className='mt-6'>
							<Link href='/'>
								<a className='text-base font-medium text-indigo-600 hover:text-indigo-500'>
									Ir para a loja<span aria-hidden='true'> &rarr;</span>
								</a>
							</Link>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Page404;
