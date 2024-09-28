import { Dribbble, Facebook, Github, Instagram, Twitter } from "lucide-react";
import { JobOpeningProps, NavigationLinkProps, SocialLinkProps, TimelineProps } from "~/types";
import ExampleBannerImage from "@assets/images/examples/example-banner-image.jpg";

export const footerNavigation: NavigationLinkProps[] = [
  {
    title: "Shop",
    links: [
      { href: "/", title: "New Releases" },
      { href: "/", title: "Best Sellers" },
      { href: "/", title: "Genres" },
      { href: "/", title: "Gift Cards" },
      { href: "/", title: "Special Offers" },
    ],
  },
  {
    title: "About Us",
    links: [
      { href: "/", title: "Our Story" },
      { href: "/", title: "Meet the Team" },
      { href: "/", title: "Careers" },
    ],
  },
  {
    title: "Customer Service",
    links: [
      { href: "/", title: "Contact" },
      { href: "/", title: "FAQs" },
      { href: "/", title: "Shipping Information" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/", title: "Privacy Policy" },
      { href: "/", title: "Terms of Service" },
      { href: "/", title: "Returns & Refunds" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/", title: "Book Club" },
      { href: "/", title: "Reading Guides" },
      { href: "/", title: "Author Events" },
    ],
  },
];

export const socialLinks:SocialLinkProps[] = [
  {icon: Facebook, href: '/'},
  {icon: Instagram , href: '/'},
  {icon: Twitter , href: '/'},
  {icon: Github , href: '/'},
  {icon: Dribbble , href: '/'},
]

export const navigation = {
  categories: [
    {
      id: 'fiction',
      name: 'Fiction',
      featured: [
        {
          name: 'New Releases',
          href: '#',
          imageSrc: ExampleBannerImage,
          imageAlt: 'A stack of newly released fiction books.',
        },
        {
          name: 'Bestsellers',
          href: '#',
          imageSrc: ExampleBannerImage,
          imageAlt: 'Bestselling fiction books displayed on a shelf.',
        },
      ],
      sections: [
        {
          id: 'genres',
          name: 'Genres',
          items: [
            { name: 'Fantasy', href: '#' },
            { name: 'Mystery', href: '#' },
            { name: 'Thriller', href: '#' },
            { name: 'Romance', href: '#' },
            { name: 'Historical Fiction', href: '#' },
            { name: 'Science Fiction', href: '#' },
            { name: 'Literary Fiction', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'formats',
          name: 'Formats',
          items: [
            { name: 'Hardcover', href: '#' },
            { name: 'Paperback', href: '#' },
            { name: 'Audiobooks', href: '#' },
            { name: 'E-books', href: '#' },
          ],
        },
        {
          id: 'authors',
          name: 'Authors',
          items: [
            { name: 'J.K. Rowling', href: '#' },
            { name: 'Stephen King', href: '#' },
            { name: 'George R.R. Martin', href: '#' },
            { name: 'Agatha Christie', href: '#' },
            { name: 'Margaret Atwood', href: '#' },
          ],
        },
      ],
    },
    {
      id: 'non-fiction',
      name: 'Non-Fiction',
      featured: [
        {
          name: 'New Releases',
          href: '#',
          imageSrc: ExampleBannerImage,
          imageAlt: 'A stack of newly released non-fiction books.',
        },
        {
          name: 'Bestsellers',
          href: '#',
          imageSrc: ExampleBannerImage,
          imageAlt: 'Bestselling non-fiction books displayed on a table.',
        },
      ],
      sections: [
        {
          id: 'genres',
          name: 'Genres',
          items: [
            { name: 'Biography', href: '#' },
            { name: 'Self-Help', href: '#' },
            { name: 'Cookbooks', href: '#' },
            { name: 'History', href: '#' },
            { name: 'Science', href: '#' },
            { name: 'Business', href: '#' },
            { name: 'Travel', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'formats',
          name: 'Formats',
          items: [
            { name: 'Hardcover', href: '#' },
            { name: 'Paperback', href: '#' },
            { name: 'Audiobooks', href: '#' },
            { name: 'E-books', href: '#' },
          ],
        },
        {
          id: 'authors',
          name: 'Authors',
          items: [
            { name: 'Malcolm Gladwell', href: '#' },
            { name: 'Michelle Obama', href: '#' },
            { name: 'Yuval Noah Harari', href: '#' },
            { name: 'Brene Brown', href: '#' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'About Us', href: '/about-us' },
    { name: 'Store Locations', href: '/store-locations' },
  ],
};


export const timeline:TimelineProps[] = [
  {
    name: 'Founded company',
    description:
      'Nihil aut nam. Dignissimos a pariatur et quos omnis. Aspernatur asperiores et dolorem dolorem optio voluptate repudiandae.',
    date: 'Aug 2021',
    dateTime: '2021-08',
  },
  {
    name: 'Secured $65m in funding',
    description:
      'Provident quia ut esse. Vero vel eos repudiandae aspernatur. Cumque minima impedit sapiente a architecto nihil.',
    date: 'Dec 2021',
    dateTime: '2021-12',
  },
  {
    name: 'Released beta',
    description:
      'Sunt perspiciatis incidunt. Non necessitatibus aliquid. Consequatur ut officiis earum eum quia facilis. Hic deleniti dolorem quia et.',
    date: 'Feb 2022',
    dateTime: '2022-02',
  },
  {
    name: 'Global launch of product',
    description:
      'Ut ipsa sint distinctio quod itaque nam qui. Possimus aut unde id architecto voluptatem hic aut pariatur velit.',
    date: 'Dec 2022',
    dateTime: '2022-12',
  },
]
export const jobOpenings:JobOpeningProps[] = [
  {
    role: 'Full-time designer',
    href: '#',
    description:
      'Quos sunt ad dolore ullam qui. Enim et quisquam dicta molestias. Corrupti quo voluptatum eligendi autem labore.',
    salary: '$75,000 USD',
    location: 'San Francisco, CA',
  },
  {
    role: 'Laravel developer',
    href: '#',
    description:
      'Et veniam et officia dolorum rerum. Et voluptas consequatur magni sapiente amet voluptates dolorum. Ut porro aut eveniet.',
    salary: '$125,000 USD',
    location: 'San Francisco, CA',
  },
  {
    role: 'React Native developer',
    href: '#',
    description:
      'Veniam ipsam nisi quas architecto eos non voluptatem in nemo. Est occaecati nihil omnis delectus illum est.',
    salary: '$105,000 USD',
    location: 'San Francisco, CA',
  },
]

