import Link from 'next/link';
import Image from 'next/image';

import { Product } from '../model';

interface ProductCardProps {
	product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
	return (
		<div className='group relative'>
			<div className='w-full min-h-64 bg-gray-200  rounded-md overflow-hidden group-hover:opacity-75 lg:h-64 lg:aspect-none'>
				<Image
					src={product.image}
					alt={product.name}
					layout='responsive'
					width={1}
					height={1}
					className='w-full h-full object-center object-cover lg:w-full lg:h-full'
				/>
			</div>
			<div className='mt-4 flex justify-between'>
				<div>
					<h3 className='text-sm text-gray-700'>
						<Link href={`products/${product.slug}`} passHref>
							<a>
								<span aria-hidden='true' className='absolute inset-0' />
								{product.name}
							</a>
						</Link>
					</h3>
				</div>
				<p className='text-sm font-medium text-gray-900'>R$ {product.price}</p>
			</div>
		</div>
	);
};

export default ProductCard;
