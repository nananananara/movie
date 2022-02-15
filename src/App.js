import React, { useEffect, useState } from 'react';
import { Route,Link,Switch  } from 'react-router-dom';
import axios from 'axios';
import './css/App.scss';
import Detail from './Detail.js'

function App() {
  const API_KEY = '1fb35531f1b1c3e5cd134fed5e21f5cc';
  const IMG_BASIC = 'https://image.tmdb.org/t/p/';
  const [movie, setMovie] = useState([]);
  const [Topmovie, setTopMovie] = useState([]);
  const axiosData = async (api,setState)=> {
    await axios.get(api)
      .then((result)=>{
        setState([...result.data.results]);
      })
      .catch(()=>{
        console.log("실패");
      })
  };

  useEffect(()=>{
    const api = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko&page=1`
    axiosData(api,setMovie);
    axiosData(api,setTopMovie);
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
  

  


  return (
    <div className="App">

      <header id="header">
        <div className='layout'>
          <div className='header'>
            <div className='logo'><a href="/" className=''>THE MOVIE</a></div>
          </div>
        
        </div>
      </header>

      <Switch>
        <Route path="/" exact>
          {
            movie === [] ? null :
            <div className='main'>
              <section className='section1'>

              </section>
              <section className='section2'>
                <div className='layout'>
                  <div className='movie'>
                    {
                      movie.map((a,i)=>{
                        return(
                          <div className='movie-list' key={i}>
                            <a href={"/detail/"+a.id}>
                              <div className='thumb'>
                                <img src={IMG_BASIC+"w300"+a.poster_path} alt={a.title+" 포스터"} />
                              </div>
                              <div className='ov'></div>
                            </a>
                          </div>
                        )
                      })
                    }
                    
                  </div>
                  <div className='btnBox'>
                    <button onClick={leadMore}>Lead More</button>
                  </div>
                </div>
              </section>
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
          COPYRIGHT© The MOVIE ALL RIGHT RESERVED.
          </div>

        </div>
      </footer>

    </div>
  );
}

export default App;
