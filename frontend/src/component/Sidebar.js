import React, { useState } from 'react';

function Sidebar() {


    return (
        <div
            className="d-grid d-lg-flex justify-content-lg-center"
            style={{ width: 'auto', height: '100%', minHeight: '0px', background: 'white' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                style={{ height: '100%', width: '10%', minHeight: '0px', background: 'white' }}
            >
                {sidebarVisible && (
                    <div
                        className="d-lg-flex justify-content-lg-center"
                        style={{ height: '30px', background: 'rgba(126,126,126,0)' }}
                    >
                        <div
                            className="d-lg-flex justify-content-lg-start justify-content-xxl-center"
                            style={{ width: '170px', height: '35px', background: 'black' }}
                        >
                            <span style={{ fontSize: '17px', width: 'auto', color: 'white' }}>고객관리</span>
                        </div>
                    </div>
                )}
                {sidebarVisible && (
                    <button
                        className="btn btn-primary text-center"
                        type="button"
                        style={{
                            background: 'rgba(13,110,253,0)',
                            borderStyle: 'none',
                            width: '98.5px',
                            fontSize: '13px',
                            minWidth: '98.5px',
                            color: 'black',
                            paddingTop: '15px',
                        }}
                    >
                        &nbsp; &nbsp;리스트
                    </button>
                )}
                {sidebarVisible && (
                    <button
                        className="btn btn-primary text-center"
                        type="button"
                        style={{
                            background: 'rgba(13,110,253,0)',
                            borderStyle: 'none',
                            width: '98.5px',
                            fontSize: '13px',
                            color: 'black',
                            paddingTop: '0px',
                        }}
                    >
                        등록
                    </button>
                )}
            </div>
        </div>
    );
}

export default Sidebar;
