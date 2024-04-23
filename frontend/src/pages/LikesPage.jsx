import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { FaHeart } from "react-icons/fa";
import { formatDate } from '../utils/functions';

const LikesPage = () => {

  const [likes, setLikes] = useState([]);


  useEffect(() => {
    const sss = async () => {

      try {
        const res = await fetch("/api/users/likes", { credentials: "include" });
        const data = res.json();
        if (data.error) throw new Error(data.error);
        setLikes[data];
      } catch (error) {
        toast.error(error.message);
      }

    };
    getLikes();

  },[]);

  return (
    <div className='overflow-x-auto shadow-md rounded-lg px-4'>
      <table className='w-full text-sm text-left rtl:text-right bg-glass divide-y divide-gray-200'>
        <thead className='text-xs uppercase bg-glass'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              No
            </th>
            <th scope='col' className='px-6 py-3'>
              Username
            </th>
            <th scope='col' className='px-6 py-3'>
              Date
            </th>
            <th scope='col' className='px-6 py-3'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {likes.map((like,idx)=>(
          <tr className='bg-glass border-b' key={user.username}>
            <td className='px-6 py-4'>
              <span>{idx+1}</span>
            </td>
            <td className='flex items-center px-6 py-4 whitespace-nowrap sm:flex-col sm:items-start'>
              <div className="flex flex-col sm:flex-row">
                <img
                  className='w-10 h-10 rounded-full sm:mr-4'
                  src='https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'
                  alt='Jese image'
                />
                <span className='text-base font-semibold'>{user.username}</span>
              </div>
            </td>
            <td className='px-6 py-4'>{formatDate(user.likedDate)}</td>
            <td className='px-6 py-4'>
              <div className='flex items-center'>
                <FaHeart size={22} className='text-red-500 mr-2' />
                <span>Liked your profile</span>
              </div>
            </td>
          </tr>
        ))}
          
        </tbody>
      </table>
    </div>
  )
}

export default LikesPage
