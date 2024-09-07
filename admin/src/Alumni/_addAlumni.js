import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BASE_URL from '../Base/Base';

const initialcourseInfo = {
    name: '',
    package: '',
    image: '',
    company:'',
    batch: '',
}

function AddCourse(props) {
    const [courseInfo, setcourseInfo] = useState(initialcourseInfo);

    useEffect(() => {
    }, []);

    const addNewCourse = async()=>{
        try{
            const response = await axios.post(`${BASE_URL}/alumni/`,courseInfo);
            if(response){
                props.setCourseAdded();
            }
        }
        catch (e){
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
                                placeholder='Enter Course Name ...'
                                value={courseInfo.name}
                                onChange={e=>setcourseInfo({...courseInfo,name:e.target.value})}
                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>Company:</span>
                            <input 
                                type='String' 
                                className='form-control' 
                                placeholder='Enter Company ...'
                                value={courseInfo.company}
                                onChange={e=>setcourseInfo({...courseInfo,company:e.target.value})}
                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>Image Link:</span>
                            <input 
                                type='text' 
                                className='form-control' 
                                placeholder='Enter Image Address'
                                value={courseInfo.image}
                                onChange={e=>setcourseInfo({...courseInfo,image:e.target.value})}
                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>Package</span>
                            <input 
                                type='text' 
                                className='form-control' 
                                placeholder='Enter Package here ...'
                                value={courseInfo.package}
                                onChange={e=>setcourseInfo({...courseInfo,package:e.target.value})}
                            />
                        </p>
                    </div>
                    <div className='col-sm-30 col-md-50'>
                        <p>
                            <span>Batch</span>
                            <textarea
                                type='text' 
                                className='form-control' 
                                placeholder='Write Batch here'
                                value={courseInfo.batch}
                                onChange={e=>setcourseInfo({...courseInfo,batch:e.target.value})}
                            />
                        </p>
                    </div>

                </div>
            </div>

            <button className='btn btn-success' onClick={()=>addNewCourse()}>Add New Alumni</button>
        </div>
    )
}

export default AddCourse