import React from "react";

const Pagination = ({disabledNext, disabledPrev, nextPage, prevPage}) => {
    return (
        <div className="main__pagination">
            <button
                className={`main__pagination-btn prev${disabledPrev === 1 ? " disabled-btn" : ""}`}
                onClick={prevPage}
            >
                Prev
            </button>
            <button
                className={`main__pagination-btn prev${disabledNext ? " disabled-btn" : ""}`}
                onClick={nextPage}
            >
                Next
        </button>
        </div>
    )
};

export default Pagination;