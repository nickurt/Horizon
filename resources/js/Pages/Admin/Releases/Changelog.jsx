import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';

import Admin from '../../../Layouts/Admin';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck, faFloppyDisk } from '@fortawesome/pro-regular-svg-icons';

export default function Edit({ can, auth, urls, release, status = null }) {
    const [curRelease, setCurRelease] = useState({
        name: '',
        version: null,
        canonical_version: null,
        codename: '',
        description: '',
        changelog: '',
        platform_id: null,
        start_preview: null,
        start_public: null,
        start_extended: null,
        start_lts: null,
        end_lts: null,
        start_build: null,
        start_delta: null,
        end_build: null,
        end_delta: null
    });

    useEffect(() => {
        setCurRelease(release);
    }, [release]);

    function formHandler(event) {
        const { id, value, type } = event.target;
        const _release = Object.assign({}, curRelease);

        switch (type) {
            default:
                _release[id] = value;
                break;
        }

        setCurRelease(_release);
    }

    function handleSubmit(event) {
      event.preventDefault();
      Inertia.patch(urls.update_release, curRelease);
    }

    return (
        <Admin can={can} auth={auth}>
            <form onSubmit={handleSubmit}>
                <nav className="navbar navbar-expand-xl navbar-light sticky-top">
                    <div className="container">
                        <InertiaLink href="/admin/releases" className="btn btn-sm me-2">
                            <FontAwesomeIcon icon={faArrowLeft} fixedWidth />
                        </InertiaLink>
                        <span className="navbar-brand">{curRelease.name}</span>
                        <div className="flex-grow-1" />
                        <button className="btn btn-primary btn-sm" type="submit"><FontAwesomeIcon icon={faFloppyDisk} fixedWidth/> Save</button>
                    </div>
                </nav>
            
                <div className="container my-3">
                    {status &&
                        <div className="alert alert-success"><FontAwesomeIcon icon={faCheck} fixedWidth /> {status}</div>
                    }
                    <fieldset className="row mb-3">
                        <div className="col-12">
                            <h4 className="h5 mb-0">Changelog</h4>
                            <p className="text-muted mb-0"><small>What's new?</small></p>
                        </div>
                        <div className="col-12 mt-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row g-3">
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <textarea className="form-control font-monospace" id="changelog" style={{ minHeight: 480, maxHeight: '100%' }} defaultValue={curRelease.changelog} onChange={formHandler}></textarea>
                                                <label htmlFor="changelog">Changelog</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </form>
        </Admin>
    )
}