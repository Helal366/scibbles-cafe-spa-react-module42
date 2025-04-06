import React, { useEffect, useState } from 'react';
import './Blogs.css';
import Blog from '../blog/Blog';
import { getFromLocalStorage} from '../../utilities/localStorage';

const Blogs = ({handleBookmark, handleRead, bookmarks, setBookmarks, markReads, setMarkReads}) => {
    const [blogs, setBlogs]=useState([]);
      useEffect(()=>{
        fetch('blogs.json')
        .then(res=>res.json())
        .then(data=>setBlogs(data))
        .catch(error=>{
          console.error(error.message)
        })
      }, []);

      useEffect(()=>{
        const storedBookmarksIds=getFromLocalStorage();
          const storedBookmarks=[];
          for(let id of storedBookmarksIds){
            const bookmark=blogs.find(blog=>blog.id===id);
            if(bookmark){
              storedBookmarks.push(bookmark);
            }
          }
          setBookmarks(storedBookmarks);
      },[blogs])
      

    return (
        <div>
            <h1 className='blogs-heading'>Available Blogs: {blogs.length}</h1>
            <div className='grid grid-cols-2 gap-10 justify-evenly px-8 mx-auto'>
            {
              blogs.map((blog)=>  <Blog key={blog.id} blog={blog}
              handleBookmark={handleBookmark}
              handleRead={handleRead}
              bookmarks={bookmarks}
              markReads={markReads}
              blogs={blogs}
              setMarkReads={setMarkReads}></Blog> )
            }
            </div>
        </div>
    );
};

export default Blogs;