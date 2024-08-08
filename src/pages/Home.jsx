import React, { useState, useEffect } from "react";
import { appwriteService } from "../appwrite/config";
import { Container, PostCard } from "../components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return authStatus ? (
    <div className="w-screen py-8">
      <Container>
        <div className="flex justify-center flex-wrap gap-8">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-80">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  ) : (
    <div className="w-full py-8 mt-4 text-center">
      <Container>
        <div className="flex h-[60vh] items-center">
          <div className="p-2 w-full">
            <Link to="/login">
              <h1 className="text-2xl md:text-4xl font-bold hover:text-gray-500 duration-200">
                Login to read posts
              </h1>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
