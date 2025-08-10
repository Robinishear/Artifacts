import { Star, MessageCircle, Share2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { GiSelfLove } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';

const AllArtifacts = () => {
  const [items, setItems] = useState([]);
  const [likedItems, setLikedItems] = useState({});
  const [loading, setLoading] = useState(true);
  
  // নতুন: কমেন্ট ফর্মের স্টেটস
  const [showCommentFormId, setShowCommentFormId] = useState(null);
  const [commentUserName, setCommentUserName] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [commentSubmitting, setCommentSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('https://assaingment-porjects-baregent.vercel.app/data')
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleLike = (id) => {
    setLikedItems(prev => {
      const isLiked = !!prev[id];
      setItems(items =>
        items.map(item =>
          item.id === id
            ? { ...item, likeCount: isLiked ? item.likeCount - 1 : item.likeCount + 1 }
            : item
        )
      );
      return { ...prev, [id]: !isLiked };
    });
  };

  // নতুন: কমেন্ট সাবমিট হ্যান্ডলার
  const handleCommentSubmit = async (artifactId) => {
    if (!commentUserName.trim() || !commentContent.trim()) {
      alert("Please enter your name and comment.");
      return;
    }

    setCommentSubmitting(true);

    try {
      const res = await fetch('http://localhost:5000/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          artifactId,
          userName: commentUserName,
          content: commentContent,
        }),
      });

      if (!res.ok) throw new Error("Failed to post comment");

      const newComment = await res.json();
      alert("Comment posted successfully!");

      // ফর্ম ক্লিয়ার ও বন্ধ করা
      setCommentUserName("");
      setCommentContent("");
      setShowCommentFormId(null);
    } catch (error) {
      console.error(error);
      alert("Error posting comment");
    }

    setCommentSubmitting(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lime-200 text-center mt-10 w-16 h-16 max-w-5xl mx-auto py-24 border-4 border-dashed rounded-full animate-spin dark:border-lime-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.length === 0 ? (
        <p className="text-lime-200 text-center col-span-full">No artifacts found.</p>
      ) : (
        items.map(item => (
          <div
            key={item.id}
            className="relative overflow-hidden bg-gray-950 border border-lime-400/20 rounded-3xl p-6 sm:p-8 shadow-[0_0_40px_#84cc16] transition-all duration-300 hover:shadow-[0_0_60px_#84cc16] group flex flex-col justify-between"
          >
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-fuchsia-600 rounded-full opacity-10 blur-3xl group-hover:opacity-20 transition-all duration-500" />

            <div className="relative z-10 space-y-4 flex-grow">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl sm:text-3xl font-bold text-lime-400 tracking-wide transition-transform duration-500 group-hover:scale-105 group-hover:text-lime-300">
                  {item.name}
                </h2>
                <Star size={28} className="text-yellow-400 animate-pulse" />
              </div>

              <div className="text-sm text-lime-300 space-y-1 transition-opacity duration-500 group-hover:opacity-90">
                <p><span className="font-medium">Type:</span> {item.type}</p>
                <p><span className="font-medium">Added By:</span> {item.adderName}</p>
                <p><span className="font-medium">Context:</span> {item.historicalContext}</p>
              </div>

              <div className="h-52 w-full border border-dashed border-yellow-300 rounded-xl bg-black flex items-center justify-center overflow-hidden text-gray-400 italic">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-contain w-full h-full rounded-md transform transition-transform duration-500 group-hover:scale-120"
                  />
                ) : (
                  'Image Unavailable'
                )}
              </div>
            </div>

            <div className="pt-4 mt-auto flex justify-between items-center text-gray-400">
              <button
                onClick={() => handleLike(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition font-semibold select-none ${
                  likedItems[item.id]
                    ? 'bg-black text-amber-300 shadow-lg shadow-pink-400/40 animate-pulse'
                    : 'bg-black text-gray-300 hover:bg-blue-300 hover:text-white active:bg-amber-300'
                }`}
              >
                <GiSelfLove className={`w-5 h-5 ${likedItems[item.id] ? 'text-white' : 'text-pink-400'}`} />
                <span>{item.likeCount || 0}</span>
                <span className="hidden sm:inline">Likes</span>
              </button>

              <div className="flex gap-2 text-sm transition-opacity duration-500 group-hover:opacity-100 opacity-80">
                {/* Comment Button */}
                <button
                  className="flex bg-black rounded-full btn items-center gap-1 hover:bg-lime-400 hover:text-black text-shadow-amber-300 transition"
                  onClick={() =>
                    showCommentFormId === item.id
                      ? setShowCommentFormId(null)
                      : setShowCommentFormId(item.id)
                  }
                >
                  <MessageCircle size={16} /> Comment
                </button>

                {/* Share Button */}
                <button
                  onClick={() => {
                    const url = window.location.href;
                    const text = `Check this out: ${item.name}`;
                    window.open(
                      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
                      "_blank",
                      "width=600,height=400"
                    );
                  }}
                  className="flex btn items-center bg-black rounded-full gap-1 hover:bg-lime-400 hover:text-black text-shadow-amber-300 transition"
                >
                  <Share2 size={16} /> Share
                </button>
              </div>
            </div>

            {/* Comment Form Show on Button Click */}
            {showCommentFormId === item.id && (
              <div className="mt-4 bg-gray-900 p-4 rounded-md text-lime-400">
                <input
                  type="text"
                  placeholder="Your name"
                  value={commentUserName}
                  onChange={(e) => setCommentUserName(e.target.value)}
                  className="w-full mb-2 p-2 rounded text-black"
                  disabled={commentSubmitting}
                />
                <textarea
                  placeholder="Write your comment..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  rows={3}
                  className="w-full mb-2 p-2 rounded text-black"
                  disabled={commentSubmitting}
                />
                <button
                  onClick={() => handleCommentSubmit(item.id)}
                  disabled={commentSubmitting}
                  className="bg-lime-500 hover:bg-lime-600 text-black px-4 py-2 rounded font-semibold"
                >
                  {commentSubmitting ? "Posting..." : "Post Comment"}
                </button>
              </div>
            )}

            <NavLink to={`/details/${item._id}`}>
              <button className="bg-black w-full text-lime-400 btn mt-5 rounded-lg hover:bg-lime-400 hover:text-black">
                View Details
              </button>
            </NavLink>
          </div>
        ))
      )}
    </div>
  );
};

export default AllArtifacts;
