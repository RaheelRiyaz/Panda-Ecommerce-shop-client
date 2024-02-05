export class CategoryResponse {
  name!: string;
  id!: string;
  subCategoryId!: string;
}

export class SubcategoryResponse extends CategoryResponse {
  filePath!: string;
}
