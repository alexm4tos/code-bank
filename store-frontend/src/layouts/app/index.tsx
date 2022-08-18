import Header from './Header';

interface AppLayoutProps {
	children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
	return (
		<>
			<Header />

			{children}
		</>
	);
};

export default AppLayout;
