import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { cartContent } from "../../context/MainContext";

export default function Home() {
  let [category, setCategory] = useState([]);
  let [product, setProduct] = useState([]);

  //Filter 
  let [sorting,setSorting]=useState(null)
  let [categoryFilter,setCategoryFilter]=useState([])


  let getCategory = () => {
    axios
      .get(`https://wscubetech.co/ecommerce-api/categories.php`)
      .then((res) => res.data)
      .then((finalRes) => {
        setCategory(finalRes.data); //[24 Array]
      });
  };


  let getProducts=()=>{
    axios.get(`https://wscubetech.co/ecommerce-api/products.php`,{
        params:{
           sorting,
           categories:categoryFilter.join(",")
        }
    })
    .then((res)=>res.data)
    .then((finalRes)=>{
        setProduct(finalRes.data);
        
    })
  }

  let getCategoryValue=(e)=>{
    
    if(e.target.checked){
        if(! categoryFilter.includes(e.target.value)){
            setCategoryFilter([...categoryFilter,e.target.value])
        }
       
    }
    else{
        let filterData=categoryFilter.filter((v)=>v!=e.target.value)
        setCategoryFilter(filterData)
    }
    
  }

  useEffect(()=>{
    getProducts()
  },[sorting,categoryFilter])

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <section className="py-10 ">
      <div className="max-w-[1320px]  mx-auto grid grid-cols-[20%_auto] gap-5">
        <aside className="shadow-lg p-5">
          <h2 className="font-bold">Filter</h2>
          <div className="border-1 mt-4 h-[250px] overflow-y-scroll">
            <h4>SORT</h4>
            {sorting}
            <div className="space-y-4 p-3">
              <div className="flex items-center" onClick={()=>setSorting(1)}>
                <input
                  id="sort-1"
                  name="sort"
                  type="radio"
                  className="h-4 w-4"
                  defaultValue={1}
                />
                <label htmlFor="sort-1" className="ml-3 text-sm text-gray-600">
                  Ascending
                </label>
              </div>
              <div className="flex items-center" onClick={()=>setSorting(2)}>
                <input
                  id="sort-2"
                  name="sort"
                  type="radio"
                  className="h-4 w-4"
                  defaultValue={2}
                />
                <label htmlFor="sort-2" className="ml-3 text-sm text-gray-600">
                  Descending
                </label>
              </div>
              <div className="flex items-center"  onClick={()=>setSorting(3)}>
                <input
                  id="sort-3"
                  name="sort"
                  type="radio"
                  className="h-4 w-4"
                  defaultValue={3}
                />
                <label htmlFor="sort-3" className="ml-3 text-sm text-gray-600">
                  Price Low to High
                </label>
              </div>
              <div className="flex items-center"  onClick={()=>setSorting(4)}>
                <input
                  id="sort-4"
                  name="sort"
                  type="radio"
                  className="h-4 w-4"
                  defaultValue={4}
                />
                <label htmlFor="sort-4" className="ml-3 text-sm text-gray-600">
                  Price High to Low
                </label>
              </div>
              <div className="flex items-center"  onClick={()=>setSorting(5)}>
                <input
                  id="sort-5"
                  name="sort"
                  type="radio"
                  className="h-4 w-4"
                  defaultValue={5}
                />
                <label htmlFor="sort-5" className="ml-3 text-sm text-gray-600">
                  Discounted Price Low to High
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="sort-6"
                  name="sort"
                  type="radio"
                  className="h-4 w-4"
                  defaultValue={6}
                />
                <label htmlFor="sort-6" className="ml-3 text-sm text-gray-600">
                  Discounted Price High to Low
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="sort-7"
                  name="sort"
                  type="radio"
                  className="h-4 w-4"
                  defaultValue={7}
                />
                <label htmlFor="sort-7" className="ml-3 text-sm text-gray-600">
                  Rating Low to High
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="sort-8"
                  name="sort"
                  type="radio"
                  className="h-4 w-4"
                  defaultValue={8}
                />
                <label htmlFor="sort-8" className="ml-3 text-sm text-gray-600">
                  Rating High to Low
                </label>
              </div>
            </div>
          </div>

          <div className="border-1 mt-4 h-[250px] overflow-y-scroll">
            <h4>Category</h4>
            {categoryFilter}
            <div className="space-y-4">
              {
              category.map((obj, index) => {
                return (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="categories"
                      id="category-beauty"
                      value={obj.slug}
                      onChange={getCategoryValue}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor="category-beauty"
                      className="ml-3 text-sm text-gray-600 cursor-pointer"
                    >
                      {obj.name}
                    </label>
                  </div>
                );
              })
              }
            </div>
          </div>
        </aside>
        <article>
          <div className="grid grid-cols-4 gap-5">
            {
                product.map((obj,index)=>  <ProductCard key={index} data={obj} /> )
            }
           
           
          </div>
        </article>
      </div>
    </section>
  );
}

function ProductCard({data}) {
    
    let {cart,setCart}=useContext(cartContent)
    let {name,image,price,id}=data

    let addtoCart=()=>{
        let cartObj={
            id,
            name,
            price,
            image,
            qty:1
        }
       
        setCart([...cart,cartObj])
        
    }
    
  return (
    <div className="shadow-lg">
      <img
        src={image}
        alt=""
      />
      <div className="p-3">
        <h5 class="text-[#8B8BA3] pt-1 sm:text-[16px] text-[10px] font-medium">
           {name}
        </h5>
        <span class="sm:text-[24px] text-[15px] font-bold"> Rs {price} </span>
        <button
        onClick={addtoCart}
          class="rounded-md w-full my-1 px-3 py-2 text-sm font-semibold text-white shadow-sm 
            bg-indigo-600 hover:bg-indigo-500"
          fdprocessedid="4oyzbk"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
