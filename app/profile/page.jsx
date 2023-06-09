/* eslint-disable no-underscore-dangle */

'use client';

import Profile from 'components/Profile';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function MyProfile() {
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(
                `/api/users/${session?.user?.id}/posts`
            );
            const data = await response.json();
            setPosts(data);
        };
        if (session?.user.id) {
            fetchPosts();
        }
    }, [session?.user]);

    const handleEdit = async (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    };
    const handleDelete = async (post) => {
        // eslint-disable-next-line no-restricted-globals, no-alert
        const hasConfirmed = confirm(
            'Are you sure you want to delete this prompt?'
        );

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE',
                });
                const filteredPosts = posts.filter((p) => p._id !== post._id);
                setPosts(filteredPosts);
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log(error);
            }
        }
    };

    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        >
            Profile
        </Profile>
    );
}

export default MyProfile;
