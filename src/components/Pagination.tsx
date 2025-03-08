import { pages } from 'next/dist/build/templates/app-page';
import ReactPaginate from 'react-paginate';
import { Dispatch, SetStateAction } from 'react';
import { ITEM_PER_PAGE } from '@/lib/settings';
const Pagination = ({count, setPage}:{
  count:number;
  setPage: Dispatch<SetStateAction<number>>
}) => {

  const handlePageClick = (page:any)=>{
    setPage(page.selected + 1)
  }
  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={ Math.ceil(count / ITEM_PER_PAGE) }
        previousLabel="Previous"
        renderOnZeroPageCount={null}
        containerClassName='pagination-container'
        pageClassName="pagination-item"
        pageLinkClassName = "pagination-link"
        breakClassName= "pagination-break"
      />
    </>
    // <div className="flex items-center justify-between mt-3">
    //     <button className=" btn-disabled btn btn-md">Previous page</button>
    //         <div className="join">
        
    //             <button className="join-item btn btn-md">1</button>
    //             <button className="join-item btn btn-md btn-active">2</button>
    //             <button className="join-item btn btn-md">3</button>
    //             <button className="join-item btn btn-md">4</button>
            
    //         </div>
    //     <button className="btn btn-md">Next</button>
    // </div>
  );
};

export default Pagination;
