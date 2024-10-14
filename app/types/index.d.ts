import { ObjectId, WithId } from "mongodb";
export interface NavigationLinkProps {
  title: string;
  href?: string;
  icon?: ElementType;
  links?: NavigationLinkProps[];
}
export interface SocialLinkProps{
  icon: React.ElementType;
  href: string;
}
export interface StoreLocationProps{
  name: string;
  address: string;
  phone: string;
  google_maps_link: string;
}
export interface HeadingProps{
  title: string;
  description?: string; 
  type?: 'h1' | 'h2' | 'h3';
}export interface BookProps {
  _id: ObjectId;
  reviewCount?: number;
  seller: string;
  publisher: string;
  publicationDate: string;
  longDescription: string;
  title: string;
  pages: number;
  author: string;
  genre: string;
  isbn: string;
  language: string;
  price: number;
  discountPercentage?: number;
  stockQuantity: number;
  images: string[];
  description: string;
}export interface CartProductProps extends BookProps {
  quantity: number;
  selected: boolean;
}export interface ProductSliderProps {
  title: string;
  browseAllLink?: string;
  browseAllText?: string;
  books: BookProps[];
  className?: string;
}
export interface FilterCategory {
  id?: string;
  name: string;
  subCategories?: FilterCategory[];
}
export interface MobileFilterProps {
  onCloseClick: () => void;
}
export interface BookSearchProps {
  onFilterClick: () => void;
  productsCount: number;
}
export interface SortByProps {
  id: string;
  name: string;
}
export interface JobOpeningProps {
  role:string
  href:string
  description: string
  salary:string
  location:string
}
export interface TimelineProps {
  name: string;
  description: string;
  date: string;
  dateTime: string;


}export interface AddressProps {
  _id: ObjectId;
  name: string; 
  customerId:string
  firstName: string;
  lastName: string;
  address: string;
  addressLine2?: string;
  country: string;
  city: string;
  zip: string;
  phone: string;
  additionalInfo?: string;
}

export interface AddressCardProps extends AddressProps {
  moreDetailed?: boolean;
  className?: string;
  onClick?: () => void;
}
export interface UserProps extends WithId<Document> {
  birthDate: any;
  fullName: string;
  email: string;
  phone: string;
  password:string
  cartId:ObjectId
}
export interface OrderProps {
  seller: string;
  date: string;
  status: string;
  product: BookProps;
  count: number;
  receiver: string;
  address: AddressProps;
}
export interface ProductListProps {
  products: JsonifyObject<BookProps[]>;
}export interface SidebarFilterProps{
  maxPriceRange: number;
  minPriceRange: number;
  filters: FilterCategory[];
}export interface CartProps extends WithId<Document> extends WithId<Document> {
  productId: string;
  quantity: number;
  selected: boolean;
}
export interface CounterProps {
  onChange?: (e: any) => void;
  defaultValue?: number;
  isRequired?: boolean;
  label?: string;
  reduce: () => void;
  increase: () => void;
  count?: number;
}export interface NavbarProps{
  user: any;
  productsInCart: number;
}export interface GlobalAlertDialogProps {
  title?: string;
  message?: string;
  open?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
}
export interface ResetPasswordFormProps{
  className?: string;
  title?: string;
}
export interface AddressesPopupProps {
  addresses: AddressProps[];
  setSelectedAddress: (address: AddressProps) => void;
}

export interface AddressDetailFormProps {
  address?: AddressProps;
  action?: 'add' | 'update';
  redirectTo?: string;
  successFunction?: () => void;
}