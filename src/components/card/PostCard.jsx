import React from "react";
import { appwriteService } from "../../appwrite/config.js";
import { Link } from "react-router-dom";

const PostCard = ({ $id, title, featuredImage }) => {
  return (
    <Link to={`/posts/${$id}`}>
      <div className="w-80 bg-gradient-to-b from-zinc-300 to-white shadow-lg shadow-zinc-300 rounded-xl p-4">
        <div className="w-70 justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
