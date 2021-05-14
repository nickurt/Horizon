import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/inertia-react';

import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Auth({ children }) {
    const { app } = usePage().props;

    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    useEffect(() => {
        window.addEventListener('resize', function() {
            setWindowHeight(window.innerHeight);
        });

        () => window.removeEventListener('resize');
    });

    return (
        <div className="auth auth-flow" style={{ height: windowHeight }}>
            <div className="content">
                <a href="javascript:history.back()" className="btn btn-link btn-sm text-white"><FontAwesomeIcon icon={faArrowLeft} /> Back</a>
                <div className="auth-card">
                    <h1 className="h3 m-0 py-5 d-flex justify-content-center align-items-center">
                        <img src={app.preview ? '/images/logo-preview-dark.svg' : '/images/logo-dark.svg'} width="28px" height="28px" className="me-2 mt-1 display-light" />
                        <img src={app.preview ? '/images/logo-preview-light.svg' : '/images/logo-light.svg'} width="28px" height="28px" className="me-2 mt-1 display-dark" />
                        ChangeWindows
                    </h1>
                    { children }
                </div>
            </div>
        </div>
    )
}