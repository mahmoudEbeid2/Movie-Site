"use server";

import { redirect } from 'next/navigation';

export async function searchAction(formData) {
  const query = formData.get('query');
  if (query) {
    redirect(`/search?query=${encodeURIComponent(query)}`);
  }
}