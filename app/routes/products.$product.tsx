import { useState } from 'react'
import { Star, ChevronDown, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { Button } from "@components/ui/button"
import { Badge } from "@components/ui/badge"
import { BookProps } from '~/types';
import { books } from '~/data/dummy';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@components/ui/accordion';
import ProductSlider from '@components/sections/poduct-slider';
import { Card, CardContent } from '@components/ui/card';
import { Separator } from '@radix-ui/react-select';

interface BookDetails {
  id: string;
  title: string;
  author: string;
  rating: number;
  reviewCount: number;
  description: string;
  images: string[];
  formats: string[];
  editions: string[];
  price: number;
  isbn: string;
  publisher: string;
  publicationDate: string;
  pages: number;
  language: string;
}

export default function BookDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="pt-10">
      <div className="default-container grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative bg-zinc-100 p-5 rounded-lg flex items-center justify-center  w-full">
            <img
              src={books[3].images[selectedImage]}
              alt={books[3].title}
              className="rounded-lg object-cover"
            />
            <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded text-sm font-medium">
              Click to Zoom
            </div>
          </div>
          <div className="flex space-x-4">
            {books[3].images.map((image, index) => (
              <button
                key={index}
                className={`relative aspect-[3/4] w-24 ${selectedImage === index ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image}
                  alt={`${books[3].title} - Image ${index + 1}`}
                  className="rounded object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-6 pt-5">
          <div>
            <h1 className="text-3xl font-bold">{books[3].title}</h1>
            <p className="text-sm">by {books[3].author}</p>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-sm"><span className='text-green-500'>{books[3].reviewCount}</span> reviews</span>
            </div>
          </div>
          <p className="text-muted-foreground">{books[3].description}</p>
          <div className="text-3xl font-bold">${books[3].price.toFixed(2)}</div>
          <Button className="w-full">Add to Cart</Button>
          <Accordion defaultValue={['shipping-returns']} type="multiple">
            <AccordionItem value="shipping-returns">
              <AccordionTrigger className="flex justify-between items-center">
                Shipping and Returns
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Free shipping on orders over $35. Returns accepted within 30 days of purchase.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div>
            <h3 className="font-semibold mb-2">Share This Product:</h3>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-muted-foreground cursor-pointer" />
              <Twitter className="h-5 w-5 text-muted-foreground cursor-pointer" />
              <Instagram className="h-5 w-5 text-muted-foreground cursor-pointer" />
              <Linkedin className="h-5 w-5 text-muted-foreground cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      <Card className="mb-12 default-container py-10 !border-x-0 mt-10 !rounded-none !px-0 !border-y">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">About this book</h2>
          <p className="text-muted-foreground mb-6">{books[3].longDescription}</p>
          <Separator className="my-6" />
          <h3 className="text-xl font-semibold mb-4">Product details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold">ISBN</p>
              <p className="text-muted-foreground">{books[3].isbn}</p>
            </div>
            <div>
              <p className="font-semibold">Publisher</p>
              <p className="text-muted-foreground">{books[3].publisher}</p>
            </div>
            <div>
              <p className="font-semibold">Publication Date</p>
              <p className="text-muted-foreground">{books[3].publicationDate}</p>
            </div>
            <div>
              <p className="font-semibold">Pages</p>
              <p className="text-muted-foreground">{books[3].pages}</p>
            </div>
            <div>
              <p className="font-semibold">Language</p>
              <p className="text-muted-foreground">{books[3].language}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <ProductSlider className='pt-0' title='Similar Books' books={books} />
    </div>
  )
}