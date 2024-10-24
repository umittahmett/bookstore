import { useState } from 'react'
import { Facebook, Twitter, Instagram, Linkedin, ShoppingBag } from 'lucide-react'
import { Button } from "@components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@components/ui/accordion';
import ProductSlider from '@components/sections/poduct-slider';
import { Card, CardContent } from '@components/ui/card';
import { Separator } from '@radix-ui/react-select';
import { connectToDatabase } from '@utils/db.server';
import { ObjectId } from 'mongodb';
import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useFetchAction } from '~/hooks/use-global-submit'

export default function BookDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const loaderData = useLoaderData<typeof loader>()
  const product = loaderData.product
  const similarProducts = loaderData.similarProducts
  const { sendAction } = useFetchAction()

  // Add product to cart
  const handleAddToCart = () => {
    const formData = new FormData();
    formData.append('productId', product._id.toString());
    formData.append('quantity', '1');
    sendAction({
      formData: formData,
      method: 'post',
      action: '/api/cart/add-product'
    });
  };

  return (
    <div className="pt-10">
      <div className="default-container grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative bg-zinc-100 p-5 rounded-lg flex items-center justify-center  w-full">
            <img
              src={product.images[selectedImage]}
              alt={product.title}
              className="rounded-lg object-cover"
            />
            <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded text-sm font-medium">
              Click to Zoom
            </div>
          </div>
          <div className="flex space-x-4">
            {product.images.map((image: string, index: number) => (
              <button
                key={index}
                className={`relative aspect-[3/4] w-24 ${selectedImage === index ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image}
                  alt={`${product.title} - Image ${index + 1}`}
                  className="rounded object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-6 pt-5">
          <div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-sm">by {product.author}</p>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-sm"><span className='text-green-500'>{product.reviewCount}</span> reviews</span>
            </div>
          </div>
          <p className="text-muted-foreground">{product.description}</p>
          <div className="text-3xl font-bold">${product.price.toFixed(2)}</div>
          <Button onClick={handleAddToCart} className='w-full sticky mt-6'> <ShoppingBag strokeWidth={1} className='text-white size-5' /> Add to cart</Button>
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
          <p className="text-muted-foreground mb-6">{product.longDescription}</p>
          <Separator className="my-6" />
          <h3 className="text-xl font-semibold mb-4">Product details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold">ISBN</p>
              <p className="text-muted-foreground">{product.isbn}</p>
            </div>
            <div>
              <p className="font-semibold">Publisher</p>
              <p className="text-muted-foreground">{product.publisher}</p>
            </div>
            <div>
              <p className="font-semibold">Publication Date</p>
              <p className="text-muted-foreground">{product.publicationDate}</p>
            </div>
            <div>
              <p className="font-semibold">Pages</p>
              <p className="text-muted-foreground">{product.pages}</p>
            </div>
            <div>
              <p className="font-semibold">Language</p>
              <p className="text-muted-foreground">{product.language}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <ProductSlider className='pt-0' title='Similar Books' books={similarProducts} />
    </div>
  )
}

// Loader function
export const loader: LoaderFunction = async ({ params }) => {
  try {
    // Get product id
    const productId = params.product
    console.log('product id', productId);

    const { db } = await connectToDatabase()

    // get product
    const product = await db.collection('products').findOne({ _id: new ObjectId(productId as string) })

    // Check if product exist
    if (!product) { return json({ error: 'Cart not found' }, { status: 404 }) }

    const productGenre = product.genre

    // Get similar products
    const similarProducts = await db.collection('products').find({ genre: productGenre }).limit(4).toArray() || []

    return json({ product, similarProducts })
  } catch (error) {
    console.error("Loader sırasında bir hata oluştu:", error);
    throw new Error("Sunucu hatası: Kullanıcı doğrulama işlemi başarısız.");
  }
};