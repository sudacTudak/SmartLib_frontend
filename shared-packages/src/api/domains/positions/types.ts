/**
 * `ReadPositionSerializer` — GET list / retrieve.
 */
export type Position = {
  id: string;
  name: string;
};

export type PositionListData = Position[];
export type PositionDetailData = Position;

/**
 * `WritePositionSerializer`: только `name` (write_only) — тело ответа POST/PATCH часто `{}`.
 */
export type PositionWriteResponseData = Record<string, never>;

export type PositionCreateBody = { name: string };
export type PositionPatchBody = { name: string };

/** Стандартный destroy — 204 / `data: null`. */
export type PositionDeleteData = null;

export type PositionListParams = Record<string, string | number | boolean | undefined>;
