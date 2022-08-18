import { Disclosure } from '@headlessui/react';
import { RiCloseFill, RiMenuLine } from 'react-icons/ri';

interface MobileMenuButtonProps {
	open?: boolean;
}

const MobileMenuButton = ({ open = false }: MobileMenuButtonProps) => {
	return (
		<Disclosure.Button className='rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
			<span className='sr-only'>Open menu</span>
			{open ? (
				<RiCloseFill className='block h-6 w-6' aria-hidden='true' />
			) : (
				<RiMenuLine className='block h-6 w-6' aria-hidden='true' />
			)}
		</Disclosure.Button>
	);
};

export default MobileMenuButton;
