import Image from "next/image";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { getNowPlayingMovies } from "@/app/api/themoviedbApi";
import MovieContainer from "@/components/MovieContainer";
import SearchForm from "@/components/SearchForm";

export default async function Home() {
  const data = await getNowPlayingMovies();

  return (
    <div className="container-fluid mx-auto p-4 md:p-8">
      <main className="flex flex-col gap-8 items-center">
        <div className="bg-[#F3F1F1] w-full p-4 ">
          <h2 className="text-3xl font-bold">Welcome to our movie app</h2>
          <p className="text-sm font-normal my-4">
            Millions of movies, TV shows and people to discover. Explore now.
          </p>
          <SearchForm />
        </div>
        <h3 className="text-lg m-0 w-full font-bold text-start">Now Playing</h3>

        <MovieContainer
          initialMovies={data.results}
          initialTotalPages={data.total_pages}
        />
      </main>
    </div>
  );
}
