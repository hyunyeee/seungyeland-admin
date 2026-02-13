export type Lead = {
  id: number;
  siteName: string;
  customerName: string;
  customerPhone: string;
  desiredModel: string;
  notes: string | null;
  isContacted: boolean;
};

export type PagedResponse = {
  data: Lead[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  last: boolean;
};
