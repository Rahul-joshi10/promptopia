'use client';

import Profile from 'components/Profile';
/* eslint-disable no-underscore-dangle */

import React, { useEffect, useState } from 'react';

function UserProfile({ params }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(
                `/api/users/${params?.user?.[0]}/posts`
            );
            const data = await response.json();
            setPosts(data);
        };
        if (params?.user) {
            fetchPosts();
        }
    }, [params?.user]);

    return (
        <section className="w-full">
            <Profile
                name={params?.user?.[1]}
                desc={`Welcome to ${params?.user?.[1]} personalized profile page. Explore ${params?.user?.[1]}'s exceptional prompts and be inspired by the power of their imagination`}
                data={posts}
            >
                Profile
            </Profile>
        </section>
    );
}

export default UserProfile;
