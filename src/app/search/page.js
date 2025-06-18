import React from 'react';
import Link from 'next/link';
import SearchForm from '@/components/SearchForm';
import { searchByQuery } from '@/app/api/themoviedbApi';
import SearchResultsContainer from '@/components/SearchResultsContainer';

export default async function SearchPage({ searchParams }) {
  const query = searchParams.query || '';
  const initialData = await searchByQuery(query);

  return (
    <main className="w-full min-h-screen p-4 sm:p-8">
      <div className="">
        <div className="my-8">
          <SearchForm initialValue={query} />
        </div>
        <p className="text-base font-bold mb-2">Search Results for: <span className="text-base font-normal">{query}</span></p>
        <div className="mt-8">
            <SearchResultsContainer 
                initialMovies={initialData.results}
                initialTotalPages={initialData.total_pages}
                query={query}
            />
        </div>
      </div>
    </main>
  );
}
