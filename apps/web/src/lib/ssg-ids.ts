import { getPublicServerApi } from './server-api';

/** ID филиалов для SSG. При ошибке API (например, бэкенд недоступен на сборке) — пустой массив. */
export async function collectLibraryBranchIdsForSSG(): Promise<string[]> {
  try {
    const api = getPublicServerApi();
    const list = await api.libraries.list();
    return list.map((b) => b.id);
  } catch (e) {
    console.warn('[ssg] libraries.list failed:', e);
    return [];
  }
}

/** ID экземпляров книг (books/book) по всем филиалам — для SSG. */
export async function collectBookIdsForSSG(): Promise<string[]> {
  try {
    const api = getPublicServerApi();
    const libraries = await api.libraries.list();
    const ids = new Set<string>();
    for (const lib of libraries) {
      const books = await api.books.book.listByLibrary({ library: lib.id });
      for (const book of books) {
        ids.add(book.id);
      }
    }
    return [...ids];
  } catch (e) {
    console.warn('[ssg] collectBookIdsForSSG failed:', e);
    return [];
  }
}
