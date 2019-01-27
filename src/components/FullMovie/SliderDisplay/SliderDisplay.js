import React from 'react';
// Components
import Slider    from 'react-slick';
import Character from '../Characters/Characters';

/* This component just output slider information.
It helps cut down amount of code in full movie component */

const settingsSlider = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 5,
  slidesToScroll: 5
};

const SliderDisplay = ({ data, nameDisplay }) => (
  <div className='characters-slider'>
    <p>{nameDisplay}</p>
    {/* Slider Component Which Display Images Of Characters  */}
    <Slider {...settingsSlider}>
      {data ? data.slice(0, 10).map(char => {
        return <Character
                key={char.cast_id ? char.cast_id : char.credit_id}
                name={char.name}
                character={char.character ? char.character : char.job}
                image={char.profile_path} />
      }) : null}
    </Slider>
  </div>
);

export default SliderDisplay;
