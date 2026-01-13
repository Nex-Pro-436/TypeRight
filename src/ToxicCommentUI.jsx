import React, { useState } from "react";
import { Heart, Send } from "lucide-react";
import { motion } from "framer-motion";

const dummyComments = [
  { id: 1, user: "alex_01", avatar: "https://i.pravatar.cc/40?img=1", text: "This looks amazing 🔥", likes: 12 },
  { id: 2, user: "jessy", avatar: "https://i.pravatar.cc/40?img=2", text: "Wow! 😍", likes: 5 },
  { id: 3, user: "mike", avatar: "https://i.pravatar.cc/40?img=3", text: "Great work 👏", likes: 7 }
];

const toxicWords = ["hate", "stupid", "idiot", "kill"];
// Allow patterns like h@te, k***, stup!d
const toxicRegex = toxicWords.map(word => new RegExp(word.split("").join("[^a-zA-Z0-9]*"), "i"));

export default function ToxicCommentUI() {
  const [comments, setComments] = useState(dummyComments);
  const [newComment, setNewComment] = useState("");
  const [warning, setWarning] = useState(null);

  const checkToxicity = (text) => {
    let score = 0;
    toxicRegex.forEach(regex => {
      if (regex.test(text)) score++;
    });
    return score;
  };

  const handlePost = () => {
    const toxicityScore = checkToxicity(newComment);

    if (toxicityScore >= 2) {
      alert("❌ Comment blocked: highly toxic.");
      return;
    }

    if (toxicityScore === 1) {
      setWarning("⚠️ This comment may be offensive. Do you still want to post?");
      return;
    }

    postComment();
  };

  const postComment = () => {
    setComments([
      ...comments,
      { id: comments.length + 1, user: "you", avatar: "https://i.pravatar.cc/40", text: newComment, likes: 0 }
    ]);
    setNewComment("");
    setWarning(null);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-igBlack text-white flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {comments.map((c) => (
          <motion.div key={c.id} className="flex items-start space-x-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <img src={c.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
            <div>
              <p><span className="font-bold">{c.user}</span> {c.text}</p>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <Heart size={14} className="cursor-pointer hover:text-igPurple" /> {c.likes}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {warning && (
        <div className="bg-gray-900 p-3 text-center">
          <p>{warning}</p>
          <div className="flex justify-center gap-4 mt-2">
            <button className="px-4 py-1 bg-igPurple rounded-lg" onClick={postComment}>Yes</button>
            <button className="px-4 py-1 bg-red-500 rounded-lg" onClick={() => setWarning(null)}>No</button>
          </div>
        </div>
      )}

      <div className="flex items-center p-3 border-t border-gray-700">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-400"
        />
        <button onClick={handlePost} className="ml-2 text-igPurple hover:text-white">
          <Send />
        </button>
      </div>
    </div>
  );
}
