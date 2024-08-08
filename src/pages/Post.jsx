import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { appwriteService } from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

const Post = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor =
    post && userData ? post.userId === userData.userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex flex-col justify-center mb-4 relative border rounded-xl p-2">
          {isAuthor && (
            <div className="w-full flex justify-end my-2">
              <Link to={`/edit-post/${post.$id}`}>
                <Button
                  bgColor="bg-green-500"
                  className="mr-3 hover:bg-green-600 duraion-200"
                >
                  Edit
                </Button>
              </Link>
              <span>
                <Button
                  bgColor="bg-red-500"
                  className="hover:bg-red-600 duration-200 mr-2"
                  onClick={deletePost}
                >
                  Delete
                </Button>
              </span>
            </div>
          )}
          <div className="w-full flex justify-center">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-[60vw] min-w-96 rounded-md shadow-lg shadow-zinc-600"
            />
          </div>
        </div>
        <div className="w-full mb-6 px-5 flex justify-center">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="w-full flex justify-center">
          <div className="flex px-4 py-2 rounded bg-zinc-100 w-[60vw] min-w-96">
            {parse(post.content)}
          </div>
        </div>
      </Container>
    </div>
  ) : null;
};

export default Post;
