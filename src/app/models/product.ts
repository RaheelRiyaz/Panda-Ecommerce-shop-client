export class ProductItemResponse {
  id!: string;
  subCategoryId!: string;
  brandName!: string;
  productName!: string;
  description!: string;
  price!: number;
  filePath!: string;
}

export class ProductResponse {
  brandName!: string;
  productName!: string;
  id!: string;
  subCategoryId!: string;
  price!: number;
  description!: string;
  COD!: boolean;
  totalStock!: number;
  off!: number;
  files: [
    {
      id: string;
      isVideo: boolean;
      filePath: string;
    }
  ] = [
    {
      id: '',
      isVideo: false,
      filePath: '',
    },
  ];
  productSizes: [
    {
      size: string;
      quantity: number;
      id: string;
      soldOut: boolean;
    }
  ] = [
    {
      size: '',
      quantity: 0,
      id: '',
      soldOut: false,
    },
  ];
}

export class SimilarProductRequest {
  constructor(private productId: string, private subCategoryId: string) {}
}

export class SuggestionResponse {
  productName!: string;
  id!: string;
  subCategoryId!: string;
  categoryId!: string;
}
