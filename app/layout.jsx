import Nav from 'components/Nav';
import Provider from 'components/Provider';
import React from 'react';

import 'styles/globals.css';

export const metadata = {
    title: 'Promptopia',
    description: 'Discover and share AI prompts',
};

function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Provider>
                    <div className="main">
                        <div className="gradient" />
                    </div>
                    <main className="app">
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    );
}

export default RootLayout;
