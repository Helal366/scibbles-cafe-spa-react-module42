import React, { useEffect, useState } from 'react';
import './Blogs.css';
import Blog from '../blog/Blog';

const Blogs = ({handleBookmark, handleRead, bookmarks, markReads}) => {
    const [blogs, setBlogs]=useState([]);
      useEffect(()=>{
        fetch('blogs.json')
        .then(res=>res.json())
        .then(data=>setBlogs(data))
        .catch(error=>{
          console.error(error.message)
        })
      }, []);

    return (
        <div>
            <h1 className='blogs-heading'>Available Blogs: {blogs.length}</h1>
            <div className='grid grid-cols-2 gap-10 justify-evenly px-8 mx-auto'>
            {
              blogs.map((blog)=>  <Blog key={blog.id} blog={blog}
              handleBookmark={handleBookmark}
              handleRead={handleRead}
              bookmarks={bookmarks}
              markReads={markReads}></Blog> )
            }
            </div>
        </div>
    );
};

export default Blogs;