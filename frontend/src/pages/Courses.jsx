import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../config.js';

const Courses = () => {
	const [courses, setCourses] = useState([]);

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const response = await axios.get(`${BASE_URL}/api/courses`);
				setCourses(response.data);
				console.log('Courses: ', response.data);
			} catch (err) {
				console.error(err);
			}
		};
		fetchCourses();
	}, []);

	const truncateText = (text, maxLength) => {
		if (text.length <= maxLength) return text;
		return text.slice(0, maxLength) + '...';
	};

	return (
		<>
			<div className='container my-12 mx-auto px-4 md:px-12'>
				<div className='flex flex-wrap -mx-1 lg:-mx-4'>
					{courses?.map((course) => {
						return (
							<div
								className='my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3'
								key={course._id}
							>
								<article className='overflow-hidden rounded-lg shadow-lg'>
									<img
										alt='Placeholder'
										className='block h-auto w-full'
										src={course.image}
									/>

									<header className='flex items-center justify-between leading-tight p-2 md:p-4'>
										<h1 className='text-lg'>
											<Link
												className='text-black underline'
												to={`/courseDetail/${course._id}`}
											>
												{course.name}
											</Link>
										</h1>
										<p className='text-grey-darker text-sm'>
											₹{course.price}
										</p>
									</header>
									<div className='p-2 md:p-4 !pt-0'>
										<Link
											to={`/courseDetail/${course._id}`}
										>
											<button
												type='button'
												className='px-4 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white'
											>
												Learn More
											</button>
										</Link>
									</div>
									{/* <footer className='flex items-center justify-between leading-none pb-2 md:pb-4 !pl-2'>
										<p className='ml-2 text-sm'>
											{truncateText(
												course.description,
												120
											)}
										</p>
									</footer> */}
								</article>
							</div>
						);
					})}
					{!courses ||
						(courses?.length === 0 && (
							<div className='text-center w-full'>
								<p className='text-xl'>No courses found!</p>
							</div>
						))}
				</div>
			</div>
		</>
	);
};

export default Courses;
