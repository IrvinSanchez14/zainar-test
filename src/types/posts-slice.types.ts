import { EntityState } from "@reduxjs/toolkit";

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
    timestamp: string | Date;
}

export interface PostsState extends EntityState<Post, number> {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }