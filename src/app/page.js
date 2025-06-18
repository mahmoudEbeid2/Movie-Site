import Image from "next/image";
import "@fortawesome/fontawesome-svg-core/styles.css"; 
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { getNowPlayingMovies } from "@/app/api/themoviedbApi";
import MovieContainer from "@/components/MovieContainer";

export default async function Home() {
  const data = await getNowPlayingMovies();

  return (
    <div className="container mx-auto p-4 md:p-8">
      <main className="flex flex-col gap-8 items-center">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          Now Playing Movies
        </h1>
        
        <MovieContainer 
          initialMovies={data.results} 
          initialTotalPages={data.total_pages} 
        />
      </main>
    </div>
  );
}
