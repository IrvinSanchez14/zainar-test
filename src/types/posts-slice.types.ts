import { EntityState } from "@reduxjs/toolkit";

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface PostsState extends EntityState<Post, number> {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }