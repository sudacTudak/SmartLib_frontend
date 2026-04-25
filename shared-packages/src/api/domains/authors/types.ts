/** `AuthorSerializer` — GET list/retrieve без auth; write — staff. */
export interface IAuthor {
  id: string;
  name: string;
}

export type TAuthorListData = IAuthor[];
export type TAuthorDetailData = IAuthor;
export type TAuthorCreateBody = Pick<IAuthor, 'name'>;
export type TAuthorPatchBody = Partial<TAuthorCreateBody>;
