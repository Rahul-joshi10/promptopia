'use client';

import Profile from 'components/Profile';
import { useSession } from 'next-auth/react';
/* eslint-disable no-underscore-dangle */

import React, { useEffect, useState } from 'react';

function UserProfile({ params }) {
    const [posts, setPosts] = useState([]);
    const { data: session } = useSession();

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
                name={
                    session?.user?.id === params?.user?.[1]
                        ? 'My'
                        : params?.user?.[1]
                }
                desc={`Welcome to ${params?.user?.[1]} personalized profile page. Explore ${params?.user?.[1]}'s exceptional prompts and be inspired by the power of their imagination`}
                data={posts}
            >
                Profile
            </Profile>
        </section>
    );
}

export default UserProfile;
