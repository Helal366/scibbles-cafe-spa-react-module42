const getFromLocalStorage=()=>{
    const storedBookmarksIdsString=localStorage.getItem('bookmarksIds');
    if(storedBookmarksIdsString){
        const storedBookmarks=JSON.parse(storedBookmarksIdsString);
        return storedBookmarks;
    }
    return [];
}
const addToLocalStorage=(id)=>{
    const storedBookmarksIds=getFromLocalStorage();
    const newStoredBookmarksIds=[...storedBookmarksIds, id];
    saveToLocalStorage(newStoredBookmarksIds);
}
const saveToLocalStorage=newStoredBookmarksIds=>{
    const newStoredBookmarksIdsstringified=JSON.stringify(newStoredBookmarksIds);
  localStorage.setItem('bookmarksIds', newStoredBookmarksIdsstringified);  
}
const removeFromLocalStorage=(id)=>{
    const storedBookmarksIds=getFromLocalStorage();
    const remainingBookmarkIds=storedBookmarksIds.filter(storedBookmarksId=>storedBookmarksId!==id);
    saveToLocalStorage(remainingBookmarkIds)
}

// readtimes
const getReadTimesFromLocalStorage=()=>{
    const storedReadTimesStringified=localStorage.getItem('readTimes');
    if(storedReadTimesStringified){
        const storedReadTimes=JSON.parse(storedReadTimesStringified);
        return storedReadTimes;
    }
    return [];
}
const addReadTimesToLocalStorage=time=>{
    const storedReadTimes=getReadTimesFromLocalStorage();
    const newStoredReadTimes=[...storedReadTimes, time];
    saveReadTimesToLocalStorage(newStoredReadTimes);
}
const saveReadTimesToLocalStorage=(newStoredReadTimes)=>{
    const newStoredReadTimesStringified=JSON.stringify(newStoredReadTimes);
    localStorage.setItem('readTimes', newStoredReadTimesStringified)
}
const removeReadTimeFromLocalStorage=removeTime=>{
    const removeTimeNumber=+removeTime.join();
    const storedReadTimes=getReadTimesFromLocalStorage();
    // console.log(storedReadTimes);
    const index=storedReadTimes.indexOf(removeTimeNumber);
    if(index!== -1){
        const newStoredReadTimes=[...storedReadTimes]
        newStoredReadTimes.splice(index, 1);
        saveReadTimesToLocalStorage(newStoredReadTimes);
    }
    
}

// mark reads
const getMarkReadsIdsFromLocalStorage=()=>{
    const storedMarkReadsIdsStringified=localStorage.getItem('markReadsIds');
    if(storedMarkReadsIdsStringified){
        const storedMarkReadsIds=JSON.parse(storedMarkReadsIdsStringified);
        return storedMarkReadsIds;
    }
    return [];
}
const addMarkReadIdToLocalStorage=(blog)=>{
    
    const storedMarkReadsIds=getMarkReadsIdsFromLocalStorage();
    const newStoredBookmarksIds=[...storedMarkReadsIds, blog.id];
    saveMarkReadsIdsToLocalStorage(newStoredBookmarksIds);
}
const saveMarkReadsIdsToLocalStorage=newStoredBookmarksIds=>{
    const newStoredBookmarksIdsstringified=JSON.stringify(newStoredBookmarksIds);
    localStorage.setItem('markReadsIds', newStoredBookmarksIdsstringified);
}
const removeMarkReadsIdFromLocalStorage=blog=>{
    const storedMarkReadsIds=getMarkReadsIdsFromLocalStorage();
    const remainingStoredMarkReadsIds=storedMarkReadsIds.filter(readId=> readId!==blog.id);
    saveMarkReadsIdsToLocalStorage(remainingStoredMarkReadsIds);
}
export {
    getFromLocalStorage,
    addToLocalStorage,
    removeFromLocalStorage,
    getReadTimesFromLocalStorage,
    addReadTimesToLocalStorage,
    removeReadTimeFromLocalStorage,
    getMarkReadsIdsFromLocalStorage,
    addMarkReadIdToLocalStorage,
    removeMarkReadsIdFromLocalStorage
}