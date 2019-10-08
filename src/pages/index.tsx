import * as React from 'react'
import Page from '../components/layout/Page'
import Container from '../components/layout/Container'
import styled from '../utils/styled'
import { Link } from 'react-router-dom'

const IndexPage: React.FC = () => (
  <Page>
    <Container>
      <PageContent>
        <h1>Welcome!</h1>
        <p>
          Welcome to T&B adminsitration webiste
        </p>
        <Category>
          <Link to={`/categories/1`}>Men</Link>
        </Category>
        <Category>
          <Link to={`/categories/2`}>Women</Link>
        </Category>
        <Category>
          <Link to={`/categories/3`}>Kids</Link>
        </Category>
        <Category>
          <Link to={`/categories/4`}>Accessories</Link>
        </Category>
      </PageContent>

    </Container>
  </Page >
)

export default IndexPage

const PageContent = styled('article')`
  max-width: ${props => props.theme.widths.md};
  margin: 0 auto;
  line-height: 1.6;

  a {
    color: ${props => props.theme.colors.brand};
  }

  h1,
  h2,
  h3,
  h4 {
    margin-bottom: 0.5rem;
    font-family: ${props => props.theme.fonts.headings};
    line-height: 1.25;
  }
`

const Category = styled('button')`
  border-radius:5px;
  border: 1px solid #000;
  margin-right:10px;
  padding:10px;
  width:25%;
  cursor:pointer;
  margin-bottom:15px;
  width:100%
`
