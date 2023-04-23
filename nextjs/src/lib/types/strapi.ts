export type StrapiResponse<T> = {
  data: T;
};

export type StrapiData<T> = {
  id: number;
  attributes: T;
};
