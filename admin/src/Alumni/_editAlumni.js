import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BASE_URL from '../Base/Base';

const initialcourseInfo = {
    id: '',
    name: '',
    package: '',
    batch: '',
    image: '',
    company: ''
}

function EditCourse(props) {
    const [courseInfo, setcourseInfo] = useState(initialcourseInfo);

    useEffect(() => {
        setcourseInfo({ ...courseInfo,id: props.CourseId})
        fetchCourseData();
    }, []);

    const fetchCourseData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/alumni/` + props.userId);
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
            const response = await axios.put(`${BASE_URL}/alumni/` + props.userId, courseInfo);
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
                            <span>Alumni Name:</span>
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
                            <span>Package</span>
                            <input
                                type='string'
                                className='form-control'
                                placeholder='Enter Package here ...'
                                value={courseInfo.package}
                                onChange={e => setcourseInfo({ ...courseInfo, package: e.target.value })}
                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>Batch:</span>
                            <input
                                type='number'
                                className='form-control'
                                placeholder='Enter Price'
                                value={courseInfo.batch}
                                onChange={e => setcourseInfo({ ...courseInfo, batch: e.target.value })}
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
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>Company</span>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter Website'
                                value={courseInfo.company}
                                onChange={e => setcourseInfo({ ...courseInfo, company: e.target.value })}
                            />
                        </p>
                    </div>

                </div>
            </div>
            <button className='btn btn-success' onClick={() => editExistCourse()}>Edit Alumni</button>
        </div>
    )
}

export default EditCourse