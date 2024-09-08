import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BASE_URL from '../Base/Base';

const initialcourseInfo = {
    id: '',
    name: '',
    price: 0,
    description: '',
    image: '',
    type: 0
}

function EditCourse(props) {
    const [courseInfo, setcourseInfo] = useState(initialcourseInfo);

    useEffect(() => {
        setcourseInfo({ ...courseInfo,id: props.CourseId})
        fetchCourseData();
    }, []);

    const fetchCourseData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/training/` + props.userId);
            if (response) {
                console.log(response)
                setcourseInfo(response.data);
            }
            return
        }
        catch (e) {
            console.log(e)
        }
    }

    const editExistCourse = async () => {
        try {
            const response = await axios.put(`${BASE_URL}/training/` + props.userId, courseInfo);
            if (response) {
                props.setUserEdited();
            }
        }
        catch (e) {
            console.log(e)
        }
    }


    return (
        <div className='Course-view _add-view'>
            <div className='box'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>Course Name:</span>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter Full Name'
                                value={courseInfo.name}
                                onChange={e => setcourseInfo({ ...courseInfo, name: e.target.value })}
                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>Type</span>
                            <input
                                type='number'
                                className='form-control'
                                placeholder='Enter Description'
                                value={courseInfo.type}
                                onChange={e => setcourseInfo({ ...courseInfo, type: e.target.value })}
                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>Price:</span>
                            <input
                                type='number'
                                className='form-control'
                                placeholder='Enter Price'
                                value={courseInfo.price}
                                onChange={e => setcourseInfo({ ...courseInfo, price: e.target.value })}
                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>Image Link </span>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter Phone Number'
                                value={courseInfo.image}
                                onChange={e => setcourseInfo({ ...courseInfo, image: e.target.value })}
                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-10'>
                        <p>
                            <span>Description</span>
                            <textarea
                                type='text'
                                className='form-control'
                                placeholder='Enter Website'
                                value={courseInfo.description}
                                onChange={e => setcourseInfo({ ...courseInfo, description: e.target.value })}
                            />
                        </p>
                    </div>

                </div>
            </div>
            <button className='btn btn-success' onClick={() => editExistCourse()}>Edit Course</button>
        </div>
    )
}

export default EditCourse