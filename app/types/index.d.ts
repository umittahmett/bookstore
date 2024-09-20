export interface NavigationLinkProps {
  title: string;
  href?: string;
  links?: NavigationLinkProps[];
}
export interface SocialLinkProps{
  icon: React.ElementType;
  href: string;
}