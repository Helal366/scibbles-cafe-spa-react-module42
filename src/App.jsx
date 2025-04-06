import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import Blogs from "./components/blogs/Blogs";
import {
  addToLocalStorage,
  removeFromLocalStorage,
  addReadTimesToLocalStorage,
  getReadTimesFromLocalStorage,
  removeReadTimeFromLocalStorage,
  addMarkReadIdToLocalStorage,
  removeMarkReadsIdFromLocalStorage,
} from "./utilities/localStorage";

const App = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [readTimes, setReadTimes] = useState([]);
  const [markReads, setMarkReads] = useState([]);
  const [totalLocalStorageReadTimes, setTotalLocalStorageReadTimes] =
    useState(0);

  const handleBookmark = (blog) => {
    const isBookmarked =
      bookmarks.filter((bookmark) => bookmark.id === blog.id).length > 0;
    let newBookmarks;
    if (isBookmarked) {
      newBookmarks = bookmarks.filter((bookmark) => bookmark.id !== blog.id);
      setBookmarks(newBookmarks);
      removeFromLocalStorage(blog.id);
    } else {
      newBookmarks = [
        ...bookmarks.filter((bookmark) => bookmark.id !== blog.id),
        blog,
      ];
      setBookmarks(newBookmarks);
      addToLocalStorage(blog.id);
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
        newReadTimes = [...readTimes];
        const removeTime = newReadTimes.slice(index, index + 1);
        newReadTimes.splice(index, 1);
        setReadTimes(newReadTimes);
        removeReadTimeFromLocalStorage(removeTime);
        removeMarkReadsIdFromLocalStorage(blog);
      }
    } else {
      newMarkReads = [...markReads, blog];
      setMarkReads(newMarkReads);
      newReadTimes = [...readTimes, blog.reading_time];
      setReadTimes(newReadTimes);
      addReadTimesToLocalStorage(blog.reading_time);
      addMarkReadIdToLocalStorage(blog);
    }
    handleRemoveBookmark(blog.id);
  };
  const TotalReadTimes = readTimes.reduce((acc, cv) => acc + cv, 0);
  const handleRemoveBookmark = (id) => {
    const newBookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);
    setBookmarks(newBookmarks);
    removeFromLocalStorage(id);
  };
  useEffect(() => {
    const storedReadTimes = getReadTimesFromLocalStorage();
    const TotalStorageReadTimes = storedReadTimes.reduce(
      (acc, cv) => acc + cv,
      0
    );
    setTotalLocalStorageReadTimes(TotalStorageReadTimes);
  }, []);
  return (
    <>
      <header>
        <Navbar></Navbar>
      </header>

      <main className="main-container flex text-center">
        <div className="left-container w-[70%]">
          <Blogs
            handleBookmark={handleBookmark}
            handleRead={handleRead}
            bookmarks={bookmarks}
            setBookmarks={setBookmarks}
            markReads={markReads}
            setMarkReads={setMarkReads}
          ></Blogs>
        </div>

        <div className="right-container w-[30%] bg-gray-100">
          <div className="border-b-2 border-b-white">
            <h3 className="aside-heading">
              Reading Time: {totalLocalStorageReadTimes}
            </h3>
            <h3 className="aside-heading">
              Bookmarks Count: {bookmarks.length}
            </h3>
          </div>

          <div className="font-semibold ">
            {bookmarks.map((bookmark, i) => (
              <p
                key={i}
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
