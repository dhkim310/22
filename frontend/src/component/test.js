

import React from 'react';

function PaginationButtons({currentPage, totalPages, onPageChange}) {
    const handlePageClick = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <nav className="d-flex justify-content-center fixed-bottom" style={{font: 1, marginBottom: '1%'}}>
            <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <a className="page-link" aria-label="Previous" href="#"
                       onClick={() => handlePageClick(currentPage - 1)}
                       style={{background: 'rgba(255, 255, 255, 1)', color: 'black'}}>
                        <span aria-hidden="true">«</span>
                    </a>
                </li>

                {Array.from({length: totalPages}, (_, i) => (
                    <li key={i} className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}>
                        <a className="page-link" href="#" onClick={() => handlePageClick(i + 1)}
                           style={{background: 'rgba(255, 255, 255, 1)', color: 'black'}}>
                            {i + 1}
                        </a>
                    </li>
                ))}

                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <a className="page-link" aria-label="Next" href="#" onClick={() => handlePageClick(currentPage + 1)}
                       style={{background: 'rgba(255, 255, 255, 1)', color: 'black'}}>
                        <span aria-hidden="true">»</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default PaginationButtons;

