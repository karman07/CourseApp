import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BASE_URL from '../Base/Base';

const initialcourseInfo = {
    name: '',
    batch: '',
    company:'',
    image: '',
    package: ''
}

function ViewCourse(props) {
    const [courseInfo, setcourseInfo] = useState(initialcourseInfo);

    useEffect(() => {
        fetchCourseData()
    }, []);

    const fetchCourseData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/alumni/` + props.userId);
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
                            <span>Batch :</span>
                            <span>{courseInfo.batch}</span>
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>Company:</span>
                            <span>{courseInfo.company}</span>
                        </p>
                    </div>
                    <div className='col-sm-50 col-md-6'>
                        <p>
                            <span>Image:</span>
                            <span>{courseInfo.image}</span>
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>Package:</span>
                            <span>{courseInfo.package}</span>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ViewCourse