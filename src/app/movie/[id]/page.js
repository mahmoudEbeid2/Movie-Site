import React from 'react'
import Image from 'next/image';
import { getMovieDetailsByID } from '@/app/api/themoviedbApi';


async function MovieDetailsPage({params}) {
    const {id} = params;
    const movie = await getMovieDetailsByID(id);
    console.log(movie);

    // destructure of object to use
    // const { title, overview, genres, vote_average, credits, videos, recommendations,similar,production_companies, poster_path, budget, release_date, runtime ,revenue  } = await getMovieDetailsByID(id);
    
  return (
    <div>
            {/* <Image
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={title}
              className="w-full max-h-[500px] object-contain rounded-lg"
              width={300}
              height={500}
            /> */}
    </div>
  )
}

export default MovieDetailsPage
