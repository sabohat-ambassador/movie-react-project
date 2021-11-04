import React from 'react';

const ActorCard = (props) => {
  const Imageurl = 'https://image.tmdb.org/t/p/w500';
  return (

    <div className='Card' >
      <div>

  {props.actor.profile_path ? <img className='photoActor' src={Imageurl + props.actor.profile_path} alt="actor image" /> : <div className='poster'>NO IMAGE</div> } 
      </div>
  
  <div className='names'>
  <p className='actorName'>{props.actor.name}</p>
      <p className='actorrole'>{props.actor.charName}</p>
  </div>
 </div>
  );
};

export default ActorCard;