import { Disclosure } from '@headlessui/react';
import { RiNotification4Line, RiSearchLine } from 'react-icons/ri';
import Image from 'next/image';
import Link from 'next/link';

import MobileMenuButton from './MobileMenuButton';
import ProfileDropdown from './ProfileDropdown';

import logoImg from '../../../../public/assets/logo-store.png';
import logoMobileImg from '../../../../public/assets/logo-image.png';

const user = {
	name: 'Alex Matos',
	email: 'contato@alex.net.br',
	imageUrl: 'http://github.com/alexm4tos.png',
};

const navigation = [
	{ name: 'Acessórios', href: '/', current: false },
	{ name: 'Calçados', href: '/', current: false },
	{ name: 'Cosméticos', href: '/', current: false },
	{ name: 'Eletrônicos', href: '/', current: false },
];

const userNavigation = [
	{ name: 'Seu perfil', href: '#' },
	{ name: 'Configurações', href: '#' },
	{ name: 'Sair', href: '#' },
];

const Header = () => {
	return (
		<Disclosure as='header' className='bg-gray-800'>
			{({ open }) => (
				<>
					<div className='max-w-7xl mx-auto px-2 sm:px-4 lg:divide-y lg:divide-gray-700 lg:px-8'>
						<div className='relative h-16 flex justify-between'>
							<div className='relative z-10 px-2 flex lg:px-0'>
								<div className='flex-shrink-0 flex items-center'>
									<Link href={'/'} passHref>
										<span className='hidden lg:block relative w-48 h-14 cursor-pointer'>
											<Image
												src={logoImg}
												alt='code bank'
												layout='fill'
												objectFit='cover'
												className='block h-8 w-auto'
											/>
										</span>
									</Link>

									<Link href={'/'} passHref>
										<span className='block lg:hidden relative w-12 h-12 cursor-pointer'>
											<Image
												src={logoMobileImg}
												alt='code bank'
												layout='fill'
												objectFit='cover'
												className='block h-8 w-auto'
											/>
										</span>
									</Link>
								</div>
							</div>
							<div className='relative z-0 flex-1 px-2 flex items-center justify-center sm:absolute sm:inset-0'>
								<div className='w-full sm:max-w-xs'>
									<label htmlFor='search' className='sr-only'>
										Pesquisar
									</label>
									<div className='relative'>
										<div className='pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center'>
											<RiSearchLine
												className='h-5 w-5 text-gray-400'
												aria-hidden='true'
											/>
										</div>
										<input
											id='search'
											name='search'
											className='block w-full bg-gray-700 border border-transparent rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 focus:placeholder-gray-500 sm:text-sm'
											placeholder='Pesquisar'
											type='search'
										/>
									</div>
								</div>
							</div>
							<div className='relative z-10 flex items-center lg:hidden'>
								<MobileMenuButton open={open} />
							</div>
							<div className='hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center'>
								<button
									type='button'
									className='bg-gray-800 flex-shrink-0 rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
								>
									<span className='sr-only'>View notifications</span>
									<RiNotification4Line className='h-6 w-6' aria-hidden='true' />
								</button>

								<ProfileDropdown
									imageUrl={user.imageUrl}
									navigation={userNavigation}
								/>
							</div>
						</div>
						<nav
							className='hidden lg:py-2 lg:flex lg:space-x-8 lg:justify-center'
							aria-label='Global'
						>
							{navigation.map((item) => (
								<Link key={item.name} href={item.href}>
									<a
										className={`${
											item.current
												? 'bg-gray-900 text-white'
												: 'text-gray-300 hover:bg-gray-700 hover:text-white'
										} rounded-md py-2 px-3 inline-flex items-center text-sm font-medium`}
										aria-current={item.current ? 'page' : undefined}
									>
										{item.name}
									</a>
								</Link>
							))}
						</nav>
					</div>

					<Disclosure.Panel as='nav' className='lg:hidden' aria-label='Global'>
						<div className='pt-2 pb-3 px-2 space-y-1'>
							{navigation.map((item) => (
								<Disclosure.Button
									key={item.name}
									as='a'
									href={item.href}
									className={`${
										item.current
											? 'bg-gray-900 text-white'
											: 'text-gray-300 hover:bg-gray-700 hover:text-white'
									} block rounded-md py-2 px-3 text-base font-medium`}
									aria-current={item.current ? 'page' : undefined}
								>
									{item.name}
								</Disclosure.Button>
							))}
						</div>
						<div className='border-t border-gray-700 pt-4 pb-3'>
							<div className='px-4 flex items-center'>
								<div className='flex-shrink-0'>
									<img
										className='h-10 w-10 rounded-full'
										src={user.imageUrl}
										alt=''
									/>
								</div>
								<div className='ml-3'>
									<div className='text-base font-medium text-white'>
										{user.name}
									</div>
									<div className='text-sm font-medium text-gray-400'>
										{user.email}
									</div>
								</div>
								<button
									type='button'
									className='ml-auto flex-shrink-0 bg-gray-800 rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
								>
									<span className='sr-only'>View notifications</span>
									<RiNotification4Line className='h-6 w-6' aria-hidden='true' />
								</button>
							</div>
							<div className='mt-3 px-2 space-y-1'>
								{userNavigation.map((item) => (
									<Disclosure.Button
										key={item.name}
										as='a'
										href={item.href}
										className='block rounded-md py-2 px-3 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white'
									>
										{item.name}
									</Disclosure.Button>
								))}
							</div>
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
};

export default Header;
