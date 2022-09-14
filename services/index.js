import { graphql } from "graphql";
import { request, gql } from "graphql-request";
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
export const getPost = async () => {
	const query = gql`
		query MyQuery {
			postsConnection {
				edges {
					node {
						author {
							bio
							name
							id
							photo {
								url
							}
						}
						createdAt
						slug
						title
						excerpt
						featuredImage {
							url
						}
						catagories {
							name
							slug
						}
					}
				}
			}
		}
	`;

	const result = await request(graphqlAPI, query);
	return result.postsConnection.edges;
};
