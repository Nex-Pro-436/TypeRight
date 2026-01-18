import { useState } from "react";

const initialComments = [
  { id: 4, user: "tony stark", text: "I am Ironman", likes: 3000 },
  { id: 3, user: "thalapathi vijay", text: "I'm coming", likes: 69 },
  { id: 2, user: "super star", text: "hukkum", likes: 100 },
  { id: 1, user: "apj Abdul kalam", text: "You have to dream before your dreams can come true", likes: 436 },
];

const toxicWords = ["slut", "nigga", "dumb", "cunt"];
const abusiveWords =  ["ass", "dick", "suck", "fuck", "bitch"];

// normalize obfuscated words
const normalize = (text) =>
  text
    .toLowerCase()
    .replace(/[@!*013$]/g, (ch) => ({
  "@": "a",
  "!": "i",
  "*": "",
  "0": "o",
  "1": "i",
  "3": "e",
  "$": "s"}[ch]))
    .replace(/[^a-z\s]/g, "")

export default function CommentSection() {
  const [comments, setComments] = useState(initialComments);
  const [input, setInput] = useState("");
  const [warning, setWarning] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [pendingText, setPendingText] = useState("");

  const checkToxicity = (text) => {
    const clean = normalize(text);
    if (abusiveWords.some((w) => clean.includes(w))) return "block";
    if (toxicWords.some((w) => clean.includes(w))) return "warn";
    return "safe";
  };

  const handlePost = () => {
    const level = checkToxicity(input);

    if (level === "block") {
      setBlocked(true);
      setWarning(false);
      return;
    }

    if (level === "warn") {
      setPendingText(input);
      setWarning(true);
      setBlocked(false);
      return;
    }

    addComment(input);
  };

  const addComment = (text) => {
    setComments([
      { id: Date.now(), user: "you", text, likes: 0 },
      ...comments
    ]);
    setInput("");
    setWarning(false);
    setBlocked(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-[350px] h-[600px] rounded-xl p-[2px] bg-gradient-to-b from-purple-600 to-pink-600">
        <div className="h-[580px] bg-black rounded-xl p-4 text-white flex flex-col">
          <h2 className="font-semibold mb-2">Comments</h2>
          {/* Comments list */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {comments.map((c) => (
              <div
                key={c.id}
                className="bg-[#111] rounded-lg p-2 flex gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-gray-600" />
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-semibold mr-1">{c.user}</span>
                    {c.text}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">♡ {c.likes}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Warning */}
          {warning && (
            <div className="mt-2 bg-yellow-100 text-black text-sm p-2 rounded">
              ⚠️ This comment may be hurtful. Do you still want to post?
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => setWarning(false)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => addComment(pendingText)}
                  className="px-3 py-1 bg-green-600 text-white rounded"
                >
                  Yes, Post
                </button>
              </div>
            </div>
          )}

          {/* Block message */}
          {blocked && (
            <div className="mt-2 bg-red-600 text-white text-sm p-2 rounded">
              🚫 This comment is abusive and cannot be posted.
            </div>
          )}

          {/* Input */}
          <div className="mt-auto pt-3 flex items-center gap-2 border-t border-gray-800">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handlePost()}
              placeholder="Add a comment..."
              className="flex-1 bg-[#111] text-white text-sm px-3 py-2 rounded-lg outline-none"
            />
            <button
              onClick={handlePost}
              className="bg-blue-600 px-3 py-2 rounded text-white"
            >
              ↑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
