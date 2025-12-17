import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { likeProject } from '@/components/Tools/Misc';
import { useFetch } from '@/context/FetchContext';
import { apiUrl } from '@/app';
import axios from 'axios';

interface ProjectLikeProps {
    likes: number;
    project_id: number | string;
    user_id?: number | string;
    guest: boolean;
    auth?: boolean;
    slug: string;
}

const ProjectLike: React.FC<ProjectLikeProps> = ({
    likes,
    project_id,
    user_id,
    guest,
    slug,
}) => {
    const { store } = useFetch();
    const [likeCount, setLikeCount] = useState<number>(likes);
    const [loading, setLoading] = useState(false);

    // Read guestId only on client
    const guestId = useMemo(() => {
        if (typeof window === 'undefined') return null;
        try {
            return localStorage.getItem('like_id');
        } catch {
            return null;
        }
    }, []);

    // Fetch latest likes for this project
    useEffect(() => {
        const controller = new AbortController();
        const fetchLikes = async () => {
            try {
                const response = await fetch(
                    `${apiUrl}/api/project/get/${project_id}/${slug}`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ guestId }),
                        signal: controller.signal,
                    }
                );
                if (!response.ok) return;
                const res = await response.json();
                setLikeCount(res?.data?.project?.likes_count ?? likes);
            } catch (err) {
                if ((err as any).name === 'AbortError') return;
                // keep previous count on error
                // console.error('Failed to fetch likes:', err);
            }
        };

        fetchLikes();

        return () => controller.abort();
    }, [project_id, slug, guestId, likes]);

    // derive hasLiked safely
    const hasLiked = Boolean(store?.project?.has === true);

    // handle like action (optimistic UI)
    const handleLike = useCallback(async () => {
        if (loading) return;
        setLoading(true);
        const optimistic = hasLiked ? Math.max(0, (likeCount ?? 0) - 1) : (likeCount ?? 0) + 1;
        setLikeCount(optimistic);

        try {
            await likeProject(project_id, user_id, guest);
            // refresh server count after action
            try {

                const r = await axios.post(`${apiUrl}/api/project/get/${project_id}/${slug}`, guestId)
                    
                setLikeCount(r?.data?.project?.likes_count ?? optimistic);
            } catch {
                // ignore refresh errors; keep optimistic value
            }
        } catch (err) {
            // rollback on failure
            setLikeCount(likes);
            // console.error('Failed to like project:', err);
        } finally {
            setLoading(false);
        }
    }, [project_id, user_id, guest, hasLiked, likeCount, likes, slug, guestId, loading]);

    // keyboard support for accessibility (Enter / Space)
    const onKeyDown: React.KeyboardEventHandler = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleLike();
        }
    };

    const displayedCount = store?.project?.likes_count ?? likeCount;

    return (
        <button
            type="button"
            onClick={handleLike}
            onKeyDown={onKeyDown}
            aria-pressed={hasLiked}
            aria-label={hasLiked ? 'Unlike project' : 'Like project'}
            disabled={loading}
            className="inline-flex items-center gap-2 cursor-pointer transition-colors disabled:opacity-60"
        >
            <FaHeart
                className={`transition-colors ${hasLiked ? 'text(--owner)' : 'hover:text-gray-500'}`}
                aria-hidden="true"
            />
            <span>{displayedCount} Lens</span>
        </button>
    );
};

export default ProjectLike;