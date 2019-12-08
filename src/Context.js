import React, { Component } from 'react'
import {storeProducts,detailProduct,sortingValues,Categories} from './data';
const ProductContext = React.createContext();
//Provider
//Consumer


class ProductProvider extends Component {
    state={
        products:[],
        allProducts:[],
        detailProduct:detailProduct,
        cart:[],
        modalOpen:false,
        modalProduct:detailProduct,
        cartSubTotal:0,
        cartTax:0,
        cartTotal:0,
        sortingValues:sortingValues,
        categories:Categories,
        sortby:0,
        categoryFilter:0
    }

    setProducts=()=>{
        let tempProducts=[];
        this.state.allProducts.forEach(item=>{
            if(this.state.categoryFilter==0||item.categoryid===this.state.categoryFilter){
                const singleItem={...item};
                tempProducts=[...tempProducts,singleItem];
            }            
        });
        this.setState(()=>{
            return {products:[...tempProducts]}
        },()=>{
            this.sortItem();
        })
        // console.log(tempProducts);
    }

    setAllProducts=()=>{
        let tempProducts=[];
        storeProducts.forEach(item=>{
                const singleItem={...item};
                tempProducts=[...tempProducts,singleItem];
        });
        this.setState(()=>{
            return {allProducts:[...tempProducts]}
        },()=>{
            this.setProducts();
            this.sortItem();
        })
    }


    componentDidMount(){
        this.setAllProducts();
    }
    
    getItem=(id)=>{
        const product=this.state.allProducts.find(item=>item.id===id);
        return product;
    }

    handleDetail=(id)=>{
        const product=this.getItem(id);
        this.setState(()=>{
            return {detailProduct:product};
        })
    }
    addTocart=(id)=>{
        let tempProducts=[...this.state.allProducts];
        const index=tempProducts.indexOf(this.getItem(id));
        const product=tempProducts[index];
        product.inCart=true;
        product.count=1;
        const price=product.price;
        product.total=price;
        this.setState(()=>{
            return {allProducts:tempProducts,
                    cart:[...this.state.cart,product]};
        },()=>{
            this.setProducts();
            this.addTotals();
        })
    };

    openModal= id =>{
        const product=this.getItem(id);
        // console.log(product);
        this.setState(()=>{
            return {modalProduct:product,modalOpen:true}
        })
    }
    setSortingOrder=(id)=>{
      
        this.setState(()=>{
          return {sortby:id}
        },()=>{
            this.sortItem();
        });
        //console.log(this.state.sortby);
    }
    setCategoryFilter=(id)=>{
        //console.log(id);
        
        this.setState(()=>{
            return {  categoryFilter:id}
          },()=>{
              this.setProducts(); 
          });
          
    }

    closeModal=()=>{
        this.setState(()=>{
            return {modalOpen:false}
        })
    }

    increment =(id)=>{
       let tempCart = [...this.state.cart];
       const selectedProduct = tempCart.find(item=>item.id===id);
       const index=tempCart.indexOf(selectedProduct);
       const product=tempCart[index];
       product.count=product.count+1;
       product.total=product.count * product.price;
       this.setState(()=>{
           return { cart:[...tempCart]}
       },()=>{
           this.addTotals();
       })
    }

    decrement =(id)=>{
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item=>item.id===id);
      
        const index=tempCart.indexOf(selectedProduct);
        const product=tempCart[index];

        product.count=product.count-1;
        if(product.count<=0){
            this.removeItem(id);
        } else{
            product.total=product.count * product.price;
            this.setState(()=>{
                return { cart:[...tempCart]}
            },()=>{
                this.addTotals();
            })
        }
       
     }
    removeItem=(id)=>{
        let tempProducts=[...this.state.allProducts];
        let tempCart = [...this.state.cart];
        tempCart=tempCart.filter(item => item.id !== id);
        // console.log(tempCart);
        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct=tempProducts[index];
        removedProduct.inCart=false;
        removedProduct.count=0;
        removedProduct.total=0;

        this.setState(()=>{
            return {
                cart:[...tempCart],
                allProducts:[...tempProducts]
            }}
            ,()=>{
                this.addTotals();
            
        })
    }
    clearCart=(id)=>{

       let tempProducts=[];
       let categoryProducts=[];
       storeProducts.forEach(item=>{
               const singleItem={...item};
               tempProducts=[...tempProducts,singleItem];
       });

       tempProducts.forEach(item=>{
       if(this.state.categoryFilter==0||item.categoryid===this.state.categoryFilter){
            const singleItem={...item};
            categoryProducts=[...categoryProducts,singleItem];
        }
        });

        // console.log(categoryProducts);
        // console.log(tempProducts);

       this.setState(()=>{
           return {
                products:[...categoryProducts],
                allProducts:[...tempProducts],
                cart:[]
            }
       },()=>{
           this.sortItem();
           this.addTotals();
       })
    }
    
    sortItem=() =>{
        const sortBy=this.state.sortby;
        //  this.setProducts();
         if(sortBy==3||sortBy==4){
            // console.log(sortBy);
            const tempProducts=this.state.products;
            tempProducts.sort((product1, product2) => (product1.title > product2.title) ? (sortBy%2==1?1:-1) :(sortBy%2==1?-1:1));
            this.setState({
                products:tempProducts
            });
        } else if(sortBy==1||sortBy==2){
            // console.log(sortBy);
            const tempProducts=this.state.products;
            tempProducts.sort((product1, product2) => (product1.price > product2.price) ? (sortBy%2==1?1:-1) :(sortBy%2==1?-1:1));
            this.setState({
                products:tempProducts
            });

        }
    }
    addTotals=()=>{
        let subTotal=0;
        this.state.cart.map(item=>{
            subTotal+=item.total
        })
        const tempTax=subTotal * 0.1;
        const tax=parseFloat(tempTax.toFixed(2));
        const total=subTotal+tax;
        this.setState(()=>{
            return {
                cartSubTotal:subTotal,
                cartTax:tax,
                cartTotal:total
            }
        })
    }

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail:this.handleDetail,
                addTocart:this.addTocart,
                openModal:this.openModal,
                closeModal:this.closeModal,
                increment:this.increment,
                decrement:this.decrement,
                removeItem:this.removeItem,
                clearCart:this.clearCart,
                setSortingOrder:this.setSortingOrder,
                setCategoryFilter:this.setCategoryFilter

            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;
export {ProductProvider,ProductConsumer};
export default ProductContext;