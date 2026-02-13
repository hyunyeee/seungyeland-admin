export interface ReviewSummary {
  id: number;
  title: string;
  content: string | null;
  imageUrls: string[] | null;
  thumbnail: string | null;
}

export interface SortInfo {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
}

export interface PageableInfo {
  pageNumber: number;
  pageSize: number;
  sort: SortInfo;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

export interface ReviewPageResponse {
  content: ReviewSummary[];
  pageable: PageableInfo;
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: SortInfo;
  empty: boolean;
}
