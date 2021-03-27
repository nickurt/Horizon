import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

import NavigationItem from './NavigationItem';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSunHaze, faCircleInfo, faArrowRightFromBracket, faUsers, faUserTag, faArrowLeft, faLaptopMobile, faCircle } from '@fortawesome/pro-regular-svg-icons';

export default function Navigation() {
    function handleLogout(e) {
      e.preventDefault();
      Inertia.post('/logout');
    }

    return (
        <>
            <nav className="navbar navbar-expand-xs navbar-light sticky-top">
                <div className="container-fluid">
                    <InertiaLink className="navbar-brand" href="#">
                        <div className="app-icon"><FontAwesomeIcon icon={faSunHaze} fixedWidth /></div>
                        <span className="brand-label fw-bold">ChangeWindows</span>
                    </InertiaLink>
                </div>
            </nav>

            <div className="sidebar">
                <NavigationItem url="/timeline" icon={faArrowLeft} title="Back" />

                <div className="my-2 border-bottom" />

                <NavigationItem url="/admin/platforms" icon={faLaptopMobile} title="Platforms" />
                <NavigationItem url="/admin/channels" icon={faCircle} title="Channels" />

                <div className="my-2 border-bottom" />

                <NavigationItem url="/admin/users" icon={faUsers} title="Users" />
                <NavigationItem url="/admin/roles" icon={faUserTag} title="Roles" />
                
                <div className="my-2 border-bottom" />

                <NavigationItem url="/about" icon={faCircleInfo} title="About" />

                <div className="flex-grow-1 d-none d-sm-block" />

                <form onSubmit={handleLogout} className="d-none d-sm-block">
                    <button type="submit" className="sidebar-item">
                        <FontAwesomeIcon icon={faArrowRightFromBracket} fixedWidth /> <span className="sidebar-label">Log out</span>
                    </button>
                </form>
            </div>
        </>
    )
}