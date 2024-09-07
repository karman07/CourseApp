import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../config.js';

const PurchaseCourse = () => {
	const { id } = useParams();
	const [course, setCourse] = useState(null);
	const [name, setName] = useState(localStorage.getItem('name'));
	const [email, setEmail] = useState(localStorage.getItem('email'));
	const [phone, setPhone] = useState();
	const [profession, setProfession] = useState('');
	const [address, setAddress] = useState('');

	useEffect(() => {
		const fetchCourse = async () => {
			try {
				const response = await axios.get(
					`${BASE_URL}/api/courses/${id}`
				);
				setCourse(response.data);
			} catch (err) {
				console.error(err);
			}
		};
		fetchCourse();
	}, [id]);

	useEffect(() => {
		const fetchTraining = async () => {
			try {
				const response = await axios.get(
					`${BASE_URL}/api/training/${id}`
				);
				setCourse(response.data);
			} catch (err) {
				console.error(err);
			}
		}
		fetchTraining();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
	}

	return (
		<>
			<div className='max-w-screen-md mx-auto p-5 mt-20'>
				<div className='text-center mb-16'>
					<h3 className='text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900'>
						Enroll <span className='text-indigo-600'>Now</span>
					</h3>
				</div>
				{course && (
					<div className='bg-gray-100 p-4 rounded-lg mb-6'>
						<h4 className='text-xl font-semibold'>
							{course?.name}
						</h4>
						<p>Price: ₹{course?.price || 999}</p>
					</div>
				)}
				<form className='w-full' method='POST'>
					<div className='flex flex-wrap -mx-3 mb-6'>
						<div className='w-full md:w-1/2 px-3'>
							<label
								className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
								htmlFor='name'
							>
								Name
							</label>
							<input
								className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
								id='name'
								type='text'
								placeholder=''
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</div>
						<div className='w-full md:w-1/2 px-3'>
							<label
								className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
								htmlFor='email'
							>
								Email
							</label>
							<input
								className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
								id='email'
								type='email'
								placeholder=''
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
					</div>
					<div className='flex flex-wrap -mx-3 mb-6'>
						<div className='w-full md:w-1/2 px-3'>
							<label
								className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
								htmlFor='phone'
							>
								Phone Number
							</label>
							<input
								className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
								id='phone'
								type='number'
								placeholder=''
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								required
							/>
						</div>
						<div className='w-full md:w-1/2 px-3'>
							<label
								className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
								htmlFor='profession'
							>
								Profession
							</label>
							<input
								className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
								id='profession'
								type='text'
								placeholder=''
								value={profession}
								onChange={(e) => setProfession(e.target.value)}
								required
							/>
						</div>
					</div>
					<div className='flex flex-wrap -mx-3'>
						<div className='w-full px-3'>
							<label
								className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
								htmlFor='address'
							>
								Shipping Address
							</label>
							<input
								className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
								id='address'
								type='text'
								placeholder=''
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								required
							/>
						</div>
					</div>
					<div className='flex flex-wrap -mx-3'>
						<div className='flex justify-between w-full px-3'>
							<button
								className='shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded'
								onClick={handleSubmit}
							>
								Submit
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};

export default PurchaseCourse;
