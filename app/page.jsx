import React from 'react';

function Home() {
    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">
                Discover & Share
                <br className="max-md:hidden" />
                <span className="orange_gradient text-center">
                    {' '}
                    AI-Powered Prompt
                </span>
            </h1>
            <p className="desc text-center">
                Promptopia a an open-source AI prompting tool for modern world
                to discover, create and share creative prompts
            </p>
        </section>
    );
}

export default Home;
