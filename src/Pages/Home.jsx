import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [meet, setMeet] = useState([]);

  const fetchUser = async () => {
    try {
      const data = await axios.get('http://localhost:4000/api/users/getUser')
      console.log(data);
      setMeet(data.data.data);
      console.log(meet);
    } catch (err) {
      console.log(err);
    }

  }
  useEffect(() => {
    fetchUser();
  }, [])

  useEffect(()=>{
    if(localStorage.getItem('auth-token')===null){
      navigate('/login');
    }
  },[]);

  return (
    <div className="px-24 py-12 space-y-8">
      <div className="flex flex-col items-center justify-center">
      <input className="p-2 w-64 rounded mb-4" placeholder="Search Mate here ..." />
      </div>
     
      <div>
        <div className="grid grid-cols-4 gap-8 items-center py-2 text-gray-200 text-sm font-semibold">
          <p>Name</p>
          <p>College</p>
          <p>Techstack</p>
          <p>Request</p>
        </div>
        <hr className="h-1 bg-gray-200 border-0" />
        {meet.map((e, index) => {
          return (
            <div key={index}>
              <div className="grid grid-cols-4 gap-8 items-center py-2 text-gray-200 text-sm font-medium">
                <p>{e.name}</p>
                <p>{e.college}</p>
                <p>{e.techStack}</p>
                <p className="w-24 bg-purple-500 p-2 text-center rounded-xl">Request</p>
              </div>
              <hr className="h-1 bg-gray-200 border-0" />
            </div>
          )
        })}
      </div>

    </div>

  )
}

export default Home
