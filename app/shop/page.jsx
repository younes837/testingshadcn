"use client";
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Heart, LayoutGrid, List, Settings2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const Home = () => {
  const [viewMode, setViewMode] = useState("grid");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto py-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <h1 className="text-2xl font-semibold text-foreground">Shop</h1>
            <span>/</span>
            <span className="text-primary">ECommerce</span>
            <span>/</span>
            <span>Shop</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-3">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">Multi Range</h2>
                <RadioGroup defaultValue="all">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="all" />
                      <Label htmlFor="all">All</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="<=10" id="<=10" />
                      <Label htmlFor="<=10"> = $10</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="10-100" id="10-100" />
                      <Label htmlFor="10-100">$10 - $100</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="100-500" id="100-500" />
                      <Label htmlFor="100-500">$100 - $500</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value=">=500" id=">=500" />
                      <Label htmlFor=">=500">= $500</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">Price Range</h2>
                <Slider
                  defaultValue={[0, 1000]}
                  max={1000}
                  step={1}
                  className="w-full"
                />
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">Categories</h2>
                <div className="space-y-2">
                  {["Appliances", "Audio", "Cameras & Camcorders"].map(
                    (category) => (
                      <div key={category} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>{category}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">27 results found</p>
                <div className="flex items-center gap-4">
                  <Select defaultValue="featured">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price-high">
                        Price: High to Low
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex gap-2">
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="icon"
                      onClick={() => setViewMode("grid")}
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="icon"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button size="icon" variant="outline">
                    <Settings2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-4">
                <Input placeholder="Search Product" className="w-full" />
              </div>
            </div>

            <div
              className={`grid ${
                viewMode === "grid" ? "grid-cols-3" : "grid-cols-1"
              } gap-6`}
            >
              {products.map((product) => (
                <ProductCard
                  key={product.title}
                  {...product}
                  viewMode={viewMode}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({
  title,
  description,
  price,
  rating,
  image,
  viewMode,
}) => {
  return (
    <Card className={`bg-white ${viewMode === "list" ? "flex" : ""}`}>
      <div className={viewMode === "list" ? "w-1/3" : ""}>
        <div className="aspect-square relative overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
      <div className={viewMode === "list" ? "w-2/3 p-4" : ""}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < rating ? "text-yellow-400" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <h3 className="font-semibold text-xl mb-1">{title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          <div className="mt-3 text-lg font-bold">${price.toFixed(2)}</div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex gap-2">
          <Button variant="outline" className="flex-1">
            <Heart className="w-4 h-4 mr-2" />
            Wishlist
          </Button>
          <Button className="flex-1 bg-violet-600 hover:bg-violet-700">
            View In Cart
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

const products = [
  {
    title: "Apple Watch Series 5",
    description:
      "On Retina display that never sleeps, so it's easy to see the time and other important information",
    price: 339.99,
    rating: 4,
    image: "/api/placeholder/400/400",
  },
  {
    title: "Apple iPhone 11 (64GB, Black)",
    description:
      "The Apple iPhone 11 is a great smartphone, powered by A13 Bionic chip",
    price: 669.99,
    rating: 5,
    image: "/api/placeholder/400/400",
  },
  {
    title: "Apple iMac 27-inch",
    description:
      "The all-in-one for all. If you can dream it, you can do it on iMac.",
    price: 999.99,
    rating: 4,
    image: "/api/placeholder/400/400",
  },
];

export default Home;
