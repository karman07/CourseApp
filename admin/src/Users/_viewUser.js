import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BASE_URL from '../Base/Base';

const initialcourseInfo = {
    name: '',
    description: '',
    price: 0,
    image: '',
    type: 0
}

function ViewCourse(props) {
    const [courseInfo, setcourseInfo] = useState(initialcourseInfo);

    useEffect(() => {
        fetchCourseData()
    }, []);

    const fetchCourseData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/users/` + props.userId);
            if (response) {
                console.log(response.data);
                setcourseInfo(response.data);
            }
            return
        }
        catch (e) {
            console.log(e)
        }
    }


    return (
        <div className='Course-view'>
            <div className='box'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>Full Name:</span>
                            <span>{courseInfo.name}</span>
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>Email:</span>
                            <span>{courseInfo.email}</span>
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>Courses:</span>
                            <span>{courseInfo.courses}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewCourse