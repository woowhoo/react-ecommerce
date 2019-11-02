import React from 'react';

import SHOP_DATA from './shop.data.js';

import CollectionPreview from '../../components/collection-preview/collection-preview.component';

class ShopPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collections: SHOP_DATA
    }
  }

  componentDidMount() {
    let newState = this.state.collections;
    for (const [index, value] of newState.entries()) {
      fetch(`http://localhost:5000/collection/${value.routeName}`).then(
        resonse => resonse.json())
        .then(items => {
          newState[index].items = items;
          this.setState({ collections: newState })
        })
    }
  }

  render() {
    const {collections} = this.state;
    return (
      <div className='shop-page'>
        {
          collections.map(({ id, ...otherCollectionProps }) => (
            <CollectionPreview key={id} {...otherCollectionProps} />
          ))
        }
      </div>
    )
  }
}

export default ShopPage;
