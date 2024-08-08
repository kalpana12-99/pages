import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import { appwriteService } from "../appwrite/config";
const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="w-screen py-8">
      <div className="flex justify-center w-screen">
        {posts.map((post) => (
          <div key={post.$id} className="p-2">
            <PostCard {...post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPosts;
