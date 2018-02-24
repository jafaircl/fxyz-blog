import { Category } from "./category";
import { Asset } from "./asset";

export interface Post {
    postColor1?: string;
    postColor2?: string;
    postContent?: string;
    postDateAndTime?: string;
    postDescription?: string;
    postSlug?: string;
    postTitle?: string;
    category?: Category;
    postImage?: Asset;
    openGraphImage?: Asset;
}
