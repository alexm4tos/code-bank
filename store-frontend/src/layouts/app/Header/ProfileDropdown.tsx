import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

interface ProfileDropdownProps {
	imageUrl: string;
	navigation: {
		name: string;
		href: string;
	}[];
}

const ProfileDropdown = ({ imageUrl, navigation }: ProfileDropdownProps) => {
	return (
		<Menu as='div' className='flex-shrink-0 relative ml-4'>
			<div>
				<Menu.Button className='bg-gray-800 rounded-full flex text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
					<span className='sr-only'>Open user menu</span>
					<img className='h-8 w-8 rounded-full' src={imageUrl} alt='' />
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter='transition ease-out duration-100'
				enterFrom='transform opacity-0 scale-95'
				enterTo='transform opacity-100 scale-100'
				leave='transition ease-in duration-75'
				leaveFrom='transform opacity-100 scale-100'
				leaveTo='transform opacity-0 scale-95'
			>
				<Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none'>
					{navigation.map((item) => (
						<Menu.Item key={item.name}>
							{({ active }) => (
								<a
									href={item.href}
									className={`${
										active ? 'bg-gray-100' : ''
									} block py-2 px-4 text-sm text-gray-700`}
								>
									{item.name}
								</a>
							)}
						</Menu.Item>
					))}
				</Menu.Items>
			</Transition>
		</Menu>
	);
};

export default ProfileDropdown;
