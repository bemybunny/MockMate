import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [meet, setMeet] = useState([]);
  const [authUser, setAuthUser] = useState(null);

  // Function to fetch authenticated user details
  const fetchAuthUser = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/users/authUser', {
        headers: {
          'auth-token': localStorage.getItem('auth-token'),
          'Content-Type': 'application/json',
        },
      });
      setAuthUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  // Function to fetch user data for the "meet" list
  const fetchUser = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/users/getUser');
      setMeet(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

    const handleRequest=async( id)=>{
     
      try{
        const response =  await axios.post('http://localhost:4000/api/users/handleRequest',{id:id},{
          headers: {
            'auth-token': localStorage.getItem('auth-token'),
            'Content-Type': 'application/json',
          },
        });
        fetchUser();
    }catch(err){
      console.log(err);
    }
  }

  const handlebackRequest=async( id)=>{
     
    try{
      const response =  await axios.post('http://localhost:4000/api/users/handlebackRequest',{id:id},{
        headers: {
          'auth-token': localStorage.getItem('auth-token'),
          'Content-Type': 'application/json',
        },
      });
      fetchUser();
  }catch(err){
    console.log(err);
  }
}
  // Check authentication token and navigate if not present
  useEffect(() => {
    if (localStorage.getItem('auth-token') === null) {
      navigate('/login');
    } else {
      fetchAuthUser();
      fetchUser();
    }
  }, [navigate]);

  useEffect(() => {
    if (authUser) {
      console.log('authUser:', authUser); // Log after authUser state is set
    }
  }, [authUser]);

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
        {meet.map((e, index) => (
          <div key={index}>
            <div className="grid grid-cols-4 gap-8 items-center py-2 text-gray-200 text-sm font-medium">
              <p>{e.name}</p>
              <p>{e.college}</p>
              <p>{e.techStack}</p>
              {authUser && authUser.request && authUser.request.includes(e._id) ? (
                <p onClick={()=>handlebackRequest(e._id)} className="cursor-pointer w-24 bg-gray-500 p-2 text-center rounded-xl">Pending</p>
              ) : (
                <> <p onClick={()=>handleRequest(e._id)} className="cursor-pointer w-24 bg-purple-500 p-2 text-center rounded-xl">Request</p> </>
              )}
            </div>
            <hr className="h-1 bg-gray-200 border-0" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
