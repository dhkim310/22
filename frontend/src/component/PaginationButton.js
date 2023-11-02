import React from 'react';

function PaginationButtons({ currentPage, totalPages, onPageChange, pageSize = 5 }) {
    const handlePageClick = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const startPage = Math.max(1, currentPage - Math.floor(pageSize / 2));
    const endPage = Math.min(totalPages, startPage + pageSize - 1);

    const pageButtons = [];
    for (let page = startPage; page <= endPage; page++) {
        pageButtons.push(
            <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                <a className="page-link" href="#" onClick={() => handlePageClick(page)} style={{background: 'rgba(255, 255, 255, 1)', color: 'black'}}>
                    {page}
                </a>
            </li>
        );
    }

    return (
        <nav className="d-flex justify-content-center fixed-bottom" style={{ marginBottom: '1%' }} style={{background: 'rgba(255, 255, 255, 1)', color: 'black'}}>
            <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <a className="page-link" href="#" onClick={() => handlePageClick(currentPage - 1)} style={{background: 'rgba(255, 255, 255, 1)', color: 'black'}}>
                        <span aria-hidden="true">«</span>
                    </a>
                </li>
                {pageButtons}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <a className="page-link" href="#" onClick={() => handlePageClick(currentPage + 1)} style={{background: 'rgba(255, 255, 255, 1)', color: 'black'}}>
                        <span aria-hidden="true">»</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default PaginationButtons;