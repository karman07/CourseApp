import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
	const truncateText = (text, maxLength) => {
		if (text.length <= maxLength) return text;
		return text.slice(0, maxLength) + '...';
	};

	return (
		<>
			<div className='max-w-screen-md mx-auto p-5 mt-20'>
				<div className='text-center mb-16'>
					<h3 className='text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900'>
						Your <span className='text-indigo-600'>Enrollments</span>
					</h3>
				</div>
				<Link to='/'>
					<div className='max-w-sm bg-white mx-auto rounded-xl overflow-hidden md:max-w-2xl border mb-2 hover:shadow-md transition-all duration-200'>
						<div className=' md:flex'>
							<div>
								<img
									className='h-48 w-full md:h-full md:w-48 object-cover'
									src='https://images.pexels.com/photos/1261820/pexels-photo-1261820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
									alt=''
								/>
							</div>
							<div className='p-8'>
								<div className='tracking-wide text-lg text-indigo-500 font-semibold'>
									Course 1
								</div>
								<p className='mt-1 block text-sm font-medium text-black'>
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Illum, fugit.
								</p>
							</div>
						</div>
					</div>
				</Link>
			</div>
		</>
	);
};

export default Dashboard;
