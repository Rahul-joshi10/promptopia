/* eslint-disable no-underscore-dangle */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PromptCard from './PromptCard';

function PromptCardList({ data, handleTagClick, onPostClick }) {
    return (
        <div className="mt-16 prompt_layout">
            {data.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                    onPostClick={onPostClick}
                />
            ))}
        </div>
    );
}
function Feed() {
    const [searchText, setSearchText] = useState('');
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/prompt');
            const data = await response.json();
            setPosts(data);
            setFilteredPosts(data);
        };
        fetchPosts();
    }, []);

    useEffect(() => {
        const allPosts = [...posts];
        const temPosts = allPosts.filter(
            (p) =>
                p.creator.username.includes(searchText) ||
                p.creator.email.includes(searchText) ||
                p.prompt?.includes(searchText) ||
                p.tag?.includes(searchText)
        );
        setFilteredPosts(searchText.length > 0 ? temPosts : allPosts);
    }, [searchText]);

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const handleTagClick = (tag) => {
        setSearchText(tag);
    };

    const onPostClick = (post) => {
        router.push(
            `/profile/${post?.creator?._id}/${post?.creator?.username}`
        );
    };
    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for a tag or a username"
                    value={searchText}
                    onChange={handleSearch}
                    required
                    className="search_input peer"
                />
            </form>
            <PromptCardList
                data={filteredPosts}
                handleTagClick={handleTagClick}
                onPostClick={onPostClick}
            />
        </section>
    );
}

export default Feed;
