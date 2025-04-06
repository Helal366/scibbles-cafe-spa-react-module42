import React, { useEffect, useState } from "react";
import "./Blogs.css";
import Blog from "../blog/Blog";
import { getFromLocalStorage } from "../../utilities/localStorage";

const Blogs = ({
  handleBookmark,
  handleRead,
  bookmarks,
  setBookmarks,
  markReads,
  setMarkReads,
}) => {
  const [blogs, setBlogs] = useState([]);
  const [isError, setIsError]=useState(null);
  const [isLoading, setIsLoading]=useState(true)
  useEffect(() => {
    const fetchData=async()=>{
      try{
        const response=await fetch('blogs.json');
        if(!response.ok){
          throw new Error('Response not ok');
        }
        const data= await response.json();
        setBlogs(data)
      }catch(error){
        setIsError(error.message)
      }finally{
        setIsLoading(false)
      }
    }
    fetchData()
  }, []);
  
  useEffect(() => {
    const storedBookmarksIds = getFromLocalStorage();
    const storedBookmarks = [];
    for (let id of storedBookmarksIds) {
      const bookmark = blogs.find((blog) => blog.id === id);
      if (bookmark) {
        const storedBookmarks2=[...storedBookmarks, bookmark];
        setBookmarks(storedBookmarks2);
      }
    }
    
    
  }, [blogs, setBookmarks]);

  return (
    <div>
          {isLoading && <h2>Loading....</h2>}
          {isError && <h2 className="text-red-500">{isError}</h2>}

      <h1 className="blogs-heading">Available Blogs: {blogs.length}</h1>
      <div className="grid grid-cols-2 gap-10 justify-evenly px-8 mx-auto">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleBookmark={handleBookmark}
            handleRead={handleRead}
            bookmarks={bookmarks}
            markReads={markReads}
            blogs={blogs}
            setMarkReads={setMarkReads}
          ></Blog>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
