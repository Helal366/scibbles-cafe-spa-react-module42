import React from "react";
import { FaBookmark } from "react-icons/fa";
import './Blog.css';

const Blog = ({ blog, handleBookmark, handleRead, bookmarks, markReads }) => {
  const { cover, author, author_img, hashtags, title } = blog;
  const isBookmarked =bookmarks.filter(bookmark=>bookmark.id===blog.id).length>0;
  // console.log(isBookmarked)
  const isRead =
      markReads.filter((markRead) => markRead.id === blog.id).length > 0;
    
  return (
    <>
      <div>
        <div className="card bg-base-100 shadow-sm">
          <figure>
            <img src={cover} alt={title} />
          </figure>
          <div className="">
            <h2 className="card-title">{title}</h2>
            <div className="flex justify-between mb-5 items-center px-4">
              <p className="text-lg font-semibold">{author}</p>
              <img className="w-10" src={author_img} alt={author} />
              <button onClick={()=>handleBookmark(blog)} className={`bookmark-container ${isBookmarked?'bookmarked':''}`}>
                <FaBookmark size={25}/>
              </button>
            </div>
            <div className="flex justify-between mb-8 items-center px-4">
                {
                   hashtags.map((has, i)=> <p key={i}>{has}</p>) 
                }
            </div>
            <div className="card-actions justify-end">
              <button className={`btn ${isRead?'btn-secondary':'btn-primary'}`} onClick={()=>handleRead(blog)}>{isRead?'Read Already':'Mark as Read'}</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;

// {id: 1, cover: 'https://i.ibb.co/84Zfw2n/1.jpg', title: 'Top 10 ES6 Features You Must Know', author_img: 'https://i.ibb.co/VvLNdLL/boy1.png', author: 'Hamza Sohail', …}
// author
// :
// "Hamza Sohail"
// author_img
// :
// "https://i.ibb.co/VvLNdLL/boy1.png"
// cover
// :
// "https://i.ibb.co/84Zfw2n/1.jpg"
// hashtags
// :
// (2) ['beginners', 'es6']
// id
// :
// 1
// posted_date
// :
// "September 15, 2023"
// reading_time
// :
// 5
// title
// :
// "Top 10 ES6 Features You Must Know"
// [[Prototype]]
// :
// Object
