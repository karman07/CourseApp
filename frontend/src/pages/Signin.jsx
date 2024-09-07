import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signin = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const navigate = useNavigate();

	const handleSubmit = async () => {
		// Basic form validation
		if (!email || !password) {
			setError('All fields are required');
			return;
		}

		setError(null);
		setSuccess(null);
		setLoading(true);

		try {
			const response = await axios.post(
				`http://localhost:3000/api/users/login`,
				{
					email,
					password,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			localStorage.setItem('token', response.data.token);
			localStorage.setItem('name', response.data.user.name);
			localStorage.setItem('email', response.data.user.email);
			setSuccess('Login successful!');
			navigate('/courses');
			window.location.reload();
		} catch (err) {
			setError('An error occurred. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='h-[100vh] bg-gray-100'>
			<div className='bg-gray-100 text-gray-900 flex justify-center'>
				<div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
					<div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
						<div className='flex flex-col items-center'>
							<h1 className='text-2xl xl:text-3xl font-extrabold'>
								Login
							</h1>
							<div className='w-full flex-1 mt-8'>
								<div className='mx-auto max-w-xs'>
									<form method='POST'>
										<input
											className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
											type='email'
											placeholder='Email'
											value={email}
											onChange={(e) =>
												setEmail(e.target.value)
											}
										/>
										<input
											className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
											type='password'
											placeholder='Password'
											value={password}
											onChange={(e) =>
												setPassword(e.target.value)
											}
										/>
										{error && (
											<p className='text-red-500 text-center mt-2'>
												{error}
											</p>
										)}
										{success && (
											<p className='text-green-500 text-center mt-2'>
												{success}
											</p>
										)}
										<button
											type='submit'
											className={`mt-5 tracking-wide font-semibold ${
												loading
													? 'bg-gray-400 cursor-not-allowed'
													: 'bg-indigo-500 hover:bg-indigo-700'
											} text-gray-100 w-full py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
											onClick={handleSubmit}
											disabled={loading}
										>
											{loading ? (
												<svg
													className='w-6 h-6 mr-3 animate-spin'
													fill='none'
													stroke='currentColor'
													strokeWidth='2'
													strokeLinecap='round'
													strokeLinejoin='round'
												>
													<circle
														cx='12'
														cy='12'
														r='10'
														stroke='currentColor'
														strokeWidth='4'
														fill='none'
													/>
												</svg>
											) : (
												<>
													<svg
														className='w-6 h-6 -ml-2'
														fill='none'
														stroke='currentColor'
														strokeWidth='2'
														strokeLinecap='round'
														strokeLinejoin='round'
													>
														<path d='M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2' />
														<circle
															cx='8.5'
															cy='7'
															r='4'
														/>
														<path d='M20 8v6M23 11h-6' />
													</svg>
													<span className='ml-3'>
														Log In
													</span>
												</>
											)}
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Signin;
