import React from 'react';
import Product from './Product';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import SearchBar from './SearchBar';


class Shop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
        this.setProducts = this.setProducts.bind(this);
    }

    setProducts(products) {
        this.setState({
            products: products
        });
    }

    async getProducts(query) {
        const res = await fetch(`/api/getProducts?q=${query}`);
        console.log(res);
        const data = await res.json();
        console.log(data);
        this.setProducts(data);
    }


    render() {
        return (
            <div>
                <SearchBar getResults={this.getProducts} />
                <Container>
                    <Row>
                        {this.state.products.map(item => (
                            <Col key={item.id}>
                                <Product product={item} />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Shop;