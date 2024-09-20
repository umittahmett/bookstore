import { formatPriceToUSD } from "~/lib/utils";
import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "./ui/sheet";
import { X } from "lucide-react";
import { useState } from "react";

const Cart = () => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open}>
      <SheetContent
        className="max-sm:!max-w-full max-sm:w-full h-dvh *:outline-none overflow-y-auto"
      >
        <div className="realtive pb-10">
          <SheetHeader className="text-start">
            <SheetTitle>
              <p className="inline-flex items-center gap-x-2">
                Cart{" "}
                <span className="text-base font-medium">
                  (10 Items)
                </span>
              </p>
            </SheetTitle>
          </SheetHeader>

          {/* <div className="divide-y divide-gray-200">
            {cartProducts?.length > 0 ? (
              cartProducts.map((item, index) => (
                <CartProduct key={`${item.id}_${index}`} {...item} />
              ))
            ) : (
              <div className="w-full text-center mt-5 text-gray-500">
                No Products
              </div>
            )}
          </div> */}

          <SheetFooter className="fixed bottom-0 left-0 w-full">
            <SheetClose asChild>
              <div className="px-6 bg-white py-4 max-sm:w-full sm:max-w-[384px] sm:w-full">
                <Button className="w-full">
                  Checkout ({formatPriceToUSD(100)})
                </Button>
              </div>
            </SheetClose>
          </SheetFooter>

          <Button
            onClick={() => setOpen(false)}
            className="bg-white hover:bg-white z-50 size-12 cursor-pointer absolute top-4 flex items-center justify-center right-4 "
          >
            <X className="size-5 text-black flex-shrink-0" />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
