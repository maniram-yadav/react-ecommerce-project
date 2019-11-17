import React, { Component } from 'react'
import Product from './Product';
import Title from './Title';
import { ProductConsumer } from '../Context';

export default class ProductList extends Component {

    constructor(props) {
        super(props);
        this.sortBy = React.createRef();
    }

    changed = (sortingorder) => {
      
        if(this.sortBy.current){
            sortingorder(this.sortBy.current.value);
        }
    }
    render() {
        
        return (
            <React.Fragment>
                <div className="py-5" >
                    <div className="container">
                        <Title name="our" title="products"></Title>


                        <ProductConsumer>


                            {(value) => {
                                return <React.Fragment>

                                    <div className="tab">
                                        <div>
                                            <ul className="tab-items">
                                                {
                                                    value.categories.map(category => {
                                                        return <li key={category.id} onClick={()=>value.setCategoryFilter(category.id)}>{category.name}</li>
                                                    })
                                                }
                                            </ul>

                                        </div>
                                        <div className="sortbox">
                                            <select ref={this.sortBy} name="sortby" onChange={()=>this.changed(value.setSortingOrder)}>
                                                {
                                                    value.sortingValues.map(item => {
                                                        return <option key={item.id} value={item.id} >{item.name}</option>
                                                    })
                                                }
                                              

                                            </select>
                                        </div>

                                    </div>


                                    <div className="row">
                                        {value.products.map(product => {
                                                return <Product key={product.id} product={product} />;
                                        })
                                        }

                                    </div>
                                </React.Fragment>

                            }}

                        </ProductConsumer>


                    </div>
                </div>
            </React.Fragment>

        )
    }
}
