"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { supabase } from "../../src/supabase-clients";
import Link from "next/link";
import { User } from '@supabase/supabase-js';


type PriceInput = { size: string; price: string };

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");


  const [myProduct, setMyProduct] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    images: [] as File[],
    popular: false,
    inStock: false,
    sizes: [] as string[],
    price: {} as Record<string, number>,
  });


  const [priceInputs, setPriceInputs] = useState<PriceInput[]>([{ size: "", price: "" },]);

  const handlePriceChange = (index: number, field: "size" | "price", val: string) => {
    const newInputs = [...priceInputs];
    newInputs[index][field] = val;
    setPriceInputs(newInputs);
  };

  const handleAddPriceInput = () => {
    const lastInput = priceInputs[priceInputs.length - 1];
    if(!lastInput.size.trim() || !lastInput.price.trim() || priceInputs.length >= 3){
      return;
    }
    setPriceInputs([...priceInputs , { size: "", price: "" }]);
  };

 


  useEffect(() => {
    const checkUser = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        router.push("/");
        return;
      }
      setUser(userData.user);

      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;

      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/check-admin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json();
        if (result.success) setVerified(true);
        else setError("Unauthorized: Not an admin");
      } catch (err) {
        console.error(err);
        setError("Server error, try again later");
      }

      setLoading(false);
    };

    checkUser();
  }, [router]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  const uploadImage = async (file: File) => {
    const filePath = `${file.name}-${Date.now()}`;
    const { error: uploadImageError } = await supabase.storage.from("product_images").upload(filePath, file);
    if (uploadImageError) {
      console.error("uploadImageError:", uploadImageError);
      return null;
    }

    const { data } = await supabase.storage.from("product_images").getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setMyProduct({ ...myProduct, images: Array.from(e.target.files) })
    }
  };


  const addNewProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    const priceObj: Record<string, number> = {};
    priceInputs.forEach((p) => {
      const val = Number(p.price);
      if (p.size && !isNaN(val)) priceObj[p.size] = val;
    });

  
    const imageUrls: string[] = [];
    for (const file of myProduct.images) {
      const url = await uploadImage(file);
      if (url) imageUrls.push(url);
    }

    const { error: addNewProductError, data } = await supabase.from("products").insert({ ...myProduct, images: imageUrls , price: priceObj, sizes: Object.keys(priceObj) },);

    if (addNewProductError) console.error("addNewProductError:", addNewProductError);
    else console.log("Product added:", data);

    setMyProduct({
      title: "",
      description: "",
      category: "",
      type: "",
      images: [],
      popular: false,
      inStock: false,
      sizes: [],
      price: {},
    });
    setPriceInputs([{ size: "", price: "" }]);
  };

  return (
    <div className="px-4 py-8">
      {!verified && (
        <div>
          <h2 className="text-xl font-bold">Access Denied</h2>
          {error && <p className="mt-2 mb-5 text-red-600">{error}</p>}
          <Link
            href={"/auth"}
            className="text-gray-500 text-xl font-semibold underline"
          >
            Go to login again
          </Link>
        </div>
      )}

      {verified && (
        <div>
          <h2 className="text-2xl font-bold text-green-600">✅ Welcome Admin!</h2>
          <p className="mt-2">You now have access to the dashboard.</p>

          <form className="mt-8" onSubmit={addNewProduct}>
            <div className="flex gap-4 mb-3">
              <input
                type="text"
                placeholder="Title"
                className="w-full px-4 py-2 border rounded"
                value={myProduct.title}
                onChange={(e) => setMyProduct({ ...myProduct, title: e.target.value })}
              />
              <input
                type="text"
                placeholder="Description"
                className="w-full px-4 py-2 border rounded"
                value={myProduct.description}
                onChange={(e) =>
                  setMyProduct({ ...myProduct, description: e.target.value })
                }
              />
            </div>

            <div className="flex gap-4 mb-3">
              <input
                type="text"
                placeholder="Category"
                className="w-full px-4 py-2 border rounded"
                value={myProduct.category}
                onChange={(e) =>
                  setMyProduct({ ...myProduct, category: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Type"
                className="w-full px-4 py-2 border rounded"
                value={myProduct.type}
                onChange={(e) => setMyProduct({ ...myProduct, type: e.target.value })}
              />
            </div>

            <div className="flex gap-4 mb-3 items-center">
              <label className="w-full">
                <input
                  type="checkbox"
                  checked={myProduct.popular}
                  onChange={(e) =>
                    setMyProduct({ ...myProduct, popular: e.target.checked })
                  }
                />{" "}
                Popular
              </label>
              <label className="w-full">
                <input
                  type="checkbox"
                  checked={myProduct.inStock}
                  onChange={(e) =>
                    setMyProduct({ ...myProduct, inStock: e.target.checked })
                  }
                />{" "}
                In Stock
              </label>
              <input
                type="file"
                accept="image/*"
                multiple 
                onChange={handleImage}
                className="px-2 py-1 border rounded w-full"
              />
            </div>

            <div className="mb-3">
              {priceInputs.map((p, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Size"
                    className="px-2 py-1 border rounded w-1/2"
                    value={p.size}
                    onChange={(e) => handlePriceChange(idx, "size", e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Price"
                    className="px-2 py-1 border rounded w-1/2"
                    value={p.price}
                    onChange={(e) => handlePriceChange(idx, "price", e.target.value)}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddPriceInput}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                + Add another size/price
              </button>
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full py-2 bg-black text-white font-bold rounded"
            >
              Add Product
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
