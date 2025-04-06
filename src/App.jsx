import React, { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Blogs from "./components/blogs/Blogs";

const App = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [readTimes, setReadTimes] = useState([]);
  const [markReads, setMarkReads] = useState([]);

  const handleBookmark = (blog) => {
    const isBookmarked =
      bookmarks.filter((bookmark) => bookmark.id === blog.id).length > 0;
    let newBookmarks;
    if (isBookmarked) {
      newBookmarks = bookmarks.filter((bookmark) => bookmark.id !== blog.id);
      setBookmarks(newBookmarks);
    } else {
      newBookmarks = [...bookmarks.filter(bookmark => bookmark.id !== blog.id), blog];
      setBookmarks(newBookmarks);
    }
  };
  const handleRead = (blog) => {
    const isRead =
      markReads.filter((markRead) => markRead.id === blog.id).length > 0;
    let newMarkReads;
    let newReadTimes;
    if (isRead) {
      newMarkReads = markReads.filter((markRead) => markRead.id !== blog.id);
      setMarkReads(newMarkReads);
      const index = readTimes.indexOf(blog.reading_time);
      if (index !== -1) {
        newReadTimes=[...readTimes];
        newReadTimes.splice(index, 1);
        setReadTimes(newReadTimes);
      }
    } else {
      newMarkReads = [...markReads, blog];
      setMarkReads(newMarkReads);
      newReadTimes = [...readTimes, blog.reading_time];
      setReadTimes(newReadTimes);
    }
    handleRemoveBookmark(blog.id);
  };
  const TotalReadTimes = readTimes.reduce((acc, cv) => acc + cv, 0);
  const handleRemoveBookmark = (id) => {
    const newBookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);
    setBookmarks(newBookmarks);
  };

  return (
    <>
      <header>
        <Navbar></Navbar>
      </header>

      <main className="main-container flex text-center">
        <div className="left-container w-[70%] border border-gray-600">
          <Blogs
            handleBookmark={handleBookmark}
            handleRead={handleRead}
            bookmarks={bookmarks}
            markReads={markReads}
          ></Blogs>
        </div>

        <div className="right-container w-[30%]">
          <h3 className="aside-heading">Reading Time: {TotalReadTimes}</h3>
          <h3 className="aside-heading">Bookmarks Count: {bookmarks.length}</h3>
          <div className="font-semibold ">
            {bookmarks.map((bookmark) => (
              <p
                key={bookmark.id}
                className="p-4 mx-2 my-3 bg-amber-100 rounded shadow-md"
              >
                {bookmark.title}
              </p>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
