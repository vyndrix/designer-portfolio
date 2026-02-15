import type { UseQueryResult } from "@tanstack/react-query";

export type QueryFunction<T> = <O = T>(
  select?: (data: T) => O,
) => UseQueryResult<O>;
