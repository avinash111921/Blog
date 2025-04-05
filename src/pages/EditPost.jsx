import React,{useEffect,useState} from 'react'
// import {Container ,PostForm} from "../components"
import Container from '../components/container/Container.jsx';
import PostForm from '../components/post-form/PostForm.jsx';
import apppwriteService from '../appwrite/config.js'
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
    const [post,setPost] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(slug){
            apppwriteService.getPost(slug).then((post) => {
                if(post){
                  setPost(post)
                }
            })
        }else{
            navigate("/");
        }
    },[slug,navigate])
    
  return post ? (
    <div className='py-8'>
      <Container>
        <PostForm post={post}/>
      </Container>
    </div>
  ) : null;
}

export default EditPost
