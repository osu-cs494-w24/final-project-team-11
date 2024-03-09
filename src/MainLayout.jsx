import React from 'react';
import { Navbar } from './pages/Navbar';
import { Outlet } from 'react-router-dom';

export function MainLayout() {
    return (
        <div>
            <Navbar />
            <div style={{ marginTop: '100px' }}> {/* Adjust margin-top according to Navbar height */}
                <Outlet />
            </div>
        </div>
    );
}