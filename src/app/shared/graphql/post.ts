import gql from 'graphql-tag';

export const QueryAllPosts = gql`query {
    allBlogPosts (orderBy: postDateAndTime_DESC) {
        postColor1
        postColor2
        postDateAndTime
        postDescription
        postSlug
        postTitle
        category {
            categoryTitle
        }
        postImage {
            url
        }
    }
}`;

export const QueryPostById = gql`query ($slug: String) {
    BlogPost(postSlug: $slug) {
        postColor1
        postColor2
        postContent
        postDateAndTime
        postDescription
        postSlug
        postTitle
        category {
            categoryTitle
        }
        postImage {
            url
        }
    }
}`;
