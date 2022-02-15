import React, { useEffect, useState } from 'react';
import { Route,Link,Switch,useHistory, useParams  } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function Detail() {
  const API_KEY = '1fb35531f1b1c3e5cd134fed5e21f5cc';
  const IMG_BASIC = 'https://image.tmdb.org/t/p/';
  let history = useHistory();
  let { param } = useParams();
  let paramNum = Number(param);
  let addClass = ()=>{
    document.getElementById('header').className = 'sub';
  }

  const [detail, setDetail] = useState(''); //상세정보
  const [people, setPeople] = useState(''); //출연진
  const [video, setVideo] = useState(''); //관련영상
  const [recom, setRecom] = useState(''); //추천영화

  const axiosDataDetail = async (api, state)=> {
    await axios.get(api)
      .then((result)=>{
        state(result.data);
        //console.log(result.data);
      })
      .catch(()=>{
        console.log("실패");
      })
  };

  useEffect(()=>{
    addClass(); // header에 클래스 추가 

    const api = `https://api.themoviedb.org/3/movie/${paramNum}?api_key=${API_KEY}&language=ko` //상세정보
    const api_people = `https://api.themoviedb.org/3/movie/${paramNum}/credits?api_key=${API_KEY}&language=ko` //출연진
    const api_video = `https://api.themoviedb.org/3/movie/${paramNum}/videos?api_key=${API_KEY}&language=ko` //관련영상
    const api_recom = `https://api.themoviedb.org/3/movie/${paramNum}/recommendations?api_key=${API_KEY}&language=ko&page=1` //추천영화
    axiosDataDetail(api,setDetail);
    axiosDataDetail(api_people,setPeople);
    axiosDataDetail(api_video,setVideo);
    axiosDataDetail(api_recom,setRecom);
    
  },[]);


  let profile = [];
  let peopleList = ()=> {
    for(let i=0; i< people.cast.length; i++ ){
        if(i < 10){
            profile.push(people.cast[i].profile_path);
        }else {
            return false;
        }
    }
  } 

  let videoURL = [];
  let videoList = ()=> {
    for(let i=0; i< video.results.length; i++ ){
        if(i < 4){
            videoURL.push(video.results[i].key);
        }else {
            return false;
        }
    }
  } 

  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
  };

  

  return (
    <div className="detail">
        {
            detail === '' || detail.length === 0 
            ? null
            : 
            <>
            <div className='detail-topImg' style={{backgroundImage:`url(${IMG_BASIC}w1920_and_h800_multi_faces/${detail.backdrop_path})`}}></div>
            <div className='layout'>
                <div className='detail-infoBox'>
                    <div className='detail-infoBox-img'>
                        <img src={IMG_BASIC+"w300"+detail.poster_path} alt="" />
                    </div>
                    <div className='detail-infoBox-text'>
                        <div className='tit' id='TopText'>{detail.title}</div>
                        <div className='info'>
                            <span>{detail.release_date}({detail.production_countries[0].iso_3166_1})</span>
                            <span>
                                {detail.genres.map((a,i)=>{return(<em key={i}>{a.name}</em>)})}
                            </span>
                            <span>{detail.runtime}분</span>
                        </div>
                        <strong>{detail.tagline}</strong>
                        <p>{detail.overview}</p>
                    </div>
                </div>
            </div>
            </>
        }

        {}

        {people === '' ? null : peopleList()}
        <div className='layout'>
            <div className='detailTit'>출연진</div>
            <div className='people'>
                {
                    profile === [] ? null
                    :
                    profile.map((a,i)=>{
                        return(
                            <div className='people-list' key={i}>
                                <div className='thumb'>
                                    {
                                        a === null
                                        ?<img src='../../../noImg.jpg' alt='이미지없음' />
                                        :<img src={IMG_BASIC+"w200"+a} alt={people.cast[i].original_name} />
                                    }
                                </div>
                                <strong>{people.cast[i].original_name}</strong>
                                <p>{people.cast[i].character}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>


        {video === '' ? null : videoList()}
        <div className='layout'>
            {
                videoURL.length === 0
                ? null
                :
                <>
                <div className='detailTit'>관련영상</div>
                <div className='video'>
                {videoURL.map((a,i)=>{
                    return(
                        <div className='video-list' key={i}>
                            <iframe src={"https://www.youtube.com/embed/"+a} title={video.results[i].name} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                        </div>
                    )
                })}
                </div>
                </>
            }
        </div>


        <div className='layout'>
            <div className='detailTit'>
                {detail === '' ? null : detail.title}과(와) 비슷한 영화
            </div>
            <div className='recommend'>
                {
                    recom === '' ? null
                    :
                    <Slider className='recommend-list' {...settings}>
                    {
                    recom.results.map((a,i)=>{
                        return(
                            <div className='item' key={i}>
                                <a href={"/movie/detail/"+a.id}>
                                    <div className='thumb'>
                                        <img src={IMG_BASIC+"w300"+a.poster_path} alt={a.title} />
                                    </div>
                                    <div className='ov'><span>상세정보</span></div>
                                </a>
                            </div>
                        )
                    })
                    }
                    </Slider> 
                }
                 
            </div>
        </div>

        <div className='btnBox'>
            <button onClick={()=>{history.goBack()}}>뒤로가기</button>
            <a href="/">메인으로</a>
        </div>
       
    
    </div>
  );
}

export default Detail;
