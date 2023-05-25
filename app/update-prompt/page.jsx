/* eslint-disable no-alert */

'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from 'components/Form';

function EditPrompt() {
    const router = useRouter();
    const searchparams = useSearchParams();
    const promptId = searchparams.get('id');
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();

            setPost({ prompt: data.prompt, tag: data.tag });
        };
        if (promptId) getPromptDetails();
    }, [promptId]);

    // eslint-disable-next-line consistent-return
    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (!promptId) return alert('Prompt ID not found');

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                }),
            });
            if (response.ok) {
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Form
            post={post}
            type="Edit"
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    );
}

export default EditPrompt;
