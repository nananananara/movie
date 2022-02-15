import React, { useEffect, useState } from 'react';
import { Route,Link,Switch  } from 'react-router-dom';
import axios from 'axios';
import './css/App.scss';
import Detail from './Detail.js'

function App() {
  const API_KEY = '1fb35531f1b1c3e5cd134fed5e21f5cc';
  const IMG_BASIC = 'https://image.tmdb.org/t/p/';
  const [movie, setMovie] = useState([]);
  const [movieRecent, setMovieRecent] = useState([]);
  const [tab,setTab] = useState("section1");
  const axiosData = async (api,setState)=> {
    await axios.get(api)
      .then((result)=>{
        setState([...result.data.results]);
        console.log([...result.data.results]);
      })
      .catch(()=>{
        console.log("실패");
      })
  };


  useEffect(()=>{
    const api = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko&page=1` //인기순
    const apiRecent = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko&page=1` //최신순
    axiosData(api,setMovie);
    axiosData(apiRecent,setMovieRecent);
  },[])

 
  const [page , setPage] = useState(1);
  const leadMore = ()=> {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko&page=${page+1}`)
      .then((result)=>{
        setMovie([...movie,...result.data.results]);
        setPage(page+1);
      })
      .catch(()=>{
        console.log("실패");
      })
  }


  const [page2 , setPage2] = useState(1);
  const leadMore2 = ()=> {
    axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko&page=${page2+1}`)
      .then((result)=>{
        setMovieRecent([...movieRecent,...result.data.results]);
        setPage2(page2+1);
      })
      .catch(()=>{
        console.log("실패");
      })
  }

  return (
    <div className="App">

      <header id="header">
        <div className='layout'>
          <div className='header'>
            <div className='logo'><a href="/" className='gsans'>THE Movies</a></div>
          </div>
        
        </div>
      </header>

      <Switch>
        <Route path="/" exact>
          {
            movie === [] ? null :
            <div className='main'>
              <div className='layout'>
                <div className='tabBtn'>
                  <button onClick={()=>{setTab("section1")}} className={(tab==="section1" ? 'active' : null) + " gsans"}><span>인기순</span></button>
                  <button onClick={()=>{setTab("section2")}} className={(tab==="section2" ? 'active' : null) + " gsans"}><span>최신순</span></button>
                </div>
              </div>
              

              {
                tab === "section1"
                ?<Section1 movie={movie} leadMore={leadMore} IMG_BASIC={IMG_BASIC} />
                :<Section2 movieRecent={movieRecent} leadMore2={leadMore2} IMG_BASIC={IMG_BASIC} />
              }
              
              
            </div>
          }
        </Route>

        <Route path="/detail/:param">
          <Detail />
        </Route>
      </Switch>  

      <footer>
        <div className='layout'>
          <div className='footer'>
          API https://www.themoviedb.org/<br />
          Movie icons created by Freepik - Flaticon<br />
          COPYRIGHT© The MOVIE ALL RIGHT RESERVED.
          </div>

        </div>
      </footer>

    </div>
  );
}


function Section1(props){
  
  return(
    <section className='section1'>
      <div className='layout'>
        <div className='movie'>
          {
            props.movie.map((a,i)=>{
              return(
                <div className='movie-list' key={i}>
                  <a href={"/detail/"+a.id}>
                    <div className='thumb'>
                      <img src={props.IMG_BASIC+"w300"+a.poster_path} alt={a.title+" 포스터"} />
                    </div>
                    <div className='ov'><span>상세정보</span></div>
                  </a>
                </div>
              )
            })
          }
          
        </div>
        <div className='btnBox'>
          <button onClick={props.leadMore}>Lead More</button>
        </div>
      </div>
    </section>
  )
}



function Section2(props){
  
  return(
    <section className='section2'>
      <div className='layout'>
        <div className='movie'>
          {
            props.movieRecent.map((a,i)=>{
              return(
                <div className='movie-list' key={i}>
                  <a href={"/detail/"+a.id}>
                    <div className='thumb'>
                      <img src={props.IMG_BASIC+"w300"+a.poster_path} alt={a.title+" 포스터"} />
                    </div>
                    <div className='ov'><span>상세정보</span></div>
                  </a>
                </div>
              )
            })
          }
          
        </div>
        <div className='btnBox'>
          <button onClick={props.leadMore2}>Lead More</button>
        </div>
      </div>
    </section>
  )
}

export default App;
