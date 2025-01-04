import { fetchCars } from "@/utils";
import { HomeProps } from "@/types";
import { fuels, yearsOfProduction } from "@/constants";
import {
  CarCard,
  ShowMore,
  SearchBar,
  CustomFilter,
  Hero,
  NavBar,
  Footer,
} from "@/components/Others/index2";

export default async function Home({ searchParams }: HomeProps) {
  //   const allCars = await fetchCars({
  //     manufacturer: searchParams.manufacturer || "",
  //     year: searchParams.year || 2022,
  //     fuel: searchParams.fuel || "",
  //     limit: searchParams.limit || 10,
  //     model: searchParams.model || "",
  //   });

  // const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <div>ok</div>
    // <><NavBar /><main className='overflow-hidden'>
    //   <Hero />

    //   <div className='mt-12 padding-x padding-y max-width' id='discover'>
    //     <div className='home__text-container'>
    //       <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
    //       <p>Explore out cars you might like</p>
    //     </div>

    //     <div className='home__filters'>
    //       <SearchBar />

    //       <div className='home__filter-container'>
    //         <CustomFilter title='fuel' options={fuels} />
    //         <CustomFilter title='year' options={yearsOfProduction} />
    //       </div>
    //     </div>

    //     <div className="m-4 p-2 grid sm:grid-cols-2 md:grid-cols-3 gap-4 ">
    //       <div className="card glass w-66">
    //         <figure>
    //           <img
    //             src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
    //             alt="car!" />
    //         </figure>
    //         <div className="card-body">
    //           <h2 className="card-title">Life hack</h2>
    //           <p>How to park your car at your garage?</p>
    //           <div className="card-actions justify-end">
    //             <button className="btn btn-primary">Learn now!</button>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="card glass w-66">
    //         <figure>
    //           <img
    //             src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
    //             alt="car!" />
    //         </figure>
    //         <div className="card-body">
    //           <h2 className="card-title">Life hack</h2>
    //           <p>How to park your car at your garage?</p>
    //           <div className="card-actions justify-end">
    //             <button className="btn btn-primary">Learn now!</button>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="card glass w-66">
    //         <figure>
    //           <img
    //             src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
    //             alt="car!" />
    //         </figure>
    //         <div className="card-body">
    //           <h2 className="card-title">Life hack</h2>
    //           <p>How to park your car at your garage?</p>
    //           <div className="card-actions justify-end">
    //             <button className="btn btn-primary">Learn now!</button>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="card glass w-66">
    //         <figure>
    //           <img
    //             src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
    //             alt="car!" />
    //         </figure>
    //         <div className="card-body">
    //           <h2 className="card-title">Life hack</h2>
    //           <p>How to park your car at your garage?</p>
    //           <div className="card-actions justify-end">
    //             <button className="btn btn-primary">Learn now!</button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //   </div>
    // </main><Footer /></>
  );
}
