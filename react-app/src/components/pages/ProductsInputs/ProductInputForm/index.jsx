import React, { Fragment, Component } from 'react';
import ProductsService from '../../../../services/ProductsService';

const INITIAL_STATE = {
    allProducts: []
};
class ProductInputForm extends Component {

    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    componentWillMount() {
        this.getAllProducts();
    }

    getAllProducts = async() => {
        const { data } = await ProductsService.getAllProducts();
        const allProducts = data.data;
        this.setState(state => { 
            state.allProducts = allProducts;
            return state; 
        });
    }

    render() {
        const { allProducts } = this.state;
        const { productInput, amountInput } = this.props;
        return (
            <Fragment>
                <div className="form-group">
                    <label htmlFor="product">
                        Produto
                    </label>
                    <select className="form-control" ref={productInput}>
                        {allProducts && allProducts.map((product, index) => (
                            <option 
                                value={product.id} 
                                key={product.id}>
                                {product.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="price">
                        Quantidade
                    </label>
                    <input type="number" 
                        className="form-control"
                        min="1" 
                        step="1"
                        defaultValue="1"
                        ref={amountInput} />
                </div>
            </Fragment>
        );
    }
}
export default ProductInputForm;
