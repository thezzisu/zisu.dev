import express from 'express'
import { json } from 'body-parser'
import { GraphQLClient, gql } from 'graphql-request'

const app = express()
app.use(json())

if (process.env.GH_TOKEN && process.env.GH_REPO) {
  const repo = process.env.GH_REPO
  const client = new GraphQLClient('https://api.github.com/graphql', {
    headers: {
      Authorization: `bearer ${process.env.GH_TOKEN}`
    }
  })

  app.get('/comments', async (req, res) => {
    const id = req.query.id
    const query = gql`
      query {
        search(type: DISCUSSION, query: "repo:${repo} category:Comments in:title comments_${id}", first: 1) {
          nodes {
            ... on Discussion {
              id
              url
              comments(first: 25) {
                totalCount
                pageInfo {
                  endCursor
                  hasNextPage
                }
                nodes {
                  id
                  url
                  bodyHTML
                  createdAt
                  deletedAt
                  lastEditedAt
                  author {
                    ... on User {
                      login
                      name
                      url
                      avatarUrl(size: 64)
                    }
                  }
                  replies(first: 25) {
                    totalCount
                    pageInfo {
                      endCursor
                      hasNextPage
                    }
                    nodes {
                      id
                      url
                      bodyHTML
                      createdAt
                      deletedAt
                      lastEditedAt
                      author {
                        ... on User {
                          login
                          name
                          url
                          avatarUrl(size: 64)
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
    try {
      const data = await client.request(query)
      const discussion = data.search.nodes[0]
      if (!discussion) return res.sendStatus(404)
      res.json(discussion)
    } catch (e) {
      res.sendStatus(400)
    }
  })

  app.get('/comments/more', async (req, res) => {
    const node = req.query.node
    const cursor = req.query.cursor
    const query = gql`
      query {
        node(id: "${node}") {
          ... on Discussion {
            comments(
              first: 25
              after: "${cursor}"
            ) {
              pageInfo {
                endCursor
                hasNextPage
              }
              nodes {
                id
                url
                bodyHTML
                createdAt
                deletedAt
                lastEditedAt
                author {
                  ... on User {
                    login
                    name
                    url
                    avatarUrl(size: 64)
                  }
                }
                replies(first: 25) {
                  totalCount
                  pageInfo {
                    endCursor
                    hasNextPage
                  }
                  nodes {
                    id
                    url
                    bodyHTML
                    createdAt
                    deletedAt
                    lastEditedAt
                    author {
                      ... on User {
                        login
                        name
                        url
                        avatarUrl(size: 64)
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
    try {
      const data = await client.request(query)
      if (!data.node.comments) return res.sendStatus(404)
      res.json(data.node.comments)
    } catch (e) {
      res.sendStatus(400)
    }
  })

  app.get('/comments/replies/more', async (req, res) => {
    const node = req.query.node
    const cursor = req.query.cursor
    const query = gql`
      query {
        node(id: "${node}") {
          ... on DiscussionComment {
            replies(
              first: 25
              after: "${cursor}"
            ) {
              pageInfo {
                endCursor
                hasNextPage
              }
              nodes {
                id
                url
                bodyHTML
                createdAt
                deletedAt
                lastEditedAt
                author {
                  ... on User {
                    login
                    name
                    url
                    avatarUrl(size: 64)
                  }
                }
              }
            }
          }
        }
      }
    `
    try {
      const data = await client.request(query)
      if (!data.node.replies) return res.sendStatus(404)
      res.json(data.node.replies)
    } catch (e) {
      res.sendStatus(400)
    }
  })
}

export default app
