import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Training from './pages/Training';
import TrainingDetail from './pages/TrainingDetail';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Profile from './pages/Profile';

const App = () => {
	const [token, setToken] = useState(localStorage.getItem('token') || '');

	return (
		<>
			<Router>
				<Navbar token={token} setToken={setToken} />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/courses' element={<Courses />} />
					<Route
						path='/courseDetail/:id'
						element={<CourseDetail />}
					/>
					<Route path='/trainings' element={<Training />} />
					<Route
						path='/trainingDetail/:id'
						element={<TrainingDetail />}
					/>
					<Route path='/signup' element={<Signup />} />
					<Route path='/signin' element={<Signin />} />
					<Route path='/profile' element={<Profile />} />
				</Routes>
			</Router>
		</>
	);
};

export default App;
