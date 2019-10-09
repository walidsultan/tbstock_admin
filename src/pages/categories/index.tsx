import * as React from 'react'
import { Link, match } from 'react-router-dom'
import { connect } from 'react-redux'

import styled from '../../utils/styled'
import Page from '../../components/layout/Page'
import Container from '../../components/layout/Container'
import DataTable from '../../components/layout/DataTable'
import LoadingOverlay from '../../components/data/LoadingOverlay'
import LoadingOverlayInner from '../../components/data/LoadingOverlayInner'
import LoadingSpinner from '../../components/data/LoadingSpinner'

import { ApplicationState } from '../../store'
import { Product } from '../../store/products/types'
import { fetchRequest } from '../../store/products/actions'

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean;
  data: Product[];
  errors?: string;
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  fetchRequest: typeof fetchRequest;
  match: any;
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch

//const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://walidsultan.net/TBStockApi/api/Products/Category/'

const IMAGES_PATH = 'http://walidsultan.net/TBStock_Images/'

class CategoriesIndexPage extends React.Component<AllProps> {
  public componentDidMount() {
    const { fetchRequest: fr } = this.props
    //fr(this.props.match.params.categoryId);

  }

  private renderData() {
    const { loading, data } = this.props

    return (
      <DataTable columns={['Product', 'Code', 'Price']} widths={['auto', '', '']}>
        {loading && data.length === 0 && (
          <ProductLoading>
            <td colSpan={3}>Loading...</td>
          </ProductLoading>
        )}
        {data.map(product => (
          <tr key={product.Id}>
            <ProductDetail>
              <ProductIcon src={IMAGES_PATH + product.CategoryId + '/' + product.Id + '/' + product.ImagePath} alt={product.Name} />
              <ProductName>
                <Link to={`/products/${product.Name}`}>{product.Name}</Link>
              </ProductName>
            </ProductDetail>
            <td>
              {product.Code}
            </td>
            <td>
              LE{product.Price}
            </td>
          </tr>
        ))}
      </DataTable>
    )
  }

  public render() {
    const { loading } = this.props

    return (
      <Page>
        <Container>
          <TableWrapper>
            {loading && (
              <LoadingOverlay>
                <LoadingOverlayInner>
                  <LoadingSpinner />
                </LoadingOverlayInner>
              </LoadingOverlay>
            )}
            <p>
              <Link to={`/products/New`}>Add Product</Link>
            </p>
            {this.renderData()}
          </TableWrapper>
        </Container>
      </Page>
    )
  }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ products }: ApplicationState) => ({
  loading: products.loading,
  errors: products.errors,
  data: products.data
})

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = {
  fetchRequest
}

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesIndexPage)

const TableWrapper = styled('div')`
                position: relative;
  max-width: ${props => props.theme.widths.md};
              margin: 0 auto;
              min-height: 200px;
            `

const ProductDetail = styled('td')`
              display: flex;
              flex-direction: row;
              align-items: center;
            `

const ProductIcon = styled('img')`
              width: 64px;
              height: 64px;
            `

const ProductName = styled('div')`
              flex: 1 1 auto;
              height: 100%;
              margin-left: 1rem;

  a {
                color: ${props => props.theme.colors.brand};
            }
          `

const ProductLoading = styled('tr')`
  td {
                height: 48px;
              text-align: center;
            }
          `
