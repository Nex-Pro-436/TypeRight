# TypeRight
Toxic Comments Avoider – Instagram Style Virtual Keyboard
📌 Description
An AI-powered virtual keyboard that prevents users from posting toxic or abusive comments in an Instagram-like comment section UI.

⚠️ Mildly Toxic Comments → Show a warning + confirmation popup before posting.

🚫 Highly Toxic Comments → Block posting until the user removes abusive words.

✅ Clean Comments → Posted successfully in the feed.

This project uses React (frontend) with a mock NLP filter and supports detection of obfuscated abusive words like stup!d, h@te, k***.
The UI is styled in a purple & black Instagram theme with dummy comments, profile pics, usernames, and like buttons for realism.

🔑 Features

🛑 Keyboard-level toxicity filtering (before posting, not after).

🧠 AI/NLP-based detection (can be extended with HuggingFace or Google Perspective API).

🔍 Obfuscated word detection (h@te → hate, stup!d → stupid).

🎨 Instagram-inspired UI with usernames, avatars, likes, and dark theme.

⚠️ Confirmation popup for mild toxicity.

🚫 Block action for severe toxicity.

🛠️ Tech Stack

React.js (Frontend)

Tailwind CSS (Styling)

Lucide-React Icons (UI Icons)

Custom Regex + NLP-ready pipeline for toxicity detection
