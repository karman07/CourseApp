import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BASE_URL from '../Base/Base';

const initialcourseInfo = {
    name: '',
    price: '',
    image: '',
    type:'',
    description: '',
}

function AddCourse(props) {
    const [courseInfo, setcourseInfo] = useState(initialcourseInfo);

    useEffect(() => {
    }, []);

    const addNewCourse = async()=>{
        try{
            const response = await axios.post(`${BASE_URL}/training/`,courseInfo);
            if(response){
                props.setUserAdded();
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
                            <span>Couse Name:</span>
                            <input 
                                type='text' 
                                className='form-control' 
                                placeholder='Enter Training Name ...'
                                value={courseInfo.name}
                                onChange={e=>setcourseInfo({...courseInfo,name:e.target.value})}
                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>Price:</span>
                            <input 
                                type='Number' 
                                className='form-control' 
                                placeholder='Enter Price ...'
                                value={courseInfo.price}
                                onChange={e=>setcourseInfo({...courseInfo,price:e.target.value})}
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
                            <span>Enter Type</span>
                            <input 
                                type='text' 
                                className='form-control' 
                                placeholder='Enter Type here ...'
                                value={courseInfo.type}
                                onChange={e=>setcourseInfo({...courseInfo,type:e.target.value})}
                            />
                        </p>
                    </div>
                    <div className='col-sm-30 col-md-50'>
                        <p>
                            <span>Description</span>
                            <textarea
                                type='text' 
                                className='form-control' 
                                placeholder='Write Description here'
                                value={courseInfo.description}
                                onChange={e=>setcourseInfo({...courseInfo,description:e.target.value})}
                            />
                        </p>
                    </div>

                </div>
            </div>

            <button className='btn btn-success' onClick={()=>addNewCourse()}>Add New Training</button>
        </div>
    )
}

export default AddCourse