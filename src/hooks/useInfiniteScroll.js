import { useState , useEffect  } from 'react'
import { MAX_STORIES , STORY_INCREMENT } from '../constants'
import { debounce } from '../utils/debounce'

export const useInfiniteScroll = () => {
    const [loading , setLoading ] = useState(false);
    const [count , setcount ] = useState(STORY_INCREMENT);
    

    const handleScroll = debounce(() =>{
        if (
            window.innerHeight + document.documentElement.scrollTop !==
              document.documentElement.offsetHeight ||
            loading
          ) {
            console.log("scroll" , loading);
            return false;
          }
          setLoading(true);
          console.log("scroll");
    }, 600);


    useEffect(() => {
        if(!loading) return;

        if(count + STORY_INCREMENT >= MAX_STORIES){
            setcount(MAX_STORIES);
        }else{
            setcount(count + STORY_INCREMENT);
        }

        setLoading(false);
    }, [loading]);


    useEffect(() => {
        window.addEventListener('scroll' , handleScroll);
        return () => window.removeEventListener('scroll' , handleScroll);
    } , [])


    return { count };

}