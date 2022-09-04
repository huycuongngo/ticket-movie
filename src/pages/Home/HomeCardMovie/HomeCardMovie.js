import React from 'react'
import MultipleRows from '../../../components/ReactSlick/MultipleRowSlick';



export default function HomeCardMovie(props) {
  const { arrayFilm } = props;

  return (
    <div className='my-10'>
     
      <MultipleRows arrayFilm={arrayFilm} />
    </div>
  )
}
